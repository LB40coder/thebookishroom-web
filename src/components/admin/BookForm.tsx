"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Book } from "@prisma/client";
import { slugify } from "@/lib/utils";
import { moods } from "@/lib/data/moods";
import { RichTextEditor } from "./RichTextEditor";
import { ImageField } from "./ImageField";
import {
  inputClassName,
  labelClassName,
  selectClassName,
} from "./form-styles";

type AmazonEdition = {
  language: "en" | "pt" | "es";
  label: string;
  url: string;
  format?: "paperback" | "kindle" | "hardcover";
};

export type AuthorOption = { name: string; slug: string };
export type BookOption = { id: string; title: string; slug: string; author: string };

const GENRE_SUGGESTIONS = [
  "philosophy",
  "classics",
  "gothic",
  "science fiction",
  "romance",
  "mystery",
  "fantasy",
  "historical fiction",
  "literary fiction",
  "poetry",
  "drama",
  "horror",
];

interface BookFormProps {
  adminPath: string;
  book?: Book;
  authors: AuthorOption[];
  allBooks: BookOption[];
}

function FormSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="p-5 bg-cream rounded-sm border border-coffee/10 space-y-4">
      <div>
        <h2 className="font-serif text-lg text-ink">{title}</h2>
        {description && (
          <p className="text-xs text-coffee mt-1">{description}</p>
        )}
      </div>
      {children}
    </section>
  );
}

