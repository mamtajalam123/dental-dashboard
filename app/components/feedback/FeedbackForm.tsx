"use client";

import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
} from "react";

import {
  Save,
  Upload,
  X,
} from "lucide-react";

import { categoryAPI } from "@/app/services/category.api";
import type { Category } from "@/app/types/category";
import type { Feedback } from "@/types/feedback";

// ======================================================
// STATUS
// ======================================================

export type FeedbackStatus =
  | "Pending"
  | "Approved"
  | "Rejected";

// ======================================================
// FORM DATA
// ======================================================

export interface FeedbackFormData {
  patientName: string;

  patientImage: File | null;

  treatment: string;

  rating: number;

  review: string;

  status: FeedbackStatus;

  date: string;
}

// ======================================================
// PROPS
// ======================================================

interface FeedbackFormProps {
  initialData?: Feedback;

  onSubmit: (
    data: FeedbackFormData
  ) => Promise<void>;

  submitLabel?: string;
}

// ======================================================
// COMPONENT
// ======================================================

export default function FeedbackForm({
  initialData,
  onSubmit,
  submitLabel = "Save Feedback",
}: FeedbackFormProps) {
  // ====================================================
  // FORM STATE
  // ====================================================

  const [form, setForm] =
    useState<FeedbackFormData>({
      patientName:
        initialData?.patientName ?? "",

      patientImage: null,

      treatment:
        initialData?.treatment ?? "",

      rating:
        Number(
          initialData?.rating ?? 5
        ),

      review:
        initialData?.review ?? "",

      status:
        initialData?.status ===
          "Approved" ||
        initialData?.status ===
          "Rejected"
          ? initialData.status
          : "Pending",

      date:
        initialData?.date ??
        new Date()
          .toISOString()
          .split("T")[0],
    });

  // ====================================================
  // CATEGORIES
  // ====================================================

  const [categories, setCategories] =
    useState<Category[]>([]);

  const [
    categoriesLoading,
    setCategoriesLoading,
  ] = useState(false);

  const [
    categoriesError,
    setCategoriesError,
  ] = useState("");

  // ====================================================
  // SUBMIT LOADING
  // ====================================================

  const [loading, setLoading] =
    useState(false);

  // ====================================================
  // IMAGE PREVIEW
  // ====================================================

  const [
    imagePreview,
    setImagePreview,
  ] = useState("");

  // ====================================================
  // IMAGE ERROR
  // ====================================================

  const [
    imagePreviewError,
    setImagePreviewError,
  ] = useState(false);

  // ====================================================
  // IMAGE URL HELPER
  // ====================================================

  const getImageUrl = (
    image?: string | null
  ): string => {
    if (
      !image ||
      !image.trim()
    ) {
      return "";
    }

    const imagePath =
      image.trim();

    // ------------------------------------------
    // Already complete URL
    // ------------------------------------------

    if (
      imagePath.startsWith(
        "http://"
      ) ||
      imagePath.startsWith(
        "https://"
      ) ||
      imagePath.startsWith(
        "blob:"
      ) ||
      imagePath.startsWith(
        "data:"
      )
    ) {
      return imagePath;
    }

    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL ||
      "http://localhost:5000";

    // ------------------------------------------
    // Remove trailing slash
    // ------------------------------------------

    const cleanApiUrl =
      apiUrl.replace(
        /\/+$/,
        ""
      );

    // ------------------------------------------
    // Remove /api if present
    // ------------------------------------------

    const serverUrl =
      cleanApiUrl.replace(
        /\/api$/,
        ""
      );

    // ------------------------------------------
    // Remove leading slash
    // ------------------------------------------

    const cleanImagePath =
      imagePath.replace(
        /^\/+/,
        ""
      );

    return `${serverUrl}/${cleanImagePath}`;
  };

  // ====================================================
  // INITIAL IMAGE PREVIEW
  // ====================================================

  useEffect(() => {
    const existingImage =
      initialData?.patientImage;

    if (
      typeof existingImage ===
        "string" &&
      existingImage.trim()
    ) {
      setImagePreview(
        getImageUrl(
          existingImage
        )
      );
    } else {
      setImagePreview("");
    }

    setImagePreviewError(
      false
    );
  }, [
    initialData,
  ]);

  // ====================================================
  // LOAD CATEGORIES
  // ====================================================

  useEffect(() => {
    let mounted = true;

    const loadCategories =
      async () => {
        try {
          setCategoriesLoading(
            true
          );

          setCategoriesError("");

          const response =
            await categoryAPI.getAll();

          console.log(
            "========== FEEDBACK CATEGORY API =========="
          );

          console.log(
            "CATEGORY RESPONSE:",
            response
          );

          const responseData =
            (response as any)?.data ??
            response;

          const categoryData: Category[] =
            Array.isArray(
              responseData
            )
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

          if (!mounted) {
            return;
          }

          console.log(
            "FINAL CATEGORY DATA:",
            categoryData
          );

          setCategories(
            categoryData
          );

          if (
            categoryData.length ===
            0
          ) {
            setCategoriesError(
              "No treatment categories found."
            );
          }
        } catch (error) {
          console.error(
            "LOAD CATEGORIES ERROR:",
            error
          );

          if (!mounted) {
            return;
          }

          setCategories([]);

          setCategoriesError(
            error instanceof Error
              ? error.message
              : "Failed to load categories."
          );
        } finally {
          if (mounted) {
            setCategoriesLoading(
              false
            );
          }
        }
      };

    loadCategories();

    return () => {
      mounted = false;
    };
  }, []);

  // ====================================================
  // UPDATE FORM WHEN EDIT DATA CHANGES
  // ====================================================

  useEffect(() => {
    if (!initialData) {
      return;
    }

    const normalizedStatus: FeedbackStatus =
      initialData.status ===
        "Approved" ||
      initialData.status ===
        "Rejected"
        ? initialData.status
        : "Pending";

    setForm({
      patientName:
        initialData.patientName ??
        "",

      patientImage:
        null,

      treatment:
        initialData.treatment ??
        "",

      rating:
        Number(
          initialData.rating ?? 5
        ),

      review:
        initialData.review ??
        "",

      status:
        normalizedStatus,

      date:
        initialData.date ??
        new Date()
          .toISOString()
          .split("T")[0],
    });

    const existingImage =
      initialData.patientImage;

    setImagePreview(
      typeof existingImage ===
        "string" &&
        existingImage.trim()
        ? getImageUrl(
            existingImage
          )
        : ""
    );

    setImagePreviewError(
      false
    );
  }, [
    initialData,
  ]);

  // ====================================================
  // INPUT CHANGE
  // ====================================================

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

    setForm(
      (previous) => ({
        ...previous,

        [name]:
          name === "rating"
            ? Number(value)
            : value,
      })
    );
  };

  // ====================================================
  // IMAGE CHANGE
  // ====================================================

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      e.target.files?.[0];

    if (!file) {
      return;
    }

    // ------------------------------------------
    // FILE TYPE
    // ------------------------------------------

    if (
      !file.type.startsWith(
        "image/"
      )
    ) {
      alert(
        "Please select a valid image."
      );

      e.target.value = "";

      return;
    }

    // ------------------------------------------
    // FILE SIZE
    // ------------------------------------------

    const maxFileSize =
      5 * 1024 * 1024;

    if (
      file.size >
      maxFileSize
    ) {
      alert(
        "Image size must be less than 5MB."
      );

      e.target.value = "";

      return;
    }

    // ------------------------------------------
    // STORE FILE
    // ------------------------------------------

    setForm(
      (previous) => ({
        ...previous,

        patientImage:
          file,
      })
    );

    // ------------------------------------------
    // PREVIEW
    // ------------------------------------------

    const previewURL =
      URL.createObjectURL(
        file
      );

    setImagePreview(
      previewURL
    );

    setImagePreviewError(
      false
    );
  };

  // ====================================================
  // REMOVE IMAGE
  // ====================================================

  const removeImage = () => {
    setForm(
      (previous) => ({
        ...previous,

        patientImage:
          null,
      })
    );

    setImagePreview("");

    setImagePreviewError(
      false
    );
  };

  // ====================================================
  // RESET
  // ====================================================

  const handleReset = () => {
    const resetForm: FeedbackFormData =
      {
        patientName: "",

        patientImage: null,

        treatment: "",

        rating: 5,

        review: "",

        status: "Pending",

        date:
          new Date()
            .toISOString()
            .split("T")[0],
      };

    setForm(
      resetForm
    );

    setImagePreview("");

    setImagePreviewError(
      false
    );
  };

  // ====================================================
  // SUBMIT
  // ====================================================

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    // ------------------------------------------
    // NORMALIZE
    // ------------------------------------------

    const normalizedData:
      FeedbackFormData = {
      patientName:
        form.patientName
          ?.trim() || "",

      patientImage:
        form.patientImage ??
        null,

      treatment:
        form.treatment
          ?.trim() || "",

      rating:
        Number(form.rating),

      review:
        form.review
          ?.trim() || "",

      status:
        form.status,

      date:
        form.date ||
        new Date()
          .toISOString()
          .split("T")[0],
    };

    // ------------------------------------------
    // VALIDATE PATIENT NAME
    // ------------------------------------------

    if (
      !normalizedData.patientName
    ) {
      alert(
        "Please enter patient name."
      );

      return;
    }

    // ------------------------------------------
    // VALIDATE TREATMENT
    // ------------------------------------------

    if (
      !normalizedData.treatment
    ) {
      alert(
        "Please select treatment."
      );

      return;
    }

    // ------------------------------------------
    // VALIDATE REVIEW
    // ------------------------------------------

    if (
      !normalizedData.review
    ) {
      alert(
        "Please enter patient review."
      );

      return;
    }

    // ------------------------------------------
    // VALIDATE RATING
    // ------------------------------------------

    if (
      !Number.isInteger(
        normalizedData.rating
      ) ||
      normalizedData.rating <
        1 ||
      normalizedData.rating >
        5
    ) {
      alert(
        "Rating must be between 1 and 5."
      );

      return;
    }

    console.log(
      "========== FEEDBACK FORM SUBMIT =========="
    );

    console.log(
      "FORM DATA:",
      normalizedData
    );

    console.log(
      "PATIENT IMAGE FILE:",
      normalizedData.patientImage
    );

    try {
      setLoading(true);

      await onSubmit(
        normalizedData
      );
    } catch (error) {
      console.error(
        "FEEDBACK SUBMIT ERROR:",
        error
      );

      throw error;
    } finally {
      setLoading(
        false
      );
    }
  };

  // ====================================================
  // JSX
  // ====================================================

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8"
    >

      {/* ==================================================
          PATIENT INFORMATION
      ================================================== */}

      <div>
        <h2 className="text-xl font-semibold text-slate-900">
          Patient Information
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Add patient details for this feedback.
        </p>
      </div>

      {/* ==================================================
          NAME + IMAGE
      ================================================== */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

        {/* NAME */}

        <div>
          <label
            htmlFor="patientName"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Patient Name
          </label>

          <input
            id="patientName"
            type="text"
            name="patientName"
            value={
              form.patientName
            }
            onChange={
              handleChange
            }
            placeholder="Enter patient name"
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
              focus:border-slate-500
              focus:ring-2
              focus:ring-slate-100
              disabled:bg-slate-100
            "
          />
        </div>

        {/* IMAGE */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Patient Image
          </label>

          <div className="flex items-center gap-4">

            {imagePreview &&
            !imagePreviewError ? (
              <div className="relative">

                <img
                  src={
                    imagePreview
                  }
                  alt="Patient preview"
                  className="
                    h-16
                    w-16
                    rounded-full
                    border
                    border-slate-200
                    object-cover
                  "
                  onError={() => {
                    setImagePreviewError(
                      true
                    );
                  }}
                />

                <button
                  type="button"
                  onClick={
                    removeImage
                  }
                  disabled={
                    loading
                  }
                  className="
                    absolute
                    -right-2
                    -top-2
                    rounded-full
                    bg-red-600
                    p-1
                    text-white
                    hover:bg-red-700
                    disabled:opacity-50
                  "
                >
                  <X size={14} />
                </button>

              </div>
            ) : (
              <div className="
                flex
                h-16
                w-16
                items-center
                justify-center
                overflow-hidden
                rounded-full
                bg-slate-100
                text-xs
                text-slate-400
              ">
                No Image
              </div>
            )}

            <label
              htmlFor="patientImage"
              className="
                flex
                cursor-pointer
                items-center
                gap-2
                rounded-xl
                border
                border-slate-300
                px-4
                py-2
                text-sm
                font-medium
                hover:bg-slate-50
              "
            >
              <Upload size={16} />

              Upload Image
            </label>

            <input
              id="patientImage"
              name="patientImage"
              type="file"
              accept="image/jpeg,image/png,image/jpg,image/webp"
              onChange={
                handleImage
              }
              disabled={
                loading
              }
              className="hidden"
            />

          </div>

          <p className="mt-2 text-xs text-slate-400">
            Maximum image size: 5MB
          </p>

        </div>
      </div>

      {/* ==================================================
          TREATMENT + DATE
      ================================================== */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

        {/* TREATMENT */}

        <div>
          <label
            htmlFor="treatment"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Treatment
          </label>

          <select
            id="treatment"
            name="treatment"
            value={
              form.treatment
            }
            onChange={
              handleChange
            }
            disabled={
              categoriesLoading ||
              loading
            }
            required
            className="
              h-11
              w-full
              rounded-xl
              border
              border-slate-300
              bg-white
              px-4
              outline-none
              focus:border-slate-500
              focus:ring-2
              focus:ring-slate-100
              disabled:bg-slate-100
            "
          >
            <option value="">
              {categoriesLoading
                ? "Loading treatments..."
                : "Select Treatment"}
            </option>

            {categories.map(
              (
                category
              ) => (
                <option
                  key={
                    category.id
                  }
                  value={
                    category.name
                  }
                >
                  {
                    category.name
                  }
                </option>
              )
            )}
          </select>

          {categoriesError && (
            <p className="mt-2 text-xs text-red-500">
              {
                categoriesError
              }
            </p>
          )}
        </div>

        {/* DATE */}

        <div>
          <label
            htmlFor="date"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Date
          </label>

          <input
            id="date"
            type="date"
            name="date"
            value={
              form.date
            }
            onChange={
              handleChange
            }
            required
            disabled={
              loading
            }
            className="
              h-11
              w-full
              rounded-xl
              border
              border-slate-300
              px-4
              outline-none
              focus:border-slate-500
            "
          />
        </div>
      </div>

      {/* ==================================================
          RATING + STATUS
      ================================================== */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

        {/* RATING */}

        <div>
          <label
            htmlFor="rating"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Rating
          </label>

          <select
            id="rating"
            name="rating"
            value={
              form.rating
            }
            onChange={
              handleChange
            }
            disabled={
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
              focus:border-slate-500
            "
          >
            <option value={5}>
              5 Stars
            </option>

            <option value={4}>
              4 Stars
            </option>

            <option value={3}>
              3 Stars
            </option>

            <option value={2}>
              2 Stars
            </option>

            <option value={1}>
              1 Star
            </option>
          </select>
        </div>

        {/* STATUS */}

        <div>
          <label
            htmlFor="status"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Status
          </label>

          <select
            id="status"
            name="status"
            value={
              form.status
            }
            onChange={
              handleChange
            }
            disabled={
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
              focus:border-slate-500
            "
          >
            <option value="Pending">
              Pending
            </option>

            <option value="Approved">
              Approved
            </option>

            <option value="Rejected">
              Rejected
            </option>
          </select>
        </div>
      </div>

      {/* ==================================================
          REVIEW
      ================================================== */}

      <div>
        <label
          htmlFor="review"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Patient Review
        </label>

        <textarea
          id="review"
          name="review"
          value={
            form.review
          }
          onChange={
            handleChange
          }
          rows={6}
          required
          maxLength={500}
          disabled={
            loading
          }
          placeholder="Enter patient review..."
          className="
            w-full
            resize-none
            rounded-xl
            border
            border-slate-300
            px-4
            py-3
            outline-none
            focus:border-slate-500
            focus:ring-2
            focus:ring-slate-100
            disabled:bg-slate-100
          "
        />

        <div className="mt-1 text-right text-xs text-slate-400">
          {
            form.review.length
          }
          /500
        </div>
      </div>

      {/* ==================================================
          BUTTONS
      ================================================== */}

      <div className="flex justify-end gap-4 border-t border-slate-200 pt-6">

        <button
          type="button"
          onClick={
            handleReset
          }
          disabled={
            loading
          }
          className="
            flex
            items-center
            gap-2
            rounded-xl
            border
            border-slate-300
            px-6
            py-3
            font-medium
            text-slate-700
            hover:bg-slate-100
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          <X size={18} />

          Reset
        </button>

        <button
          type="submit"
          disabled={
            loading ||
            categoriesLoading
          }
          className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-slate-900
            px-6
            py-3
            font-semibold
            text-white
            hover:bg-slate-800
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          <Save size={18} />

          {loading
            ? "Saving..."
            : submitLabel}
        </button>

      </div>
    </form>
  );
}