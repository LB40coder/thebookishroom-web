const OPEN_LIBRARY_SEARCH = "https://openlibrary.org/search.json";
const USER_AGENT = "TheBookishRoom/1.0 (https://www.thebookishroom.com)";

interface OpenLibrarySearchDoc {
  cover_i?: number;
  title?: string;
  author_name?: string[];
  first_publish_year?: number;
}

interface OpenLibrarySearchResponse {
  docs?: OpenLibrarySearchDoc[];
}

export function openLibraryCoverUrl(
  coverId: number,
  size: "S" | "M" | "L" = "L"
): string {
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
}

/**
 * Finds a cover image URL via the free Open Library API (no API key required).
 */
export async function findOpenLibraryCover(
  title: string,
  author: string,
  year?: number
): Promise<string | null> {
  const trimmedTitle = title.trim();
  const trimmedAuthor = author.trim();
  if (!trimmedTitle || !trimmedAuthor) return null;

  const params = new URLSearchParams({
    title: trimmedTitle,
    author: trimmedAuthor,
    limit: "3",
    fields: "cover_i,title,author_name,first_publish_year",
  });

  if (year && year > 0) {
    params.set("first_publish_year", String(year));
  }

  try {
    const res = await fetch(`${OPEN_LIBRARY_SEARCH}?${params}`, {
      headers: { "User-Agent": USER_AGENT },
      next: { revalidate: 60 * 60 * 24 * 7 },
    });

    if (!res.ok) return null;

    const data = (await res.json()) as OpenLibrarySearchResponse;
    const doc =
      data.docs?.find((entry) => entry.cover_i) ?? data.docs?.[0];

    if (!doc?.cover_i) return null;

    return openLibraryCoverUrl(doc.cover_i, "L");
  } catch {
    return null;
  }
}

export async function resolveBookCoverImage(
  coverImage: string | undefined,
  title: string,
  author: string,
  year: number
): Promise<string | undefined> {
  if (coverImage?.trim()) return coverImage.trim();
  const fromOpenLibrary = await findOpenLibraryCover(title, author, year);
  return fromOpenLibrary ?? undefined;
}