export function BookForm({
  adminPath,
  book,
  authors,
  allBooks,
}: BookFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [customAuthor, setCustomAuthor] = useState(
    () => !authors.some((a) => a.slug === book?.authorSlug)
  );

  const initialEditions = (book?.amazonEditions as AmazonEdition[] | null) ?? [];

  const [form, setForm] = useState({
    title: book?.title ?? "",
    slug: book?.slug ?? "",
    author: book?.author ?? "",
    authorSlug: book?.authorSlug ?? "",
    year: book?.year ?? new Date().getFullYear(),
    genres: book?.genres.join(", ") ?? "",
    moods: book?.moods ?? ([] as string[]),
    difficulty: book?.difficulty ?? "intermediate",
    length: book?.length ?? "medium",
    description: book?.description ?? "",
    whyRead: book?.whyRead ?? "",
    whoIsItFor: book?.whoIsItFor ?? "",
    estimatedReadingTime: book?.estimatedReadingTime ?? "4–6 hours",
    similarBooks: book?.similarBooks ?? ([] as string[]),
    coverImage: book?.coverImage ?? "",
    published: book?.published ?? true,
  });

  const [editions, setEditions] = useState<AmazonEdition[]>(initialEditions);

  const similarBookOptions = allBooks.filter((b) => b.id !== book?.id);

  function update(field: string, value: string | number | boolean | string[]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleTitleChange(title: string) {
    setForm((prev) => ({
      ...prev,
      title,
      slug: book ? prev.slug : slugify(title),
    }));
  }

  function handleAuthorSelect(authorSlug: string) {
    if (authorSlug === "__custom__") {
      setCustomAuthor(true);
      return;
    }
    const author = authors.find((a) => a.slug === authorSlug);
    if (author) {
      setCustomAuthor(false);
      setForm((prev) => ({
        ...prev,
        author: author.name,
        authorSlug: author.slug,
      }));
    }
  }

  function toggleMood(slug: string) {
    setForm((prev) => ({
      ...prev,
      moods: prev.moods.includes(slug)
        ? prev.moods.filter((m) => m !== slug)
        : [...prev.moods, slug],
    }));
  }

  function toggleSimilarBook(slug: string) {
    setForm((prev) => ({
      ...prev,
      similarBooks: prev.similarBooks.includes(slug)
        ? prev.similarBooks.filter((s) => s !== slug)
        : [...prev.similarBooks, slug],
    }));
  }

  function addGenre(genre: string) {
    const current = form.genres
      .split(",")
      .map((g) => g.trim())
      .filter(Boolean);
    if (!current.includes(genre)) {
      update("genres", [...current, genre].join(", "));
    }
  }

  function addEdition() {
    setEditions((prev) => [
      ...prev,
      { language: "en", label: "English Edition", url: "https://" },
    ]);
  }

  function updateEdition(index: number, field: keyof AmazonEdition, value: string) {
    setEditions((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  }

  function removeEdition(index: number) {
    setEditions((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      title: form.title,
      slug: form.slug,
      author: form.author,
      authorSlug: form.authorSlug,
      year: Number(form.year),
      genres: form.genres.split(",").map((g) => g.trim()).filter(Boolean),
      moods: form.moods,
      difficulty: form.difficulty,
      length: form.length,
      description: form.description,
      whyRead: form.whyRead,
      whoIsItFor: form.whoIsItFor,
      estimatedReadingTime: form.estimatedReadingTime,
      similarBooks: form.similarBooks,
      coverImage: form.coverImage || undefined,
      published: form.published,
      amazonEditions: editions.length
        ? editions.map((edition) => ({
            language: edition.language,
            label: edition.label,
            url: edition.url,
            ...(edition.format ? { format: edition.format } : {}),
          }))
        : undefined,
    };

    try {
      const url = book ? `/api/admin/books/${book.id}` : "/api/admin/books";
      const method = book ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to save");
        return;
      }

      router.push(`/${adminPath}/books`);
      router.refresh();
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!book || !confirm("Delete this book?")) return;
    setLoading(true);
    await fetch(`/api/admin/books/${book.id}`, { method: "DELETE" });
    router.push(`/${adminPath}/books`);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      <FormSection
        title="Book Header"
        description="Title, author, year — shown at the top of the book page."
      >
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClassName}>Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className={inputClassName}
              required
            />
          </div>
          <div>
            <label className={labelClassName}>URL Slug</label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => update("slug", e.target.value)}
              className={inputClassName}
              required
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClassName}>Author</label>
            {!customAuthor && authors.length > 0 ? (
              <select
                value={form.authorSlug || ""}
                onChange={(e) => handleAuthorSelect(e.target.value)}
                className={selectClassName}
                required
              >
                <option value="" disabled>
                  Select an author
                </option>
                {authors.map((author) => (
                  <option key={author.slug} value={author.slug}>
                    {author.name}
                  </option>
                ))}
                <option value="__custom__">+ Custom author</option>
              </select>
            ) : (
              <div className="space-y-2">
                <input
                  type="text"
                  value={form.author}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      author: e.target.value,
                      authorSlug: book ? prev.authorSlug : slugify(e.target.value),
                    }))
                  }
                  placeholder="Author name"
                  className={inputClassName}
                  required
                />
                <input
                  type="text"
                  value={form.authorSlug}
                  onChange={(e) => update("authorSlug", e.target.value)}
                  placeholder="author-slug"
                  className={inputClassName}
                  required
                />
                {authors.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setCustomAuthor(false)}
                    className="text-xs text-forest hover:underline"
                  >
                    Pick from existing authors
                  </button>
                )}
              </div>
            )}
            <p className="text-[11px] text-coffee mt-1">
              Powers the &quot;by Author&quot; link and the About the Author box.
            </p>
          </div>
          <div>
            <label className={labelClassName}>Publication Year</label>
            <input
              type="number"
              value={form.year}
              onChange={(e) => update("year", Number(e.target.value))}
              className={inputClassName}
              required
            />
          </div>
        </div>
      </FormSection>

      <FormSection
        title="Cover Image"
        description="Displayed in the sidebar on the book page and on book cards."
      >
        <ImageField
          label="Cover Image"
          value={form.coverImage}
          onChange={(url) => update("coverImage", url)}
        />
      </FormSection>

      <FormSection
        title="Buy on Amazon"
        description="Edition buttons shown below the cover on the book page."
      >
        <div className="flex items-center justify-between">
          <p className="text-sm text-coffee">Amazon editions</p>
          <button
            type="button"
            onClick={addEdition}
            className="text-xs text-forest hover:underline"
          >
            + Add edition
          </button>
        </div>
        {editions.length === 0 ? (
          <p className="text-xs text-coffee">No Amazon links yet.</p>
        ) : (
          <div className="space-y-3">
            {editions.map((edition, index) => (
              <div
                key={index}
                className="p-3 border border-coffee/15 rounded-sm bg-cream-dark/40 space-y-2"
              >
                <div className="grid sm:grid-cols-2 gap-2">
                  <select
                    value={edition.language}
                    onChange={(e) =>
                      updateEdition(
                        index,
                        "language",
                        e.target.value as AmazonEdition["language"]
                      )
                    }
                    className={selectClassName}
                  >
                    <option value="en">English</option>
                    <option value="pt">Portuguese</option>
                    <option value="es">Spanish</option>
                  </select>
                  <select
                    value={edition.format ?? ""}
                    onChange={(e) =>
                      updateEdition(index, "format", e.target.value)
                    }
                    className={selectClassName}
                  >
                    <option value="">Format (optional)</option>
                    <option value="paperback">Paperback</option>
                    <option value="kindle">Kindle</option>
                    <option value="hardcover">Hardcover</option>
                  </select>
                </div>
                <input
                  type="text"
                  value={edition.label}
                  onChange={(e) => updateEdition(index, "label", e.target.value)}
                  placeholder="Label (e.g. English Edition)"
                  className={inputClassName}
                />
                <input
                  type="url"
                  value={edition.url}
                  onChange={(e) => updateEdition(index, "url", e.target.value)}
                  placeholder="Amazon URL"
                  className={inputClassName}
                />
                <button
                  type="button"
                  onClick={() => removeEdition(index)}
                  className="text-xs text-burgundy hover:underline"
                >
                  Remove edition
                </button>
              </div>
            ))}
          </div>
        )}
      </FormSection>

      <FormSection
        title="Genres & Moods"
        description="Tag pills shown below the title on the book page."
      >
        <div>
          <label className={labelClassName}>Genres</label>
          <input
            type="text"
            value={form.genres}
            onChange={(e) => update("genres", e.target.value)}
            placeholder="philosophy, classics, gothic"
            className={inputClassName}
          />
          <div className="flex flex-wrap gap-1.5 mt-2">
            {GENRE_SUGGESTIONS.map((genre) => (
              <button
                key={genre}
                type="button"
                onClick={() => addGenre(genre)}
                className="text-[11px] px-2 py-0.5 rounded-sm border border-coffee/20 text-coffee hover:bg-cream-dark"
              >
                + {genre}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className={labelClassName}>Moods</label>
          <div className="flex flex-wrap gap-2">
            {moods.map((mood) => (
              <button
                key={mood.slug}
                type="button"
                onClick={() => toggleMood(mood.slug)}
                className={`text-xs px-2.5 py-1 rounded-sm border transition-colors ${
                  form.moods.includes(mood.slug)
                    ? "bg-burgundy/10 border-burgundy/30 text-burgundy"
                    : "border-coffee/20 text-coffee hover:bg-cream-dark"
                }`}
              >
                {mood.name}
              </button>
            ))}
          </div>
        </div>
      </FormSection>

      <FormSection
        title="Reading Details"
        description="Difficulty, length, and reading time — shown in the info box."
      >
        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className={labelClassName}>Difficulty</label>
            <select
              value={form.difficulty}
              onChange={(e) => update("difficulty", e.target.value)}
              className={selectClassName}
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          <div>
            <label className={labelClassName}>Length</label>
            <select
              value={form.length}
              onChange={(e) => update("length", e.target.value)}
              className={selectClassName}
            >
              <option value="short">Short</option>
              <option value="medium">Medium</option>
              <option value="long">Long</option>
            </select>
          </div>
          <div>
            <label className={labelClassName}>Estimated Reading Time</label>
            <input
              type="text"
              value={form.estimatedReadingTime}
              onChange={(e) => update("estimatedReadingTime", e.target.value)}
              placeholder="e.g. 4–6 hours"
              className={inputClassName}
              required
            />
          </div>
        </div>
      </FormSection>

      <FormSection title="About the Book">
        <RichTextEditor
          value={form.description}
          onChange={(html) => update("description", html)}
          placeholder="Main book description..."
        />
      </FormSection>

      <FormSection title="Why You Should Read It">
        <RichTextEditor
          value={form.whyRead}
          onChange={(html) => update("whyRead", html)}
          placeholder="Why readers should pick up this book..."
        />
      </FormSection>

      <FormSection title="Who This Book Is For">
        <RichTextEditor
          value={form.whoIsItFor}
          onChange={(html) => update("whoIsItFor", html)}
          placeholder="Ideal reader profile..."
        />
      </FormSection>

      <FormSection
        title="Similar Books"
        description="Links shown in the Similar Books section at the bottom of the page."
      >
        {similarBookOptions.length === 0 ? (
          <p className="text-xs text-coffee">
            Add more books first to link similar titles.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto">
            {similarBookOptions.map((item) => (
              <label
                key={item.id}
                className="flex items-start gap-2 text-sm text-ink cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={form.similarBooks.includes(item.slug)}
                  onChange={() => toggleSimilarBook(item.slug)}
                  className="mt-0.5 rounded border-coffee/30"
                />
                <span>
                  {item.title}
                  <span className="block text-xs text-coffee">by {item.author}</span>
                </span>
              </label>
            ))}
          </div>
        )}
      </FormSection>

      <FormSection
        title="Related Reading Lists"
        description="Not set on the book — add this book's slug to a post's Related Books field to show reading lists here."
      >
        <p className="text-sm text-coffee">
          Slug to use in posts:{" "}
          <code className="px-1.5 py-0.5 bg-cream-dark rounded-sm text-ink">
            {form.slug || "your-book-slug"}
          </code>
        </p>
      </FormSection>

      <label className="flex items-center gap-2 text-sm text-ink">
        <input
          type="checkbox"
          checked={form.published}
          onChange={(e) => update("published", e.target.checked)}
          className="rounded border-coffee/30"
        />
        Published (visible on site when using database content)
      </label>

      {error && <p className="text-sm text-burgundy">{error}</p>}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2.5 bg-forest text-cream text-sm rounded-sm hover:bg-forest/90 disabled:opacity-50"
        >
          {loading ? "Saving..." : book ? "Update Book" : "Create Book"}
        </button>
        {book && (
          <button
            type="button"
            onClick={handleDelete}
            className="px-5 py-2.5 text-sm text-burgundy border border-burgundy/30 rounded-sm hover:bg-burgundy/5"
          >
            Delete
          </button>
        )}
      </div>
    </form>
  );
}
