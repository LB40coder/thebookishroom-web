"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Search, X, BookOpen, User, Sparkles, FileText } from "lucide-react";
import { searchContent, type SearchResult } from "@/lib/search";

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

const typeIcons = {
  post: FileText,
  book: BookOpen,
  author: User,
  mood: Sparkles,
};

const typeLabels = {
  post: "Reading List",
  book: "Book",
  author: "Author",
  mood: "Mood",
};

export function SearchDialog({ open, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setQuery("");
      setResults([]);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    setResults(searchContent(query));
  }, [query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh]">
      <div
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg mx-4 bg-cream rounded-sm shadow-xl border border-coffee/10 overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-coffee/10">
          <Search className="w-5 h-5 text-coffee shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search books, authors, moods, lists..."
            className="flex-1 bg-transparent text-ink placeholder:text-coffee/60 focus:outline-none text-sm"
          />
          <button
            onClick={onClose}
            className="p-1 text-coffee hover:text-ink"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-[50vh] overflow-y-auto">
          {query && results.length === 0 && (
            <p className="px-4 py-8 text-sm text-coffee text-center">
              No results found for &ldquo;{query}&rdquo;
            </p>
          )}

          {results.length > 0 && (
            <ul className="py-2">
              {results.map((result) => {
                const Icon = typeIcons[result.type];
                return (
                  <li key={`${result.type}-${result.slug}`}>
                    <Link
                      href={result.href}
                      onClick={onClose}
                      className="flex items-start gap-3 px-4 py-3 hover:bg-cream-dark transition-colors"
                    >
                      <Icon className="w-4 h-4 text-coffee mt-0.5 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-ink truncate">
                          {result.title}
                        </p>
                        <p className="text-xs text-coffee truncate">
                          {typeLabels[result.type]} · {result.excerpt}
                        </p>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}

          {!query && (
            <p className="px-4 py-8 text-sm text-coffee text-center">
              Try searching for a book, author, mood, or reading list
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
