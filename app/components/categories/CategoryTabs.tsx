"use client";

import { useState } from "react";

import ServiceCategoryTable from "./ServiceCategoryTable";
import DesignationTable from "./DesignationTable";

type Tab = "service" | "designation";

export default function CategoryTabs() {
  const [tab, setTab] =
    useState<Tab>("service");

  return (
    <div className="space-y-6">
      {/* Tabs */}

      <div className="flex gap-3">
        <button
          onClick={() =>
            setTab("service")
          }
          className={`
            rounded-xl
            px-5
            py-3
            font-medium
            transition
            ${
              tab === "service"
                ? "bg-blue-600 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }
          `}
        >
          Service Categories
        </button>

        <button
          onClick={() =>
            setTab("designation")
          }
          className={`
            rounded-xl
            px-5
            py-3
            font-medium
            transition
            ${
              tab === "designation"
                ? "bg-blue-600 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }
          `}
        >
          Team Designations
        </button>
      </div>

      {/* Content */}

      {tab === "service" ? (
        <ServiceCategoryTable />
      ) : (
        <DesignationTable />
      )}
    </div>
  );
}