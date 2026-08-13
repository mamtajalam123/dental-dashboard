
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

  subjects?: string[];
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
  subjects = [],
}: ContactFiltersProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">

        {/* ==========================================
            SEARCH
        ========================================== */}

        <div className="lg:col-span-2">

          <label className="mb-2 block text-sm font-medium text-slate-700">
            Search
          </label>

          <div className="relative">

            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search name, email or message..."
              className="h-11 w-full rounded-xl border border-slate-300 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

          </div>

        </div>

        {/* ==========================================
            SUBJECT
        ========================================== */}

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-700">
            Subject
          </label>

          <select
            value={subject}
            onChange={(event) =>
              setSubject(event.target.value)
            }
            className="h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >

            <option value="">
              All Subjects
            </option>

            {subjects.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}

          </select>

        </div>

        {/* ==========================================
            STATUS
        ========================================== */}

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-700">
            Status
          </label>

          <select
            value={status}
            onChange={(event) =>
              setStatus(event.target.value)
            }
            className="h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >

            <option value="">
              All Status
            </option>

            <option value="New">
              New
            </option>

            <option value="Read">
              Read
            </option>

            <option value="Replied">
              Replied
            </option>

          </select>

        </div>

        {/* ==========================================
            SORT
        ========================================== */}

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-700">
            Sort
          </label>

          <select
            value={sort}
            onChange={(event) =>
              setSort(event.target.value)
            }
            className="h-11 w-full rounded-xl border border-slate-300 bg-white px-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >

            <option value="newest">
              Newest First
            </option>

            <option value="oldest">
              Oldest First
            </option>

          </select>

        </div>

      </div>

      {/* ==========================================
          CLEAR FILTERS
      ========================================== */}

      <div className="mt-4 flex justify-end">

        <button
          type="button"
          onClick={onClear}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
        >
          <RotateCcw size={16} />

          Clear Filters
        </button>

      </div>

    </div>
  );
}