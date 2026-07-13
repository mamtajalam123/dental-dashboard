"use client";

import { useParams, useRouter, notFound } from "next/navigation";

import { galleryData } from "@/data/gallery";
import { GalleryItem } from "@/types/gallery";

import GalleryForm from "@/app/components/gallery/GalleryForm";

export default function EditGalleryPage() {
  const params = useParams();
  const router = useRouter();

  const id = Number(params.id);

  const gallery = galleryData.find(
    (item) => item.id === id
  );

  if (!gallery) {
    notFound();
  }

  const handleSubmit = (data: GalleryItem) => {
    console.log("Updated Gallery:", data);

    // TODO:
    // PUT API
    // axios.put(`/api/gallery/${id}`, data)

    router.push("/dashboard/gallery");
  };

  return (
    <div className="space-y-6">

      {/* Header */}

      <div>

        <h1 className="text-3xl font-bold text-slate-800">
          Edit Gallery
        </h1>

        <p className="mt-2 text-slate-500">
          Update gallery information.
        </p>

      </div>

      {/* Form */}

      <GalleryForm
        initialData={gallery}
        onSubmit={handleSubmit}
      />

    </div>
  );
}