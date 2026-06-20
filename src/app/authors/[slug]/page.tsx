import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  getAuthorBySlug,
  getAuthorSlugs,
} from "@/lib/data/authors";
import { getPublishedBooksByAuthorSlug } from "@/lib/data/books";
import { prisma, isDatabaseConfigured } from "@/lib/db";
import { publicPostFilter } from "@/lib/posts/visibility";
import { stripHtml } from "@/lib/utils";
import { buildShareMetadata } from "@/lib/metadata/share";
import { absoluteUrl } from "@/lib/site-url";
import { Button } from "@/components/ui/Button";
import { ShareButtons } from "@/components/ui/ShareButtons";
import { CoverImage } from "@/components/ui/CoverImage";
import { RichTextContent } from "@/components/ui/RichTextContent";
import { AuthorBookLinkList } from "@/components/authors/AuthorBookLinkList";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAuthorSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);
  if (!author) return { title: "Author Not Found" };

  const description = stripHtml(author.bio).slice(0, 160);

  return buildShareMetadata({
    title: author.name,
    description,
    path: `/authors/${slug}`,
    image: author.image,
    type: "profile",
  });
}

export default async function AuthorPage({ params }: PageProps) {
  noStore();
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);
  if (!author) notFound();

  const authorBooks = await getPublishedBooksByAuthorSlug(slug);

  const relatedPosts =
    isDatabaseConfigured() && authorBooks.length > 0
      ? await prisma.post.findMany({
          where: {
            ...publicPostFilter(),
            relatedBooks: {
              hasSome: authorBooks.map((book) => book.slug),
            },
          },
          orderBy: { publishedAt: "desc" },
          take: 6,
        })
      : [];

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
              <CoverImage
                src={author.image}
                alt={author.name}
                variant="avatar"
                priority
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
          <RichTextContent
            html={author.bio}
            className="text-coffee font-reading leading-relaxed"
          />
        </section>

        <section className="mb-10 p-5 bg-cream-dark/50 rounded-sm border border-coffee/10">
          <h2 className="font-serif text-xl text-ink mb-3">Where to Start</h2>
          <p className="text-coffee font-reading leading-relaxed">
            {author.whereToStart}
          </p>
        </section>

        {author.mainBooks.length > 0 && (
          <section className="mb-10">
            <h2 className="font-serif text-xl text-ink mb-4">Main Books</h2>
            <AuthorBookLinkList links={author.mainBooks} authorBooks={authorBooks} />
          </section>
        )}

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
                      <CoverImage
                        src={book.coverImage}
                        alt={book.title}
                        variant="thumb"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-base text-ink">{book.title}</h3>
                    <p className="text-sm text-coffee">{book.year}</p>
                    <p className="mt-1 text-sm text-coffee line-clamp-2">
                      {stripHtml(book.description)}
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

        {author.readingOrder.length > 0 && (
          <section className="mb-10">
            <h2 className="font-serif text-xl text-ink mb-4">
              Recommended Reading Order
            </h2>
            <AuthorBookLinkList
              links={author.readingOrder}
              authorBooks={authorBooks}
              ordered
            />
          </section>
        )}

        <ShareButtons
          url={absoluteUrl(`/authors/${author.slug}`)}
          title={author.name}
          description={stripHtml(author.bio).slice(0, 160)}
          className="mb-10 pt-6 border-t border-coffee/10"
        />

        {relatedPosts.length > 0 && (
          <section className="pt-8 border-t border-coffee/10">
            <h2 className="font-serif text-xl text-ink mb-4">Related Posts</h2>
            <ul className="space-y-2">
              {relatedPosts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/reading-lists/${post.slug}`}
                    className="text-burgundy hover:underline text-sm font-medium"
                  >
                    {post.title}
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
