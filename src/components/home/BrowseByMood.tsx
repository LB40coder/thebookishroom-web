import Link from "next/link";
import {
  GraduationCap,
  Coffee,
  Castle,
  Heart,
  CloudRain,
  Sparkles,
  BookOpen,
  Search,
} from "lucide-react";
import { moods } from "@/lib/data/moods";
import { SectionHeading } from "@/components/ui/SectionHeading";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "graduation-cap": GraduationCap,
  coffee: Coffee,
  castle: Castle,
  heart: Heart,
  "cloud-rain": CloudRain,
  sparkles: Sparkles,
  "book-open": BookOpen,
  search: Search,
};

export function BrowseByMood() {
  return (
    <section className="section-padding bg-cream-dark/50">
      <div className="section-container">
        <SectionHeading title="Browse by Mood" />

        <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-4 md:gap-6">
          {moods.map((mood) => {
            const Icon = iconMap[mood.icon] || BookOpen;
            return (
              <Link
                key={mood.slug}
                href={`/book-moods/${mood.slug}`}
                className="group flex flex-col items-center text-center gap-2"
              >
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-cream border border-coffee/15 flex items-center justify-center group-hover:border-burgundy/40 group-hover:bg-burgundy/5 transition-colors">
                  <Icon className="w-5 h-5 md:w-6 md:h-6 text-coffee group-hover:text-burgundy transition-colors" />
                </div>
                <span className="text-xs md:text-sm text-ink/80 group-hover:text-ink transition-colors leading-tight">
                  {mood.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
