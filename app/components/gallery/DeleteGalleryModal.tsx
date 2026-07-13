"use client";

import { AlertTriangle } from "lucide-react";

type DeleteGalleryModalProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  onConfirm: () => void;
};

export default function DeleteGalleryModal({
  open,
  title,
  onClose,
  onConfirm,
}: DeleteGalleryModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">

        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
          <AlertTriangle
            size={30}
            className="text-red-600"
          />
        </div>

        <h2 className="mt-5 text-center text-2xl font-bold text-slate-800">
          Delete Gallery Item?
        </h2>

        <p className="mt-3 text-center text-slate-500">
          Are you sure you want to delete
          <span className="font-semibold text-slate-700">
            {" "}
            "{title}"
          </span>
          ?
        </p>

        <p className="mt-2 text-center text-sm text-red-500">
          This action cannot be undone.
        </p>

        <div className="mt-8 flex gap-3">

          <button
            type="button"
            onClick={onClose}
            className="
              flex-1
              rounded-xl
              border
              border-slate-300
              py-3
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
              flex-1
              rounded-xl
              bg-red-600
              py-3
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