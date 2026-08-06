import { HomePostsSection } from "@/components/home/HomePostsSection";
import { BrowseByMood } from "@/components/home/BrowseByMood";
import { StartWithClassics } from "@/components/home/StartWithClassics";
import { PopularAuthors } from "@/components/home/PopularAuthors";
import { BookFinderCTA } from "@/components/home/BookFinderCTA";

export const revalidate = 86400;

export default function HomePage() {
  return (
    <>
      <HomePostsSection />
      <BrowseByMood />
      <StartWithClassics />
      <PopularAuthors />
      <BookFinderCTA />
    </>
  );
}
