"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { ArrowLeft } from "lucide-react";

import FeedbackForm, {
  FeedbackFormData,
} from "@/app/components/feedback/FeedbackForm";

import { feedbackAPI } from "@/app/services/feedback.api";

export default function AddFeedbackPage() {
  const router = useRouter();

  const [saving, setSaving] =
    useState(false);

  // ==========================================
  // CREATE FEEDBACK
  // ==========================================

  const handleSubmit = async (
    data: FeedbackFormData
  ) => {
    try {
      setSaving(true);

      console.log(
        "=========================================="
      );

      console.log(
        "========== CREATE FEEDBACK =========="
      );

      console.log(
        "RAW FORM DATA:",
        data
      );

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

      // ======================================
      // PATIENT NAME
      // ======================================

      formData.append(
        "patientName",
        patientName
      );

      // ======================================
      // TREATMENT
      // ======================================

      formData.append(
        "treatment",
        treatment
      );

      // ======================================
      // RATING
      // ======================================

      formData.append(
        "rating",
        String(rating)
      );

      // ======================================
      // REVIEW
      // ======================================

      formData.append(
        "review",
        review
      );

      // ======================================
      // STATUS
      // ======================================

      formData.append(
        "status",
        status
      );

      // ======================================
      // DATE
      // ======================================

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
          "PATIENT IMAGE FILE:",
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
         * Backend / Multer field:
         *
         * patient_image
         */

        formData.append(
          "patient_image",
          data.patientImage
        );
      } else {
        console.log(
          "NO PATIENT IMAGE FILE SELECTED"
        );
      }

      // ======================================
      // DEBUG FORMDATA
      // ======================================

      console.log(
        "========== CREATE FEEDBACK FORMDATA =========="
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

      console.log(
        "=========================================="
      );

      // ======================================
      // API REQUEST
      // ======================================

      const response =
        await feedbackAPI.create(
          formData
        );

      console.log(
        "========== CREATE FEEDBACK RESPONSE =========="
      );

      console.log(
        "API RESPONSE:",
        response
      );

      console.log(
        "=========================================="
      );

      // ======================================
      // SUCCESS
      // ======================================

      alert(
        "Feedback created successfully."
      );

      router.push(
        "/dashboard/feedback"
      );

      router.refresh();

    } catch (error) {
      console.error(
        "CREATE FEEDBACK ERROR:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Failed to create feedback."
      );
    } finally {
      setSaving(false);
    }
  };

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

        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Add Feedback
          </h1>

          <p className="mt-2 text-slate-500">
            Create a new patient testimonial.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            router.push(
              "/dashboard/feedback"
            )
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
            transition
            hover:bg-slate-100
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          <ArrowLeft size={18} />

          Back
        </button>

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
          onSubmit={handleSubmit}
          submitLabel={
            saving
              ? "Creating..."
              : "Create Feedback"
          }
        />

      </div>

    </div>
  );
}