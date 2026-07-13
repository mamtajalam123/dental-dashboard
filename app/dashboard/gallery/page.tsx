import Link from "next/link";
import { Plus } from "lucide-react";

import GalleryGrid from "@/app/components/gallery/GalleryGrid";

export default function GalleryPage() {
  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

        <div>

          <h1 className="text-3xl font-bold text-slate-800">
            Gallery
          </h1>

          <p className="mt-2 text-slate-500">
            Manage clinic gallery, before & after cases,
            equipment and treatment photos.
          </p>

        </div>

        <Link
          href="/dashboard/gallery/add"
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
          <Plus size={18} />

          Add Gallery
        </Link>

      </div>

      {/* Gallery Grid */}

      <GalleryGrid />

    </div>
  );
}