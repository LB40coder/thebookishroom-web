import type { Mood } from "@/lib/types";

export const moods: Mood[] = [
  {
    slug: "dark-academia",
    name: "Dark Academia",
    description: "Scholarly secrets, gothic campuses, and intellectual obsession.",
    icon: "graduation-cap",
  },
  {
    slug: "cozy",
    name: "Cozy",
    description: "Warm blankets, tea, and gentle stories for quiet moments.",
    icon: "coffee",
  },
  {
    slug: "gothic",
    name: "Gothic",
    description: "Atmospheric tales of mystery, decay, and the supernatural.",
    icon: "castle",
  },
  {
    slug: "romantic",
    name: "Romantic",
    description: "Love letters, longing glances, and heartfelt connections.",
    icon: "heart",
  },
  {
    slug: "rainy-day",
    name: "Rainy Day",
    description: "Perfect reads for gray skies and a cup of something warm.",
    icon: "cloud-rain",
  },
  {
    slug: "inspiring",
    name: "Inspiring",
    description: "Stories that uplift, motivate, and expand your perspective.",
    icon: "sparkles",
  },
  {
    slug: "classics",
    name: "Classics",
    description: "Timeless literature that has shaped generations of readers.",
    icon: "book-open",
  },
  {
    slug: "mystery",
    name: "Mystery",
    description: "Puzzles to solve, secrets to uncover, and twists to savor.",
    icon: "search",
  },
];

export function getMoodBySlug(slug: string): Mood | undefined {
  return moods.find((m) => m.slug === slug);
}
