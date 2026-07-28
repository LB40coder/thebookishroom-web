import type { Post } from "@/lib/types";
import { apiFetch } from "@/lib/api";

export async function getPublishedPosts(options?: {
  mood?: string;
  tag?: string;
  category?: string;
  excludeSlug?: string;
  limit?: number;
}): Promise<Post[]> {
  return (
    (await apiFetch<Post[]>("/api/public/posts", {
      searchParams: {
        mood: options?.mood,
        tag: options?.tag,
        category: options?.category,
        excludeSlug: options?.excludeSlug,
        limit: options?.limit?.toString(),
      },
    })) ?? []
  );
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return apiFetch<Post>(`/api/public/posts/${slug}`);
}

export async function getPostsByMood(mood: string): Promise<Post[]> {
  return getPublishedPosts({ mood });
}

export async function getPostsByTag(tag: string): Promise<Post[]> {
  return getPublishedPosts({ tag });
}

export async function getPostsByRelatedBook(bookSlug: string): Promise<Post[]> {
  return (
    (await apiFetch<Post[]>("/api/public/posts", {
      searchParams: { relatedBook: bookSlug },
    })) ?? []
  );
}

export async function getPostsByRelatedBooks(
  bookSlugs: string[],
  limit = 6
): Promise<Post[]> {
  if (!bookSlugs.length) return [];

  const results = await Promise.all(
    bookSlugs.map((slug) => getPostsByRelatedBook(slug))
  );

  const seen = new Set<string>();
  const merged: Post[] = [];

  for (const posts of results) {
    for (const post of posts) {
      if (!seen.has(post.slug)) {
        seen.add(post.slug);
        merged.push(post);
      }
    }
  }

  return merged
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .slice(0, limit);
}

export async function getTrendingPosts(limit = 5): Promise<Post[]> {
  return (
    (await apiFetch<Post[]>("/api/public/posts", {
      searchParams: { trending: "true", limit: limit.toString() },
    })) ?? []
  );
}

export async function getPostSlugs(): Promise<string[]> {
  const slugs = await apiFetch<{ posts: string[] }>("/api/public/slugs");
  return slugs?.posts ?? [];
}
