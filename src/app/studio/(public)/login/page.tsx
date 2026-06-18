import { redirect } from "next/navigation";
import { getSessionFromCookies } from "@/lib/auth/session";
import { getAdminPath } from "@/lib/auth/security";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";

export default async function AdminLoginPage() {
  const isLoggedIn = await getSessionFromCookies();
  const adminPath = getAdminPath();

  if (isLoggedIn && adminPath) {
    redirect(`/${adminPath}`);
  }

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="font-serif text-cream text-xl">The Bookish Room</p>
          <p className="text-coffee text-sm mt-1">Studio access</p>
        </div>
        <AdminLoginForm adminPath={adminPath} />
      </div>
    </div>
  );
}
