import type { BookLanguage } from "@/lib/types";

export const AMAZON_LANGUAGES: {
  value: BookLanguage;
  label: string;
}[] = [
  { value: "en", label: "English" },
  { value: "pt", label: "Portuguese" },
  { value: "es", label: "Spanish" },
  { value: "de", label: "German" },
  { value: "fr", label: "French" },
  { value: "it", label: "Italian" },
];

export const EDITION_LABELS: Record<BookLanguage, string> = {
  en: "English Edition",
  pt: "Portuguese Edition",
  es: "Spanish Edition",
  de: "German Edition",
  fr: "French Edition",
  it: "Italian Edition",
};

export const AMAZON_LANGUAGE_ORDER: Record<BookLanguage, number> = {
  en: 0,
  pt: 1,
  es: 2,
  de: 3,
  fr: 4,
  it: 5,
};

export function editionLabelForLanguage(language: BookLanguage): string {
  return EDITION_LABELS[language];
}

export function createAmazonEdition(
  language: BookLanguage = "en"
): {
  language: BookLanguage;
  label: string;
  url: string;
  format?: "paperback" | "kindle" | "hardcover";
} {
  return {
    language,
    label: editionLabelForLanguage(language),
    url: "https://",
  };
}
