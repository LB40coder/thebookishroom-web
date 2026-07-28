import type { Author } from "@/lib/types";
import { apiFetch } from "@/lib/api";

export type AuthorWithBookCount = Author & { bookCount: number };

export async function getPublishedAuthors(): Promise<Author[]> {
  return (await apiFetch<Author[]>("/api/public/authors")) ?? [];
}

export async function getPublishedAuthorsWithBookCounts(): Promise<
  AuthorWithBookCount[]
> {
  return (
    (await apiFetch<AuthorWithBookCount[]>("/api/public/authors", {
      searchParams: { withCounts: "true" },
    })) ?? []
  );
}

export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  return apiFetch<Author>(`/api/public/authors/${slug}`);
}

export async function getAuthorSlugs(): Promise<string[]> {
  const slugs = await apiFetch<{ authors: string[] }>("/api/public/slugs");
  return slugs?.authors ?? [];
}
