/* ============================================================
   S-03 — Trust + About Section
   Source: Implementation Plan §4.2 S-03, LAYOUT_BLUEPRINT §S-05
   
   Build Order: #3
   
   Layout: Left 5/12 (image cluster) + Right 7/12 (content)
   Stats row at bottom with 4 AnimatedCounters
   ============================================================ */

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import Button from "@/components/ui/Button";
import { CLINIC, STATS } from "@/lib/constants";
import { useAnimationConfig } from "@/hooks/useAnimationConfig";

const checkmarks = [
  "Advanced sterilization and hygiene protocols",
  "State-of-the-art dental equipment and technology",
  "Personalized treatment plans for every patient",
];

export default function TrustAboutSection() {
  const config = useAnimationConfig();

  return (
    <section id="about" className="section-padding bg-pearl">
      <div className="container-content">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* ═══ LEFT: Image Cluster (5/12) ═══ */}
          <motion.div
            className="lg:col-span-5 relative"
            initial={config.enableScrollAnimations ? { opacity: 0, x: -40 } : false}
            whileInView={config.enableScrollAnimations ? { opacity: 1, x: 0 } : undefined}
            viewport={{ once: false, margin: "-80px", amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden bg-cream border-4 border-sand mx-auto lg:mx-0 relative">
                <Image
                  src="/images/interior_main.png"
                  alt="Modern dental clinic interior"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 256px, 320px"
                />
              </div>

              {/* Secondary overlapping image */}
              <motion.div
                className="absolute -bottom-4 -right-2 lg:right-0 w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden bg-cream border-4 border-pearl shadow-card relative"
                initial={config.enableScrollAnimations ? { opacity: 0, scale: 0.8 } : false}
                whileInView={config.enableScrollAnimations ? { opacity: 1, scale: 1 } : undefined}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Image
                  src="/images/interior_detail.png"
                  alt="Dental equipment detail"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 128px, 160px"
                />
              </motion.div>

              {/* Trust badge */}
              <motion.div
                className="absolute -top-2 -right-2 lg:right-4 w-20 h-20 rounded-full bg-gold flex items-center justify-center shadow-float"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.4, delay: 0.5, type: "spring" }}
              >
                <div className="text-center text-pearl">
                  <p className="text-lg font-bold leading-none">10+</p>
                  <p className="text-[8px] uppercase tracking-wider leading-tight">
                    Years
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* ═══ RIGHT: Content (7/12) ═══ */}
          <motion.div
            className="lg:col-span-7"
            initial={config.enableScrollAnimations ? { opacity: 0, x: 40 } : false}
            whileInView={config.enableScrollAnimations ? { opacity: 1, x: 0 } : undefined}
            viewport={{ once: false, margin: "-80px", amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            {/* Overline */}
            <p className="overline mb-3">About Us</p>

            {/* Heading */}
            <h2 className="font-display text-3xl md:text-5xl text-espresso leading-tight mb-2">
              Your{" "}
              <span className="font-accent text-gold inline-block">
                Trusted
              </span>{" "}
              Dental Partner
            </h2>

            {/* Body */}
            <p className="font-body text-base text-muted leading-relaxed mb-6 max-w-xl">
              Led by {CLINIC.doctor.name}, {CLINIC.doctor.degree}, Ur Dentist
              delivers premium dental care at our modern clinic in{" "}
              {CLINIC.address.short}. We combine advanced technology with
              compassionate treatment to ensure your comfort and confidence.
            </p>

            {/* Checkmarks */}
            <ul className="space-y-3 mb-8">
              {checkmarks.map((item, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
                >
                  <span className="shrink-0 w-5 h-5 rounded-full bg-gold/10 flex items-center justify-center mt-0.5">
                    <svg
                      className="w-3 h-3 text-gold"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </span>
                  <span className="font-body text-sm text-espresso">
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>

            {/* CTA */}
            <Button variant="ghost" href="/about">
              Learn More About Us →
            </Button>
          </motion.div>
        </div>

        {/* ═══ STATS ROW ═══ */}
        <div className="mt-16 pt-10 border-t border-sand">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-gold">
            {STATS.map((stat, i) => (
              <div key={i} className="[&>p]:text-muted [&>p]:opacity-100 flex flex-col items-center justify-center">
                 <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  displayValue={
                    "displayValue" in stat
                      ? (stat as { displayValue?: string }).displayValue
                      : undefined
                  }
                  label={stat.label}
                 />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
