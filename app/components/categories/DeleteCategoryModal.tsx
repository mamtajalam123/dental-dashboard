"use client";

import { Category } from "@/types/category";

interface DeleteCategoryModalProps {
  open: boolean;
  category: Category | null;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

export default function DeleteCategoryModal({
  open,
  category,
  onClose,
  onConfirm,
}: DeleteCategoryModalProps) {
  if (!open || !category) return null;

  const handleDelete = async () => {
    try {
      await onConfirm();
    } catch (error) {
      console.error(error);
      alert("Failed to delete category.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

        <h2 className="text-2xl font-bold text-red-600">
          Delete Category
        </h2>

        <p className="mt-4 text-slate-600">
          Are you sure you want to delete
          <span className="font-semibold">
            {" "}
            "{category.name}"
          </span>
          ?
        </p>

        <div className="mt-8 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded-xl border px-5 py-2 hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            className="rounded-xl bg-red-600 px-5 py-2 text-white hover:bg-red-700"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}