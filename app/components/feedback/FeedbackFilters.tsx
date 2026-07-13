"use client";

import { Search, RotateCcw } from "lucide-react";

type FeedbackFiltersProps = {
  search: string;
  setSearch: (value: string) => void;

  status: string;
  setStatus: (value: string) => void;

  rating: string;
  setRating: (value: string) => void;

  treatment: string;
  setTreatment: (value: string) => void;

  onClear: () => void;
};

export default function FeedbackFilters({
  search,
  setSearch,
  status,
  setStatus,
  rating,
  setRating,
  treatment,
  setTreatment,
  onClear,
}: FeedbackFiltersProps) {
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
            placeholder="Search patient..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              h-11
              w-full
              rounded-xl
              border
              border-slate-300
              bg-white
              pl-11
              pr-4
              text-sm
              outline-none
              transition
              focus:border-blue-500
            "
          />

        </div>

        {/* Treatment */}

       <select
  value={treatment}
  onChange={(e) => setTreatment(e.target.value)}
  className="
    h-11
    rounded-xl
    border
    border-slate-300
    px-4
    text-sm
    outline-none
    transition
    focus:border-blue-500
  "
>
  <option value="">All Treatments</option>
  <option value="Dental Implant">Dental Implant</option>
  <option value="Root Canal">Root Canal</option>
  <option value="Teeth Whitening">Teeth Whitening</option>
  <option value="Braces">Braces</option>
  <option value="Dental Crown">Dental Crown</option>
  <option value="Dental Bridge">Dental Bridge</option>
  <option value="Tooth Extraction">Tooth Extraction</option>
  <option value="Scaling & Polishing">Scaling & Polishing</option>
  <option value="Smile Design">Smile Design</option>
  <option value="Dental Filling">Dental Filling</option>
</select>

        {/* Status */}

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="
            h-11
            rounded-xl
            border
            border-slate-300
            px-4
            text-sm
            outline-none
            transition
            focus:border-blue-500
          "
        >
          <option value="">All Status</option>
          <option value="Approved">Approved</option>
          <option value="Pending">Pending</option>
          <option value="Rejected">Rejected</option>
        </select>

        {/* Rating */}

        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="
            h-11
            rounded-xl
            border
            border-slate-300
            px-4
            text-sm
            outline-none
            transition
            focus:border-blue-500
          "
        >
          <option value="">All Ratings</option>
          <option value="5">⭐⭐⭐⭐⭐ (5)</option>
          <option value="4">⭐⭐⭐⭐ (4)</option>
          <option value="3">⭐⭐⭐ (3)</option>
          <option value="2">⭐⭐ (2)</option>
          <option value="1">⭐ (1)</option>
        </select>

        {/* Clear Button */}

        <button
          type="button"
          onClick={onClear}
          className="
            inline-flex
            h-11
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-red-50
            px-5
            font-medium
            text-red-600
            transition
            hover:bg-red-100
          "
        >
          <RotateCcw size={18} />
          Clear
        </button>

      </div>

    </div>
  );
}