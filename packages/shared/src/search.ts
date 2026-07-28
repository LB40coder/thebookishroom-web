export interface SearchResult {
  type: "post" | "book" | "author" | "mood";
  title: string;
  slug: string;
  excerpt: string;
  href: string;
}
