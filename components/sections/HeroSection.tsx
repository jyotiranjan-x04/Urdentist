/* ============================================================
   S-02 — HERO SECTION (Immersive)
   Source: Implementation Plan §4.2 S-02, LAYOUT_BLUEPRINT §S-03/S-04
   
   Build Order: #9 (last — depends on HeroStrip concept)
   
   C-03: HeroStrip pre-fills → scrolls to #appointment-form
   C-12: Bleed portrait, no circular frame
   C-15: TopBar merged into Header (done in Phase 2)
   
   Layout: 55/45 asymmetric split, min-h-screen
   Zone 1: Pearl background
   Zone 2: Bleed portrait image (right)
   Zone 3: Content (left 55%)
   ============================================================ */

"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { CLINIC } from "@/lib/constants";

interface HeroSectionProps {
  /** Callback when HeroStrip "Book Now" is clicked (C-03 pre-fill) */
  onHeroStripSubmit?: (name: string, phone: string) => void;
}

export default function HeroSection({ onHeroStripSubmit }: HeroSectionProps) {
  const [heroName, setHeroName] = useState("");
  const [heroPhone, setHeroPhone] = useState("");

  const scrollToForm = () => {
    const form = document.getElementById("appointment-form");
    if (form) {
      form.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleHeroStripBook = () => {
    if (onHeroStripSubmit) {
      onHeroStripSubmit(heroName, heroPhone);
    } else {
      scrollToForm();
    }
  };

  return (
    <section className="relative min-h-screen flex items-center bg-pearl overflow-hidden">
      {/* ═══ BACKGROUND DECORATIVE ELEMENTS ═══ */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle gradient wash */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-sand/30 to-transparent" />
        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #2C2416 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="container-content relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center min-h-[calc(100vh-80px)]">
          {/* ═══ LEFT: Content (55% → 7/12) ═══ */}
          <motion.div
            className="lg:col-span-7 pt-20 lg:pt-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {/* Overline */}
            <motion.p
              className="overline mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              {CLINIC.doctor.specialty} • {CLINIC.address.short}
            </motion.p>

            {/* H1 */}
            <h1>
              <motion.span
                className="block font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-espresso leading-[1.1]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                Your Best
              </motion.span>
              <motion.span
                className="block font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-espresso leading-[1.1]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <span className="font-accent text-gold text-[1.2em]">
                  Dental
                </span>
              </motion.span>
              <motion.span
                className="block font-display text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-espresso leading-[1.1]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                Experience Awaits
              </motion.span>
            </h1>

            {/* Sub-headline */}
            <motion.p
              className="font-quote text-lg md:text-xl text-muted mt-5 mb-8 max-w-lg leading-relaxed italic"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              Premium dental care by {CLINIC.doctor.name},{" "}
              {CLINIC.doctor.shortDegree} — serving families in{" "}
              {CLINIC.address.short} with compassion and expertise.
            </motion.p>

            {/* CTA Row */}
            <motion.div
              className="flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <Button variant="primary" size="lg" onClick={scrollToForm}>
                Book an Appointment
              </Button>
              <button
                onClick={scrollToForm}
                className="inline-flex items-center gap-2 font-body text-sm font-medium text-espresso hover:text-gold transition-colors cursor-pointer"
              >
                <span className="w-10 h-10 rounded-full border-2 border-espresso/20 flex items-center justify-center group-hover:border-gold">
                  <svg
                    className="w-4 h-4 ml-0.5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
                Watch Our Story
              </button>
            </motion.div>

            {/* ═══ HERO STRIP — inline booking (C-03) ═══ */}
            <motion.div
              className="mt-10 p-4 md:p-5 rounded-2xl bg-pearl border border-sand shadow-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={heroName}
                  onChange={(e) => setHeroName(e.target.value)}
                  className="rounded-xl border border-sand bg-cream/50 px-4 py-2.5 font-body text-sm placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={heroPhone}
                  onChange={(e) => setHeroPhone(e.target.value)}
                  className="rounded-xl border border-sand bg-cream/50 px-4 py-2.5 font-body text-sm placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold transition-colors"
                />
                <button
                  onClick={handleHeroStripBook}
                  className="bg-gold text-pearl rounded-xl px-6 py-2.5 font-body text-sm font-semibold hover:bg-gold/90 transition-colors cursor-pointer"
                >
                  Book Now →
                </button>
              </div>
            </motion.div>
          </motion.div>

          {/* ═══ RIGHT: Image (45% → 5/12) ═══ */}
          <motion.div
            className="lg:col-span-5 relative hidden lg:flex justify-end"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="relative">
              {/* Main portrait — bleed (C-12) */}
              <div className="w-[400px] xl:w-[480px] h-[550px] xl:h-[650px] rounded-3xl overflow-hidden bg-cream border border-sand relative">
                <Image
                  src="/images/hero_portrait.png"
                  alt="Premium dental care provider"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 0vw, 480px"
                  priority
                />
              </div>

              {/* Floating secondary image */}
              <motion.div
                className="absolute -bottom-6 -left-12 w-40 h-40 rounded-2xl overflow-hidden bg-cream border-4 border-pearl shadow-card-lg relative"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.1 }}
              >
                <Image
                  src="/images/hero_floating.png"
                  alt="Dental care details"
                  fill
                  className="object-cover"
                  sizes="160px"
                />
              </motion.div>

              {/* Trust badge — rotating */}
              <motion.div
                className="absolute top-8 -left-8 w-24 h-24 rounded-full bg-gold shadow-float flex items-center justify-center"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 1.4, type: "spring" }}
              >
                <div className="text-center text-pearl animate-spin-slow">
                  <p className="text-xl font-bold leading-none">10+</p>
                  <p className="text-[8px] uppercase tracking-widest">
                    Years Exp
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
