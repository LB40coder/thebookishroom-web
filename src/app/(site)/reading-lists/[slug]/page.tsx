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
            { name: "Reading Lists", path: "/reading-lists" },
            { name: post.title, path: `/reading-lists/${post.slug}` },
          ]),
        ]}
      />
      <article className="section-padding">
        <div className="section-container max-w-3xl">
          <Link
            href="/reading-lists"
            className="inline-flex items-center gap-1.5 text-sm text-coffee hover:text-ink transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Reading Lists
          </Link>

          <div className="flex flex-wrap items-center gap-3 text-sm text-coffee mb-4">
            <span className="text-burgundy font-medium">{post.category}</span>
            <span>·</span>
            <span>{formatDate(post.publishedAt)}</span>
            <span>·</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.readingTime} min read
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-serif text-ink leading-tight">
            {post.title}
          </h1>

          <p className="mt-4 text-lg text-coffee font-reading leading-relaxed">
            {post.excerpt}
          </p>

          <ShareButtons
            url={absoluteUrl(`/reading-lists/${post.slug}`)}
            title={post.title}
            description={post.excerpt}
            className="mt-5"
          />

          <div className="relative aspect-[16/9] rounded-sm overflow-hidden my-8">
            <CoverImage
              src={post.coverImage}
              alt={post.title}
              variant="detail-post"
              priority
            />
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded-sm bg-cream-dark text-coffee border border-coffee/10"
              >
                {tag}
              </span>
            ))}
          </div>

          <RichTextContent
            html={post.content}
            className="font-reading text-ink/90 leading-relaxed space-y-4"
          />

          {relatedBooks.length > 0 && (
            <section className="mt-12 pt-8 border-t border-coffee/10">
              <h2 className="font-serif text-2xl text-ink mb-6">
                Books in This List
              </h2>
              <div className="space-y-6">
                {relatedBooks.map((book) => (
                  <div
                    key={book.slug}
                    className="p-5 bg-cream-dark/50 rounded-sm border border-coffee/10"
                  >
                    <h3 className="font-serif text-lg text-ink">
                      {book.title}
                    </h3>
                    <p className="text-sm text-coffee">
                      by {book.author} · {book.year}
                    </p>
                    <RichTextContent
                      html={book.description}
                      className="mt-2 text-sm text-coffee leading-relaxed line-clamp-3"
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
                      View Book Details
                    </Button>
                  </div>
                ))}
              </div>
            </section>
          )}

          {relatedPosts.length > 0 && (
            <section className="mt-12 pt-8 border-t border-coffee/10">
              <h2 className="font-serif text-2xl text-ink mb-6">
                You Might Also Like
              </h2>
              <ul className="space-y-3">
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
      </article>
      <NewsletterBanner />
    </>
  );
}
