import type { NextRequest } from "next/server";
import { corsOptions, jsonWithCors } from "@/lib/cors";
import { getPublishedBooks } from "@/lib/data/books";

export const runtime = "nodejs";

export async function OPTIONS(request: NextRequest) {
  return corsOptions(request);
}

export async function GET(request: NextRequest) {
  const books = await getPublishedBooks();
  return jsonWithCors({ data: books }, request);
}
