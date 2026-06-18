import { notFound } from "next/navigation";
import { getAdminPath } from "@/lib/auth/security";
import { isDatabaseConfigured, prisma } from "@/lib/db";
import { BookForm } from "@/components/admin/BookForm";

async function getBookFormData() {
  if (!isDatabaseConfigured()) {
    return { authors: [], allBooks: [] };
  }

  const [authors, allBooks] = await Promise.all([
    prisma.author.findMany({
      orderBy: { name: "asc" },
      select: { name: true, slug: true },
    }),
    prisma.book.findMany({
      orderBy: { title: "asc" },
      select: { id: true, title: true, slug: true, author: true },
    }),
  ]);

  return { authors, allBooks };
}

export default async function NewBookPage() {
  const adminPath = getAdminPath();
  if (!adminPath) notFound();

  const { authors, allBooks } = await getBookFormData();

  return (
    <div>
      <h1 className="font-serif text-2xl text-ink mb-6">New Book</h1>
      <BookForm adminPath={adminPath} authors={authors} allBooks={allBooks} />
    </div>
  );
}
