import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { getSessionFromCookies } from "@/lib/auth/session";
import { getAdminPath } from "@/lib/auth/security";
import { AdminLogoutButton } from "@/components/admin/AdminLogoutButton";

export const dynamic = "force-dynamic";

export default async function ProtectedStudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const adminPath = getAdminPath();
  if (!adminPath) notFound();

  const isLoggedIn = await getSessionFromCookies();
  if (!isLoggedIn) {
    redirect(`/${adminPath}/login`);
  }

  return (
    <div className="min-h-screen bg-cream-dark">
      <header className="bg-forest text-cream border-b border-forest-light">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="font-serif text-sm">Studio</span>
            <nav className="flex items-center gap-4 text-sm">
              <Link
                href={`/${adminPath}`}
                className="text-cream/80 hover:text-cream transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href={`/${adminPath}/posts`}
                className="text-cream/80 hover:text-cream transition-colors"
              >
                Posts
              </Link>
              <Link
                href={`/${adminPath}/books`}
                className="text-cream/80 hover:text-cream transition-colors"
              >
                Books
              </Link>
              <Link
                href={`/${adminPath}/authors`}
                className="text-cream/80 hover:text-cream transition-colors"
              >
                Authors
              </Link>
              <Link
                href={`/${adminPath}/affiliate-links`}
                className="text-cream/80 hover:text-cream transition-colors"
              >
                Affiliate Links
              </Link>
              <Link
                href={`/${adminPath}/media`}
                className="text-cream/80 hover:text-cream transition-colors"
              >
                Media
              </Link>
              <Link
                href={`/${adminPath}/moods`}
                className="text-cream/80 hover:text-cream transition-colors"
              >
                Moods
              </Link>
            </nav>
          </div>
          <AdminLogoutButton adminPath={adminPath} />
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
