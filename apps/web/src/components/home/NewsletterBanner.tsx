import { Mail } from "lucide-react";
import { NewsletterForm } from "@/components/ui/NewsletterForm";

export function NewsletterBanner() {
  return (
    <section id="newsletter" className="bg-forest text-cream">
      <div className="section-container section-padding">
        <div className="max-w-2xl mx-auto text-center">
          <Mail className="w-8 h-8 text-gold mx-auto mb-4" />
          <h2 className="font-serif text-2xl md:text-3xl">
            Join our cozy reading corner
          </h2>
          <p className="mt-3 text-cream/80 text-sm md:text-base">
            Get curated reading lists, book recommendations, and literary
            inspiration delivered to your inbox every week.
          </p>
          <div className="mt-6">
            <NewsletterForm variant="banner" />
          </div>
        </div>
      </div>
    </section>
  );
}
