import type { NextRequest } from "next/server";
import { corsOptions, jsonWithCors } from "@/lib/cors";
import { getBooksBySlugs, filterPublishedBooks } from "@/lib/data/books";

export const runtime = "nodejs";

export async function OPTIONS(request: NextRequest) {
  return corsOptions(request);
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slugs = searchParams.get("slugs")?.split(",").filter(Boolean);
  const mood = searchParams.get("mood") ?? undefined;
  const genre = searchParams.get("genre") ?? undefined;
  const length = searchParams.get("length") ?? undefined;
  const difficulty = searchParams.get("difficulty") ?? undefined;

  if (slugs?.length) {
    const books = await getBooksBySlugs(slugs);
    return jsonWithCors({ data: books }, request);
  }

  const books = await filterPublishedBooks({ mood, genre, length, difficulty });
  return jsonWithCors({ data: books }, request);
}
