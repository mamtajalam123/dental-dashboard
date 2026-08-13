"use client";

import { Search, RotateCcw } from "lucide-react";
import { Category } from "@/app/types/category";

interface ServiceFiltersProps {
  search: string;
  categoryId: number;
  status: string;

  categories: Category[];

  onSearchChange: (value: string) => void;
  onCategoryChange: (value: number) => void;
  onStatusChange: (value: string) => void;
  onReset: () => void;
}

export default function ServiceFilters({
  search,
  categoryId,
  status,
  categories,
  onSearchChange,
  onCategoryChange,
  onStatusChange,
  onReset,
}: ServiceFiltersProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="grid gap-4 lg:grid-cols-4">
        {/* Search */}
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search service..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-xl border border-slate-300 py-3 pl-10 pr-4 outline-none focus:border-blue-500"
          />
        </div>

        {/* Category */}
   <select
  value={categoryId}
  onChange={(e) => {
    console.log("Selected:", e.target.value);
    onCategoryChange(Number(e.target.value));
  }}
  className="rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
>
  <option value={0}>All Categories</option>

  {categories
    .filter((item) => item.status === "Active")
    .map((item) => (
      <option
        key={item.id}
        value={item.id}
      >
        {item.name}
      </option>
    ))}
</select>

        {/* Status */}
        <select
          value={status}
          onChange={(e) =>
            onStatusChange(e.target.value)
          }
          className="rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        {/* Reset */}
        <button
          type="button"
          onClick={onReset}
          className="flex items-center justify-center gap-2 rounded-xl bg-slate-100 px-4 py-3 font-medium text-slate-700 transition hover:bg-slate-200"
        >
          <RotateCcw size={18} />
          Reset Filters
        </button>
      </div>
    </div>
  );
}