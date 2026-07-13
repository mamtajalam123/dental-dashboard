import {
  Users,
  UserCheck,
  UserX,
  Stethoscope,
} from "lucide-react";

import { teamMembers } from "@/data/team";
import TeamTable from "@/app/components/team/TeamTable";

export default function TeamPage() {

  const totalMembers =
    teamMembers.length;

  const activeMembers =
    teamMembers.filter(
      (member) =>
        member.status === "Active"
    ).length;

  const inactiveMembers =
    teamMembers.filter(
      (member) =>
        member.status === "Inactive"
    ).length;

  const doctors =
    teamMembers.filter((member) =>
      member.designation.includes(
        "Dentist"
      ) ||
      member.designation.includes(
        "Orthodontist"
      ) ||
      member.designation.includes(
        "Surgeon"
      )
    ).length;

  return (

    <div className="space-y-6">

      {/* Header */}

      <div>

        <h1 className="text-3xl font-bold text-slate-900">
          Team Management
        </h1>

        <p className="mt-2 text-slate-500">
          Manage doctors, assistants,
          receptionists and clinic staff.
        </p>

      </div>

      {/* Statistics */}

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

        {/* Total */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-500">
                Total Members
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {totalMembers}
              </h2>

            </div>

            <div className="rounded-xl bg-blue-100 p-3">

              <Users
                className="text-blue-600"
                size={28}
              />

            </div>

          </div>

        </div>

        {/* Active */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-500">
                Active
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {activeMembers}
              </h2>

            </div>

            <div className="rounded-xl bg-green-100 p-3">

              <UserCheck
                className="text-green-600"
                size={28}
              />

            </div>

          </div>

        </div>

        {/* Inactive */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-500">
                Inactive
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {inactiveMembers}
              </h2>

            </div>

            <div className="rounded-xl bg-red-100 p-3">

              <UserX
                className="text-red-600"
                size={28}
              />

            </div>

          </div>

        </div>

        {/* Doctors */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-500">
                Doctors
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {doctors}
              </h2>

            </div>

            <div className="rounded-xl bg-violet-100 p-3">

              <Stethoscope
                className="text-violet-600"
                size={28}
              />

            </div>

          </div>

        </div>

      </div>

      {/* Table */}

      <TeamTable />

    </div>

  );

}