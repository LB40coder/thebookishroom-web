"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Copy, ImagePlus, Upload, X } from "lucide-react";

export interface MediaItem {
  id: string;
  filename: string;
  url: string;
  mimeType: string;
  size: number;
  alt: string | null;
  createdAt: string;
}

interface MediaLibraryProps {
  onSelect?: (url: string) => void;
  selectLabel?: string;
}

export function MediaLibrary({ onSelect, selectLabel = "Select" }: MediaLibraryProps) {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const loadMedia = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/media");
      if (!res.ok) throw new Error("Failed to load media");
      const data = await res.json();
      setItems(data.data ?? []);
    } catch {
      setError("Could not load media library.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMedia();
  }, [loadMedia]);

  async function handleUpload(files: FileList | null) {
    if (!files?.length) return;
    setUploading(true);
    setError("");

    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("/api/admin/media", {
          method: "POST",
          body: formData,
        });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Upload failed");
        }
      }
      await loadMedia();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this image from the media library?")) return;
    await fetch(`/api/admin/media/${id}`, { method: "DELETE" });
    await loadMedia();
  }

  async function copyUrl(url: string) {
    await navigator.clipboard.writeText(url);
  }

  return (
    <div className="bg-cream rounded-sm border border-coffee/15">
      <div className="px-4 py-3 border-b border-coffee/10 flex flex-wrap items-center gap-3">
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
          multiple
          className="hidden"
          onChange={(e) => handleUpload(e.target.files)}
        />
        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="inline-flex items-center gap-2 px-3 py-2 bg-forest text-cream text-sm rounded-sm hover:bg-forest/90 disabled:opacity-50"
        >
          <Upload className="w-4 h-4" />
          {uploading ? "Uploading..." : "Upload images"}
        </button>
        <p className="text-xs text-coffee">JPEG, PNG, WebP, GIF, SVG — max 5 MB</p>
      </div>

      {error && (
        <p className="px-4 py-2 text-sm text-burgundy border-b border-coffee/10">
          {error}
        </p>
      )}

      <div className="p-4">
        {loading ? (
          <p className="text-sm text-coffee">Loading...</p>
        ) : items.length === 0 ? (
          <div className="text-center py-12 text-coffee">
            <ImagePlus className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="text-sm">No images yet. Upload your first one.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="group relative aspect-square rounded-sm border border-coffee/15 overflow-hidden bg-cream-dark"
              >
                <Image
                  src={item.url}
                  alt={item.alt ?? item.filename}
                  fill
                  className="object-cover"
                  sizes="200px"
                  unoptimized={item.url.endsWith(".svg")}
                />
                <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/50 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  {onSelect && (
                    <button
                      type="button"
                      onClick={() => onSelect(item.url)}
                      className="px-2 py-1 text-xs bg-cream text-ink rounded-sm"
                    >
                      {selectLabel}
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => copyUrl(item.url)}
                    className="p-1.5 bg-cream text-ink rounded-sm"
                    title="Copy URL"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 bg-burgundy text-cream rounded-sm"
                    title="Delete"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="absolute bottom-0 inset-x-0 px-2 py-1 text-[10px] text-cream bg-ink/60 truncate">
                  {item.filename}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface MediaPickerProps {
  open: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
}

export function MediaPicker({ open, onClose, onSelect }: MediaPickerProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-ink/60"
        onClick={onClose}
        aria-label="Close media library"
      />
      <div className="relative w-full max-w-4xl max-h-[85vh] bg-cream rounded-sm border border-coffee/20 shadow-xl flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-coffee/10">
          <h2 className="font-serif text-lg text-ink">Media Library</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-coffee hover:text-ink"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="overflow-y-auto">
          <MediaLibrary
            onSelect={(url) => {
              onSelect(url);
              onClose();
            }}
          />
        </div>
      </div>
    </div>
  );
}
