"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import Image from "next/image";
import { Save, Upload, X } from "lucide-react";

import { GalleryItem } from "@/types/gallery";

type GalleryFormProps = {
  initialData?: GalleryItem;
  onSubmit: (data: GalleryItem) => void;
};

export default function GalleryForm({
  initialData,
  onSubmit,
}: GalleryFormProps) {
  const [form, setForm] = useState<GalleryItem>(
    initialData ?? {
      id: Date.now(),
      title: "",
      image: "",
      category: "Clinic",
      status: "Active",
      description: "",
      createdAt: new Date().toLocaleDateString(),
    }
  );

  const [preview, setPreview] = useState(
    initialData?.image ?? ""
  );

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
      [name]: value,
    }));
  };

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const url = URL.createObjectURL(file);

    setPreview(url);

    setForm((prev) => ({
      ...prev,
      image: url,
    }));
  };

  const removeImage = () => {
    setPreview("");

    setForm((prev) => ({
      ...prev,
      image: "",
    }));
  };

  const handleSubmit = (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8"
    >
            {/* Image Upload */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <label className="mb-4 block text-sm font-semibold text-slate-700">
          Gallery Image
        </label>

        {preview ? (
          <div className="relative overflow-hidden rounded-2xl border border-slate-200">

            <Image
              src={preview}
              alt="Preview"
              width={1200}
              height={700}
              className="h-72 w-full object-cover"
            />

            <button
              type="button"
              onClick={removeImage}
              className="absolute right-4 top-4 rounded-full bg-red-600 p-2 text-white hover:bg-red-700"
            >
              <X size={18} />
            </button>

          </div>
        ) : (
          <label
            htmlFor="gallery-image"
            className="flex h-72 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 transition hover:border-blue-500"
          >
            <Upload
              size={40}
              className="mb-4 text-slate-400"
            />

            <p className="text-lg font-semibold text-slate-700">
              Upload Gallery Image
            </p>

            <p className="mt-2 text-sm text-slate-500">
              JPG, PNG or WEBP
            </p>

            <input
              id="gallery-image"
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="hidden"
            />
          </label>
        )}

      </div>

      {/* Gallery Information */}

      <div className="grid gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-2">

        {/* Title */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Gallery Title
          </label>

          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter title"
            required
            className="h-11 w-full rounded-xl border border-slate-300 px-4 outline-none transition focus:border-blue-500"
          />
        </div>

        {/* Category */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Category
          </label>

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="h-11 w-full rounded-xl border border-slate-300 bg-white px-4 outline-none transition focus:border-blue-500"
          >
            <option value="Clinic">Clinic</option>
            <option value="Treatment">Treatment</option>
            <option value="Equipment">Equipment</option>
            <option value="Before & After">
              Before & After
            </option>
          </select>
        </div>

        {/* Status */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Status
          </label>

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="h-11 w-full rounded-xl border border-slate-300 bg-white px-4 outline-none transition focus:border-blue-500"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* Created Date */}

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Created Date
          </label>

          <input
            type="text"
            value={form.createdAt}
            readOnly
            className="h-11 w-full rounded-xl border border-slate-300 bg-slate-100 px-4"
          />
        </div>

      </div>

      {/* Description */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Description
        </label>

        <textarea
          name="description"
          rows={6}
          value={form.description}
          onChange={handleChange}
          placeholder="Write gallery description..."
          required
          className="w-full rounded-xl border border-slate-300 p-4 outline-none transition focus:border-blue-500"
        />

      </div>
            {/* Action Buttons */}

      <div className="flex flex-col justify-end gap-4 sm:flex-row">

        <button
          type="button"
          onClick={() => history.back()}
          className="
            inline-flex
            items-center
            justify-center
            rounded-xl
            border
            border-slate-300
            px-6
            py-3
            font-medium
            text-slate-700
            transition
            hover:bg-slate-100
          "
        >
          Cancel
        </button>

        <button
          type="submit"
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-blue-600
            px-6
            py-3
            font-medium
            text-white
            transition
            hover:bg-blue-700
          "
        >
          <Save size={18} />

          {initialData ? "Update Gallery" : "Save Gallery"}
        </button>

      </div>

    </form>
  );
}