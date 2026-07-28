"use client";

import { Plus, Trash2 } from "lucide-react";
import type { AuthorBookLink } from "@/lib/types";
import { inputClassName, labelClassName } from "./form-styles";

interface BookLinkListFieldProps {
  label: string;
  description?: string;
  value: AuthorBookLink[];
  onChange: (value: AuthorBookLink[]) => void;
  maxItems?: number;
}

export function BookLinkListField({
  label,
  description,
  value,
  onChange,
  maxItems = 5,
}: BookLinkListFieldProps) {
  function updateItem(
    index: number,
    field: keyof AuthorBookLink,
    fieldValue: string
  ) {
    const next = [...value];
    next[index] = { ...next[index], [field]: fieldValue };
    onChange(next);
  }

  function addItem() {
    if (value.length >= maxItems) return;
    onChange([...value, { title: "", url: "" }]);
  }

  function removeItem(index: number) {
    onChange(value.filter((_, i) => i !== index));
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-3 mb-2">
        <div>
          <label className={labelClassName}>{label}</label>
          {description && (
            <p className="text-[11px] text-coffee">{description}</p>
          )}
        </div>
        {value.length < maxItems && (
          <button
            type="button"
            onClick={addItem}
            className="inline-flex items-center gap-1 text-xs text-forest hover:text-forest/80"
          >
            <Plus className="w-3.5 h-3.5" />
            Add book
          </button>
        )}
      </div>

      {value.length === 0 ? (
        <button
          type="button"
          onClick={addItem}
          className="w-full px-3 py-2 text-sm text-coffee border border-dashed border-coffee/25 rounded-sm hover:border-coffee/40 hover:text-ink"
        >
          Add your first book
        </button>
      ) : (
        <div className="space-y-3">
          {value.map((item, index) => (
            <div
              key={index}
              className="grid sm:grid-cols-[1fr_1fr_auto] gap-2 items-start p-3 bg-cream-dark/30 border border-coffee/10 rounded-sm"
            >
              <div>
                <label className="block text-[11px] text-coffee mb-1">
                  Book name
                </label>
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => updateItem(index, "title", e.target.value)}
                  placeholder="e.g. Pride and Prejudice"
                  className={inputClassName}
                />
              </div>
              <div>
                <label className="block text-[11px] text-coffee mb-1">
                  Link
                </label>
                <input
                  type="url"
                  value={item.url}
                  onChange={(e) => updateItem(index, "url", e.target.value)}
                  placeholder="https://... or /books/slug"
                  className={inputClassName}
                />
              </div>
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="mt-5 p-2 text-coffee hover:text-burgundy"
                aria-label="Remove book"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
