"use client";

import { Star } from "lucide-react";

type RatingStarsProps = {
  rating: number;
};

export default function RatingStars({
  rating,
}: RatingStarsProps) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, index) => {
        const filled = index < rating;

        return (
          <Star
            key={index}
            size={18}
            className={
              filled
                ? "fill-yellow-400 text-yellow-400"
                : "text-slate-300"
            }
          />
        );
      })}
    </div>
  );
}