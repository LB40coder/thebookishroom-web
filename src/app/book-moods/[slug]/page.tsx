import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getMoodBySlug } from "@/lib/data/moods";
import { DEFAULT_MOODS } from "@/lib/data/taxonomy-defaults";
import { getPostsByMood } from "@/lib/data/posts";
import { filterPublishedBooks } from "@/lib/data/books";
import { PostCard } from "@/components/cards/PostCard";
import { BookCard } from "@/components/cards/BookCard";

export const revalidate = 86400;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return DEFAULT_MOODS.map((mood) => ({ slug: mood.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const mood = await getMoodBySlug(slug);
  if (!mood) return { title: "Mood Not Found" };

  return {
    title: `${mood.name} Books`,
    description: mood.description,
  };
}

export default async function MoodPage({ params }: PageProps) {
  const { slug } = await params;
  const mood = await getMoodBySlug(slug);
  if (!mood) notFound();

  const moodPosts = getPostsByMood(slug);
  const moodBooks = await filterPublishedBooks({ mood: slug });

  return (
    <div className="section-padding">
      <div className="section-container">
        <Link
          href="/book-moods"
          className="inline-flex items-center gap-1.5 text-sm text-coffee hover:text-ink transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          All Moods
        </Link>

        <header className="max-w-2xl mb-10">
          <h1 className="text-3xl md:text-4xl font-serif text-ink">
            {mood.name}
          </h1>
          <p className="mt-3 text-coffee leading-relaxed">{mood.description}</p>
        </header>

        {moodPosts.length > 0 && (
          <section className="mb-12">
            <h2 className="font-serif text-2xl text-ink mb-6">
              Reading Lists
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {moodPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </section>
        )}

        {moodBooks.length > 0 && (
          <section>
            <h2 className="font-serif text-2xl text-ink mb-6">Books</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {moodBooks.map((book) => (
                <BookCard key={book.slug} book={book} />
              ))}
            </div>
          </section>
        )}

        {moodPosts.length === 0 && moodBooks.length === 0 && (
          <p className="text-coffee text-center py-12">
            Content for this mood is coming soon. Check back for curated
            recommendations.
          </p>
        )}
      </div>
    </div>
  );
}
