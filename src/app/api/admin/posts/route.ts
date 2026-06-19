import { NextResponse } from "next/server";
import { prisma, isDatabaseConfigured } from "@/lib/db";
import { postSchema, postUpdateSchema } from "@/lib/validations/post";
import { apiError, parseJsonBody } from "@/lib/api/helpers";
import { revalidatePostPages } from "@/lib/revalidate";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!isDatabaseConfigured()) return apiError("Database not configured", 503);

  const body = await parseJsonBody(request);
  if (body instanceof NextResponse) return body;

  const parsed = postSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  try {
    const existing = await prisma.post.findUnique({
      where: { slug: parsed.data.slug },
    });
    if (existing) return apiError("Slug already exists", 409);

    const post = await prisma.post.create({
      data: {
        ...parsed.data,
        publishedAt: parsed.data.publishedAt
          ? new Date(parsed.data.publishedAt)
          : new Date(),
      },
    });
    revalidatePostPages(post.slug);
    return NextResponse.json({ data: post }, { status: 201 });
  } catch {
    return apiError("Internal server error", 500);
  }
}
