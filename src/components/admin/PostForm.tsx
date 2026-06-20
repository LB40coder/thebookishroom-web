"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Post } from "@prisma/client";
import { slugify } from "@/lib/utils";
import type { AffiliateLink } from "@/lib/types";
import {
  defaultPublishDatetimeLocal,
  fromDatetimeLocalValue,
  getPostDisplayStatus,
  toDatetimeLocalValue,
  type PostDisplayStatus,
} from "@/lib/posts/visibility";
import { RichTextEditor, type RichTextEditorHandle } from "./RichTextEditor";
import { AffiliateLinksPanel } from "./AffiliateLinksPanel";
import { ImageField } from "./ImageField";
import {
  inputClassName,
  labelClassName,
  selectClassName,
  textareaClassName,
} from "./form-styles";

interface PostFormProps {
  adminPath: string;
  post?: Post;
  affiliateLinks?: AffiliateLink[];
}

function SidebarSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="p-4 bg-cream rounded-sm border border-coffee/10 space-y-3">
      <h2 className="font-serif text-base text-ink">{title}</h2>
      {children}
    </section>
  );
}

function initialStatus(post?: Post): PostDisplayStatus {
  if (!post) return "draft";
  return getPostDisplayStatus(post.published, post.publishedAt);
}

export function PostForm({ adminPath, post, affiliateLinks = [] }: PostFormProps) {
  const router = useRouter();
  const editorRef = useRef<RichTextEditorHandle>(null);
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
    status: initialStatus(post),
    publishedAtLocal: post
      ? toDatetimeLocalValue(post.publishedAt)
      : defaultPublishDatetimeLocal(),
  });

  function update(field: string, value: string | number) {
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

  function handleStatusChange(status: PostDisplayStatus) {
    setForm((prev) => ({
      ...prev,
      status,
      publishedAtLocal:
        status === "published" && prev.status !== "published"
          ? defaultPublishDatetimeLocal()
          : prev.publishedAtLocal,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const publishedAt = fromDatetimeLocalValue(form.publishedAtLocal);
    const published = form.status !== "draft";

    if (form.status === "scheduled" && publishedAt.getTime() <= Date.now()) {
      setError("Scheduled posts need a future date and time.");
      setLoading(false);
      return;
    }

    const payload = {
      title: form.title,
      slug: form.slug,
      excerpt: form.excerpt,
      content: form.content,
      coverImage: form.coverImage,
      category: form.category,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      moods: form.moods.split(",").map((m) => m.trim()).filter(Boolean),
      relatedBooks: form.relatedBooks
        .split(",")
        .map((b) => b.trim())
        .filter(Boolean),
      readingTime: Number(form.readingTime),
      seoTitle: form.seoTitle || `${form.title} | The Bookish Room`,
      seoDescription: form.seoDescription,
      published,
      publishedAt: publishedAt.toISOString(),
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

  const previewStatus = getPostDisplayStatus(
    form.status !== "draft",
    fromDatetimeLocalValue(form.publishedAtLocal)
  );

  const visibleAffiliateLinks = useMemo(() => {
    const relatedSlugs = form.relatedBooks
      .split(",")
      .map((slug) => slug.trim())
      .filter(Boolean);
    const slugSet = new Set(relatedSlugs);

    if (slugSet.size === 0) return affiliateLinks;

    return affiliateLinks.filter(
      (link) => !link.bookSlug || slugSet.has(link.bookSlug)
    );
  }, [affiliateLinks, form.relatedBooks]);

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className={labelClassName}>Title</label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => handleTitleChange(e.target.value)}
          className={`${inputClassName} text-lg`}
          required
        />
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_320px] gap-6 items-start">
        <div className="min-w-0">
          <label className={labelClassName}>Content</label>
          <RichTextEditor
            ref={editorRef}
            value={form.content}
            onChange={(html) => update("content", html)}
            placeholder="Write your reading list article..."
            minHeight={480}
            maxHeight="calc(100vh - 14rem)"
          />
        </div>

        <aside className="space-y-4 lg:sticky lg:top-6">
          <SidebarSection title="Publish">
            <div>
              <label className={labelClassName}>Status</label>
              <select
                value={form.status}
                onChange={(e) =>
                  handleStatusChange(e.target.value as PostDisplayStatus)
                }
                className={selectClassName}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="scheduled">Scheduled</option>
              </select>
            </div>

            {form.status !== "draft" && (
              <div>
                <label className={labelClassName}>Date and time</label>
                <input
                  type="datetime-local"
                  value={form.publishedAtLocal}
                  onChange={(e) => update("publishedAtLocal", e.target.value)}
                  className={inputClassName}
                  required
                />
                <p className="text-[11px] text-coffee mt-1.5">
                  {previewStatus === "scheduled"
                    ? "This post will go live automatically at the chosen time."
                    : "Use a future date and time with status Scheduled to plan ahead."}
                </p>
              </div>
            )}
          </SidebarSection>

          <SidebarSection title="Details">
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

            <ImageField
              label="Cover Image"
              value={form.coverImage}
              onChange={(url) => update("coverImage", url)}
              required
            />

            <div className="grid grid-cols-2 gap-3">
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
              <label className={labelClassName}>
                Related Books (slugs, comma-separated)
              </label>
              <input
                type="text"
                value={form.relatedBooks}
                onChange={(e) => update("relatedBooks", e.target.value)}
                className={inputClassName}
              />
            </div>
          </SidebarSection>

          <SidebarSection title="Affiliate Links">
            <p className="text-[11px] text-coffee">
              Reuse saved Amazon links in your post content. Links matching related
              books appear first.
            </p>
            <AffiliateLinksPanel
              links={visibleAffiliateLinks}
              onInsert={(link) =>
                editorRef.current?.insertLink(link.title, link.url)
              }
            />
            <Link
              href={`/${adminPath}/affiliate-links`}
              className="inline-block text-xs text-forest hover:underline"
            >
              Manage affiliate links
            </Link>
          </SidebarSection>

          <SidebarSection title="SEO">
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
          </SidebarSection>

          {error && <p className="text-sm text-burgundy">{error}</p>}

          <div className="flex flex-col gap-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full px-5 py-2.5 bg-forest text-cream text-sm rounded-sm hover:bg-forest/90 disabled:opacity-50"
            >
              {loading ? "Saving..." : post ? "Update Post" : "Create Post"}
            </button>
            {post && (
              <button
                type="button"
                onClick={handleDelete}
                className="w-full px-5 py-2.5 text-sm text-burgundy border border-burgundy/30 rounded-sm hover:bg-burgundy/5"
              >
                Delete
              </button>
            )}
          </div>
        </aside>
      </div>
    </form>
  );
}
