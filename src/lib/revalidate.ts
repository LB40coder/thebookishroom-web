import { revalidatePath } from "next/cache";
import { notifySearchEngines } from "@/lib/indexnow";
import { absoluteUrl } from "@/lib/site-url";

export function revalidateBookPages(slug: string) {
  revalidatePath(`/books/${slug}`);
  revalidatePath("/books");
  revalidatePath("/book-finder");
  revalidatePath("/");
  notifySearchEngines([
    absoluteUrl(`/books/${slug}`),
    absoluteUrl("/books"),
    absoluteUrl("/sitemap.xml"),
  ]);
}

export function revalidateAuthorPages(slug: string) {
  revalidatePath(`/authors/${slug}`);
  revalidatePath("/authors");
  notifySearchEngines([
    absoluteUrl(`/authors/${slug}`),
    absoluteUrl("/authors"),
    absoluteUrl("/sitemap.xml"),
  ]);
}

export function revalidatePostPages(slug: string) {
  revalidatePath(`/reading-lists/${slug}`);
  revalidatePath("/reading-lists");
  revalidatePath("/");
  notifySearchEngines([
    absoluteUrl(`/reading-lists/${slug}`),
    absoluteUrl("/reading-lists"),
    absoluteUrl("/"),
    absoluteUrl("/sitemap.xml"),
  ]);
}
