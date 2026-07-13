"use client";

import { ArchiveRestore, Archive, X } from "lucide-react";

type ArchiveContactModalProps = {
  open: boolean;
  patientName: string;
  archived: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export default function ArchiveContactModal({
  open,
  patientName,
  archived,
  onClose,
  onConfirm,
}: ArchiveContactModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-200 p-6">

          <div className="flex items-center gap-3">

            <div
              className={`
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                ${
                  archived
                    ? "bg-emerald-100"
                    : "bg-amber-100"
                }
              `}
            >
              {archived ? (
                <ArchiveRestore
                  size={22}
                  className="text-emerald-600"
                />
              ) : (
                <Archive
                  size={22}
                  className="text-amber-600"
                />
              )}
            </div>

            <div>

              <h2 className="text-xl font-bold text-slate-800">
                {archived
                  ? "Restore Message"
                  : "Archive Message"}
              </h2>

              <p className="text-sm text-slate-500">
                {archived
                  ? "The message will become active again."
                  : "The message will be moved to archive."}
              </p>

            </div>

          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-slate-100"
          >
            <X size={18} />
          </button>

        </div>

        {/* Body */}

        <div className="p-6">

          <p className="leading-7 text-slate-600">

            {archived
              ? "Do you want to restore the message from"
              : "Do you want to archive the message from"}

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
            className={`
              rounded-xl
              px-5
              py-2.5
              font-medium
              text-white
              transition
              ${
                archived
                  ? "bg-emerald-600 hover:bg-emerald-700"
                  : "bg-amber-500 hover:bg-amber-600"
              }
            `}
          >
            {archived
              ? "Restore"
              : "Archive"}
          </button>

        </div>

      </div>

    </div>
  );
}