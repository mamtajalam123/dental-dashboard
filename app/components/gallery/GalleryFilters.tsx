"use client";

import { Search, RotateCcw } from "lucide-react";

import type { Category } from "@/app/types/category";

// ==========================================
// PROPS
// ==========================================

type GalleryFiltersProps = {
  search: string;
  setSearch: (value: string) => void;

  serviceId: string;
  setServiceId: (value: string) => void;

  status: string;
  setStatus: (value: string) => void;

  /**
   * Service categories coming from
   * service-categories API
   */
  categories: Category[];

  onClear: () => void;
};

// ==========================================
// COMPONENT
// ==========================================

export default function GalleryFilters({
  search,
  setSearch,
  serviceId,
  setServiceId,
  status,
  setStatus,
  categories,
  onClear,
}: GalleryFiltersProps) {
  // ==========================================
  // CHECK ACTIVE FILTERS
  // ==========================================

  const hasFilters =
    search.trim() !== "" ||
    serviceId.trim() !== "" ||
    status.trim() !== "";

  // ==========================================
  // CLEAR FILTERS
  // ==========================================

  const handleClear = () => {
    setSearch("");
    setServiceId("");
    setStatus("");

    onClear();
  };

  // ==========================================
  // JSX
  // ==========================================

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">

        {/* ======================================
            SEARCH
        ====================================== */}

        <div className="relative">
          <Search
            size={18}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />

          <input
            type="text"
            placeholder="Search gallery..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            className="
              h-11
              w-full
              rounded-xl
              border
              border-slate-300
              pl-11
              pr-4
              text-sm
              outline-none
              transition
              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-100
            "
          />
        </div>

        {/* ======================================
            SERVICE CATEGORY
        ====================================== */}

        <select
          value={serviceId}
          onChange={(e) => {
            setServiceId(e.target.value);
          }}
          className="
            h-11
            rounded-xl
            border
            border-slate-300
            bg-white
            px-4
            text-sm
            outline-none
            transition
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-100
          "
        >
          <option value="">
            All Service Categories
          </option>

          {categories.map((item) => (
            <option
              key={`gallery-filter-category-${item.id}`}
              value={String(item.id)}
            >
              {item.name}
            </option>
          ))}
        </select>

        {/* ======================================
            STATUS
        ====================================== */}

        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
          }}
          className="
            h-11
            rounded-xl
            border
            border-slate-300
            bg-white
            px-4
            text-sm
            outline-none
            transition
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-100
          "
        >
          <option value="">
            All Status
          </option>

          <option value="Active">
            Active
          </option>

          <option value="Inactive">
            Inactive
          </option>
        </select>

        {/* ======================================
            CLEAR FILTERS
        ====================================== */}

        <button
          type="button"
          onClick={handleClear}
          disabled={!hasFilters}
          className="
            inline-flex
            h-11
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-red-200
            bg-red-50
            px-5
            text-sm
            font-medium
            text-red-600
            transition
            hover:bg-red-100
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          <RotateCcw size={18} />

          Clear Filters
        </button>
      </div>
    </div>
  );
}