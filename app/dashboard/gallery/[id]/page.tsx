"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import {
  ArrowLeft,
  Pencil,
  Calendar,
  Tag,
  Circle,
  ImageIcon,
} from "lucide-react";

import { galleryAPI } from "@/app/services/gallery.api";
import type { Gallery } from "@/app/types/gallery";

// ==========================================
// COMPONENT
// ==========================================

export default function GalleryDetailsPage() {
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

  const [error, setError] =
    useState("");

  // ==========================================
  // LOAD GALLERY
  // ==========================================

  useEffect(() => {
    if (!Number.isInteger(id) || id <= 0) {
      setError("Invalid gallery ID.");
      setLoading(false);
      return;
    }

    let mounted = true;

    const loadGallery = async () => {
      try {
        setLoading(true);
        setError("");

        console.log(
          "======================================"
        );

        console.log(
          "GET GALLERY BY ID:",
          id
        );

        const response =
          await galleryAPI.getById(id);

        console.log(
          "GALLERY DETAILS RESPONSE:",
          response
        );

        // ======================================
        // API RESPONSE
        // ======================================

        const galleryData =
          response &&
          typeof response === "object" &&
          "data" in response
            ? (response as {
                data?: Gallery;
              }).data
            : response;

        console.log(
          "GALLERY DETAILS DATA:",
          galleryData
        );

        console.log(
          "======================================"
        );

        if (!galleryData) {
          throw new Error(
            "Gallery item not found."
          );
        }

        if (!mounted) {
          return;
        }

        setGallery(
          galleryData as Gallery
        );
      } catch (err) {
        console.error(
          "LOAD GALLERY ERROR:",
          err
        );

        if (!mounted) {
          return;
        }

        setGallery(null);

        setError(
          err instanceof Error
            ? err.message
            : "Failed to load gallery."
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadGallery();

    return () => {
      mounted = false;
    };
  }, [id]);

  // ==========================================
  // CATEGORY NAME
  // ==========================================

  const getCategoryName = (
    galleryItem: Gallery
  ): string => {
    // ========================================
    // serviceName
    // ========================================

    if (
      typeof galleryItem.serviceName === "string" &&
      galleryItem.serviceName.trim()
    ) {
      return galleryItem.serviceName.trim();
    }

    // ========================================
    // category as string
    // ========================================

    if (
      typeof galleryItem.category === "string"
    ) {
      const category =
        galleryItem.category.trim();

      if (category) {
        return category;
      }
    }

    // ========================================
    // category as object
    // ========================================

    if (
      galleryItem.category &&
      typeof galleryItem.category === "object"
    ) {
      const categoryObject =
        galleryItem.category as {
          name?: string;
        };

      if (
        typeof categoryObject.name ===
          "string" &&
        categoryObject.name.trim()
      ) {
        return categoryObject.name.trim();
      }
    }

    return "No Category";
  };

  // ==========================================
  // IMAGE URL
  // ==========================================

  const getImageUrl = (
    image?: string | null
  ): string => {
    if (!image) {
      return "/images/no-image.png";
    }

    // Already full URL
    if (
      image.startsWith("http://") ||
      image.startsWith("https://") ||
      image.startsWith("blob:")
    ) {
      return image;
    }

    const apiUrl =
      process.env.NEXT_PUBLIC_API_URL ||
      "http://localhost:5000";

    const cleanApiUrl =
      apiUrl.replace(/\/+$/, "");

    const cleanImage =
      image.replace(/^\/+/, "");

    return `${cleanApiUrl}/${cleanImage}`;
  };

  // ==========================================
  // DATE FORMAT
  // ==========================================

  const formatDate = (
    value?: string | null
  ): string => {
    if (!value) {
      return "-";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "-";
    }

    return date.toLocaleString();
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
  // ERROR / NOT FOUND
  // ==========================================

  if (error || !gallery) {
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
          <ImageIcon
            size={60}
            className="mx-auto text-red-500"
          />

          <h2 className="mt-5 text-2xl font-bold text-slate-900">
            Gallery Not Found
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            {error ||
              "This gallery item does not exist."}
          </p>

          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={() =>
                router.push(
                  "/dashboard/gallery"
                )
              }
              className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-blue-600
                px-5
                py-3
                text-sm
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
      </div>
    );
  }

  // ==========================================
  // VALUES
  // ==========================================

  const categoryName =
    getCategoryName(gallery);

  const imageUrl =
    getImageUrl(gallery.image);

  const isActive =
    String(gallery.status ?? "")
      .trim()
      .toLowerCase() === "active";

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
            Gallery Details
          </h1>

          <p className="mt-2 text-slate-500">
            View complete gallery information.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">

          {/* BACK */}

          <button
            type="button"
            onClick={() =>
              router.push(
                "/dashboard/gallery"
              )
            }
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              border
              border-slate-300
              bg-white
              px-5
              py-3
              text-sm
              font-medium
              text-slate-700
              transition
              hover:bg-slate-100
            "
          >
            <ArrowLeft size={18} />
            Back
          </button>

          {/* EDIT */}

          <Link
            href={`/dashboard/gallery/edit/${gallery.id}`}
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-blue-600
              px-5
              py-3
              text-sm
              font-medium
              text-white
              transition
              hover:bg-blue-700
            "
          >
            <Pencil size={18} />
            Edit Gallery
          </Link>

        </div>
      </div>

      {/* ======================================
          CONTENT
      ====================================== */}

      <div className="grid gap-6 lg:grid-cols-2">

        {/* ====================================
            IMAGE
        ==================================== */}

        <div
          className="
            overflow-hidden
            rounded-2xl
            border
            border-slate-200
            bg-white
            shadow-sm
          "
        >
          <div
            className="
              relative
              aspect-[16/10]
              w-full
              bg-slate-100
            "
          >
            <Image
              src={imageUrl}
              alt={
                gallery.title ||
                "Gallery image"
              }
              fill
              priority
              sizes="
                (max-width: 1024px) 100vw,
                50vw
              "
              className="object-cover"
              unoptimized
            />
          </div>
        </div>

        {/* ====================================
            DETAILS
        ==================================== */}

        <div
          className="
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-8
            shadow-sm
          "
        >

          {/* TITLE */}

          <h2 className="text-3xl font-bold text-slate-900">
            {gallery.title ||
              "Untitled Gallery"}
          </h2>

          {/* DETAILS */}

          <div className="mt-7 space-y-5">

            {/* CATEGORY */}

            <div className="flex flex-wrap items-center gap-3">
              <Tag
                size={18}
                className="text-blue-600"
              />

              <span className="font-medium text-slate-700">
                Service Category
              </span>

              <span
                className="
                  rounded-full
                  bg-blue-100
                  px-3
                  py-1
                  text-sm
                  font-semibold
                  text-blue-700
                "
              >
                {categoryName}
              </span>
            </div>

            {/* SERVICE ID */}

            {gallery.serviceId !==
              undefined &&
              gallery.serviceId !== null && (
                <div className="flex flex-wrap items-center gap-3">
                  <Tag
                    size={18}
                    className="text-slate-500"
                  />

                  <span className="font-medium text-slate-700">
                    Service ID
                  </span>

                  <span className="text-slate-600">
                    {gallery.serviceId}
                  </span>
                </div>
              )}

            {/* TYPE */}

            <div className="flex flex-wrap items-center gap-3">
              <ImageIcon
                size={18}
                className="text-slate-500"
              />

              <span className="font-medium text-slate-700">
                Type
              </span>

              <span className="text-slate-600">
                {gallery.type || "Image"}
              </span>
            </div>

            {/* STATUS */}

            <div className="flex flex-wrap items-center gap-3">
              <Circle
                size={16}
                className={
                  isActive
                    ? "fill-green-500 text-green-500"
                    : "fill-red-500 text-red-500"
                }
              />

              <span className="font-medium text-slate-700">
                Status
              </span>

              <span
                className={
                  isActive
                    ? "font-semibold text-green-600"
                    : "font-semibold text-red-600"
                }
              >
                {gallery.status || "Unknown"}
              </span>
            </div>

            {/* CREATED */}

            <div className="flex flex-wrap items-center gap-3">
              <Calendar
                size={18}
                className="text-slate-500"
              />

              <span className="font-medium text-slate-700">
                Created
              </span>

              <span className="text-slate-600">
                {formatDate(
                  gallery.created_at
                )}
              </span>
            </div>

            {/* UPDATED */}

            <div className="flex flex-wrap items-center gap-3">
              <Calendar
                size={18}
                className="text-slate-500"
              />

              <span className="font-medium text-slate-700">
                Updated
              </span>

              <span className="text-slate-600">
                {formatDate(
                  gallery.updated_at
                )}
              </span>
            </div>
          </div>

          {/* DESCRIPTION */}

          <div className="mt-8 border-t border-slate-200 pt-7">

            <h3 className="mb-3 text-lg font-semibold text-slate-900">
              Description
            </h3>

            <p className="whitespace-pre-wrap leading-7 text-slate-600">
              {gallery.description?.trim() ||
                "No description available."}
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}