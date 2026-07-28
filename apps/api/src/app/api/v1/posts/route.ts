import { NextResponse } from "next/server";
import { prisma, isDatabaseConfigured } from "@/lib/db";
import { postSchema } from "@/lib/validations/post";
import { apiError, logApiRequest, parseJsonBody } from "@/lib/api/helpers";
import { rateLimit, getClientIp } from "@/lib/auth/rate-limit";
import { revalidatePostPages } from "@/lib/revalidate";

export const runtime = "nodejs";

export async function GET(request: Request) {
  if (!isDatabaseConfigured()) {
    return apiError("Database not configured", 503);
  }

  try {
    const { searchParams } = new URL(request.url);
    const published = searchParams.get("published");

    const posts = await prisma.post.findMany({
      where:
        published === "true"
          ? { published: true }
          : published === "false"
            ? { published: false }
            : undefined,
      orderBy: { updatedAt: "desc" },
    });

    await logApiRequest(request, 200);
    return NextResponse.json({ data: posts });
  } catch {
    await logApiRequest(request, 500);
    return apiError("Internal server error", 500);
  }
}

export async function POST(request: Request) {
  if (!isDatabaseConfigured()) {
    return apiError("Database not configured", 503);
  }

  const ip = getClientIp(request);
  const { allowed } = rateLimit(`api-post-create:${ip}`, {
    limit: 30,
    windowMs: 60_000,
  });
  if (!allowed) return apiError("Too many requests", 429);

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
    await logApiRequest(request, 201);
    return NextResponse.json({ data: post }, { status: 201 });
  } catch {
    await logApiRequest(request, 500);
    return apiError("Internal server error", 500);
  }
}
