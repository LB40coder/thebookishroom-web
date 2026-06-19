import type { Genre as PrismaGenre } from "@prisma/client";
import type { Genre } from "@/lib/types";
import { prisma, isDatabaseConfigured } from "@/lib/db";
import { DEFAULT_GENRES } from "@/lib/data/taxonomy-defaults";

function toGenre(row: PrismaGenre): Genre {
  return {
    slug: row.slug,
    name: row.name,
  };
}

export async function ensureDefaultGenresSeeded(): Promise<void> {
  if (!isDatabaseConfigured()) return;

  await Promise.all(
    DEFAULT_GENRES.map((genre) =>
      prisma.genre.upsert({
        where: { slug: genre.slug },
        create: genre,
        update: { name: genre.name },
      })
    )
  );
}

export async function getGenres(): Promise<Genre[]> {
  if (!isDatabaseConfigured()) return DEFAULT_GENRES;

  await ensureDefaultGenresSeeded();

  const rows = await prisma.genre.findMany({
    orderBy: { name: "asc" },
  });

  return rows.map(toGenre);
}

export async function createGenre(input: {
  name: string;
  slug: string;
}): Promise<Genre> {
  const row = await prisma.genre.create({
    data: input,
  });

  return toGenre(row);
}

export async function getGenreBySlug(slug: string): Promise<Genre | undefined> {
  const genres = await getGenres();
  return genres.find((genre) => genre.slug === slug);
}
