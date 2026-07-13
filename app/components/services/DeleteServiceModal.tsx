"use client";

import { Service } from "@/app/types/service";
import { AlertTriangle } from "lucide-react";


type DeleteServiceModalProps = {
  open: boolean;
  service: Service | null;
  onClose: () => void;
  onConfirm: () => void;
};

export default function DeleteServiceModal({
  open,
  service,
  onClose,
  onConfirm,
}: DeleteServiceModalProps) {
  if (!open || !service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">

        {/* Header */}

        <div className="flex items-center gap-3 border-b border-slate-200 p-6">

          <div className="rounded-full bg-red-100 p-3">

            <AlertTriangle
              size={24}
              className="text-red-600"
            />

          </div>

          <div>

            <h2 className="text-xl font-semibold text-slate-900">
              Delete Service
            </h2>

            <p className="text-sm text-slate-500">
              This action cannot be undone.
            </p>

          </div>

        </div>

        {/* Body */}

        <div className="p-6">

          <p className="text-slate-600 leading-7">

            Are you sure you want to delete

            <span className="font-semibold text-slate-900">
              {" "}
              {service.name}
            </span>

            ?

          </p>

        </div>

        {/* Footer */}

        <div className="flex justify-end gap-3 border-t border-slate-200 p-6">

          <button
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
            Delete Service
          </button>

        </div>

      </div>

    </div>
  );
}