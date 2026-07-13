"use client";

import { AlertTriangle } from "lucide-react";

type DeleteFeedbackModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  patientName: string;
};

export default function DeleteFeedbackModal({
  open,
  onClose,
  onConfirm,
  patientName,
}: DeleteFeedbackModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">

        {/* Header */}

        <div className="flex flex-col items-center border-b border-slate-200 px-6 py-6">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <AlertTriangle
              size={32}
              className="text-red-600"
            />
          </div>

          <h2 className="text-xl font-bold text-slate-800">
            Delete Feedback
          </h2>

          <p className="mt-2 text-center text-sm text-slate-500">
            Are you sure you want to delete the feedback from
            <span className="font-semibold text-slate-700">
              {" "}
              {patientName}
            </span>
            ?
          </p>

          <p className="mt-1 text-center text-xs text-red-500">
            This action cannot be undone.
          </p>
        </div>

        {/* Footer */}

        <div className="flex justify-end gap-3 px-6 py-5">

          <button
            type="button"
            onClick={onClose}
            className="
              rounded-xl
              border
              border-slate-200
              px-5
              py-2.5
              text-sm
              font-medium
              text-slate-700
              transition
              hover:bg-slate-100
            "
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="
              rounded-xl
              bg-red-600
              px-5
              py-2.5
              text-sm
              font-medium
              text-white
              transition
              hover:bg-red-700
            "
          >
            Delete
          </button>

        </div>
      </div>
    </div>
  );
}