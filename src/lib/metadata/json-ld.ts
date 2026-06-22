import { absoluteUrl } from "@/lib/site-url";

const SITE_NAME = "The Bookish Room";
const LOGO_URL = absoluteUrl("/images/logo.png");

type JsonLdValue = Record<string, unknown>;

export function websiteJsonLd(): JsonLdValue {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: absoluteUrl("/"),
    description:
      "Discover books by mood, aesthetic, genre, and timeless literary appeal.",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: LOGO_URL,
      },
    },
  };
}

export function articleJsonLd(input: {
  title: string;
  description: string;
  path: string;
  image?: string;
  publishedAt: string;
  updatedAt?: string;
}): JsonLdValue {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    image: input.image ? absoluteUrl(input.image) : undefined,
    datePublished: input.publishedAt,
    dateModified: input.updatedAt ?? input.publishedAt,
    mainEntityOfPage: absoluteUrl(input.path),
    author: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: LOGO_URL,
      },
    },
  };
}

export function bookJsonLd(input: {
  title: string;
  author: string;
  description: string;
  path: string;
  year: number;
  image?: string;
  genres?: string[];
}): JsonLdValue {
  return {
    "@context": "https://schema.org",
    "@type": "Book",
    name: input.title,
    author: {
      "@type": "Person",
      name: input.author,
    },
    datePublished: String(input.year),
    description: input.description,
    image: input.image ? absoluteUrl(input.image) : undefined,
    url: absoluteUrl(input.path),
    genre: input.genres?.length ? input.genres : undefined,
  };
}

export function personJsonLd(input: {
  name: string;
  description: string;
  path: string;
  image?: string;
  nationality?: string;
  birthYear?: number;
  deathYear?: number;
}): JsonLdValue {
  const birthDate = input.birthYear
    ? `${input.birthYear}-01-01`
    : undefined;
  const deathDate = input.deathYear
    ? `${input.deathYear}-01-01`
    : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: input.name,
    description: input.description,
    image: input.image ? absoluteUrl(input.image) : undefined,
    url: absoluteUrl(input.path),
    nationality: input.nationality || undefined,
    birthDate,
    deathDate,
  };
}

export function breadcrumbJsonLd(
  items: Array<{ name: string; path: string }>
): JsonLdValue {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
