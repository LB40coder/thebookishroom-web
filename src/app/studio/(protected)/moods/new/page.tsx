import { notFound } from "next/navigation";
import { getAdminPath } from "@/lib/auth/security";
import { MoodForm } from "@/components/admin/MoodForm";

export default async function NewMoodPage() {
  const adminPath = getAdminPath();
  if (!adminPath) notFound();

  return (
    <div>
      <h1 className="font-serif text-2xl text-ink mb-6">New Mood</h1>
      <MoodForm adminPath={adminPath} />
    </div>
  );
}
