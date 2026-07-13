"use client";

import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  Stethoscope,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

import FeedbackStatus from "./FeedbackStatus";
import FeedbackRating from "./RatingStars";

interface FeedbackCardProps {
  id: number;
  patient: string;
  treatment: string;
  image: string;
  rating: number;
  status: "Approved" | "Pending" | "Rejected";
  date: string;
}

export default function FeedbackCard({
  id,
  patient,
  treatment,
  image,
  rating,
  status,
  date,
}: FeedbackCardProps) {
  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-md">

      {/* Header */}

      <div className="flex items-center gap-4 border-b p-5">

        <Image
          src={image}
          alt={patient}
          width={70}
          height={70}
          className="rounded-full object-cover"
        />

        <div className="flex-1">

          <h3 className="text-lg font-semibold text-slate-800">
            {patient}
          </h3>

          <div className="mt-2">
            <FeedbackRating rating={rating} />
          </div>

        </div>

        <FeedbackStatus status={status} />

      </div>

      {/* Details */}

      <div className="space-y-4 p-5">

        <div className="flex items-center gap-3 text-slate-600">

          <Stethoscope
            size={18}
            className="text-blue-600"
          />

          <span>{treatment}</span>

        </div>

        <div className="flex items-center gap-3 text-slate-600">

          <CalendarDays
            size={18}
            className="text-blue-600"
          />

          <span>{date}</span>

        </div>

      </div>

      {/* Footer */}

      <div className="flex items-center justify-between border-t p-5">

        <Link
          href={`/feedback/${id}`}
          className="flex items-center gap-2 rounded-lg border px-4 py-2 hover:bg-slate-100"
        >
          <Eye size={18} />
          View
        </Link>

        <div className="flex gap-2">

          <Link
            href={`/feedback/${id}/edit`}
            className="rounded-lg border p-2 hover:bg-blue-50"
          >
            <Pencil size={18} />
          </Link>

          <button
            className="rounded-lg border p-2 hover:bg-red-50"
          >
            <Trash2
              size={18}
              className="text-red-600"
            />
          </button>

        </div>

      </div>

    </div>
  );
}