"use client";

import Link from "next/link";
import { Clock3, IndianRupee, Tag } from "lucide-react";
import ServiceStatus from "./ServiceStatus";

interface ServiceCardProps {
  id: number;
  title: string;
  category: string;
  duration: string;
  price: string;
  status: "Active" | "Inactive";
}

export default function ServiceCard({
  id,
  title,
  category,
  duration,
  price,
  status,
}: ServiceCardProps) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md">

      {/* Header */}

      <div className="flex items-start justify-between">

        <div>
          <h3 className="text-lg font-semibold text-slate-800">
            {title}
          </h3>

          <p className="mt-1 flex items-center gap-2 text-sm text-slate-500">
            <Tag size={16} />
            {category}
          </p>
        </div>

        <ServiceStatus status={status} />
      </div>

      {/* Details */}

      <div className="mt-5 space-y-3">

        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Clock3 size={16} />
          <span>{duration}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-600">
          <IndianRupee size={16} />
          <span>{price}</span>
        </div>

      </div>

      {/* Actions */}

      <div className="mt-6 flex gap-3">

        <Link
          href={`/services/${id}`}
          className="flex-1 rounded-xl border border-slate-200 py-2 text-center font-medium text-slate-700 transition hover:bg-slate-100"
        >
          View
        </Link>

        <Link
          href={`/services/${id}/edit`}
          className="flex-1 rounded-xl bg-blue-600 py-2 text-center font-medium text-white transition hover:bg-blue-700"
        >
          Edit
        </Link>

      </div>
    </div>
  );
}