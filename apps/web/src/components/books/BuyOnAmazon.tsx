import { ExternalLink } from "lucide-react";
import { AMAZON_LANGUAGE_ORDER } from "@/lib/books/amazon-editions";
import type { AmazonEdition } from "@/lib/types";

interface BuyOnAmazonProps {
  editions: AmazonEdition[];
}

export function BuyOnAmazon({ editions }: BuyOnAmazonProps) {
  if (!editions.length) return null;

  const sorted = [...editions].sort(
    (a, b) =>
      AMAZON_LANGUAGE_ORDER[a.language] - AMAZON_LANGUAGE_ORDER[b.language]
  );

  return (
    <section className="mt-6 p-4 bg-cream-dark/50 rounded-sm border border-coffee/10">
      <h2 className="font-serif text-base text-ink mb-3">Buy on Amazon</h2>
      <ul className="space-y-2">
        {sorted.map((edition, index) => (
          <li key={`${edition.language}-${index}`}>
            <a
              href={edition.url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="flex items-center justify-between gap-3 px-3 py-2.5 bg-cream rounded-sm border border-coffee/15 hover:border-burgundy/40 hover:bg-burgundy/5 transition-colors group"
            >
              <span>
                <span className="block text-sm font-medium text-ink group-hover:text-burgundy transition-colors">
                  {edition.label}
                </span>
                {edition.format && (
                  <span className="block text-xs text-coffee capitalize mt-0.5">
                    {edition.format}
                  </span>
                )}
              </span>
              <ExternalLink className="w-4 h-4 text-coffee group-hover:text-burgundy shrink-0 transition-colors" />
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[10px] text-coffee/70 leading-relaxed">
        As an Amazon Associate, we may earn from qualifying purchases.
      </p>
    </section>
  );
}
