"use client";

import Link from "next/link";
import {
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

import StatusBadge from "./StatusBadge";
import { Service } from "@/app/types/service";


type ServiceRowProps = {
  service: Service;
  onDelete: (service: Service) => void;
};

export default function ServiceRow({
  service,
  onDelete,
}: ServiceRowProps) {
  return (
    <tr className="border-b border-slate-200 hover:bg-slate-50 transition-colors">

      {/* Service */}
      <td className="px-5 py-4 font-medium text-slate-800">
        {service.name}
      </td>

      {/* Category */}
      <td className="px-5 py-4 text-slate-600">
        {service.category}
      </td>

      {/* Duration */}
      <td className="px-5 py-4 text-slate-600">
        {service.duration}
      </td>

      {/* Status */}
      <td className="px-5 py-4">
        <StatusBadge status={service.status} />
      </td>

      {/* Actions */}
      <td className="px-5 py-4">
        <div className="flex items-center gap-2">

          {/* View */}
          <Link
            href={`/dashboard/services/view/${service.id}`}
            className="
              rounded-lg
              bg-blue-50
              p-2
              text-blue-600
              transition
              hover:bg-blue-100
            "
            title="View"
          >
            <Eye size={18} />
          </Link>

          {/* Edit */}
       <Link
  href={`/dashboard/services/edit/${service.id}`}
>
  <Pencil size={18} />
</Link>

          {/* Delete */}
          <button
            onClick={() => onDelete(service)}
            className="
              rounded-lg
              bg-red-50
              p-2
              text-red-600
              transition
              hover:bg-red-100
            "
            title="Delete"
          >
            <Trash2 size={18} />
          </button>

        </div>
      </td>
    </tr>
  );
}