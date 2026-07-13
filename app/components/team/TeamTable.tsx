"use client";

import { useMemo, useState } from "react";

import {
  TeamMember,
  teamMembers,
} from "@/data/team";

import TeamFilters from "./TeamFilters";
import TeamRow from "./TeamRow";
import TeamDeleteModal from "./TeamDeleteModal";

export default function TeamTable() {

  const [members, setMembers] =
    useState<TeamMember[]>(teamMembers);

  const [search, setSearch] =
    useState("");

  const [designation, setDesignation] =
    useState("");

  const [status, setStatus] =
    useState("");

  const [selectedId, setSelectedId] =
    useState<number | null>(null);

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const filteredMembers = useMemo(() => {

    return members.filter((member) => {

      const searchMatch =
        member.name
          .toLowerCase()
          .includes(search.toLowerCase());

      const designationMatch =
        designation === "" ||
        member.designation === designation;

      const statusMatch =
        status === "" ||
        member.status === status;

      return (
        searchMatch &&
        designationMatch &&
        statusMatch
      );

    });

  }, [
    members,
    search,
    designation,
    status,
  ]);

  const handleDeleteClick = (
    id: number
  ) => {

    setSelectedId(id);

    setDeleteOpen(true);

  };

  const confirmDelete = () => {

    if (selectedId === null) return;

    setMembers((prev) =>
      prev.filter(
        (member) =>
          member.id !== selectedId
      )
    );

    setDeleteOpen(false);

    setSelectedId(null);

  };

  return (
    <div className="space-y-6">

      <TeamFilters
        search={search}
        designation={designation}
        status={status}
        onSearchChange={setSearch}
        onDesignationChange={setDesignation}
        onStatusChange={setStatus}
      />

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-slate-100">

              <tr>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Team Member
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Designation
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Specialization
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Experience
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                  Status
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredMembers.length > 0 ? (

                filteredMembers.map((member) => (

                  <TeamRow
                    key={member.id}
                    member={member}
                    onDelete={handleDeleteClick}
                  />

                ))

              ) : (

                <tr>

                  <td
                    colSpan={6}
                    className="py-12 text-center text-slate-500"
                  >
                    No team members found.
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

      <TeamDeleteModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={confirmDelete}
      />

    </div>
  );
}