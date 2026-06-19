import { NextResponse } from "next/server";
import { prisma, isDatabaseConfigured } from "@/lib/db";
import { postUpdateSchema } from "@/lib/validations/post";
import { apiError, logApiRequest, parseJsonBody } from "@/lib/api/helpers";
import { revalidatePostPages } from "@/lib/revalidate";

export const runtime = "nodejs";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  if (!isDatabaseConfigured()) return apiError("Database not configured", 503);

  const { id } = await params;

  try {
    const post = await prisma.post.findFirst({
      where: { OR: [{ id }, { slug: id }] },
    });
    if (!post) return apiError("Not found", 404);

    await logApiRequest(request, 200);
    return NextResponse.json({ data: post });
  } catch {
    return apiError("Internal server error", 500);
  }
}

export async function PUT(request: Request, { params }: RouteParams) {
  if (!isDatabaseConfigured()) return apiError("Database not configured", 503);

  const { id } = await params;
  const body = await parseJsonBody(request);
  if (body instanceof NextResponse) return body;

  const parsed = postUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  try {
    const existing = await prisma.post.findFirst({
      where: { OR: [{ id }, { slug: id }] },
    });
    if (!existing) return apiError("Not found", 404);

    if (parsed.data.slug && parsed.data.slug !== existing.slug) {
      const slugTaken = await prisma.post.findUnique({
        where: { slug: parsed.data.slug },
      });
      if (slugTaken) return apiError("Slug already exists", 409);
    }

    const { publishedAt, ...rest } = parsed.data;
    const post = await prisma.post.update({
      where: { id: existing.id },
      data: {
        ...rest,
        ...(publishedAt ? { publishedAt: new Date(publishedAt) } : {}),
      },
    });

    revalidatePostPages(post.slug);
    await logApiRequest(request, 200);
    return NextResponse.json({ data: post });
  } catch {
    return apiError("Internal server error", 500);
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  if (!isDatabaseConfigured()) return apiError("Database not configured", 503);

  const { id } = await params;

  try {
    const existing = await prisma.post.findFirst({
      where: { OR: [{ id }, { slug: id }] },
    });
    if (!existing) return apiError("Not found", 404);

    await prisma.post.delete({ where: { id: existing.id } });
    revalidatePostPages(existing.slug);
    await logApiRequest(request, 200);
    return NextResponse.json({ success: true });
  } catch {
    return apiError("Internal server error", 500);
  }
}
