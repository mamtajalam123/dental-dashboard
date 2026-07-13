"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import ServiceForm, {
  ServiceFormData,
} from "@/app/components/services/ServiceForm";
import { services } from "@/app/data/services";

export default function EditServicePage() {
  const router = useRouter();

  const params = useParams();

  const id = Number(params.id);

  const service = services.find(
    (item) => item.id === id
  );

  if (!service) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">
          Service Not Found
        </h1>

        <Link
          href="/dashboard/services"
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white"
        >
          <ArrowLeft size={18} />

          Back to Services
        </Link>
      </div>
    );
  }

  const handleSubmit = (
    data: ServiceFormData
  ) => {
    console.log("Updated Service:", data);

    // Later API Call Here

    router.push("/dashboard/services");
  };

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Edit Service
          </h1>

          <p className="mt-1 text-slate-500">
            Update service information.
          </p>
        </div>

        <Link
          href="/dashboard/services"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-3 hover:bg-slate-100"
        >
          <ArrowLeft size={18} />

          Back
        </Link>
      </div>

      {/* Form */}

      <ServiceForm
        initialData={{
          name: service.name,
          category: service.category,
          duration: service.duration,
          description: service.description,
          image: service.image,
          status: service.status,
        }}
        submitLabel="Update Service"
        onSubmit={handleSubmit}
      />
    </div>
  );
}