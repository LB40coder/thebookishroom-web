export type Difficulty = "beginner" | "intermediate" | "advanced";
export type Length = "short" | "medium" | "long";
export type BookLanguage = "en" | "pt" | "es";

export interface AmazonEdition {
  language: BookLanguage;
  label: string;
  url: string;
  format?: "paperback" | "kindle" | "hardcover";
}

export interface Post {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  moods: string[];
  relatedBooks: string[];
  publishedAt: string;
  updatedAt: string;
  readingTime: number;
  views: number;
  seoTitle: string;
  seoDescription: string;
}

export interface Book {
  title: string;
  slug: string;
  author: string;
  authorSlug: string;
  year: number;
  genres: string[];
  moods: string[];
  difficulty: Difficulty;
  length: Length;
  description: string;
  whyRead: string;
  whoIsItFor: string;
  estimatedReadingTime: string;
  similarBooks: string[];
  amazonEditions?: AmazonEdition[];
  coverImage?: string;
}

export interface Author {
  name: string;
  slug: string;
  bio: string;
  nationality: string;
  birthYear?: number;
  deathYear?: number;
  mainBooks: string[];
  whereToStart: string;
  readingOrder?: string[];
  image?: string;
}

export interface Mood {
  slug: string;
  name: string;
  description: string;
  icon: string;
}

export interface ClassicGuide {
  slug: string;
  title: string;
  description: string;
  image: string;
  featured?: boolean;
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  category: string;
  publishedAt: string;
}
