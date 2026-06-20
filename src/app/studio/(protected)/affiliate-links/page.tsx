import Link from "next/link";
import { notFound } from "next/navigation";
import { getAdminPath } from "@/lib/auth/security";
import { isDatabaseConfigured, prisma } from "@/lib/db";
import { StudioRowActions } from "@/components/admin/StudioRowActions";

export default async function AdminAffiliateLinksPage() {
  const adminPath = getAdminPath();
  if (!adminPath) notFound();

  const links = isDatabaseConfigured()
    ? await prisma.affiliateLink.findMany({
        orderBy: [{ bookSlug: "asc" }, { title: "asc" }],
      })
    : [];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl text-ink">Affiliate Links</h1>
          <p className="text-sm text-coffee mt-1">
            Save Amazon affiliate URLs once and reuse them in books and posts.
          </p>
        </div>
        <Link
          href={`/${adminPath}/affiliate-links/new`}
          className="px-4 py-2 bg-forest text-cream text-sm rounded-sm hover:bg-forest/90 transition-colors"
        >
          New Link
        </Link>
      </div>

      {links.length === 0 ? (
        <p className="text-sm text-coffee">No affiliate links saved yet.</p>
      ) : (
        <div className="bg-cream rounded-sm border border-coffee/10 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-cream-dark border-b border-coffee/10">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-coffee">Title</th>
                <th className="text-left px-4 py-3 font-medium text-coffee hidden md:table-cell">
                  Book
                </th>
                <th className="text-right px-4 py-3 font-medium text-coffee">Actions</th>
              </tr>
            </thead>
            <tbody>
              {links.map((link) => (
                <tr key={link.id} className="border-b border-coffee/5 last:border-0">
                  <td className="px-4 py-3">
                    <div className="text-ink">{link.title}</div>
                    <div className="text-xs text-coffee truncate max-w-md">{link.url}</div>
                  </td>
                  <td className="px-4 py-3 text-coffee hidden md:table-cell">
                    {link.bookSlug ?? "General"}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <StudioRowActions
                      editHref={`/${adminPath}/affiliate-links/${link.id}`}
                      viewHref={link.url}
                      viewLabel="Open link"
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
