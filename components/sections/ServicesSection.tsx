/* ============================================================
   S-04 — Services Section
   Source: Implementation Plan §4.2 S-04, LAYOUT_BLUEPRINT §S-06/S-07
   
   Build Order: #2
   
   Structure:
   - Marquee divider (full-width, CSS animation)
   - Split section header (heading left + CTA right)
   - 3-column service card grid (6 services, 2 rows)
   ============================================================ */

"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import ServiceCard from "@/components/ui/ServiceCard";
import servicesData from "@/content/services.json";
import { useAnimationConfig } from "@/hooks/useAnimationConfig";

const marqueeItems = [
  "General Dentistry",
  "Teeth Whitening",
  "Dental Implant",
  "Root Canal",
  "Invisible Aligners",
  "Dental Checkup",
  "Braces",
  "Missing Teeth",
];

export default function ServicesSection() {
  const { enableStagger } = useAnimationConfig();

  return (
    <>
      {/* ════════════ MARQUEE DIVIDER ════════════ */}
      <div className="overflow-hidden bg-espresso py-3">
        <div className="flex animate-marquee whitespace-nowrap">
          {/* Duplicate items for seamless loop */}
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-3 mx-6 text-pearl/60 font-body text-sm uppercase tracking-widest"
            >
              <svg
                className="w-4 h-4 text-gold"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15l-5-5 1.41-1.41L11 14.17l7.59-7.59L20 8l-9 9z" />
              </svg>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ════════════ SERVICES GRID ════════════ */}
      <section id="services" className="section-padding bg-cream">
        <div className="container-content">
          <SectionHeader
            variant="split"
            overline="What We Offer"
            heading="Our Specialized Services"
            accentWord="Specialized"
            description="Comprehensive dental care to keep your smile healthy and beautiful."
            ctaLabel="Explore All Services"
            ctaHref="/services"
          />

          {/* 3-column grid with stagger animation */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesData.map((service, i) => (
              <motion.div
                key={service.slug}
                initial={enableStagger ? { opacity: 0, y: 40 } : false}
                whileInView={enableStagger ? { opacity: 1, y: 0 } : undefined}
                viewport={{ once: false, margin: "-50px", amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              >
                <ServiceCard
                  title={service.title}
                  description={service.description}
                  slug={service.slug}
                  image={(service as any).image}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
