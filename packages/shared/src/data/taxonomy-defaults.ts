import type { Genre, Mood } from "@/lib/types";
import { slugify } from "@/lib/utils";

export const DEFAULT_GENRES: Genre[] = [
  { slug: "philosophy", name: "Philosophy" },
  { slug: "classics", name: "Classics" },
  { slug: "gothic", name: "Gothic" },
  { slug: "science-fiction", name: "Science Fiction" },
  { slug: "romance", name: "Romance" },
  { slug: "mystery", name: "Mystery" },
  { slug: "fantasy", name: "Fantasy" },
  { slug: "historical-fiction", name: "Historical Fiction" },
  { slug: "literary-fiction", name: "Literary Fiction" },
  { slug: "poetry", name: "Poetry" },
  { slug: "drama", name: "Drama" },
  { slug: "horror", name: "Horror" },
];

export const DEFAULT_MOODS: Mood[] = [
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

export function formatGenreName(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function normalizeGenreSlug(value: string): string {
  return slugify(value.replace(/\s+/g, "-"));
}
