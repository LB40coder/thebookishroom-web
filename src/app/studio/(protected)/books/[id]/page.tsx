import { notFound } from "next/navigation";
import { getAdminPath } from "@/lib/auth/security";
import { isDatabaseConfigured, prisma } from "@/lib/db";
import { BookForm } from "@/components/admin/BookForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditBookPage({ params }: PageProps) {
  const adminPath = getAdminPath();
  if (!adminPath) notFound();

  const { id } = await params;
  if (!isDatabaseConfigured()) notFound();

  const [book, authors, allBooks] = await Promise.all([
    prisma.book.findUnique({ where: { id } }),
    prisma.author.findMany({
      orderBy: { name: "asc" },
      select: { name: true, slug: true },
    }),
    prisma.book.findMany({
      orderBy: { title: "asc" },
      select: { id: true, title: true, slug: true, author: true },
    }),
  ]);

  if (!book) notFound();

  return (
    <div>
      <h1 className="font-serif text-2xl text-ink mb-6">Edit Book</h1>
      <BookForm
        adminPath={adminPath}
        book={book}
        authors={authors}
        allBooks={allBooks}
      />
    </div>
  );
}
