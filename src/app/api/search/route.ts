import { NextResponse } from "next/server";
import { getMoods } from "@/lib/data/moods";
import { getPublishedAuthors } from "@/lib/data/authors";
import { prisma, isDatabaseConfigured } from "@/lib/db";
import { stripHtml } from "@/lib/utils";
import type { SearchResult } from "@/lib/search";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const q = new URL(request.url).searchParams.get("q")?.toLowerCase().trim();
  if (!q) return NextResponse.json({ data: [] });

  const results: SearchResult[] = [];

  if (isDatabaseConfigured()) {
    const [posts, books, authors] = await Promise.all([
      prisma.post.findMany({ where: { published: true } }),
      prisma.book.findMany({ where: { published: true } }),
      getPublishedAuthors(),
    ]);

    for (const post of posts) {
      const matches =
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q)) ||
        post.moods.some((m) => m.toLowerCase().includes(q));
      if (matches) {
        results.push({
          type: "post",
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          href: `/reading-lists/${post.slug}`,
        });
      }
    }

    for (const book of books) {
      const matches =
        book.title.toLowerCase().includes(q) ||
        book.author.toLowerCase().includes(q) ||
        book.genres.some((g) => g.toLowerCase().includes(q)) ||
        book.moods.some((m) => m.toLowerCase().includes(q));
      if (matches) {
        results.push({
          type: "book",
          title: book.title,
          slug: book.slug,
          excerpt: `by ${book.author}`,
          href: `/books/${book.slug}`,
        });
      }
    }

    for (const author of authors) {
      const matches =
        author.name.toLowerCase().includes(q) ||
        author.nationality.toLowerCase().includes(q);
      if (matches) {
        const excerpt = stripHtml(author.bio).slice(0, 120);
        results.push({
          type: "author",
          title: author.name,
          slug: author.slug,
          excerpt: excerpt ? `${excerpt}...` : author.nationality,
          href: `/authors/${author.slug}`,
        });
      }
    }
  }

  const moods = await getMoods();

  for (const mood of moods) {
    const matches =
      mood.name.toLowerCase().includes(q) ||
      mood.description.toLowerCase().includes(q);
    if (matches) {
      results.push({
        type: "mood",
        title: mood.name,
        slug: mood.slug,
        excerpt: mood.description,
        href: `/book-moods/${mood.slug}`,
      });
    }
  }

  return NextResponse.json({ data: results.slice(0, 20) });
}
