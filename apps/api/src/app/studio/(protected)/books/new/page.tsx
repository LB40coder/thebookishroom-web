import { notFound } from "next/navigation";
import { getAdminPath } from "@/lib/auth/security";
import { getGenres } from "@/lib/data/genres";
import { getMoods } from "@/lib/data/moods";
import { getAffiliateLinks } from "@/lib/data/affiliate-links";
import { isDatabaseConfigured, prisma } from "@/lib/db";
import { BookForm } from "@/components/admin/BookForm";

async function getBookFormData() {
  if (!isDatabaseConfigured()) {
    return { authors: [], allBooks: [], genres: [], moods: [], affiliateLinks: [] };
  }

  const [authors, allBooks, genres, moods, affiliateLinks] = await Promise.all([
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
    getAffiliateLinks(),
  ]);

  return { authors, allBooks, genres, moods, affiliateLinks };
}

export default async function NewBookPage() {
  const adminPath = getAdminPath();
  if (!adminPath) notFound();

  const { authors, allBooks, genres, moods, affiliateLinks } = await getBookFormData();

  return (
    <div>
      <h1 className="font-serif text-2xl text-ink mb-6">New Book</h1>
      <BookForm
        adminPath={adminPath}
        authors={authors}
        allBooks={allBooks}
        genres={genres}
        moods={moods}
        affiliateLinks={affiliateLinks}
      />
    </div>
  );
}
