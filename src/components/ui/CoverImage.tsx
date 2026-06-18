import Image from "next/image";
import {
  optimizeCoverUrl,
  shouldSkipImageOptimization,
  IMAGE_VARIANTS,
  type CoverImageVariant,
} from "@/lib/image-config";
import { cn } from "@/lib/utils";

interface CoverImageProps {
  src: string;
  alt: string;
  variant: CoverImageVariant;
  className?: string;
  priority?: boolean;
}

export function CoverImage({
  src,
  alt,
  variant,
  className,
  priority = false,
}: CoverImageProps) {
  const optimizedSrc = optimizeCoverUrl(src, variant);
  const { sizes, quality } = IMAGE_VARIANTS[variant];

  return (
    <Image
      src={optimizedSrc}
      alt={alt}
      fill
      className={cn("object-cover", className)}
      sizes={sizes}
      quality={quality}
      priority={priority}
      unoptimized={shouldSkipImageOptimization(optimizedSrc)}
      loading={priority ? undefined : "lazy"}
    />
  );
}
