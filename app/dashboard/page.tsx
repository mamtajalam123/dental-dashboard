import AppointmentOverview from "../components/dashboard/AppointmentOverview";






export default function DashboardPage() {
  return (
    <main className="space-y-8">

      {/* Page Header */}

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Dashboard
          </h1>

          <p className="mt-1 text-slate-500">
            Welcome back, Dr. Sultan 👋
          </p>
        </div>

      </div>

      {/* Statistics */}

     

      {/* Appointment Overview + Feedback */}

      <div className="grid gap-6 xl:grid-cols-3">

        <div className="xl:col-span-2">
          <AppointmentOverview />
        </div>

       

      </div>

  

     

     

    

    </main>
  );
}