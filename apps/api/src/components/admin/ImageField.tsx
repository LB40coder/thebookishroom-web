"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ImageIcon, Link2, Upload } from "lucide-react";
import { MediaPicker } from "./MediaPicker";

type ImageSourceMode = "url" | "upload";

interface ImageFieldProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  required?: boolean;
  layout?: "default" | "tabs";
  urlPlaceholder?: string;
  urlHelpText?: string;
}

function inferSourceMode(value: string): ImageSourceMode {
  if (!value) return "url";
  if (value.startsWith("http://") || value.startsWith("https://")) return "url";
  return "upload";
}

function CoverPreview({
  value,
  previewError,
  onPreviewError,
}: {
  value: string;
  previewError: boolean;
  onPreviewError: () => void;
}) {
  if (!value) return null;

  const isExternalUrl =
    value.startsWith("http://") || value.startsWith("https://");

  if (previewError) {
    return (
      <p className="mt-3 text-xs text-coffee">
        Preview unavailable — the image will still be saved if it is valid.
      </p>
    );
  }

  return (
    <div className="relative w-full max-w-[200px] aspect-[2/3] mt-3 rounded-sm overflow-hidden border border-coffee/15 bg-cream-dark">
      <Image
        src={value}
        alt="Cover preview"
        fill
        className="object-cover"
        sizes="200px"
        unoptimized={value.endsWith(".svg") || isExternalUrl}
        onError={onPreviewError}
      />
    </div>
  );
}

export function ImageField({
  label,
  value,
  onChange,
  required,
  layout = "default",
  urlPlaceholder = "/images/classic.svg or https://...",
  urlHelpText,
}: ImageFieldProps) {
  const [mediaOpen, setMediaOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [previewError, setPreviewError] = useState(false);
  const [sourceMode, setSourceMode] = useState<ImageSourceMode>(() =>
    inferSourceMode(value)
  );
  const inputRef = useRef<HTMLInputElement>(null);

  function handleValueChange(url: string) {
    setPreviewError(false);
    onChange(url);
  }

  function switchMode(mode: ImageSourceMode) {
    setSourceMode(mode);
    setError("");
  }

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
      handleValueChange(data.data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  const uploadControls = (
    <>
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
        {uploading ? "Uploading..." : "Upload image"}
      </button>
      <button
        type="button"
        onClick={() => setMediaOpen(true)}
        className="inline-flex items-center gap-1.5 px-3 py-2 text-sm border border-coffee/20 rounded-sm hover:bg-cream-dark"
      >
        <ImageIcon className="w-4 h-4" />
        Media Library
      </button>
    </>
  );

  const urlInput = (
    <input
      type="url"
      value={sourceMode === "url" || layout === "default" ? value : ""}
      onChange={(e) => handleValueChange(e.target.value)}
      placeholder={urlPlaceholder}
      className="w-full px-3 py-2 text-sm bg-cream border border-coffee/20 rounded-sm focus:outline-none focus:ring-1 focus:ring-forest/50"
      required={required && (layout === "default" || sourceMode === "url")}
    />
  );

  const urlTabValue =
    value.startsWith("http://") || value.startsWith("https://") ? value : "";

  if (layout === "tabs") {
    return (
      <div>
        <label className="block text-sm text-coffee mb-2">{label}</label>

        <div className="inline-flex rounded-sm border border-coffee/20 overflow-hidden mb-3">
          <button
            type="button"
            onClick={() => switchMode("url")}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs transition-colors ${
              sourceMode === "url"
                ? "bg-forest text-cream"
                : "bg-cream text-coffee hover:bg-cream-dark"
            }`}
          >
            <Link2 className="w-3.5 h-3.5" />
            Image URL
          </button>
          <button
            type="button"
            onClick={() => switchMode("upload")}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs transition-colors ${
              sourceMode === "upload"
                ? "bg-forest text-cream"
                : "bg-cream text-coffee hover:bg-cream-dark"
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            Upload
          </button>
        </div>

        {sourceMode === "url" ? (
          <div>
            {urlHelpText && (
              <p className="text-[11px] text-coffee mb-2 leading-relaxed">
                {urlHelpText}
              </p>
            )}
            <input
              type="url"
              value={urlTabValue}
              onChange={(e) => handleValueChange(e.target.value)}
              placeholder={urlPlaceholder}
              className="w-full px-3 py-2 text-sm bg-cream border border-coffee/20 rounded-sm focus:outline-none focus:ring-1 focus:ring-forest/50"
              required={required && sourceMode === "url"}
            />
          </div>
        ) : (
          <div>
            <p className="text-[11px] text-coffee mb-2 leading-relaxed">
              Upload a cover from your computer or pick one from the media library.
            </p>
            <div className="flex flex-wrap gap-2">{uploadControls}</div>
          </div>
        )}

        <CoverPreview
          value={value}
          previewError={previewError}
          onPreviewError={() => setPreviewError(true)}
        />

        {error && <p className="mt-2 text-xs text-burgundy">{error}</p>}

        <MediaPicker
          open={mediaOpen}
          onClose={() => setMediaOpen(false)}
          onSelect={(url) => {
            handleValueChange(url);
            setMediaOpen(false);
          }}
        />
      </div>
    );
  }

  return (
    <div>
      <label className="block text-sm text-coffee mb-1">{label}</label>

      <CoverPreview
        value={value}
        previewError={previewError}
        onPreviewError={() => setPreviewError(true)}
      />

      <div className="flex flex-wrap gap-2 mb-2 mt-3">{uploadControls}</div>

      {urlInput}

      {error && <p className="mt-1 text-xs text-burgundy">{error}</p>}

      <MediaPicker
        open={mediaOpen}
        onClose={() => setMediaOpen(false)}
        onSelect={(url) => {
          handleValueChange(url);
          setMediaOpen(false);
        }}
      />
    </div>
  );
}
