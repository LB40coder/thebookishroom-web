import { Hero } from "@/components/home/Hero";
import { BrowseByMood } from "@/components/home/BrowseByMood";
import { FeaturedReadingLists } from "@/components/home/FeaturedReadingLists";
import { StartWithClassics } from "@/components/home/StartWithClassics";
import { PopularAuthors } from "@/components/home/PopularAuthors";
import { BookFinderCTA } from "@/components/home/BookFinderCTA";
import { LatestArticles } from "@/components/home/LatestArticles";
import { NewsletterBanner } from "@/components/home/NewsletterBanner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BrowseByMood />
      <FeaturedReadingLists />
      <StartWithClassics />
      <PopularAuthors />
      <BookFinderCTA />
      <LatestArticles />
      <NewsletterBanner />
    </>
  );
}
