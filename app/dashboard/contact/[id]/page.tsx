import Link from "next/link";
import {
  ArrowLeft,
  Archive,
  Trash2,
  Reply,
} from "lucide-react";
import MessageDetails from "@/app/components/contact/MessageDetails";



interface ContactDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ContactDetailsPage({
  params,
}: ContactDetailsPageProps) {
  const { id } = await params;

  // Temporary Data
  const message = {
    id,
    name: "Rahul Sharma",
    email: "rahul@gmail.com",
    phone: "+91 9876543210",
    subject: "Dental Implant Consultation",
    date: "12 Jul 2026",
    status: "New" as const,
    message:
      "Hello Doctor, I would like to know more about dental implants, the total treatment duration, cost, and available appointment slots for next week. Please contact me as soon as possible.",
  };

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div className="flex items-center gap-4">

          <Link
            href="/contact"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 transition hover:bg-slate-100"
          >
            <ArrowLeft size={20} />
          </Link>

          <div>

            <h1 className="text-3xl font-bold text-slate-900">
              Contact Message
            </h1>

            <p className="text-slate-500">
              View patient inquiry details
            </p>

          </div>

        </div>

        {/* Actions */}

        <div className="flex flex-wrap gap-3">

          <button className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700">
            <Reply size={18} />
            Reply
          </button>

          <button className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-3 font-medium text-white transition hover:bg-amber-600">
            <Archive size={18} />
            Archive
          </button>

          <button className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-medium text-white transition hover:bg-red-700">
            <Trash2 size={18} />
            Delete
          </button>

        </div>

      </div>

      {/* Message Details */}

      <MessageDetails
        name={message.name}
        email={message.email}
        phone={message.phone}
        subject={message.subject}
        message={message.message}
        date={message.date}
        status={message.status}
      />

    </div>
  );
}