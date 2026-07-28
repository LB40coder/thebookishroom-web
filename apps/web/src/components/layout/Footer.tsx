import Link from "next/link";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import { Logo } from "@/components/ui/Logo";
import {
  InstagramIcon,
  TikTokIcon,
  PinterestIcon,
  GoodreadsIcon,
} from "@/components/ui/SocialIcons";

const socialLinks = [
  {
    href: "https://instagram.com",
    label: "Instagram",
    icon: InstagramIcon,
  },
  {
    href: "https://tiktok.com",
    label: "TikTok",
    icon: TikTokIcon,
  },
  {
    href: "https://pinterest.com",
    label: "Pinterest",
    icon: PinterestIcon,
  },
  {
    href: "https://goodreads.com",
    label: "Goodreads",
    icon: GoodreadsIcon,
  },
];

const exploreLinks = [
  { href: "/", label: "Home" },
  { href: "/reading-lists", label: "Reading Lists" },
  { href: "/book-moods", label: "Book Moods" },
  { href: "/classics", label: "Classics" },
  { href: "/authors", label: "Authors" },
  { href: "/book-finder", label: "Book Finder" },
  { href: "/about", label: "About" },
];

const categoryLinks = [
  { href: "/reading-lists?tag=fiction", label: "Fiction" },
  { href: "/reading-lists?tag=romance", label: "Romance" },
  { href: "/reading-lists?tag=gothic", label: "Gothic" },
  { href: "/reading-lists?tag=philosophy", label: "Philosophy" },
  { href: "/reading-lists?tag=mystery", label: "Mystery" },
  { href: "/reading-lists?tag=classics", label: "Classics" },
];

export function Footer() {
  return (
    <footer className="bg-cream-dark border-t border-coffee/10">
      <div className="section-container section-padding">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div>
            <Logo size="lg" />
            <p className="mt-3 text-sm text-coffee leading-relaxed">
              A cozy corner for book lovers. Discover your next favorite read
              through curated lists, moods, and timeless classics.
            </p>
            <div className="mt-4 flex items-center gap-2">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-coffee hover:text-burgundy transition-colors rounded-sm hover:bg-cream"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-serif text-base font-semibold text-ink mb-3">
              Explore
            </h3>
            <ul className="space-y-2">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-coffee hover:text-ink transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-base font-semibold text-ink mb-3">
              Categories
            </h3>
            <ul className="space-y-2">
              {categoryLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-coffee hover:text-ink transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-base font-semibold text-ink mb-3">
              Stay in the loop
            </h3>
            <p className="text-sm text-coffee mb-3">
              Get cozy reading recommendations in your inbox.
            </p>
            <NewsletterForm variant="compact" />
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-coffee/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-coffee">
          <p>© {new Date().getFullYear()} The Bookish Room. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/about" className="hover:text-ink transition-colors">
              Privacy Policy
            </Link>
            <Link href="/about" className="hover:text-ink transition-colors">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
