"use client";

import { useEffect, useState } from "react";
import { Search, RotateCcw } from "lucide-react";

import { categoryAPI } from "@/app/services/category.api";
import { Category } from "@/app/types/category";

interface FeedbackFiltersProps {
  search: string;
  setSearch: (value: string) => void;

  status: string;
  setStatus: (value: string) => void;

  rating: string;
  setRating: (value: string) => void;

  treatment: string;
  setTreatment: (value: string) => void;

  onClear: () => void;
}

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
  const [categories, setCategories] =
    useState<Category[]>([]);

  const [loadingCategories, setLoadingCategories] =
    useState(false);

  // ==========================================
  // LOAD CATEGORIES
  // ==========================================

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoadingCategories(true);

      const data = await categoryAPI.getAll();

      if (Array.isArray(data)) {
        setCategories(data);
      } else {
        setCategories([]);
      }
    } catch (error) {
      console.error(
        "FEEDBACK CATEGORY LOAD ERROR:",
        error
      );

      setCategories([]);
    } finally {
      setLoadingCategories(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">

        {/* ==================================
            SEARCH
        ================================== */}

        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-3 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search patient..."
            className="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-blue-500"
          />
        </div>

        {/* ==================================
            TREATMENT
        ================================== */}

        <select
          value={treatment}
          onChange={(e) =>
            setTreatment(e.target.value)
          }
          className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500"
        >
          <option value="">
            All Treatments
          </option>

          {loadingCategories ? (
            <option disabled>
              Loading treatments...
            </option>
          ) : categories.length === 0 ? (
            <option disabled>
              No treatments found
            </option>
          ) : (
            categories.map((category) => (
              <option
                key={category.id}
                value={category.name}
              >
                {category.name}
              </option>
            ))
          )}
        </select>

        {/* ==================================
            STATUS
        ================================== */}

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
          className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500"
        >
          <option value="">
            All Status
          </option>

          <option value="Pending">
            Pending
          </option>

          <option value="Approved">
            Approved
          </option>

          <option value="Rejected">
            Rejected
          </option>
        </select>

        {/* ==================================
            RATING
        ================================== */}

        <select
          value={rating}
          onChange={(e) =>
            setRating(e.target.value)
          }
          className="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500"
        >
          <option value="">
            All Ratings
          </option>

          <option value="5">
            5 Stars
          </option>

          <option value="4">
            4 Stars
          </option>

          <option value="3">
            3 Stars
          </option>

          <option value="2">
            2 Stars
          </option>

          <option value="1">
            1 Star
          </option>
        </select>

        {/* ==================================
            RESET
        ================================== */}

        <button
          type="button"
          onClick={onClear}
          className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          <RotateCcw size={16} />

          Reset
        </button>
      </div>
    </div>
  );
}