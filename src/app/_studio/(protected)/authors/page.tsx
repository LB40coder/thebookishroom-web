import { isDatabaseConfigured, prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { getAdminPath } from "@/lib/auth/security";

export default async function AdminAuthorsPage() {
  const adminPath = getAdminPath();
  if (!adminPath) notFound();

  const authors = isDatabaseConfigured()
    ? await prisma.author.findMany({ orderBy: { name: "asc" } })
    : [];

  return (
    <div>
      <h1 className="font-serif text-2xl text-ink mb-6">Authors</h1>
      {authors.length === 0 ? (
        <p className="text-sm text-coffee">
          No authors in database. Use the API to create them.
        </p>
      ) : (
        <ul className="space-y-2">
          {authors.map((author) => (
            <li
              key={author.id}
              className="p-3 bg-cream rounded-sm border border-coffee/10 text-sm text-ink"
            >
              {author.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
