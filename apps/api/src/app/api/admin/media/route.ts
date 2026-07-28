import { NextResponse } from "next/server";
import { prisma, isDatabaseConfigured } from "@/lib/db";
import { uploadImage } from "@/lib/media/storage";
import { mediaCreateSchema } from "@/lib/validations/media";
import { apiError } from "@/lib/api/helpers";

export const runtime = "nodejs";

export async function GET() {
  if (!isDatabaseConfigured()) return apiError("Database not configured", 503);

  try {
    const media = await prisma.media.findMany({
      orderBy: { createdAt: "desc" },
      take: 200,
    });
    return NextResponse.json({ data: media });
  } catch {
    return apiError("Internal server error", 500);
  }
}

export async function POST(request: Request) {
  if (!isDatabaseConfigured()) return apiError("Database not configured", 503);

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return apiError("No file provided", 400);
    }

    const uploaded = await uploadImage(file);
    const alt = formData.get("alt");
    const parsed = mediaCreateSchema.safeParse({
      ...uploaded,
      alt: typeof alt === "string" && alt.trim() ? alt.trim() : undefined,
    });

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const media = await prisma.media.create({ data: parsed.data });
    return NextResponse.json({ data: media }, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Upload failed";
    return apiError(message, 400);
  }
}
