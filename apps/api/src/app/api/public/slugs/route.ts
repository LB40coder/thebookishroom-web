import type { NextRequest } from "next/server";
import { corsOptions, jsonWithCors } from "@/lib/cors";
import { getBookSlugs } from "@/lib/data/books";
import { getPostSlugs } from "@/lib/data/posts";
import { getAuthorSlugs } from "@/lib/data/authors";
import { getMoods } from "@/lib/data/moods";

export const runtime = "nodejs";

export async function OPTIONS(request: NextRequest) {
  return corsOptions(request);
}

export async function GET(request: NextRequest) {
  const [books, posts, authors, moods] = await Promise.all([
    getBookSlugs(),
    getPostSlugs(),
    getAuthorSlugs(),
    getMoods(),
  ]);

  return jsonWithCors(
    {
      data: {
        books,
        posts,
        authors,
        moods: moods.map((m) => m.slug),
      },
    },
    request
  );
}
