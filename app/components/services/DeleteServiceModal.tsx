"use client";

import { useState } from "react";
import { X, Trash2 } from "lucide-react";

import { Service } from "@/app/types/service";

interface DeleteServiceModalProps {
  open: boolean;
  service: Service | null;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

export default function DeleteServiceModal({
  open,
  service,
  onClose,
  onConfirm,
}: DeleteServiceModalProps) {
  const [loading, setLoading] = useState(false);

  if (!open || !service) {
    return null;
  }

  const handleDelete = async () => {
    try {
      setLoading(true);

      await onConfirm();

      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to delete service.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/40
        px-4
      "
    >
      <div
        className="
          w-full
          max-w-md
          rounded-2xl
          bg-white
          p-6
          shadow-xl
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                bg-red-100
              "
            >
              <Trash2
                size={22}
                className="text-red-600"
              />
            </div>

            <h2 className="text-xl font-bold text-slate-800">
              Delete Service
            </h2>
          </div>

          <button
            onClick={onClose}
            disabled={loading}
            className="
              rounded-lg
              p-2
              hover:bg-slate-100
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="mt-6">
          <p className="text-slate-600">
            Are you sure you want to delete this service?
          </p>

          <div
            className="
              mt-4
              rounded-xl
              bg-slate-50
              p-4
            "
          >
            <h3 className="font-semibold text-slate-800">
              {service.name}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              {service.categoryName}
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="
              rounded-xl
              border
              px-5
              py-2.5
              font-medium
              text-slate-700
              hover:bg-slate-50
            "
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            disabled={loading}
            className="
              rounded-xl
              bg-red-600
              px-5
              py-2.5
              font-medium
              text-white
              hover:bg-red-700
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}