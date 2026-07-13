"use client";

import { useMemo, useState } from "react";
import { SearchX } from "lucide-react";


import { services as initialServices } from "@/app/data/services";

import ServiceFilters from "./ServiceFilters";
import ServiceRow from "./ServiceRow";
import DeleteServiceModal from "./DeleteServiceModal";
import { Service } from "@/app/types/service";

export default function ServiceTable() {

  const [services, setServices] =
    useState<Service[]>(initialServices);

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("All");

  const [status, setStatus] =
    useState("All");

  const [selectedService, setSelectedService] =
    useState<Service | null>(null);

  const [showDelete, setShowDelete] =
    useState(false);

  const categories = useMemo(() => {

    return Array.from(
      new Set(
        initialServices.map(
          (item) => item.category
        )
      )
    );

  }, []);

  const filteredServices = useMemo(() => {

    return services.filter((service) => {

      const searchMatch =
        service.name
          .toLowerCase()
          .includes(search.toLowerCase());

      const categoryMatch =
        category === "All"
          ? true
          : service.category === category;

      const statusMatch =
        status === "All"
          ? true
          : service.status === status;

      return (
        searchMatch &&
        categoryMatch &&
        statusMatch
      );

    });

  }, [
    services,
    search,
    category,
    status,
  ]);

  const handleDeleteClick = (
    service: Service
  ) => {

    setSelectedService(service);

    setShowDelete(true);

  };

  const handleDelete = () => {

    if (!selectedService) return;

    setServices((prev) =>
      prev.filter(
        (item) =>
          item.id !== selectedService.id
      )
    );

    setSelectedService(null);

    setShowDelete(false);

  };

  const handleReset = () => {

    setSearch("");

    setCategory("All");

    setStatus("All");

  };

  return (
    <div className="space-y-6">

      <ServiceFilters
        search={search}
        category={category}
        status={status}
        categories={categories}
        onSearchChange={setSearch}
        onCategoryChange={setCategory}
        onStatusChange={setStatus}
        onReset={handleReset}
      />

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-slate-50">

              <tr>

                <th className="px-5 py-4 text-left text-sm font-semibold">
                  Service
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold">
                  Category
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold">
                  Duration
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold">
                  Status
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredServices.length === 0 ? (

                <tr>

                  <td
                    colSpan={5}
                    className="py-16"
                  >

                    <div className="flex flex-col items-center gap-3">

                      <SearchX
                        size={48}
                        className="text-slate-400"
                      />

                      <h3 className="text-lg font-semibold">

                        No Services Found

                      </h3>

                      <p className="text-slate-500">

                        Try changing the filters.

                      </p>

                    </div>

                  </td>

                </tr>

              ) : (

                filteredServices.map(
                  (service) => (

                    <ServiceRow
                      key={service.id}
                      service={service}
                      onDelete={
                        handleDeleteClick
                      }
                    />

                  )
                )

              )}

            </tbody>

          </table>

        </div>

      </div>

      <DeleteServiceModal
        open={showDelete}
        service={selectedService}
        onClose={() =>
          setShowDelete(false)
        }
        onConfirm={handleDelete}
      />

    </div>
  );

}