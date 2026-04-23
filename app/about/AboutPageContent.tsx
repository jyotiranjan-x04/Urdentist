/* ============================================================
   ABOUT PAGE CONTENT — Client component with animations
   ============================================================ */

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import SectionHeader from "@/components/ui/SectionHeader";
import { CLINIC, STATS } from "@/lib/constants";

const clinicFeatures = [
  {
    icon: "🏥",
    title: "Modern Infrastructure",
    description:
      "State-of-the-art dental equipment with international standard sterilization protocols.",
  },
  {
    icon: "🦷",
    title: "Specialized Care",
    description:
      "MDS-level expertise in periodontics, implantology, and comprehensive dental treatments.",
  },
  {
    icon: "💎",
    title: "Premium Experience",
    description:
      "Comfortable, anxiety-free environment designed to make your dental visit pleasant.",
  },
  {
    icon: "🔬",
    title: "Digital Dentistry",
    description:
      "Digital X-rays, intraoral cameras, and computer-aided treatment planning.",
  },
  {
    icon: "🤝",
    title: "Patient-First Approach",
    description:
      "Transparent treatment plans with clear cost breakdowns and no hidden charges.",
  },
  {
    icon: "⏰",
    title: "Convenient Timings",
    description:
      "Open 7 days a week including Sundays to accommodate your busy schedule.",
  },
];

const milestones = [
  { year: "2014", event: "Clinic established at Lalghati, Bhopal" },
  { year: "2017", event: "Expanded with digital X-ray and RVG" },
  { year: "2020", event: "Introduced dental implant surgeries" },
  { year: "2023", event: "Upgraded to premium patient-centric facility" },
];

