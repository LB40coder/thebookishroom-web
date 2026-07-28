import Link from "next/link";
import {
  resolveBookLinkHref,
  resolveBookLinkTitle,
} from "@/lib/authors/book-links";
import type { AuthorBookLink, Book } from "@/lib/types";

interface AuthorBookLinkListProps {
  links: AuthorBookLink[];
  authorBooks: Book[];
  ordered?: boolean;
}

export function AuthorBookLinkList({
  links,
  authorBooks,
  ordered = false,
}: AuthorBookLinkListProps) {
  const ListTag = ordered ? "ol" : "ul";

  return (
    <ListTag className={ordered ? "space-y-2" : "space-y-1.5"}>
      {links.map((link, index) => {
        const href = resolveBookLinkHref(link, authorBooks);
        const title = resolveBookLinkTitle(link, authorBooks);

        return (
          <li
            key={`${link.title}-${link.url}-${index}`}
            className={ordered ? "flex items-center gap-3 text-sm" : "text-sm"}
          >
            {ordered && (
              <span className="w-6 h-6 rounded-full bg-forest/10 text-forest text-xs flex items-center justify-center font-medium shrink-0">
                {index + 1}
              </span>
            )}
            {href ? (
              <Link
                href={href}
                className="text-burgundy hover:underline font-medium"
                {...(href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {title}
              </Link>
            ) : (
              <span className="text-coffee">{title}</span>
            )}
          </li>
        );
      })}
    </ListTag>
  );
}
