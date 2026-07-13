"use client";

import { Search, RotateCcw } from "lucide-react";

type ContactFiltersProps = {
  search: string;
  setSearch: (value: string) => void;

  subject: string;
  setSubject: (value: string) => void;

  status: string;
  setStatus: (value: string) => void;

  sort: string;
  setSort: (value: string) => void;

  onClear: () => void;
};

export default function ContactFilters({
  search,
  setSearch,
  subject,
  setSubject,
  status,
  setStatus,
  sort,
  setSort,
  onClear,
}: ContactFiltersProps) {
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
              pl-11
              pr-4
              text-sm
              outline-none
              transition
              focus:border-blue-500
            "
          />

        </div>

        {/* Subject */}

        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
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
          <option value="">All Subjects</option>
          <option value="Dental Implant">Dental Implant</option>
          <option value="Root Canal">Root Canal</option>
          <option value="Teeth Whitening">Teeth Whitening</option>
          <option value="Smile Makeover">Smile Makeover</option>
          <option value="Dental Cleaning">Dental Cleaning</option>
          <option value="Braces">Braces</option>
          <option value="Tooth Extraction">Tooth Extraction</option>
          <option value="Consultation">Consultation</option>
          <option value="Dental Crown">Dental Crown</option>
          <option value="Kids Dentistry">Kids Dentistry</option>
          <option value="Scaling">Scaling</option>
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
          <option value="New">New</option>
          <option value="Read">Read</option>
          <option value="Replied">Replied</option>
          <option value="Archived">Archived</option>
        </select>

        {/* Sort */}

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
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
          <option value="newest">
            Newest First
          </option>

          <option value="oldest">
            Oldest First
          </option>
        </select>

        {/* Clear */}

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