import Link from "next/link";
import { Suspense } from "react";
import { isDatabaseConfigured, prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { getAdminPath } from "@/lib/auth/security";
import { StudioRowActions } from "@/components/admin/StudioRowActions";
import { BooksAuthorFilter } from "@/components/admin/BooksAuthorFilter";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{ author?: string }>;
}

export default async function AdminBooksPage({ searchParams }: PageProps) {
  const adminPath = getAdminPath();
  if (!adminPath) notFound();

  const { author: authorSlug } = await searchParams;

  const [books, authors] = isDatabaseConfigured()
    ? await Promise.all([
        prisma.book.findMany({
          where: authorSlug ? { authorSlug } : undefined,
          orderBy: { title: "asc" },
        }),
        prisma.author.findMany({
          orderBy: { name: "asc" },
          select: { name: true, slug: true },
        }),
      ])
    : [[], []];

  const selectedAuthor = authorSlug
    ? authors.find((a) => a.slug === authorSlug)
    : null;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="font-serif text-2xl text-ink">Books</h1>
        <Link
          href={`/${adminPath}/books/new`}
          className="px-4 py-2 bg-forest text-cream text-sm rounded-sm hover:bg-forest/90 transition-colors"
        >
          New Book
        </Link>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <Suspense fallback={null}>
          <BooksAuthorFilter authors={authors} adminPath={adminPath} />
        </Suspense>
        <p className="text-sm text-coffee">
          {selectedAuthor
            ? `${books.length} book${books.length === 1 ? "" : "s"} by ${selectedAuthor.name}`
            : `${books.length} book${books.length === 1 ? "" : "s"}`}
        </p>
      </div>

      {books.length === 0 ? (
        <p className="text-sm text-coffee">
          {selectedAuthor
            ? `No books found for ${selectedAuthor.name}.`
            : "No books in database yet."}
        </p>
      ) : (
        <div className="bg-cream rounded-sm border border-coffee/10 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-cream-dark border-b border-coffee/10">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-coffee">Title</th>
                <th className="text-left px-4 py-3 font-medium text-coffee hidden sm:table-cell">Author</th>
                <th className="text-left px-4 py-3 font-medium text-coffee hidden md:table-cell">Year</th>
                <th className="text-right px-4 py-3 font-medium text-coffee">Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id} className="border-b border-coffee/5 last:border-0">
                  <td className="px-4 py-3 text-ink">{book.title}</td>
                  <td className="px-4 py-3 text-coffee hidden sm:table-cell">{book.author}</td>
                  <td className="px-4 py-3 text-coffee hidden md:table-cell">{book.year}</td>
                  <td className="px-4 py-3 text-right">
                    <StudioRowActions
                      editHref={`/${adminPath}/books/${book.id}`}
                      viewHref={book.published ? `/books/${book.slug}` : undefined}
                      viewLabel="View book"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
