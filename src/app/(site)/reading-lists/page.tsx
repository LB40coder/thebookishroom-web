import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getPublishedPosts } from "@/lib/data/posts";
import { getMoods } from "@/lib/data/moods";
import { PostCard } from "@/components/cards/PostCard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Essays, reading lists, and literary notes to help you discover your next favorite book.",
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

  const [featured, ...rest] = posts;
  const isFiltered = Boolean(mood || tag);

  return (
    <div className="section-padding">
      <div className="section-container">
        <header className="max-w-2xl mb-10 md:mb-12">
          <p className="editorial-kicker">The journal</p>
          <h1 className="mt-2 text-3xl md:text-4xl lg:text-5xl font-serif text-ink leading-tight">
            Reading Lists &amp; Articles
          </h1>
          <p className="mt-4 text-coffee font-reading leading-relaxed text-base md:text-lg">
            Curated collections and literary essays organized by mood, genre,
            and obsession. Pour a cup of tea and settle in.
          </p>
        </header>

        <div className="mb-10 flex flex-wrap gap-2">
          <span className="text-sm text-coffee mr-2 self-center">Browse by mood:</span>
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
          <p className="text-coffee text-center py-12 font-reading">
            No articles yet. Check back soon for curated recommendations.
          </p>
        ) : (
          <>
            {!isFiltered && featured && (
              <div className="mb-12 pb-12 border-b border-coffee/10">
                <PostCard post={featured} variant="featured" />
              </div>
            )}

            <div className="flex flex-col gap-10 md:gap-12">
              {(isFiltered ? posts : rest).map((post) => (
                <PostCard key={post.slug} post={post} variant="horizontal" />
              ))}
            </div>

            {!isFiltered && rest.length > 0 && (
              <div className="mt-12 pt-8 border-t border-coffee/10 text-center">
                <p className="text-sm text-coffee font-reading mb-4">
                  Looking for books by mood or author?
                </p>
                <Link
                  href="/book-moods"
                  className="inline-flex items-center gap-1.5 text-sm text-burgundy font-medium hover:underline"
                >
                  Explore book moods
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
