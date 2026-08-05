import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="section-padding">
      <div className="section-container text-center max-w-md mx-auto">
        <p className="text-6xl font-serif text-coffee/30 mb-4">404</p>
        <h1 className="text-2xl font-serif text-ink mb-3">Page Not Found</h1>
        <p className="text-coffee mb-8">
          This page seems to have wandered off the bookshelf. Let&apos;s find
          you something good to read instead.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button href="/" variant="primary">
            Back to Home
          </Button>
          <Button href="/reading-lists" variant="outline">
            Browse Reading Lists
          </Button>
        </div>
      </div>
    </div>
  );
}
