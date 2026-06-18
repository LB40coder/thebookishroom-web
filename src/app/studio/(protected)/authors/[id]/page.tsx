import { notFound } from "next/navigation";
import { getAdminPath } from "@/lib/auth/security";
import { isDatabaseConfigured, prisma } from "@/lib/db";
import { AuthorForm } from "@/components/admin/AuthorForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditAuthorPage({ params }: PageProps) {
  const adminPath = getAdminPath();
  if (!adminPath) notFound();

  const { id } = await params;
  if (!isDatabaseConfigured()) notFound();

  const author = await prisma.author.findUnique({ where: { id } });
  if (!author) notFound();

  return (
    <div>
      <h1 className="font-serif text-2xl text-ink mb-6">Edit Author</h1>
      <AuthorForm adminPath={adminPath} author={author} />
    </div>
  );
}
