"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function AdminLoginForm({ adminPath }: { adminPath: string }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        setError("Invalid credentials");
        return;
      }

      router.refresh();
      router.push(`/${adminPath}`);
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-cream rounded-sm p-6 border border-coffee/10"
    >
      <label htmlFor="password" className="block text-sm text-coffee mb-2">
        Password
      </label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-3 py-2.5 text-sm bg-cream-dark border border-coffee/20 rounded-sm focus:outline-none focus:ring-1 focus:ring-forest/50"
        autoComplete="current-password"
        required
      />
      {error && (
        <p className="mt-2 text-sm text-burgundy">{error}</p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="mt-4 w-full py-2.5 bg-forest text-cream text-sm font-medium rounded-sm hover:bg-forest/90 transition-colors disabled:opacity-50"
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
