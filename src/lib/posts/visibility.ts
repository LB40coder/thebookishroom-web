export type PostDisplayStatus = "draft" | "scheduled" | "published";

export function getPostDisplayStatus(
  published: boolean,
  publishedAt: Date
): PostDisplayStatus {
  if (!published) return "draft";
  if (publishedAt.getTime() > Date.now()) return "scheduled";
  return "published";
}

export function publicPostFilter() {
  return {
    published: true,
    publishedAt: { lte: new Date() },
  } as const;
}

export function toDatetimeLocalValue(date: Date): string {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 16);
}

export function fromDatetimeLocalValue(value: string): Date {
  return new Date(value);
}

export function defaultPublishDatetimeLocal(): string {
  return toDatetimeLocalValue(new Date());
}

export function postStatusLabel(status: PostDisplayStatus): string {
  switch (status) {
    case "draft":
      return "Draft";
    case "scheduled":
      return "Scheduled";
    case "published":
      return "Published";
  }
}
