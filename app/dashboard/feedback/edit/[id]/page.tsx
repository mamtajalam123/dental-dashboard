"use client";

import { useParams, useRouter } from "next/navigation";

import { feedbackData } from "@/data/feedback";
import { Feedback } from "@/types/feedback";
import { notFound } from "next/navigation";
import FeedbackForm from "@/app/components/feedback/FeedbackForm";

export default function EditFeedbackPage() {
  const params = useParams();
  const router = useRouter();

  const id = Number(params.id);

  const feedback = feedbackData.find(
    (item) => item.id === id
  );

  if (!feedback) {
    notFound();
  }

  const handleSubmit = (data: Feedback) => {
    console.log(data);

    // TODO:
    // PUT API

    router.push("/dashboard/feedback");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Edit Feedback
        </h1>

        <p className="text-slate-500">
          Update patient feedback.
        </p>
      </div>

      <FeedbackForm
        initialData={feedback}
        onSubmit={handleSubmit}
      />
    </div>
  );
}