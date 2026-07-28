import type { NextRequest } from "next/server";
import { corsOptions, jsonWithCors } from "@/lib/cors";
import { getPostBySlug } from "@/lib/data/posts";

export const runtime = "nodejs";

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function OPTIONS(request: NextRequest) {
  return corsOptions(request);
}

export async function GET(request: NextRequest, { params }: RouteContext) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return jsonWithCors({ error: "Not found" }, request, { status: 404 });
  }
  return jsonWithCors({ data: post }, request);
}
