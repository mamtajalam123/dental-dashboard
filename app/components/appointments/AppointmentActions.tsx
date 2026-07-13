"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MoreVertical,
  Eye,
  Pencil,
  Trash2,
  Phone,
  Mail,
} from "lucide-react";

import {
  AppointmentStatus,
  PaymentStatus,
} from "@/types/appointment";

type Props = {
  id: number;

  phone: string;

  email: string;

  status: AppointmentStatus;

  payment: PaymentStatus;

  onStatusChange: (
    id: number,
    status: AppointmentStatus
  ) => void;

  onPaymentChange: (
    id: number,
    payment: PaymentStatus
  ) => void;

  onDelete: (id: number) => void;
};

const statusOptions: AppointmentStatus[] = [
  "Pending",
  "Confirmed",
  "Completed",
  "Cancelled",
  "Rejected",
  "No Show",
];

const paymentOptions: PaymentStatus[] = [
  "Pending",
  "Paid",
  "Partially Paid",
  "Refunded",
];

export default function AppointmentActions({
  id,
  phone,
  email,
  status,
  payment,
  onStatusChange,
  onPaymentChange,
  onDelete,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex justify-center">

      <button
        onClick={() => setOpen(!open)}
        className="rounded-lg p-2 transition hover:bg-slate-100"
      >
        <MoreVertical size={18} />
      </button>

      {open && (

        <div
          className="
            absolute
            right-0
            top-10
            z-50
            w-64
            rounded-xl
            border
            border-slate-200
            bg-white
            shadow-xl
          "
        >

          {/* View */}

          <Link
            href={`/dashboard/appointments/view/${id}`}
            className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50"
          >
            <Eye size={17} />

            View Appointment
          </Link>

          {/* Edit */}

          <Link
            href={`/dashboard/appointments/edit/${id}`}
            className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50"
          >
            <Pencil size={17} />

            Edit Appointment
          </Link>

          {/* Call */}

          <a
            href={`tel:${phone}`}
            className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50"
          >
            <Phone size={17} />

            Call Patient
          </a>

          {/* Email */}

          <a
            href={`mailto:${email}`}
            className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50"
          >
            <Mail size={17} />

            Email Patient
          </a>

          <div className="my-2 border-t" />

          {/* Status */}

          <div className="px-4 pb-3">

            <label className="mb-2 block text-xs font-semibold uppercase text-slate-500">
              Appointment Status
            </label>

            <select
              value={status}
              onChange={(e) =>
                onStatusChange(
                  id,
                  e.target.value as AppointmentStatus
                )
              }
              className="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
            >
              {statusOptions.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </select>

          </div>

          {/* Payment */}

          <div className="px-4 pb-4">

            <label className="mb-2 block text-xs font-semibold uppercase text-slate-500">
              Payment Status
            </label>

            <select
              value={payment}
              onChange={(e) =>
                onPaymentChange(
                  id,
                  e.target.value as PaymentStatus
                )
              }
              className="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
            >
              {paymentOptions.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </select>

          </div>

          <div className="border-t" />

          {/* Delete */}

          <button
            onClick={() => {
              setOpen(false);
              onDelete(id);
            }}
            className="flex w-full items-center gap-3 px-4 py-3 text-red-600 transition hover:bg-red-50"
          >
            <Trash2 size={17} />

            Delete Appointment
          </button>

        </div>

      )}

    </div>
  );
}