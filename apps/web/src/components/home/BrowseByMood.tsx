import { ArrowRight } from "lucide-react";
import { getMoods } from "@/lib/data/moods";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { MoodCarousel } from "@/components/home/MoodCarousel";

export async function BrowseByMood() {
  const moods = await getMoods();

  if (moods.length === 0) return null;

  return (
    <section className="section-padding bg-cream-dark/50">
      <div className="section-container">
        <SectionHeading title="Browse by Mood" />
        <MoodCarousel moods={moods} />
        <div className="mt-8 flex justify-center">
          <Button href="/book-moods" variant="burgundy">
            View all moods
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
