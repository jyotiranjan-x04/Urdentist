/* ============================================================
   S-07 — Social Proof Section
   Source: Implementation Plan §4.2 S-07, LAYOUT_BLUEPRINT §S-13/S-18
   
   Build Order: #8
   C-04: Placeholder testimonial | C-11: Single featured card
   
   Structure:
   - Featured testimonial card
   - Instagram mosaic grid (placeholder tiles)
   ============================================================ */

"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import TestimonialCard from "@/components/ui/TestimonialCard";
import { CLINIC } from "@/lib/constants";
import { useAnimationConfig } from "@/hooks/useAnimationConfig";

const instagramTiles = Array.from({ length: 8 }, (_, i) => i);

export default function SocialProofSection() {
  const { enableScrollAnimations, enableStagger } = useAnimationConfig();

  return (
    <section id="reviews" className="section-padding bg-cream">
      <div className="container-content">
        {/* ═══ TESTIMONIALS ═══ */}
        <SectionHeader
          variant="centered"
          overline="Patient Stories"
          heading="What Our Patients Say"
          accentWord="Say"
          description="Real experiences from patients treated at Ur Dentist, Lalghati, Bhopal."
        />

        {/* Featured testimonial */}
        <motion.div
          className="max-w-2xl mx-auto mb-16"
          initial={enableScrollAnimations ? { opacity: 0, x: 40 } : false}
          whileInView={enableScrollAnimations ? { opacity: 1, x: 0 } : undefined}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <TestimonialCard
            quote="Dr. Baghel made my entire implant process painless and comfortable. The clinic atmosphere is very premium and calming. Highly recommend for anyone in Bhopal looking for quality dental care!"
            name="Rajesh Sharma"
            treatment="Dental Implants"
            rating={5}
            isPlaceholder={true}
          />

          {/* Google review CTA */}
          <div className="mt-6 text-center">
            <p className="font-body text-sm text-muted mb-2">
              Have you visited us?
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 font-body text-sm font-semibold text-gold hover:text-gold/80 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Review us on Google
            </a>
          </div>
        </motion.div>

        {/* ═══ INSTAGRAM MOSAIC ═══ */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="overline mb-1">Follow Us</p>
              <h3 className="font-display text-2xl text-espresso">
                @urdentist
              </h3>
            </div>
            <a
              href={CLINIC.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-sand font-body text-sm font-medium text-espresso hover:border-gold hover:text-gold transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              Follow
            </a>
          </div>

          {/* Mosaic grid — placeholder tiles */}
          <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
            {instagramTiles.map((_, i) => (
              <motion.div
                key={i}
                className="aspect-square rounded-xl bg-gradient-to-br from-sand/50 to-cream border border-sand/50 flex items-center justify-center overflow-hidden group cursor-pointer hover:border-gold/30 transition-colors"
                initial={enableStagger ? { opacity: 0, scale: 0.85, y: 15 } : false}
                whileInView={enableStagger ? { opacity: 1, scale: 1, y: 0 } : undefined}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <svg
                  className="w-6 h-6 text-gold/20 group-hover:text-gold/40 transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
