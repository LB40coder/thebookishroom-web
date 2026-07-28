import type { NextRequest } from "next/server";
import { corsOptions, jsonWithCors } from "@/lib/cors";
import {
  getPublishedPosts,
  getTrendingPosts,
  getPostsByMood,
  getPostsByRelatedBook,
} from "@/lib/data/posts";

export const runtime = "nodejs";

export async function OPTIONS(request: NextRequest) {
  return corsOptions(request);
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const mood = searchParams.get("mood") ?? undefined;
  const tag = searchParams.get("tag") ?? undefined;
  const category = searchParams.get("category") ?? undefined;
  const excludeSlug = searchParams.get("excludeSlug") ?? undefined;
  const limit = searchParams.get("limit");
  const trending = searchParams.get("trending");
  const relatedBook = searchParams.get("relatedBook") ?? undefined;

  let posts;
  if (trending) {
    posts = await getTrendingPosts(limit ? parseInt(limit, 10) : 5);
  } else if (relatedBook) {
    posts = await getPostsByRelatedBook(relatedBook);
  } else if (mood) {
    posts = await getPostsByMood(mood);
  } else {
    posts = await getPublishedPosts({
      mood,
      tag,
      category,
      excludeSlug,
      limit: limit ? parseInt(limit, 10) : undefined,
    });
  }

  return jsonWithCors({ data: posts }, request);
}
