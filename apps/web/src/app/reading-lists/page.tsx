import type { Metadata } from "next";
import { getPublishedPosts } from "@/lib/data/posts";
import { getMoods } from "@/lib/data/moods";
import { PostCard } from "@/components/cards/PostCard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Reading Lists",
  description:
    "Browse curated reading lists to discover your next favorite book. Lists organized by mood, genre, and aesthetic.",
};

interface PageProps {
  searchParams: Promise<{ mood?: string; tag?: string }>;
}

export default async function ReadingListsPage({ searchParams }: PageProps) {
  const { mood, tag } = await searchParams;
  const [posts, moods] = await Promise.all([
    mood
      ? getPublishedPosts({ mood })
      : tag
        ? getPublishedPosts({ tag })
        : getPublishedPosts(),
    getMoods(),
  ]);

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
          <a
            href="/reading-lists"
            className={`text-xs px-3 py-1.5 rounded-sm border transition-colors ${
              !mood && !tag
                ? "border-burgundy text-burgundy bg-burgundy/5"
                : "border-coffee/20 text-coffee hover:border-burgundy hover:text-burgundy"
            }`}
          >
            All
          </a>
          {moods.map((m) => (
            <a
              key={m.slug}
              href={`/reading-lists?mood=${m.slug}`}
              className={`text-xs px-3 py-1.5 rounded-sm border transition-colors ${
                mood === m.slug
                  ? "border-burgundy text-burgundy bg-burgundy/5"
                  : "border-coffee/20 text-coffee hover:border-burgundy hover:text-burgundy"
              }`}
            >
              {m.name}
            </a>
          ))}
        </div>

        {posts.length === 0 ? (
          <p className="text-coffee text-center py-12">
            No reading lists found yet. Check back soon for curated recommendations.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
