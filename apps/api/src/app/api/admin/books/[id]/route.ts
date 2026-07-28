import { NextResponse } from "next/server";
import { prisma, isDatabaseConfigured } from "@/lib/db";
import { bookUpdateSchema } from "@/lib/validations/book";
import { apiError, parseJsonBody } from "@/lib/api/helpers";
import { revalidateBookPages } from "@/lib/revalidate";

export const runtime = "nodejs";

interface RouteParams {
  params: Promise<{ id: string }>;
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

  if (parsed.data.slug) {
    const existing = await prisma.book.findFirst({
      where: { slug: parsed.data.slug, NOT: { id } },
    });
    if (existing) return apiError("Slug already exists", 409);
  }

  try {
    const book = await prisma.book.update({
      where: { id },
      data: {
        ...parsed.data,
        amazonEditions: parsed.data.amazonEditions ?? undefined,
      },
    });
    revalidateBookPages(book.slug);
    return NextResponse.json({ data: book });
  } catch {
    return apiError("Not found", 404);
  }
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  if (!isDatabaseConfigured()) return apiError("Database not configured", 503);

  const { id } = await params;

  try {
    const existing = await prisma.book.findFirst({
      where: { OR: [{ id }, { slug: id }] },
    });
    if (!existing) return apiError("Not found", 404);

    await prisma.book.delete({ where: { id: existing.id } });
    revalidateBookPages(existing.slug);
    return NextResponse.json({ success: true });
  } catch {
    return apiError("Not found", 404);
  }
}
