import type { Book } from "@/lib/types";
import { apiFetch } from "@/lib/api";

export async function getPublishedBooks(): Promise<Book[]> {
  return (await apiFetch<Book[]>("/api/public/books")) ?? [];
}

export async function getBookBySlug(slug: string): Promise<Book | null> {
  return apiFetch<Book>(`/api/public/books/${slug}`);
}

export async function getBooksBySlugs(slugs: string[]): Promise<Book[]> {
  if (!slugs.length) return [];
  return (
    (await apiFetch<Book[]>("/api/public/books/filter", {
      searchParams: { slugs: slugs.join(",") },
    })) ?? []
  );
}

export async function getPublishedBooksByAuthorSlug(
  authorSlug: string
): Promise<Book[]> {
  const result = await apiFetch<{ author: unknown; books: Book[] }>(
    `/api/public/authors/${authorSlug}`,
    { searchParams: { books: "true" } }
  );
  return result?.books ?? [];
}

export async function filterPublishedBooks(filters: {
  mood?: string;
  genre?: string;
  length?: string;
  difficulty?: string;
}): Promise<Book[]> {
  return (
    (await apiFetch<Book[]>("/api/public/books/filter", {
      searchParams: filters,
    })) ?? []
  );
}

export async function getBookSlugs(): Promise<string[]> {
  const slugs = await apiFetch<{
    books: string[];
  }>("/api/public/slugs");
  return slugs?.books ?? [];
}
