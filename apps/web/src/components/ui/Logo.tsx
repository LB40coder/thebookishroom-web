import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { images } from "@/lib/images";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: { height: 32, width: 134 },
  md: { height: 40, width: 168 },
  lg: { height: 48, width: 202 },
};

export function Logo({ className, size = "md" }: LogoProps) {
  const { height, width } = sizes[size];

  return (
    <Link
      href="/"
      className={cn("inline-flex shrink-0 items-center", className)}
      aria-label="The Bookish Room — Home"
    >
      <Image
        src={images.logo}
        alt="The Bookish Room"
        width={width}
        height={height}
        className="h-auto w-auto object-contain"
        style={{ maxHeight: height }}
        priority
      />
    </Link>
  );
}
