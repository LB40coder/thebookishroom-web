import type { Metadata } from "next";
import { books } from "@/lib/data/books";
import { BookCard } from "@/components/cards/BookCard";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Books",
  description:
    "Explore individual book pages with editorial details, reading difficulty, moods, and similar book recommendations.",
};

export default function BooksPage() {
  return (
    <div className="section-padding">
      <div className="section-container">
        <header className="max-w-2xl mb-10">
          <h1 className="text-3xl md:text-4xl font-serif text-ink">Books</h1>
          <p className="mt-3 text-coffee leading-relaxed">
            Detailed editorial pages for classic and beloved books — with reading
            guides, mood tags, and recommendations for what to read next.
          </p>
        </header>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <BookCard key={book.slug} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
}
