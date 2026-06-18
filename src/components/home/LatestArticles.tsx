import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { articles } from "@/lib/data/posts";
import { formatDate } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function LatestArticles() {
  return (
    <section className="section-padding bg-cream-dark/50">
      <div className="section-container">
        <SectionHeading title="Latest Articles" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((article) => (
            <article key={article.slug} className="group">
              <Link href={`/reading-lists/${article.slug}`}>
                <div className="relative aspect-[16/10] rounded-sm overflow-hidden mb-3">
                  <Image
                    src={article.coverImage}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, 25vw"
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
