"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Search, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { SearchDialog } from "@/components/search/SearchDialog";
import { Logo } from "@/components/ui/Logo";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/reading-lists", label: "Journal" },
  { href: "/book-moods", label: "Book Moods" },
  { href: "/classics", label: "Classics" },
  { href: "/authors", label: "Authors" },
  { href: "/book-finder", label: "Book Finder" },
  { href: "/about", label: "About" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-cream/95 backdrop-blur-sm border-b border-coffee/10">
        <div className="section-container">
          <div className="flex items-center justify-between h-16 md:h-[4.5rem]">
            <Logo size="sm" className="md:hidden" />
            <Logo size="md" className="hidden md:block" />

            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-sm text-ink/80 hover:text-ink transition-colors relative py-1",
                    (pathname === link.href ||
                      (link.href !== "/" && pathname.startsWith(link.href))) &&
                      "text-ink font-medium"
                  )}
                >
                  {link.label}
                  {(pathname === link.href ||
                    (link.href !== "/" && pathname.startsWith(link.href))) && (
                    <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-burgundy rounded-full" />
                  )}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-ink/70 hover:text-ink transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 text-ink/70 hover:text-ink"
                aria-label="Toggle menu"
              >
                {mobileOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {mobileOpen && (
          <nav className="lg:hidden border-t border-coffee/10 bg-cream">
            <div className="section-container py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "px-3 py-2.5 text-sm rounded-sm hover:bg-cream-dark transition-colors",
                    pathname === link.href ||
                      (link.href !== "/" && pathname.startsWith(link.href))
                      ? "text-burgundy font-medium bg-cream-dark"
                      : "text-ink/80"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </header>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
