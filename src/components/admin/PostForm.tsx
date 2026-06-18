"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Post } from "@prisma/client";

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
    readingTime: post?.readingTime ?? 5,
    seoTitle: post?.seoTitle ?? "",
    seoDescription: post?.seoDescription ?? "",
    published: post?.published ?? false,
  });

  function update(field: string, value: string | number | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      ...form,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      moods: form.moods.split(",").map((m) => m.trim()).filter(Boolean),
      relatedBooks: post?.relatedBooks ?? [],
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

  const fields = [
    { key: "title", label: "Title", type: "text" },
    { key: "slug", label: "Slug", type: "text" },
    { key: "excerpt", label: "Excerpt", type: "textarea" },
    { key: "content", label: "Content", type: "textarea" },
    { key: "coverImage", label: "Cover Image URL", type: "text" },
    { key: "category", label: "Category", type: "text" },
    { key: "tags", label: "Tags (comma-separated)", type: "text" },
    { key: "moods", label: "Moods (comma-separated)", type: "text" },
    { key: "readingTime", label: "Reading Time (min)", type: "number" },
    { key: "seoTitle", label: "SEO Title", type: "text" },
    { key: "seoDescription", label: "SEO Description", type: "textarea" },
  ] as const;

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
      {fields.map(({ key, label, type }) => (
        <div key={key}>
          <label className="block text-sm text-coffee mb-1">{label}</label>
          {type === "textarea" ? (
            <textarea
              value={form[key as keyof typeof form] as string}
              onChange={(e) => update(key, e.target.value)}
              rows={key === "content" ? 8 : 3}
              className="w-full px-3 py-2 text-sm bg-cream border border-coffee/20 rounded-sm focus:outline-none focus:ring-1 focus:ring-forest/50"
              required={key === "excerpt" || key === "seoDescription"}
            />
          ) : (
            <input
              type={type}
              value={form[key as keyof typeof form] as string | number}
              onChange={(e) =>
                update(key, type === "number" ? Number(e.target.value) : e.target.value)
              }
              className="w-full px-3 py-2 text-sm bg-cream border border-coffee/20 rounded-sm focus:outline-none focus:ring-1 focus:ring-forest/50"
              required={!["seoTitle"].includes(key)}
            />
          )}
        </div>
      ))}

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
