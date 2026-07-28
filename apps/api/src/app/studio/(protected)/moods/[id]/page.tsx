import { notFound } from "next/navigation";
import { getAdminPath } from "@/lib/auth/security";
import { isDatabaseConfigured, prisma } from "@/lib/db";
import { MoodForm } from "@/components/admin/MoodForm";
import { StudioEditHeader } from "@/components/admin/StudioEditHeader";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditMoodPage({ params }: PageProps) {
  const adminPath = getAdminPath();
  if (!adminPath) notFound();

  const { id } = await params;
  if (!isDatabaseConfigured()) notFound();

  const mood = await prisma.mood.findUnique({ where: { id } });
  if (!mood) notFound();

  return (
    <div>
      <StudioEditHeader
        title="Edit Mood"
        viewHref={`/book-moods/${mood.slug}`}
        viewLabel="View mood"
      />
      <MoodForm adminPath={adminPath} mood={mood} />
    </div>
  );
}
