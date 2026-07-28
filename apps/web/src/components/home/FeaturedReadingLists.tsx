import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getPublishedPosts } from "@/lib/data/posts";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CoverImage } from "@/components/ui/CoverImage";

export async function FeaturedReadingLists() {
  const featured = await getPublishedPosts({ limit: 3 });

  if (featured.length === 0) return null;

  return (
    <section className="section-padding">
      <div className="section-container">
        <SectionHeading title="Featured Reading Lists" withLines />

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {featured.map((post) => (
            <article key={post.slug} className="group">
              <Link href={`/reading-lists/${post.slug}`}>
                <div className="relative aspect-[16/10] rounded-sm overflow-hidden mb-4">
                  <CoverImage
                    src={post.coverImage}
                    alt={post.title}
                    variant="card-post"
                    className="group-hover:scale-[1.02] transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 bg-forest text-cream text-[10px] font-medium tracking-wider uppercase px-2 py-1 rounded-sm">
                    Reading List
                  </span>
                </div>
                <h3 className="font-serif text-lg text-ink group-hover:text-burgundy transition-colors">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-coffee leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm text-burgundy font-medium">
                  View the list
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
