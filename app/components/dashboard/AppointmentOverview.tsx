"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Completed",
    value: 72,
    color: "#22c55e",
  },
  {
    name: "Upcoming",
    value: 38,
    color: "#3b82f6",
  },
  {
    name: "Cancelled",
    value: 18,
    color: "#ef4444",
  },
];

export default function AppointmentOverview() {
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
      {/* Header */}

      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">
          Appointments Overview
        </h2>

        <button className="text-sm font-semibold text-blue-600 hover:underline">
          View All →
        </button>
      </div>

      {/* Content */}

      <div className="grid items-center gap-6 lg:grid-cols-2">

        {/* Chart */}

        <div className="relative h-72">

          <ResponsiveContainer width="100%" height="100%">
            <PieChart>

              <Pie
                data={data}
                innerRadius={70}
                outerRadius={105}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={entry.color}
                  />
                ))}
              </Pie>

            </PieChart>
          </ResponsiveContainer>

          {/* Center */}

          <div className="absolute inset-0 flex flex-col items-center justify-center">

            <h3 className="text-5xl font-bold text-slate-800">
              128
            </h3>

            <p className="text-slate-500">
              Total
            </p>

          </div>

        </div>

        {/* Legend */}

        <div className="space-y-6">

          {data.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">

                <span
                  className="h-4 w-4 rounded-full"
                  style={{
                    backgroundColor: item.color,
                  }}
                />

                <span className="font-medium text-slate-700">
                  {item.name}
                </span>

              </div>

              <div className="text-right">

                <p className="font-semibold text-slate-800">
                  {item.value}
                </p>

                <p className="text-sm text-slate-500">
                  {Math.round(
                    (item.value / 128) * 100
                  )}
                  %
                </p>

              </div>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
}