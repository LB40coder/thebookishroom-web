import { NextResponse } from "next/server";
import { createMood, getMoods } from "@/lib/data/moods";
import { normalizeGenreSlug } from "@/lib/data/taxonomy-defaults";
import { isDatabaseConfigured } from "@/lib/db";
import { apiError, parseJsonBody } from "@/lib/api/helpers";
import { moodCreateSchema } from "@/lib/validations/taxonomy";

export const runtime = "nodejs";

export async function GET() {
  if (!isDatabaseConfigured()) return apiError("Database not configured", 503);

  try {
    const moods = await getMoods();
    return NextResponse.json({ data: moods });
  } catch {
    return apiError("Internal server error", 500);
  }
}

export async function POST(request: Request) {
  if (!isDatabaseConfigured()) return apiError("Database not configured", 503);

  const body = await parseJsonBody(request);
  if (body instanceof NextResponse) return body;

  const parsed = moodCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const slug = parsed.data.slug ?? normalizeGenreSlug(parsed.data.name);
  if (!slug) return apiError("Invalid mood name", 400);

  try {
    const mood = await createMood({
      name: parsed.data.name.trim(),
      slug,
      description: parsed.data.description,
      icon: parsed.data.icon,
    });
    return NextResponse.json({ data: mood }, { status: 201 });
  } catch {
    return apiError("Mood already exists or could not be created", 409);
  }
}
