"use client";

import { Trash2, X } from "lucide-react";

type DeleteContactModalProps = {
  open: boolean;
  patientName: string;
  onClose: () => void;
  onConfirm: () => void;
};

export default function DeleteContactModal({
  open,
  patientName,
  onClose,
  onConfirm,
}: DeleteContactModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-200 p-6">

          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <Trash2
                size={22}
                className="text-red-600"
              />
            </div>

            <div>

              <h2 className="text-xl font-bold text-slate-800">
                Delete Message
              </h2>

              <p className="text-sm text-slate-500">
                This action cannot be undone.
              </p>

            </div>

          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-slate-100"
          >
            <X size={18} />
          </button>

        </div>

        {/* Body */}

        <div className="p-6">

          <p className="text-slate-600 leading-7">

            Are you sure you want to delete the message from

            <span className="font-semibold text-slate-800">
              {" "}
              {patientName}
            </span>

            ?

          </p>

        </div>

        {/* Footer */}

        <div className="flex justify-end gap-3 border-t border-slate-200 p-6">

          <button
            type="button"
            onClick={onClose}
            className="
              rounded-xl
              border
              border-slate-300
              px-5
              py-2.5
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