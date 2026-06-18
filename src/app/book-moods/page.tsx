import type { Metadata } from "next";
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
import { getPostsByMood } from "@/lib/data/posts";
import { PostCard } from "@/components/cards/PostCard";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Book Moods",
  description:
    "Discover books by mood — from dark academia and gothic to cozy and romantic. Find reads that match how you feel.",
};

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

export default function BookMoodsPage() {
  return (
    <div className="section-padding">
      <div className="section-container">
        <header className="max-w-2xl mb-10">
          <h1 className="text-3xl md:text-4xl font-serif text-ink">
            Book Moods
          </h1>
          <p className="mt-3 text-coffee leading-relaxed">
            Sometimes you know exactly how you want a book to make you feel.
            Browse by mood to find reads that match your current vibe.
          </p>
        </header>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {moods.map((mood) => {
            const Icon = iconMap[mood.icon] || BookOpen;
            const moodPosts = getPostsByMood(mood.slug);
            return (
              <Link
                key={mood.slug}
                href={`/book-moods/${mood.slug}`}
                className="group p-6 bg-cream rounded-sm border border-coffee/10 hover:border-burgundy/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-cream-dark flex items-center justify-center mb-4 group-hover:bg-burgundy/5 transition-colors">
                  <Icon className="w-6 h-6 text-coffee group-hover:text-burgundy transition-colors" />
                </div>
                <h2 className="font-serif text-lg text-ink group-hover:text-burgundy transition-colors">
                  {mood.name}
                </h2>
                <p className="mt-2 text-sm text-coffee leading-relaxed">
                  {mood.description}
                </p>
                {moodPosts.length > 0 && (
                  <p className="mt-3 text-xs text-burgundy font-medium">
                    {moodPosts.length} reading {moodPosts.length === 1 ? "list" : "lists"}
                  </p>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
