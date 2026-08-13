"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Designation } from "@/types/designation";

interface EditDesignationModalProps {
  open: boolean;
  designation: Designation | null;
  onClose: () => void;
  onUpdate: (
    id: number,
    name: string
  ) => Promise<void>;
}

export default function EditDesignationModal({
  open,
  designation,
  onClose,
  onUpdate,
}: EditDesignationModalProps) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (designation) {
      setName(designation.name);
    }
  }, [designation]);

  if (!open || !designation) {
    return null;
  }

  const handleUpdate = async () => {
    if (!name.trim()) {
      alert("Please enter designation name.");
      return;
    }

    try {
      setLoading(true);

      await onUpdate(designation.id, name);

      setName("");
      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to update designation.");
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
          <h2 className="text-xl font-bold text-slate-800">
            Edit Designation
          </h2>

          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-lg p-2 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Input */}
        <div className="mt-6">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Designation Name
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
            placeholder="Enter designation"
            className="
              w-full
              rounded-xl
              border
              border-slate-300
              px-4
              py-3
              outline-none
              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-200
            "
          />
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="
              rounded-xl
              border
              border-slate-300
              px-5
              py-2.5
              text-slate-700
              hover:bg-slate-100
            "
          >
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            disabled={loading}
            className="
              rounded-xl
              bg-blue-600
              px-5
              py-2.5
              text-white
              hover:bg-blue-700
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}