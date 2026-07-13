"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { ArrowLeft, Pencil, CalendarDays, FolderOpen } from "lucide-react";

import { galleryData } from "@/data/gallery";
import GalleryStatus from "@/app/components/gallery/GalleryStatus";

export default function ViewGalleryPage() {
  const params = useParams();

  const id = Number(params.id);

  const item = galleryData.find(
    (gallery) => gallery.id === id
  );

  if (!item) {
    notFound();
  }

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

        <div>

          <h1 className="text-3xl font-bold text-slate-800">
            Gallery Details
          </h1>

          <p className="mt-2 text-slate-500">
            View gallery information.
          </p>

        </div>

        <div className="flex gap-3">

          <Link
            href="/dashboard/gallery"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
          >
            <ArrowLeft size={18} />
            Back
          </Link>

          <Link
            href={`/dashboard/gallery/edit/${item.id}`}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            <Pencil size={18} />
            Edit
          </Link>

        </div>

      </div>

      {/* Card */}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="grid gap-8 lg:grid-cols-2">

          {/* Image */}

          <div className="relative h-[500px]">

            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover"
            />

          </div>

          {/* Details */}

          <div className="space-y-6 p-8">

            <div>

              <h2 className="text-3xl font-bold text-slate-800">
                {item.title}
              </h2>

              <div className="mt-4">
                <GalleryStatus status={item.status} />
              </div>

            </div>

            <div className="grid gap-5">

              <div className="flex items-center gap-3">

                <FolderOpen
                  size={20}
                  className="text-blue-600"
                />

                <div>

                  <p className="text-sm text-slate-500">
                    Category
                  </p>

                  <p className="font-semibold text-slate-700">
                    {item.category}
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-3">

                <CalendarDays
                  size={20}
                  className="text-blue-600"
                />

                <div>

                  <p className="text-sm text-slate-500">
                    Created Date
                  </p>

                  <p className="font-semibold text-slate-700">
                    {item.createdAt}
                  </p>

                </div>

              </div>

            </div>

            <div>

              <h3 className="mb-3 text-lg font-semibold text-slate-800">
                Description
              </h3>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 leading-7 text-slate-600">
                {item.description}
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}