import Image from "next/image";
import Link from "next/link";
import type { Book } from "@/lib/types";
import { Button } from "@/components/ui/Button";

interface BookCardProps {
  book: Book;
  showDetails?: boolean;
}

export function BookCard({ book, showDetails = true }: BookCardProps) {
  return (
    <article className="bg-cream rounded-sm border border-coffee/10 overflow-hidden hover:border-coffee/25 transition-colors">
      <div className="relative aspect-[3/4] bg-cream-dark">
        {book.coverImage ? (
          <Image
            src={book.coverImage}
            alt={book.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-coffee font-serif text-lg p-4 text-center">
            {book.title}
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-serif text-base text-ink leading-snug">
          {book.title}
        </h3>
        <p className="text-sm text-coffee mt-1">
          {book.author} · {book.year}
        </p>
        {showDetails && (
          <>
            <p className="mt-2 text-sm text-coffee leading-relaxed line-clamp-2">
              {book.description}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              <span className="text-[10px] uppercase tracking-wider text-forest bg-forest/5 px-2 py-0.5 rounded-sm">
                {book.difficulty}
              </span>
              <span className="text-[10px] uppercase tracking-wider text-burgundy bg-burgundy/5 px-2 py-0.5 rounded-sm">
                {book.length}
              </span>
            </div>
            <Button
              href={`/books/${book.slug}`}
              variant="outline"
              className="mt-4 w-full text-xs py-2"
            >
              View Book Details
            </Button>
          </>
        )}
      </div>
    </article>
  );
}
