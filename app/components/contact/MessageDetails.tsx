"use client";

import {
  CalendarDays,
  Mail,
  Phone,
  User,
  FileText,
} from "lucide-react";

import ContactStatus from "./ContactStatus";

interface MessageDetailsProps {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  status: "New" | "Read" | "Replied" | "Archived";
}

export default function MessageDetails({
  name,
  email,
  phone,
  subject,
  message,
  date,
  status,
}: MessageDetailsProps) {
  return (
    <div className="space-y-6">

      {/* Patient Information */}

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-200 p-6">

          <h2 className="text-xl font-semibold text-slate-800">
            Patient Information
          </h2>

        </div>

        <div className="grid gap-6 p-6 md:grid-cols-2">

          <InfoRow
            icon={<User size={18} />}
            label="Patient Name"
            value={name}
          />

          <InfoRow
            icon={<Mail size={18} />}
            label="Email"
            value={email}
          />

          <InfoRow
            icon={<Phone size={18} />}
            label="Phone"
            value={phone}
          />

          <InfoRow
            icon={<CalendarDays size={18} />}
            label="Date"
            value={date}
          />

          <InfoRow
            icon={<FileText size={18} />}
            label="Subject"
            value={subject}
          />

          <div>

            <p className="mb-2 text-sm text-slate-500">
              Status
            </p>

            <ContactStatus status={status} />

          </div>

        </div>

      </div>

      {/* Message */}

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-200 p-6">

          <h2 className="text-xl font-semibold text-slate-800">
            Patient Message
          </h2>

        </div>

        <div className="p-6">

          <div className="rounded-xl bg-slate-50 p-5 leading-8 text-slate-700">

            {message}

          </div>

        </div>

      </div>

      {/* Reply History */}

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-200 p-6">

          <h2 className="text-xl font-semibold text-slate-800">
            Reply History
          </h2>

        </div>

        <div className="p-6">

          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">

            <p className="text-slate-500">
              No replies yet.
            </p>

            <p className="mt-2 text-sm text-slate-400">
              Replies sent to the patient will appear here.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

interface InfoRowProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function InfoRow({
  icon,
  label,
  value,
}: InfoRowProps) {
  return (
    <div className="flex items-start gap-3">

      <div className="mt-1 text-blue-600">
        {icon}
      </div>

      <div>

        <p className="text-sm text-slate-500">
          {label}
        </p>

        <p className="font-medium text-slate-800">
          {value}
        </p>

      </div>

    </div>
  );
}