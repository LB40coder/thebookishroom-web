import type { Mood as PrismaMood } from "@prisma/client";
import type { Mood } from "@/lib/types";
import { prisma, isDatabaseConfigured, isMissingPrismaTableError } from "@/lib/db";
import { DEFAULT_MOODS } from "@/lib/data/taxonomy-defaults";

function toMood(row: PrismaMood): Mood {
  return {
    slug: row.slug,
    name: row.name,
    description: row.description,
    icon: row.icon,
  };
}

export async function ensureDefaultMoodsSeeded(): Promise<void> {
  if (!isDatabaseConfigured()) return;

  await Promise.all(
    DEFAULT_MOODS.map((mood) =>
      prisma.mood.upsert({
        where: { slug: mood.slug },
        create: mood,
        update: {
          name: mood.name,
          description: mood.description,
        },
      })
    )
  );
}

export async function getMoods(): Promise<Mood[]> {
  if (!isDatabaseConfigured()) return DEFAULT_MOODS;

  try {
    await ensureDefaultMoodsSeeded();

    const rows = await prisma.mood.findMany({
      orderBy: { name: "asc" },
    });

    return rows.map(toMood);
  } catch (error) {
    if (isMissingPrismaTableError(error)) return DEFAULT_MOODS;
    throw error;
  }
}

export async function getMoodBySlug(slug: string): Promise<Mood | undefined> {
  const moods = await getMoods();
  return moods.find((mood) => mood.slug === slug);
}

export async function createMood(input: {
  name: string;
  slug: string;
  description?: string;
  icon?: string;
}): Promise<Mood> {
  const row = await prisma.mood.create({
    data: {
      name: input.name,
      slug: input.slug,
      description: input.description ?? "",
      icon: input.icon ?? "book-open",
    },
  });

  return toMood(row);
}

export async function updateMood(
  id: string,
  input: {
    name?: string;
    description?: string;
    icon?: string;
  }
): Promise<Mood> {
  const row = await prisma.mood.update({
    where: { id },
    data: input,
  });

  return toMood(row);
}
