"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import AppointmentForm, {
  AppointmentFormData,
} from "@/app/components/appointments/AppointmentForm";

import { appointmentAPI } from "@/app/services/appointment.api";

import { Appointment } from "@/app/types/appointment";

export default function EditAppointmentPage() {
  const router = useRouter();
  const params = useParams();

  const id = Number(params.id);

  const [appointment, setAppointment] =
    useState<Appointment | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {
    if (!id || isNaN(id)) {
      router.push("/dashboard/appointments");
      return;
    }

    loadAppointment();
  }, [id]);

  const loadAppointment = async () => {
    try {
      setLoading(true);

      const response =
        await appointmentAPI.getById(id);

      const data =
        response?.data || response;

      setAppointment(data);
    } catch (error) {
      console.error(
        "Load Appointment Error:",
        error
      );

      alert("Appointment not found.");

      router.push("/dashboard/appointments");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (
    data: AppointmentFormData
  ) => {
    try {
      setSaving(true);

      await appointmentAPI.update(
        id,
        data
      );

      alert(
        "Appointment updated successfully."
      );

      router.push(
        "/dashboard/appointments"
      );
    } catch (error: any) {
      console.error(
        "Update Error:",
        error
      );

      alert(
        error.message ||
          "Failed to update appointment."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="rounded-xl border bg-white p-10 text-center">
        Loading appointment...
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className="rounded-xl border bg-white p-10 text-center">
        Appointment not found.
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex items-start justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Edit Appointment
          </h1>

          <p className="mt-2 text-slate-500">
            Update patient appointment
            details.
          </p>

        </div>

        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium shadow-sm transition hover:bg-slate-100"
        >
          <ArrowLeft size={18} />
          Back
        </button>

      </div>

      {/* Form */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <AppointmentForm
          initialData={{
            patientName:
              appointment.patientName,
            phone: appointment.phone,
            email: appointment.email,
            doctor: appointment.doctor,
            treatment:
              appointment.treatment,
            appointmentDate:
              appointment.appointmentDate,
            appointmentTime:
              appointment.appointmentTime,
            message:
              appointment.message || "",
          }}
          submitLabel={
            saving
              ? "Updating..."
              : "Update Appointment"
          }
          onSubmit={handleUpdate}
        />

      </div>

    </div>
  );
}