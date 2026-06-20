"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { AffiliateLink as PrismaAffiliateLink } from "@prisma/client";
import { AMAZON_LANGUAGES } from "@/lib/books/amazon-editions";
import {
  inputClassName,
  labelClassName,
  selectClassName,
} from "./form-styles";

type BookOption = { title: string; slug: string };

interface AffiliateLinkFormProps {
  adminPath: string;
  link?: PrismaAffiliateLink;
  books: BookOption[];
}

export function AffiliateLinkForm({
  adminPath,
  link,
  books,
}: AffiliateLinkFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: link?.title ?? "",
    url: link?.url ?? "https://",
    bookSlug: link?.bookSlug ?? "",
    language: link?.language ?? "",
    format: link?.format ?? "",
  });

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      title: form.title.trim(),
      url: form.url.trim(),
      bookSlug: form.bookSlug || undefined,
      language: form.language || undefined,
      format: form.format || undefined,
    };

    try {
      const url = link
        ? `/api/admin/affiliate-links/${link.id}`
        : "/api/admin/affiliate-links";
      const method = link ? "PUT" : "POST";

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

      router.push(`/${adminPath}/affiliate-links`);
      router.refresh();
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!link || !confirm("Delete this affiliate link?")) return;
    setLoading(true);
    await fetch(`/api/admin/affiliate-links/${link.id}`, { method: "DELETE" });
    router.push(`/${adminPath}/affiliate-links`);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
      <div>
        <label className={labelClassName}>Title</label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => update("title", e.target.value)}
          placeholder="e.g. English Edition — Pride and Prejudice"
          className={inputClassName}
          required
        />
      </div>

      <div>
        <label className={labelClassName}>Affiliate URL</label>
        <input
          type="url"
          value={form.url}
          onChange={(e) => update("url", e.target.value)}
          className={inputClassName}
          required
        />
      </div>

      <div>
        <label className={labelClassName}>Associated book (optional)</label>
        <select
          value={form.bookSlug}
          onChange={(e) => update("bookSlug", e.target.value)}
          className={selectClassName}
        >
          <option value="">Any book / general link</option>
          {books.map((book) => (
            <option key={book.slug} value={book.slug}>
              {book.title}
            </option>
          ))}
        </select>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClassName}>Language (optional)</label>
          <select
            value={form.language}
            onChange={(e) => update("language", e.target.value)}
            className={selectClassName}
          >
            <option value="">Not set</option>
            {AMAZON_LANGUAGES.map((language) => (
              <option key={language.value} value={language.value}>
                {language.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClassName}>Format (optional)</label>
          <select
            value={form.format}
            onChange={(e) => update("format", e.target.value)}
            className={selectClassName}
          >
            <option value="">Not set</option>
            <option value="paperback">Paperback</option>
            <option value="kindle">Kindle</option>
            <option value="hardcover">Hardcover</option>
          </select>
        </div>
      </div>

      {error && <p className="text-sm text-burgundy">{error}</p>}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2.5 bg-forest text-cream text-sm rounded-sm hover:bg-forest/90 disabled:opacity-50"
        >
          {loading ? "Saving..." : link ? "Update Link" : "Save Link"}
        </button>
        {link && (
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
