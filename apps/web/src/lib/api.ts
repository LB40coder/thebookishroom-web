const DEFAULT_REVALIDATE = 3600;
const PRODUCTION_API_URL = "https://api.thebookishroom.com";

function getApiUrl(): string {
  const url =
    process.env.API_URL ??
    process.env.NEXT_PUBLIC_API_URL ??
    (process.env.NODE_ENV === "development"
      ? "http://localhost:3457"
      : PRODUCTION_API_URL);
  return url.replace(/\/$/, "");
}

interface FetchOptions {
  revalidate?: number | false;
  searchParams?: Record<string, string | undefined>;
}

export async function apiFetch<T>(
  path: string,
  options: FetchOptions = {}
): Promise<T> {
  const { revalidate = DEFAULT_REVALIDATE, searchParams } = options;
  const url = new URL(`${getApiUrl()}${path}`);

  if (searchParams) {
    for (const [key, value] of Object.entries(searchParams)) {
      if (value !== undefined) url.searchParams.set(key, value);
    }
  }

  try {
    const res = await fetch(url.toString(), {
      next: revalidate === false ? { revalidate: 0 } : { revalidate },
    });

    if (!res.ok) {
      if (res.status === 404) return null as T;
      console.warn(`API warning ${res.status}: ${path}`);
      return null as T;
    }

    const json = await res.json();
    return json.data as T;
  } catch (error) {
    console.warn(`API fetch failed: ${path}`, error);
    return null as T;
  }
}

export { getApiUrl };
