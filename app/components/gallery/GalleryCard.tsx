"use client";

import Image from "next/image";

import { CalendarDays, FolderOpen } from "lucide-react";

import { GalleryItem } from "@/types/gallery";

import GalleryStatus from "./GalleryStatus";
import GalleryActions from "./GalleryActions";

type GalleryCardProps = {
  item: GalleryItem;
  onDelete: (id: number) => void;
};

export default function GalleryCard({
  item,
  onDelete,
}: GalleryCardProps) {
  return (
    <div
      className="
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-lg
      "
    >
      {/* Image */}

      <div className="relative h-60 w-full overflow-hidden">

        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition duration-500 hover:scale-105"
        />

        <div className="absolute right-4 top-4">
          <GalleryStatus status={item.status} />
        </div>

      </div>

      {/* Content */}

      <div className="space-y-5 p-5">

        <div>

          <h3 className="text-xl font-bold text-slate-800">
            {item.title}
          </h3>

          <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
            {item.description}
          </p>

        </div>

        {/* Category */}

        <div className="flex items-center gap-2 text-sm text-slate-600">

          <FolderOpen size={16} />

          <span>{item.category}</span>

        </div>

        {/* Date */}

        <div className="flex items-center gap-2 text-sm text-slate-600">

          <CalendarDays size={16} />

          <span>{item.createdAt}</span>

        </div>

        {/* Actions */}

        <div className="border-t border-slate-200 pt-4">

          <GalleryActions
            id={item.id}
            onDelete={onDelete}
          />

        </div>

      </div>

    </div>
  );
}