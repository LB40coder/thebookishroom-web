# The Bookish Room

A cozy book discovery website for readers who want to find their next favorite read.

**The Bookish Room helps readers discover books by mood, aesthetic, genre, and timeless literary appeal.**

## Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS 4**
- **Lucide Icons**

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3456](http://localhost:3456) in your browser.

> **Windows:** Run commands from the project folder. Because the folder name has a space, use quotes:
> `cd "C:\Users\luan.santos\Documents\Bookish room"`

## Project Structure

```
src/
├── app/                  # Pages and routes
│   ├── page.tsx          # Home
│   ├── reading-lists/    # Reading list archive + individual posts
│   ├── book-moods/       # Mood browsing
│   ├── books/            # Book pages
│   ├── authors/          # Author profiles
│   ├── book-finder/      # Book recommendation tool
│   ├── classics/         # Classic literature guides
│   └── about/            # About page
├── components/           # React components
│   ├── layout/           # Header, Footer, AnnouncementBar
│   ├── home/             # Home page sections
│   ├── cards/            # Reusable card components
│   ├── ui/               # Buttons, forms, headings
│   └── search/           # Search dialog
└── lib/
    ├── data/             # Content data (placeholder for MDX migration)
    ├── types.ts          # TypeScript interfaces
    └── search.ts         # Client-side search
```

## MVP Pages

| Route | Description |
|-------|-------------|
| `/` | Home with hero, moods, featured lists, authors |
| `/reading-lists` | All reading list posts |
| `/reading-lists/[slug]` | Individual post page |
| `/book-moods` | Browse by mood |
| `/book-moods/[slug]` | Mood-specific content |
| `/books` | All books |
| `/books/[slug]` | Individual book page |
| `/authors` | All authors |
| `/authors/[slug]` | Author profile |
| `/book-finder` | Filter-based book recommendations |
| `/classics` | Classic literature guides |
| `/about` | About the site |

## Design

- **Background:** `#F7F1E8` (cream)
- **Text:** `#2B2118` (ink)
- **Primary:** `#344736` (forest green)
- **Accent:** `#7A2E3A` (burgundy)
- **Fonts:** Playfair Display (headings), Inter (UI), Lora (reading)

## Next Steps

- [ ] Migrate content to MDX files
- [ ] Add 20 launch posts, 5 books, 5 authors
- [ ] Connect newsletter to MailerLite/ConvertKit
- [ ] Add Amazon affiliate links
- [ ] Add JSON-LD schema markup
- [ ] Deploy to Vercel

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```
