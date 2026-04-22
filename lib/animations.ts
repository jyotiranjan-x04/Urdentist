/* ============================================================
   GSAP ANIMATION REGISTRY
   Source: Implementation Plan §2.2, SYSTEM_ARCHITECTURE §5.1
   Centralizes plugin registration + shared easings
   ============================================================ */

"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* ============================================================
   PLUGIN REGISTRATION — Must run once, before any GSAP usage
   ============================================================ */

let isRegistered = false;

export function registerGSAPPlugins(): void {
  if (isRegistered) return;
  gsap.registerPlugin(ScrollTrigger);
  isRegistered = true;
}

/* ============================================================
   SHARED EASINGS — Consistent motion language
   ============================================================ */

export const EASE = {
  /** Standard content reveal — smooth deceleration */
  reveal: "power2.out",

  /** Hero entrance — slightly more dramatic */
  heroEnter: "power3.out",

  /** Stagger items — snappy but natural */
  stagger: "power2.out",

  /** Counter animation — linear for numeric counting */
  counter: "power1.inOut",

  /** Parallax — very subtle */
  parallax: "none",

  /** Hover interactions — quick response */
  hover: "power1.out",

  /** Menu open/close */
  menu: "power4.inOut",
} as const;

/* ============================================================
   ANIMATION DURATIONS (seconds)
   ============================================================ */

export const DURATION = {
  fast: 0.2,
  normal: 0.6,
  slow: 0.8,
  hero: 1.0,
  stagger: 0.08,
  counter: 2.0,
  pageTransition: 0.3,
} as const;

/* ============================================================
   SCROLL TRIGGER DEFAULTS
   start: "top 75%" — triggers when element top hits 75% viewport
   ============================================================ */

export const SCROLL_DEFAULTS: ScrollTrigger.Vars = {
  start: "top 75%",
  toggleActions: "play none none none",
};

/* ============================================================
   SHARED ANIMATION PRESETS
   Used by section components via gsap.fromTo()
   ============================================================ */

export const ANIM_PRESET = {
  /** Fade up — standard section content reveal */
  fadeUp: {
    from: { opacity: 0, y: 40 },
    to: { opacity: 1, y: 0, duration: DURATION.normal, ease: EASE.reveal },
  },

  /** Fade in — no movement, just opacity */
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1, duration: DURATION.normal, ease: EASE.reveal },
  },

  /** Slide from left */
  slideLeft: {
    from: { opacity: 0, x: -60 },
    to: { opacity: 1, x: 0, duration: DURATION.slow, ease: EASE.reveal },
  },

  /** Slide from right */
  slideRight: {
    from: { opacity: 0, x: 60 },
    to: { opacity: 1, x: 0, duration: DURATION.slow, ease: EASE.reveal },
  },

  /** Scale in — for badges, icons */
  scaleIn: {
    from: { opacity: 0, scale: 0.8 },
    to: { opacity: 1, scale: 1, duration: DURATION.normal, ease: EASE.reveal },
  },
} as const;
