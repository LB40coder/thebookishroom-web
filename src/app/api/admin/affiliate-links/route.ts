import { NextResponse } from "next/server";
import {
  createAffiliateLink,
  getAffiliateLinks,
} from "@/lib/data/affiliate-links";
import { isDatabaseConfigured } from "@/lib/db";
import { apiError, parseJsonBody } from "@/lib/api/helpers";
import { affiliateLinkSchema } from "@/lib/validations/affiliate-link";

export const runtime = "nodejs";

export async function GET() {
  if (!isDatabaseConfigured()) return apiError("Database not configured", 503);

  try {
    const links = await getAffiliateLinks();
    return NextResponse.json({ data: links });
  } catch {
    return apiError("Internal server error", 500);
  }
}

export async function POST(request: Request) {
  if (!isDatabaseConfigured()) return apiError("Database not configured", 503);

  const body = await parseJsonBody(request);
  if (body instanceof NextResponse) return body;

  const parsed = affiliateLinkSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  try {
    const link = await createAffiliateLink({
      title: parsed.data.title.trim(),
      url: parsed.data.url.trim(),
      bookSlug: parsed.data.bookSlug || undefined,
      language: parsed.data.language,
      format: parsed.data.format,
    });
    return NextResponse.json({ data: link }, { status: 201 });
  } catch {
    return apiError("Could not create affiliate link", 409);
  }
}
