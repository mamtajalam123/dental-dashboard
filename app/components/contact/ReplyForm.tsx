"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { Send, X, Paperclip } from "lucide-react";

import { ContactItem } from "@/types/contact";

type ReplyFormProps = {
  contact: ContactItem;
  onSubmit: (reply: string, file?: File) => void;
};

export default function ReplyForm({
  contact,
  onSubmit,
}: ReplyFormProps) {
  const [reply, setReply] = useState("");
  const [attachment, setAttachment] =
    useState<File | undefined>();

  const handleFile = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setAttachment(file);
  };

  const removeAttachment = () => {
    setAttachment(undefined);
  };

  const handleSubmit = (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!reply.trim()) return;

    onSubmit(reply, attachment);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >

      {/* Patient Details */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <h2 className="mb-6 text-xl font-bold text-slate-800">
          Patient Details
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Patient Name
            </label>

            <input
              value={contact.patientName}
              readOnly
              className="h-11 w-full rounded-xl border border-slate-300 bg-slate-100 px-4"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Email
            </label>

            <input
              value={contact.email}
              readOnly
              className="h-11 w-full rounded-xl border border-slate-300 bg-slate-100 px-4"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Phone
            </label>

            <input
              value={contact.phone}
              readOnly
              className="h-11 w-full rounded-xl border border-slate-300 bg-slate-100 px-4"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Subject
            </label>

            <input
              value={contact.subject}
              readOnly
              className="h-11 w-full rounded-xl border border-slate-300 bg-slate-100 px-4"
            />
          </div>

        </div>

      </div>

      {/* Original Message */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <h2 className="mb-4 text-xl font-bold text-slate-800">
          Original Message
        </h2>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 leading-7 text-slate-600">
          {contact.message}
        </div>

      </div>

      {/* Reply */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Reply Message
        </label>

        <textarea
          rows={8}
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          placeholder="Write your reply..."
          required
          className="w-full rounded-xl border border-slate-300 p-4 outline-none transition focus:border-blue-500"
        />

      </div>

      {/* Attachment */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <label className="mb-4 block text-sm font-semibold text-slate-700">
          Attachment (Optional)
        </label>

        {attachment ? (

          <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-4">

            <div className="flex items-center gap-3">

              <Paperclip
                size={20}
                className="text-blue-600"
              />

              <span className="text-sm font-medium text-slate-700">
                {attachment.name}
              </span>

            </div>

            <button
              type="button"
              onClick={removeAttachment}
              className="rounded-full bg-red-100 p-2 text-red-600 hover:bg-red-200"
            >
              <X size={16} />
            </button>

          </div>

        ) : (

          <label
            htmlFor="attachment"
            className="flex h-28 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-slate-300 hover:border-blue-500"
          >
            <div className="text-center">

              <Paperclip
                size={28}
                className="mx-auto mb-2 text-slate-400"
              />

              <p className="text-sm text-slate-500">
                Click to upload attachment
              </p>

            </div>

            <input
              id="attachment"
              type="file"
              onChange={handleFile}
              className="hidden"
            />

          </label>

        )}

      </div>

      {/* Buttons */}

      <div className="flex flex-col justify-end gap-4 sm:flex-row">

        <button
          type="button"
          onClick={() => history.back()}
          className="rounded-xl border border-slate-300 px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          <Send size={18} />

          Send Reply
        </button>

      </div>

    </form>
  );
}