/* ============================================================
   SPINNER — Loading indicator
   Source: Implementation Plan §3.3 (#4)
   Used by AppointmentForm submit state
   ============================================================ */

import clsx from "clsx";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: "w-4 h-4 border-2",
  md: "w-6 h-6 border-2",
  lg: "w-8 h-8 border-3",
};

export default function Spinner({ size = "md", className }: SpinnerProps) {
  return (
    <div
      className={clsx(
        "rounded-full border-gold/30 border-t-gold animate-spin",
        sizeMap[size],
        className
      )}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}
