import Link from "next/link";
import type { Author } from "@/lib/types";
import { CoverImage } from "@/components/ui/CoverImage";

interface AuthorCardProps {
  author: Author;
  bookCount?: number;
}

export function AuthorCard({ author, bookCount = 0 }: AuthorCardProps) {
  return (
    <Link
      href={`/authors/${author.slug}`}
      className="group flex flex-col items-center text-center p-4 bg-cream rounded-sm border border-coffee/10 hover:border-coffee/25 transition-colors"
    >
      <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-coffee/15 group-hover:border-burgundy/40 transition-colors">
        {author.image ? (
          <CoverImage
            src={author.image}
            alt={author.name}
            variant="avatar"
          />
        ) : (
          <div className="w-full h-full bg-cream-dark flex items-center justify-center text-coffee font-serif text-2xl">
            {author.name.charAt(0)}
          </div>
        )}
      </div>
      <h3 className="mt-4 font-serif text-lg text-ink group-hover:text-burgundy transition-colors">
        {author.name}
      </h3>
      <p className="text-sm text-coffee mt-1">{author.nationality}</p>
      <p className="text-xs text-coffee/70 mt-0.5">
        {bookCount} {bookCount === 1 ? "book" : "books"} listed
      </p>
    </Link>
  );
}
