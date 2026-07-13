"use client";

import Link from "next/link";
import {
  Eye,
  Trash2,
  MessageSquareReply,
  CalendarDays,
  Mail,
  Phone,
  FileText,
} from "lucide-react";

import ContactStatus from "./ContactStatus";

interface ContactCardProps {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  date: string;
  status: "New" | "Read" | "Replied" | "Archived";
}

export default function ContactCard({
  id,
  name,
  email,
  phone,
  subject,
  date,
  status,
}: ContactCardProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">

      {/* Header */}

      <div className="flex items-center justify-between border-b border-slate-200 p-5">

        <div>

          <h3 className="text-lg font-semibold text-slate-800">
            {name}
          </h3>

          <p className="text-sm text-slate-500">
            Patient Inquiry
          </p>

        </div>

        <ContactStatus status={status} />

      </div>

      {/* Details */}

      <div className="space-y-4 p-5">

        <div className="flex items-center gap-3 text-slate-600">

          <Mail
            size={18}
            className="text-blue-600"
          />

          <span className="break-all">
            {email}
          </span>

        </div>

        <div className="flex items-center gap-3 text-slate-600">

          <Phone
            size={18}
            className="text-blue-600"
          />

          <span>{phone}</span>

        </div>

        <div className="flex items-center gap-3 text-slate-600">

          <FileText
            size={18}
            className="text-blue-600"
          />

          <span>{subject}</span>

        </div>

        <div className="flex items-center gap-3 text-slate-600">

          <CalendarDays
            size={18}
            className="text-blue-600"
          />

          <span>{date}</span>

        </div>

      </div>

      {/* Footer */}

      <div className="flex items-center justify-between border-t border-slate-200 p-5">

        <Link
          href={`/contact/${id}`}
          className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 transition hover:bg-slate-100"
        >
          <Eye size={18} />
          View
        </Link>

        <div className="flex gap-2">

          <button className="rounded-lg border border-slate-200 p-2 transition hover:bg-blue-50">
            <MessageSquareReply
              size={18}
              className="text-blue-600"
            />
          </button>

          <button className="rounded-lg border border-slate-200 p-2 transition hover:bg-red-50">
            <Trash2
              size={18}
              className="text-red-600"
            />
          </button>

        </div>

      </div>

    </div>
  );
}