"use client";

import { useMemo, useState } from "react";

import { galleryData } from "@/data/gallery";
import { GalleryItem } from "@/types/gallery";

import GalleryCard from "./GalleryCard";
import GalleryFilters from "./GalleryFilters";
import DeleteGalleryModal from "./DeleteGalleryModal";

const ITEMS_PER_PAGE = 8;

export default function GalleryGrid() {
  const [gallery, setGallery] =
    useState<GalleryItem[]>(galleryData);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");

  const [page, setPage] = useState(1);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [selectedItem, setSelectedItem] =
    useState<GalleryItem | null>(null);

  const filteredGallery = useMemo(() => {
    return gallery.filter((item) => {
      const matchesSearch =
        search === "" ||
        item.title
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        category === "" ||
        item.category === category;

      const matchesStatus =
        status === "" ||
        item.status === status;

      const matchesType =
        type === "" ||
        item.category === type;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus &&
        matchesType
      );
    });
  }, [
    gallery,
    search,
    category,
    status,
    type,
  ]);

  const totalPages = Math.ceil(
    filteredGallery.length / ITEMS_PER_PAGE
  );

  const paginatedGallery =
    filteredGallery.slice(
      (page - 1) * ITEMS_PER_PAGE,
      page * ITEMS_PER_PAGE
    );

  const handleDelete = (id: number) => {
    const item = gallery.find(
      (galleryItem) => galleryItem.id === id
    );

    if (!item) return;

    setSelectedItem(item);
    setDeleteOpen(true);
  };

  const confirmDelete = () => {
    if (!selectedItem) return;

    setGallery((prev) =>
      prev.filter(
        (item) => item.id !== selectedItem.id
      )
    );

    setDeleteOpen(false);
    setSelectedItem(null);
  };

  const clearFilters = () => {
    setSearch("");
    setCategory("");
    setStatus("");
    setType("");
    setPage(1);
  };

  return (
    <div className="space-y-6">

      <GalleryFilters
        search={search}
        setSearch={(value) => {
          setSearch(value);
          setPage(1);
        }}
        category={category}
        setCategory={(value) => {
          setCategory(value);
          setPage(1);
        }}
        status={status}
        setStatus={(value) => {
          setStatus(value);
          setPage(1);
        }}
        type={type}
        setType={(value) => {
          setType(value);
          setPage(1);
        }}
        onClear={clearFilters}
      />

      {/* Gallery Grid Starts */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">

        {paginatedGallery.length === 0 ? (

          <div className="col-span-full rounded-2xl border border-slate-200 bg-white py-20 text-center">

            <h3 className="text-xl font-semibold text-slate-700">
              No Gallery Items Found
            </h3>

            <p className="mt-2 text-slate-500">
              Try changing your search or filters.
            </p>

          </div>

        ) : (

          paginatedGallery.map((item) => (

            <GalleryCard
              key={item.id}
              item={item}
              onDelete={handleDelete}
            />

          ))

        )}

      </div>

      {/* Pagination */}

      {totalPages > 1 && (

        <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-6 py-4 shadow-sm md:flex-row">

          <p className="text-sm text-slate-600">

            Showing

            <span className="mx-1 font-semibold">
              {(page - 1) * ITEMS_PER_PAGE + 1}
            </span>

            -

            <span className="mx-1 font-semibold">
              {Math.min(
                page * ITEMS_PER_PAGE,
                filteredGallery.length
              )}
            </span>

            of

            <span className="ml-1 font-semibold">
              {filteredGallery.length}
            </span>

            gallery items

          </p>

          <div className="flex items-center gap-2">

            <button
              type="button"
              disabled={page === 1}
              onClick={() =>
                setPage((prev) =>
                  Math.max(prev - 1, 1)
                )
              }
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>

            {Array.from(
              { length: totalPages },
              (_, index) => (

                <button
                  key={index}
                  type="button"
                  onClick={() => setPage(index + 1)}
                  className={`h-10 w-10 rounded-lg text-sm font-medium transition ${
                    page === index + 1
                      ? "bg-blue-600 text-white"
                      : "border border-slate-300 hover:bg-slate-100"
                  }`}
                >
                  {index + 1}
                </button>

              )
            )}

            <button
              type="button"
              disabled={page === totalPages}
              onClick={() =>
                setPage((prev) =>
                  Math.min(prev + 1, totalPages)
                )
              }
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>

          </div>

        </div>

      )}

      <DeleteGalleryModal
        open={deleteOpen}
        title={selectedItem?.title ?? ""}
        onClose={() => {
          setDeleteOpen(false);
          setSelectedItem(null);
        }}
        onConfirm={confirmDelete}
      />
          </div>
  );
}