import type { AuthorBookLink } from "@/lib/types";
import type { Book } from "@/lib/types";

export function parseBookLink(stored: string): AuthorBookLink | null {
  const trimmed = stored.trim();
  if (!trimmed) return null;

  if (trimmed.startsWith("{")) {
    try {
      const parsed = JSON.parse(trimmed) as { title?: unknown; url?: unknown };
      if (typeof parsed.title === "string" && parsed.title.trim()) {
        return {
          title: parsed.title.trim(),
          url: typeof parsed.url === "string" ? parsed.url.trim() : "",
        };
      }
    } catch {
      // fall through to plain string
    }
  }

  return { title: trimmed, url: "" };
}

export function parseBookLinks(stored: string[]): AuthorBookLink[] {
  return stored
    .map(parseBookLink)
    .filter((link): link is AuthorBookLink => link !== null);
}

export function serializeBookLink(link: AuthorBookLink): string {
  return JSON.stringify({
    title: link.title.trim(),
    url: link.url.trim(),
  });
}

export function bookLinksToStorage(links: AuthorBookLink[]): string[] {
  return links
    .filter((link) => link.title.trim())
    .map(serializeBookLink);
}

export function resolveBookLinkTitle(
  link: AuthorBookLink,
  authorBooks: Book[]
): string {
  const matched = authorBooks.find((book) => book.slug === link.title);
  return matched?.title ?? link.title;
}

export function resolveBookLinkHref(
  link: AuthorBookLink,
  authorBooks: Book[]
): string | null {
  if (link.url) return link.url;

  const matched = authorBooks.find((book) => book.slug === link.title);
  if (matched) return `/books/${matched.slug}`;

  return null;
}
