import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getPublishedPosts } from "@/lib/data/posts";
import { PostCard } from "@/components/cards/PostCard";
import { Button } from "@/components/ui/Button";
import { Hero } from "@/components/home/Hero";

export async function HomePostsSection() {
  const posts = await getPublishedPosts({ limit: 9 });

  if (posts.length === 0) {
    return <Hero />;
  }

  const [featured, ...gridPosts] = posts;

  return (
    <section className="section-padding">
      <div className="section-container">
        <header className="mb-10 md:mb-12">
          <p className="editorial-kicker">The Bookish Room</p>
          <div className="mt-3 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl text-ink leading-tight">
                Latest reads
              </h1>
              <p className="mt-2 text-coffee font-reading max-w-xl">
                Reading lists, essays, and bookish inspiration — fresh from
                the journal.
              </p>
            </div>
            <Button href="/reading-lists" variant="outline" className="shrink-0">
              View all posts
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </header>

        <div className="mb-10 md:mb-12 pb-10 md:pb-12 border-b border-coffee/10">
          <PostCard post={featured} variant="featured" />
        </div>

        {gridPosts.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {gridPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}

        <div className="mt-10 md:mt-12 text-center">
          <Button href="/reading-lists" variant="burgundy">
            Browse the journal
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
