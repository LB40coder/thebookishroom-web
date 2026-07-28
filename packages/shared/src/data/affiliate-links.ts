import type { AffiliateLink as PrismaAffiliateLink } from "@prisma/client";
import type { AffiliateLink } from "@/lib/types";
import { prisma, isDatabaseConfigured } from "@/lib/db";

function toAffiliateLink(row: PrismaAffiliateLink): AffiliateLink {
  return {
    id: row.id,
    title: row.title,
    url: row.url,
    bookSlug: row.bookSlug ?? undefined,
    language: row.language ?? undefined,
    format: row.format ?? undefined,
  };
}

export async function getAffiliateLinks(): Promise<AffiliateLink[]> {
  if (!isDatabaseConfigured()) return [];

  const rows = await prisma.affiliateLink.findMany({
    orderBy: [{ bookSlug: "asc" }, { title: "asc" }],
  });

  return rows.map(toAffiliateLink);
}

export async function getAffiliateLinksForBook(
  bookSlug: string
): Promise<AffiliateLink[]> {
  const links = await getAffiliateLinks();
  return links.filter((link) => !link.bookSlug || link.bookSlug === bookSlug);
}

export async function getAffiliateLinksForBooks(
  bookSlugs: string[]
): Promise<AffiliateLink[]> {
  const links = await getAffiliateLinks();
  const slugSet = new Set(bookSlugs);

  return links.filter(
    (link) => !link.bookSlug || slugSet.has(link.bookSlug)
  );
}

export async function createAffiliateLink(input: {
  title: string;
  url: string;
  bookSlug?: string;
  language?: string;
  format?: string;
}): Promise<AffiliateLink> {
  const row = await prisma.affiliateLink.create({
    data: {
      title: input.title,
      url: input.url,
      bookSlug: input.bookSlug || null,
      language: input.language || null,
      format: input.format || null,
    },
  });

  return toAffiliateLink(row);
}
