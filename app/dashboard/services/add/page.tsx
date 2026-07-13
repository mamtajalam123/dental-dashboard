"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import ServiceForm, {
  ServiceFormData,
} from "@/app/components/services/ServiceForm";

export default function AddServicePage() {
  const router = useRouter();

  const handleSubmit = (
    data: ServiceFormData
  ) => {
    console.log("New Service:", data);

    // API Call Here

    alert("Service added successfully!");

    router.push("/dashboard/services");
  };

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>

          <div className="flex items-center gap-3">

            <Link
              href="/dashboard/services"
              className="rounded-xl border border-slate-300 p-2 hover:bg-slate-100"
            >
              <ArrowLeft size={20} />
            </Link>

            <div>

              <h1 className="text-3xl font-bold text-slate-900">
                Add Service
              </h1>

              <p className="mt-1 text-slate-500">
                Create a new dental service.
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Form */}

      <ServiceForm
        submitLabel="Save Service"
        onSubmit={handleSubmit}
      />

    </div>
  );
}