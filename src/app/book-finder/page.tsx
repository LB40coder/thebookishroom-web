"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { filterBooks } from "@/lib/data/books";
import { BookCard } from "@/components/cards/BookCard";
import { NewsletterBanner } from "@/components/home/NewsletterBanner";

const filterOptions = {
  mood: [
    { value: "", label: "Any mood" },
    { value: "cozy", label: "Cozy" },
    { value: "dark-academia", label: "Dark" },
    { value: "romantic", label: "Romantic" },
    { value: "inspiring", label: "Inspiring" },
    { value: "mystery", label: "Mysterious" },
    { value: "gothic", label: "Gothic" },
    { value: "rainy-day", label: "Rainy Day" },
  ],
  genre: [
    { value: "", label: "Any genre" },
    { value: "classics", label: "Classics" },
    { value: "gothic", label: "Gothic" },
    { value: "romance", label: "Romance" },
    { value: "philosophy", label: "Philosophy" },
    { value: "mystery", label: "Mystery" },
    { value: "fantasy", label: "Fantasy" },
  ],
  length: [
    { value: "", label: "Any length" },
    { value: "short", label: "Short" },
    { value: "medium", label: "Medium" },
    { value: "long", label: "Long" },
  ],
  difficulty: [
    { value: "", label: "Any difficulty" },
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
  ],
};

export default function BookFinderPage() {
  const [filters, setFilters] = useState({
    mood: "",
    genre: "",
    length: "",
    difficulty: "",
  });
  const [hasSearched, setHasSearched] = useState(false);

  const results = hasSearched
    ? filterBooks({
        mood: filters.mood || undefined,
        genre: filters.genre || undefined,
        length: filters.length || undefined,
        difficulty: filters.difficulty || undefined,
      })
    : [];

  function handleSearch() {
    setHasSearched(true);
  }

  function handleReset() {
    setFilters({ mood: "", genre: "", length: "", difficulty: "" });
    setHasSearched(false);
  }

  return (
    <>
      <div className="section-padding">
        <div className="section-container">
          <header className="max-w-2xl mb-10">
            <div className="flex items-center gap-3 mb-4">
              <Search className="w-8 h-8 text-coffee" />
              <h1 className="text-3xl md:text-4xl font-serif text-ink">
                Book Finder
              </h1>
            </div>
            <p className="text-coffee leading-relaxed">
              Can&apos;t decide what to read? Tell us your mood, preferred genre,
              and reading preferences — we&apos;ll suggest books from our
              curated collection.
            </p>
          </header>

          <div className="bg-cream-dark rounded-sm border border-coffee/10 p-6 md:p-8 mb-10">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {(
                Object.entries(filterOptions) as [
                  keyof typeof filterOptions,
                  (typeof filterOptions)["mood"],
                ][]
              ).map(([key, options]) => (
                <div key={key}>
                  <label
                    htmlFor={`filter-${key}`}
                    className="block text-xs font-medium text-coffee capitalize mb-1.5"
                  >
                    {key}
                  </label>
                  <select
                    id={`filter-${key}`}
                    value={filters[key]}
                    onChange={(e) =>
                      setFilters((prev) => ({ ...prev, [key]: e.target.value }))
                    }
                    className="w-full px-3 py-2.5 text-sm bg-cream border border-coffee/20 rounded-sm focus:outline-none focus:ring-1 focus:ring-forest/50"
                  >
                    {options.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleSearch}
                className="px-6 py-2.5 bg-burgundy text-cream text-sm font-medium rounded-sm hover:bg-burgundy/90 transition-colors"
              >
                Find My Next Book
              </button>
              {hasSearched && (
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 text-sm text-coffee border border-coffee/20 rounded-sm hover:bg-cream transition-colors"
                >
                  Reset Filters
                </button>
              )}
            </div>
          </div>

          {hasSearched && (
            <section>
              <h2 className="font-serif text-xl text-ink mb-6">
                {results.length > 0
                  ? `${results.length} book${results.length === 1 ? "" : "s"} found`
                  : "No books match your filters"}
              </h2>

              {results.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {results.map((book) => (
                    <BookCard key={book.slug} book={book} />
                  ))}
                </div>
              ) : (
                <p className="text-coffee text-center py-8">
                  Try adjusting your filters or browse our{" "}
                  <a href="/reading-lists" className="text-burgundy hover:underline">
                    reading lists
                  </a>{" "}
                  for inspiration.
                </p>
              )}
            </section>
          )}
        </div>
      </div>
      <NewsletterBanner />
    </>
  );
}
