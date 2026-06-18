import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import type { Post } from "@/lib/types";
import { formatDate } from "@/lib/utils";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="group">
      <Link href={`/reading-lists/${post.slug}`}>
        <div className="relative aspect-[16/10] rounded-sm overflow-hidden mb-4">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <span className="absolute top-3 left-3 bg-forest text-cream text-[10px] font-medium tracking-wider uppercase px-2 py-1 rounded-sm">
            {post.category}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-coffee mb-2">
          <span>{formatDate(post.publishedAt)}</span>
          <span>·</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {post.readingTime} min read
          </span>
        </div>
        <h3 className="font-serif text-lg text-ink group-hover:text-burgundy transition-colors">
          {post.title}
        </h3>
        <p className="mt-2 text-sm text-coffee leading-relaxed line-clamp-2">
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
          View the list
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </span>
      </Link>
    </article>
  );
}
