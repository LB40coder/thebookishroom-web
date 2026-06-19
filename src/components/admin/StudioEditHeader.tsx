import Link from "next/link";

interface StudioEditHeaderProps {
  title: string;
  viewHref?: string;
  viewLabel?: string;
}

export function StudioEditHeader({
  title,
  viewHref,
  viewLabel = "View on site",
}: StudioEditHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
      <h1 className="font-serif text-2xl text-ink">{title}</h1>
      {viewHref && (
        <Link
          href={viewHref}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-forest hover:underline"
        >
          {viewLabel}
        </Link>
      )}
    </div>
  );
}
