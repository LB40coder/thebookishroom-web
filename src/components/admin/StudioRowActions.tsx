import Link from "next/link";

interface StudioRowActionsProps {
  editHref: string;
  viewHref?: string;
  viewLabel?: string;
}

export function StudioRowActions({
  editHref,
  viewHref,
  viewLabel = "View",
}: StudioRowActionsProps) {
  return (
    <div className="inline-flex items-center justify-end gap-3">
      {viewHref && (
        <Link
          href={viewHref}
          target="_blank"
          rel="noopener noreferrer"
          className="text-forest hover:underline text-xs"
        >
          {viewLabel}
        </Link>
      )}
      <Link href={editHref} className="text-burgundy hover:underline text-xs">
        Edit
      </Link>
    </div>
  );
}
