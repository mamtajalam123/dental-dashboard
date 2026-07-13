"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import { Upload, Save, X } from "lucide-react";

import { Feedback } from "@/types/feedback";

type FeedbackFormProps = {
  initialData?: Feedback;
  onSubmit: (data: Feedback) => void;
};

export default function FeedbackForm({
  initialData,
  onSubmit,
}: FeedbackFormProps) {
  const [form, setForm] = useState<Feedback>({
    id: initialData?.id ?? Date.now(),
    patientName: initialData?.patientName ?? "",
    patientImage: initialData?.patientImage ?? "",
    treatment: initialData?.treatment ?? "",
    rating: initialData?.rating ?? 5,
    review: initialData?.review ?? "",
    status: initialData?.status ?? "Pending",
    date:
      initialData?.date ??
      new Date().toLocaleDateString(),
  });

 const handleChange = (
  e: ChangeEvent<
    HTMLInputElement |
    HTMLTextAreaElement |
    HTMLSelectElement
  >
) => {
  const { name, value } = e.target;

  setForm((prev) => ({
    ...prev,
    [name]: name === "rating" ? Number(value) : value,
  }));
};

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setForm((prev) => ({
        ...prev,
        patientImage: reader.result as string,
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl bg-white p-6 shadow"
    >
            {/* Patient Information */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

        {/* Patient Name */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Patient Name
          </label>

          <input
            type="text"
            name="patientName"
            value={form.patientName}
            onChange={handleChange}
            placeholder="Enter patient name"
            required
            className="h-11 w-full rounded-xl border border-slate-300 px-4 outline-none transition focus:border-blue-500"
          />
        </div>

        {/* Treatment */}
<div>
  <label className="mb-2 block text-sm font-semibold text-slate-700">
    Treatment
  </label>

  <select
    name="treatment"
    value={form.treatment}
    onChange={handleChange}
    required
    className="h-11 w-full rounded-xl border border-slate-300 bg-white px-4 outline-none transition focus:border-blue-500"
  >
    <option value="">Select Treatment</option>

    <option value="Dental Implant">Dental Implant</option>
    <option value="Root Canal Treatment">
      Root Canal Treatment
    </option>
    <option value="Teeth Whitening">
      Teeth Whitening
    </option>
    <option value="Dental Braces">
      Dental Braces
    </option>
    <option value="Dental Crown">
      Dental Crown
    </option>
    <option value="Dental Bridge">
      Dental Bridge
    </option>
    <option value="Tooth Extraction">
      Tooth Extraction
    </option>
    <option value="Dental Filling">
      Dental Filling
    </option>
    <option value="Scaling & Polishing">
      Scaling & Polishing
    </option>
    <option value="Smile Makeover">
      Smile Makeover
    </option>
    <option value="Veneers">
      Veneers
    </option>
    <option value="Dentures">
      Dentures
    </option>
    <option value="Wisdom Tooth Removal">
      Wisdom Tooth Removal
    </option>
    <option value="Pediatric Dentistry">
      Pediatric Dentistry
    </option>
    <option value="Orthodontics">
      Orthodontics
    </option>
  </select>
</div>

      </div>

      {/* Rating & Status */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Rating
          </label>

          <select
            name="rating"
            value={form.rating}
            onChange={handleChange}
            className="h-11 w-full rounded-xl border border-slate-300 px-4 outline-none focus:border-blue-500"
          >
            <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
            <option value={4}>⭐⭐⭐⭐ (4)</option>
            <option value={3}>⭐⭐⭐ (3)</option>
            <option value={2}>⭐⭐ (2)</option>
            <option value={1}>⭐ (1)</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Status
          </label>

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="h-11 w-full rounded-xl border border-slate-300 px-4 outline-none focus:border-blue-500"
          >
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

      </div>

      {/* Review */}

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Review
        </label>

        <textarea
          rows={5}
          name="review"
          value={form.review}
          onChange={handleChange}
          placeholder="Write patient feedback..."
          required
          className="w-full rounded-xl border border-slate-300 p-4 outline-none transition focus:border-blue-500"
        />
      </div>

      {/* Image Upload */}

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Patient Image
        </label>

        <div className="flex flex-col gap-5 md:flex-row md:items-center">

          <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-xl border border-dashed border-slate-300 bg-slate-50">

            {form.patientImage ? (
              <Image
                src={form.patientImage}
                alt="Patient"
                width={128}
                height={128}
                className="h-full w-full object-cover"
              />
            ) : (
              <Upload
                size={36}
                className="text-slate-400"
              />
            )}

          </div>

          <div className="flex-1">

            <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700">

              <Upload size={18} />

              Upload Image

              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImage}
              />

            </label>

            <p className="mt-3 text-sm text-slate-500">
              JPG, PNG or WEBP
            </p>

          </div>

        </div>
      </div>
            {/* Date */}

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Date
        </label>

        <input
          type="text"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="h-11 w-full rounded-xl border border-slate-300 px-4 outline-none transition focus:border-blue-500"
        />
      </div>

      {/* Action Buttons */}

      <div className="flex flex-col justify-end gap-3 border-t border-slate-200 pt-6 sm:flex-row">

        <button
          type="button"
          onClick={() => window.history.back()}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
        >
          <X size={18} />
          Cancel
        </button>

        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          <Save size={18} />
          {initialData ? "Update Feedback" : "Save Feedback"}
        </button>

      </div>

    </form>
  );
}