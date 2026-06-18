import Link from "next/link";
import { notFound } from "next/navigation";
import { getAdminPath } from "@/lib/auth/security";
import { isDatabaseConfigured, prisma } from "@/lib/db";

export default async function AdminPostsPage() {
  const adminPath = getAdminPath();
  if (!adminPath) notFound();

  const posts = isDatabaseConfigured()
    ? await prisma.post.findMany({ orderBy: { updatedAt: "desc" } })
    : [];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl text-ink">Posts</h1>
        <Link
          href={`/${adminPath}/posts/new`}
          className="px-4 py-2 bg-forest text-cream text-sm rounded-sm hover:bg-forest/90 transition-colors"
        >
          New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="text-coffee text-sm">No posts in database yet.</p>
      ) : (
        <div className="bg-cream rounded-sm border border-coffee/10 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-cream-dark border-b border-coffee/10">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-coffee">Title</th>
                <th className="text-left px-4 py-3 font-medium text-coffee hidden sm:table-cell">Status</th>
                <th className="text-left px-4 py-3 font-medium text-coffee hidden md:table-cell">Views</th>
                <th className="text-right px-4 py-3 font-medium text-coffee">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b border-coffee/5 last:border-0">
                  <td className="px-4 py-3 text-ink">{post.title}</td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-sm ${
                        post.published
                          ? "bg-forest/10 text-forest"
                          : "bg-coffee/10 text-coffee"
                      }`}
                    >
                      {post.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-coffee hidden md:table-cell">
                    {post.views}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/${adminPath}/posts/${post.id}`}
                      className="text-burgundy hover:underline text-xs"
                    >
                      Edit
                    </Link>
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
