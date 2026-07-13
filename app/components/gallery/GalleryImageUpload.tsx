"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ImagePlus, Trash2 } from "lucide-react";

interface GalleryImageUploadProps {
  onImagesChange?: (files: File[]) => void;
}

interface PreviewImage {
  id: string;
  file: File;
  preview: string;
}

export default function GalleryImageUpload({
  onImagesChange,
}: GalleryImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [images, setImages] = useState<PreviewImage[]>([]);

  const handleSelect = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(e.target.files || []);

    if (!files.length) return;

    const newImages = files.map((file) => ({
      id: crypto.randomUUID(),
      file,
      preview: URL.createObjectURL(file),
    }));

    const updatedImages = [...images, ...newImages];

    setImages(updatedImages);

    onImagesChange?.(
      updatedImages.map((item) => item.file)
    );
  };

  const removeImage = (id: string) => {
    const updated = images.filter(
      (item) => item.id !== id
    );

    setImages(updated);

    onImagesChange?.(
      updated.map((item) => item.file)
    );
  };

  return (
    <div className="space-y-6">

      <label className="block text-sm font-medium text-slate-700">
        Gallery Images
      </label>

      {/* Upload Area */}

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="flex h-56 w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 transition hover:border-blue-500 hover:bg-blue-50"
      >
        <ImagePlus
          size={42}
          className="text-slate-400"
        />

        <p className="mt-4 text-lg font-semibold">
          Upload Images
        </p>

        <p className="mt-1 text-sm text-slate-500">
          JPG, PNG, WEBP
        </p>

        <p className="mt-1 text-xs text-slate-400">
          You can select multiple images.
        </p>

      </button>

      <input
        ref={inputRef}
        type="file"
        hidden
        multiple
        accept="image/*"
        onChange={handleSelect}
      />

      {/* Preview */}

      {images.length > 0 && (

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {images.map((item) => (

            <div
              key={item.id}
              className="relative overflow-hidden rounded-2xl border bg-white shadow-sm"
            >

              <Image
                src={item.preview}
                alt="Preview"
                width={400}
                height={300}
                className="h-52 w-full object-cover"
              />

              <button
                type="button"
                onClick={() => removeImage(item.id)}
                className="absolute right-3 top-3 rounded-full bg-red-600 p-2 text-white transition hover:bg-red-700"
              >
                <Trash2 size={18} />
              </button>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}