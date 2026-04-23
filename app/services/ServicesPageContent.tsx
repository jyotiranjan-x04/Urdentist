/* ============================================================
   SERVICES INDEX PAGE — Client component with animations
   ============================================================ */

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import ServiceCard from "@/components/ui/ServiceCard";
import { CLINIC, WA_LINK, WA_MESSAGES } from "@/lib/constants";
import servicesData from "@/content/services.json";

const processSteps = [
  {
    step: "01",
    title: "Consultation",
    description: "Comprehensive oral examination and digital X-rays",
  },
  {
    step: "02",
    title: "Treatment Plan",
    description: "Personalized plan with transparent pricing",
  },
  {
    step: "03",
    title: "Procedure",
    description: "Expert treatment with latest technology",
  },
  {
    step: "04",
    title: "Follow-Up",
    description: "Regular check-ins for lasting results",
  },
];

export default function ServicesPageContent() {
  return (
    <div className="min-h-screen bg-pearl">
      {/* ════════════ HERO BANNER ════════════ */}
      <section className="relative bg-espresso overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "radial-gradient(circle at 75% 75%, #C9A96E 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="container-content pt-32 pb-16 md:py-24 relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="font-body text-xs font-medium uppercase tracking-[0.2em] text-gold mb-4">
                Our Services
              </p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-pearl leading-tight mb-6">
                Comprehensive <span className="text-gold">Dental Care</span>{" "}
                for Every Need
              </h1>
              <p className="font-body text-pearl/70 text-lg leading-relaxed max-w-xl mb-8">
                From routine checkups to advanced implant surgery — expert
                care by {CLINIC.doctor.name}, {CLINIC.doctor.shortDegree} at{" "}
                {CLINIC.address.area}, {CLINIC.address.city}.
              </p>
              <Link
                href="/#appointment-form"
                className="inline-flex items-center gap-2 bg-gold text-pearl px-8 py-3.5 rounded-xl font-body text-sm font-semibold hover:bg-gold/90 transition-colors"
              >
                Book Appointment
                <svg
                  className="w-4 h-4"
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
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════ SERVICES GRID ════════════ */}
      <section className="section-padding bg-cream">
        <div className="container-content">
          <SectionHeader
            variant="centered"
            overline="What We Offer"
            heading="Our Specialized Services"
            accentWord="Specialized"
            description="Each service is delivered with the latest equipment, premium materials, and personalized treatment plans."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesData.map((service, i) => (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
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

      {/* ════════════ PROCESS SECTION ════════════ */}
      <section className="section-padding bg-pearl">
        <div className="container-content">
          <SectionHeader
            variant="centered"
            overline="Our Process"
            heading="How Treatment Works"
            accentWord="Works"
            description="A simple 4-step process designed for your comfort and convenience."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, i) => (
              <motion.div
                key={i}
                className="text-center relative"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                {/* Connector line */}
                {i < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-[2px] bg-sand z-0">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gold" />
                  </div>
                )}

                <div className="relative w-16 h-16 mx-auto mb-4 rounded-full bg-gold/10 border-2 border-gold/30 flex items-center justify-center z-10">
                  <span className="font-body text-lg font-bold text-gold">
                    {step.step}
                  </span>
                </div>
                <h3 className="font-display text-lg text-espresso mb-1">
                  {step.title}
                </h3>
                <p className="font-body text-sm text-muted leading-relaxed max-w-[200px] mx-auto">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ INSURANCE / PAYMENT INFO ════════════ */}
      <section className="section-padding bg-cream">
        <div className="container-content">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <p className="overline mb-3">Affordable Care</p>
              <h2 className="font-display text-3xl md:text-4xl text-espresso mb-6">
                Quality Treatment at{" "}
                <span className="text-gold">Fair Prices</span>
              </h2>
              <p className="font-body text-muted leading-relaxed mb-6">
                We believe premium dental care should be accessible. Get a
                clear cost estimate before any procedure — no surprises, no
                hidden charges.
              </p>

              <div className="space-y-4">
                {[
                  "Upfront pricing with no hidden fees",
                  "EMI options available for major procedures",
                  "All digital payment modes accepted",
                  "Free initial consultation for new patients",
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.5 }}
                    transition={{ duration: 0.3, delay: 0.3 + i * 0.1 }}
                  >
                    <span className="w-5 h-5 rounded-full bg-trust/10 flex items-center justify-center shrink-0">
                      <svg
                        className="w-3 h-3 text-trust"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    <span className="font-body text-sm text-espresso">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-card-lg"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Image
                src="/images/clinic_exterior.png"
                alt="Ur Dentist clinic exterior"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════ CTA BANNER ════════════ */}
      <section className="bg-espresso py-16 md:py-20">
        <motion.div
          className="container-content text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl md:text-4xl text-pearl mb-4">
            Not Sure Which Service You Need?
          </h2>
          <p className="font-body text-pearl/70 max-w-lg mx-auto mb-8">
            Book a free consultation and let {CLINIC.doctor.name} recommend the
            best treatment plan for your smile.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#appointment-form"
              className="inline-flex items-center justify-center gap-2 bg-gold text-pearl px-8 py-3.5 rounded-xl font-body text-sm font-semibold hover:bg-gold/90 transition-colors"
            >
              Book Free Consultation
            </Link>
            <a
              href={WA_LINK(WA_MESSAGES.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-pearl/30 text-pearl px-8 py-3.5 rounded-xl font-body text-sm font-semibold hover:border-trust hover:text-trust transition-colors"
            >
              💬 Ask on WhatsApp
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
