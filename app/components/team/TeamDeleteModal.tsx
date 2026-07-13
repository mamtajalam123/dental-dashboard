"use client";

import {
  AlertTriangle,
  Trash2,
  X,
} from "lucide-react";

type TeamDeleteModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function TeamDeleteModal({
  open,
  onClose,
  onConfirm,
}: TeamDeleteModalProps) {

  if (!open) return null;

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-200 p-6">

          <div className="flex items-center gap-3">

            <div className="rounded-full bg-red-100 p-3">

              <AlertTriangle
                size={24}
                className="text-red-600"
              />

            </div>

            <div>

              <h2 className="text-xl font-bold text-slate-900">
                Delete Team Member
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                This action cannot be undone.
              </p>

            </div>

          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-slate-100"
          >
            <X size={20} />
          </button>

        </div>

        {/* Body */}

        <div className="p-6">

          <p className="leading-7 text-slate-600">
            Are you sure you want to delete this
            team member?
            <br />
            All associated information will be
            permanently removed.
          </p>

        </div>

        {/* Footer */}

        <div className="flex justify-end gap-3 border-t border-slate-200 p-6">

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-300 px-5 py-3 font-medium transition hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-medium text-white transition hover:bg-red-700"
          >
            <Trash2 size={18} />

            Delete
          </button>

        </div>

      </div>

    </div>

  );

}