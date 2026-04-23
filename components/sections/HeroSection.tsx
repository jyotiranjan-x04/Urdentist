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
import HeroStrip from "@/components/forms/HeroStrip";
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
            className="lg:col-span-7 pt-28 lg:pt-0 pb-20 lg:pb-0"
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

            {/* Mobile-Only Visual Content */}
            <motion.div
              className="relative w-full aspect-[4/3] sm:aspect-[16/9] lg:hidden mt-8 mb-6 rounded-3xl overflow-hidden bg-cream border border-sand shadow-card-lg"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.45 }}
            >
              <Image
                src="/images/hero_portrait.png"
                alt="Premium dental care provider"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 0vw"
                priority
              />
              
              {/* Trust Badge */}
              <div className="absolute bottom-4 right-4 w-16 h-16 rounded-full bg-gold shadow-float flex items-center justify-center z-20">
                <div className="text-center text-pearl flex flex-col justify-center gap-px animate-spin-slow">
                  <p className="text-[15px] font-bold leading-none">10+</p>
                  <p className="text-[6px] uppercase tracking-widest">Years</p>
                </div>
              </div>
            </motion.div>

            {/* Sub-headline */}
            <motion.p
              className="font-quote text-lg md:text-xl text-muted mt-2 lg:mt-5 mb-8 max-w-lg leading-relaxed italic"
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
            <HeroStrip
              heroName={heroName}
              setHeroName={setHeroName}
              heroPhone={heroPhone}
              setHeroPhone={setHeroPhone}
              onBookNow={handleHeroStripBook}
            />
          </motion.div>

          {/* ═══ RIGHT: Image (45% → 5/12) ═══ */}
          <motion.div
            className="lg:col-span-5 relative hidden lg:block mt-20 lg:mt-12"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="relative w-full h-full pb-10">
              {/* Main portrait — bleed (C-12) */}
              <div className="w-[90%] ml-auto max-w-[420px] aspect-[3/4] md:h-[500px] xl:h-[580px] max-h-[60vh] rounded-3xl overflow-hidden bg-cream border border-sand relative">
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
                className="absolute bottom-0 left-0 w-[45%] max-w-[200px] aspect-square rounded-2xl overflow-hidden bg-cream border-4 border-pearl shadow-card-lg z-10"
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
                className="absolute top-8 left-4 w-24 h-24 rounded-full bg-gold shadow-float flex items-center justify-center z-20"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 1.4, type: "spring" }}
              >
                <div className="text-center text-pearl flex flex-col justify-center gap-0.5 animate-spin-slow">
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
