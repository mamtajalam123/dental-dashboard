"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { appointmentAPI } from "@/app/services/appointment.api";
import { Appointment } from "@/types/appointment";

import AppointmentStatus from "@/app/components/appointments/AppointmentStatus";
import PaymentStatus from "@/app/components/appointments/PaymentStatus";

export default function ViewAppointmentPage() {
  const params = useParams();

  const id = Number(params.id);

  const [appointment, setAppointment] =
    useState<Appointment | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadAppointment();
  }, []);

  const loadAppointment = async () => {
    try {
      const data =
        await appointmentAPI.getById(id);

      setAppointment(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="rounded-2xl border bg-white p-6">
        Loading...
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className="rounded-2xl border bg-white p-6 text-center">
        Appointment not found.
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Appointment Details
          </h1>

          <p className="mt-2 text-slate-500">
            View complete appointment information.
          </p>
        </div>

        <div className="flex gap-3">

          <Link
            href="/dashboard/appointments"
            className="rounded-xl border px-5 py-3"
          >
            Back
          </Link>

          <Link
            href={`/dashboard/appointments/${appointment.id}/edit`}
            className="rounded-xl bg-blue-600 px-5 py-3 text-white"
          >
            Edit
          </Link>

        </div>

      </div>

      {/* Patient */}

      <div className="rounded-2xl border bg-white p-6">

        <h2 className="mb-5 text-xl font-bold">
          Patient Information
        </h2>

        <div className="grid gap-5 md:grid-cols-2">

          <div>
            <p className="text-sm text-slate-500">
              Name
            </p>

            <p className="font-semibold">
              {appointment.patientName}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Phone
            </p>

            <p className="font-semibold">
              {appointment.phone}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Email
            </p>

            <p className="font-semibold">
              {appointment.email}
            </p>
          </div>

        </div>

      </div>

      {/* Appointment */}

      <div className="rounded-2xl border bg-white p-6">

        <h2 className="mb-5 text-xl font-bold">
          Appointment Information
        </h2>

        <div className="grid gap-5 md:grid-cols-2">

          <div>
            <p className="text-sm text-slate-500">
              Treatment
            </p>

            <p className="font-semibold">
              {appointment.treatment}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Doctor
            </p>

            <p className="font-semibold">
              {appointment.doctor}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Date
            </p>

            <p className="font-semibold">
              {appointment.appointmentDate}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Time
            </p>

            <p className="font-semibold">
              {appointment.appointmentTime}
            </p>
          </div>

        </div>

      </div>

      {/* Status */}

      <div className="rounded-2xl border bg-white p-6">

        <h2 className="mb-5 text-xl font-bold">
          Status Information
        </h2>

        <div className="flex gap-10">

          <div>
            <p className="mb-2 text-sm text-slate-500">
              Appointment Status
            </p>

            <AppointmentStatus
              status={appointment.status}
            />
          </div>

          <div>
            <p className="mb-2 text-sm text-slate-500">
              Payment Status
            </p>

            <PaymentStatus
              status={appointment.payment}
            />
          </div>

        </div>

      </div>

      {/* Notes */}

      <div className="rounded-2xl border bg-white p-6">

        <h2 className="mb-4 text-xl font-bold">
          Message
        </h2>

        <p className="text-slate-600">
          {appointment.message ||
            "No message available"}
        </p>

      </div>

    </div>
  );
}