"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

import {
  Plus,
  RefreshCw,
  ImageIcon,
} from "lucide-react";

import GalleryTable from "@/app/components/gallery/GalleryTable";
import { galleryAPI } from "@/app/services/gallery.api";

import type { Gallery } from "@/app/types/gallery";

export default function GalleryPage() {
  // ==========================================
  // STATE
  // ==========================================

  const [gallery, setGallery] = useState<Gallery[]>([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [error, setError] = useState("");

  // ==========================================
  // LOAD GALLERY
  // ==========================================

  const loadGallery = useCallback(async () => {
    try {
      setError("");

      const response = await galleryAPI.getAll();

      console.log(
        "========== GALLERY API RESPONSE =========="
      );

      console.log("GALLERY RESPONSE:", response);

      /*
        Supports:

        1.
        [
          {...},
          {...}
        ]

        2.
        {
          success: true,
          data: [...]
        }
      */

      const responseData =
        (response as any)?.data ?? response;

      console.log(
        "GALLERY DATA:",
        responseData
      );

      if (Array.isArray(responseData)) {
        setGallery(responseData);
      } else {
        setGallery([]);

        throw new Error(
          "Invalid gallery API response."
        );
      }
    } catch (error) {
      console.error(
        "LOAD GALLERY ERROR:",
        error
      );

      setGallery([]);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to load gallery."
      );
    }
  }, []);

  // ==========================================
  // INITIAL LOAD
  // ==========================================

  useEffect(() => {
    const initialize = async () => {
      try {
        setLoading(true);
        await loadGallery();
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, [loadGallery]);

  // ==========================================
  // REFRESH
  // ==========================================

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      setError("");

      await loadGallery();
    } finally {
      setRefreshing(false);
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
            Gallery Management
          </h1>

          <p className="mt-2 text-slate-500">
            Manage all gallery images from one place.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">

          {/* REFRESH */}

          <button
            type="button"
            onClick={handleRefresh}
            disabled={refreshing}
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              border
              border-slate-300
              bg-white
              px-5
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
            <RefreshCw
              size={18}
              className={
                refreshing
                  ? "animate-spin"
                  : ""
              }
            />

            {refreshing
              ? "Refreshing..."
              : "Refresh"}
          </button>

          {/* ADD GALLERY */}

          <Link
            href="/dashboard/gallery/add"
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-blue-600
              px-5
              py-2.5
              text-sm
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
      </div>

      {/* ======================================
          SUMMARY
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
        <div className="flex items-center gap-4">

          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-blue-100
            "
          >
            <ImageIcon
              size={28}
              className="text-blue-600"
            />
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Total Gallery Images
            </p>

            <h2 className="text-3xl font-bold text-slate-900">
              {gallery.length}
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Gallery records
            </p>
          </div>
        </div>
      </div>

      {/* ======================================
          ERROR
      ====================================== */}

      {error && (
        <div
          className="
            rounded-2xl
            border
            border-red-200
            bg-red-50
            p-5
          "
        >
          <h3 className="font-semibold text-red-700">
            Failed to load gallery
          </h3>

          <p className="mt-2 text-sm text-red-600">
            {error}
          </p>

          <button
            type="button"
            onClick={handleRefresh}
            disabled={refreshing}
            className="
              mt-4
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-red-600
              px-4
              py-2
              text-sm
              font-medium
              text-white
              transition
              hover:bg-red-700
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <RefreshCw
              size={16}
              className={
                refreshing
                  ? "animate-spin"
                  : ""
              }
            />

            Try Again
          </button>
        </div>
      )}

      {/* ======================================
          EMPTY STATE
      ====================================== */}

      {!error && gallery.length === 0 && (
        <div
          className="
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-16
            text-center
            shadow-sm
          "
        >
          <ImageIcon
            size={60}
            className="mx-auto text-slate-300"
          />

          <h2 className="mt-6 text-2xl font-bold text-slate-800">
            No Gallery Found
          </h2>

          <p className="mt-3 text-slate-500">
            You haven't added any gallery images yet.
          </p>

          <Link
            href="/dashboard/gallery/add"
            className="
              mt-8
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-blue-600
              px-6
              py-3
              font-medium
              text-white
              transition
              hover:bg-blue-700
            "
          >
            <Plus size={18} />

            Add First Gallery
          </Link>
        </div>
      )}

      {/* ======================================
          GALLERY TABLE
      ====================================== */}

      {!error && gallery.length > 0 && (
        <GalleryTable
          gallery={gallery}
          setGallery={setGallery}
        />
      )}
    </div>
  );
}