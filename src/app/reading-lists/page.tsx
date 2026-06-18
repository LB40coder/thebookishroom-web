import type { Metadata } from "next";
import { posts } from "@/lib/data/posts";
import { moods } from "@/lib/data/moods";
import { PostCard } from "@/components/cards/PostCard";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Reading Lists",
  description:
    "Browse curated reading lists to discover your next favorite book. Lists organized by mood, genre, and aesthetic.",
};

export default function ReadingListsPage() {
  return (
    <div className="section-padding">
      <div className="section-container">
        <header className="max-w-2xl mb-10">
          <h1 className="text-3xl md:text-4xl font-serif text-ink">
            Reading Lists
          </h1>
          <p className="mt-3 text-coffee leading-relaxed">
            Curated collections of books organized by mood, aesthetic, genre,
            and literary obsession. Find your next favorite read.
          </p>
        </header>

        <div className="mb-8 flex flex-wrap gap-2">
          <span className="text-sm text-coffee mr-2 self-center">Filter by mood:</span>
          {moods.map((mood) => (
            <a
              key={mood.slug}
              href={`/reading-lists?mood=${mood.slug}`}
              className="text-xs px-3 py-1.5 rounded-sm border border-coffee/20 text-coffee hover:border-burgundy hover:text-burgundy transition-colors"
            >
              {mood.name}
            </a>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-coffee">
          More reading lists coming soon. Check back weekly for new recommendations.
        </p>
      </div>
    </div>
  );
}
