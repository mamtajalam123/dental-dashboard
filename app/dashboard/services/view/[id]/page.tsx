"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import {
  ArrowLeft,
  Pencil,
  Clock3,
  FolderOpen,
  FileText,
} from "lucide-react";


import StatusBadge from "@/app/components/services/StatusBadge";
import { services } from "@/app/data/services";

export default function ViewServicePage() {
  const params = useParams();

  const id = Number(params.id);

  const service = services.find(
    (item) => item.id === id
  );

  if (!service) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center shadow-sm">

        <h2 className="text-2xl font-bold text-red-600">
          Service Not Found
        </h2>

        <p className="mt-3 text-slate-500">
          This service does not exist.
        </p>

        <Link
          href="/dashboard/services"
          className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-white"
        >
          Back to Services
        </Link>

      </div>
    );
  }

  return (

    <div className="space-y-6">

      {/* Header */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div className="flex items-center gap-3">

          <Link
            href="/dashboard/services"
            className="rounded-xl border border-slate-300 p-2 hover:bg-slate-100"
          >
            <ArrowLeft size={20} />
          </Link>

          <div>

            <h1 className="text-3xl font-bold">
              Service Details
            </h1>

            <p className="text-slate-500">
              View service information.
            </p>

          </div>

        </div>

      

      </div>

      {/* Card */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        {/* Image */}

        <div className="relative h-72 w-full bg-slate-100">

          <Image
            src={service.image}
            alt={service.name}
            fill
            className="object-cover"
          />

        </div>

        {/* Content */}

        <div className="space-y-8 p-8">

          {/* Name */}

          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

            <div>

              <h2 className="text-3xl font-bold text-slate-900">
                {service.name}
              </h2>

              <p className="mt-2 text-slate-500">
                Dental Clinic Service
              </p>

            </div>

            <StatusBadge status={service.status} />

          </div>

          {/* Information */}

          <div className="grid gap-6 md:grid-cols-2">

            <div className="rounded-xl border border-slate-200 p-5">

              <div className="flex items-center gap-3">

                <FolderOpen
                  size={22}
                  className="text-blue-600"
                />

                <div>

                  <p className="text-sm text-slate-500">
                    Category
                  </p>

                  <h3 className="font-semibold">
                    {service.category}
                  </h3>

                </div>

              </div>

            </div>

            <div className="rounded-xl border border-slate-200 p-5">

              <div className="flex items-center gap-3">

                <Clock3
                  size={22}
                  className="text-green-600"
                />

                <div>

                  <p className="text-sm text-slate-500">
                    Duration
                  </p>

                  <h3 className="font-semibold">
                    {service.duration}
                  </h3>

                </div>

              </div>

            </div>

          </div>

          {/* Description */}

          <div className="rounded-xl border border-slate-200 p-6">

            <div className="mb-4 flex items-center gap-2">

              <FileText
                size={20}
                className="text-blue-600"
              />

              <h3 className="text-lg font-semibold">
                Description
              </h3>

            </div>

            <p className="leading-8 text-slate-600">
              {service.description}
            </p>

          </div>

        </div>

      </div>

    </div>

  );
}