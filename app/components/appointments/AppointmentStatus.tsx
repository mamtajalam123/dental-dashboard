"use client";

import {
  CalendarDays,
  Clock3,
  CheckCircle2,
  IndianRupee,
} from "lucide-react";

import { Appointment } from "@/app/types/appointment";

interface AppointmentStatsProps {
  appointments?: Appointment[];
}

export default function AppointmentStats({
  appointments = [],
}: AppointmentStatsProps) {

  const total =
    appointments.length;

  const pending =
    appointments.filter(
      (item) =>
        item.status === "Pending"
    ).length;

  const completed =
    appointments.filter(
      (item) =>
        item.status === "Completed"
    ).length;

  const paid =
    appointments.filter(
      (item) =>
        item.payment === "Paid"
    ).length;

  const cards = [

    {
      title: "Total Appointments",
      value: total,
      icon: CalendarDays,
      color:
        "bg-blue-100 text-blue-700",
    },

    {
      title: "Pending",
      value: pending,
      icon: Clock3,
      color:
        "bg-yellow-100 text-yellow-700",
    },

    {
      title: "Completed",
      value: completed,
      icon: CheckCircle2,
      color:
        "bg-green-100 text-green-700",
    },

    {
      title: "Paid",
      value: paid,
      icon: IndianRupee,
      color:
        "bg-purple-100 text-purple-700",
    },

  ];

  return (

    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

      {cards.map((card) => {

        const Icon = card.icon;

        return (

          <div
            key={card.title}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-500">

                  {card.title}

                </p>

                <h2 className="mt-2 text-3xl font-bold text-slate-900">

                  {card.value}

                </h2>

              </div>

              <div
                className={`rounded-xl p-3 ${card.color}`}
              >

                <Icon size={24} />

              </div>

            </div>

          </div>

        );

      })}

    </div>

  );

}