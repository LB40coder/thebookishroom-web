import type { ClassicGuide } from "@/lib/types";
import { images } from "@/lib/images";

export const classicGuides: ClassicGuide[] = [
  {
    slug: "why-read-the-classics",
    title: "Why Read the Classics?",
    description:
      "A gentle introduction to classic literature — why these books still matter, and how to enjoy them without feeling overwhelmed.",
    image: images.classic,
    featured: true,
  },
  {
    slug: "beginner-classics",
    title: "10 Beginner-Friendly Classics",
    description: "Accessible classics that won't feel like homework.",
    image: images.books,
  },
  {
    slug: "short-classics",
    title: "Short Classics for a Weekend",
    description: "Timeless reads you can finish in a few sittings.",
    image: images.books,
  },
  {
    slug: "dostoevsky",
    title: "Where to Start With Dostoevsky",
    description: "A reading guide for one of literature's greatest minds.",
    image: images.gothic,
  },
];
