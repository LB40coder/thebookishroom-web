import { getSiteUrl } from "@/lib/site-url";

/** Hex key hosted at /{key}.txt — no external signup required for IndexNow. */
export const INDEXNOW_KEY =
  process.env.INDEXNOW_KEY?.trim() || "8f3c2a1b9e4d6f7c";

const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

function getHost(): string {
  return new URL(getSiteUrl()).host;
}

export function indexNowKeyLocation(): string {
  return `${getSiteUrl()}/${INDEXNOW_KEY}.txt`;
}

/**
 * Notifies Bing, Yandex, and other IndexNow partners about new or updated URLs.
 * Fire-and-forget — failures are logged but never block publishing.
 */
export async function submitIndexNow(urls: string[]): Promise<void> {
  const unique = [...new Set(urls.filter(Boolean))];
  if (unique.length === 0) return;

  const host = getHost();
  const body = {
    host,
    key: INDEXNOW_KEY,
    keyLocation: indexNowKeyLocation(),
    urlList: unique.slice(0, 10_000),
  };

  try {
    const res = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      console.warn(`IndexNow submission failed (${res.status})`);
    }
  } catch (error) {
    console.warn("IndexNow submission error:", error);
  }
}

export function notifySearchEngines(urls: string[]): void {
  void submitIndexNow(urls);
}
