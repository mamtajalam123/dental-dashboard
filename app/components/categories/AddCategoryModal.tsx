"use client";

import { useEffect, useState } from "react";

interface AddCategoryModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (name: string) => Promise<void>;
}

export default function AddCategoryModal({
  open,
  onClose,
  onAdd,
}: AddCategoryModalProps) {
  const [name, setName] = useState("");

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    if (open) {
      setName("");
    }
  }, [open]);

  if (!open) return null;

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Category name is required.");
      return;
    }

    try {
      setLoading(true);

      await onAdd(name.trim());

      setName("");

      onClose();
    } catch (error: any) {
      console.error(error);

      alert(
        error?.message ||
          "Failed to add category."
      );
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
        <h2
          className="
            mb-6
            text-2xl
            font-bold
          "
        >
          Add Category
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label
              className="
                mb-2
                block
                text-sm
                font-medium
              "
            >
              Category Name
            </label>

            <input
              type="text"
              placeholder="Enter category name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              disabled={loading}
              className="
                w-full
                rounded-xl
                border
                px-4
                py-3
                outline-none
                focus:border-blue-500
                disabled:bg-gray-100
              "
            />
          </div>

          <div
            className="
              flex
              justify-end
              gap-3
            "
          >
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="
                rounded-xl
                border
                px-5
                py-2
                hover:bg-gray-100
                disabled:opacity-60
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="
                rounded-xl
                bg-blue-600
                px-5
                py-2
                text-white
                hover:bg-blue-700
                disabled:opacity-60
              "
            >
              {loading
                ? "Saving..."
                : "Add Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}