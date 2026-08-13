"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { serviceAPI } from "@/app/services/service.api";
import { Service } from "@/app/types/service";

export default function ViewServicePage() {
  const router = useRouter();
  const params = useParams();

  const id = Number(params.id);

  const [service, setService] =
    useState<Service | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadService();
  }, []);

  const loadService = async () => {
    try {
      setLoading(true);

      const data =
        await serviceAPI.getById(id);

      setService(data);
    } catch (error) {
      console.error(error);

      alert("Failed to load service.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        Loading...
      </div>
    );
  }

  if (!service) {
    return (
      <div className="p-8">
        Service not found.
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <button
        onClick={() =>
          router.push("/dashboard/services")
        }
        className="
          flex
          items-center
          gap-2
          text-blue-600
          hover:text-blue-700
        "
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <div
        className="
          rounded-2xl
          border
          bg-white
          p-8
          shadow-sm
        "
      >
        <h1 className="mb-6 text-3xl font-bold">
          {service.name}
        </h1>

        <div className="grid gap-6 md:grid-cols-2">

          <div>
            <h3 className="font-semibold text-slate-700">
              Category
            </h3>

            <p>{service.categoryName}</p>
          </div>

          <div>
            <h3 className="font-semibold text-slate-700">
              Duration
            </h3>

            <p>{service.duration}</p>
          </div>

          <div>
            <h3 className="font-semibold text-slate-700">
              Status
            </h3>

            <p>{service.status}</p>
          </div>

          <div>
            <h3 className="font-semibold text-slate-700">
              Created
            </h3>

            <p>{service.createdAt}</p>
          </div>

        </div>

        <div className="mt-8">
          <h3 className="mb-2 font-semibold text-slate-700">
            Description
          </h3>

          <p className="leading-7 text-slate-600">
            {service.description}
          </p>
        </div>
      </div>
    </div>
  );
}