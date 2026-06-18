import type { Book } from "@/lib/types";
import { images } from "@/lib/images";

export const books: Book[] = [
  {
    title: "Meditations",
    slug: "meditations",
    author: "Marcus Aurelius",
    authorSlug: "marcus-aurelius",
    year: 180,
    genres: ["philosophy", "classics"],
    moods: ["inspiring", "classics"],
    difficulty: "intermediate",
    length: "short",
    description:
      "A series of personal writings by the Roman Emperor, offering timeless reflections on virtue, duty, and the art of living well.",
    whyRead:
      "One of the most accessible entry points into Stoic philosophy, written as intimate notes to oneself rather than a dense academic treatise.",
    whoIsItFor:
      "Readers seeking practical wisdom, those interested in philosophy, and anyone navigating life's uncertainties.",
    estimatedReadingTime: "3–4 hours",
    similarBooks: ["letters-from-a-stoic", "the-enchiridion"],
    coverImage: images.books,
    amazonEditions: [
      {
        language: "en",
        label: "English Edition",
        url: "https://www.amazon.com/s?k=meditations+marcus+aurelius",
        format: "paperback",
      },
      {
        language: "pt",
        label: "Portuguese Edition",
        url: "https://www.amazon.com.br/s?k=meditações+marco+aurélio",
        format: "paperback",
      },
      {
        language: "es",
        label: "Spanish Edition",
        url: "https://www.amazon.es/s?k=meditaciones+marco+aurelio",
        format: "paperback",
      },
    ],
  },
  {
    title: "Frankenstein",
    slug: "frankenstein",
    author: "Mary Shelley",
    authorSlug: "mary-shelley",
    year: 1818,
    genres: ["gothic", "classics", "science fiction"],
    moods: ["gothic", "dark-academia"],
    difficulty: "intermediate",
    length: "medium",
    description:
      "The story of Victor Frankenstein, a young scientist who creates a sapient creature in an unorthodox scientific experiment.",
    whyRead:
      "The original gothic masterpiece that asks profound questions about creation, responsibility, and what it means to be human.",
    whoIsItFor:
      "Fans of gothic literature, science fiction enthusiasts, and readers who love morally complex narratives.",
    estimatedReadingTime: "6–8 hours",
    similarBooks: ["the-picture-of-dorian-gray", "dracula"],
    coverImage: images.gothic,
    amazonEditions: [
      {
        language: "en",
        label: "English Edition",
        url: "https://www.amazon.com/s?k=frankenstein+mary+shelley",
        format: "paperback",
      },
      {
        language: "pt",
        label: "Portuguese Edition",
        url: "https://www.amazon.com.br/s?k=frankenstein+mary+shelley",
        format: "paperback",
      },
      {
        language: "es",
        label: "Spanish Edition",
        url: "https://www.amazon.es/s?k=frankenstein+mary+shelley",
        format: "paperback",
      },
    ],
  },
  {
    title: "The Picture of Dorian Gray",
    slug: "the-picture-of-dorian-gray",
    author: "Oscar Wilde",
    authorSlug: "oscar-wilde",
    year: 1890,
    genres: ["gothic", "classics"],
    moods: ["gothic", "dark-academia"],
    difficulty: "intermediate",
    length: "medium",
    description:
      "A young man sells his soul to ensure his portrait ages while he remains eternally youthful and beautiful.",
    whyRead:
      "Wilde's only novel is a dazzling exploration of aestheticism, vanity, and moral corruption wrapped in exquisite prose.",
    whoIsItFor:
      "Readers who appreciate beautiful writing, gothic atmosphere, and philosophical undertones.",
    estimatedReadingTime: "5–7 hours",
    similarBooks: ["frankenstein", "dr-jekyll-and-mr-hyde"],
    coverImage: images.gothic,
    amazonEditions: [
      {
        language: "en",
        label: "English Edition",
        url: "https://www.amazon.com/s?k=the+picture+of+dorian+gray+oscar+wilde",
        format: "paperback",
      },
      {
        language: "pt",
        label: "Portuguese Edition",
        url: "https://www.amazon.com.br/s?k=retrato+dorian+gray+oscar+wilde",
        format: "paperback",
      },
      {
        language: "es",
        label: "Spanish Edition",
        url: "https://www.amazon.es/s?k=el+retrato+de+dorian+gray",
        format: "paperback",
      },
    ],
  },
  {
    title: "Pride and Prejudice",
    slug: "pride-and-prejudice",
    author: "Jane Austen",
    authorSlug: "jane-austen",
    year: 1813,
    genres: ["romance", "classics"],
    moods: ["romantic", "cozy"],
    difficulty: "beginner",
    length: "medium",
    description:
      "The story follows Elizabeth Bennet as she navigates issues of manners, upbringing, morality, and marriage in Regency England.",
    whyRead:
      "A witty, warm masterpiece that remains the gold standard for romantic fiction and social commentary.",
    whoIsItFor:
      "Romance lovers, fans of sharp social observation, and anyone new to classic literature.",
    estimatedReadingTime: "8–10 hours",
    similarBooks: ["emma", "sense-and-sensibility"],
    coverImage: images.cozy,
    amazonEditions: [
      {
        language: "en",
        label: "English Edition",
        url: "https://www.amazon.com/s?k=pride+and+prejudice+jane+austen",
        format: "paperback",
      },
      {
        language: "pt",
        label: "Portuguese Edition",
        url: "https://www.amazon.com.br/s?k=orgulho+preconceito+jane+austen",
        format: "paperback",
      },
      {
        language: "es",
        label: "Spanish Edition",
        url: "https://www.amazon.es/s?k=orgullo+prejuicio+jane+austen",
        format: "paperback",
      },
    ],
  },
  {
    title: "White Nights",
    slug: "white-nights",
    author: "Fyodor Dostoevsky",
    authorSlug: "fyodor-dostoevsky",
    year: 1848,
    genres: ["classics", "romance"],
    moods: ["romantic", "rainy-day"],
    difficulty: "beginner",
    length: "short",
    description:
      "A dreamy, melancholic novella about a lonely dreamer who falls in love during the white nights of St. Petersburg.",
    whyRead:
      "The perfect introduction to Dostoevsky — short, lyrical, and emotionally resonant without the complexity of his longer works.",
    whoIsItFor:
      "Readers curious about Dostoevsky, lovers of bittersweet romance, and fans of atmospheric storytelling.",
    estimatedReadingTime: "2–3 hours",
    similarBooks: ["notes-from-underground", "the-gambler"],
    coverImage: images.rainy,
    amazonEditions: [
      {
        language: "en",
        label: "English Edition",
        url: "https://www.amazon.com/s?k=white+nights+dostoevsky",
        format: "paperback",
      },
      {
        language: "pt",
        label: "Portuguese Edition",
        url: "https://www.amazon.com.br/s?k=noites+brancas+dostoiévski",
        format: "paperback",
      },
      {
        language: "es",
        label: "Spanish Edition",
        url: "https://www.amazon.es/s?k=noches+blancas+dostoyevski",
        format: "paperback",
      },
    ],
  },
];

export function getBookBySlug(slug: string): Book | undefined {
  return books.find((b) => b.slug === slug);
}

export function getBooksByAuthor(authorSlug: string): Book[] {
  return books.filter((b) => b.authorSlug === authorSlug);
}

export function filterBooks(filters: {
  mood?: string;
  genre?: string;
  length?: string;
  difficulty?: string;
}): Book[] {
  return books.filter((book) => {
    if (filters.mood && !book.moods.includes(filters.mood)) return false;
    if (filters.genre && !book.genres.includes(filters.genre)) return false;
    if (filters.length && book.length !== filters.length) return false;
    if (filters.difficulty && book.difficulty !== filters.difficulty)
      return false;
    return true;
  });
}
