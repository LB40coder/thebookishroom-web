"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Mood as PrismaMood } from "@prisma/client";
import { MoodIconPicker } from "@/components/admin/MoodIconPicker";
import { formatValidationErrors } from "@/lib/validations/errors";
import type { MoodIconName } from "@/lib/icons/mood-icons";

const inputClassName =
  "w-full px-3 py-2 text-sm bg-cream border border-coffee/20 rounded-sm focus:outline-none focus:ring-1 focus:ring-forest/50";

const labelClassName = "block text-sm text-coffee mb-1";

interface MoodFormProps {
  adminPath: string;
  mood?: PrismaMood;
}

export function MoodForm({ adminPath, mood }: MoodFormProps) {
  const router = useRouter();
  const isEditing = Boolean(mood);

  const [form, setForm] = useState({
    name: mood?.name ?? "",
    description: mood?.description ?? "",
    icon: (mood?.icon ?? "book-open") as MoodIconName,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const url = isEditing
        ? `/api/admin/moods/${mood!.id}`
        : "/api/admin/moods";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(formatValidationErrors(data.details) || data.error || "Save failed");
        return;
      }

      router.push(`/${adminPath}/moods`);
      router.refresh();
    } catch {
      setError("Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
      <div>
        <label className={labelClassName}>Name</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          className={inputClassName}
          required
        />
      </div>

      {isEditing && (
        <div>
          <label className={labelClassName}>Slug</label>
          <input
            type="text"
            value={mood!.slug}
            className={`${inputClassName} bg-cream-dark text-coffee`}
            disabled
          />
        </div>
      )}

      <div>
        <label className={labelClassName}>Description</label>
        <textarea
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          rows={3}
          className={inputClassName}
        />
      </div>

      <MoodIconPicker
        value={form.icon}
        onChange={(icon) => update("icon", icon)}
      />

      {error && <p className="text-sm text-burgundy">{error}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="px-5 py-2 bg-forest text-cream text-sm rounded-sm hover:bg-forest/90 disabled:opacity-50"
        >
          {saving ? "Saving..." : isEditing ? "Save Mood" : "Create Mood"}
        </button>
        <button
          type="button"
          onClick={() => router.push(`/${adminPath}/moods`)}
          className="px-5 py-2 text-sm text-coffee border border-coffee/20 rounded-sm hover:bg-cream-dark"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
