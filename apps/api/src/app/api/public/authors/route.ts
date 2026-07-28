import type { NextRequest } from "next/server";
import { corsOptions, jsonWithCors } from "@/lib/cors";
import {
  getPublishedAuthors,
  getPublishedAuthorsWithBookCounts,
} from "@/lib/data/authors";

export const runtime = "nodejs";

export async function OPTIONS(request: NextRequest) {
  return corsOptions(request);
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const withCounts = searchParams.get("withCounts") === "true";

  const authors = withCounts
    ? await getPublishedAuthorsWithBookCounts()
    : await getPublishedAuthors();

  return jsonWithCors({ data: authors }, request);
}
