import { notFound } from "next/navigation";
import { getAdminPath } from "@/lib/auth/security";
import { AuthorForm } from "@/components/admin/AuthorForm";

export default async function NewAuthorPage() {
  const adminPath = getAdminPath();
  if (!adminPath) notFound();

  return (
    <div>
      <h1 className="font-serif text-2xl text-ink mb-6">New Author</h1>
      <AuthorForm adminPath={adminPath} />
    </div>
  );
}
