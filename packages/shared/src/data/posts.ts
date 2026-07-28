import type { Post as PrismaPost } from "@prisma/client";
import type { Post } from "@/lib/types";
import { publicPostFilter } from "@/lib/posts/visibility";
import { prisma, isDatabaseConfigured } from "@/lib/db";

function toPost(row: PrismaPost): Post {
  return {
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    content: row.content,
    coverImage: row.coverImage,
    category: row.category,
    tags: row.tags,
    moods: row.moods,
    relatedBooks: row.relatedBooks,
    publishedAt: row.publishedAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
    readingTime: row.readingTime,
    views: row.views,
    seoTitle: row.seoTitle,
    seoDescription: row.seoDescription,
  };
}

export async function getPublishedPosts(options?: {
  mood?: string;
  tag?: string;
  category?: string;
  excludeSlug?: string;
  limit?: number;
}): Promise<Post[]> {
  if (!isDatabaseConfigured()) return [];

  const rows = await prisma.post.findMany({
    where: {
      ...publicPostFilter(),
      ...(options?.mood ? { moods: { has: options.mood } } : {}),
      ...(options?.tag ? { tags: { has: options.tag } } : {}),
      ...(options?.category ? { category: options.category } : {}),
      ...(options?.excludeSlug ? { slug: { not: options.excludeSlug } } : {}),
    },
    orderBy: { publishedAt: "desc" },
    ...(options?.limit ? { take: options.limit } : {}),
  });

  return rows.map(toPost);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (!isDatabaseConfigured()) return null;

  const row = await prisma.post.findFirst({
    where: { slug, ...publicPostFilter() },
  });

  return row ? toPost(row) : null;
}

export async function getPostsByMood(mood: string): Promise<Post[]> {
  return getPublishedPosts({ mood });
}

export async function getPostsByTag(tag: string): Promise<Post[]> {
  return getPublishedPosts({ tag });
}

export async function getPostsByRelatedBook(bookSlug: string): Promise<Post[]> {
  if (!isDatabaseConfigured()) return [];

  const rows = await prisma.post.findMany({
    where: {
      ...publicPostFilter(),
      relatedBooks: { has: bookSlug },
    },
    orderBy: { publishedAt: "desc" },
  });

  return rows.map(toPost);
}

export async function getTrendingPosts(limit = 5): Promise<Post[]> {
  if (!isDatabaseConfigured()) return [];

  const rows = await prisma.post.findMany({
    where: publicPostFilter(),
    orderBy: [{ views: "desc" }, { publishedAt: "desc" }],
    take: limit,
  });

  return rows.map(toPost);
}

export async function getPostSlugs(): Promise<string[]> {
  if (!isDatabaseConfigured()) return [];

  const rows = await prisma.post.findMany({
    where: publicPostFilter(),
    select: { slug: true },
    orderBy: { publishedAt: "desc" },
  });

  return rows.map((row) => row.slug);
}
