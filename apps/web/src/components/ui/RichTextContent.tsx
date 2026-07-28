import { sanitizeRichText } from "@/lib/media/sanitize";

interface RichTextContentProps {
  html: string;
  className?: string;
}

export function RichTextContent({ html, className = "" }: RichTextContentProps) {
  if (!html || html === "<p></p>") return null;

  const sanitized = sanitizeRichText(html);
  const isPlainText = !sanitized.includes("<");

  if (isPlainText) {
    return <p className={className}>{sanitized}</p>;
  }

  return (
    <div
      className={`prose-reading ${className}`}
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  );
}
