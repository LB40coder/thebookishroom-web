import type { NextRequest } from "next/server";
import { corsOptions, jsonWithCors } from "@/lib/cors";
import { getAuthorBySlug } from "@/lib/data/authors";
import { getPublishedBooksByAuthorSlug } from "@/lib/data/books";

export const runtime = "nodejs";

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function OPTIONS(request: NextRequest) {
  return corsOptions(request);
}

export async function GET(request: NextRequest, { params }: RouteContext) {
  const { slug } = await params;
  const { searchParams } = new URL(request.url);
  const includeBooks = searchParams.get("books") === "true";

  const author = await getAuthorBySlug(slug);
  if (!author) {
    return jsonWithCors({ error: "Not found" }, request, { status: 404 });
  }

  if (includeBooks) {
    const books = await getPublishedBooksByAuthorSlug(slug);
    return jsonWithCors({ data: { author, books } }, request);
  }

  return jsonWithCors({ data: author }, request);
}
