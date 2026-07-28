"use client";

import type { AffiliateLink } from "@/lib/types";

interface AffiliateLinksPanelProps {
  links: AffiliateLink[];
  onInsert: (link: AffiliateLink) => void;
  emptyMessage?: string;
}

export function AffiliateLinksPanel({
  links,
  onInsert,
  emptyMessage = "No saved affiliate links yet.",
}: AffiliateLinksPanelProps) {
  if (links.length === 0) {
    return <p className="text-xs text-coffee">{emptyMessage}</p>;
  }

  return (
    <div className="space-y-2 max-h-56 overflow-y-auto">
      {links.map((link) => (
        <div
          key={link.id}
          className="p-2.5 border border-coffee/10 rounded-sm bg-cream-dark/30"
        >
          <div className="text-sm text-ink">{link.title}</div>
          {link.bookSlug && (
            <div className="text-[11px] text-coffee mt-0.5">{link.bookSlug}</div>
          )}
          <div className="flex flex-wrap gap-2 mt-2">
            <button
              type="button"
              onClick={() => onInsert(link)}
              className="text-xs px-2 py-1 bg-forest text-cream rounded-sm hover:bg-forest/90"
            >
              Insert in content
            </button>
            <button
              type="button"
              onClick={() => navigator.clipboard.writeText(link.url)}
              className="text-xs px-2 py-1 border border-coffee/20 text-coffee rounded-sm hover:bg-cream-dark"
            >
              Copy URL
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
