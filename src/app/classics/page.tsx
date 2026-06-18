import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { classicGuides } from "@/lib/data/posts";
import { Button } from "@/components/ui/Button";
import { CoverImage } from "@/components/ui/CoverImage";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Classics",
  description:
    "Guides to classic literature for beginners. Learn where to start, which classics to read first, and how to enjoy timeless books.",
};

export default function ClassicsPage() {
  const featured = classicGuides.find((g) => g.featured)!;
  const guides = classicGuides.filter((g) => !g.featured);

  return (
    <div className="section-padding">
      <div className="section-container">
        <header className="max-w-2xl mb-10">
          <h1 className="text-3xl md:text-4xl font-serif text-ink">
            Start With Classics
          </h1>
          <p className="mt-3 text-coffee leading-relaxed">
            Classic literature doesn&apos;t have to feel intimidating. Our guides
            help you discover where to begin, which books to read first, and how
            to fall in love with timeless stories.
          </p>
        </header>

        <div className="bg-cream rounded-sm overflow-hidden border border-coffee/10 mb-12">
          <div className="grid lg:grid-cols-2">
            <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[300px]">
              <CoverImage
                src={featured.image}
                alt={featured.title}
                variant="featured"
              />
              <span className="absolute top-4 left-4 bg-forest text-cream text-[10px] font-medium tracking-wider uppercase px-2 py-1 rounded-sm">
                Featured Guide
              </span>
            </div>
            <div className="p-6 md:p-8 flex flex-col justify-center">
              <h2 className="font-serif text-2xl text-ink">{featured.title}</h2>
              <p className="mt-3 text-coffee leading-relaxed">
                {featured.description}
              </p>
              <Button href="/reading-lists" variant="primary" className="mt-6 w-fit">
                Explore the Guide
              </Button>
            </div>
          </div>
        </div>

        <h2 className="font-serif text-xl text-ink mb-6">Classic Reading Guides</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/reading-lists/${guide.slug}`}
              className="group flex items-center gap-4 p-4 bg-cream rounded-sm border border-coffee/10 hover:border-coffee/25 transition-colors"
            >
              <div className="relative w-16 h-16 rounded-sm overflow-hidden shrink-0">
                <CoverImage
                  src={guide.image}
                  alt={guide.title}
                  variant="thumb"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-serif text-base text-ink group-hover:text-burgundy transition-colors">
                  {guide.title}
                </h3>
                <p className="text-sm text-coffee line-clamp-2">
                  {guide.description}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-coffee group-hover:text-burgundy shrink-0" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
