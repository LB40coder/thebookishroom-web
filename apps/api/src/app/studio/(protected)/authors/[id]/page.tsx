import { notFound } from "next/navigation";
import { getAdminPath } from "@/lib/auth/security";
import { isDatabaseConfigured, prisma } from "@/lib/db";
import { AuthorForm } from "@/components/admin/AuthorForm";
import { StudioEditHeader } from "@/components/admin/StudioEditHeader";

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
      <StudioEditHeader
        title="Edit Author"
        viewHref={author.published ? `/authors/${author.slug}` : undefined}
        viewLabel="View author"
      />
      <AuthorForm adminPath={adminPath} author={author} />
    </div>
  );
}
