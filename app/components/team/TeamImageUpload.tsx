"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Camera, Trash2 } from "lucide-react";

interface TeamImageUploadProps {
  onImageChange?: (file: File | null) => void;
}

export default function TeamImageUpload({
  onImageChange,
}: TeamImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState<string | null>(null);

  const handleSelect = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setPreview(URL.createObjectURL(file));

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

      <label className="block text-sm font-medium text-slate-700">
        Profile Photo
      </label>

      <div className="flex items-center gap-6">

        {/* Preview */}

        <div className="relative">

          {preview ? (
            <Image
              src={preview}
              alt="Profile Preview"
              width={140}
              height={140}
              className="h-36 w-36 rounded-full border object-cover"
            />
          ) : (
            <div className="flex h-36 w-36 items-center justify-center rounded-full border-2 border-dashed border-slate-300 bg-slate-50">
              <Camera
                size={36}
                className="text-slate-400"
              />
            </div>
          )}

        </div>

        {/* Buttons */}

        <div className="space-y-3">

          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="rounded-xl bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
          >
            Upload Photo
          </button>

          {preview && (
            <button
              type="button"
              onClick={removeImage}
              className="flex items-center gap-2 rounded-xl border border-red-200 px-5 py-2.5 font-medium text-red-600 transition hover:bg-red-50"
            >
              <Trash2 size={18} />
              Remove
            </button>
          )}

          <p className="text-sm text-slate-500">
            JPG, PNG or WEBP
            <br />
            Recommended: 500 × 500 px
          </p>

        </div>

      </div>

      <input
        ref={inputRef}
        type="file"
        hidden
        accept="image/*"
        onChange={handleSelect}
      />

    </div>
  );
}