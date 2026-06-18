"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Author } from "@prisma/client";
import { slugify } from "@/lib/utils";
import { RichTextEditor } from "./RichTextEditor";
import { ImageField } from "./ImageField";
import { inputClassName, labelClassName, textareaClassName } from "./form-styles";

interface AuthorFormProps {
  adminPath: string;
  author?: Author;
}

export function AuthorForm({ adminPath, author }: AuthorFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: author?.name ?? "",
    slug: author?.slug ?? "",
    bio: author?.bio ?? "",
    nationality: author?.nationality ?? "",
    birthYear: author?.birthYear ?? "",
    deathYear: author?.deathYear ?? "",
    mainBooks: author?.mainBooks.join(", ") ?? "",
    whereToStart: author?.whereToStart ?? "",
    readingOrder: author?.readingOrder.join(", ") ?? "",
    image: author?.image ?? "",
    published: author?.published ?? true,
  });

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

    const payload = {
      name: form.name,
      slug: form.slug,
      bio: form.bio,
      nationality: form.nationality,
      birthYear: form.birthYear ? Number(form.birthYear) : undefined,
      deathYear: form.deathYear ? Number(form.deathYear) : undefined,
      mainBooks: form.mainBooks.split(",").map((b) => b.trim()).filter(Boolean),
      whereToStart: form.whereToStart,
      readingOrder: form.readingOrder
        .split(",")
        .map((b) => b.trim())
        .filter(Boolean),
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
        setError(data.error || "Failed to save");
        return;
      }

      router.push(`/${adminPath}/authors`);
      router.refresh();
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
        <textarea
          value={form.whereToStart}
          onChange={(e) => update("whereToStart", e.target.value)}
          rows={4}
          className={textareaClassName}
          required
        />
      </div>

      <div>
        <label className={labelClassName}>Main Books (comma-separated)</label>
        <input
          type="text"
          value={form.mainBooks}
          onChange={(e) => update("mainBooks", e.target.value)}
          className={inputClassName}
        />
      </div>

      <div>
        <label className={labelClassName}>Reading Order (comma-separated)</label>
        <input
          type="text"
          value={form.readingOrder}
          onChange={(e) => update("readingOrder", e.target.value)}
          className={inputClassName}
        />
      </div>

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
