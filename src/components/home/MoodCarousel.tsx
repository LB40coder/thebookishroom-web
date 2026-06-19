import Link from "next/link";
import type { Mood } from "@/lib/types";
import { getMoodIcon } from "@/lib/icons/mood-icons";

const ITEMS_TO_SHOW = 8;

interface MoodCarouselProps {
  moods: Mood[];
}

export function MoodCarousel({ moods }: MoodCarouselProps) {
  if (moods.length === 0) return null;

  const visibleMoods = moods.slice(0, ITEMS_TO_SHOW);

  return (
    <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 sm:gap-4 md:gap-6">
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
  );
}
