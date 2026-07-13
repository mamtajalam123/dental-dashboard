"use client";

import Link from "next/link";
import { Eye, Reply, ArchiveRestore, Trash2 } from "lucide-react";

type ContactActionsProps = {
  id: number;
  status: "New" | "Read" | "Replied" | "Archived";
  onArchive: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function ContactActions({
  id,
  status,
  onArchive,
  onDelete,
}: ContactActionsProps) {
  return (
    <div className="flex items-center justify-center gap-2">

      {/* View */}

      <Link
        href={`/dashboard/contact/view/${id}`}
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

      {/* Reply */}

      <Link
        href={`/dashboard/contact/reply/${id}`}
        className="
          rounded-lg
          p-2
          text-slate-600
          transition
          hover:bg-emerald-50
          hover:text-emerald-600
        "
        title="Reply"
      >
        <Reply size={18} />
      </Link>

      {/* Archive / Restore */}

      <button
        type="button"
        onClick={() => onArchive(id)}
        className="
          rounded-lg
          p-2
          text-slate-600
          transition
          hover:bg-amber-50
          hover:text-amber-600
        "
        title={
          status === "Archived"
            ? "Restore"
            : "Archive"
        }
      >
        <ArchiveRestore size={18} />
      </button>

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