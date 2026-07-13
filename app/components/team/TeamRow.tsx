"use client";

import Image from "next/image";

import { TeamMember } from "@/data/team";

import TeamStatus from "./TeamStatus";
import TeamActions from "./TeamActions";

type TeamRowProps = {
  member: TeamMember;
  onDelete: (id: number) => void;
};

export default function TeamRow({
  member,
  onDelete,
}: TeamRowProps) {
  return (
    <tr className="border-b border-slate-200 transition hover:bg-slate-50">

      {/* Doctor */}

      <td className="px-6 py-4">
        <div className="flex items-center gap-4">

          <Image
            src={member.image}
            alt={member.name}
            width={50}
            height={50}
            className="rounded-full border object-cover"
          />

          <div>
            <h3 className="font-semibold text-slate-800">
              {member.name}
            </h3>

            <p className="text-sm text-slate-500">
              {member.email}
            </p>
          </div>

        </div>
      </td>

      {/* Designation */}

      <td className="px-6 py-4">
        <span className="font-medium text-slate-700">
          {member.designation}
        </span>
      </td>

      {/* Specialization */}

      <td className="px-6 py-4">
        <span className="text-slate-600">
          {member.specialization}
        </span>
      </td>

      {/* Experience */}

      <td className="px-6 py-4">
        <span className="text-slate-600">
          {member.experience}
        </span>
      </td>

      {/* Status */}

      <td className="px-6 py-4">
        <TeamStatus
          status={member.status}
        />
      </td>

      {/* Actions */}

      <td className="px-6 py-4">
        <TeamActions
          id={member.id}
          onDelete={onDelete}
        />
      </td>

    </tr>
  );
}