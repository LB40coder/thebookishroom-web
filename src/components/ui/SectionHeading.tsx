import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  withLines?: boolean;
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  centered = true,
  withLines = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-8 md:mb-10",
        centered && "text-center",
        className
      )}
    >
      {withLines ? (
        <div className="flex items-center gap-4 justify-center">
          <span className="hidden sm:block h-px flex-1 max-w-24 bg-coffee/30" />
          <h2 className="text-2xl md:text-3xl font-serif text-ink">{title}</h2>
          <span className="hidden sm:block h-px flex-1 max-w-24 bg-coffee/30" />
        </div>
      ) : (
        <h2 className="text-2xl md:text-3xl font-serif text-ink">{title}</h2>
      )}
      {subtitle && (
        <p className="mt-2 text-coffee max-w-2xl mx-auto text-sm md:text-base">
          {subtitle}
        </p>
      )}
    </div>
  );
}
