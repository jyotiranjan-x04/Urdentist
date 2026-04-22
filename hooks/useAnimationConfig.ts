/* ============================================================
   useAnimationConfig — 5 animation flags from device capability
   Source: Implementation Plan §2.2
   
   Provides boolean flags that section components check
   to enable/disable specific animation features
   ============================================================ */

"use client";

import { useMemo } from "react";
import { useDeviceCapability } from "./useDeviceCapability";

export interface AnimationConfig {
  /** Enable GSAP ScrollTrigger animations */
  enableScrollAnimations: boolean;
  /** Enable parallax layers (hero, section backgrounds) */
  enableParallax: boolean;
  /** Enable stagger reveals (card grids, list items) */
  enableStagger: boolean;
  /** Enable counter animations (stats countUp) */
  enableCounters: boolean;
  /** Enable hover micro-interactions (card reveals, button effects) */
  enableHoverEffects: boolean;
  /** User prefers reduced motion */
  prefersReducedMotion: boolean;
}

export function useAnimationConfig(): AnimationConfig {
  const { isHighEnd, isMidTier, isLowEnd } = useDeviceCapability();

  return useMemo(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== "undefined"
        ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
        : false;

    // If user prefers reduced motion, disable everything
    if (prefersReducedMotion) {
      return {
        enableScrollAnimations: false,
        enableParallax: false,
        enableStagger: false,
        enableCounters: false,
        enableHoverEffects: false,
        prefersReducedMotion: true,
      };
    }

    // Low-end: only counters + basic hover
    if (isLowEnd) {
      return {
        enableScrollAnimations: false,
        enableParallax: false,
        enableStagger: false,
        enableCounters: true,
        enableHoverEffects: true,
        prefersReducedMotion: false,
      };
    }

    // Mid-tier: scroll + counters + hover, no parallax/stagger
    if (isMidTier) {
      return {
        enableScrollAnimations: true,
        enableParallax: false,
        enableStagger: false,
        enableCounters: true,
        enableHoverEffects: true,
        prefersReducedMotion: false,
      };
    }

    // High-end: everything enabled
    return {
      enableScrollAnimations: true,
      enableParallax: true,
      enableStagger: true,
      enableCounters: true,
      enableHoverEffects: true,
      prefersReducedMotion: false,
    };
  }, [isHighEnd, isMidTier, isLowEnd]);
}
