const FIELD_LABELS: Record<string, string> = {
  name: "Name",
  slug: "Slug",
  bio: "Bio",
  nationality: "Nationality",
  whereToStart: "Where to Start",
  image: "Photo URL",
  title: "Title",
  description: "Description",
  whyRead: "Why Read",
  whoIsItFor: "Who Is It For",
};

export function formatValidationErrors(
  details?: { fieldErrors?: Record<string, string[] | undefined> }
): string {
  if (!details?.fieldErrors) return "Validation failed";

  const messages = Object.entries(details.fieldErrors)
    .filter(([, errors]) => errors?.length)
    .map(([field, errors]) => {
      const label = FIELD_LABELS[field] ?? field;
      return `${label}: ${errors!.join(", ")}`;
    });

  return messages.length ? messages.join(" · ") : "Validation failed";
}
