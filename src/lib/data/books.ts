import type { Book, AmazonEdition, Difficulty, Length } from "@/lib/types";
import type { Book as PrismaBook } from "@prisma/client";
import { prisma, isDatabaseConfigured } from "@/lib/db";

function toBook(row: PrismaBook): Book {
  return {
    title: row.title,
    slug: row.slug,
    author: row.author,
    authorSlug: row.authorSlug,
    year: row.year,
    genres: row.genres,
    moods: row.moods,
    difficulty: row.difficulty as Difficulty,
    length: row.length as Length,
    description: row.description,
    whyRead: row.whyRead,
    whoIsItFor: row.whoIsItFor,
    estimatedReadingTime: row.estimatedReadingTime,
    similarBooks: row.similarBooks,
    coverImage: row.coverImage?.trim() || undefined,
    amazonEditions: (row.amazonEditions as AmazonEdition[] | null) ?? undefined,
  };
}

export async function getPublishedBooks(): Promise<Book[]> {
  if (!isDatabaseConfigured()) return [];

  const rows = await prisma.book.findMany({
    where: { published: true },
    orderBy: { title: "asc" },
  });

  return rows.map(toBook);
}

export async function getBookBySlug(slug: string): Promise<Book | null> {
  if (!isDatabaseConfigured()) return null;

  const row = await prisma.book.findFirst({
    where: { slug, published: true },
  });

  return row ? toBook(row) : null;
}

export async function getBooksBySlugs(slugs: string[]): Promise<Book[]> {
  if (!slugs.length || !isDatabaseConfigured()) return [];

  const rows = await prisma.book.findMany({
    where: { slug: { in: slugs }, published: true },
  });

  return rows.map(toBook);
}

export async function getPublishedBooksByAuthorSlug(
  authorSlug: string
): Promise<Book[]> {
  if (!isDatabaseConfigured()) return [];

  const rows = await prisma.book.findMany({
    where: { authorSlug, published: true },
    orderBy: { year: "desc" },
  });

  return rows.map(toBook);
}

export async function filterPublishedBooks(filters: {
  mood?: string;
  genre?: string;
  length?: string;
  difficulty?: string;
}): Promise<Book[]> {
  const books = await getPublishedBooks();

  return books.filter((book) => {
    if (filters.mood && !book.moods.includes(filters.mood)) return false;
    if (filters.genre && !book.genres.includes(filters.genre)) return false;
    if (filters.length && book.length !== filters.length) return false;
    if (filters.difficulty && book.difficulty !== filters.difficulty)
      return false;
    return true;
  });
}

export async function getBookSlugs(): Promise<string[]> {
  if (!isDatabaseConfigured()) return [];

  const rows = await prisma.book.findMany({
    where: { published: true },
    select: { slug: true },
    orderBy: { title: "asc" },
  });

  return rows.map((row) => row.slug);
}
