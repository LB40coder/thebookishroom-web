import type { Post, ClassicGuide, Article } from "@/lib/types";
import { images } from "@/lib/images";

export const posts: Post[] = [
  {
    title: "10 Short Classics You Can Read in a Weekend",
    slug: "short-classics-you-can-read-in-a-weekend",
    excerpt:
      "Discover timeless literary masterpieces that won't take months to finish — perfect for busy readers who want to start exploring classics.",
    content: "",
    coverImage: images.classic,
    category: "Reading Lists",
    tags: ["short classics", "beginner classics", "classics"],
    moods: ["classics", "cozy"],
    relatedBooks: ["meditations", "white-nights"],
    publishedAt: "2026-03-15",
    updatedAt: "2026-03-15",
    readingTime: 8,
    views: 1842,
    seoTitle: "10 Short Classics You Can Read in a Weekend | The Bookish Room",
    seoDescription:
      "Short classic books you can finish in a weekend. Perfect for beginners exploring timeless literature.",
  },
  {
    title: "10 Books That Feel Like Dark Academia",
    slug: "books-that-feel-like-dark-academia",
    excerpt:
      "From secret societies to gothic libraries, these books capture the moody, intellectual aesthetic that dark academia fans crave.",
    content: "",
    coverImage: images.gothic,
    category: "Reading Lists",
    tags: ["dark academia", "gothic"],
    moods: ["dark-academia", "gothic"],
    relatedBooks: ["frankenstein", "the-picture-of-dorian-gray"],
    publishedAt: "2026-03-10",
    updatedAt: "2026-03-10",
    readingTime: 10,
    views: 3215,
    seoTitle: "10 Books That Feel Like Dark Academia | The Bookish Room",
    seoDescription:
      "The best dark academia books for readers who love scholarly secrets, gothic campuses, and intellectual obsession.",
  },
  {
    title: "10 Books to Read on a Rainy Night",
    slug: "books-to-read-on-a-rainy-night",
    excerpt:
      "Curl up with these atmospheric reads perfect for stormy evenings, a warm blanket, and a cup of tea.",
    content: "",
    coverImage: images.rainy,
    category: "Reading Lists",
    tags: ["rainy day reads", "cozy", "emotional books"],
    moods: ["rainy-day", "cozy"],
    relatedBooks: ["white-nights", "pride-and-prejudice"],
    publishedAt: "2026-03-05",
    updatedAt: "2026-03-05",
    readingTime: 9,
    views: 2678,
    seoTitle: "10 Books to Read on a Rainy Night | The Bookish Room",
    seoDescription:
      "Cozy, atmospheric books perfect for rainy nights. Curated reading recommendations for gray-sky days.",
  },
];

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
    slug: "10-beginner-friendly-classics",
    title: "10 Beginner-Friendly Classics",
    description: "Accessible classics that won't feel like homework.",
    image: images.books,
  },
  {
    slug: "short-classics-weekend",
    title: "Short Classics for a Weekend",
    description: "Timeless reads you can finish in a few sittings.",
    image: images.books,
  },
  {
    slug: "where-to-start-dostoevsky",
    title: "Where to Start With Dostoevsky",
    description: "A reading guide for one of literature's greatest minds.",
    image: images.gothic,
  },
];

export const articles: Article[] = [
  {
    slug: "how-to-build-a-reading-habit",
    title: "How to Build a Reading Habit That Sticks",
    excerpt:
      "Practical tips for making reading a daily ritual you'll actually enjoy.",
    coverImage: images.article,
    category: "Reading Tips",
    publishedAt: "2026-03-12",
  },
  {
    slug: "cozy-reading-nook-ideas",
    title: "5 Cozy Reading Nook Ideas for Small Spaces",
    excerpt: "Transform any corner into the perfect bookish retreat.",
    coverImage: images.cozy,
    category: "Lifestyle",
    publishedAt: "2026-03-08",
  },
  {
    slug: "classic-books-not-boring",
    title: "Classic Books That Don't Feel Boring",
    excerpt:
      "Dispelling the myth that classics are dry — these page-turners prove otherwise.",
    coverImage: images.classic,
    category: "Classics",
    publishedAt: "2026-03-01",
  },
  {
    slug: "books-for-beautiful-writing",
    title: "12 Books for People Who Love Beautiful Writing",
    excerpt:
      "Lyrical prose, stunning metaphors, and sentences worth savoring.",
    coverImage: images.books,
    category: "Reading Lists",
    publishedAt: "2026-02-25",
  },
];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getPostsByMood(mood: string): Post[] {
  return posts.filter((p) => p.moods.includes(mood));
}

export function getPostsByTag(tag: string): Post[] {
  return posts.filter((p) => p.tags.includes(tag));
}

export function getTrendingPosts(limit = 5): Post[] {
  return [...posts].sort((a, b) => b.views - a.views).slice(0, limit);
}
