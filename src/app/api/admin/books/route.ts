import { NextResponse } from "next/server";
import { prisma, isDatabaseConfigured } from "@/lib/db";
import { bookSchema } from "@/lib/validations/book";
import { apiError, parseJsonBody } from "@/lib/api/helpers";
import { revalidateBookPages } from "@/lib/revalidate";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!isDatabaseConfigured()) return apiError("Database not configured", 503);

  const body = await parseJsonBody(request);
  if (body instanceof NextResponse) return body;

  const parsed = bookSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  try {
    const existing = await prisma.book.findUnique({
      where: { slug: parsed.data.slug },
    });
    if (existing) return apiError("Slug already exists", 409);

    const book = await prisma.book.create({
      data: {
        ...parsed.data,
        amazonEditions: parsed.data.amazonEditions ?? undefined,
      },
    });
    revalidateBookPages(book.slug);
    return NextResponse.json({ data: book }, { status: 201 });
  } catch {
    return apiError("Internal server error", 500);
  }
}
