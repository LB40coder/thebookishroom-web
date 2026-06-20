import { notFound } from "next/navigation";
import { getAdminPath } from "@/lib/auth/security";
import { PostForm } from "@/components/admin/PostForm";

export default async function NewPostPage() {
  const adminPath = getAdminPath();
  if (!adminPath) notFound();

  return (
    <div className="max-w-[1400px]">
      <h1 className="font-serif text-2xl text-ink mb-6">New Post</h1>
      <PostForm adminPath={adminPath} />
    </div>
  );
}
