"use client";

import { useEffect, useState } from "react";
import { Check, Copy, Share2 } from "lucide-react";

interface ShareButtonsProps {
  url: string;
  title: string;
  description?: string;
  className?: string;
}

function shareLinks(url: string, title: string, description?: string) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedText = encodeURIComponent(
    description ? `${title} — ${description}` : title
  );

  return {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    x: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedText}`,
    whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedText}%0A%0A${encodedUrl}`,
  };
}

export function ShareButtons({
  url,
  title,
  description,
  className = "",
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);
  const links = shareLinks(url, title, description);

  useEffect(() => {
    setCanNativeShare(typeof navigator !== "undefined" && "share" in navigator);
  }, []);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore clipboard errors
    }
  }

  async function nativeShare() {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, text: description, url });
        return;
      } catch {
        // user cancelled or unsupported
      }
    }
  }

  const buttonClass =
    "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-sm border border-coffee/20 text-coffee hover:border-burgundy/40 hover:text-burgundy transition-colors";

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <span className="inline-flex items-center gap-1 text-xs text-coffee mr-1">
        <Share2 className="w-3.5 h-3.5" />
        Share
      </span>

      {canNativeShare && (
        <button type="button" onClick={nativeShare} className={buttonClass}>
          Share…
        </button>
      )}

      <a href={links.facebook} target="_blank" rel="noopener noreferrer" className={buttonClass}>
        Facebook
      </a>
      <a href={links.x} target="_blank" rel="noopener noreferrer" className={buttonClass}>
        X
      </a>
      <a href={links.pinterest} target="_blank" rel="noopener noreferrer" className={buttonClass}>
        Pinterest
      </a>
      <a href={links.whatsapp} target="_blank" rel="noopener noreferrer" className={buttonClass}>
        WhatsApp
      </a>
      <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className={buttonClass}>
        LinkedIn
      </a>
      <a href={links.email} className={buttonClass}>
        Email
      </a>

      <button type="button" onClick={copyLink} className={buttonClass}>
        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
        {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}
