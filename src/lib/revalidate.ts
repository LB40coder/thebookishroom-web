import { revalidatePath } from "next/cache";

export function revalidateBookPages(slug: string) {
  revalidatePath(`/books/${slug}`);
  revalidatePath("/books");
  revalidatePath("/book-finder");
  revalidatePath("/");
}

export function revalidateAuthorPages(slug: string) {
  revalidatePath(`/authors/${slug}`);
  revalidatePath("/authors");
}

export function revalidatePostPages(slug: string) {
  revalidatePath(`/reading-lists/${slug}`);
  revalidatePath("/reading-lists");
  revalidatePath("/");
}
