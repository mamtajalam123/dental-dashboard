"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import Image from "next/image";
import Link from "next/link";

import {
  Eye,
  Pencil,
  Trash2,
  Search,
} from "lucide-react";

import { galleryAPI } from "@/app/services/gallery.api";
import { categoryAPI } from "@/app/services/category.api";

import type { Gallery } from "@/app/types/gallery";
import type { Category } from "@/app/types/category";

const ITEMS_PER_PAGE = 8;

type GalleryTableProps = {
  gallery: Gallery[];
  setGallery: React.Dispatch<
    React.SetStateAction<Gallery[]>
  >;
};

export default function GalleryTable({
  gallery,
  setGallery,
}: GalleryTableProps) {
  // ==========================================
  // STATES
  // ==========================================

  const [categories, setCategories] =
    useState<Category[]>([]);

  const [categoryLoading, setCategoryLoading] =
    useState(false);

  const [categoryError, setCategoryError] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [page, setPage] =
    useState(1);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [selectedGallery, setSelectedGallery] =
    useState<Gallery | null>(null);

  const [deleting, setDeleting] =
    useState(false);

  // ==========================================
  // LOAD SERVICE CATEGORIES
  // ==========================================

  const loadCategories = async () => {
    try {
      setCategoryLoading(true);
      setCategoryError("");

      console.log(
        "========== LOAD SERVICE CATEGORIES =========="
      );

      const response =
        await categoryAPI.getAll();

      console.log(
        "CATEGORY API RAW RESPONSE:",
        response
      );

      let categoryData: Category[] = [];

      // ----------------------------------------
      // API RESPONSE ARRAY
      // ----------------------------------------

      if (Array.isArray(response)) {
        categoryData = response;
      }

      // ----------------------------------------
      // API RESPONSE { data: [] }
      // ----------------------------------------

      else if (
        response &&
        typeof response === "object" &&
        "data" in response
      ) {
        const data = (
          response as {
            data?: unknown;
          }
        ).data;

        if (Array.isArray(data)) {
          categoryData = data as Category[];
        }
      }

      console.log(
        "FINAL SERVICE CATEGORY DATA:",
        categoryData
      );

      setCategories(categoryData);
    } catch (error) {
      console.error(
        "LOAD SERVICE CATEGORIES ERROR:",
        error
      );

      setCategories([]);

      setCategoryError(
        error instanceof Error
          ? error.message
          : "Failed to load service categories."
      );
    } finally {
      setCategoryLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  // ==========================================
  // DEBUG GALLERY DATA
  // ==========================================

  useEffect(() => {
    console.log(
      "========== GALLERY DATA =========="
    );

    console.table(gallery);

    console.log(
      "SERVICE CATEGORIES:",
      categories
    );
  }, [gallery, categories]);

  // ==========================================
  // CATEGORY MAP
  // ==========================================

  const categoryMap = useMemo(() => {
    const map = new Map<string, string>();

    categories.forEach((item) => {
      if (
        item.id !== undefined &&
        item.id !== null
      ) {
        map.set(
          String(item.id),
          item.name?.trim() || ""
        );
      }
    });

    return map;
  }, [categories]);

  // ==========================================
  // GET SERVICE CATEGORY NAME
  // ==========================================

  const getCategoryName = (
    item: Gallery
  ): string => {
    // ----------------------------------------
    // 1. Backend already returns serviceName
    // ----------------------------------------

    if (
      "serviceName" in item &&
      typeof item.serviceName === "string"
    ) {
      const serviceName =
        item.serviceName.trim();

      if (serviceName) {
        return serviceName;
      }
    }

    // ----------------------------------------
    // 2. serviceId -> category map
    // ----------------------------------------

    if (
      item.serviceId !== undefined &&
      item.serviceId !== null
    ) {
      const serviceName =
        categoryMap.get(
          String(item.serviceId)
        );

      if (serviceName) {
        return serviceName;
      }
    }

    return "";
  };

  // ==========================================
  // FILTER GALLERY
  // ==========================================

  const filteredGallery = useMemo(() => {
    const keyword =
      search.trim().toLowerCase();

    const selectedCategory =
      category.trim().toLowerCase();

    return gallery.filter((item) => {
      const title =
        item.title
          ?.trim()
          .toLowerCase() || "";

      const description =
        item.description
          ?.trim()
          .toLowerCase() || "";

      const itemCategory =
        getCategoryName(item)
          .trim()
          .toLowerCase();

      const matchesSearch =
        keyword === "" ||
        title.includes(keyword) ||
        itemCategory.includes(keyword) ||
        description.includes(keyword);

      const matchesCategory =
        selectedCategory === "" ||
        itemCategory === selectedCategory;

      return (
        matchesSearch &&
        matchesCategory
      );
    });
  }, [
    gallery,
    search,
    category,
    categoryMap,
  ]);

  // ==========================================
  // PAGINATION
  // ==========================================

  const totalPages = Math.ceil(
    filteredGallery.length /
      ITEMS_PER_PAGE
  );

  const currentPage =
    totalPages > 0
      ? Math.min(page, totalPages)
      : 1;

  const paginatedGallery =
    filteredGallery.slice(
      (currentPage - 1) *
        ITEMS_PER_PAGE,
      currentPage *
        ITEMS_PER_PAGE
    );

  // ==========================================
  // DELETE CLICK
  // ==========================================

  const handleDeleteClick = (
    item: Gallery
  ) => {
    setSelectedGallery(item);
    setDeleteOpen(true);
  };

  // ==========================================
  // CONFIRM DELETE
  // ==========================================

  const confirmDelete = async () => {
    if (
      selectedGallery?.id === undefined ||
      selectedGallery?.id === null
    ) {
      return;
    }

    try {
      setDeleting(true);

      await galleryAPI.delete(
        selectedGallery.id
      );

      setGallery((prev) =>
        prev.filter(
          (item) =>
            item.id !==
            selectedGallery.id
        )
      );

      setDeleteOpen(false);
      setSelectedGallery(null);

      const remainingItems =
        filteredGallery.length - 1;

      const newTotalPages =
        Math.ceil(
          remainingItems /
            ITEMS_PER_PAGE
        );

      setPage((prevPage) =>
        Math.min(
          prevPage,
          Math.max(
            newTotalPages,
            1
          )
        )
      );

      alert(
        "Gallery deleted successfully."
      );
    } catch (error) {
      console.error(
        "DELETE GALLERY ERROR:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Failed to delete gallery."
      );
    } finally {
      setDeleting(false);
    }
  };

  // ==========================================
  // CLEAR FILTERS
  // ==========================================

  const clearFilters = () => {
    setSearch("");
    setCategory("");
    setPage(1);
  };

  // ==========================================
  // IMAGE URL
  // ==========================================

  const getImageUrl = (
    image?: string | null
  ) => {
    if (!image) {
      return "";
    }

    if (
      image.startsWith("http://") ||
      image.startsWith("https://")
    ) {
      return image;
    }

    const API_URL =
      process.env.NEXT_PUBLIC_API_URL ||
      "http://localhost:5000";

    return `${API_URL.replace(
      /\/$/,
      ""
    )}/${image.replace(
      /^\//,
      ""
    )}`;
  };

  // ==========================================
  // JSX
  // ==========================================

  return (
    <div className="space-y-6">

      {/* ======================================
          FILTERS
      ====================================== */}

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

        <div className="flex flex-col gap-4 md:flex-row md:items-center">

          {/* SEARCH */}

          <div className="relative flex-1">

            <Search
              size={18}
              className="
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
            />

            <input
              type="text"
              value={search}
              placeholder="Search gallery..."
              onChange={(e) => {
                setSearch(
                  e.target.value
                );
                setPage(1);
              }}
              className="
                w-full
                rounded-xl
                border
                border-slate-300
                bg-white
                py-3
                pl-10
                pr-4
                text-sm
                outline-none
                transition
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-100
              "
            />

          </div>

          {/* SERVICE CATEGORY */}

          <select
            value={category}
            disabled={categoryLoading}
            onChange={(e) => {
              setCategory(
                e.target.value
              );
              setPage(1);
            }}
            className="
              min-w-[240px]
              rounded-xl
              border
              border-slate-300
              bg-white
              px-4
              py-3
              text-sm
              outline-none
              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-100
              disabled:cursor-not-allowed
              disabled:bg-slate-100
            "
          >
            <option value="">
              {categoryLoading
                ? "Loading categories..."
                : "All Service Categories"}
            </option>

            {categories.map(
              (categoryItem) => (
                <option
                  key={categoryItem.id}
                  value={categoryItem.name}
                >
                  {categoryItem.name}
                </option>
              )
            )}
          </select>

          {/* RETRY */}

          {categoryError && (
            <button
              type="button"
              onClick={loadCategories}
              className="
                rounded-xl
                border
                border-red-200
                bg-red-50
                px-4
                py-3
                text-sm
                font-medium
                text-red-600
              "
            >
              Retry Categories
            </button>
          )}

          {/* CLEAR */}

          {(search || category) && (
            <button
              type="button"
              onClick={clearFilters}
              className="
                rounded-xl
                border
                border-slate-300
                px-5
                py-3
                text-sm
                font-medium
                text-slate-700
                transition
                hover:bg-slate-100
              "
            >
              Clear
            </button>
          )}

        </div>

        {categoryError && (
          <p className="mt-3 text-sm text-red-500">
            {categoryError}
          </p>
        )}

      </div>

      {/* ======================================
          TABLE
      ====================================== */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-slate-100">

              <tr>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Image
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Title
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Service Category
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Status
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Created
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {paginatedGallery.length === 0 ? (

                <tr>

                  <td
                    colSpan={6}
                    className="px-6 py-16 text-center"
                  >

                    <h3 className="text-xl font-semibold text-slate-700">
                      No Gallery Found
                    </h3>

                    <p className="mt-2 text-slate-500">
                      Try changing your search
                      or service category.
                    </p>

                  </td>

                </tr>

              ) : (

                paginatedGallery.map(
                  (item) => {

                    const imageUrl =
                      getImageUrl(
                        item.image
                      );

                    const categoryName =
                      getCategoryName(
                        item
                      );

                    return (

                      <tr
                        key={item.id}
                        className="
                          border-t
                          border-slate-200
                          transition
                          hover:bg-slate-50
                        "
                      >

                        {/* IMAGE */}

                        <td className="px-6 py-4">

                          <div
                            className="
                              relative
                              h-16
                              w-20
                              overflow-hidden
                              rounded-xl
                              bg-slate-100
                            "
                          >

                            {imageUrl ? (

                              <Image
                                src={imageUrl}
                                alt={
                                  item.title ||
                                  "Gallery image"
                                }
                                fill
                                sizes="80px"
                                className="object-cover"
                                unoptimized
                              />

                            ) : (

                              <div
                                className="
                                  flex
                                  h-full
                                  items-center
                                  justify-center
                                  text-xs
                                  text-slate-400
                                "
                              >
                                No Image
                              </div>

                            )}

                          </div>

                        </td>

                        {/* TITLE */}

                        <td className="px-6 py-4">

                          <p className="font-semibold text-slate-800">
                            {item.title ||
                              "Untitled"}
                          </p>

                        </td>

                        {/* SERVICE CATEGORY */}

                        <td className="px-6 py-4">

                          {categoryName ? (

                            <span
                              className="
                                inline-flex
                                rounded-full
                                bg-blue-100
                                px-3
                                py-1
                                text-xs
                                font-semibold
                                text-blue-700
                              "
                            >
                              {categoryName}
                            </span>

                          ) : (

                            <span className="text-sm text-red-500">
                              No Category
                            </span>

                          )}

                        </td>

                        {/* STATUS */}

                        <td className="px-6 py-4">

                          <span
                            className={`
                              inline-flex
                              rounded-full
                              px-3
                              py-1
                              text-xs
                              font-semibold
                              ${
                                item.status
                                  ?.toLowerCase() ===
                                "active"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              }
                            `}
                          >
                            {item.status ||
                              "Unknown"}
                          </span>

                        </td>

                        {/* CREATED */}

                        <td className="px-6 py-4 text-sm text-slate-600">

                          {item.created_at
                            ? new Date(
                                item.created_at
                              ).toLocaleDateString()
                            : "-"}

                        </td>

                        {/* ACTIONS */}

                        <td className="px-6 py-4">

                          <div className="flex items-center justify-center gap-2">

                            {/* VIEW */}

                            <Link
                              href={`/dashboard/gallery/${item.id}`}
                              className="
                                inline-flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-lg
                                border
                                border-slate-300
                                text-slate-600
                                transition
                                hover:bg-slate-100
                                hover:text-blue-600
                              "
                            >
                              <Eye size={17} />
                            </Link>

                            {/* EDIT */}

                            <Link
                              href={`/dashboard/gallery/edit/${item.id}`}
                              className="
                                inline-flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-lg
                                border
                                border-slate-300
                                text-slate-600
                                transition
                                hover:bg-slate-100
                                hover:text-blue-600
                              "
                            >
                              <Pencil size={17} />
                            </Link>

                            {/* DELETE */}

                            <button
                              type="button"
                              onClick={() =>
                                handleDeleteClick(
                                  item
                                )
                              }
                              className="
                                inline-flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-lg
                                border
                                border-red-200
                                text-red-600
                                transition
                                hover:bg-red-50
                              "
                            >
                              <Trash2
                                size={17}
                              />
                            </button>

                          </div>

                        </td>

                      </tr>

                    );
                  }
                )

              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* ======================================
          PAGINATION
      ====================================== */}

      {totalPages > 1 && (

        <div
          className="
            flex
            flex-col
            items-center
            justify-between
            gap-4
            rounded-2xl
            border
            border-slate-200
            bg-white
            px-6
            py-4
            shadow-sm
            md:flex-row
          "
        >

          <p className="text-sm text-slate-600">

            Showing{" "}

            <span className="font-semibold">
              {(currentPage - 1) *
                ITEMS_PER_PAGE +
                1}
            </span>

            {" - "}

            <span className="font-semibold">
              {Math.min(
                currentPage *
                  ITEMS_PER_PAGE,
                filteredGallery.length
              )}
            </span>

            {" of "}

            <span className="font-semibold">
              {filteredGallery.length}
            </span>

            {" gallery items"}

          </p>

          <div className="flex items-center gap-2">

            <button
              type="button"
              disabled={
                currentPage === 1
              }
              onClick={() =>
                setPage(
                  currentPage - 1
                )
              }
              className="
                rounded-lg
                border
                border-slate-300
                px-4
                py-2
                text-sm
                font-medium
                transition
                hover:bg-slate-100
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              Previous
            </button>

            {Array.from(
              {
                length: totalPages,
              },
              (_, index) => {

                const pageNumber =
                  index + 1;

                return (

                  <button
                    key={pageNumber}
                    type="button"
                    onClick={() =>
                      setPage(
                        pageNumber
                      )
                    }
                    className={`
                      h-10
                      w-10
                      rounded-lg
                      text-sm
                      font-medium
                      transition
                      ${
                        currentPage ===
                        pageNumber
                          ? "bg-blue-600 text-white"
                          : "border border-slate-300 text-slate-700 hover:bg-slate-100"
                      }
                    `}
                  >
                    {pageNumber}
                  </button>

                );
              }
            )}

            <button
              type="button"
              disabled={
                currentPage ===
                totalPages
              }
              onClick={() =>
                setPage(
                  currentPage + 1
                )
              }
              className="
                rounded-lg
                border
                border-slate-300
                px-4
                py-2
                text-sm
                font-medium
                transition
                hover:bg-slate-100
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              Next
            </button>

          </div>

        </div>

      )}

      {/* ======================================
          DELETE MODAL
      ====================================== */}

      {deleteOpen && (

        <div
          className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/50
            p-4
          "
        >

          <div
            className="
              w-full
              max-w-md
              rounded-2xl
              bg-white
              p-6
              shadow-2xl
            "
          >

            <h2 className="text-xl font-bold text-slate-900">
              Delete Gallery
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500">

              Are you sure you want to
              delete{" "}

              <span className="font-semibold text-slate-800">
                {selectedGallery?.title ||
                  "this gallery"}
              </span>

              ? This action cannot
              be undone.

            </p>

            <div className="mt-6 flex justify-end gap-3">

              <button
                type="button"
                disabled={deleting}
                onClick={() => {
                  setDeleteOpen(false);
                  setSelectedGallery(
                    null
                  );
                }}
                className="
                  rounded-xl
                  border
                  border-slate-300
                  px-5
                  py-2.5
                  text-sm
                  font-medium
                  text-slate-700
                  transition
                  hover:bg-slate-100
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={deleting}
                onClick={
                  confirmDelete
                }
                className="
                  rounded-xl
                  bg-red-600
                  px-5
                  py-2.5
                  text-sm
                  font-medium
                  text-white
                  transition
                  hover:bg-red-700
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                "
              >
                {deleting
                  ? "Deleting..."
                  : "Delete"}
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}