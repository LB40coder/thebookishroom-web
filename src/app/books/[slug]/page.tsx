import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getBookBySlug, getBooksBySlugs, getBookSlugs } from "@/lib/data/books";
import { getAuthorBySlug } from "@/lib/data/authors";
import { getPostsByRelatedBook } from "@/lib/data/posts";
import { stripHtml } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { BuyOnAmazon } from "@/components/books/BuyOnAmazon";
import { CoverImage } from "@/components/ui/CoverImage";
import { RichTextContent } from "@/components/ui/RichTextContent";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getBookSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const book = await getBookBySlug(slug);
  if (!book) return { title: "Book Not Found" };

  const description = stripHtml(book.description).slice(0, 160);

  return {
    title: `${book.title} by ${book.author}`,
    description,
    openGraph: {
      title: `${book.title} by ${book.author}`,
      description,
      images: book.coverImage ? [{ url: book.coverImage }] : undefined,
    },
  };
}

export default async function BookPage({ params }: PageProps) {
  const { slug } = await params;
  const book = await getBookBySlug(slug);
  if (!book) notFound();

  const [author, similarBooks, relatedPosts] = await Promise.all([
    getAuthorBySlug(book.authorSlug),
    getBooksBySlugs(book.similarBooks),
    getPostsByRelatedBook(book.slug),
  ]);

  const similarBySlug = new Map(similarBooks.map((b) => [b.slug, b]));
  const orderedSimilarBooks = book.similarBooks
    .map((s) => similarBySlug.get(s))
    .filter(Boolean);

  return (
    <div className="section-padding">
      <div className="section-container">
        <Link
          href="/books"
          className="inline-flex items-center gap-1.5 text-sm text-coffee hover:text-ink transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          All Books
        </Link>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 space-y-0">
              <div className="relative aspect-[3/4] rounded-sm overflow-hidden bg-cream-dark">
                {book.coverImage ? (
                  <CoverImage
                    src={book.coverImage}
                    alt={book.title}
                    variant="detail-book"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-coffee font-serif text-xl p-6 text-center">
                    {book.title}
                  </div>
                )}
              </div>

              {book.amazonEditions && book.amazonEditions.length > 0 && (
                <BuyOnAmazon editions={book.amazonEditions} />
              )}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h1 className="text-3xl md:text-4xl font-serif text-ink">
              {book.title}
            </h1>
            <p className="mt-2 text-lg text-coffee">
              by{" "}
              <Link
                href={`/authors/${book.authorSlug}`}
                className="text-burgundy hover:underline"
              >
                {book.author}
              </Link>{" "}
              · {book.year}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {book.genres.map((g) => (
                <span
                  key={g}
                  className="text-xs px-2.5 py-1 rounded-sm bg-cream-dark text-coffee border border-coffee/10 capitalize"
                >
                  {g}
                </span>
              ))}
              {book.moods.map((m) => (
                <span
                  key={m}
                  className="text-xs px-2.5 py-1 rounded-sm bg-burgundy/5 text-burgundy capitalize"
                >
                  {m.replace(/-/g, " ")}
                </span>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-3 gap-4 p-4 bg-cream-dark/50 rounded-sm border border-coffee/10">
              <div>
                <p className="text-xs text-coffee uppercase tracking-wider">Difficulty</p>
                <p className="mt-1 text-sm font-medium text-ink capitalize">{book.difficulty}</p>
              </div>
              <div>
                <p className="text-xs text-coffee uppercase tracking-wider">Length</p>
                <p className="mt-1 text-sm font-medium text-ink capitalize">{book.length}</p>
              </div>
              <div>
                <p className="text-xs text-coffee uppercase tracking-wider">Reading Time</p>
                <p className="mt-1 text-sm font-medium text-ink">{book.estimatedReadingTime}</p>
              </div>
            </div>

            <section className="mt-8">
              <h2 className="font-serif text-xl text-ink mb-3">About the Book</h2>
              <RichTextContent
                html={book.description}
                className="text-coffee font-reading leading-relaxed"
              />
            </section>

            <section className="mt-8">
              <h2 className="font-serif text-xl text-ink mb-3">Why You Should Read It</h2>
              <RichTextContent
                html={book.whyRead}
                className="text-coffee font-reading leading-relaxed"
              />
            </section>

            <section className="mt-8">
              <h2 className="font-serif text-xl text-ink mb-3">Who This Book Is For</h2>
              <RichTextContent
                html={book.whoIsItFor}
                className="text-coffee font-reading leading-relaxed"
              />
            </section>

            {author && (
              <section className="mt-8 p-5 bg-cream-dark/50 rounded-sm border border-coffee/10">
                <h2 className="font-serif text-lg text-ink mb-2">About the Author</h2>
                <p className="text-sm text-coffee leading-relaxed line-clamp-3">
                  {stripHtml(author.bio)}
                </p>
                <Button
                  href={`/authors/${author.slug}`}
                  variant="outline"
                  className="mt-3 text-xs"
                >
                  View Author Profile
                </Button>
              </section>
            )}

            {orderedSimilarBooks.length > 0 && (
              <section className="mt-10 pt-8 border-t border-coffee/10">
                <h2 className="font-serif text-xl text-ink mb-4">Similar Books</h2>
                <ul className="space-y-2">
                  {orderedSimilarBooks.map((b) => (
                    <li key={b!.slug}>
                      <Link
                        href={`/books/${b!.slug}`}
                        className="text-burgundy hover:underline text-sm font-medium"
                      >
                        {b!.title} by {b!.author}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {relatedPosts.length > 0 && (
              <section className="mt-8">
                <h2 className="font-serif text-xl text-ink mb-4">Related Reading Lists</h2>
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
      </div>
    </div>
  );
}
