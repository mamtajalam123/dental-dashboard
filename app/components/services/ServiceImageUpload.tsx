"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ImagePlus, X } from "lucide-react";

interface ServiceImageUploadProps {
  onImageChange?: (file: File | null) => void;
}

export default function ServiceImageUpload({
  onImageChange,
}: ServiceImageUploadProps) {
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
        Service Image
      </label>

      {!preview ? (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex h-56 w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 transition hover:border-blue-500 hover:bg-blue-50"
        >
          <ImagePlus
            size={40}
            className="text-slate-400"
          />

          <p className="mt-3 font-medium text-slate-700">
            Upload Service Image
          </p>

          <span className="mt-1 text-sm text-slate-500">
            PNG, JPG or WEBP
          </span>
        </button>
      ) : (
        <div className="relative overflow-hidden rounded-2xl border">

          <Image
            src={preview}
            alt="Preview"
            width={800}
            height={500}
            className="h-64 w-full object-cover"
          />

          <button
            type="button"
            onClick={removeImage}
            className="absolute right-3 top-3 rounded-full bg-red-600 p-2 text-white hover:bg-red-700"
          >
            <X size={18} />
          </button>

        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={handleSelect}
      />

    </div>
  );
}