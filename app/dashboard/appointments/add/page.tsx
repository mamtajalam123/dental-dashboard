"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import AppointmentForm, {
  AppointmentFormData,
} from "@/app/components/appointments/AppointmentForm";

import { appointmentAPI } from "@/app/services/appointment.api";

export default function AddAppointmentPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleCreate = async (
    data: AppointmentFormData
  ) => {
    try {
      setLoading(true);

      await appointmentAPI.create(data);

      alert("Appointment created successfully.");

      router.push("/dashboard/appointments");
    } catch (error: any) {
      console.error("Create Appointment Error:", error);

      alert(
        error.message ||
          "Failed to create appointment."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex items-start justify-between">

        <div>

          <h1 className="text-3xl font-bold text-slate-900">
            Add Appointment
          </h1>

          <p className="mt-2 text-slate-500">
            Create a new patient appointment.
          </p>

        </div>

        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-100"
        >
          <ArrowLeft size={18} />
          Back
        </button>

      </div>

      {/* Form */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <AppointmentForm
          submitLabel={
            loading
              ? "Creating..."
              : "Create Appointment"
          }
          onSubmit={handleCreate}
        />

      </div>

    </div>
  );
}