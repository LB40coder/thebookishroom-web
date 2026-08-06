import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import type { Post } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { CoverImage } from "@/components/ui/CoverImage";
import { cn } from "@/lib/utils";

type PostCardVariant = "default" | "featured" | "horizontal" | "compact";

interface PostCardProps {
  post: Post;
  variant?: PostCardVariant;
  className?: string;
}

function PostMeta({
  post,
  className,
}: {
  post: Post;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2 text-xs text-coffee", className)}>
      <span className="text-burgundy font-medium">{post.category}</span>
      <span aria-hidden>·</span>
      <span>{formatDate(post.publishedAt)}</span>
      <span aria-hidden>·</span>
      <span className="inline-flex items-center gap-1">
        <Clock className="w-3 h-3" />
        {post.readingTime} min read
      </span>
    </div>
  );
}

export function PostCard({ post, variant = "default", className }: PostCardProps) {
  if (variant === "featured") {
    return (
      <article className={cn("group", className)}>
        <Link href={`/reading-lists/${post.slug}`} className="block">
          <div className="relative aspect-[16/9] sm:aspect-[2/1] rounded-sm overflow-hidden mb-5">
            <CoverImage
              src={post.coverImage}
              alt={post.title}
              variant="hero"
              priority
              className="group-hover:scale-[1.02] transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/10 to-transparent" />
            <span className="absolute top-4 left-4 bg-cream/95 text-forest text-[10px] font-medium tracking-widest uppercase px-2.5 py-1 rounded-sm">
              Featured
            </span>
          </div>
          <PostMeta post={post} className="mb-3" />
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-ink group-hover:text-burgundy transition-colors leading-tight">
            {post.title}
          </h2>
          <p className="mt-4 text-base md:text-lg text-coffee font-reading leading-relaxed line-clamp-3 max-w-2xl">
            {post.excerpt}
          </p>
          <span className="mt-5 inline-flex items-center gap-1.5 text-sm text-burgundy font-medium">
            Read article
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </Link>
      </article>
    );
  }

  if (variant === "horizontal") {
    return (
      <article className={cn("group", className)}>
        <Link
          href={`/reading-lists/${post.slug}`}
          className="grid sm:grid-cols-[minmax(0,240px)_1fr] gap-5 items-start"
        >
          <div className="relative aspect-[16/10] sm:aspect-[4/3] rounded-sm overflow-hidden">
            <CoverImage
              src={post.coverImage}
              alt={post.title}
              variant="card-post"
              className="group-hover:scale-[1.02] transition-transform duration-300"
            />
          </div>
          <div className="min-w-0">
            <PostMeta post={post} className="mb-2" />
            <h3 className="font-serif text-lg md:text-xl text-ink group-hover:text-burgundy transition-colors leading-snug">
              {post.title}
            </h3>
            <p className="mt-2 text-sm text-coffee font-reading leading-relaxed line-clamp-2">
              {post.excerpt}
            </p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm text-burgundy font-medium">
              Read more
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </Link>
      </article>
    );
  }

  if (variant === "compact") {
    return (
      <article className={cn("group", className)}>
        <Link
          href={`/reading-lists/${post.slug}`}
          className="flex gap-4 items-start"
        >
          <div className="relative w-20 h-20 shrink-0 rounded-sm overflow-hidden">
            <CoverImage
              src={post.coverImage}
              alt={post.title}
              variant="card-post"
              className="group-hover:scale-[1.05] transition-transform duration-300"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] uppercase tracking-wider text-burgundy mb-1">
              {post.category}
            </p>
            <h3 className="font-serif text-sm text-ink group-hover:text-burgundy transition-colors leading-snug line-clamp-2">
              {post.title}
            </h3>
            <p className="mt-1 text-xs text-coffee">{formatDate(post.publishedAt)}</p>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className={cn("group", className)}>
      <Link href={`/reading-lists/${post.slug}`}>
        <div className="relative aspect-[16/10] rounded-sm overflow-hidden mb-4">
          <CoverImage
            src={post.coverImage}
            alt={post.title}
            variant="card-post"
            className="group-hover:scale-[1.02] transition-transform duration-300"
          />
          <span className="absolute top-3 left-3 bg-forest text-cream text-[10px] font-medium tracking-wider uppercase px-2 py-1 rounded-sm">
            {post.category}
          </span>
        </div>
        <PostMeta post={post} className="mb-2" />
        <h3 className="font-serif text-lg text-ink group-hover:text-burgundy transition-colors">
          {post.title}
        </h3>
        <p className="mt-2 text-sm text-coffee font-reading leading-relaxed line-clamp-2">
          {post.excerpt}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {post.moods.slice(0, 2).map((mood) => (
            <span
              key={mood}
              className="text-[10px] uppercase tracking-wider text-burgundy bg-burgundy/5 px-2 py-0.5 rounded-sm"
            >
              {mood.replace(/-/g, " ")}
            </span>
          ))}
        </div>
        <span className="mt-3 inline-flex items-center gap-1 text-sm text-burgundy font-medium">
          Read article
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </span>
      </Link>
    </article>
  );
}
