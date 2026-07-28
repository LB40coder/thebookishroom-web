import type { NextRequest } from "next/server";
import { corsOptions, jsonWithCors } from "@/lib/cors";
import { getMoodBySlug } from "@/lib/data/moods";

export const runtime = "nodejs";

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function OPTIONS(request: NextRequest) {
  return corsOptions(request);
}

export async function GET(request: NextRequest, { params }: RouteContext) {
  const { slug } = await params;
  const mood = await getMoodBySlug(slug);
  if (!mood) {
    return jsonWithCors({ error: "Not found" }, request, { status: 404 });
  }
  return jsonWithCors({ data: mood }, request);
}
