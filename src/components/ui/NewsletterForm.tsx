"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface NewsletterFormProps {
  variant?: "default" | "compact" | "banner";
  className?: string;
}

export function NewsletterForm({
  variant = "default",
  className,
}: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      return;
    }
    setStatus("success");
    setEmail("");
  }

  if (variant === "compact") {
    return (
      <form onSubmit={handleSubmit} className={cn("flex gap-2", className)}>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setStatus("idle");
          }}
          placeholder="Your email"
          className="flex-1 min-w-0 px-3 py-2 text-sm bg-cream border border-coffee/20 rounded-sm focus:outline-none focus:ring-1 focus:ring-forest/50"
          aria-label="Email address"
        />
        <button
          type="submit"
          className="px-3 py-2 bg-burgundy text-cream text-sm rounded-sm hover:bg-burgundy/90 transition-colors shrink-0"
        >
          →
        </button>
        {status === "success" && (
          <span className="sr-only">Subscribed successfully</span>
        )}
      </form>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex flex-col sm:flex-row gap-3",
        variant === "banner" && "max-w-md mx-auto w-full",
        className
      )}
    >
      <input
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setStatus("idle");
        }}
        placeholder="Enter your email"
        className={cn(
          "flex-1 px-4 py-2.5 text-sm bg-cream border border-coffee/20 rounded-sm focus:outline-none focus:ring-1 focus:ring-gold/50",
          variant === "banner" && "bg-white/10 border-white/20 text-cream placeholder:text-cream/60"
        )}
        aria-label="Email address"
      />
      <button
        type="submit"
        className="px-6 py-2.5 bg-burgundy text-cream text-sm font-medium rounded-sm hover:bg-burgundy/90 transition-colors shrink-0"
      >
        Subscribe
      </button>
      {status === "success" && (
        <p className="text-sm text-gold sm:col-span-2">
          Welcome to our cozy reading corner! ✨
        </p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-300 sm:col-span-2">
          Please enter a valid email address.
        </p>
      )}
    </form>
  );
}
