"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Post } from "@prisma/client";
import { slugify } from "@/lib/utils";
import { RichTextEditor } from "./RichTextEditor";
import { ImageField } from "./ImageField";
import { inputClassName, labelClassName, textareaClassName } from "./form-styles";

interface PostFormProps {
  adminPath: string;
  post?: Post;
}

export function PostForm({ adminPath, post }: PostFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: post?.title ?? "",
    slug: post?.slug ?? "",
    excerpt: post?.excerpt ?? "",
    content: post?.content ?? "",
    coverImage: post?.coverImage ?? "/images/classic.svg",
    category: post?.category ?? "Reading Lists",
    tags: post?.tags.join(", ") ?? "",
    moods: post?.moods.join(", ") ?? "",
    relatedBooks: post?.relatedBooks.join(", ") ?? "",
    readingTime: post?.readingTime ?? 5,
    seoTitle: post?.seoTitle ?? "",
    seoDescription: post?.seoDescription ?? "",
    published: post?.published ?? false,
  });

  function update(field: string, value: string | number | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleTitleChange(title: string) {
    setForm((prev) => ({
      ...prev,
      title,
      slug: post ? prev.slug : slugify(title),
      seoTitle: prev.seoTitle || (title ? `${title} | The Bookish Room` : ""),
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      ...form,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      moods: form.moods.split(",").map((m) => m.trim()).filter(Boolean),
      relatedBooks: form.relatedBooks
        .split(",")
        .map((b) => b.trim())
        .filter(Boolean),
      readingTime: Number(form.readingTime),
      seoTitle: form.seoTitle || `${form.title} | The Bookish Room`,
    };

    try {
      const url = post ? `/api/admin/posts/${post.id}` : "/api/admin/posts";
      const method = post ? "PUT" : "POST";

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

      router.push(`/${adminPath}/posts`);
      router.refresh();
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!post || !confirm("Delete this post?")) return;
    setLoading(true);
    await fetch(`/api/admin/posts/${post.id}`, { method: "DELETE" });
    router.push(`/${adminPath}/posts`);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-5">
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
        <label className={labelClassName}>Slug</label>
        <input
          type="text"
          value={form.slug}
          onChange={(e) => update("slug", e.target.value)}
          className={inputClassName}
          required
        />
      </div>

      <div>
        <label className={labelClassName}>Excerpt</label>
        <textarea
          value={form.excerpt}
          onChange={(e) => update("excerpt", e.target.value)}
          rows={3}
          className={textareaClassName}
          required
        />
      </div>

      <div>
        <label className={labelClassName}>Content</label>
        <RichTextEditor
          value={form.content}
          onChange={(html) => update("content", html)}
          placeholder="Write your reading list article..."
        />
      </div>

      <ImageField
        label="Cover Image"
        value={form.coverImage}
        onChange={(url) => update("coverImage", url)}
        required
      />

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClassName}>Category</label>
          <input
            type="text"
            value={form.category}
            onChange={(e) => update("category", e.target.value)}
            className={inputClassName}
          />
        </div>
        <div>
          <label className={labelClassName}>Reading Time (min)</label>
          <input
            type="number"
            value={form.readingTime}
            onChange={(e) => update("readingTime", Number(e.target.value))}
            className={inputClassName}
            min={1}
            max={120}
          />
        </div>
      </div>

      <div>
        <label className={labelClassName}>Tags (comma-separated)</label>
        <input
          type="text"
          value={form.tags}
          onChange={(e) => update("tags", e.target.value)}
          className={inputClassName}
        />
      </div>

      <div>
        <label className={labelClassName}>Moods (comma-separated)</label>
        <input
          type="text"
          value={form.moods}
          onChange={(e) => update("moods", e.target.value)}
          className={inputClassName}
        />
      </div>

      <div>
        <label className={labelClassName}>Related Books (slugs, comma-separated)</label>
        <input
          type="text"
          value={form.relatedBooks}
          onChange={(e) => update("relatedBooks", e.target.value)}
          className={inputClassName}
        />
      </div>

      <div>
        <label className={labelClassName}>SEO Title</label>
        <input
          type="text"
          value={form.seoTitle}
          onChange={(e) => update("seoTitle", e.target.value)}
          className={inputClassName}
        />
      </div>

      <div>
        <label className={labelClassName}>SEO Description</label>
        <textarea
          value={form.seoDescription}
          onChange={(e) => update("seoDescription", e.target.value)}
          rows={3}
          className={textareaClassName}
          required
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
          {loading ? "Saving..." : post ? "Update" : "Create"}
        </button>
        {post && (
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
