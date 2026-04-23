"use client";

import { motion } from "framer-motion";

interface HeroStripProps {
  heroName: string;
  setHeroName: (name: string) => void;
  heroPhone: string;
  setHeroPhone: (phone: string) => void;
  onBookNow: () => void;
}

export default function HeroStrip({
  heroName,
  setHeroName,
  heroPhone,
  setHeroPhone,
  onBookNow,
}: HeroStripProps) {
  return (
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
          onClick={onBookNow}
          className="bg-gold text-pearl rounded-xl px-6 py-2.5 font-body text-sm font-semibold hover:bg-gold/90 transition-colors cursor-pointer"
        >
          Book Now →
        </button>
      </div>
    </motion.div>
  );
}
