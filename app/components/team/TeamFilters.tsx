"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Search,
  Plus,
  RotateCcw,
} from "lucide-react";

import { designationAPI } from "@/app/services/designation.api";
import { Designation } from "@/app/types/designation";

type TeamFiltersProps = {
  search: string;
  designationId: number;
  status: "All" | "Active" | "Inactive";

  onSearchChange: (value: string) => void;
  onDesignationChange: (value: number) => void;
  onStatusChange: (
    value: "All" | "Active" | "Inactive"
  ) => void;

  onReset: () => void;

  loading?: boolean;
};

export default function TeamFilters({
  search,
  designationId,
  status,
  onSearchChange,
  onDesignationChange,
  onStatusChange,
  onReset,
  loading = false,
}: TeamFiltersProps) {
  const [designations, setDesignations] = useState<Designation[]>([]);
  const [loadingDesignation, setLoadingDesignation] = useState(true);

  useEffect(() => {
    loadDesignations();
  }, []);

  const loadDesignations = async () => {
    try {
      setLoadingDesignation(true);

      const response = await designationAPI.getAll();

      const data = Array.isArray(response)
        ? response
        : response.data ?? [];

      setDesignations(
        data.filter(
          (item: Designation) =>
            item.status === "Active"
        )
      );
    } catch (error) {
      console.error(
        "Designation Load Error",
        error
      );
    } finally {
      setLoadingDesignation(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div className="grid flex-1 gap-4 md:grid-cols-4">

          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              disabled={loading}
              onChange={(e) =>
                onSearchChange(e.target.value)
              }
              placeholder="Search team member..."
              className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none focus:border-blue-600"
            />
          </div>

          <select
            value={designationId}
            disabled={loadingDesignation}
            onChange={(e) =>
              onDesignationChange(Number(e.target.value))
            }
            className="rounded-xl border border-slate-300 px-4 py-3"
          >
            <option value={0}>
              All Designations
            </option>

            {designations.map((item) => (
              <option
                key={item.id}
                value={item.id}
              >
                {item.name}
              </option>
            ))}
          </select>

          <select
            value={status}
            onChange={(e) =>
              onStatusChange(
                e.target.value as
                  | "All"
                  | "Active"
                  | "Inactive"
              )
            }
            className="rounded-xl border border-slate-300 px-4 py-3"
          >
            <option value="All">
              All Status
            </option>

            <option value="Active">
              Active
            </option>

            <option value="Inactive">
              Inactive
            </option>
          </select>

          <button
            type="button"
            onClick={onReset}
            className="flex items-center justify-center gap-2 rounded-xl bg-slate-100 px-4 py-3"
          >
            <RotateCcw size={18} />
            Reset
          </button>
        </div>

        <Link
          href="/dashboard/team/add"
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white"
        >
          <Plus size={18} />
          Add Team Member
        </Link>
      </div>
    </div>
  );
}