export default function AboutPageContent() {
  return (
    <div className="min-h-screen bg-pearl">
      {/* ════════════ HERO BANNER ════════════ */}
      <section className="relative bg-espresso overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "radial-gradient(circle at 25% 25%, #C9A96E 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="container-content pt-32 pb-16 md:py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[50vh]">
            {/* Text content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <p className="font-body text-xs font-medium uppercase tracking-[0.2em] text-gold mb-4">
                About {CLINIC.name}
              </p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-pearl leading-tight mb-6">
                Where Expertise Meets{" "}
                <span className="text-gold">Compassion</span>
              </h1>
              <p className="font-body text-pearl/70 text-lg leading-relaxed max-w-lg mb-8">
                Led by {CLINIC.doctor.name}, {CLINIC.doctor.degree},{" "}
                {CLINIC.name} brings world-class dental expertise to{" "}
                {CLINIC.address.area}, {CLINIC.address.city}.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-gold text-pearl px-8 py-3.5 rounded-xl font-body text-sm font-semibold hover:bg-gold/90 transition-colors"
              >
                Book a Consultation
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

            {/* Doctor image */}
            <motion.div
              className="relative flex justify-center lg:justify-end"
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            >
              <div className="relative w-72 h-80 md:w-80 md:h-96 rounded-2xl overflow-hidden shadow-card-lg border-4 border-gold/20">
                <Image
                  src="/images/team_doctor.png"
                  alt={CLINIC.doctor.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 288px, 320px"
                  priority
                />
              </div>
              {/* Floating badge */}
              <motion.div
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:-left-6 bg-gold text-pearl px-5 py-3 rounded-xl shadow-float"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <p className="font-display text-lg font-bold">
                  {CLINIC.doctor.shortDegree}
                </p>
                <p className="font-body text-xs opacity-80">
                  {CLINIC.doctor.specialty}
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════ STATS — Animated Counters ════════════ */}
      <section className="bg-cream py-16">
        <div className="container-content">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <motion.div
                key={i}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <AnimatedCounter
                  value={stat.value}
                  suffix={stat.suffix}
                  displayValue={
                    "displayValue" in stat ? stat.displayValue : undefined
                  }
                  label={stat.label}
                  className="text-espresso"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ MISSION STATEMENT ════════════ */}
      <section className="section-padding bg-pearl">
        <div className="container-content">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left — Mission */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <p className="overline mb-3">Our Mission</p>
              <h2 className="font-display text-3xl md:text-4xl text-espresso mb-6">
                Delivering Dental Excellence with{" "}
                <span className="text-gold">Heart</span>
              </h2>
              <p className="font-body text-muted leading-relaxed mb-6">
                At {CLINIC.name}, we believe every patient deserves access to
                specialist-level dental care without the intimidation. Our clinic
                combines the precision of modern dental technology with the
                warmth of personalized care.
              </p>
              <p className="font-body text-muted leading-relaxed mb-8">
                Whether it&apos;s a routine checkup or a complex implant
                procedure, we treat every patient like family — with honesty,
                transparency, and the highest clinical standards.
              </p>

              {/* Values list */}
              <div className="space-y-3">
                {[
                  "Evidence-based treatment protocols",
                  "Transparent pricing — no hidden charges",
                  "International sterilization standards",
                  "Patient comfort is our top priority",
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.5 }}
                    transition={{ duration: 0.3, delay: 0.3 + i * 0.1 }}
                  >
                    <span className="w-5 h-5 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                      <svg
                        className="w-3 h-3 text-gold"
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

            {/* Right — Clinic images */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-card-lg">
                <Image
                  src="/images/interior_main.png"
                  alt="Ur Dentist clinic interior"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              {/* Small floating image */}
              <motion.div
                className="absolute -bottom-6 -left-4 w-40 h-32 rounded-xl overflow-hidden shadow-card border-4 border-pearl"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Image
                  src="/images/interior_detail.png"
                  alt="Dental equipment detail"
                  fill
                  className="object-cover"
                  sizes="160px"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════ CLINIC FEATURES GRID ════════════ */}
      <section className="section-padding bg-cream">
        <div className="container-content">
          <SectionHeader
            variant="centered"
            overline="Why Choose Us"
            heading="What Sets Us Apart"
            accentWord="Apart"
            description="Premium dental care with the personal touch you deserve."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clinicFeatures.map((feature, i) => (
              <motion.div
                key={i}
                className="bg-pearl rounded-2xl border border-sand p-6 hover:shadow-card transition-shadow group"
                initial={{
                  opacity: 0,
                  x: i % 3 === 0 ? -30 : i % 3 === 2 ? 30 : 0,
                  y: 20,
                }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <span className="text-3xl mb-4 block group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </span>
                <h3 className="font-display text-lg text-espresso mb-2 group-hover:text-gold transition-colors">
                  {feature.title}
                </h3>
                <p className="font-body text-sm text-muted leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ TIMELINE ════════════ */}
      <section className="section-padding bg-pearl">
        <div className="container-content max-w-3xl">
          <SectionHeader
            variant="centered"
            overline="Our Journey"
            heading="Milestones"
            accentWord="Milestones"
          />

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-sand" />

            <div className="space-y-8">
              {milestones.map((milestone, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-6 relative"
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                >
                  {/* Dot */}
                  <div className="w-12 h-12 rounded-full bg-gold/10 border-2 border-gold flex items-center justify-center shrink-0 z-10">
                    <span className="font-body text-xs font-bold text-gold">
                      {milestone.year}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="bg-cream/50 rounded-xl border border-sand p-4 flex-1">
                    <p className="font-body text-sm text-espresso">
                      {milestone.event}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ DOCTOR PROFILE ════════════ */}
      <section className="section-padding bg-cream">
        <div className="container-content">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            {/* Photo */}
            <motion.div
              className="lg:col-span-2 flex justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative w-64 h-80 md:w-72 md:h-96 rounded-2xl overflow-hidden shadow-card-lg">
                <Image
                  src="/images/team_doctor.png"
                  alt={CLINIC.doctor.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 256px, 288px"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-espresso/60 to-transparent" />
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="overline mb-3">Meet Your Doctor</p>
              <h2 className="font-display text-3xl md:text-4xl text-espresso mb-2">
                {CLINIC.doctor.name}
              </h2>
              <p className="font-body text-gold font-semibold mb-6">
                {CLINIC.doctor.degree}
              </p>
              <p className="font-body text-muted leading-relaxed mb-6">
                With a specialization in Periodontics & Implantology,{" "}
                {CLINIC.doctor.name.split(" ")[0]} brings advanced surgical
                expertise combined with a gentle, patient-first approach.
                Trained in the latest implant techniques and laser periodontal
                therapy, he ensures every procedure is precise, comfortable,
                and delivers lasting results.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: "Specialization", value: "Periodontics & Implantology" },
                  { label: "Location", value: `${CLINIC.address.area}, ${CLINIC.address.city}` },
                  { label: "Degree", value: "MDS (Master of Dental Surgery)" },
                  { label: "Available", value: "Mon-Sun (by appointment)" },
                ].map((info, i) => (
                  <div key={i} className="bg-pearl/60 rounded-xl border border-sand p-4">
                    <p className="font-body text-xs text-muted uppercase tracking-wider mb-1">
                      {info.label}
                    </p>
                    <p className="font-body text-sm font-semibold text-espresso">
                      {info.value}
                    </p>
                  </div>
                ))}
              </div>
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
            Ready for a <span className="text-gold">Better Smile</span>?
          </h2>
          <p className="font-body text-pearl/70 max-w-lg mx-auto mb-8">
            Schedule your appointment today and experience the{" "}
            {CLINIC.name} difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#appointment-form"
              className="inline-flex items-center justify-center gap-2 bg-gold text-pearl px-8 py-3.5 rounded-xl font-body text-sm font-semibold hover:bg-gold/90 transition-colors"
            >
              Book Appointment
            </Link>
            <a
              href={`tel:${CLINIC.phone}`}
              className="inline-flex items-center justify-center gap-2 border border-pearl/30 text-pearl px-8 py-3.5 rounded-xl font-body text-sm font-semibold hover:border-gold hover:text-gold transition-colors"
            >
              📞 Call {CLINIC.phone}
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
