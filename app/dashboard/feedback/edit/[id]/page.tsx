"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

import { ArrowLeft } from "lucide-react";

import FeedbackForm, {
  FeedbackFormData,
} from "@/app/components/feedback/FeedbackForm";

import { feedbackAPI } from "@/app/services/feedback.api";

import type { Feedback } from "@/types/feedback";

export default function EditFeedbackPage() {
  const router = useRouter();
  const params = useParams();

  // ==========================================
  // GET ID
  // ==========================================

  const rawId = params?.id;

  const id =
    typeof rawId === "string"
      ? Number(rawId)
      : Array.isArray(rawId)
      ? Number(rawId[0])
      : NaN;

  // ==========================================
  // STATES
  // ==========================================

  const [feedback, setFeedback] =
    useState<Feedback | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  // ==========================================
  // LOAD FEEDBACK
  // ==========================================

  const loadFeedback =
    useCallback(async () => {
      if (
        !Number.isInteger(id) ||
        id <= 0
      ) {
        setError(
          "Invalid feedback ID."
        );

        setLoading(false);

        return;
      }

      try {
        setLoading(true);
        setError("");

        console.log(
          "=========================================="
        );

        console.log(
          "========== LOAD FEEDBACK =========="
        );

        console.log(
          "FEEDBACK ID:",
          id
        );

        const response =
          await feedbackAPI.getById(id);

        console.log(
          "RAW FEEDBACK RESPONSE:",
          response
        );

        // ======================================
        // RESPONSE DATA
        // ======================================

        const data =
          (response as any)?.data ??
          response;

        if (
          !data ||
          !data.id
        ) {
          throw new Error(
            "Feedback not found."
          );
        }

        // ======================================
        // NORMALIZE
        // ======================================

        const normalizedFeedback:
          Feedback = {
            id: Number(data.id),

            patientName:
              data.patientName ??
              data.patient_name ??
              "",

            patientImage:
              data.patient_image ??
              data.patientImage ??
              null,

            treatment:
              data.treatment ??
              "",

            rating:
              Number(data.rating) ||
              0,

            review:
              data.review ??
              "",

            status:
              data.status ??
              "Inactive",

            date:
              data.date ??
              "",

            createdAt:
              data.createdAt ??
              data.created_at ??
              undefined,

            updatedAt:
              data.updatedAt ??
              data.updated_at ??
              undefined,
          };

        console.log(
          "========== NORMALIZED FEEDBACK =========="
        );

        console.log(
          normalizedFeedback
        );

        console.log(
          "patient_image:",
          data.patient_image
        );

        console.log(
          "patientImage:",
          normalizedFeedback.patientImage
        );

        setFeedback(
          normalizedFeedback
        );

      } catch (error) {
        console.error(
          "LOAD FEEDBACK ERROR:",
          error
        );

        setFeedback(null);

        setError(
          error instanceof Error
            ? error.message
            : "Failed to load feedback."
        );
      } finally {
        setLoading(false);
      }
    }, [id]);

  // ==========================================
  // INITIAL LOAD
  // ==========================================

  useEffect(() => {
    loadFeedback();
  }, [loadFeedback]);

  // ==========================================
  // UPDATE FEEDBACK
  // ==========================================

  const handleSubmit = async (
    data: FeedbackFormData
  ) => {
    if (
      !Number.isInteger(id) ||
      id <= 0
    ) {
      throw new Error(
        "Invalid feedback ID."
      );
    }

    try {
      setSaving(true);

      // ======================================
      // NORMALIZE
      // ======================================

      const patientName =
        typeof data.patientName ===
          "string"
          ? data.patientName.trim()
          : "";

      const treatment =
        typeof data.treatment ===
          "string"
          ? data.treatment.trim()
          : "";

      const rating =
        Number(data.rating);

      const review =
        typeof data.review ===
          "string"
          ? data.review.trim()
          : "";

      const status =
        data.status;

      const date =
        typeof data.date ===
          "string"
          ? data.date
          : "";

      // ======================================
      // VALIDATION
      // ======================================

      if (!patientName) {
        throw new Error(
          "Patient name is required."
        );
      }

      if (!treatment) {
        throw new Error(
          "Treatment is required."
        );
      }

      if (
        !Number.isInteger(rating) ||
        rating < 1 ||
        rating > 5
      ) {
        throw new Error(
          "Rating must be between 1 and 5."
        );
      }

      if (!review) {
        throw new Error(
          "Patient review is required."
        );
      }

      if (!status) {
        throw new Error(
          "Feedback status is required."
        );
      }

      if (!date) {
        throw new Error(
          "Feedback date is required."
        );
      }

      // ======================================
      // CREATE FORMDATA
      // ======================================

      const formData =
        new FormData();

      formData.append(
        "patientName",
        patientName
      );

      formData.append(
        "treatment",
        treatment
      );

      formData.append(
        "rating",
        String(rating)
      );

      formData.append(
        "review",
        review
      );

      formData.append(
        "status",
        status
      );

      formData.append(
        "date",
        date
      );

      // ======================================
      // PATIENT IMAGE
      // ======================================

      if (
        data.patientImage instanceof File
      ) {
        console.log(
          "NEW PATIENT IMAGE:",
          {
            name:
              data.patientImage.name,

            type:
              data.patientImage.type,

            size:
              data.patientImage.size,
          }
        );

        /*
         * IMPORTANT:
         *
         * Backend field:
         *
         * patient_image
         */

        formData.append(
          "patient_image",
          data.patientImage
        );
      } else {
        console.log(
          "NO NEW PATIENT IMAGE SELECTED"
        );
      }

      // ======================================
      // DEBUG
      // ======================================

      console.log(
        "========== UPDATE FEEDBACK FORMDATA =========="
      );

      for (
        const [
          key,
          value,
        ] of formData.entries()
      ) {
        if (
          value instanceof File
        ) {
          console.log(
            `${key}:`,
            {
              name:
                value.name,

              type:
                value.type,

              size:
                value.size,
            }
          );
        } else {
          console.log(
            `${key}:`,
            value
          );
        }
      }

      // ======================================
      // API
      // ======================================

      const response =
        await feedbackAPI.update(
          id,
          formData
        );

      console.log(
        "UPDATE FEEDBACK RESPONSE:",
        response
      );

      // ======================================
      // SUCCESS
      // ======================================

      alert(
        "Feedback updated successfully."
      );

      router.push(
        "/dashboard/feedback"
      );

      router.refresh();

    } catch (error) {
      console.error(
        "UPDATE FEEDBACK ERROR:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Failed to update feedback."
      );

      throw error;
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">

          <div
            className="
              mx-auto
              mb-4
              h-10
              w-10
              animate-spin
              rounded-full
              border-4
              border-slate-200
              border-t-blue-600
            "
          />

          <p className="text-slate-500">
            Loading feedback...
          </p>

        </div>
      </div>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="max-w-md text-center">

          <h2 className="text-2xl font-bold text-slate-900">
            Failed to Load Feedback
          </h2>

          <p className="mt-2 text-sm text-red-500">
            {error}
          </p>

          <div className="mt-6 flex justify-center gap-3">

            <button
              type="button"
              onClick={loadFeedback}
              className="
                rounded-xl
                bg-slate-900
                px-5
                py-3
                text-sm
                font-medium
                text-white
                transition
                hover:bg-slate-800
              "
            >
              Try Again
            </button>

            <button
              type="button"
              onClick={() =>
                router.push(
                  "/dashboard/feedback"
                )
              }
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
                hover:bg-slate-50
              "
            >
              Back
            </button>

          </div>

        </div>
      </div>
    );
  }

  // ==========================================
  // NOT FOUND
  // ==========================================

  if (!feedback) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">

          <h2 className="text-2xl font-bold text-slate-900">
            Feedback Not Found
          </h2>

          <p className="mt-2 text-slate-500">
            The requested feedback could not be found.
          </p>

          <button
            type="button"
            onClick={() =>
              router.push(
                "/dashboard/feedback"
              )
            }
            className="
              mt-6
              rounded-xl
              bg-slate-900
              px-5
              py-3
              text-white
              transition
              hover:bg-slate-800
            "
          >
            Back to Feedback
          </button>

        </div>
      </div>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div className="space-y-6">

      {/* HEADER */}

      <div
        className="
          flex
          flex-col
          gap-4
          md:flex-row
          md:items-center
          md:justify-between
        "
      >

        <div className="flex items-center gap-4">

          <button
            type="button"
            onClick={() =>
              router.back()
            }
            disabled={saving}
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              border
              border-slate-300
              bg-white
              px-4
              py-2.5
              text-sm
              font-medium
              text-slate-700
              shadow-sm
              transition
              hover:bg-slate-50
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <ArrowLeft size={18} />

            Back
          </button>

          <div>

            <h1 className="text-3xl font-bold text-slate-900">
              Edit Feedback
            </h1>

            <p className="mt-1 text-slate-500">
              Update patient review and testimonial details.
            </p>

          </div>

        </div>

      </div>

      {/* FORM */}

      <div
        className="
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-6
          shadow-sm
        "
      >

        <FeedbackForm
          initialData={feedback}
          onSubmit={handleSubmit}
          submitLabel={
            saving
              ? "Updating..."
              : "Update Feedback"
          }
        />

      </div>

    </div>
  );
}