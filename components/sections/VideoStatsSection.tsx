/* ============================================================
   S-08 — Video Banner + Stats Section
   Source: Implementation Plan §4.2 S-08, LAYOUT_BLUEPRINT §S-12
   
   Build Order: #5
   C-06 applied: static image, no actual video
   
   Structure:
   - Full-bleed dark banner with overlay text + play button
   - Stats row beneath with 4 AnimatedCounters
   ============================================================ */

"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const bannerStats = [
  { value: 10, suffix: "+", label: "Skilled Doctors", isPlaceholder: true },
  { value: 15, suffix: "+", label: "Years Experience", isPlaceholder: true },
  { value: 20000, suffix: "+", label: "Appointments", isPlaceholder: true },
  { value: 99, suffix: "%", label: "Satisfaction", isPlaceholder: true },
];

export default function VideoStatsSection() {
  return (
    <>
      {/* ════════════ VIDEO BANNER ════════════ */}
      <section className="relative min-h-[400px] md:min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/video_banner.png"
            alt="Clinic atmosphere"
            fill
            className="object-cover"
            sizes="100vw"
          />
          {/* Tint overlay to ensure text readability */}
          <div className="absolute inset-0 bg-espresso/70 mix-blend-multiply" />
        </div>

        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />

        {/* Content overlay */}
        <motion.div
          className="relative z-10 text-center px-5"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-body text-xs font-medium uppercase tracking-[0.2em] text-gold mb-4">
            Experience Our Clinic
          </p>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl text-pearl leading-tight mb-6">
            Where Dental Care{" "}
            <span className="font-accent text-gold block md:inline">
              Meets Excellence
            </span>
          </h2>

          {/* Play button (non-functional placeholder per C-06) */}
          <div className="w-16 h-16 md:w-20 md:h-20 mx-auto rounded-full border-2 border-pearl/40 flex items-center justify-center cursor-pointer hover:border-gold hover:scale-110 transition-all duration-300 group">
            <svg
              className="w-6 h-6 md:w-8 md:h-8 text-pearl group-hover:text-gold transition-colors ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </motion.div>
      </section>

      {/* ════════════ STATS BAR ════════════ */}
      <div className="bg-gold py-8 md:py-10">
        <div className="container-content">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-pearl">
            {bannerStats.map((stat, i) => (
              <div key={i}>
                <div className="font-body text-3xl md:text-4xl font-bold text-pearl tabular-nums">
                  {stat.value >= 1000
                    ? stat.value.toLocaleString("en-US")
                    : stat.value}
                  {stat.suffix}
                </div>
                <p className="font-body text-sm text-pearl/70 mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
