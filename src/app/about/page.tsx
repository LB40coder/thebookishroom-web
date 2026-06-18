import type { Metadata } from "next";
import { NewsletterBanner } from "@/components/home/NewsletterBanner";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "About",
  description:
    "The Bookish Room helps readers discover books by mood, aesthetic, genre, and timeless literary appeal.",
};

export default function AboutPage() {
  return (
    <>
      <div className="section-padding">
        <div className="section-container max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-serif text-ink">
            About The Bookish Room
          </h1>

          <div className="mt-8 space-y-6 text-coffee font-reading leading-relaxed">
            <p className="text-lg text-ink">
              The Bookish Room helps readers discover books by mood, aesthetic,
              genre, and timeless literary appeal.
            </p>

            <p>
              We&apos;re not a heavy review portal or a crowded book database.
              We&apos;re a cozy reading corner — a place to find curated lists,
              mood-based recommendations, and gentle guides to classic literature.
            </p>

            <h2 className="font-serif text-xl text-ink pt-4">What We Offer</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Curated reading lists organized by mood and aesthetic</li>
              <li>Guides to classic literature for beginners</li>
              <li>Author profiles with reading recommendations</li>
              <li>Individual book pages with editorial details</li>
              <li>A simple Book Finder to match you with your next read</li>
            </ul>

            <h2 className="font-serif text-xl text-ink pt-4">Who It&apos;s For</h2>
            <p>
              BookTok and Bookstagram readers, classic literature newcomers,
              mood-driven book choosers, and anyone searching for &ldquo;books
              like...&rdquo; or &ldquo;best books for...&rdquo; recommendations.
            </p>

            <h2 className="font-serif text-xl text-ink pt-4">Get in Touch</h2>
            <p>
              Have a suggestion or want to collaborate? Reach out at{" "}
              <a
                href="mailto:hello@thebookishroom.com"
                className="text-burgundy hover:underline"
              >
                hello@thebookishroom.com
              </a>
            </p>
          </div>
        </div>
      </div>
      <NewsletterBanner />
    </>
  );
}
