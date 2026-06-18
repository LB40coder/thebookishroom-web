import Link from "next/link";
import { notFound } from "next/navigation";
import { getAdminPath } from "@/lib/auth/security";
import { isDatabaseConfigured, prisma } from "@/lib/db";

export default async function AdminDashboard() {
  const adminPath = getAdminPath();
  if (!adminPath) notFound();

  let stats = { posts: 0, books: 0, authors: 0, published: 0 };

  if (isDatabaseConfigured()) {
    const [posts, books, authors, published] = await Promise.all([
      prisma.post.count(),
      prisma.book.count(),
      prisma.author.count(),
      prisma.post.count({ where: { published: true } }),
    ]);
    stats = { posts, books, authors, published };
  }

  return (
    <div>
      <h1 className="font-serif text-2xl text-ink mb-6">Dashboard</h1>

      {!isDatabaseConfigured() && (
        <div className="mb-6 p-4 bg-burgundy/10 border border-burgundy/20 rounded-sm text-sm text-burgundy">
          Database not configured. Set <code>DATABASE_URL</code> in your
          environment, then run <code>npx prisma db push</code>.
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Posts", value: stats.posts },
          { label: "Published", value: stats.published },
          { label: "Books", value: stats.books },
          { label: "Authors", value: stats.authors },
        ].map((item) => (
          <div
            key={item.label}
            className="p-4 bg-cream rounded-sm border border-coffee/10"
          >
            <p className="text-xs text-coffee uppercase tracking-wider">
              {item.label}
            </p>
            <p className="mt-1 text-2xl font-serif text-ink">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="p-5 bg-cream rounded-sm border border-coffee/10">
        <h2 className="font-serif text-lg text-ink mb-2">Bot API</h2>
        <p className="text-sm text-coffee mb-3">
          Your automation bot should send requests with the API key:
        </p>
        <pre className="text-xs bg-cream-dark p-3 rounded-sm overflow-x-auto text-ink">
{`POST /api/v1/posts
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json`}
        </pre>
        <p className="mt-3 text-xs text-coffee">
          See <code>SECURITY.md</code> for full API documentation.
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href={`/${adminPath}/posts`}
          className="px-4 py-2 bg-forest text-cream text-sm rounded-sm hover:bg-forest/90 transition-colors"
        >
          Posts
        </Link>
        <Link
          href={`/${adminPath}/books`}
          className="px-4 py-2 bg-forest text-cream text-sm rounded-sm hover:bg-forest/90 transition-colors"
        >
          Books
        </Link>
        <Link
          href={`/${adminPath}/authors`}
          className="px-4 py-2 bg-forest text-cream text-sm rounded-sm hover:bg-forest/90 transition-colors"
        >
          Authors
        </Link>
        <Link
          href={`/${adminPath}/media`}
          className="px-4 py-2 border border-forest text-forest text-sm rounded-sm hover:bg-forest/5 transition-colors"
        >
          Media Library
        </Link>
      </div>
    </div>
  );
}
