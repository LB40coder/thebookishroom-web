import type { NextRequest } from "next/server";
import { corsOptions, jsonWithCors } from "@/lib/cors";
import { getBookBySlug } from "@/lib/data/books";

export const runtime = "nodejs";

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function OPTIONS(request: NextRequest) {
  return corsOptions(request);
}

export async function GET(request: NextRequest, { params }: RouteContext) {
  const { slug } = await params;
  const book = await getBookBySlug(slug);
  if (!book) {
    return jsonWithCors({ error: "Not found" }, request, { status: 404 });
  }
  return jsonWithCors({ data: book }, request);
}
