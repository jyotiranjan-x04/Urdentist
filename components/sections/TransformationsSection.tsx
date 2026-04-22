/* ============================================================
   S-05 — Proof: Transformations Section
   Source: Implementation Plan §4.2 S-05, LAYOUT_BLUEPRINT §S-14
   
   Build Order: #7
   C-05: AI-generated illustrative images, not real patient photos
   
   Structure:
   - Split header (heading left + CTA right)
   - BeforeAfterSlider
   - Case stories grid (2-col, placeholder cards)
   ============================================================ */

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionHeader from "@/components/ui/SectionHeader";
import BeforeAfterSlider from "@/components/ui/BeforeAfterSlider";

const caseStories = [
  {
    title: "Complete Smile Makeover",
    tags: ["Dental Implants", "Crown"],
    year: "2024",
  },
  {
    title: "Orthodontic Transformation",
    tags: ["Braces", "Retainer"],
    year: "2024",
  },
];

export default function TransformationsSection() {
  return (
    <section id="transformations" className="section-padding bg-pearl">
      <div className="container-content">
        <SectionHeader
          variant="split"
          overline="Real Results"
          heading="Smile Transformations"
          accentWord="Transformations"
          ctaLabel="View More"
          ctaHref="/services"
        />

        {/* Before/After Slider */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-full max-w-5xl mx-auto shadow-card-lg rounded-2xl overflow-hidden">
            <BeforeAfterSlider
              beforeImage="/images/before_smile.png"
              afterImage="/images/after_smile.png"
              className="aspect-[16/7]"
            />
          </div>
        </motion.div>

        {/* Case Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {caseStories.map((story, i) => (
            <motion.div
              key={i}
              className="group relative rounded-2xl border border-sand overflow-hidden bg-cream/50 hover:shadow-card transition-shadow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <div className="aspect-[16/9] bg-cream flex items-center justify-center relative">
                <Image
                  src={`/images/story_${i + 1}.png`}
                  alt={story.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Tags */}
                <div className="flex items-center gap-2 mb-2">
                  {story.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-full bg-gold/10 text-gold font-body text-[10px] font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                  <span className="ml-auto px-2 py-0.5 rounded-full bg-espresso/5 text-muted font-body text-[10px]">
                    {story.year}
                  </span>
                </div>

                {/* Title */}
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg text-espresso group-hover:text-gold transition-colors">
                    {story.title}
                  </h3>
                  <svg
                    className="w-5 h-5 text-muted group-hover:text-gold group-hover:translate-x-1 transition-all"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 17L17 7M17 7H7M17 7v10"
                    />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
