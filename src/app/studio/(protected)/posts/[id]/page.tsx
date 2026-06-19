import { notFound } from "next/navigation";
import { getAdminPath } from "@/lib/auth/security";
import { isDatabaseConfigured, prisma } from "@/lib/db";
import { PostForm } from "@/components/admin/PostForm";
import { StudioEditHeader } from "@/components/admin/StudioEditHeader";

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
      <StudioEditHeader
        title="Edit Post"
        viewHref={post.published ? `/reading-lists/${post.slug}` : undefined}
        viewLabel="View post"
      />
      <PostForm adminPath={adminPath} post={post} />
    </div>
  );
}
