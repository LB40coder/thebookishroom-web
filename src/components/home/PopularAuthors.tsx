import Link from "next/link";
import { authors as authorList } from "@/lib/data/authors";
import { getBooksByAuthor } from "@/lib/data/books";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CoverImage } from "@/components/ui/CoverImage";

export function PopularAuthors() {
  return (
    <section className="section-padding">
      <div className="section-container">
        <SectionHeading title="Popular Authors" />

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-6">
          {authorList.map((author) => {
            const bookCount = getBooksByAuthor(author.slug).length;
            return (
              <Link
                key={author.slug}
                href={`/authors/${author.slug}`}
                className="group flex flex-col items-center text-center"
              >
                <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-coffee/15 group-hover:border-burgundy/40 transition-colors">
                  {author.image ? (
                    <CoverImage
                      src={author.image}
                      alt={author.name}
                      variant="avatar"
                    />
                  ) : (
                    <div className="w-full h-full bg-cream-dark flex items-center justify-center text-coffee font-serif text-lg">
                      {author.name.charAt(0)}
                    </div>
                  )}
                </div>
                <h3 className="mt-3 text-sm font-medium text-ink group-hover:text-burgundy transition-colors leading-tight">
                  {author.name}
                </h3>
                <p className="text-xs text-coffee mt-0.5">
                  {bookCount} {bookCount === 1 ? "Book" : "Books"}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
