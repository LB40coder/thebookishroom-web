import { notFound } from "next/navigation";
import { getAdminPath } from "@/lib/auth/security";
import { isDatabaseConfigured, prisma } from "@/lib/db";
import { AffiliateLinkForm } from "@/components/admin/AffiliateLinkForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditAffiliateLinkPage({ params }: PageProps) {
  const adminPath = getAdminPath();
  if (!adminPath) notFound();

  const { id } = await params;
  if (!isDatabaseConfigured()) notFound();

  const [link, books] = await Promise.all([
    prisma.affiliateLink.findUnique({ where: { id } }),
    prisma.book.findMany({
      orderBy: { title: "asc" },
      select: { title: true, slug: true },
    }),
  ]);

  if (!link) notFound();

  return (
    <div>
      <h1 className="font-serif text-2xl text-ink mb-6">Edit Affiliate Link</h1>
      <AffiliateLinkForm adminPath={adminPath} link={link} books={books} />
    </div>
  );
}
