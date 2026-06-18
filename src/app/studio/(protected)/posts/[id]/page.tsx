import { notFound } from "next/navigation";
import { getAdminPath } from "@/lib/auth/security";
import { isDatabaseConfigured, prisma } from "@/lib/db";
import { PostForm } from "@/components/admin/PostForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: PageProps) {
  const adminPath = getAdminPath();
  if (!adminPath) notFound();

  const { id } = await params;

  if (!isDatabaseConfigured()) notFound();

  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) notFound();

  return (
    <div>
      <h1 className="font-serif text-2xl text-ink mb-6">Edit Post</h1>
      <PostForm adminPath={adminPath} post={post} />
    </div>
  );
}
