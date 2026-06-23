import type { Metadata } from "next";
import { Playfair_Display, Inter, Lora } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { getTrendingPosts } from "@/lib/data/posts";
import { websiteJsonLd } from "@/lib/metadata/json-ld";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "The Bookish Room — Discover Books by Mood, Genre & Aesthetic",
    template: "%s | The Bookish Room",
  },
  description:
    "The Bookish Room helps readers discover books by mood, aesthetic, genre, and timeless literary appeal. Curated reading lists, classics, and book recommendations.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "The Bookish Room",
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: "/images/favicon.png",
    apple: "/images/favicon.png",
  },
  other: {
    "google-adsense-account": "ca-pub-8111258264870404",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const trendingPosts = await getTrendingPosts();

  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${lora.variable}`}
    >
      <body className="min-h-screen flex flex-col">
        <JsonLd data={websiteJsonLd()} />
        <AnnouncementBar posts={trendingPosts} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
