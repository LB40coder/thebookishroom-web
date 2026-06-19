import { NextResponse } from "next/server";
import { prisma, isDatabaseConfigured } from "@/lib/db";
import { authorSchema, toAuthorCreateData } from "@/lib/validations/author";
import { apiError, parseJsonBody } from "@/lib/api/helpers";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!isDatabaseConfigured()) return apiError("Database not configured", 503);

  const body = await parseJsonBody(request);
  if (body instanceof NextResponse) return body;

  const parsed = authorSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  try {
    const existing = await prisma.author.findUnique({
      where: { slug: parsed.data.slug },
    });
    if (existing) return apiError("Slug already exists", 409);

    const author = await prisma.author.create({ data: toAuthorCreateData(parsed.data) });
    return NextResponse.json({ data: author }, { status: 201 });
  } catch {
    return apiError("Internal server error", 500);
  }
}
