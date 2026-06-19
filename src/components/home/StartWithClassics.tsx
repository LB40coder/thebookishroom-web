import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { classicGuides } from "@/lib/data/classics-content";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CoverImage } from "@/components/ui/CoverImage";

export function StartWithClassics() {
  const featured = classicGuides.find((g) => g.featured)!;
  const guides = classicGuides.filter((g) => !g.featured);

  return (
    <section className="section-padding bg-cream-dark/50">
      <div className="section-container">
        <SectionHeading title="Start With Classics" withLines />

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-cream rounded-sm overflow-hidden border border-coffee/10">
            <div className="relative aspect-[16/9]">
              <CoverImage
                src={featured.image}
                alt={featured.title}
                variant="featured"
              />
            </div>
            <div className="p-6">
              <h3 className="font-serif text-xl text-ink">{featured.title}</h3>
              <p className="mt-2 text-sm text-coffee leading-relaxed">
                {featured.description}
              </p>
              <Button
                href="/classics"
                variant="primary"
                className="mt-4"
              >
                Explore the Guide
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {guides.map((guide) => (
              <Link
                key={guide.slug}
                href="/reading-lists"
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
                  <h4 className="font-serif text-base text-ink group-hover:text-burgundy transition-colors">
                    {guide.title}
                  </h4>
                  <p className="text-sm text-coffee truncate">
                    {guide.description}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-coffee group-hover:text-burgundy shrink-0 transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
