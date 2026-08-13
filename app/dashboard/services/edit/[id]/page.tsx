"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import ServiceForm, {
  ServiceFormData,
} from "@/app/components/services/ServiceForm";

import { serviceAPI } from "@/app/services/service.api";

export default function EditServicePage() {
  const router = useRouter();

  const params = useParams();

  const id = Number(params.id);

  const [loading, setLoading] =
    useState(true);

  const [service, setService] =
    useState<ServiceFormData | null>(null);

  useEffect(() => {
    if (id) {
      loadService();
    }
  }, [id]);

  // ==========================
  // Load Service
  // ==========================

  const loadService = async () => {
    try {
      setLoading(true);

      const data =
        await serviceAPI.getById(id);

      setService({
        name: data.name,
        category: data.categoryName,
        duration: data.duration,
        description: data.description,
        image: data.image || "",
        status: data.status,
      });
    } catch (error) {
      console.error(error);

      alert("Failed to load service.");
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // Update Service
  // ==========================

  const handleUpdate = async (
    formData: ServiceFormData
  ) => {
    try {
      await serviceAPI.update(id, {
        categoryName: formData.category,
        name: formData.name,
        duration: formData.duration,
        description: formData.description,
        image: formData.image,
        status: formData.status,
      });

      alert("Service updated successfully.");

      router.push("/dashboard/services");
    } catch (error) {
      console.error(error);

      alert("Failed to update service.");
    }
  };

  // ==========================
  // Loading
  // ==========================

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-lg text-slate-500">
          Loading Service...
        </p>
      </div>
    );
  }

  // ==========================
  // Not Found
  // ==========================

  if (!service) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-lg text-red-500">
          Service not found.
        </p>
      </div>
    );
  }

  // ==========================
  // Page
  // ==========================

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Edit Service
          </h1>

          <p className="mt-1 text-slate-500">
            Update service information.
          </p>
        </div>

        <button
          onClick={() =>
            router.push("/dashboard/services")
          }
          className="
            flex
            items-center
            gap-2
            rounded-xl
            border
            border-slate-300
            bg-white
            px-5
            py-2.5
            text-sm
            font-medium
            text-slate-700
            shadow-sm
            transition
            hover:bg-slate-100
          "
        >
          <ArrowLeft size={18} />
          Back
        </button>

      </div>

      {/* Form */}

      <ServiceForm
        initialData={service}
        onSubmit={handleUpdate}
        submitLabel="Update Service"
      />

    </div>
  );
}