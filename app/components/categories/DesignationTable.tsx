"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";

import AddDesignationModal from "./AddDesignationModal";
import EditDesignationModal from "./EditDesignationModal";
import DeleteDesignationModal from "./DeleteDesignationModal";

import { designationAPI } from "@/app/services/designation.api";
import { Designation } from "@/types/designation";

export default function DesignationTable() {
  const [designations, setDesignations] =
    useState<Designation[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [openAdd, setOpenAdd] =
    useState(false);

  const [editDesignation, setEditDesignation] =
    useState<Designation | null>(null);

  const [deleteDesignation, setDeleteDesignation] =
    useState<Designation | null>(null);

  // ===========================
  // Load Designations
  // ===========================

  const loadDesignations = async () => {
    try {
      setLoading(true);

      const data =
        await designationAPI.getAll();

      setDesignations(data);
    } catch (error) {
      console.error(
        "Load Designations:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDesignations();
  }, []);

  // ===========================
  // Add Designation
  // ===========================

  const addDesignation = async (
    name: string
  ) => {
    try {
      await designationAPI.create({
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
  // Update Designation
  // ===========================

  const updateDesignation = async (
    id: number,
    name: string
  ) => {
    try {
      await designationAPI.update(id, {
        name,
        status: "Active",
      });

      await loadDesignations();

      setEditDesignation(null);
    } catch (error: any) {
      alert(
        error.message ||
          "Failed to update designation."
      );

      console.error(error);
    }
  };

  // ===========================
  // Delete Designation
  // ===========================

  const confirmDelete = async () => {
    if (!deleteDesignation) return;

    try {
      await designationAPI.delete(
        deleteDesignation.id
      );

      await loadDesignations();

      setDeleteDesignation(null);
    } catch (error: any) {
      alert(
        error.message ||
          "Failed to delete designation."
      );

      console.error(error);
    }
  };

  // ===========================
  // Loading
  // ===========================

  if (loading) {
    return (
      <div className="rounded-2xl border bg-white p-10 text-center">
        Loading Designations...
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
            Team Designations
          </h2>

          <p className="text-sm text-slate-500">
            Manage team roles and positions.
          </p>
        </div>

        <button
          onClick={() =>
            setOpenAdd(true)
          }
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Designation
        </button>

      </div>

      {/* Table */}

      <div className="overflow-hidden rounded-xl border">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="px-5 py-3 text-left">
                Designation
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

            {designations.length === 0 ? (

              <tr>

                <td
                  colSpan={3}
                  className="py-8 text-center text-slate-500"
                >
                  No Designations Found
                </td>

              </tr>

            ) : (

              designations.map((item) => (

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
                        item.status ===
                        "Active"
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
                          setEditDesignation(
                            item
                          )
                        }
                        className="rounded-lg p-2 text-blue-600 hover:bg-blue-50"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() =>
                          setDeleteDesignation(
                            item
                          )
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

      <AddDesignationModal
        open={openAdd}
        onClose={() =>
          setOpenAdd(false)
        }
        onAdd={addDesignation}
      />

      {/* Edit Modal */}

      <EditDesignationModal
        open={!!editDesignation}
        designation={editDesignation}
        onClose={() =>
          setEditDesignation(null)
        }
        onUpdate={updateDesignation}
      />

      {/* Delete Modal */}

      <DeleteDesignationModal
        open={!!deleteDesignation}
        designation={deleteDesignation}
        onClose={() =>
          setDeleteDesignation(null)
        }
        onConfirm={confirmDelete}
      />

    </div>
  );
}