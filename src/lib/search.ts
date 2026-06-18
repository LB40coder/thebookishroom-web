import { posts } from "@/lib/data/posts";
import { books } from "@/lib/data/books";
import { authors } from "@/lib/data/authors";
import { moods } from "@/lib/data/moods";

export interface SearchResult {
  type: "post" | "book" | "author" | "mood";
  title: string;
  slug: string;
  excerpt: string;
  href: string;
}

export function searchContent(query: string): SearchResult[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  const results: SearchResult[] = [];

  for (const post of posts) {
    const matches =
      post.title.toLowerCase().includes(q) ||
      post.excerpt.toLowerCase().includes(q) ||
      post.tags.some((t) => t.toLowerCase().includes(q)) ||
      post.moods.some((m) => m.toLowerCase().includes(q));
    if (matches) {
      results.push({
        type: "post",
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        href: `/reading-lists/${post.slug}`,
      });
    }
  }

  for (const book of books) {
    const matches =
      book.title.toLowerCase().includes(q) ||
      book.author.toLowerCase().includes(q) ||
      book.genres.some((g) => g.toLowerCase().includes(q)) ||
      book.moods.some((m) => m.toLowerCase().includes(q));
    if (matches) {
      results.push({
        type: "book",
        title: book.title,
        slug: book.slug,
        excerpt: `by ${book.author}`,
        href: `/books/${book.slug}`,
      });
    }
  }

  for (const author of authors) {
    const matches =
      author.name.toLowerCase().includes(q) ||
      author.nationality.toLowerCase().includes(q);
    if (matches) {
      results.push({
        type: "author",
        title: author.name,
        slug: author.slug,
        excerpt: author.bio.slice(0, 120) + "...",
        href: `/authors/${author.slug}`,
      });
    }
  }

  for (const mood of moods) {
    const matches =
      mood.name.toLowerCase().includes(q) ||
      mood.description.toLowerCase().includes(q);
    if (matches) {
      results.push({
        type: "mood",
        title: mood.name,
        slug: mood.slug,
        excerpt: mood.description,
        href: `/book-moods/${mood.slug}`,
      });
    }
  }

  return results;
}
