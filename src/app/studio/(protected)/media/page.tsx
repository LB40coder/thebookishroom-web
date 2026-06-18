import { notFound } from "next/navigation";
import { getAdminPath } from "@/lib/auth/security";
import { MediaLibraryPage } from "@/components/admin/MediaLibraryPage";

export default async function StudioMediaPage() {
  const adminPath = getAdminPath();
  if (!adminPath) notFound();

  return <MediaLibraryPage />;
}
