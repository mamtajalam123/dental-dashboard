"use client";

interface TeamScheduleProps {
  workingDays: string[];
  startTime: string;
  endTime: string;
  onWorkingDaysChange: (days: string[]) => void;
  onStartTimeChange: (time: string) => void;
  onEndTimeChange: (time: string) => void;
}

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function TeamSchedule({
  workingDays,
  startTime,
  endTime,
  onWorkingDaysChange,
  onStartTimeChange,
  onEndTimeChange,
}: TeamScheduleProps) {
  const toggleDay = (day: string) => {
    if (workingDays.includes(day)) {
      onWorkingDaysChange(
        workingDays.filter((item) => item !== day)
      );
    } else {
      onWorkingDaysChange([...workingDays, day]);
    }
  };

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-semibold">
        Working Schedule
      </h2>

      {/* Working Days */}

      <div>

        <label className="mb-3 block font-medium">
          Working Days
        </label>

        <div className="flex flex-wrap gap-3">

          {days.map((day) => {
            const active = workingDays.includes(day);

            return (
              <button
                key={day}
                type="button"
                onClick={() => toggleDay(day)}
                className={`rounded-xl border px-4 py-2 text-sm font-medium transition ${
                  active
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-slate-300 bg-white text-slate-700 hover:border-blue-500"
                }`}
              >
                {day}
              </button>
            );
          })}

        </div>

      </div>

      {/* Working Time */}

      <div className="mt-8 grid gap-5 md:grid-cols-2">

        <div>

          <label className="mb-2 block font-medium">
            Start Time
          </label>

          <input
            type="time"
            value={startTime}
            onChange={(e) =>
              onStartTimeChange(e.target.value)
            }
            className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
          />

        </div>

        <div>

          <label className="mb-2 block font-medium">
            End Time
          </label>

          <input
            type="time"
            value={endTime}
            onChange={(e) =>
              onEndTimeChange(e.target.value)
            }
            className="w-full rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
          />

        </div>

      </div>

    </div>
  );
}