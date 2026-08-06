import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getPublishedPosts } from "@/lib/data/posts";
import { PostCard } from "@/components/cards/PostCard";
import { Hero } from "@/components/home/Hero";

export async function BlogHero() {
  const posts = await getPublishedPosts({ limit: 4 });

  if (posts.length === 0) {
    return <Hero />;
  }

  const [featured, ...recent] = posts;

  return (
    <section className="section-padding border-b border-coffee/10">
      <div className="section-container">
        <header className="text-center mb-10 md:mb-12">
          <p className="editorial-kicker">The Bookish Room</p>
          <h1 className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl text-ink leading-tight max-w-3xl mx-auto">
            Stories, lists &amp; literary discoveries
          </h1>
          <p className="mt-4 text-coffee font-reading text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Curated reading for every mood — essays, recommendations, and
            bookish inspiration from a cozy corner of the internet.
          </p>
        </header>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-8">
            <PostCard post={featured} variant="featured" />
          </div>

          <aside className="lg:col-span-4 lg:border-l lg:border-coffee/15 lg:pl-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-lg text-ink">Recent reads</h2>
              <Link
                href="/reading-lists"
                className="text-xs text-burgundy hover:underline font-medium inline-flex items-center gap-1"
              >
                View all
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="flex flex-col gap-6 divide-y divide-coffee/10">
              {recent.map((post) => (
                <PostCard key={post.slug} post={post} variant="compact" className="pt-6 first:pt-0" />
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
