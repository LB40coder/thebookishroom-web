import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Finder",
  description:
    "Find your next book with personalized recommendations based on mood, genre, length, and reading difficulty.",
};

export default function BookFinderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
