import { BlogHero } from "@/components/home/BlogHero";
import { EditorialFeed } from "@/components/home/EditorialFeed";
import { BrowseByMood } from "@/components/home/BrowseByMood";
import { StartWithClassics } from "@/components/home/StartWithClassics";
import { PopularAuthors } from "@/components/home/PopularAuthors";
import { BookFinderCTA } from "@/components/home/BookFinderCTA";
import { NewsletterBanner } from "@/components/home/NewsletterBanner";

export const revalidate = 86400;

export default function HomePage() {
  return (
    <>
      <BlogHero />
      <EditorialFeed />
      <BrowseByMood />
      <StartWithClassics />
      <PopularAuthors />
      <BookFinderCTA />
      <NewsletterBanner />
    </>
  );
}
