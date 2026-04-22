/* ============================================================
   SECTION HEADER — 3 variants: centered | split | editorial
   Source: Implementation Plan §3.3 (#3)
   
   Used at the top of every section. Includes:
   - Overline (optional)
   - H2 heading with optional accent word (Housttely Signature)
   - Body/description text (optional)
   - CTA button (only in 'split' variant)
   ============================================================ */

import clsx from "clsx";
import Button from "./Button";

type Variant = "centered" | "split" | "editorial";

interface SectionHeaderProps {
  variant?: Variant;
  overline?: string;
  heading: string;
  /** Word within heading to render in Housttely Signature accent font */
  accentWord?: string;
  description?: string;
  /** CTA button (split variant only) */
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
}

export default function SectionHeader({
  variant = "centered",
  overline,
  heading,
  accentWord,
  description,
  ctaLabel,
  ctaHref,
  className,
}: SectionHeaderProps) {
  // Build heading with accent word replacement
  const renderHeading = () => {
    if (!accentWord) {
      return (
        <h2 className="font-display text-3xl md:text-5xl text-espresso leading-tight">
          {heading}
        </h2>
      );
    }

    // Split heading at the accent word and wrap it in accent font
    const parts = heading.split(accentWord);
    return (
      <h2 className="font-display text-3xl md:text-5xl text-espresso leading-tight">
        {parts[0]}
        <span className="font-accent italic font-medium text-gold inline-block relative">
          {accentWord}
        </span>
        {parts[1] || ""}
      </h2>
    );
  };

  // === CENTERED VARIANT ===
  if (variant === "centered") {
    return (
      <div className={clsx("text-center max-w-2xl mx-auto mb-10 md:mb-14", className)}>
        {overline && <p className="overline mb-3">{overline}</p>}
        {renderHeading()}
        {description && (
          <p className="font-body text-base text-muted mt-4 leading-relaxed">
            {description}
          </p>
        )}
      </div>
    );
  }

  // === SPLIT VARIANT (heading left, CTA right) ===
  if (variant === "split") {
    return (
      <div
        className={clsx(
          "flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-14",
          className
        )}
      >
        <div className="max-w-xl">
          {overline && <p className="overline mb-3">{overline}</p>}
          {renderHeading()}
          {description && (
            <p className="font-body text-base text-muted mt-4 leading-relaxed">
              {description}
            </p>
          )}
        </div>
        {ctaLabel && ctaHref && (
          <Button variant="secondary" href={ctaHref}>
            {ctaLabel}
          </Button>
        )}
      </div>
    );
  }

  // === EDITORIAL VARIANT (left-aligned, wider, more dramatic) ===
  return (
    <div className={clsx("max-w-3xl mb-10 md:mb-14", className)}>
      {overline && <p className="overline mb-3">{overline}</p>}
      {renderHeading()}
      {description && (
        <p className="font-body text-lg text-muted mt-5 leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
}
