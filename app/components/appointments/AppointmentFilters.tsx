"use client";

import { useEffect, useState } from "react";
import { Search, RotateCcw } from "lucide-react";

import { categoryAPI } from "@/app/services/category.api";
import { teamAPI } from "@/app/services/team.api";

import { Category } from "@/app/types/category";
import { Team } from "@/app/types/team";

interface AppointmentFiltersProps {
  search: string;
  setSearch: (value: string) => void;

  treatment: string;
  setTreatment: (value: string) => void;

  doctor: string;
  setDoctor: (value: string) => void;

  status: string;
  setStatus: (value: string) => void;

  payment: string;
  setPayment: (value: string) => void;

  date: string;
  setDate: (value: string) => void;

  sort: string;
  setSort: (value: string) => void;

  onClear: () => void;
}

export default function AppointmentFilters({
  search,
  setSearch,

  treatment,
  setTreatment,

  doctor,
  setDoctor,

  status,
  setStatus,

  payment,
  setPayment,

  date,
  setDate,

  sort,
  setSort,

  onClear,
}: AppointmentFiltersProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [doctors, setDoctors] = useState<Team[]>([]);

  const [loadingCategories, setLoadingCategories] =
    useState(false);

  const [loadingDoctors, setLoadingDoctors] =
    useState(false);

  useEffect(() => {
    loadCategories();
    loadDoctors();
  }, []);

  const loadCategories = async () => {
    try {
      setLoadingCategories(true);

      const response =
        await categoryAPI.getAll();

      const data =
        response?.data || response || [];

      setCategories(
        Array.isArray(data) ? data : []
      );
    } catch (error) {
      console.error(
        "Failed to load categories",
        error
      );
      setCategories([]);
    } finally {
      setLoadingCategories(false);
    }
  };

  const loadDoctors = async () => {
    try {
      setLoadingDoctors(true);

      const response =
        await teamAPI.getAll();

      const data =
        response?.data || response || [];

      setDoctors(
        Array.isArray(data) ? data : []
      );
    } catch (error) {
      console.error(
        "Failed to load doctors",
        error
      );
      setDoctors([]);
    } finally {
      setLoadingDoctors(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">

        {/* Search */}

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
            className="w-full rounded-lg border border-slate-300 py-2 pl-10 pr-3 text-sm"
          />

        </div>

        {/* Treatment */}

        <select
          value={treatment}
          onChange={(e) =>
            setTreatment(e.target.value)
          }
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
        >
          <option value="All">
            All Treatments
          </option>

          {loadingCategories && (
            <option disabled>
              Loading...
            </option>
          )}

          {!loadingCategories &&
            categories.map((category) => (
              <option
                key={category.id}
                value={category.name}
              >
                {category.name}
              </option>
            ))}
        </select>

        {/* Doctor */}

        <select
          value={doctor}
          onChange={(e) =>
            setDoctor(e.target.value)
          }
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
        >
          <option value="All">
            All Doctors
          </option>

          {loadingDoctors && (
            <option disabled>
              Loading...
            </option>
          )}

          {!loadingDoctors &&
            doctors.map((item) => (
              <option
                key={item.id}
                value={item.name}
              >
                {item.name}
              </option>
            ))}
        </select>

        {/* Status */}

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
        >
          <option value="All">
            All Status
          </option>

          <option value="Pending">
            Pending
          </option>

          <option value="Confirmed">
            Confirmed
          </option>

          <option value="Completed">
            Completed
          </option>

          <option value="Cancelled">
            Cancelled
          </option>
        </select>

        {/* Payment */}

        <select
          value={payment}
          onChange={(e) =>
            setPayment(e.target.value)
          }
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
        >
          <option value="All">
            All Payments
          </option>

          <option value="Pending">
            Pending
          </option>

          <option value="Paid">
            Paid
          </option>
        </select>

        {/* Date */}

        <input
          type="date"
          value={date}
          onChange={(e) =>
            setDate(e.target.value)
          }
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />

      </div>

      <div className="mt-5 flex items-center justify-between">

        <select
          value={sort}
          onChange={(e) =>
            setSort(e.target.value)
          }
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
        >
          <option value="newest">
            Newest First
          </option>

          <option value="oldest">
            Oldest First
          </option>
        </select>

        <button
          type="button"
          onClick={onClear}
          className="flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm hover:bg-slate-100"
        >
          <RotateCcw size={16} />
          Reset Filters
        </button>

      </div>

    </div>
  );
}