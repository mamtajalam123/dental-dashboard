"use client";

import Link from "next/link";
import { useParams, useRouter, notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { contactData } from "@/data/contact";
import ReplyForm from "@/app/components/contact/ReplyForm";

export default function ReplyContactPage() {
  const params = useParams();
  const router = useRouter();

  const id = Number(params.id);

  const contact = contactData.find(
    (item) => item.id === id
  );

  if (!contact) {
    notFound();
  }

  const handleReply = (
    reply: string,
    file?: File
  ) => {
    console.log("Reply:", reply);
    console.log("Attachment:", file);

    // TODO:
    // Send reply API
    //
    // const formData = new FormData();
    // formData.append("reply", reply);
    // if (file) {
    //   formData.append("attachment", file);
    // }
    //
    // await axios.post(
    //   `/api/contact/${id}/reply`,
    //   formData
    // );

    router.push("/dashboard/contact");
  };

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

        <div>

          <h1 className="text-3xl font-bold text-slate-800">
            Reply to Message
          </h1>

          <p className="mt-2 text-slate-500">
            Send a reply to the patient's inquiry.
          </p>

        </div>

        <Link
          href="/dashboard/contact"
          className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            border
            border-slate-300
            px-5
            py-3
            font-medium
            text-slate-700
            transition
            hover:bg-slate-100
          "
        >
          <ArrowLeft size={18} />
          Back
        </Link>

      </div>

      {/* Reply Form */}

      <ReplyForm
        contact={contact}
        onSubmit={handleReply}
      />

    </div>
  );
}