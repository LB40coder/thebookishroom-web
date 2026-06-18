import { isDatabaseConfigured, prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { getAdminPath } from "@/lib/auth/security";

export default async function AdminBooksPage() {
  const adminPath = getAdminPath();
  if (!adminPath) notFound();

  const books = isDatabaseConfigured()
    ? await prisma.book.findMany({ orderBy: { title: "asc" } })
    : [];

  return (
    <div>
      <h1 className="font-serif text-2xl text-ink mb-6">Books</h1>
      {books.length === 0 ? (
        <p className="text-sm text-coffee">
          No books in database. Use the API to create them.
        </p>
      ) : (
        <ul className="space-y-2">
          {books.map((book) => (
            <li
              key={book.id}
              className="p-3 bg-cream rounded-sm border border-coffee/10 text-sm text-ink"
            >
              {book.title} — {book.author}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
