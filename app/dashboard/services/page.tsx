"use client";

import Link from "next/link";
import {
  Plus,
  Stethoscope,
  CheckCircle2,
  XCircle,
  Layers3,
} from "lucide-react";

import ServiceTable from "@/app/components/services/ServiceTable";
import { services } from "@/app/data/services";


export default function ServicesPage() {

  const totalServices = services.length;

  const activeServices = services.filter(
    (item) => item.status === "Active"
  ).length;

  const inactiveServices = services.filter(
    (item) => item.status === "Inactive"
  ).length;

  const categories = new Set(
    services.map((item) => item.category)
  ).size;

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>

          <h1 className="text-3xl font-bold text-slate-900">
            Services
          </h1>

          <p className="mt-2 text-slate-500">
            Manage all dental clinic services.
          </p>

        </div>

        <Link
          href="/dashboard/services/add"
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-blue-600
            px-5
            py-3
            font-medium
            text-white
            transition
            hover:bg-blue-700
          "
        >
          <Plus size={20} />

          Add Service

        </Link>

      </div>

      {/* Statistics */}

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

        {/* Total */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-500">
                Total Services
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {totalServices}
              </h2>

            </div>

            <div className="rounded-xl bg-blue-100 p-3">

              <Stethoscope
                size={28}
                className="text-blue-600"
              />

            </div>

          </div>

        </div>

        {/* Active */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-500">
                Active
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {activeServices}
              </h2>

            </div>

            <div className="rounded-xl bg-green-100 p-3">

              <CheckCircle2
                size={28}
                className="text-green-600"
              />

            </div>

          </div>

        </div>

        {/* Inactive */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-500">
                Inactive
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {inactiveServices}
              </h2>

            </div>

            <div className="rounded-xl bg-red-100 p-3">

              <XCircle
                size={28}
                className="text-red-600"
              />

            </div>

          </div>

        </div>

        {/* Categories */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-500">
                Categories
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {categories}
              </h2>

            </div>

            <div className="rounded-xl bg-purple-100 p-3">

              <Layers3
                size={28}
                className="text-purple-600"
              />

            </div>

          </div>

        </div>

      </div>

      {/* Table */}

      <ServiceTable />

    </div>
  );
}