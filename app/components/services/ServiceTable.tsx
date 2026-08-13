"use client";

import { useEffect, useMemo, useState } from "react";
import { SearchX } from "lucide-react";

import { serviceAPI } from "@/app/services/service.api";
import { categoryAPI } from "@/app/services/category.api";

import ServiceFilters from "./ServiceFilters";
import ServiceRow from "./ServiceRow";
import DeleteServiceModal from "./DeleteServiceModal";

import { Service } from "@/app/types/service";
import { Category } from "@/app/types/category";

export default function ServiceTable() {
  // =====================================
  // State
  // =====================================

  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [status, setStatus] = useState("All");

  const [selectedService, setSelectedService] =
    useState<Service | null>(null);

  const [showDelete, setShowDelete] = useState(false);

  // =====================================
  // Load Services
  // =====================================

  const loadServices = async () => {
    try {
      const data = await serviceAPI.getAll();

      console.log("Services:", data);

      setServices(data);
    } catch (error) {
      console.error("Load Services:", error);
    }
  };

  // =====================================
  // Load Categories
  // =====================================

  const loadCategories = async () => {
    try {
      const data = await categoryAPI.getAll();

      console.log("Categories:", data);

      setCategories(
        data.filter(
          (item) => item.status === "Active"
        )
      );
    } catch (error) {
      console.error("Load Categories:", error);
    }
  };

  // =====================================
  // Initial Load
  // =====================================

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        await Promise.all([
          loadServices(),
          loadCategories(),
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // =====================================
  // Filter Services
  // =====================================

const filteredServices = useMemo(() => {
  return services.filter((service) => {
    const searchMatch = service.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const categoryMatch =
      categoryId === 0 ||
      Number(service.categoryId) === Number(categoryId);

    const statusMatch =
      status === "All" ||
      service.status === status;

    return searchMatch && categoryMatch && statusMatch;
  });
}, [services, search, categoryId, status]);

    // =====================================
  // Delete Service
  // =====================================

  const handleDeleteClick = (
    service: Service
  ) => {
    setSelectedService(service);
    setShowDelete(true);
  };

  const handleDelete = async () => {
    if (!selectedService) return;

    try {
      await serviceAPI.delete(selectedService.id);

      await loadServices();

      setSelectedService(null);
      setShowDelete(false);

      alert("Service deleted successfully.");
    } catch (error) {
      console.error(error);

      alert("Failed to delete service.");
    }
  };

  // =====================================
  // Reset Filters
  // =====================================

 const handleReset = () => {
  setSearch("");
  setCategoryId(0);
  setStatus("All");
};

  // =====================================
  // Loading State
  // =====================================

  if (loading) {
    return (
      <div className="rounded-2xl border bg-white p-10 text-center">
        Loading services...
      </div>
    );
  }

  // =====================================
  // Render
  // =====================================

  return (
    <div className="space-y-6">

      <ServiceFilters
        search={search}
        categoryId={categoryId}
        status={status}
        categories={categories}
        onSearchChange={setSearch}
        onCategoryChange={setCategoryId}
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
                        Try changing the search or filters.
                      </p>
                    </div>
                  </td>
                </tr>

              ) : (

                filteredServices.map((service) => (
                  <ServiceRow
                    key={service.id}
                    service={service}
                    onDelete={handleDeleteClick}
                  />
                ))

              )}

            </tbody>

          </table>
        </div>
      </div>

      <DeleteServiceModal
        open={showDelete}
        service={selectedService}
        onClose={() => {
          setShowDelete(false);
          setSelectedService(null);
        }}
        onConfirm={handleDelete}
      />

    </div>
  );
}
            