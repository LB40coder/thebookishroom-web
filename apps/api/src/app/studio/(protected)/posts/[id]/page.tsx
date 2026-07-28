import { notFound } from "next/navigation";
import { getAdminPath } from "@/lib/auth/security";
import { isDatabaseConfigured, prisma } from "@/lib/db";
import { getAffiliateLinksForBooks } from "@/lib/data/affiliate-links";
import { getPostDisplayStatus } from "@/lib/posts/visibility";
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

  const affiliateLinks = await getAffiliateLinksForBooks(post.relatedBooks);
  const status = getPostDisplayStatus(post.published, post.publishedAt);

  return (
    <div className="max-w-[1400px]">
      <StudioEditHeader
        title="Edit Post"
        viewHref={
          status === "published" ? `/reading-lists/${post.slug}` : undefined
        }
        viewLabel="View post"
      />
      <PostForm adminPath={adminPath} post={post} affiliateLinks={affiliateLinks} />
    </div>
  );
}
