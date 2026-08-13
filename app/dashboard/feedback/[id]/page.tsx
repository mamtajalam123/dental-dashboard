"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import {
  useParams,
  useRouter,
} from "next/navigation";

import {
  ArrowLeft,
  Pencil,
} from "lucide-react";

import { feedbackAPI } from "@/app/services/feedback.api";

import type { Feedback } from "@/types/feedback";

import RatingStars from "@/app/components/feedback/RatingStars";

import FeedbackStatus from "@/app/components/feedback/FeedbackStatus";

// =====================================================
// DEFAULT IMAGE
// =====================================================

const DEFAULT_IMAGE =
  "/images/default-user.png";

// =====================================================
// GET IMAGE URL
// =====================================================

const getImageUrl = (
  image?: string | null
): string => {
  // ---------------------------------------------------
  // No image
  // ---------------------------------------------------

  if (
    !image ||
    !image.trim()
  ) {
    return DEFAULT_IMAGE;
  }

  const imagePath =
    image.trim();

  // ---------------------------------------------------
  // Already full URL
  // ---------------------------------------------------

  if (
    imagePath.startsWith("http://") ||
    imagePath.startsWith("https://") ||
    imagePath.startsWith("blob:") ||
    imagePath.startsWith("data:")
  ) {
    return imagePath;
  }

  // ---------------------------------------------------
  // API URL
  // ---------------------------------------------------

  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000";

  // ---------------------------------------------------
  // Remove trailing slash
  // Remove /api if present
  // ---------------------------------------------------

  const serverUrl =
    apiUrl
      .replace(/\/+$/, "")
      .replace(/\/api$/, "");

  // ---------------------------------------------------
  // Clean image path
  // ---------------------------------------------------

  let cleanImagePath =
    imagePath.replace(
      /^\/+/,
      ""
    );

  // ---------------------------------------------------
  // Remove /api/
  // ---------------------------------------------------

  cleanImagePath =
    cleanImagePath.replace(
      /^api\//,
      ""
    );

  // ---------------------------------------------------
  // IMPORTANT
  //
  // If DB contains:
  //
  // feedback/file.jpg
  //
  // result:
  //
  // http://localhost:5000/feedback/file.jpg
  //
  // If DB contains:
  //
  // uploads/feedback/file.jpg
  //
  // result:
  //
  // http://localhost:5000/uploads/feedback/file.jpg
  // ---------------------------------------------------

  const finalUrl =
    `${serverUrl}/${cleanImagePath}`;

  console.log(
    "========== FEEDBACK IMAGE =========="
  );

  console.log(
    "IMAGE FROM DATABASE:",
    image
  );

  console.log(
    "SERVER URL:",
    serverUrl
  );

  console.log(
    "CLEAN IMAGE PATH:",
    cleanImagePath
  );

  console.log(
    "FINAL IMAGE URL:",
    finalUrl
  );

  console.log(
    "===================================="
  );

  return finalUrl;
};

