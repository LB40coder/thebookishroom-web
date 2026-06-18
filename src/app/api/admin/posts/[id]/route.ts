import { NextResponse } from "next/server";
import { prisma, isDatabaseConfigured } from "@/lib/db";
import { postUpdateSchema } from "@/lib/validations/post";
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

  const parsed = postUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  try {
    const post = await prisma.post.update({
      where: { id },
      data: parsed.data,
    });
    return NextResponse.json({ data: post });
  } catch {
    return apiError("Not found", 404);
  }
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  if (!isDatabaseConfigured()) return apiError("Database not configured", 503);

  const { id } = await params;

  try {
    await prisma.post.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return apiError("Not found", 404);
  }
}
