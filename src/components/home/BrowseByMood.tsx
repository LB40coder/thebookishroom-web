import { getMoods } from "@/lib/data/moods";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MoodCarousel } from "@/components/home/MoodCarousel";

export async function BrowseByMood() {
  const moods = await getMoods();

  return (
    <section className="section-padding bg-cream-dark/50">
      <div className="section-container">
        <SectionHeading title="Browse by Mood" />
        <div className="px-8 md:px-10">
          <MoodCarousel moods={moods} />
        </div>
      </div>
    </section>
  );
}
