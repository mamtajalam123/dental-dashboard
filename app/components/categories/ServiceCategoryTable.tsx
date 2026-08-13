"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";

import AddCategoryModal from "./AddCategoryModal";
import EditCategoryModal from "./EditCategoryModal";
import DeleteCategoryModal from "./DeleteCategoryModal";

import { categoryAPI } from "@/app/services/category.api";
import { Category } from "@/types/category";

export default function ServiceCategoryTable() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const [openAdd, setOpenAdd] = useState(false);

  const [editCategory, setEditCategory] =
    useState<Category | null>(null);

  const [deleteCategory, setDeleteCategory] =
    useState<Category | null>(null);

  // ===========================
  // LOAD CATEGORIES
  // ===========================

  const loadCategories = async () => {
    try {
      setLoading(true);

      const data = await categoryAPI.getAll();

      console.log("Categories:", data);

      setCategories(data);
    } catch (error) {
      console.error("Load Categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  // ===========================
  // ADD CATEGORY
  // ===========================

const addCategory = async (name: string) => {
  try {
    await categoryAPI.create({
      name,
      status: "Active",
    });

    await loadCategories();

    setOpenAdd(false);
  } catch (error: any) {
    alert(error.message);
  }
};

  // ===========================
  // UPDATE CATEGORY
  // ===========================

  const updateCategory = async (
    id: number,
    name: string
  ) => {
    try {
      await categoryAPI.update(id, {
        name,
        status: "Active",
      });

      await loadCategories();

      setEditCategory(null);
    } catch (error: any) {
      console.error(error);

      alert(
        error.message ||
          "Failed to update category."
      );
    }
  };

  // ===========================
  // DELETE CATEGORY
  // ===========================

  const confirmDelete = async () => {
    if (!deleteCategory) return;

    try {
      await categoryAPI.delete(deleteCategory.id);

      await loadCategories();

      setDeleteCategory(null);
    } catch (error: any) {
      console.error(error);

      alert(
        error.message ||
          "Failed to delete category."
      );
    }
  };

  // ===========================
  // LOADING
  // ===========================

  if (loading) {
    return (
      <div className="rounded-2xl border bg-white p-10 text-center">
        Loading Categories...
      </div>
    );
  }

  // ===========================
  // UI
  // ===========================

  return (
    <div className="rounded-2xl border bg-white p-6">
      {/* Header */}

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800">
            Service Categories
          </h2>

          <p className="text-sm text-slate-500">
            Manage service categories
          </p>
        </div>

        <button
          onClick={() => setOpenAdd(true)}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Category
        </button>
      </div>

      {/* Table */}

      <div className="overflow-hidden rounded-xl border">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-5 py-3 text-left">
                Category
              </th>

              <th className="px-5 py-3 text-center">
                Status
              </th>

              <th className="px-5 py-3 text-center">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  className="py-8 text-center text-slate-500"
                >
                  No Categories Found
                </td>
              </tr>
            ) : (
              categories.map((item) => (
                <tr
                  key={item.id}
                  className="border-t"
                >
                  <td className="px-5 py-4 font-medium">
                    {item.name}
                  </td>

                  <td className="px-5 py-4 text-center">
                    <span
                      className={`rounded-full px-3 py-1 text-sm ${
                        item.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() =>
                          setEditCategory(item)
                        }
                        className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() =>
                          setDeleteCategory(item)
                        }
                        className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add Modal */}

      <AddCategoryModal
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onAdd={addCategory}
      />

      {/* Edit Modal */}

      <EditCategoryModal
        open={!!editCategory}
        category={editCategory}
        onClose={() => setEditCategory(null)}
        onUpdate={updateCategory}
      />

      {/* Delete Modal */}

      <DeleteCategoryModal
        open={!!deleteCategory}
        category={deleteCategory}
        onClose={() => setDeleteCategory(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}