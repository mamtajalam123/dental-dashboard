"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

import {
  ArrowLeft,
} from "lucide-react";

import GalleryForm, {
  GalleryFormData,
} from "@/app/components/gallery/GalleryForm";

import { galleryAPI } from "@/app/services/gallery.api";

import type { Gallery } from "@/app/types/gallery";

export default function EditGalleryPage() {
  const router = useRouter();
  const params = useParams();

  // ==========================================
  // GET ID
  // ==========================================

  const rawId = params?.id;

  const id =
    typeof rawId === "string"
      ? Number(rawId)
      : Array.isArray(rawId)
      ? Number(rawId[0])
      : NaN;

  // ==========================================
  // STATE
  // ==========================================

  const [gallery, setGallery] =
    useState<Gallery | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  // ==========================================
  // LOAD GALLERY
  // ==========================================

  useEffect(() => {
    if (
      !Number.isInteger(id) ||
      id <= 0
    ) {
      setError("Invalid gallery ID.");
      setLoading(false);
      return;
    }

    const loadGallery = async () => {
      try {
        setLoading(true);
        setError("");

        console.log(
          "=========================================="
        );

        console.log(
          "========== LOAD GALLERY =========="
        );

        console.log(
          "GALLERY ID:",
          id
        );

        const response =
          await galleryAPI.getById(id);

        // ======================================
        // RAW API RESPONSE
        // ======================================

        console.log(
          "========== GALLERY API RESPONSE =========="
        );

        console.log(
          "RAW RESPONSE:",
          response
        );

        console.log(
          "RESPONSE DATA:",
          (response as any)?.data
        );

        console.log(
          "RESPONSE CATEGORY:",
          (response as any)?.category
        );

        console.log(
          "RESPONSE SERVICE ID:",
          (response as any)?.serviceId
        );

        console.log(
          "RESPONSE SERVICE NAME:",
          (response as any)?.serviceName
        );

        console.log(
          "=========================================="
        );

        // ======================================
        // GET ACTUAL GALLERY OBJECT
        // ======================================

        const responseObject =
          response as any;

        const galleryData =
          responseObject?.data ??
          responseObject;

        console.log(
          "========== FINAL GALLERY DATA =========="
        );

        console.log(
          "FINAL GALLERY:",
          galleryData
        );

        console.log(
          "FINAL ID:",
          galleryData?.id
        );

        console.log(
          "FINAL TITLE:",
          galleryData?.title
        );

        console.log(
          "FINAL SERVICE ID:",
          galleryData?.serviceId
        );

        console.log(
          "FINAL CATEGORY:",
          galleryData?.category
        );

        console.log(
          "FINAL SERVICE NAME:",
          galleryData?.serviceName
        );

        console.log(
          "=========================================="
        );

        if (!galleryData) {
          throw new Error(
            "Gallery item not found."
          );
        }

        // ======================================
        // NORMALIZE SERVICE ID
        // ======================================

        const normalizedServiceId =
          galleryData.serviceId !==
            null &&
          galleryData.serviceId !==
            undefined &&
          galleryData.serviceId !== ""
            ? Number(
                galleryData.serviceId
              )
            : null;

        // ======================================
        // NORMALIZE CATEGORY
        // ======================================

        let normalizedCategory = "";

        if (
          typeof galleryData.category ===
          "string"
        ) {
          normalizedCategory =
            galleryData.category.trim();
        } else if (
          galleryData.category &&
          typeof galleryData.category ===
            "object"
        ) {
          normalizedCategory =
            galleryData.category.name?.trim() ||
            "";
        }

        // ======================================
        // FALLBACK SERVICE NAME
        // ======================================

        if (
          !normalizedCategory &&
          typeof galleryData.serviceName ===
            "string"
        ) {
          normalizedCategory =
            galleryData.serviceName.trim();
        }

        // ======================================
        // FINAL NORMALIZED GALLERY
        // ======================================

        const normalizedGallery: Gallery = {
          ...galleryData,

          serviceId:
            normalizedServiceId,

          category:
            normalizedCategory,
        };

        console.log(
          "========== NORMALIZED GALLERY =========="
        );

        console.log(
          "SERVICE ID:",
          normalizedGallery.serviceId
        );

        console.log(
          "CATEGORY:",
          normalizedGallery.category
        );

        console.log(
          "=========================================="
        );

        setGallery(
          normalizedGallery
        );
      } catch (error) {
        console.error(
          "LOAD GALLERY ERROR:",
          error
        );

        setGallery(null);

        setError(
          error instanceof Error
            ? error.message
            : "Failed to load gallery."
        );
      } finally {
        setLoading(false);
      }
    };

    loadGallery();
  }, [id]);

  // ==========================================
  // UPDATE GALLERY
  // ==========================================

  const handleSubmit = async (
    data: GalleryFormData
  ) => {
    try {
      setSaving(true);

      console.log(
        "=========================================="
      );

      console.log(
        "========== UPDATE GALLERY =========="
      );

      console.log(
        "FORM DATA RECEIVED:",
        data
      );

      // ======================================
      // TITLE
      // ======================================

      const title =
        typeof data.title === "string"
          ? data.title.trim()
          : "";

      // ======================================
      // SERVICE ID
      // ======================================

      const serviceId =
        data.serviceId !== null &&
        data.serviceId !== undefined &&
        data.serviceId !== ""
          ? Number(data.serviceId)
          : null;

      // ======================================
      // CATEGORY NAME
      // ======================================

      const category =
        typeof data.category === "string"
          ? data.category.trim()
          : "";

      // ======================================
      // DESCRIPTION
      // ======================================

      const description =
        typeof data.description === "string"
          ? data.description.trim()
          : "";

      // ======================================
      // STATUS
      // ======================================

      const status =
        data.status === "Inactive"
          ? "Inactive"
          : "Active";

      // ======================================
      // VALIDATION
      // ======================================

      if (!title) {
        throw new Error(
          "Gallery title is required."
        );
      }

      if (
        serviceId === null ||
        !Number.isInteger(serviceId) ||
        serviceId <= 0
      ) {
        throw new Error(
          "Please select a valid service category."
        );
      }

      if (!category) {
        throw new Error(
          "Service category is required."
        );
      }

      if (!description) {
        throw new Error(
          "Gallery description is required."
        );
      }

      // ======================================
      // CREATE FORM DATA
      // ======================================

      const formData = new FormData();

      formData.append(
        "title",
        title
      );

      // IMPORTANT:
      // Backend uses this to update
      // the service/category relationship.
      formData.append(
        "serviceId",
        String(serviceId)
      );

      // Keep category name too.
      formData.append(
        "category",
        category
      );

      formData.append(
        "description",
        description
      );

      formData.append(
        "status",
        status
      );

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
      }

      // ======================================
      // DEBUG FORM DATA
      // ======================================

      console.log(
        "========== UPDATE FORM DATA =========="
      );

      for (
        const [
          key,
          value,
        ] of formData.entries()
      ) {
        console.log(
          `${key}:`,
          value
        );
      }

      console.log(
        "=========================================="
      );

      // ======================================
      // API UPDATE
      // ======================================

      const response =
        await galleryAPI.update(
          id,
          formData
        );

      // ======================================
      // UPDATE RESPONSE DEBUG
      // ======================================

      console.log(
        "========== UPDATE API RESPONSE =========="
      );

      console.log(
        "RAW RESPONSE:",
        response
      );

      console.log(
        "DATA:",
        (response as any)?.data
      );

      console.log(
        "SERVICE ID:",
        (response as any)?.serviceId
      );

      console.log(
        "CATEGORY:",
        (response as any)?.category
      );

      console.log(
        "SERVICE NAME:",
        (response as any)?.serviceName
      );

      console.log(
        "=========================================="
      );

      // ======================================
      // SUCCESS
      // ======================================

      alert(
        "Gallery updated successfully."
      );

      router.push(
        "/dashboard/gallery"
      );

      router.refresh();
    } catch (error) {
      console.error(
        "UPDATE GALLERY ERROR:",
        error
      );

      alert(
        error instanceof Error
          ? error.message
          : "Failed to update gallery."
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="text-center">
          <div
            className="
              mx-auto
              h-12
              w-12
              animate-spin
              rounded-full
              border-4
              border-blue-600
              border-t-transparent
            "
          />

          <p className="mt-4 text-slate-600">
            Loading gallery...
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (
    error ||
    !gallery
  ) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div
          className="
            w-full
            max-w-md
            rounded-2xl
            border
            border-red-200
            bg-white
            p-8
            text-center
            shadow-sm
          "
        >
          <h2 className="text-2xl font-bold text-slate-900">
            Gallery Not Found
          </h2>

          <p className="mt-3 text-slate-500">
            {error ||
              "The requested gallery item could not be found."}
          </p>

          <button
            type="button"
            onClick={() =>
              router.push(
                "/dashboard/gallery"
              )
            }
            className="
              mt-6
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
            <ArrowLeft size={18} />
            Back to Gallery
          </button>
        </div>
      </div>
    );
  }

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
            Edit Gallery
          </h1>

          <p className="mt-2 text-slate-500">
            Update gallery information.
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
          initialData={gallery}
          onSubmit={handleSubmit}
          submitLabel={
            saving
              ? "Updating..."
              : "Update Gallery"
          }
        />
      </div>
    </div>
  );
}