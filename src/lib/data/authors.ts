import type { Author } from "@/lib/types";
import { images } from "@/lib/images";

export const authors: Author[] = [
  {
    name: "Marcus Aurelius",
    slug: "marcus-aurelius",
    bio: "Roman emperor from 161 to 180 AD and a Stoic philosopher. His personal writings, known as Meditations, have inspired readers for nearly two millennia with their practical wisdom on virtue, resilience, and the human condition.",
    nationality: "Roman",
    birthYear: 121,
    deathYear: 180,
    mainBooks: ["meditations"],
    whereToStart:
      "Begin with Meditations — it's short, accessible, and can be read in any order. Each passage stands alone as a piece of wisdom.",
    readingOrder: ["meditations"],
    image: images.author,
  },
  {
    name: "Mary Shelley",
    slug: "mary-shelley",
    bio: "English novelist who wrote Frankenstein at just 18 years old. A pioneer of science fiction and gothic literature, Shelley crafted one of the most enduring and influential novels in the English language.",
    nationality: "English",
    birthYear: 1797,
    deathYear: 1851,
    mainBooks: ["frankenstein"],
    whereToStart:
      "Frankenstein is essential reading — start there to experience the novel that invented modern science fiction.",
    readingOrder: ["frankenstein"],
    image: images.author,
  },
  {
    name: "Oscar Wilde",
    slug: "oscar-wilde",
    bio: "Irish poet and playwright known for his wit, flamboyant style, and brilliant social commentary. The Picture of Dorian Gray remains his most celebrated work of fiction.",
    nationality: "Irish",
    birthYear: 1854,
    deathYear: 1900,
    mainBooks: ["the-picture-of-dorian-gray"],
    whereToStart:
      "The Picture of Dorian Gray is the perfect entry point — a gothic novel filled with Wilde's signature wit and aphorisms.",
    readingOrder: ["the-picture-of-dorian-gray"],
    image: images.author,
  },
  {
    name: "Jane Austen",
    slug: "jane-austen",
    bio: "English novelist whose works of romantic fiction set among the landed gentry earned her a place among the most widely read writers in English literature.",
    nationality: "English",
    birthYear: 1775,
    deathYear: 1817,
    mainBooks: ["pride-and-prejudice"],
    whereToStart:
      "Pride and Prejudice is the ideal starting point — witty, romantic, and endlessly re-readable.",
    readingOrder: ["pride-and-prejudice"],
    image: images.author,
  },
  {
    name: "Fyodor Dostoevsky",
    slug: "fyodor-dostoevsky",
    bio: "Russian novelist and philosopher whose works explore human psychology in the troubled political, social, and spiritual atmosphere of 19th-century Russia.",
    nationality: "Russian",
    birthYear: 1821,
    deathYear: 1881,
    mainBooks: ["white-nights"],
    whereToStart:
      "Start with White Nights — a short, beautiful novella that introduces Dostoevsky's emotional depth without overwhelming complexity.",
    readingOrder: ["white-nights"],
    image: images.author,
  },
];

export function getAuthorBySlug(slug: string): Author | undefined {
  return authors.find((a) => a.slug === slug);
}
