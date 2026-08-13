"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import ServiceForm from "@/app/components/services/ServiceForm";
import { serviceAPI } from "@/app/services/service.api";

export default function AddServicePage() {
  const router = useRouter();

  // ==========================
  // Create Service
  // ==========================
  const handleCreateService = async (
    formData: FormData
  ) => {
    try {
      await serviceAPI.create(formData);

      alert("Service created successfully.");

      router.push("/dashboard/services");
    } catch (error: any) {
      console.error(error);

      alert(
        error.message ||
          "Failed to create service."
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Add Service
          </h1>

          <p className="text-slate-500 mt-2">
            Create a new service.
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
            px-5
            py-3
            hover:bg-slate-100
          "
        >
          <ArrowLeft size={18} />
          Back
        </button>
      </div>

      <ServiceForm
        submitLabel="Save Service"
        onSubmit={handleCreateService}
      />
    </div>
  );
}