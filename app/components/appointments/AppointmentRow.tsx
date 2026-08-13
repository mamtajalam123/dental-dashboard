"use client";

import Link from "next/link";
import { Edit, Trash2 } from "lucide-react";

import { Appointment } from "@/app/types/appointment";

type AppointmentStatus =
  | "Pending"
  | "Confirmed"
  | "Completed"
  | "Cancelled";

type PaymentStatus =
  | "Pending"
  | "Paid"
  | "Partially Paid"
  | "Refunded";

type AppointmentRowProps = {
  appointment: Appointment;

  onStatusChange: (
    id: number,
    status: AppointmentStatus
  ) => void;

  onPaymentChange: (
    id: number,
    payment: PaymentStatus
  ) => void;

  onDelete: (
    appointment: Appointment
  ) => void;
};

export default function AppointmentRow({
  appointment,
  onStatusChange,
  onPaymentChange,
  onDelete,
}: AppointmentRowProps) {
  const statusClass = {
    Pending: "bg-yellow-100 text-yellow-700",
    Confirmed: "bg-blue-100 text-blue-700",
    Completed: "bg-green-100 text-green-700",
    Cancelled: "bg-red-100 text-red-700",
  };

  const paymentClass = {
    Pending: "bg-yellow-100 text-yellow-700",
    Paid: "bg-green-100 text-green-700",
    "Partially Paid": "bg-blue-100 text-blue-700",
    Refunded: "bg-red-100 text-red-700",
  };

  return (
    <tr className="border-t border-slate-200 hover:bg-slate-50">

      {/* Patient */}
      <td className="px-5 py-4">
        <div>
          <h3 className="font-semibold text-slate-900">
            {appointment.patientName || "-"}
          </h3>

          {appointment.phone && (
            <p className="text-sm text-slate-500">
              {appointment.phone}
            </p>
          )}

          {appointment.email && (
            <p className="text-sm text-slate-500">
              {appointment.email}
            </p>
          )}
        </div>
      </td>

      {/* Doctor */}
      <td className="px-5 py-4">
        {appointment.doctor || "-"}
      </td>

      {/* Treatment */}
      <td className="px-5 py-4">
        {appointment.treatment || "-"}
      </td>

      {/* Date */}
      <td className="px-5 py-4">
        <div>
          <div>{appointment.appointmentDate || "-"}</div>

          <div className="text-sm text-slate-500">
            {appointment.appointmentTime || "-"}
          </div>
        </div>
      </td>

      {/* Status */}
      <td className="px-5 py-4">
        <select
          value={appointment.status}
          onChange={(e) =>
            onStatusChange(
              appointment.id!,
              e.target.value as AppointmentStatus
            )
          }
          className={`min-w-[140px] rounded-lg border px-3 py-2 text-sm font-medium ${
            statusClass[
              appointment.status as AppointmentStatus
            ] || "bg-slate-100 text-slate-700"
          }`}
        >
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>

        </select>
      </td>

      {/* Payment */}
      <td className="px-5 py-4">
        <select
          value={appointment.payment}
          onChange={(e) =>
            onPaymentChange(
              appointment.id!,
              e.target.value as PaymentStatus
            )
          }
          className={`min-w-[140px] rounded-lg border px-3 py-2 text-sm font-medium ${
            paymentClass[
              appointment.payment as PaymentStatus
            ] || "bg-slate-100 text-slate-700"
          }`}
        >
          <option value="Pending">Pending</option>
          <option value="Paid">Paid</option>
          <option value="Partially Paid">
            Partially Paid
          </option>
          <option value="Refunded">
            Refunded
          </option>
        </select>
      </td>

      {/* Action */}
      <td className="px-5 py-4">
        <div className="flex items-center gap-2">

         <Link
  href={`/dashboard/appointments/${appointment.id}`}
  className="rounded-lg border p-2 text-blue-600 transition hover:bg-blue-50"
  title="Edit"
>
  <Edit size={18} />
</Link>

          <button
            type="button"
            onClick={() => onDelete(appointment)}
            className="rounded-lg border p-2 text-red-600 transition hover:bg-red-50"
            title="Delete"
          >
            <Trash2 size={18} />
          </button>

        </div>
      </td>

    </tr>
  );
}