/* ============================================================
   TEAM CARD — Doctor/team member card with 3-layer reveal
   Source: Implementation Plan §4.2 S-09
   
   Structure:
   - Circular image (aspect-square, rounded-full)
   - Name (Cassandra)
   - Degree/title (DM Sans muted)
   - Specialty badge
   ============================================================ */

"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface TeamCardProps {
  name: string;
  degree: string;
  specialty: string;
  image?: string;
}

export default function TeamCard({
  name,
  degree,
  specialty,
  image,
}: TeamCardProps) {
  return (
    <motion.div
      className="group text-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Circular image */}
      <div className="relative w-40 h-40 md:w-52 md:h-52 mx-auto mb-5 rounded-full overflow-hidden border-4 border-sand group-hover:border-gold transition-colors duration-300">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 160px, 208px"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-cream to-sand flex items-center justify-center">
            <svg
              className="w-16 h-16 text-gold/30"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Name */}
      <h3 className="font-display text-xl md:text-2xl text-espresso mb-1">
        {name}
      </h3>

      {/* Degree */}
      <p className="font-body text-sm text-muted mb-2">{degree}</p>

      {/* Specialty badge */}
      <span className="inline-block px-3 py-1 rounded-full bg-gold/10 text-gold font-body text-xs font-medium">
        {specialty}
      </span>
    </motion.div>
  );
}
