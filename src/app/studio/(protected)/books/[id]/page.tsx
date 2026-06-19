import { notFound } from "next/navigation";
import { getAdminPath } from "@/lib/auth/security";
import { getGenres } from "@/lib/data/genres";
import { getMoods } from "@/lib/data/moods";
import { isDatabaseConfigured, prisma } from "@/lib/db";
import { BookForm } from "@/components/admin/BookForm";
import { StudioEditHeader } from "@/components/admin/StudioEditHeader";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditBookPage({ params }: PageProps) {
  const adminPath = getAdminPath();
  if (!adminPath) notFound();

  const { id } = await params;
  if (!isDatabaseConfigured()) notFound();

  const [book, authors, allBooks, genres, moods] = await Promise.all([
    prisma.book.findUnique({ where: { id } }),
    prisma.author.findMany({
      orderBy: { name: "asc" },
      select: { name: true, slug: true },
    }),
    prisma.book.findMany({
      orderBy: { title: "asc" },
      select: { id: true, title: true, slug: true, author: true },
    }),
    getGenres(),
    getMoods(),
  ]);

  if (!book) notFound();

  return (
    <div>
      <StudioEditHeader
        title="Edit Book"
        viewHref={book.published ? `/books/${book.slug}` : undefined}
        viewLabel="View book"
      />
      <BookForm
        adminPath={adminPath}
        book={book}
        authors={authors}
        allBooks={allBooks}
        genres={genres}
        moods={moods}
      />
    </div>
  );
}
