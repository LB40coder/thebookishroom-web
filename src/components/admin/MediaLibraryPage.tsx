import { MediaLibrary } from "@/components/admin/MediaPicker";

export function MediaLibraryPage() {
  return (
    <div>
      <h1 className="font-serif text-2xl text-ink mb-2">Media Library</h1>
      <p className="text-sm text-coffee mb-6">
        Upload and manage images for posts, books, and authors.
      </p>
      <MediaLibrary />
    </div>
  );
}
