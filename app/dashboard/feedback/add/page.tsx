"use client";

import { useRouter } from "next/navigation";


import { Feedback } from "@/types/feedback";
import FeedbackForm from "@/app/components/feedback/FeedbackForm";

export default function AddFeedbackPage() {
  const router = useRouter();

  const handleSubmit = (data: Feedback) => {
    console.log("New Feedback:", data);

    // TODO:
    // POST /api/feedback

    router.push("/dashboard/feedback");
  };

  return (
    <div className="space-y-6">

      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Add Feedback
        </h1>

        <p className="mt-2 text-slate-500">
          Create a new patient feedback.
        </p>
      </div>

      {/* Form */}

      <FeedbackForm onSubmit={handleSubmit} />

    </div>
  );
}