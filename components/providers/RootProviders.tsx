/* ============================================================
   ROOT PROVIDERS — Client Component wrapper
   Source: Implementation Plan §2.2
   
   Responsibilities:
   1. Init Lenis smooth scroll (lerp: 0.08)
   2. Connect Lenis → GSAP ticker (SYSTEM_ARCHITECTURE §5.1)
   3. Set gsap.ticker.lagSmoothing(0)
   4. Connect lenis.on('scroll', ScrollTrigger.update)
   5. Register GSAP plugins
   6. Wrap children in AnimatePresence
   7. Handle scroll reset on route change
   ============================================================ */

"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { registerGSAPPlugins } from "@/lib/animations";

export default function RootProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();



  useEffect(() => {
    // 1. Register GSAP plugins
    registerGSAPPlugins();

    // 2. Init Lenis (SYSTEM_ARCHITECTURE §5.1 — exact order)
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    // 3. Connect Lenis → GSAP ticker
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // 4. Disable GSAP lag smoothing
    gsap.ticker.lagSmoothing(0);

    // 5. Connect Lenis scroll → ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // 6. Refresh ScrollTrigger on full load
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      // Cleanup
      lenis.destroy();
      gsap.ticker.remove(() => {});
      window.removeEventListener("load", onLoad);
    };
  }, []);

  // 2. Handle scroll reset and ScrollTrigger refresh on route change
  useEffect(() => {
    // Reset scroll to top immediately
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }

    // Secondary reset after a small delay to ensure new page content is rendered
    // and to fight any browser-level scroll restoration
    const timeout = setTimeout(() => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
      ScrollTrigger.refresh();
    }, 100);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
