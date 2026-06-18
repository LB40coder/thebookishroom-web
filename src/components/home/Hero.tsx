import { Button } from "@/components/ui/Button";
import { images } from "@/lib/images";
import { CoverImage } from "@/components/ui/CoverImage";

export function Hero() {
  return (
    <section className="section-padding">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <p className="text-xs font-medium tracking-widest uppercase text-coffee mb-4">
              Find your next great read
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-ink leading-tight">
              Find your next favorite read.
            </h1>
            <p className="mt-4 text-coffee text-base md:text-lg leading-relaxed max-w-lg font-reading">
              Curated reading lists, timeless classics, and bookish inspiration
              to help you find your next favorite story.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/reading-lists" variant="primary">
                Explore Reading Lists
              </Button>
              <Button href="/book-finder" variant="outline">
                Find a Book for My Mood
              </Button>
            </div>
          </div>

          <div className="relative aspect-[4/3] rounded-sm overflow-hidden">
            <CoverImage
              src={images.hero}
              alt="Cozy bookshelf with classic books, a candle, and a potted plant"
              variant="hero"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
