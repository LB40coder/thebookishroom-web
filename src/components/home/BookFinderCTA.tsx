import { Search } from "lucide-react";
import { Button } from "@/components/ui/Button";

const filterOptions = {
  mood: ["Cozy", "Dark", "Romantic", "Inspiring", "Mysterious"],
  genre: ["Classics", "Gothic", "Romance", "Philosophy", "Mystery"],
  length: ["Short", "Medium", "Long"],
  difficulty: ["Beginner", "Intermediate", "Advanced"],
};

export function BookFinderCTA() {
  return (
    <section className="section-padding">
      <div className="section-container">
        <div className="bg-cream-dark rounded-sm border border-coffee/10 p-6 md:p-8 lg:p-10">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-8">
            <div className="flex items-start gap-4 lg:max-w-sm shrink-0">
              <Search className="w-8 h-8 text-coffee shrink-0 mt-1" />
              <div>
                <h2 className="font-serif text-xl text-ink">
                  Can&apos;t decide what to read?
                </h2>
                <p className="mt-1 text-sm text-coffee">
                  Use our Book Finder to get personalized recommendations based
                  on your mood, genre, and reading preferences.
                </p>
              </div>
            </div>

            <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {Object.entries(filterOptions).map(([key, options]) => (
                <div key={key}>
                  <label className="block text-xs font-medium text-coffee capitalize mb-1.5">
                    {key}
                  </label>
                  <select
                    className="w-full px-3 py-2 text-sm bg-cream border border-coffee/20 rounded-sm focus:outline-none focus:ring-1 focus:ring-forest/50 capitalize"
                    defaultValue=""
                    aria-label={`Filter by ${key}`}
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    {options.map((opt) => (
                      <option key={opt} value={opt.toLowerCase()}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            <Button href="/book-finder" variant="secondary" className="shrink-0">
              Find My Next Book
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
