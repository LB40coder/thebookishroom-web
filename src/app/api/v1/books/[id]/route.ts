import { NextResponse } from "next/server";
import { prisma, isDatabaseConfigured } from "@/lib/db";
import { bookUpdateSchema } from "@/lib/validations/book";
import { apiError, logApiRequest, parseJsonBody } from "@/lib/api/helpers";

export const runtime = "nodejs";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  if (!isDatabaseConfigured()) return apiError("Database not configured", 503);

  const { id } = await params;

  try {
    const book = await prisma.book.findFirst({
      where: { OR: [{ id }, { slug: id }] },
    });
    if (!book) return apiError("Not found", 404);
    return NextResponse.json({ data: book });
  } catch {
    return apiError("Internal server error", 500);
  }
}

export async function PUT(request: Request, { params }: RouteParams) {
  if (!isDatabaseConfigured()) return apiError("Database not configured", 503);

  const { id } = await params;
  const body = await parseJsonBody(request);
  if (body instanceof NextResponse) return body;

  const parsed = bookUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  try {
    const existing = await prisma.book.findFirst({
      where: { OR: [{ id }, { slug: id }] },
    });
    if (!existing) return apiError("Not found", 404);

    const book = await prisma.book.update({
      where: { id: existing.id },
      data: parsed.data,
    });

    await logApiRequest(request, 200);
    return NextResponse.json({ data: book });
  } catch {
    return apiError("Internal server error", 500);
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  if (!isDatabaseConfigured()) return apiError("Database not configured", 503);

  const { id } = await params;

  try {
    const existing = await prisma.book.findFirst({
      where: { OR: [{ id }, { slug: id }] },
    });
    if (!existing) return apiError("Not found", 404);

    await prisma.book.delete({ where: { id: existing.id } });
    return NextResponse.json({ success: true });
  } catch {
    return apiError("Internal server error", 500);
  }
}
