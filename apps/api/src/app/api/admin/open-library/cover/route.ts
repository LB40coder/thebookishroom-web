import { NextResponse } from "next/server";
import { findOpenLibraryCover } from "@/lib/open-library";
import { apiError } from "@/lib/api/helpers";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title")?.trim();
  const author = searchParams.get("author")?.trim();
  const yearParam = searchParams.get("year");
  const year = yearParam ? Number(yearParam) : undefined;

  if (!title || !author) {
    return apiError("title and author are required", 400);
  }

  const coverUrl = await findOpenLibraryCover(
    title,
    author,
    year && Number.isFinite(year) ? year : undefined
  );

  if (!coverUrl) {
    return NextResponse.json({ data: null }, { status: 404 });
  }

  return NextResponse.json({ data: { coverUrl } });
}
