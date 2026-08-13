
"use client";

import {
  useCallback,
  useEffect,
  useState,
} from "react";

import Image from "next/image";
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

export default function ViewFeedbackPage() {
  const router = useRouter();
  const params = useParams();

  // ==========================================
  // GET ID
  // ==========================================

  const rawId = params?.id;

  const id = Number(
    Array.isArray(rawId)
      ? rawId[0]
      : rawId
  );

  // ==========================================
  // STATES
  // ==========================================

  const [feedback, setFeedback] =
    useState<Feedback | null>(null);

  const [loading, setLoading] =
    useState(true);

  // ==========================================
  // LOAD FEEDBACK
  // ==========================================

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

        if (
          !data ||
          !data.id
        ) {
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

        alert(
          error instanceof Error
            ? error.message
            : "Failed to load feedback."
        );

        router.replace(
          "/dashboard/feedback"
        );
      } finally {
        setLoading(false);
      }
    },
    [id, router]
  );

  // ==========================================
  // INITIAL LOAD
  // ==========================================

  useEffect(() => {
    loadFeedback();
  }, [loadFeedback]);

  // ==========================================
  // IMAGE ERROR
  // ==========================================

  const handleImageError = (
    event: React.SyntheticEvent<HTMLImageElement>
  ) => {
    event.currentTarget.style.display =
      "none";
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
  // NOT FOUND
  // ==========================================

  if (!feedback) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-slate-800">
            Feedback not found
          </h2>

          <p className="mt-2 text-slate-500">
            The requested feedback could not
            be found.
          </p>

          <Link
            href="/dashboard/feedback"
            className="
              mt-6
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-slate-900
              px-5
              py-3
              font-medium
              text-white
              hover:bg-slate-800
            "
          >
            <ArrowLeft size={18} />

            Back to Feedback
          </Link>
        </div>
      </div>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div className="space-y-6">

      {/* =====================================
          HEADER
      ===================================== */}

      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

        {/* TITLE */}

        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Feedback Details
          </h1>

          <p className="mt-1 text-slate-500">
            View complete patient feedback.
          </p>
        </div>

        {/* ACTIONS */}

        <div className="flex gap-3">

          {/* BACK */}

          <button
            type="button"
            onClick={() =>
              router.back()
            }
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              border
              border-slate-300
              px-5
              py-3
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
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-blue-600
              px-5
              py-3
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

      {/* =====================================
          MAIN CARD
      ===================================== */}

      <div className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-8
        shadow-sm
      ">

        <div className="flex flex-col gap-8 lg:flex-row">

          {/* =================================
              PATIENT IMAGE
          ================================= */}

          <div className="
            flex
            justify-center
            lg:w-72
            lg:shrink-0
          ">

            {feedback.patientImage ? (
              <Image
                src={feedback.patientImage}
                alt={
                  feedback.patientName ||
                  "Patient"
                }
                width={250}
                height={250}
                className="
                  h-[250px]
                  w-[250px]
                  rounded-2xl
                  object-cover
                "
                onError={
                  handleImageError
                }
              />
            ) : (
              <div className="
                flex
                h-[250px]
                w-[250px]
                items-center
                justify-center
                rounded-2xl
                bg-slate-100
                text-slate-400
              ">
                No Image
              </div>
            )}

          </div>

          {/* =================================
              DETAILS
          ================================= */}

          <div className="flex-1 space-y-6">

            {/* PATIENT */}

            <div>
              <h2 className="
                text-3xl
                font-bold
                text-slate-800
              ">
                {feedback.patientName || "-"}
              </h2>

              <p className="
                mt-2
                text-slate-500
              ">
                {feedback.treatment || "-"}
              </p>
            </div>

            {/* INFORMATION */}

            <div className="
              grid
              grid-cols-1
              gap-6
              md:grid-cols-2
            ">

              {/* RATING */}

              <div>
                <p className="
                  mb-2
                  text-sm
                  font-semibold
                  text-slate-500
                ">
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
                <p className="
                  mb-2
                  text-sm
                  font-semibold
                  text-slate-500
                ">
                  Status
                </p>

                <FeedbackStatus
                  id={feedback.id}
                  status={feedback.status}
                  onUpdate={loadFeedback}
                />
              </div>

              {/* TREATMENT */}

              <div>
                <p className="
                  mb-2
                  text-sm
                  font-semibold
                  text-slate-500
                ">
                  Treatment
                </p>

                <p className="
                  font-medium
                  text-slate-700
                ">
                  {feedback.treatment || "-"}
                </p>
              </div>

              {/* DATE */}

              <div>
                <p className="
                  mb-2
                  text-sm
                  font-semibold
                  text-slate-500
                ">
                  Date
                </p>

                <p className="
                  font-medium
                  text-slate-700
                ">
                  {feedback.date || "-"}
                </p>
              </div>

            </div>

            {/* =================================
                REVIEW
            ================================= */}

            <div>

              <h3 className="
                mb-3
                text-lg
                font-semibold
                text-slate-800
              ">
                Patient Review
              </h3>

              <div className="
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                p-5
                leading-7
                text-slate-600
              ">
                {feedback.review ||
                  "No review provided."}
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
