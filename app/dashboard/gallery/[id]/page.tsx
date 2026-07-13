import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Pencil,
  Trash2,
  CalendarDays,
  FolderOpen,
  Star,
} from "lucide-react";
import GalleryStatus from "@/app/components/gallery/GalleryStatus";
import GalleryPreview from "@/app/components/gallery/GalleryPreview";



interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function GalleryDetailsPage({
  params,
}: PageProps) {
  const { id } = await params;

  // Temporary Mock Data
  const gallery = {
    id,
    title: "Smile Makeover",
    category: "Before & After",
    featured: true,
    status: "Active" as const,
    createdAt: "15 July 2026",

    description:
      "Complete smile makeover treatment showing the patient's condition before treatment and the final result after cosmetic dental procedures.",

    coverImage: "/gallery/gallery-1.jpg",

    beforeImage: "/gallery/before.jpg",

    afterImage: "/gallery/after.jpg",

    images: [
      "/gallery/gallery-1.jpg",
      "/gallery/gallery-2.jpg",
      "/gallery/gallery-3.jpg",
      "/gallery/gallery-4.jpg",
    ],
  };

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div className="flex items-center gap-4">

          <Link
            href="/gallery"
            className="flex h-10 w-10 items-center justify-center rounded-xl border hover:bg-slate-100"
          >
            <ArrowLeft size={20} />
          </Link>

          <div>

            <h1 className="text-3xl font-bold">
              {gallery.title}
            </h1>

            <p className="text-slate-500">
              Gallery Details
            </p>

          </div>

        </div>

        <div className="flex gap-3">

          <Link
            href={`/gallery/${gallery.id}/edit`}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
          >
            <Pencil size={18} />
            Edit
          </Link>

          <button className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-white hover:bg-red-700">
            <Trash2 size={18} />
            Delete
          </button>

        </div>

      </div>

      {/* Cover Image */}

      <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">

        <Image
          src={gallery.coverImage}
          alt={gallery.title}
          width={1400}
          height={700}
          className="h-[420px] w-full object-cover"
        />

      </div>

      {/* Information */}

      <div className="grid gap-6 lg:grid-cols-3">

        {/* Left */}

        <div className="rounded-2xl border bg-white p-6 shadow-sm">

          <h2 className="mb-5 text-xl font-semibold">
            Information
          </h2>

          <div className="space-y-5">

            <Info
              icon={<FolderOpen size={18} />}
              label="Category"
              value={gallery.category}
            />

            <Info
              icon={<CalendarDays size={18} />}
              label="Created"
              value={gallery.createdAt}
            />

            <div>

              <p className="mb-2 text-sm text-slate-500">
                Status
              </p>

              <GalleryStatus
                status={gallery.status}
              />

            </div>

            {gallery.featured && (

              <div className="inline-flex items-center gap-2 rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">

                <Star
                  size={16}
                  fill="currentColor"
                />

                Featured

              </div>

            )}

          </div>

        </div>

        {/* Right */}

        <div className="rounded-2xl border bg-white p-6 shadow-sm lg:col-span-2">

          <h2 className="mb-5 text-xl font-semibold">
            Description
          </h2>

          <p className="leading-8 text-slate-600">
            {gallery.description}
          </p>

        </div>

      </div>

      {/* Before / After */}

      <div className="rounded-2xl border bg-white p-6 shadow-sm">

        <h2 className="mb-6 text-2xl font-semibold">
          Before & After
        </h2>

        <div className="grid gap-6 md:grid-cols-2">

          <div>

            <p className="mb-3 font-medium">
              Before
            </p>

            <Image
              src={gallery.beforeImage}
              alt="Before"
              width={600}
              height={450}
              className="rounded-2xl object-cover"
            />

          </div>

          <div>

            <p className="mb-3 font-medium">
              After
            </p>

            <Image
              src={gallery.afterImage}
              alt="After"
              width={600}
              height={450}
              className="rounded-2xl object-cover"
            />

          </div>

        </div>

      </div>

      {/* Gallery Images */}

      <div className="rounded-2xl border bg-white p-6 shadow-sm">

        <h2 className="mb-6 text-2xl font-semibold">
          Gallery Images
        </h2>

        <GalleryPreview
          images={gallery.images}
        />

      </div>

    </div>
  );
}

function Info({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">

      <div className="mt-1 text-blue-600">
        {icon}
      </div>

      <div>

        <p className="text-sm text-slate-500">
          {label}
        </p>

        <p className="font-semibold text-slate-800">
          {value}
        </p>

      </div>

    </div>
  );
}