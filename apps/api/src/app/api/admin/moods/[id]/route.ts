import { NextResponse } from "next/server";
import { updateMood } from "@/lib/data/moods";
import { isDatabaseConfigured } from "@/lib/db";
import { apiError, parseJsonBody } from "@/lib/api/helpers";
import { moodUpdateSchema } from "@/lib/validations/taxonomy";

export const runtime = "nodejs";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PUT(request: Request, { params }: RouteParams) {
  if (!isDatabaseConfigured()) return apiError("Database not configured", 503);

  const { id } = await params;
  const body = await parseJsonBody(request);
  if (body instanceof NextResponse) return body;

  const parsed = moodUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  try {
    const mood = await updateMood(id, parsed.data);
    return NextResponse.json({ data: mood });
  } catch {
    return apiError("Not found", 404);
  }
}
