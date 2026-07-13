"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { ArrowLeft, Pencil } from "lucide-react";

import { feedbackData } from "@/data/feedback";
import RatingStars from "@/app/components/feedback/RatingStars";
import FeedbackStatus from "@/app/components/feedback/FeedbackStatus";

export default function ViewFeedbackPage() {
  const params = useParams();

  const id = Number(params.id);

  const feedback = feedbackData.find(
    (item) => item.id === id
  );

  if (!feedback) {
    notFound();
  }

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Feedback Details
          </h1>

          <p className="mt-1 text-slate-500">
            View complete patient feedback.
          </p>
        </div>

        <div className="flex gap-3">

          <Link
            href="/dashboard/feedback"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
          >
            <ArrowLeft size={18} />
            Back
          </Link>

          

        </div>

      </div>

      {/* Card */}

      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

        <div className="flex flex-col gap-8 lg:flex-row">

          {/* Image */}

          <div className="flex justify-center lg:w-72">

            <Image
              src={feedback.patientImage}
              alt={feedback.patientName}
              width={250}
              height={250}
              className="rounded-2xl object-cover"
            />

          </div>

          {/* Details */}

          <div className="flex-1 space-y-6">

            <div>
              <h2 className="text-3xl font-bold text-slate-800">
                {feedback.patientName}
              </h2>

              <p className="mt-2 text-slate-500">
                {feedback.treatment}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

              <div>
                <p className="mb-2 text-sm font-semibold text-slate-500">
                  Rating
                </p>

                <RatingStars rating={feedback.rating} />
              </div>

              <div>
                <p className="mb-2 text-sm font-semibold text-slate-500">
                  Status
                </p>

                <FeedbackStatus status={feedback.status} />
              </div>

              <div>
                <p className="mb-2 text-sm font-semibold text-slate-500">
                  Date
                </p>

                <p className="font-medium text-slate-700">
                  {feedback.date}
                </p>
              </div>

            </div>

            <div>
              <h3 className="mb-3 text-lg font-semibold text-slate-800">
                Patient Review
              </h3>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 leading-7 text-slate-600">
                {feedback.review}
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}