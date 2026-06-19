import type { Author as PrismaAuthor } from "@prisma/client";
import { parseBookLinks } from "@/lib/authors/book-links";
import type { Author } from "@/lib/types";
import { prisma, isDatabaseConfigured } from "@/lib/db";

export type AuthorWithBookCount = Author & { bookCount: number };

function toAuthor(row: PrismaAuthor): Author {
  return {
    name: row.name,
    slug: row.slug,
    bio: row.bio,
    nationality: row.nationality,
    birthYear: row.birthYear ?? undefined,
    deathYear: row.deathYear ?? undefined,
    mainBooks: parseBookLinks(row.mainBooks),
    whereToStart: row.whereToStart,
    readingOrder: parseBookLinks(row.readingOrder),
    image: row.image ?? undefined,
  };
}

export async function getPublishedAuthors(): Promise<Author[]> {
  if (!isDatabaseConfigured()) return [];

  const rows = await prisma.author.findMany({
    where: { published: true },
    orderBy: { name: "asc" },
  });

  return rows.map(toAuthor);
}

export async function getPublishedAuthorsWithBookCounts(): Promise<
  AuthorWithBookCount[]
> {
  if (!isDatabaseConfigured()) return [];

  const [authors, bookCounts] = await Promise.all([
    prisma.author.findMany({
      where: { published: true },
      orderBy: { name: "asc" },
    }),
    prisma.book.groupBy({
      by: ["authorSlug"],
      where: { published: true },
      _count: { _all: true },
    }),
  ]);

  const countBySlug = new Map(
    bookCounts.map((row) => [row.authorSlug, row._count._all])
  );

  return authors.map((row) => ({
    ...toAuthor(row),
    bookCount: countBySlug.get(row.slug) ?? 0,
  }));
}

export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  if (!isDatabaseConfigured()) return null;

  const row = await prisma.author.findFirst({
    where: { slug, published: true },
  });

  return row ? toAuthor(row) : null;
}

export async function getAuthorSlugs(): Promise<string[]> {
  if (!isDatabaseConfigured()) return [];

  const rows = await prisma.author.findMany({
    where: { published: true },
    select: { slug: true },
    orderBy: { name: "asc" },
  });

  return rows.map((row) => row.slug);
}
