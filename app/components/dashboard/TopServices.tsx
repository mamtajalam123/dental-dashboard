import {
  Sparkles,
  ShieldCheck,
  Smile,
  BriefcaseMedical,
} from "lucide-react";

const services = [
  {
    id: 1,
    name: "Dental Cleaning",
    patients: 125,
    progress: 90,
    color: "bg-blue-500",
    icon: <Sparkles size={22} className="text-blue-600" />,
    bg: "bg-blue-100",
  },
  {
    id: 2,
    name: "Root Canal",
    patients: 98,
    progress: 75,
    color: "bg-green-500",
    icon: <ShieldCheck size={22} className="text-green-600" />,
    bg: "bg-green-100",
  },
  {
    id: 3,
    name: "Dental Implant",
    patients: 82,
    progress: 65,
    color: "bg-purple-500",
    icon: (
      <BriefcaseMedical
        size={22}
        className="text-purple-600"
      />
    ),
    bg: "bg-purple-100",
  },
  {
    id: 4,
    name: "Teeth Whitening",
    patients: 61,
    progress: 50,
    color: "bg-amber-500",
    icon: <Smile size={22} className="text-amber-600" />,
    bg: "bg-amber-100",
  },
];

export default function TopServices() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      {/* Header */}

      <div className="mb-6 flex items-center justify-between">

        <div>
          <h2 className="text-xl font-bold text-slate-800">
            Top Services
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Most booked treatments
          </p>
        </div>

        <button className="text-sm font-semibold text-blue-600 transition hover:text-blue-700">
          View All →
        </button>

      </div>

      {/* Services */}

      <div className="space-y-5">

        {services.map((service) => (
          <div
            key={service.id}
            className="rounded-xl border border-slate-100 p-4 transition-all hover:border-blue-200 hover:bg-slate-50"
          >
            <div className="mb-3 flex items-center justify-between">

              <div className="flex items-center gap-4">

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${service.bg}`}
                >
                  {service.icon}
                </div>

                <div>

                  <h3 className="font-semibold text-slate-800">
                    {service.name}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {service.patients} Patients
                  </p>

                </div>

              </div>

              <span className="text-lg font-bold text-slate-700">
                {service.progress}%
              </span>

            </div>

            {/* Progress Bar */}

            <div className="h-2 overflow-hidden rounded-full bg-slate-200">

              <div
                className={`h-full rounded-full ${service.color}`}
                style={{
                  width: `${service.progress}%`,
                }}
              />

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}