"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Author } from "@prisma/client";
import { slugify, stripHtml } from "@/lib/utils";
import { parseBookLinks } from "@/lib/authors/book-links";
import type { AuthorBookLink } from "@/lib/types";
import { formatValidationErrors } from "@/lib/validations/errors";
import { RichTextEditor } from "./RichTextEditor";
import { ImageField } from "./ImageField";
import { BookLinkListField } from "./BookLinkListField";
import { inputClassName, labelClassName, textareaClassName } from "./form-styles";

interface AuthorFormProps {
  adminPath: string;
  author?: Author;
}

export function AuthorForm({ adminPath, author }: AuthorFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    name: author?.name ?? "",
    slug: author?.slug ?? "",
    bio: author?.bio ?? "",
    nationality: author?.nationality ?? "",
    birthYear: author?.birthYear ?? "",
    deathYear: author?.deathYear ?? "",
    mainBooks: parseBookLinks(author?.mainBooks ?? []),
    whereToStart: author?.whereToStart ?? "",
    readingOrder: parseBookLinks(author?.readingOrder ?? []),
    image: author?.image ?? "",
    published: author?.published ?? true,
  });

  function updateBookLinks(
    field: "mainBooks" | "readingOrder",
    value: AuthorBookLink[]
  ) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function update(field: string, value: string | number | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleNameChange(name: string) {
    setForm((prev) => ({
      ...prev,
      name,
      slug: author ? prev.slug : slugify(name),
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (stripHtml(form.bio).length < 20) {
      setError("Bio must be at least 20 characters.");
      setLoading(false);
      return;
    }

    if (form.whereToStart.trim().length < 10) {
      setError("Where to Start must be at least 10 characters.");
      setLoading(false);
      return;
    }

    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(form.slug)) {
      setError("Slug must use lowercase letters, numbers, and hyphens only.");
      setLoading(false);
      return;
    }

    const payload = {
      name: form.name,
      slug: form.slug,
      bio: form.bio,
      nationality: form.nationality,
      birthYear: form.birthYear ? Number(form.birthYear) : undefined,
      deathYear: form.deathYear ? Number(form.deathYear) : undefined,
      mainBooks: form.mainBooks.filter((book) => book.title.trim()),
      whereToStart: form.whereToStart,
      readingOrder: form.readingOrder.filter((book) => book.title.trim()),
      image: form.image || undefined,
      published: form.published,
    };

    try {
      const url = author
        ? `/api/admin/authors/${author.id}`
        : "/api/admin/authors";
      const method = author ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(formatValidationErrors(data.details) || data.error || "Failed to save");
        return;
      }

      const data = await res.json();

      if (author) {
        router.refresh();
        setSuccess("Author saved.");
      } else {
        router.replace(`/${adminPath}/authors/${data.data.id}`);
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!author || !confirm("Delete this author?")) return;
    setLoading(true);
    await fetch(`/api/admin/authors/${author.id}`, { method: "DELETE" });
    router.push(`/${adminPath}/authors`);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-5">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClassName}>Name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => handleNameChange(e.target.value)}
            className={inputClassName}
            required
          />
        </div>
        <div>
          <label className={labelClassName}>Slug</label>
          <input
            type="text"
            value={form.slug}
            onChange={(e) => update("slug", e.target.value)}
            className={inputClassName}
            required
          />
        </div>
      </div>

      <ImageField
        label="Author Photo"
        value={form.image}
        onChange={(url) => update("image", url)}
      />

      <div>
        <label className={labelClassName}>Bio</label>
        <p className="text-[11px] text-coffee mb-2">At least 20 characters.</p>
        <RichTextEditor
          value={form.bio}
          onChange={(html) => update("bio", html)}
          placeholder="Author biography..."
        />
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label className={labelClassName}>Nationality</label>
          <input
            type="text"
            value={form.nationality}
            onChange={(e) => update("nationality", e.target.value)}
            className={inputClassName}
            required
          />
        </div>
        <div>
          <label className={labelClassName}>Birth Year</label>
          <input
            type="number"
            value={form.birthYear}
            onChange={(e) => update("birthYear", e.target.value)}
            className={inputClassName}
          />
        </div>
        <div>
          <label className={labelClassName}>Death Year</label>
          <input
            type="number"
            value={form.deathYear}
            onChange={(e) => update("deathYear", e.target.value)}
            className={inputClassName}
          />
        </div>
      </div>

      <div>
        <label className={labelClassName}>Where to Start</label>
        <p className="text-[11px] text-coffee mb-2">At least 10 characters.</p>
        <textarea
          value={form.whereToStart}
          onChange={(e) => update("whereToStart", e.target.value)}
          rows={4}
          className={textareaClassName}
          required
        />
      </div>

      <BookLinkListField
        label="Main Books"
        description="Up to 5 books. The name appears on the author page and links to the URL you provide."
        value={form.mainBooks}
        onChange={(value) => updateBookLinks("mainBooks", value)}
      />

      <BookLinkListField
        label="Reading Order"
        description="Up to 5 books in recommended reading order. Each name becomes a clickable link."
        value={form.readingOrder}
        onChange={(value) => updateBookLinks("readingOrder", value)}
      />

      <label className="flex items-center gap-2 text-sm text-ink">
        <input
          type="checkbox"
          checked={form.published}
          onChange={(e) => update("published", e.target.checked)}
          className="rounded border-coffee/30"
        />
        Published
      </label>

      {error && <p className="text-sm text-burgundy">{error}</p>}
      {success && <p className="text-sm text-forest">{success}</p>}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2.5 bg-forest text-cream text-sm rounded-sm hover:bg-forest/90 disabled:opacity-50"
        >
          {loading ? "Saving..." : author ? "Update" : "Create"}
        </button>
        {author && (
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
