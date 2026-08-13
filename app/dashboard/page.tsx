
"use client";

import AppointmentOverview from "../components/dashboard/AppointmentOverview";

export default function AppointmentPage() {
  return (
    <main className="space-y-8">

      {/* =================================================
          DASHBOARD HEADER
      ================================================= */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Dashboard
          </h1>

          <p className="mt-1 text-slate-500">
            Welcome back, Dr. Sultan 👋
          </p>
        </div>

      </div>


      {/* =================================================
          APPOINTMENT OVERVIEW
      ================================================= */}

      <section
        aria-labelledby="appointment-overview-title"
        className="grid gap-6 xl:grid-cols-3"
      >

        <div className="xl:col-span-2">
          <AppointmentOverview />
        </div>

      </section>

    </main>
  );
}