import { NextResponse } from "next/server";
import { isDatabaseConfigured, prisma } from "@/lib/db";
import { apiError, parseJsonBody } from "@/lib/api/helpers";
import { affiliateLinkUpdateSchema } from "@/lib/validations/affiliate-link";

export const runtime = "nodejs";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PUT(request: Request, { params }: RouteParams) {
  if (!isDatabaseConfigured()) return apiError("Database not configured", 503);

  const { id } = await params;
  const body = await parseJsonBody(request);
  if (body instanceof NextResponse) return body;

  const parsed = affiliateLinkUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  try {
    const link = await prisma.affiliateLink.update({
      where: { id },
      data: {
        ...parsed.data,
        bookSlug: parsed.data.bookSlug === "" ? null : parsed.data.bookSlug,
      },
    });
    return NextResponse.json({ data: link });
  } catch {
    return apiError("Not found", 404);
  }
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  if (!isDatabaseConfigured()) return apiError("Database not configured", 503);

  const { id } = await params;

  try {
    await prisma.affiliateLink.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return apiError("Not found", 404);
  }
}
