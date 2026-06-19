"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Mood } from "@/lib/types";
import { getMoodIcon } from "@/lib/icons/mood-icons";

const ITEMS_PER_PAGE = 8;
const AUTO_ADVANCE_MS = 6000;

interface MoodCarouselProps {
  moods: Mood[];
}

export function MoodCarousel({ moods }: MoodCarouselProps) {
  const totalPages = Math.max(1, Math.ceil(moods.length / ITEMS_PER_PAGE));
  const [page, setPage] = useState(0);

  const goNext = useCallback(() => {
    setPage((current) => (current + 1) % totalPages);
  }, [totalPages]);

  const goPrev = useCallback(() => {
    setPage((current) => (current - 1 + totalPages) % totalPages);
  }, [totalPages]);

  useEffect(() => {
    if (totalPages <= 1) return;
    const timer = window.setInterval(goNext, AUTO_ADVANCE_MS);
    return () => window.clearInterval(timer);
  }, [goNext, totalPages]);

  if (moods.length === 0) return null;

  const start = page * ITEMS_PER_PAGE;
  const visibleMoods = moods.slice(start, start + ITEMS_PER_PAGE);

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="grid grid-cols-8 gap-2 sm:gap-4 md:gap-6 transition-opacity duration-300"
          key={page}
        >
          {visibleMoods.map((mood) => {
            const Icon = getMoodIcon(mood.icon);
            return (
              <Link
                key={mood.slug}
                href={`/book-moods/${mood.slug}`}
                className="group flex flex-col items-center text-center gap-2"
              >
                <div className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-cream border border-coffee/15 flex items-center justify-center group-hover:border-burgundy/40 group-hover:bg-burgundy/5 transition-colors">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-coffee group-hover:text-burgundy transition-colors" />
                </div>
                <span className="text-[10px] sm:text-xs md:text-sm text-ink/80 group-hover:text-ink transition-colors leading-tight line-clamp-2">
                  {mood.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {totalPages > 1 && (
        <>
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous moods"
            className="absolute left-0 top-1/2 -translate-y-[calc(50%+0.75rem)] -translate-x-1 md:-translate-x-4 w-8 h-8 rounded-full bg-cream border border-coffee/15 text-coffee hover:text-ink hover:border-coffee/30 transition-colors flex items-center justify-center shadow-sm"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next moods"
            className="absolute right-0 top-1/2 -translate-y-[calc(50%+0.75rem)] translate-x-1 md:translate-x-4 w-8 h-8 rounded-full bg-cream border border-coffee/15 text-coffee hover:text-ink hover:border-coffee/30 transition-colors flex items-center justify-center shadow-sm"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <div className="flex justify-center gap-1.5 mt-6">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Go to mood page ${index + 1}`}
                onClick={() => setPage(index)}
                className={`h-1.5 rounded-full transition-all ${
                  index === page
                    ? "w-5 bg-burgundy"
                    : "w-1.5 bg-coffee/25 hover:bg-coffee/40"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
