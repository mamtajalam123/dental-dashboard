"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryPreviewProps {
  images: string[];
}

export default function GalleryPreview({
  images,
}: GalleryPreviewProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const closePreview = () => {
    setSelectedIndex(null);
  };

  const previousImage = () => {
    if (selectedIndex === null) return;

    setSelectedIndex(
      selectedIndex === 0
        ? images.length - 1
        : selectedIndex - 1
    );
  };

  const nextImage = () => {
    if (selectedIndex === null) return;

    setSelectedIndex(
      selectedIndex === images.length - 1
        ? 0
        : selectedIndex + 1
    );
  };

  return (
    <>
      {/* Gallery Grid */}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

        {images.map((image, index) => (

          <button
            key={index}
            type="button"
            onClick={() => setSelectedIndex(index)}
            className="group overflow-hidden rounded-2xl border bg-white shadow-sm"
          >

            <Image
              src={image}
              alt={`Gallery ${index + 1}`}
              width={600}
              height={450}
              className="h-64 w-full object-cover transition duration-300 group-hover:scale-105"
            />

          </button>

        ))}

      </div>

      {/* Lightbox */}

      {selectedIndex !== null && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6">

          <button
            onClick={closePreview}
            className="absolute right-6 top-6 rounded-full bg-white p-3"
          >
            <X size={22} />
          </button>

          {images.length > 1 && (
            <>
              <button
                onClick={previousImage}
                className="absolute left-6 rounded-full bg-white p-3"
              >
                <ChevronLeft size={24} />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-6 top-1/2 -translate-y-1/2 rounded-full bg-white p-3"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          <Image
            src={images[selectedIndex]}
            alt="Preview"
            width={1200}
            height={900}
            className="max-h-[90vh] w-auto rounded-2xl object-contain"
          />

          <div className="absolute bottom-6 rounded-full bg-white/90 px-5 py-2 text-sm font-medium">

            {selectedIndex + 1} / {images.length}

          </div>

        </div>

      )}
    </>
  );
}