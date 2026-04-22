/* ============================================================
   useScrollReset — Scroll to top on route change
   Source: Implementation Plan §2.5
   
   Uses Next.js usePathname() to detect route changes
   and reset scroll position to 0.
   ============================================================ */

"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function useScrollReset(): void {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
}
