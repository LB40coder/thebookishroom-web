import { NextResponse } from "next/server";
import { createGenre, getGenres } from "@/lib/data/genres";
import { normalizeGenreSlug } from "@/lib/data/taxonomy-defaults";
import { isDatabaseConfigured } from "@/lib/db";
import { apiError, parseJsonBody } from "@/lib/api/helpers";
import { genreCreateSchema } from "@/lib/validations/taxonomy";

export const runtime = "nodejs";

export async function GET() {
  if (!isDatabaseConfigured()) return apiError("Database not configured", 503);

  try {
    const genres = await getGenres();
    return NextResponse.json({ data: genres });
  } catch {
    return apiError("Internal server error", 500);
  }
}

export async function POST(request: Request) {
  if (!isDatabaseConfigured()) return apiError("Database not configured", 503);

  const body = await parseJsonBody(request);
  if (body instanceof NextResponse) return body;

  const parsed = genreCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const slug = parsed.data.slug ?? normalizeGenreSlug(parsed.data.name);
  if (!slug) return apiError("Invalid genre name", 400);

  try {
    const genre = await createGenre({
      name: parsed.data.name.trim(),
      slug,
    });
    return NextResponse.json({ data: genre }, { status: 201 });
  } catch {
    return apiError("Genre already exists or could not be created", 409);
  }
}
