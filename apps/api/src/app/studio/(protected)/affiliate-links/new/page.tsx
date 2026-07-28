import { notFound } from "next/navigation";
import { getAdminPath } from "@/lib/auth/security";
import { isDatabaseConfigured, prisma } from "@/lib/db";
import { AffiliateLinkForm } from "@/components/admin/AffiliateLinkForm";

async function getBooks() {
  if (!isDatabaseConfigured()) return [];
  return prisma.book.findMany({
    orderBy: { title: "asc" },
    select: { title: true, slug: true },
  });
}

export default async function NewAffiliateLinkPage() {
  const adminPath = getAdminPath();
  if (!adminPath) notFound();

  const books = await getBooks();

  return (
    <div>
      <h1 className="font-serif text-2xl text-ink mb-6">New Affiliate Link</h1>
      <AffiliateLinkForm adminPath={adminPath} books={books} />
    </div>
  );
}
