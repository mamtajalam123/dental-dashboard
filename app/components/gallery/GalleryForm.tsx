"use client";

import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
} from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  Save,
  Upload,
  X,
} from "lucide-react";

import type { Gallery } from "../../types/gallery";
import type { Category } from "@/app/types/category";

import { categoryAPI } from "@/app/services/category.api";

// ==========================================
// FORM DATA
// ==========================================

export type GalleryFormData = {
  title: string;

  serviceId: number | null;

  category: string;

  status: "Active" | "Inactive";

  description: string;

  image: File | string | null;
};

// ==========================================
// PROPS
// ==========================================

type GalleryFormProps = {
  initialData?: Gallery;

  onSubmit: (
    data: GalleryFormData
  ) => Promise<void>;

  submitLabel?: string;
};

// ==========================================
// COMPONENT
// ==========================================

export default function GalleryForm({
  initialData,
  onSubmit,
  submitLabel,
}: GalleryFormProps) {
  const router = useRouter();

  // ==========================================
  // STATE
  // ==========================================

  const [loading, setLoading] =
    useState(false);

  const [categoryLoading, setCategoryLoading] =
    useState(true);

  const [categoryError, setCategoryError] =
    useState("");

  const [categories, setCategories] =
    useState<Category[]>([]);

  const [form, setForm] =
    useState<GalleryFormData>({
      title:
        initialData?.title ?? "",

      serviceId:
        initialData?.serviceId != null
          ? Number(initialData.serviceId)
          : null,

      category:
        typeof initialData?.category === "string"
          ? initialData.category.trim()
          : typeof initialData?.serviceName === "string"
          ? initialData.serviceName.trim()
          : "",

      status:
        initialData?.status === "Inactive"
          ? "Inactive"
          : "Active",

      description:
        initialData?.description ?? "",

      image:
        initialData?.image ?? null,
    });

  const [preview, setPreview] =
    useState<string>(
      typeof initialData?.image === "string"
        ? initialData.image
        : ""
    );

  // ==========================================
  // LOAD CATEGORIES
  // ==========================================

  useEffect(() => {
    let mounted = true;

    const loadCategories = async () => {
      try {
        setCategoryLoading(true);
        setCategoryError("");

        const response =
          await categoryAPI.getAll();

        console.log(
          "========== CATEGORY API =========="
        );

        console.log(
          "RAW CATEGORY RESPONSE:",
          response
        );

        // --------------------------------------
        // SUPPORT BOTH:
        // response = []
        // response = { data: [] }
        // response = { categories: [] }
        // --------------------------------------

        const responseData =
          (response as any)?.data ??
          response;

        const categoryData: Category[] =
          Array.isArray(responseData)
            ? responseData
            : Array.isArray(
                responseData?.data
              )
            ? responseData.data
            : Array.isArray(
                responseData?.categories
              )
            ? responseData.categories
            : [];

        console.log(
          "FINAL CATEGORY DATA:",
          categoryData
        );

        if (!mounted) {
          return;
        }

        setCategories(categoryData);

        // ======================================
        // EDIT MODE
        // ======================================

        if (initialData) {
          const existingServiceId =
            initialData.serviceId != null
              ? Number(initialData.serviceId)
              : null;

          const existingCategoryName =
            typeof initialData.category ===
            "string"
              ? initialData.category.trim()
              : typeof initialData.serviceName ===
                "string"
              ? initialData.serviceName.trim()
              : "";

          console.log(
            "========== EDIT CATEGORY =========="
          );

          console.log(
            "EXISTING SERVICE ID:",
            existingServiceId
          );

          console.log(
            "EXISTING CATEGORY:",
            existingCategoryName
          );

          // ------------------------------------
          // MATCH BY SERVICE ID
          // ------------------------------------

          if (
            existingServiceId !== null &&
            Number.isInteger(
              existingServiceId
            )
          ) {
            const matchedCategory =
              categoryData.find(
                (category) =>
                  Number(category.id) ===
                  existingServiceId
              );

            if (matchedCategory) {
              console.log(
                "MATCHED CATEGORY:",
                matchedCategory
              );

              setForm((prev) => ({
                ...prev,

                serviceId:
                  Number(
                    matchedCategory.id
                  ),

                category:
                  matchedCategory.name?.trim() ||
                  existingCategoryName,
              }));

              return;
            }
          }

          // ------------------------------------
          // FALLBACK MATCH BY NAME
          // ------------------------------------

          if (existingCategoryName) {
            const matchedCategory =
              categoryData.find(
                (category) =>
                  category.name
                    ?.trim()
                    .toLowerCase() ===
                  existingCategoryName
                    .toLowerCase()
              );

            if (matchedCategory) {
              console.log(
                "MATCHED CATEGORY BY NAME:",
                matchedCategory
              );

              setForm((prev) => ({
                ...prev,

                serviceId:
                  Number(
                    matchedCategory.id
                  ),

                category:
                  matchedCategory.name?.trim() ||
                  existingCategoryName,
              }));

              return;
            }
          }

          // ------------------------------------
          // NO MATCH
          // ------------------------------------

          console.warn(
            "NO CATEGORY MATCH FOUND"
          );

          setForm((prev) => ({
            ...prev,

            serviceId:
              existingServiceId,

            category:
              existingCategoryName,
          }));

          return;
        }

        // ======================================
        // CREATE MODE
        // ======================================

        if (!initialData) {
          const firstCategory =
            categoryData[0];

          if (firstCategory) {
            setForm((prev) => ({
              ...prev,

              serviceId:
                Number(
                  firstCategory.id
                ),

              category:
                firstCategory.name?.trim() ||
                "",
            }));
          }
        }
      } catch (error) {
        console.error(
          "LOAD CATEGORY ERROR:",
          error
        );

        if (!mounted) {
          return;
        }

        setCategories([]);

        setCategoryError(
          error instanceof Error
            ? error.message
            : "Failed to load categories."
        );
      } finally {
        if (mounted) {
          setCategoryLoading(false);
        }
      }
    };

    loadCategories();

    return () => {
      mounted = false;
    };
  }, [initialData]);

  // ==========================================
  // SYNC INITIAL DATA
  // ==========================================

  useEffect(() => {
    if (!initialData) {
      return;
    }

    const existingServiceId =
      initialData.serviceId != null
        ? Number(initialData.serviceId)
        : null;

    const existingCategory =
      typeof initialData.category ===
      "string"
        ? initialData.category.trim()
        : typeof initialData.serviceName ===
          "string"
        ? initialData.serviceName.trim()
        : "";

    console.log(
      "========== INITIAL GALLERY DATA =========="
    );

    console.log(
      "INITIAL SERVICE ID:",
      existingServiceId
    );

    console.log(
      "INITIAL CATEGORY:",
      existingCategory
    );

    setForm((prev) => ({
      ...prev,

      title:
        initialData.title ?? "",

      serviceId:
        existingServiceId,

      category:
        existingCategory,

      status:
        initialData.status === "Inactive"
          ? "Inactive"
          : "Active",

      description:
        initialData.description ?? "",

      image:
        initialData.image ?? null,
    }));

    setPreview(
      typeof initialData.image === "string"
        ? initialData.image
        : ""
    );
  }, [initialData]);

  // ==========================================
  // HANDLE CHANGE
  // ==========================================

  const handleChange = (
    e: ChangeEvent<
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement
    >
  ) => {
    const {
      name,
      value,
    } = e.target;

    // ========================================
    // CATEGORY CHANGE
    // ========================================

    if (name === "category") {
      const selectedId =
        Number(value);

      const selectedCategory =
        categories.find(
          (category) =>
            Number(category.id) ===
            selectedId
        );

      console.log(
        "========== CATEGORY CHANGED =========="
      );

      console.log(
        "SELECTED ID:",
        selectedId
      );

      console.log(
        "SELECTED CATEGORY:",
        selectedCategory
      );

      if (!selectedCategory) {
        setForm((prev) => ({
          ...prev,

          serviceId: null,

          category: "",
        }));

        return;
      }

      setForm((prev) => ({
        ...prev,

        serviceId:
          Number(
            selectedCategory.id
          ),

        category:
          selectedCategory.name?.trim() ||
          "",
      }));

      return;
    }

    // ========================================
    // OTHER FIELDS
    // ========================================

    setForm((prev) => ({
      ...prev,

      [name]: value,
    }));
  };

  // ==========================================
  // HANDLE IMAGE
  // ==========================================

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      e.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert(
        "Please select a valid image."
      );

      e.target.value = "";

      return;
    }

    const maxSize =
      5 * 1024 * 1024;

    if (file.size > maxSize) {
      alert(
        "Image size must be less than 5MB."
      );

      e.target.value = "";

      return;
    }

    const previewUrl =
      URL.createObjectURL(file);

    setPreview(previewUrl);

    setForm((prev) => ({
      ...prev,

      image: file,
    }));
  };

  // ==========================================
  // REMOVE IMAGE
  // ==========================================

  const removeImage = () => {
    setPreview("");

    setForm((prev) => ({
      ...prev,

      image: null,
    }));
  };

  // ==========================================
  // SUBMIT
  // ==========================================

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const normalizedServiceId =
      form.serviceId != null
        ? Number(form.serviceId)
        : null;

    const normalizedData: GalleryFormData = {
      title:
        form.title?.trim() || "",

      serviceId:
        normalizedServiceId,

      category:
        form.category?.trim() || "",

      status:
        form.status === "Inactive"
          ? "Inactive"
          : "Active",

      description:
        form.description?.trim() || "",

      image:
        form.image ?? null,
    };

    // ========================================
    // VALIDATION
    // ========================================

    if (!normalizedData.title) {
      alert(
        "Gallery title is required."
      );

      return;
    }

    if (
      normalizedData.serviceId === null ||
      !Number.isInteger(
        normalizedData.serviceId
      ) ||
      normalizedData.serviceId <= 0
    ) {
      alert(
        "Please select a service category."
      );

      return;
    }

    if (!normalizedData.category) {
      alert(
        "Service category is required."
      );

      return;
    }

    if (!normalizedData.description) {
      alert(
        "Gallery description is required."
      );

      return;
    }

    if (
      !initialData &&
      !(normalizedData.image instanceof File)
    ) {
      alert(
        "Please select a gallery image."
      );

      return;
    }

    console.log(
      "========== GALLERY FORM SUBMIT =========="
    );

    console.log(
      "TITLE:",
      normalizedData.title
    );

    console.log(
      "SERVICE ID:",
      normalizedData.serviceId
    );

    console.log(
      "CATEGORY:",
      normalizedData.category
    );

    console.log(
      "STATUS:",
      normalizedData.status
    );

    console.log(
      "DESCRIPTION:",
      normalizedData.description
    );

    console.log(
      "IMAGE:",
      normalizedData.image
    );

    console.log(
      "=========================================="
    );

    try {
      setLoading(true);

      await onSubmit(
        normalizedData
      );
    } catch (error) {
      console.error(
        "GALLERY FORM SUBMIT ERROR:",
        error
      );

      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // IMAGE URL
  // ==========================================

  const getImageUrl = (
    image: string
  ) => {
    if (!image) {
      return "";
    }

    if (
      image.startsWith("http://") ||
      image.startsWith("https://") ||
      image.startsWith("blob:")
    ) {
      return image;
    }

    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL ||
      "http://localhost:5000";

    return `${apiUrl.replace(
      /\/+$/,
      ""
    )}/${image.replace(
      /^\/+/,
      ""
    )}`;
  };

  // ==========================================
  // JSX
  // ==========================================

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* ======================================
          IMAGE
      ====================================== */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <label className="mb-4 block text-sm font-semibold text-slate-700">
          Gallery Image
        </label>

        {preview ? (
          <div className="relative overflow-hidden rounded-2xl border border-slate-200">
            <Image
              src={getImageUrl(preview)}
              alt="Gallery Preview"
              width={1200}
              height={700}
              className="h-72 w-full object-cover"
              unoptimized
            />

            <button
              type="button"
              onClick={removeImage}
              disabled={loading}
              className="
                absolute
                right-4
                top-4
                rounded-full
                bg-red-600
                p-2
                text-white
                hover:bg-red-700
                disabled:opacity-50
              "
            >
              <X size={18} />
            </button>
          </div>
        ) : (
          <label
            htmlFor="gallery-image"
            className="
              flex
              h-72
              cursor-pointer
              flex-col
              items-center
              justify-center
              rounded-2xl
              border-2
              border-dashed
              border-slate-300
              hover:border-blue-500
              hover:bg-slate-50
            "
          >
            <Upload
              size={42}
              className="mb-4 text-slate-400"
            />

            <p className="text-lg font-semibold text-slate-700">
              Upload Gallery Image
            </p>

            <p className="mt-2 text-sm text-slate-500">
              JPG, PNG, JPEG or WEBP
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Maximum size: 5MB
            </p>

            <input
              id="gallery-image"
              type="file"
              accept="image/jpeg,image/png,image/jpg,image/webp"
              onChange={handleImage}
              disabled={loading}
              className="hidden"
            />
          </label>
        )}
      </div>

      {/* ======================================
          INFORMATION
      ====================================== */}

      <div className="grid gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-2">

        {/* TITLE */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Gallery Title
          </label>

          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter gallery title"
            required
            disabled={loading}
            className="
              h-11
              w-full
              rounded-xl
              border
              border-slate-300
              px-4
              outline-none
              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-100
              disabled:bg-slate-100
            "
          />
        </div>

        {/* CATEGORY */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Service Category
          </label>

          <select
            name="category"
            value={
              form.serviceId !== null
                ? String(form.serviceId)
                : ""
            }
            onChange={handleChange}
            required
            disabled={
              categoryLoading ||
              loading
            }
            className="
              h-11
              w-full
              rounded-xl
              border
              border-slate-300
              bg-white
              px-4
              outline-none
              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-100
              disabled:bg-slate-100
            "
          >
            <option value="">
              {categoryLoading
                ? "Loading categories..."
                : "Select Service Category"}
            </option>

            {categories.map(
              (category) => (
                <option
                  key={
                    `gallery-category-${category.id}`
                  }
                  value={String(
                    category.id
                  )}
                >
                  {category.name}
                </option>
              )
            )}
          </select>

          {categoryError && (
            <p className="mt-2 text-sm text-red-600">
              {categoryError}
            </p>
          )}

          {!categoryLoading &&
            !categoryError &&
            categories.length === 0 && (
              <p className="mt-2 text-sm text-amber-600">
                No service categories found.
              </p>
            )}
        </div>

        {/* STATUS */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Status
          </label>

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            disabled={loading}
            className="
              h-11
              w-full
              rounded-xl
              border
              border-slate-300
              bg-white
              px-4
              outline-none
              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-100
              disabled:bg-slate-100
            "
          >
            <option value="Active">
              Active
            </option>

            <option value="Inactive">
              Inactive
            </option>
          </select>
        </div>

        {/* CATEGORY COUNT */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Available Service Categories
          </label>

          <div className="flex h-11 items-center rounded-xl border border-slate-300 bg-slate-50 px-4 text-sm text-slate-600">
            {categoryLoading
              ? "Loading..."
              : `${categories.length} Categories Found`}
          </div>
        </div>
      </div>

      {/* ======================================
          DESCRIPTION
      ====================================== */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Description
        </label>

        <textarea
          name="description"
          rows={6}
          value={form.description}
          onChange={handleChange}
          placeholder="Write gallery description..."
          required
          disabled={loading}
          className="
            w-full
            rounded-xl
            border
            border-slate-300
            p-4
            outline-none
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-100
            disabled:bg-slate-100
          "
        />
      </div>

      {/* ======================================
          BUTTONS
      ====================================== */}

      <div className="flex flex-col justify-end gap-4 sm:flex-row">
        <button
          type="button"
          onClick={() =>
            router.back()
          }
          disabled={loading}
          className="
            inline-flex
            items-center
            justify-center
            rounded-xl
            border
            border-slate-300
            bg-white
            px-6
            py-3
            font-medium
            text-slate-700
            hover:bg-slate-100
            disabled:opacity-50
          "
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={
            loading ||
            categoryLoading ||
            categories.length === 0 ||
            form.serviceId === null
          }
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-blue-600
            px-6
            py-3
            font-medium
            text-white
            hover:bg-blue-700
            disabled:opacity-50
          "
        >
          <Save size={18} />

          {loading
            ? initialData
              ? "Updating..."
              : "Creating..."
            : submitLabel ??
              (initialData
                ? "Update Gallery"
                : "Create Gallery")}
        </button>
      </div>
    </form>
  );
}