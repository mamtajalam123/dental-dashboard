"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

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

  const loadService = async () => {
    try {
      setLoading(true);

      const data =
        await serviceAPI.getById(id);

      setService({
        name: data.name,
        category:
          data.category ??
          data.categoryName ??
          "",
        duration: data.duration,
        description:
          data.description,
        image: data.image,
        status: data.status,
      });
    } catch (error) {
      console.error(error);

      alert("Failed to load service.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (
    formData: ServiceFormData
  ) => {
    try {
      await serviceAPI.update(
        id,
        formData
      );

      alert(
        "Service updated successfully."
      );

      router.push(
        "/dashboard/services"
      );
    } catch (error) {
      console.error(error);

      alert(
        "Failed to update service."
      );
    }
  };

  if (loading) {
    return (
      <div className="rounded-2xl border bg-white p-10 text-center">
        Loading Service...
      </div>
    );
  }

  if (!service) {
    return (
      <div className="rounded-2xl border bg-white p-10 text-center text-red-500">
        Service not found.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Edit Service
        </h1>

        <p className="text-slate-500">
          Update service information.
        </p>
      </div>

      <ServiceForm
        initialData={service}
        submitLabel="Update Service"
        onSubmit={handleUpdate}
      />
    </div>
  );
}