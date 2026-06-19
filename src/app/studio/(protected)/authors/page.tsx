import Link from "next/link";
import { isDatabaseConfigured, prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { getAdminPath } from "@/lib/auth/security";
import { StudioRowActions } from "@/components/admin/StudioRowActions";

export default async function AdminAuthorsPage() {
  const adminPath = getAdminPath();
  if (!adminPath) notFound();

  const authors = isDatabaseConfigured()
    ? await prisma.author.findMany({ orderBy: { name: "asc" } })
    : [];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl text-ink">Authors</h1>
        <Link
          href={`/${adminPath}/authors/new`}
          className="px-4 py-2 bg-forest text-cream text-sm rounded-sm hover:bg-forest/90 transition-colors"
        >
          New Author
        </Link>
      </div>

      {authors.length === 0 ? (
        <p className="text-sm text-coffee">No authors in database yet.</p>
      ) : (
        <div className="bg-cream rounded-sm border border-coffee/10 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-cream-dark border-b border-coffee/10">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-coffee">Name</th>
                <th className="text-left px-4 py-3 font-medium text-coffee hidden sm:table-cell">Nationality</th>
                <th className="text-right px-4 py-3 font-medium text-coffee">Actions</th>
              </tr>
            </thead>
            <tbody>
              {authors.map((author) => (
                <tr key={author.id} className="border-b border-coffee/5 last:border-0">
                  <td className="px-4 py-3 text-ink">{author.name}</td>
                  <td className="px-4 py-3 text-coffee hidden sm:table-cell">{author.nationality}</td>
                  <td className="px-4 py-3 text-right">
                    <StudioRowActions
                      editHref={`/${adminPath}/authors/${author.id}`}
                      viewHref={author.published ? `/authors/${author.slug}` : undefined}
                      viewLabel="View author"
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
