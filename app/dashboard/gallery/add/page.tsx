"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";

import GalleryForm, {
  GalleryFormData,
} from "@/app/components/gallery/GalleryForm";

import { galleryAPI } from "@/app/services/gallery.api";

export default function AddGalleryPage() {
  const router = useRouter();

  const [saving, setSaving] = useState(false);

  // ==========================================
  // CREATE GALLERY
  // ==========================================

  const handleSubmit = async (
    data: GalleryFormData
  ) => {
    try {
      setSaving(true);

      console.log(
        "========== CREATE GALLERY =========="
      );

      console.log(
        "GALLERY FORM DATA:",
        data
      );

      // ======================================
      // VALIDATION
      // ======================================

      const title =
        data.title?.trim() || "";

      const category =
        data.category?.trim() || "";

      const description =
        data.description?.trim() || "";

      const serviceId =
        data.serviceId != null
          ? Number(data.serviceId)
          : null;

      // --------------------------------------
      // TITLE
      // --------------------------------------

      if (!title) {
        throw new Error(
          "Gallery title is required."
        );
      }

      // --------------------------------------
      // SERVICE CATEGORY
      // --------------------------------------

      if (
        serviceId === null ||
        !Number.isInteger(serviceId) ||
        serviceId <= 0
      ) {
        throw new Error(
          "Please select a valid service category."
        );
      }

      // --------------------------------------
      // CATEGORY NAME
      // --------------------------------------

      if (!category) {
        throw new Error(
          "Service category is required."
        );
      }

      // --------------------------------------
      // DESCRIPTION
      // --------------------------------------

      if (!description) {
        throw new Error(
          "Gallery description is required."
        );
      }

      // ======================================
      // CREATE FORM DATA
      // ======================================

      const formData = new FormData();

      // ======================================
      // TITLE
      // ======================================

      formData.append(
        "title",
        title
      );

      // ======================================
      // SERVICE ID
      // ======================================

      formData.append(
        "serviceId",
        String(serviceId)
      );

      // ======================================
      // CATEGORY NAME
      // ======================================
      // Optional/display value.
      // Backend should use serviceId
      // as the real relation.
      // ======================================

      formData.append(
        "category",
        category
      );

      // ======================================
      // DESCRIPTION
      // ======================================

      formData.append(
        "description",
        description
      );

      // ======================================
      // STATUS
      // ======================================

      formData.append(
        "status",
        data.status
      );

      // ======================================
      // TYPE
      // ======================================

      formData.append(
        "type",
        "Image"
      );

      // ======================================
      // IMAGE
      // ======================================

      if (
        data.image instanceof File
      ) {
        formData.append(
          "image",
          data.image
        );
      } else {
        throw new Error(
          "Please select a gallery image."
        );
      }

      // ======================================
      // DEBUG
      // ======================================

      console.log(
        "========== CREATE FORM DATA =========="
      );

      for (const [
        key,
        value,
      ] of formData.entries()) {
        console.log(
          `${key}:`,
          value
        );
      }

      // ======================================
      // API
      // ======================================

      const response =
        await galleryAPI.create(
          formData
        );

      console.log(
        "CREATE GALLERY RESPONSE:",
        response
      );

      // ======================================
      // SUCCESS
      // ======================================

      alert(
        "Gallery created successfully."
      );

      router.push(
        "/dashboard/gallery"
      );

      router.refresh();

    } catch (error) {
      console.error(
        "CREATE GALLERY ERROR:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Failed to create gallery."
      );

    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div className="space-y-6">

      {/* ======================================
          HEADER
      ====================================== */}

      <div
        className="
          flex
          flex-col
          gap-4
          md:flex-row
          md:items-center
          md:justify-between
        "
      >

        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Add Gallery
          </h1>

          <p className="mt-2 text-slate-500">
            Upload a new gallery image.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            router.push(
              "/dashboard/gallery"
            )
          }
          disabled={saving}
          className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            border
            border-slate-300
            bg-white
            px-4
            py-2.5
            text-sm
            font-medium
            text-slate-700
            transition
            hover:bg-slate-100
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          <ArrowLeft size={18} />
          Back
        </button>

      </div>

      {/* ======================================
          FORM
      ====================================== */}

      <div
        className="
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-6
          shadow-sm
        "
      >
        <GalleryForm
          onSubmit={handleSubmit}
          submitLabel={
            saving
              ? "Creating..."
              : "Create Gallery"
          }
        />
      </div>

    </div>
  );
}