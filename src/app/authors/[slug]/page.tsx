import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { authors, getAuthorBySlug } from "@/lib/data/authors";
import { getBooksByAuthor } from "@/lib/data/books";
import { posts } from "@/lib/data/posts";
import { Button } from "@/components/ui/Button";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return authors.map((author) => ({ slug: author.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);
  if (!author) return { title: "Author Not Found" };

  return {
    title: author.name,
    description: author.bio.slice(0, 160),
    openGraph: {
      title: `${author.name} — Author Profile`,
      description: author.bio.slice(0, 160),
      images: author.image ? [{ url: author.image }] : undefined,
    },
  };
}

export default async function AuthorPage({ params }: PageProps) {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);
  if (!author) notFound();

  const authorBooks = getBooksByAuthor(slug);
  const relatedPosts = posts.filter((p) =>
    p.relatedBooks.some((bookSlug) =>
      authorBooks.some((b) => b.slug === bookSlug)
    )
  );

  const period = author.deathYear
    ? `${author.birthYear}–${author.deathYear}`
    : author.birthYear
      ? `b. ${author.birthYear}`
      : "";

  return (
    <div className="section-padding">
      <div className="section-container max-w-3xl">
        <Link
          href="/authors"
          className="inline-flex items-center gap-1.5 text-sm text-coffee hover:text-ink transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          All Authors
        </Link>

        <div className="flex flex-col sm:flex-row items-start gap-6 mb-8">
          <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-coffee/15 shrink-0">
            {author.image ? (
              <Image
                src={author.image}
                alt={author.name}
                fill
                className="object-cover"
                sizes="112px"
              />
            ) : (
              <div className="w-full h-full bg-cream-dark flex items-center justify-center text-coffee font-serif text-3xl">
                {author.name.charAt(0)}
              </div>
            )}
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-serif text-ink">
              {author.name}
            </h1>
            <p className="mt-1 text-coffee">
              {author.nationality}
              {period && ` · ${period}`}
            </p>
          </div>
        </div>

        <section className="mb-10">
          <h2 className="font-serif text-xl text-ink mb-3">About the Author</h2>
          <p className="text-coffee font-reading leading-relaxed">{author.bio}</p>
        </section>

        <section className="mb-10 p-5 bg-cream-dark/50 rounded-sm border border-coffee/10">
          <h2 className="font-serif text-xl text-ink mb-3">Where to Start</h2>
          <p className="text-coffee font-reading leading-relaxed">
            {author.whereToStart}
          </p>
        </section>

        {authorBooks.length > 0 && (
          <section className="mb-10">
            <h2 className="font-serif text-xl text-ink mb-4">
              Best Books by This Author
            </h2>
            <div className="space-y-4">
              {authorBooks.map((book) => (
                <div
                  key={book.slug}
                  className="flex items-start gap-4 p-4 bg-cream rounded-sm border border-coffee/10"
                >
                  <div className="relative w-16 h-20 rounded-sm overflow-hidden shrink-0 bg-cream-dark">
                    {book.coverImage && (
                      <Image
                        src={book.coverImage}
                        alt={book.title}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-base text-ink">{book.title}</h3>
                    <p className="text-sm text-coffee">{book.year}</p>
                    <p className="mt-1 text-sm text-coffee line-clamp-2">
                      {book.description}
                    </p>
                    <Button
                      href={`/books/${book.slug}`}
                      variant="outline"
                      className="mt-2 text-xs py-1.5"
                    >
                      View Book Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {author.readingOrder && author.readingOrder.length > 0 && (
          <section className="mb-10">
            <h2 className="font-serif text-xl text-ink mb-4">
              Recommended Reading Order
            </h2>
            <ol className="space-y-2">
              {author.readingOrder.map((bookSlug, i) => {
                const book = authorBooks.find((b) => b.slug === bookSlug);
                return (
                  <li key={bookSlug} className="flex items-center gap-3 text-sm">
                    <span className="w-6 h-6 rounded-full bg-forest/10 text-forest text-xs flex items-center justify-center font-medium shrink-0">
                      {i + 1}
                    </span>
                    {book ? (
                      <Link
                        href={`/books/${book.slug}`}
                        className="text-burgundy hover:underline font-medium"
                      >
                        {book.title}
                      </Link>
                    ) : (
                      <span className="text-coffee capitalize">
                        {bookSlug.replace(/-/g, " ")}
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>
          </section>
        )}

        {relatedPosts.length > 0 && (
          <section className="pt-8 border-t border-coffee/10">
            <h2 className="font-serif text-xl text-ink mb-4">Related Posts</h2>
            <ul className="space-y-2">
              {relatedPosts.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/reading-lists/${p.slug}`}
                    className="text-burgundy hover:underline text-sm font-medium"
                  >
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}
