"use client";

import Image from "next/image";
import Link from "next/link";
import { Briefcase, GraduationCap, Clock3 } from "lucide-react";
import TeamStatus from "./TeamStatus";

interface TeamCardProps {
  id: number;
  name: string;
  designation: string;
  specialization: string;
  experience: string;
  image: string;
  status: "Active" | "Inactive";
}

export default function TeamCard({
  id,
  name,
  designation,
  specialization,
  experience,
  image,
  status,
}: TeamCardProps) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md">

      {/* Header */}

      <div className="flex items-start gap-4">

        <Image
          src={image}
          alt={name}
          width={72}
          height={72}
          className="h-18 w-18 rounded-xl object-cover"
        />

        <div className="flex-1">

          <div className="flex items-start justify-between">

            <div>
              <h3 className="text-lg font-semibold text-slate-800">
                {name}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {designation}
              </p>
            </div>

            <TeamStatus status={status} />

          </div>

          <div className="mt-4 space-y-2">

            <div className="flex items-center gap-2 text-sm text-slate-600">
              <GraduationCap size={16} />
              <span>{specialization}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Clock3 size={16} />
              <span>{experience}</span>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Briefcase size={16} />
              <span>{designation}</span>
            </div>

          </div>

        </div>

      </div>

      {/* Actions */}

      <div className="mt-6 flex gap-3">

        <Link
          href={`/team/${id}`}
          className="flex-1 rounded-xl border border-slate-200 py-2.5 text-center font-medium text-slate-700 transition hover:bg-slate-100"
        >
          View
        </Link>

        <Link
          href={`/team/${id}/edit`}
          className="flex-1 rounded-xl bg-blue-600 py-2.5 text-center font-medium text-white transition hover:bg-blue-700"
        >
          Edit
        </Link>

      </div>

    </div>
  );
}