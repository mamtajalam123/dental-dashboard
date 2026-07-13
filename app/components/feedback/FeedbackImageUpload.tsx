"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { UploadCloud, Trash2, User } from "lucide-react";

interface FeedbackImageUploadProps {
  onImageChange?: (file: File | null) => void;
}

export default function FeedbackImageUpload({
  onImageChange,
}: FeedbackImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState<string | null>(null);

  const handleSelect = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const image = URL.createObjectURL(file);

    setPreview(image);

    onImageChange?.(file);
  };

  const removeImage = () => {
    setPreview(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }

    onImageChange?.(null);
  };

  return (
    <div className="space-y-4">

      <label className="block text-sm font-semibold text-slate-700">
        Patient Photo
      </label>

      <input
        ref={inputRef}
        hidden
        type="file"
        accept="image/*"
        onChange={handleSelect}
      />

      {!preview ? (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex h-72 w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 transition hover:border-blue-500 hover:bg-blue-50"
        >
          <UploadCloud
            size={42}
            className="text-slate-400"
          />

          <p className="mt-4 text-lg font-semibold">
            Upload Patient Photo
          </p>

          <p className="mt-2 text-sm text-slate-500">
            JPG, PNG or WEBP
          </p>
        </button>
      ) : (
        <div className="relative overflow-hidden rounded-2xl border bg-white shadow-sm">

          <Image
            src={preview}
            alt="Patient"
            width={600}
            height={600}
            className="h-72 w-full object-cover"
          />

          <button
            type="button"
            onClick={removeImage}
            className="absolute right-3 top-3 rounded-full bg-red-600 p-2 text-white hover:bg-red-700"
          >
            <Trash2 size={18} />
          </button>

          <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 shadow">

            <User size={16} />

            <span className="text-sm font-medium">
              Patient Photo
            </span>

          </div>

        </div>
      )}

    </div>
  );
}