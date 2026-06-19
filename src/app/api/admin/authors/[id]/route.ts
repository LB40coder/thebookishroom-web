import { NextResponse } from "next/server";
import { prisma, isDatabaseConfigured } from "@/lib/db";
import { authorUpdateSchema, toAuthorUpdateData } from "@/lib/validations/author";
import { apiError, parseJsonBody } from "@/lib/api/helpers";

export const runtime = "nodejs";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PUT(request: Request, { params }: RouteParams) {
  if (!isDatabaseConfigured()) return apiError("Database not configured", 503);

  const { id } = await params;
  const body = await parseJsonBody(request);
  if (body instanceof NextResponse) return body;

  const parsed = authorUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  if (parsed.data.slug) {
    const existing = await prisma.author.findFirst({
      where: { slug: parsed.data.slug, NOT: { id } },
    });
    if (existing) return apiError("Slug already exists", 409);
  }

  try {
    const author = await prisma.author.update({
      where: { id },
      data: toAuthorUpdateData(parsed.data),
    });
    return NextResponse.json({ data: author });
  } catch {
    return apiError("Not found", 404);
  }
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  if (!isDatabaseConfigured()) return apiError("Database not configured", 503);

  const { id } = await params;

  try {
    await prisma.author.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return apiError("Not found", 404);
  }
}
