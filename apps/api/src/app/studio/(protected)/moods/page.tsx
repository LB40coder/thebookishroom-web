import Link from "next/link";
import { notFound } from "next/navigation";
import { getAdminPath } from "@/lib/auth/security";
import { isDatabaseConfigured, prisma } from "@/lib/db";
import { getMoodIcon } from "@/lib/icons/mood-icons";
import { StudioRowActions } from "@/components/admin/StudioRowActions";

export default async function AdminMoodsPage() {
  const adminPath = getAdminPath();
  if (!adminPath) notFound();

  const moods = isDatabaseConfigured()
    ? await prisma.mood.findMany({ orderBy: { name: "asc" } })
    : [];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl text-ink">Moods</h1>
        <Link
          href={`/${adminPath}/moods/new`}
          className="px-4 py-2 bg-forest text-cream text-sm rounded-sm hover:bg-forest/90 transition-colors"
        >
          New Mood
        </Link>
      </div>

      {moods.length === 0 ? (
        <p className="text-sm text-coffee">No moods in database yet.</p>
      ) : (
        <div className="bg-cream rounded-sm border border-coffee/10 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-cream-dark border-b border-coffee/10">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-coffee w-14">Icon</th>
                <th className="text-left px-4 py-3 font-medium text-coffee">Name</th>
                <th className="text-left px-4 py-3 font-medium text-coffee hidden md:table-cell">
                  Slug
                </th>
                <th className="text-right px-4 py-3 font-medium text-coffee">Actions</th>
              </tr>
            </thead>
            <tbody>
              {moods.map((mood) => {
                const Icon = getMoodIcon(mood.icon);
                return (
                  <tr key={mood.id} className="border-b border-coffee/5 last:border-0">
                    <td className="px-4 py-3">
                      <div className="w-9 h-9 rounded-full bg-cream-dark border border-coffee/10 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-coffee" />
                      </div>
                    </td>
                    <td className="px-4 py-3 text-ink">{mood.name}</td>
                    <td className="px-4 py-3 text-coffee hidden md:table-cell">{mood.slug}</td>
                    <td className="px-4 py-3 text-right">
                      <StudioRowActions
                      editHref={`/${adminPath}/moods/${mood.id}`}
                      viewHref={`/book-moods/${mood.slug}`}
                      viewLabel="View mood"
                    />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
