"use client";

import { Search, RotateCcw } from "lucide-react";

type GalleryFiltersProps = {
  search: string;
  setSearch: (value: string) => void;

  category: string;
  setCategory: (value: string) => void;

  status: string;
  setStatus: (value: string) => void;

  type: string;
  setType: (value: string) => void;

  onClear: () => void;
};

export default function GalleryFilters({
  search,
  setSearch,
  category,
  setCategory,
  status,
  setStatus,
  type,
  setType,
  onClear,
}: GalleryFiltersProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">

        {/* Search */}

        <div className="relative">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search gallery..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-11 w-full rounded-xl border border-slate-300 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500"
          />

        </div>

        {/* Category */}

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="h-11 rounded-xl border border-slate-300 px-4 text-sm outline-none transition focus:border-blue-500"
        >
          <option value="">All Categories</option>
          <option value="Clinic">Clinic</option>
          <option value="Treatment">Treatment</option>
          <option value="Equipment">Equipment</option>
          <option value="Before & After">
            Before & After
          </option>
        </select>

        {/* Status */}

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="h-11 rounded-xl border border-slate-300 px-4 text-sm outline-none transition focus:border-blue-500"
        >
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        {/* Type */}

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="h-11 rounded-xl border border-slate-300 px-4 text-sm outline-none transition focus:border-blue-500"
        >
          <option value="">All Types</option>
          <option value="Image">Image</option>
          <option value="Before & After">
            Before & After
          </option>
          <option value="Clinic Photo">
            Clinic Photo
          </option>
          <option value="Equipment">
            Equipment
          </option>
          <option value="Treatment">
            Treatment
          </option>
        </select>

        {/* Clear */}

        <button
          type="button"
          onClick={onClear}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-red-50 px-5 font-medium text-red-600 transition hover:bg-red-100"
        >
          <RotateCcw size={18} />
          Clear
        </button>

      </div>

    </div>
  );
}