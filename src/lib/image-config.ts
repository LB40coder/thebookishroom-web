export type CoverImageVariant =
  | "thumb"
  | "avatar"
  | "card-book"
  | "card-post"
  | "featured"
  | "detail-book"
  | "detail-post"
  | "hero";

export const IMAGE_DEFAULT_QUALITY = 75;

export const IMAGE_VARIANTS: Record<
  CoverImageVariant,
  { sizes: string; quality: number }
> = {
  thumb: { sizes: "96px", quality: 70 },
  avatar: { sizes: "112px", quality: 75 },
  "card-book": {
    sizes: "(max-width: 640px) 50vw, 25vw",
    quality: 75,
  },
  "card-post": {
    sizes: "(max-width: 768px) 100vw, 33vw",
    quality: 75,
  },
  featured: {
    sizes: "(max-width: 1024px) 100vw, 50vw",
    quality: 80,
  },
  "detail-book": {
    sizes: "(max-width: 1024px) 100vw, 400px",
    quality: 80,
  },
  "detail-post": {
    sizes: "(max-width: 768px) 100vw, 768px",
    quality: 80,
  },
  hero: {
    sizes: "(max-width: 1024px) 100vw, 50vw",
    quality: 80,
  },
};

function isLocalOrSvg(src: string): boolean {
  return src.startsWith("/") || src.toLowerCase().endsWith(".svg");
}

/** Downgrade known heavy CDN URLs before Next.js optimization. */
export function optimizeCoverUrl(
  src: string,
  variant: CoverImageVariant
): string {
  if (!src || isLocalOrSvg(src)) return src;

  try {
    const url = new URL(src);

    if (url.hostname === "covers.openlibrary.org") {
      const size =
        variant === "thumb" ? "S" : variant === "detail-book" ? "M" : "M";
      url.pathname = url.pathname.replace(/-[LSM]\.jpg$/i, `-${size}.jpg`);
      return url.toString();
    }
  } catch {
    return src;
  }

  return src;
}

export function shouldSkipImageOptimization(src: string): boolean {
  return isLocalOrSvg(src);
}
