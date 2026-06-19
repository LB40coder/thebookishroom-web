"use client";

import {
  MOOD_ICON_NAMES,
  formatMoodIconLabel,
  getMoodIcon,
  type MoodIconName,
} from "@/lib/icons/mood-icons";

interface MoodIconPickerProps {
  value: string;
  onChange: (icon: MoodIconName) => void;
}

export function MoodIconPicker({ value, onChange }: MoodIconPickerProps) {
  return (
    <div>
      <p className="text-sm text-coffee mb-2">Icon</p>
      <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2 max-h-56 overflow-y-auto p-2 border border-coffee/15 rounded-sm bg-cream">
        {MOOD_ICON_NAMES.map((iconName) => {
          const Icon = getMoodIcon(iconName);
          const selected = value === iconName;

          return (
            <button
              key={iconName}
              type="button"
              title={formatMoodIconLabel(iconName)}
              onClick={() => onChange(iconName)}
              className={`flex flex-col items-center justify-center gap-1 p-2 rounded-sm border transition-colors ${
                selected
                  ? "border-forest bg-forest/10 text-forest"
                  : "border-transparent hover:border-coffee/20 hover:bg-cream-dark text-coffee"
              }`}
            >
              <Icon className="w-5 h-5" />
            </button>
          );
        })}
      </div>
      <p className="mt-1.5 text-[11px] text-coffee">
        Selected: {formatMoodIconLabel((value as MoodIconName) || "book-open")}
      </p>
    </div>
  );
}
