import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getPublishedPosts } from "@/lib/data/posts";
import { PostCard } from "@/components/cards/PostCard";
import { SectionHeading } from "@/components/ui/SectionHeading";

export async function EditorialFeed() {
  const posts = await getPublishedPosts({ limit: 7 });
  const feedPosts = posts.slice(4);

  if (feedPosts.length === 0) return null;

  return (
    <section className="section-padding bg-cream-dark/40">
      <div className="section-container">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <SectionHeading
            title="From the journal"
            subtitle="Essays, reading lists, and literary notes"
            centered={false}
            className="mb-0"
          />
          <Link
            href="/reading-lists"
            className="shrink-0 inline-flex items-center gap-1.5 text-sm text-burgundy font-medium hover:underline"
          >
            Browse all articles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="flex flex-col gap-10 md:gap-12">
          {feedPosts.map((post) => (
            <PostCard key={post.slug} post={post} variant="horizontal" />
          ))}
        </div>
      </div>
    </section>
  );
}
