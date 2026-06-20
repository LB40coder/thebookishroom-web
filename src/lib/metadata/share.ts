import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site-url";

interface ShareMetadataInput {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article" | "profile";
}

export function buildShareMetadata({
  title,
  description,
  path,
  image,
  type = "website",
}: ShareMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = image ? absoluteUrl(image) : undefined;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type,
      siteName: "The Bookish Room",
      images: imageUrl ? [{ url: imageUrl, alt: title }] : undefined,
    },
    twitter: {
      card: imageUrl ? "summary_large_image" : "summary",
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}
