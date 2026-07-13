
import Link from "next/link";
import { Plus } from "lucide-react";
import FeedbackTable from "@/app/components/feedback/FeedbackTable";

export default function FeedbackPage() {
  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Feedback
          </h1>

          <p className="mt-1 text-slate-500">
            Manage all patient feedback and reviews.
          </p>
        </div>

        <Link
          href="/dashboard/feedback/add"
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Feedback
        </Link>

      </div>

      {/* Table */}

      <FeedbackTable />

    </div>
  );
}