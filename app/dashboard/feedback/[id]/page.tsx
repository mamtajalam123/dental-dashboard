
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

import { Feedback } from "@/types/feedback";

import RatingStars from "@/app/components/feedback/RatingStars";

import FeedbackStatus from "@/app/components/feedback/FeedbackStatus";

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

  const [feedback, setFeedback] =
    useState<Feedback | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // =====================================================
  // LOAD FEEDBACK
  // =====================================================

  const loadFeedback = useCallback(
    async () => {
      if (!id || Number.isNaN(id)) {
        router.replace(
          "/dashboard/feedback"
        );

        return;
      }

      try {
        setLoading(true);
        setError("");

        console.log(
          "GET FEEDBACK ID:",
          id
        );

        const response =
          await feedbackAPI.getById(id);

        console.log(
          "GET FEEDBACK RESPONSE:",
          response
        );

        /*
         * Supports:
         *
         * {
         *   data: {...}
         * }
         *
         * OR
         *
         * {...}
         */

        const data =
          (response as any)?.data ??
          response;

        if (!data || !data.id) {
          throw new Error(
            "Feedback not found."
          );
        }

        setFeedback(data);
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
    },
    [id, router]
  );

  // =====================================================
  // INITIAL LOAD
  // =====================================================

  useEffect(() => {
    loadFeedback();
  }, [loadFeedback]);

  // =====================================================
  // STATUS UPDATE
  // =====================================================

  const handleStatusUpdate = async (
    newStatus: Feedback["status"]
  ) => {
    if (!feedback) {
      return;
    }

    try {
      /*
       * Update backend first
       */
      await feedbackAPI.updateStatus(
        feedback.id,
        newStatus
      );

      /*
       * Update UI after successful API request
       */
      setFeedback((prev) => {
        if (!prev) {
          return prev;
        }

        return {
          ...prev,
          status: newStatus,
        };
      });
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
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

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
              onClick={loadFeedback}
              className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
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
              className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
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
            className="mt-6 rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Back to Feedback
          </button>
        </div>
      </div>
    );
  }

  // =====================================================
  // IMAGE
  // =====================================================

  const patientImage =
    feedback.patientImage?.trim();

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div className="space-y-6">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        {/* LEFT */}

        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Feedback Details
          </h1>

          <p className="mt-1 text-slate-500">
            Feedback ID #{feedback.id}
          </p>
        </div>

        {/* RIGHT ACTIONS */}

        <div className="flex items-center gap-3">

          {/* BACK */}

          <button
            type="button"
            onClick={() =>
              router.back()
            }
            className="flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
          >
            <ArrowLeft size={18} />

            Back
          </button>

          {/* EDIT */}

          <Link
            href={`/dashboard/feedback/edit/${feedback.id}`}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            <Pencil size={17} />

            Edit
          </Link>

        </div>

      </div>

      {/* =================================================
          PATIENT CARD
      ================================================= */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="flex items-center gap-5">

          {/* PATIENT IMAGE */}

          {patientImage ? (
            <img
              src={patientImage}
              alt={
                feedback.patientName ||
                "Patient"
              }
              className="h-[90px] w-[90px] rounded-full border border-slate-200 object-cover"
              onError={(event) => {
                event.currentTarget.style.display =
                  "none";
              }}
            />
          ) : (
            <div className="flex h-[90px] w-[90px] items-center justify-center rounded-full bg-slate-100 text-sm font-medium text-slate-400">
              No Image
            </div>
          )}

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

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

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
              {feedback.date || "-"}
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

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

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
