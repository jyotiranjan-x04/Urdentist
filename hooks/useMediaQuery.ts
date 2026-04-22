/* ============================================================
   useMediaQuery — SSR-safe responsive breakpoint hook
   Source: Implementation Plan §1.2
   
   Returns boolean for whether media query matches.
   Defaults to false during SSR to avoid hydration mismatch.
   ============================================================ */

"use client";

import { useState, useEffect } from "react";

/**
 * SSR-safe media query hook.
 * @param query - CSS media query string, e.g. "(min-width: 768px)"
 * @returns boolean — true if query matches, false otherwise (and during SSR)
 *
 * @example
 * const isDesktop = useMediaQuery("(min-width: 1024px)");
 * const isMobile = useMediaQuery("(max-width: 767px)");
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);

    // Set initial value
    setMatches(mql.matches);

    // Listen for changes
    function onChange(e: MediaQueryListEvent) {
      setMatches(e.matches);
    }

    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}
