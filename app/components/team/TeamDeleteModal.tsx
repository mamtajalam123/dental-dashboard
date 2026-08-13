"use client";

import {
  AlertTriangle,
  Loader2,
} from "lucide-react";

import { Team } from "@/app/types/team";

type TeamDeleteModalProps = {
  open: boolean;

  member: Team | null;

  onClose: () => void;

  onConfirm: () => Promise<void> | void;
};

export default function TeamDeleteModal({
  open,
  member,
  onClose,
  onConfirm,
}: TeamDeleteModalProps) {
  if (!open || !member) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

        {/* Icon */}

        <div className="mb-4 flex justify-center">

          <div className="rounded-full bg-red-100 p-3">

            <AlertTriangle
              size={28}
              className="text-red-600"
            />

          </div>

        </div>

        {/* Title */}

        <h2 className="text-center text-2xl font-bold text-slate-900">
          Delete Team Member
        </h2>

        {/* Message */}

        <p className="mt-3 text-center text-slate-600">
          Are you sure you want to delete
          <span className="font-semibold">
            {" "}
            {member.name}
          </span>
          ?
        </p>

        <p className="mt-2 text-center text-sm text-red-500">
          This action cannot be undone.
        </p>

        {/* Buttons */}

        <div className="mt-8 flex justify-end gap-3">

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-300 px-5 py-2.5 hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-white hover:bg-red-700"
          >
            <Loader2 size={18} />
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}