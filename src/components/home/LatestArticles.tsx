import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getPublishedPosts } from "@/lib/data/posts";
import { formatDate } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CoverImage } from "@/components/ui/CoverImage";

export async function LatestArticles() {
  const articles = await getPublishedPosts({
    category: "Reading Tips",
    limit: 4,
  });

  if (articles.length === 0) return null;

  return (
    <section className="section-padding bg-cream-dark/50">
      <div className="section-container">
        <SectionHeading title="Latest Articles" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((article) => (
            <article key={article.slug} className="group">
              <Link href={`/reading-lists/${article.slug}`}>
                <div className="relative aspect-[16/10] rounded-sm overflow-hidden mb-3">
                  <CoverImage
                    src={article.coverImage}
                    alt={article.title}
                    variant="card-post"
                    className="group-hover:scale-[1.02] transition-transform duration-300"
                  />
                </div>
                <p className="text-xs text-coffee">
                  {formatDate(article.publishedAt)} ·{" "}
                  <span className="text-burgundy">{article.category}</span>
                </p>
                <h3 className="mt-1.5 font-serif text-base text-ink group-hover:text-burgundy transition-colors leading-snug">
                  {article.title}
                </h3>
                <span className="mt-2 inline-flex items-center gap-1 text-sm text-burgundy font-medium">
                  Read more
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
