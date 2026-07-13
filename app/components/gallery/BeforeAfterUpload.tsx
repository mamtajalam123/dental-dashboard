"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Camera, Trash2 } from "lucide-react";

interface BeforeAfterUploadProps {
  onBeforeChange?: (file: File | null) => void;
  onAfterChange?: (file: File | null) => void;
}

export default function BeforeAfterUpload({
  onBeforeChange,
  onAfterChange,
}: BeforeAfterUploadProps) {
  const beforeInputRef = useRef<HTMLInputElement>(null);
  const afterInputRef = useRef<HTMLInputElement>(null);

  const [beforeImage, setBeforeImage] = useState<string | null>(null);
  const [afterImage, setAfterImage] = useState<string | null>(null);

  const handleImageSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "before" | "after"
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const preview = URL.createObjectURL(file);

    if (type === "before") {
      setBeforeImage(preview);
      onBeforeChange?.(file);
    } else {
      setAfterImage(preview);
      onAfterChange?.(file);
    }
  };

  const removeImage = (type: "before" | "after") => {
    if (type === "before") {
      setBeforeImage(null);

      if (beforeInputRef.current) {
        beforeInputRef.current.value = "";
      }

      onBeforeChange?.(null);
    } else {
      setAfterImage(null);

      if (afterInputRef.current) {
        afterInputRef.current.value = "";
      }

      onAfterChange?.(null);
    }
  };

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-semibold">
        Before & After Images
      </h2>

      <div className="grid gap-6 md:grid-cols-2">

        {/* Before */}

        <div>

          <label className="mb-3 block font-medium">
            Before Treatment
          </label>

          <div className="relative">

            {beforeImage ? (
              <>
                <Image
                  src={beforeImage}
                  alt="Before"
                  width={500}
                  height={350}
                  className="h-72 w-full rounded-2xl border object-cover"
                />

                <button
                  type="button"
                  onClick={() => removeImage("before")}
                  className="absolute right-3 top-3 rounded-full bg-red-600 p-2 text-white hover:bg-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => beforeInputRef.current?.click()}
                className="flex h-72 w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 hover:border-blue-500 hover:bg-blue-50"
              >
                <Camera
                  size={40}
                  className="text-slate-400"
                />

                <span className="mt-3 font-medium">
                  Upload Before Image
                </span>
              </button>
            )}

          </div>

        </div>

        {/* After */}

        <div>

          <label className="mb-3 block font-medium">
            After Treatment
          </label>

          <div className="relative">

            {afterImage ? (
              <>
                <Image
                  src={afterImage}
                  alt="After"
                  width={500}
                  height={350}
                  className="h-72 w-full rounded-2xl border object-cover"
                />

                <button
                  type="button"
                  onClick={() => removeImage("after")}
                  className="absolute right-3 top-3 rounded-full bg-red-600 p-2 text-white hover:bg-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => afterInputRef.current?.click()}
                className="flex h-72 w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 hover:border-blue-500 hover:bg-blue-50"
              >
                <Camera
                  size={40}
                  className="text-slate-400"
                />

                <span className="mt-3 font-medium">
                  Upload After Image
                </span>
              </button>
            )}

          </div>

        </div>

      </div>

      <input
        ref={beforeInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => handleImageSelect(e, "before")}
      />

      <input
        ref={afterInputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => handleImageSelect(e, "after")}
      />

    </div>
  );
}