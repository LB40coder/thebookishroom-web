"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface AuthorOption {
  name: string;
  slug: string;
}

interface BooksAuthorFilterProps {
  authors: AuthorOption[];
  adminPath: string;
}

export function BooksAuthorFilter({ authors, adminPath }: BooksAuthorFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get("author") ?? "";

  function handleChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set("author", value);
    else params.delete("author");

    const query = params.toString();
    router.push(`/${adminPath}/books${query ? `?${query}` : ""}`);
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <label htmlFor="books-author-filter" className="text-sm text-coffee">
        Author
      </label>
      <select
        id="books-author-filter"
        value={current}
        onChange={(e) => handleChange(e.target.value)}
        className="min-w-[200px] px-3 py-2 text-sm bg-cream border border-coffee/20 rounded-sm focus:outline-none focus:ring-1 focus:ring-forest/50"
      >
        <option value="">All authors</option>
        {authors.map((author) => (
          <option key={author.slug} value={author.slug}>
            {author.name}
          </option>
        ))}
      </select>
    </div>
  );
}
