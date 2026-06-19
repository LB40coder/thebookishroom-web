import { NextResponse } from "next/server";
import { getPublishedBooks } from "@/lib/data/books";

export const runtime = "nodejs";

export async function GET() {
  const books = await getPublishedBooks();
  return NextResponse.json({ data: books });
}
