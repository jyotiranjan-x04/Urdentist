/* ============================================================
   TESTIMONIAL CARD — Single featured testimonial display
   Source: Implementation Plan §4.2 S-07, C-04, C-11
   
   C-04: Placeholder content allowed (flagged)
   C-11: Single featured card layout (not carousel)
   
   Structure:
   - Large quote mark
   - Quote text (Countryside Two)
   - 5-star rating
   - Patient name + treatment type
   ============================================================ */

import clsx from "clsx";

interface TestimonialCardProps {
  quote: string;
  name: string;
  treatment?: string;
  rating?: number;
  isPlaceholder?: boolean;
  className?: string;
}

export default function TestimonialCard({
  quote,
  name,
  treatment,
  rating = 5,
  isPlaceholder = false,
  className,
}: TestimonialCardProps) {
  return (
    <div
      className={clsx(
        "relative bg-pearl rounded-2xl border border-sand p-8 md:p-10",
        className
      )}
    >
      {/* Large decorative quote mark */}
      <div className="absolute top-4 left-6 font-display text-6xl text-gold/15 leading-none select-none" aria-hidden="true">
        &ldquo;
      </div>

      {/* Star rating */}
      <div className="flex items-center gap-0.5 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            className={clsx(
              "w-4 h-4",
              i < rating ? "text-gold" : "text-sand"
            )}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* Quote text */}
      <blockquote className="font-quote text-lg md:text-xl text-espresso leading-relaxed mb-6 relative z-10">
        &ldquo;{quote}&rdquo;
      </blockquote>

      {/* Attribution */}
      <div className="flex items-center gap-3">
        {/* Avatar placeholder */}
        <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
          <span className="font-body text-sm font-semibold text-gold">
            {name.charAt(0)}
          </span>
        </div>
        <div>
          <p className="font-body text-sm font-semibold text-espresso">
            {name}
            {isPlaceholder && (
              <span className="ml-1 text-xs text-muted font-normal">(sample)</span>
            )}
          </p>
          {treatment && (
            <p className="font-body text-xs text-muted">{treatment}</p>
          )}
        </div>
      </div>
    </div>
  );
}
