
"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { appointmentAPI } from "@/app/services/appointment.api";
import { Appointment } from "@/types/appointment";


// =====================================================
// TYPES
// =====================================================

interface ChartItem {
  name: string;
  value: number;
  color: string;
}


// =====================================================
// COLORS
// =====================================================

const STATUS_COLORS: Record<string, string> = {
  Completed: "#22c55e",
  Upcoming: "#3b82f6",
  Cancelled: "#ef4444",
};


// =====================================================
// COMPONENT
// =====================================================

export default function AppointmentOverview() {
  const router = useRouter();

  // ===================================================
  // STATES
  // ===================================================

  const [appointments, setAppointments] = useState<
    Appointment[]
  >([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  // ===================================================
  // LOAD APPOINTMENTS
  // ===================================================

  useEffect(() => {
    let mounted = true;

    const loadAppointments = async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await appointmentAPI.getAll();

        if (!mounted) {
          return;
        }

        // Support:
        // [
        //   {...},
        //   {...}
        // ]
        //
        // and:
        //
        // {
        //   data: [...]
        // }

        const data = Array.isArray(response)
          ? response
          : Array.isArray(
              (response as any)?.data
            )
          ? (response as any).data
          : [];

        setAppointments(data);
      } catch (error) {
        console.error(
          "LOAD APPOINTMENT OVERVIEW ERROR:",
          error
        );

        if (mounted) {
          setError(
            error instanceof Error
              ? error.message
              : "Failed to load appointments."
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadAppointments();

    return () => {
      mounted = false;
    };
  }, []);


  // ===================================================
  // CALCULATE APPOINTMENT STATS
  // ===================================================

  const chartData = useMemo<ChartItem[]>(() => {
    const now = new Date();

    let completed = 0;
    let upcoming = 0;
    let cancelled = 0;

    appointments.forEach((appointment) => {
      const status =
        String(
          appointment.status ?? ""
        ).trim().toLowerCase();

      // -----------------------------------------------
      // CANCELLED
      // -----------------------------------------------

      if (status === "cancelled") {
        cancelled++;
        return;
      }

      // -----------------------------------------------
      // COMPLETED
      // -----------------------------------------------

      if (status === "completed") {
        completed++;
        return;
      }

      // -----------------------------------------------
      // UPCOMING
      // -----------------------------------------------

      const appointmentDate =
        appointment.appointment_date ??
        appointment.appointmentDate;

      const appointmentTime =
        appointment.appointment_time ??
        appointment.appointmentTime;

      if (!appointmentDate) {
        return;
      }

      const dateTimeString =
        appointmentTime
          ? `${appointmentDate}T${appointmentTime}`
          : `${appointmentDate}T00:00:00`;

      const appointmentDateTime =
        new Date(dateTimeString);

      if (
        !Number.isNaN(
          appointmentDateTime.getTime()
        ) &&
        appointmentDateTime >= now
      ) {
        upcoming++;
      }
    });

    return [
      {
        name: "Completed",
        value: completed,
        color: STATUS_COLORS.Completed,
      },
      {
        name: "Upcoming",
        value: upcoming,
        color: STATUS_COLORS.Upcoming,
      },
      {
        name: "Cancelled",
        value: cancelled,
        color: STATUS_COLORS.Cancelled,
      },
    ];
  }, [appointments]);


  // ===================================================
  // TOTAL
  // ===================================================

  const total = useMemo(() => {
    return chartData.reduce(
      (sum, item) => sum + item.value,
      0
    );
  }, [chartData]);


  // ===================================================
  // VIEW ALL
  // ===================================================

  const handleViewAll = () => {
    router.push("/dashboard/appointments");
  };


  // ===================================================
  // LOADING
  // ===================================================

  if (loading) {
    return (
      <div
        className="
          flex
          min-h-[420px]
          items-center
          justify-center
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-6
          shadow-sm
        "
      >
        <div className="text-center">
          <div
            className="
              mx-auto
              mb-4
              h-10
              w-10
              animate-spin
              rounded-full
              border-4
              border-slate-200
              border-t-blue-600
            "
          />

          <p className="text-sm text-slate-500">
            Loading appointments...
          </p>
        </div>
      </div>
    );
  }


  // ===================================================
  // ERROR
  // ===================================================

  if (error) {
    return (
      <div
        className="
          rounded-2xl
          border
          border-red-200
          bg-red-50
          p-6
          shadow-sm
        "
      >
        <p className="font-medium text-red-700">
          {error}
        </p>

        <button
          type="button"
          onClick={() =>
            window.location.reload()
          }
          className="
            mt-4
            rounded-lg
            bg-red-600
            px-4
            py-2
            text-sm
            font-medium
            text-white
            hover:bg-red-700
          "
        >
          Try Again
        </button>
      </div>
    );
  }


  // ===================================================
  // RENDER
  // ===================================================

  return (
    <div
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
      "
    >

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="mb-8 flex items-center justify-between">

        <div>
          <h2 className="text-xl font-bold text-slate-800">
            Appointments Overview
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Live appointment statistics
          </p>
        </div>

        <button
          type="button"
          onClick={handleViewAll}
          className="
            text-sm
            font-semibold
            text-blue-600
            hover:underline
          "
        >
          View All →
        </button>

      </div>


      {/* =================================================
          CONTENT
      ================================================= */}

      <div className="grid items-center gap-6 lg:grid-cols-2">


        {/* =================================================
            CHART
        ================================================= */}

        <div className="relative h-72">

          {total === 0 ? (
            <div className="flex h-full items-center justify-center">

              <div className="text-center">

                <p className="text-lg font-semibold text-slate-700">
                  No appointments
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Appointment data will appear here.
                </p>

              </div>

            </div>
          ) : (
            <>
              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <PieChart>

                  <Pie
                    data={chartData}
                    innerRadius={70}
                    outerRadius={105}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.map(
                      (entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.color}
                        />
                      )
                    )}
                  </Pie>

                  <Tooltip />

                </PieChart>
              </ResponsiveContainer>


              {/* CENTER */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  flex
                  flex-col
                  items-center
                  justify-center
                "
              >
                <h3 className="text-5xl font-bold text-slate-800">
                  {total}
                </h3>

                <p className="text-slate-500">
                  Total
                </p>
              </div>
            </>
          )}

        </div>


        {/* =================================================
            LEGEND
        ================================================= */}

        <div className="space-y-6">

          {chartData.map((item) => {

            const percentage =
              total > 0
                ? Math.round(
                    (item.value / total) * 100
                  )
                : 0;

            return (
              <div
                key={item.name}
                className="
                  flex
                  items-center
                  justify-between
                "
              >

                {/* LEFT */}

                <div className="flex items-center gap-3">

                  <span
                    className="
                      h-4
                      w-4
                      rounded-full
                    "
                    style={{
                      backgroundColor:
                        item.color,
                    }}
                  />

                  <span className="font-medium text-slate-700">
                    {item.name}
                  </span>

                </div>


                {/* RIGHT */}

                <div className="text-right">

                  <p className="font-semibold text-slate-800">
                    {item.value}
                  </p>

                  <p className="text-sm text-slate-500">
                    {percentage}%
                  </p>

                </div>

              </div>
            );
          })}


          {/* TOTAL INFO */}

          <div
            className="
              mt-8
              border-t
              border-slate-200
              pt-5
            "
          >

            <div className="flex items-center justify-between">

              <span className="text-sm font-medium text-slate-500">
                Total Appointments
              </span>

              <span className="text-lg font-bold text-slate-800">
                {total}
              </span>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
