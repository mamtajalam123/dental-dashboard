"use client";

import { useRouter } from "next/navigation";

import GalleryForm from "@/app/components/gallery/GalleryForm";
import { GalleryItem } from "@/types/gallery";

export default function AddGalleryPage() {
  const router = useRouter();

  const handleSubmit = (data: GalleryItem) => {
    console.log("New Gallery:", data);

    // TODO:
    // POST API
    // axios.post("/api/gallery", data)

    router.push("/dashboard/gallery");
  };

  return (
    <div className="space-y-6">

      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Add Gallery
        </h1>

        <p className="mt-2 text-slate-500">
          Upload a new gallery image for the clinic.
        </p>
      </div>

      {/* Form */}

      <GalleryForm
        onSubmit={handleSubmit}
      />

    </div>
  );
}