export default function FeedbackDetailsPage() {
  const router = useRouter();

  const params = useParams();

  // =====================================================
  // GET ID
  // =====================================================

  const rawId = params?.id;

  const id = Number(
    Array.isArray(rawId)
      ? rawId[0]
      : rawId
  );

  // =====================================================
  // STATE
  // =====================================================

  const [
    feedback,
    setFeedback,
  ] = useState<Feedback | null>(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  // =====================================================
  // LOAD FEEDBACK
  // =====================================================

  const loadFeedback =
    useCallback(async () => {
      if (
        !Number.isInteger(id) ||
        id <= 0
      ) {
        router.replace(
          "/dashboard/feedback"
        );

        return;
      }

      try {
        setLoading(true);
        setError("");

        console.log(
          "=========================================="
        );

        console.log(
          "GET FEEDBACK"
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

        // =================================================
        // RESPONSE DATA
        // =================================================

        let rawData: any;

        if (
          response &&
          typeof response === "object" &&
          "data" in response
        ) {
          rawData =
            (response as any).data;
        } else {
          rawData =
            response;
        }

        console.log(
          "RAW FEEDBACK DATA:",
          rawData
        );

        if (
          !rawData ||
          !rawData.id
        ) {
          throw new Error(
            "Feedback not found."
          );
        }

        // =================================================
        // NORMALIZE DATABASE → FRONTEND
        // =================================================
        //
        // Database:
        // patient_image
        //
        // Frontend:
        // patientImage
        //
        // =================================================

        const normalizedFeedback: Feedback = {
          id: Number(
            rawData.id
          ),

          patientName:
            rawData.patientName ??
            rawData.patient_name ??
            "",

          patientImage:
            rawData.patientImage ??
            rawData.patient_image ??
            null,

          treatment:
            rawData.treatment ??
            "",

          rating:
            Number(
              rawData.rating
            ) || 0,

          review:
            rawData.review ??
            "",

          status:
            rawData.status ??
            "Inactive",

          date:
            rawData.date ??
            "",

          createdAt:
            rawData.createdAt ??
            rawData.created_at ??
            undefined,

          updatedAt:
            rawData.updatedAt ??
            rawData.updated_at ??
            undefined,
        };

        // =================================================
        // IMAGE DEBUG
        // =================================================

        console.log(
          "=========================================="
        );

        console.log(
          "NORMALIZED FEEDBACK:",
          normalizedFeedback
        );

        console.log(
          "DATABASE patient_image:",
          rawData.patient_image
        );

        console.log(
          "FRONTEND patientImage:",
          normalizedFeedback.patientImage
        );

        console.log(
          "IMAGE URL:",
          getImageUrl(
            normalizedFeedback.patientImage
          )
        );

        console.log(
          "=========================================="
        );

        setFeedback(
          normalizedFeedback
        );
      } catch (error) {
        console.error(
          "GET FEEDBACK ERROR:",
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
    }, [
      id,
      router,
    ]);

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {
    loadFeedback();
  }, [
    loadFeedback,
  ]);

  // =====================================================
  // STATUS UPDATE
  // =====================================================

  const handleStatusUpdate =
    async (
      newStatus: Feedback["status"]
    ) => {
      if (!feedback) {
        return;
      }

      try {
        await feedbackAPI.updateStatus(
          feedback.id,
          newStatus
        );

        setFeedback(
          (previous) => {
            if (!previous) {
              return previous;
            }

            return {
              ...previous,
              status: newStatus,
            };
          }
        );
      } catch (error) {
        console.error(
          "UPDATE FEEDBACK STATUS ERROR:",
          error
        );

        alert(
          error instanceof Error
            ? error.message
            : "Failed to update feedback status."
        );
      }
    };

  // =====================================================
  // LOADING
  // =====================================================

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

  // =====================================================
  // ERROR
  // =====================================================

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
              onClick={
                loadFeedback
              }
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

  // =====================================================
  // NOT FOUND
  // =====================================================

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
              text-sm
              font-medium
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

  // =====================================================
  // FINAL IMAGE URL
  // =====================================================

  const patientImage =
    getImageUrl(
      feedback.patientImage
    );

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div className="space-y-6">

      {/* =================================================
          HEADER
      ================================================= */}

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
            Feedback Details
          </h1>

          <p className="mt-1 text-slate-500">
            Feedback ID #{feedback.id}
          </p>

        </div>

        <div className="flex items-center gap-3">

          {/* BACK */}

          <button
            type="button"
            onClick={() =>
              router.back()
            }
            className="
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-slate-300
              px-4
              py-2.5
              text-sm
              font-medium
              text-slate-700
              transition
              hover:bg-slate-100
            "
          >
            <ArrowLeft size={18} />
            Back
          </button>

          {/* EDIT */}

          <Link
            href={`/dashboard/feedback/edit/${feedback.id}`}
            className="
              flex
              items-center
              gap-2
              rounded-xl
              bg-blue-600
              px-5
              py-2.5
              text-sm
              font-medium
              text-white
              transition
              hover:bg-blue-700
            "
          >
            <Pencil size={17} />
            Edit
          </Link>

        </div>

      </div>

      {/* =================================================
          PATIENT CARD
      ================================================= */}

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

        <div className="flex items-center gap-5">

          {/* PATIENT IMAGE */}

          <img
            src={patientImage}
            alt={
              feedback.patientName ||
              "Patient"
            }
            className="
              h-[90px]
              w-[90px]
              rounded-full
              border
              border-slate-200
              object-cover
            "
            onError={(event) => {
              const image =
                event.currentTarget;

              if (
                !image.src.includes(
                  DEFAULT_IMAGE
                )
              ) {
                image.src =
                  DEFAULT_IMAGE;
              }
            }}
          />

          {/* PATIENT INFO */}

          <div>

            <h2 className="text-xl font-semibold text-slate-900">
              {feedback.patientName ||
                "-"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Patient
            </p>

          </div>

        </div>

      </div>

      {/* =================================================
          FEEDBACK INFORMATION
      ================================================= */}

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

        <h2 className="mb-6 text-xl font-semibold text-slate-900">
          Feedback Information
        </h2>

        <div className="grid gap-6 md:grid-cols-2">

          {/* TREATMENT */}

          <div>

            <p className="mb-1 text-sm text-slate-500">
              Treatment
            </p>

            <p className="font-medium text-slate-900">
              {feedback.treatment ||
                "-"}
            </p>

          </div>

          {/* DATE */}

          <div>

            <p className="mb-1 text-sm text-slate-500">
              Date
            </p>

            <p className="font-medium text-slate-900">
              {feedback.date ||
                "-"}
            </p>

          </div>

          {/* RATING */}

          <div>

            <p className="mb-2 text-sm text-slate-500">
              Rating
            </p>

            <RatingStars
              rating={
                Number(
                  feedback.rating
                ) || 0
              }
            />

          </div>

          {/* STATUS */}

          <div>

            <p className="mb-2 text-sm text-slate-500">
              Status
            </p>

            <FeedbackStatus
              id={feedback.id}
              status={
                feedback.status
              }
              onUpdate={
                handleStatusUpdate
              }
            />

          </div>

        </div>

      </div>

      {/* =================================================
          PATIENT REVIEW
      ================================================= */}

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

        <h2 className="mb-4 text-xl font-semibold text-slate-900">
          Patient Review
        </h2>

        <div className="rounded-xl bg-slate-50 p-5">

          <p className="leading-7 text-slate-600">
            {feedback.review ||
              "No review provided."}
          </p>

        </div>

      </div>

    </div>
  );
}