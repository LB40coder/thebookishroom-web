"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ImageIcon, Upload } from "lucide-react";
import { MediaPicker } from "./MediaPicker";

interface ImageFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  required?: boolean;
}

export function ImageField({
  label,
  value,
  onChange,
  required,
}: ImageFieldProps) {
  const [mediaOpen, setMediaOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleUpload(files: FileList | null) {
    if (!files?.[0]) return;
    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", files[0]);
      const res = await fetch("/api/admin/media", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      onChange(data.data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div>
      <label className="block text-sm text-coffee mb-1">{label}</label>

      {value && (
        <div className="relative w-full max-w-xs aspect-[4/3] mb-3 rounded-sm overflow-hidden border border-coffee/15 bg-cream-dark">
          <Image
            src={value}
            alt="Cover preview"
            fill
            className="object-cover"
            sizes="320px"
            unoptimized={value.endsWith(".svg")}
          />
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-2">
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
          className="hidden"
          onChange={(e) => handleUpload(e.target.files)}
        />
        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="inline-flex items-center gap-1.5 px-3 py-2 text-sm border border-coffee/20 rounded-sm hover:bg-cream-dark disabled:opacity-50"
        >
          <Upload className="w-4 h-4" />
          {uploading ? "Uploading..." : "Upload"}
        </button>
        <button
          type="button"
          onClick={() => setMediaOpen(true)}
          className="inline-flex items-center gap-1.5 px-3 py-2 text-sm border border-coffee/20 rounded-sm hover:bg-cream-dark"
        >
          <ImageIcon className="w-4 h-4" />
          Media Library
        </button>
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="/images/classic.svg or https://..."
        className="w-full px-3 py-2 text-sm bg-cream border border-coffee/20 rounded-sm focus:outline-none focus:ring-1 focus:ring-forest/50"
        required={required}
      />

      {error && <p className="mt-1 text-xs text-burgundy">{error}</p>}

      <MediaPicker
        open={mediaOpen}
        onClose={() => setMediaOpen(false)}
        onSelect={(url) => {
          onChange(url);
          setMediaOpen(false);
        }}
      />
    </div>
  );
}
