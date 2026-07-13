"use client";

import Link from "next/link";
import { Eye, Pencil, Trash2 } from "lucide-react";

type GalleryActionsProps = {
  id: number;
  onDelete: (id: number) => void;
};

export default function GalleryActions({
  id,
  onDelete,
}: GalleryActionsProps) {
  return (
    <div className="flex items-center justify-center gap-2">

      {/* View */}

      <Link
        href={`/dashboard/gallery/view/${id}`}
        className="
          rounded-lg
          p-2
          text-slate-600
          transition
          hover:bg-blue-50
          hover:text-blue-600
        "
        title="View"
      >
        <Eye size={18} />
      </Link>

      {/* Edit */}

      <Link
        href={`/dashboard/gallery/edit/${id}`}
        className="
          rounded-lg
          p-2
          text-slate-600
          transition
          hover:bg-emerald-50
          hover:text-emerald-600
        "
        title="Edit"
      >
        <Pencil size={18} />
      </Link>

      {/* Delete */}

      <button
        type="button"
        onClick={() => onDelete(id)}
        className="
          rounded-lg
          p-2
          text-slate-600
          transition
          hover:bg-red-50
          hover:text-red-600
        "
        title="Delete"
      >
        <Trash2 size={18} />
      </button>

    </div>
  );
}