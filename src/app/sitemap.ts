import type { MetadataRoute } from "next";
import { getAuthorSlugs } from "@/lib/data/authors";
import { getBookSlugs } from "@/lib/data/books";
import { getMoods } from "@/lib/data/moods";
import { getPostSlugs } from "@/lib/data/posts";
import { getSiteUrl } from "@/lib/site-url";
import { prisma, isDatabaseConfigured } from "@/lib/db";
import { publicPostFilter } from "@/lib/posts/visibility";

const STATIC_ROUTES: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}> = [
  { path: "/", changeFrequency: "daily", priority: 1 },
  { path: "/reading-lists", changeFrequency: "daily", priority: 0.9 },
  { path: "/books", changeFrequency: "weekly", priority: 0.9 },
  { path: "/authors", changeFrequency: "weekly", priority: 0.8 },
  { path: "/book-moods", changeFrequency: "weekly", priority: 0.8 },
  { path: "/book-finder", changeFrequency: "monthly", priority: 0.7 },
  { path: "/classics", changeFrequency: "monthly", priority: 0.7 },
  { path: "/about", changeFrequency: "monthly", priority: 0.5 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const now = new Date();

  const [postSlugs, bookSlugs, authorSlugs, moods] = await Promise.all([
    getPostSlugs(),
    getBookSlugs(),
    getAuthorSlugs(),
    getMoods(),
  ]);

  const postDates = isDatabaseConfigured()
    ? await prisma.post.findMany({
        where: publicPostFilter(),
        select: { slug: true, updatedAt: true, publishedAt: true },
      })
    : [];

  const postDateBySlug = new Map(
    postDates.map((post) => [
      post.slug,
      post.updatedAt ?? post.publishedAt ?? now,
    ])
  );

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: `${base}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const postEntries: MetadataRoute.Sitemap = postSlugs.map((slug) => ({
    url: `${base}/reading-lists/${slug}`,
    lastModified: postDateBySlug.get(slug) ?? now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const bookEntries: MetadataRoute.Sitemap = bookSlugs.map((slug) => ({
    url: `${base}/books/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const authorEntries: MetadataRoute.Sitemap = authorSlugs.map((slug) => ({
    url: `${base}/authors/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const moodEntries: MetadataRoute.Sitemap = moods.map((mood) => ({
    url: `${base}/book-moods/${mood.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [
    ...staticEntries,
    ...postEntries,
    ...bookEntries,
    ...authorEntries,
    ...moodEntries,
  ];
}
