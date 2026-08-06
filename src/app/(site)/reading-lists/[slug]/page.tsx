import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, ArrowLeft } from "lucide-react";
import { getPostBySlug, getPublishedPosts } from "@/lib/data/posts";
import { getBooksBySlugs } from "@/lib/data/books";
import { formatDate } from "@/lib/utils";
import { buildShareMetadata } from "@/lib/metadata/share";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/metadata/json-ld";
import { absoluteUrl } from "@/lib/site-url";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { ShareButtons } from "@/components/ui/ShareButtons";
import { NewsletterBanner } from "@/components/home/NewsletterBanner";
import { CoverImage } from "@/components/ui/CoverImage";
import { RichTextContent } from "@/components/ui/RichTextContent";
import { PostCard } from "@/components/cards/PostCard";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  return buildShareMetadata({
    title: post.seoTitle.replace(" | The Bookish Room", ""),
    description: post.seoDescription || post.excerpt,
    path: `/reading-lists/${slug}`,
    image: post.coverImage,
    type: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
  });
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const [relatedBooks, relatedPosts] = await Promise.all([
    getBooksBySlugs(post.relatedBooks),
    getPublishedPosts({ excludeSlug: slug, limit: 3 }),
  ]);

  return (
    <>
      <JsonLd
        data={[
          articleJsonLd({
            title: post.title,
            description: post.seoDescription || post.excerpt,
            path: `/reading-lists/${post.slug}`,
            image: post.coverImage,
            publishedAt: post.publishedAt,
            updatedAt: post.updatedAt,
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Journal", path: "/reading-lists" },
            { name: post.title, path: `/reading-lists/${post.slug}` },
          ]),
        ]}
      />

      <article>
        <header className="section-padding pb-0">
          <div className="section-container max-w-4xl">
            <Link
              href="/reading-lists"
              className="inline-flex items-center gap-1.5 text-sm text-coffee hover:text-ink transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to the journal
            </Link>

            <p className="editorial-kicker">{post.category}</p>

            <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-serif text-ink leading-[1.15] text-balance">
              {post.title}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-coffee">
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              <span aria-hidden>·</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readingTime} min read
              </span>
            </div>

            <p className="mt-6 text-lg md:text-xl text-coffee font-reading leading-relaxed article-lead">
              {post.excerpt}
            </p>

            <ShareButtons
              url={absoluteUrl(`/reading-lists/${post.slug}`)}
              title={post.title}
              description={post.excerpt}
              className="mt-6"
            />
          </div>
        </header>

        <div className="section-container max-w-4xl mt-8 md:mt-10">
          <div className="relative aspect-[16/9] rounded-sm overflow-hidden">
            <CoverImage
              src={post.coverImage}
              alt={post.title}
              variant="detail-post"
              priority
            />
          </div>
        </div>

        <div className="section-padding pt-8 md:pt-12">
          <div className="section-container">
            <div className="max-w-2xl mx-auto">
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8 pb-8 border-b border-coffee/10">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/reading-lists?tag=${encodeURIComponent(tag)}`}
                      className="text-xs px-2.5 py-1 rounded-sm bg-cream-dark text-coffee border border-coffee/10 hover:border-burgundy hover:text-burgundy transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              )}

              <RichTextContent
                html={post.content}
                className="prose-reading font-reading text-ink/90"
              />
            </div>

            {relatedBooks.length > 0 && (
              <section className="max-w-2xl mx-auto mt-14 pt-10 border-t border-coffee/10">
                <h2 className="font-serif text-2xl text-ink mb-2">
                  Books in this list
                </h2>
                <p className="text-sm text-coffee font-reading mb-8">
                  The titles mentioned in this article, with notes and links.
                </p>
                <div className="space-y-5">
                  {relatedBooks.map((book) => (
                    <div
                      key={book.slug}
                      className="p-5 md:p-6 bg-cream-dark/60 rounded-sm border border-coffee/10"
                    >
                      <h3 className="font-serif text-lg text-ink">
                        {book.title}
                      </h3>
                      <p className="text-sm text-coffee mt-1">
                        by {book.author} · {book.year}
                      </p>
                      <RichTextContent
                        html={book.description}
                        className="mt-3 text-sm text-coffee leading-relaxed line-clamp-3"
                      />
                      <div className="mt-3 flex flex-wrap gap-2">
                        <span className="text-[10px] uppercase tracking-wider text-forest bg-forest/5 px-2 py-0.5 rounded-sm">
                          {book.difficulty}
                        </span>
                        {book.moods.map((m) => (
                          <span
                            key={m}
                            className="text-[10px] uppercase tracking-wider text-burgundy bg-burgundy/5 px-2 py-0.5 rounded-sm"
                          >
                            {m.replace(/-/g, " ")}
                          </span>
                        ))}
                      </div>
                      <Button
                        href={`/books/${book.slug}`}
                        variant="outline"
                        className="mt-4 text-xs"
                      >
                        View book details
                      </Button>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>

        {relatedPosts.length > 0 && (
          <section className="section-padding bg-cream-dark/40 border-t border-coffee/10">
            <div className="section-container max-w-3xl">
              <h2 className="font-serif text-2xl text-ink mb-8 text-center">
                Continue reading
              </h2>
              <div className="flex flex-col gap-8">
                {relatedPosts.map((p) => (
                  <PostCard key={p.slug} post={p} variant="horizontal" />
                ))}
              </div>
            </div>
          </section>
        )}
      </article>

      <NewsletterBanner />
    </>
  );
}
