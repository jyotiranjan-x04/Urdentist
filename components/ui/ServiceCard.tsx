/* ============================================================
   SERVICE CARD — Hover-expand card for services grid
   Source: LAYOUT_BLUEPRINT §S-07, Implementation Plan §4.2 S-04
   
   Structure:
   - Top image (aspect-[4/3])
   - Circular icon badge (overlaps image bottom)
   - Service title (Cassandra)
   - Description (DM Sans)
   - "Learn more →" link
   ============================================================ */

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface ServiceCardProps {
  title: string;
  description: string;
  slug: string;
  image?: string;
  icon?: string;
}

export default function ServiceCard({
  title,
  description,
  slug,
  image,
  icon,
}: ServiceCardProps) {
  return (
    <motion.div
      className="group relative bg-pearl rounded-2xl border border-sand overflow-hidden shadow-card hover:shadow-card-lg transition-shadow duration-300"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] bg-cream overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-sand/50 to-cream">
            <svg
              className="w-12 h-12 text-gold/40"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
        )}

        {/* Icon badge — overlaps image bottom */}
        {icon && (
          <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-gold flex items-center justify-center shadow-float z-10">
            <span className="text-pearl text-sm">{icon}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 pt-8">
        <h3 className="font-display text-xl text-espresso mb-2 group-hover:text-gold transition-colors">
          {title}
        </h3>
        <p className="font-body text-sm text-muted leading-relaxed mb-4 line-clamp-3">
          {description}
        </p>
        <Link
          href={`/services/${slug}`}
          className="font-body text-sm font-semibold text-gold hover:text-gold/80 transition-colors inline-flex items-center gap-1.5"
        >
          Learn more
          <svg
            className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </motion.div>
  );
}
