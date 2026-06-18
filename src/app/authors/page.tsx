import type { Metadata } from "next";
import { authors } from "@/lib/data/authors";
import { AuthorCard } from "@/components/cards/AuthorCard";

export const metadata: Metadata = {
  title: "Authors",
  description:
    "Explore author profiles with biographies, best books, and reading guides for where to start.",
};

export default function AuthorsPage() {
  return (
    <div className="section-padding">
      <div className="section-container">
        <header className="max-w-2xl mb-10">
          <h1 className="text-3xl md:text-4xl font-serif text-ink">Authors</h1>
          <p className="mt-3 text-coffee leading-relaxed">
            Discover the writers behind your favorite books. Biographies, reading
            guides, and recommendations for where to start with each author.
          </p>
        </header>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {authors.map((author) => (
            <AuthorCard key={author.slug} author={author} />
          ))}
        </div>
      </div>
    </div>
  );
}
