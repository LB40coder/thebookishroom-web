"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { TrendingUp } from "lucide-react";
import { getTrendingPosts } from "@/lib/data/posts";
import { cn } from "@/lib/utils";

const trendingPosts = getTrendingPosts();
const SLIDE_INTERVAL = 4500;

export function AnnouncementBar() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (trendingPosts.length <= 1) return;

    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % trendingPosts.length);
        setIsAnimating(false);
      }, 300);
    }, SLIDE_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  if (trendingPosts.length === 0) return null;

  const post = trendingPosts[current];

  return (
    <div className="bg-forest text-cream text-xs sm:text-sm py-2.5">
      <div className="section-container flex items-center gap-2 sm:gap-3">
        <span className="inline-flex items-center gap-1.5 shrink-0 text-gold font-medium">
          <TrendingUp className="w-3.5 h-3.5" />
          Trending
        </span>

        <span className="text-cream/30 hidden sm:inline">|</span>

        <div className="relative h-5 flex-1 min-w-0 overflow-hidden">
          <Link
            href={`/reading-lists/${post.slug}`}
            className={cn(
              "block truncate hover:text-gold transition-colors duration-300",
              isAnimating
                ? "opacity-0 translate-y-2"
                : "opacity-100 translate-y-0"
            )}
          >
            {post.title}
          </Link>
        </div>

        {trendingPosts.length > 1 && (
          <div className="hidden sm:flex items-center gap-1 shrink-0">
            {trendingPosts.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setIsAnimating(true);
                  setTimeout(() => {
                    setCurrent(i);
                    setIsAnimating(false);
                  }, 150);
                }}
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-colors",
                  i === current ? "bg-gold" : "bg-cream/30 hover:bg-cream/50"
                )}
                aria-label={`Go to trending post ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
