"use client";

import Link from "next/link";
import {
  useParams,
  notFound,
} from "next/navigation";
import {
  ArrowLeft,
  Reply,
  CalendarDays,
  Mail,
  Phone,
  User,
  MessageSquare,
} from "lucide-react";

import { contactData } from "@/data/contact";
import ContactStatus from "@/app/components/contact/ContactStatus";

export default function ViewContactPage() {
  const params = useParams();

  const id = Number(params.id);

  const contact = contactData.find(
    (item) => item.id === id
  );

  if (!contact) {
    notFound();
  }

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

        <div>

          <h1 className="text-3xl font-bold text-slate-800">
            Contact Message
          </h1>

          <p className="mt-2 text-slate-500">
            View complete patient inquiry.
          </p>

        </div>

        <div className="flex gap-3">

          <Link
            href="/dashboard/contact"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
          >
            <ArrowLeft size={18} />
            Back
          </Link>

          <Link
            href={`/dashboard/contact/reply/${contact.id}`}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            <Reply size={18} />
            Reply
          </Link>

        </div>

      </div>

      {/* Details */}

      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

        <div className="grid gap-8 lg:grid-cols-2">

          {/* Left */}

          <div className="space-y-6">

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">
                <User
                  size={28}
                  className="text-blue-600"
                />
              </div>

              <div>

                <h2 className="text-2xl font-bold text-slate-800">
                  {contact.patientName}
                </h2>

                <ContactStatus
                  status={contact.status}
                />

              </div>

            </div>

            <div className="rounded-xl border border-slate-200">

              <div className="flex items-center gap-3 border-b border-slate-200 p-5">

                <Mail
                  size={20}
                  className="text-blue-600"
                />

                <div>

                  <p className="text-sm text-slate-500">
                    Email
                  </p>

                  <p className="font-medium text-slate-700">
                    {contact.email}
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-3 p-5">

                <Phone
                  size={20}
                  className="text-blue-600"
                />

                <div>

                  <p className="text-sm text-slate-500">
                    Phone
                  </p>

                  <p className="font-medium text-slate-700">
                    {contact.phone}
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* Right */}

          <div className="space-y-6">

            <div className="rounded-xl border border-slate-200 p-5">

              <div className="mb-5 flex items-center gap-3">

                <MessageSquare
                  size={20}
                  className="text-blue-600"
                />

                <div>

                  <p className="text-sm text-slate-500">
                    Subject
                  </p>

                  <h3 className="font-semibold text-slate-800">
                    {contact.subject}
                  </h3>

                </div>

              </div>

              <div className="flex items-center gap-3">

                <CalendarDays
                  size={20}
                  className="text-blue-600"
                />

                <div>

                  <p className="text-sm text-slate-500">
                    Date
                  </p>

                  <p className="font-medium text-slate-700">
                    {contact.date}
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Message */}

        <div className="mt-8">

          <h3 className="mb-4 text-xl font-bold text-slate-800">
            Message
          </h3>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 leading-8 text-slate-700">
            {contact.message}
          </div>

        </div>

      </div>

    </div>
  );
}