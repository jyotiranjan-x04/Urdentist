/* ============================================================
   SERVICE DETAIL CONTENT — Client component with animations
   ============================================================ */

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import { CLINIC, WA_LINK, WA_MESSAGES } from "@/lib/constants";

interface ServiceDetailContentProps {
  title: string;
  description: string;
  slug: string;
  benefits: string[];
  image?: string;
  allServices: Array<{
    slug: string;
    title: string;
    shortDescription: string;
    image?: string;
  }>;
}

export default function ServiceDetailContent({
  title,
  description,
  slug,
  benefits,
  image,
  allServices,
}: ServiceDetailContentProps) {
  // Get related services (exclude current one)
  const relatedServices = allServices
    .filter((s) => s.slug !== slug)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-pearl">
      {/* ════════════ HERO BANNER ════════════ */}
      <section className="relative bg-espresso overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 70%, #C9A96E 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="container-content pt-32 pb-16 md:py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 mb-6">
                <Link
                  href="/"
                  className="font-body text-xs text-pearl/50 hover:text-gold transition-colors"
                >
                  Home
                </Link>
                <span className="text-pearl/30">/</span>
                <Link
                  href="/services"
                  className="font-body text-xs text-pearl/50 hover:text-gold transition-colors"
                >
                  Services
                </Link>
                <span className="text-pearl/30">/</span>
                <span className="font-body text-xs text-gold">{title}</span>
              </nav>

              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-pearl leading-tight mb-6">
                {title} in{" "}
                <span className="text-gold">{CLINIC.address.city}</span>
              </h1>
              <p className="font-body text-pearl/70 text-lg leading-relaxed max-w-lg mb-8">
                {description}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/#appointment-form"
                  className="inline-flex items-center justify-center gap-2 bg-gold text-pearl px-8 py-3.5 rounded-xl font-body text-sm font-semibold hover:bg-gold/90 transition-colors"
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
                <a
                  href={WA_LINK(WA_MESSAGES.service(title))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-pearl/30 text-pearl px-8 py-3.5 rounded-xl font-body text-sm font-semibold hover:border-trust hover:text-trust transition-colors"
                >
                  💬 Ask on WhatsApp
                </a>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              className="relative flex justify-center lg:justify-end"
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="relative w-full max-w-md aspect-[4/3] rounded-2xl overflow-hidden shadow-card-lg border-2 border-gold/10">
                {image ? (
                  <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 448px"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-sand/50 to-cream flex items-center justify-center">
                    <span className="text-6xl opacity-30">🦷</span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════ BENEFITS SECTION ════════════ */}
      <section className="section-padding bg-cream">
        <div className="container-content">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left — Description */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              <p className="overline mb-3">About This Service</p>
              <h2 className="font-display text-3xl text-espresso mb-6">
                Why Choose {title} at{" "}
                <span className="text-gold">{CLINIC.name}</span>?
              </h2>
              <p className="font-body text-muted leading-relaxed mb-8">
                {description} Our specialist, {CLINIC.doctor.name} (
                {CLINIC.doctor.degree}), uses the latest techniques and
                equipment to ensure the best outcomes for every patient.
              </p>

              {/* Benefits list */}
              <div className="space-y-4">
                {benefits.map((benefit, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-3 bg-pearl/60 rounded-xl border border-sand p-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.5 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                  >
                    <span className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                      <svg
                        className="w-3.5 h-3.5 text-gold"
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
                    <span className="font-body text-sm text-espresso font-medium">
                      {benefit}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right — Info cards */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Doctor card */}
              <div className="rounded-2xl border border-sand bg-pearl p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-gold/20">
                    <Image
                      src="/images/team_doctor.png"
                      alt={CLINIC.doctor.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-espresso">
                      {CLINIC.doctor.name}
                    </h3>
                    <p className="font-body text-xs text-gold font-semibold">
                      {CLINIC.doctor.degree}
                    </p>
                  </div>
                </div>
                <p className="font-body text-sm text-muted leading-relaxed">
                  Your {title.toLowerCase()} treatment will be performed by our
                  specialist with expertise in {CLINIC.doctor.specialty}.
                </p>
              </div>

              {/* Clinic info card */}
              <div className="rounded-2xl border border-sand bg-pearl p-6">
                <h3 className="font-display text-lg text-espresso mb-4">
                  📍 Treatment Location
                </h3>
                <p className="font-body text-sm text-muted mb-2">
                  {CLINIC.address.full}
                </p>
                <p className="font-body text-sm text-muted mb-4">
                  {CLINIC.address.state} - {CLINIC.address.pin}
                </p>
                <div className="space-y-2 border-t border-sand pt-4">
                  <div className="flex justify-between font-body text-sm">
                    <span className="text-muted">
                      {CLINIC.hours.weekdays.label}
                    </span>
                    <span className="text-espresso font-medium">
                      {CLINIC.hours.weekdays.open} –{" "}
                      {CLINIC.hours.weekdays.close}
                    </span>
                  </div>
                  <div className="flex justify-between font-body text-sm">
                    <span className="text-muted">
                      {CLINIC.hours.sunday.label}
                    </span>
                    <span className="text-espresso font-medium">
                      {CLINIC.hours.sunday.open} – {CLINIC.hours.sunday.close}
                    </span>
                  </div>
                </div>
              </div>

              {/* Emergency card */}
              <div className="rounded-2xl border border-gold/30 bg-gold/5 p-6">
                <h3 className="font-display text-lg text-espresso mb-2">
                  🔔 Need Urgent Care?
                </h3>
                <p className="font-body text-sm text-muted mb-4">
                  For dental emergencies, reach us immediately.
                </p>
                <a
                  href={`tel:${CLINIC.phone}`}
                  className="inline-flex items-center gap-2 bg-gold text-pearl px-5 py-2.5 rounded-xl font-body text-sm font-semibold hover:bg-gold/90 transition-colors w-full justify-center"
                >
                  📞 Call {CLINIC.phone}
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════ RELATED SERVICES ════════════ */}
      {relatedServices.length > 0 && (
        <section className="section-padding bg-pearl">
          <div className="container-content">
            <SectionHeader
              variant="split"
              overline="Explore More"
              heading="Other Services"
              accentWord="Services"
              ctaLabel="View All Services"
              ctaHref="/services"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedServices.map((service, i) => (
                <motion.div
                  key={service.slug}
                  initial={{
                    opacity: 0,
                    x: i === 0 ? -30 : i === 2 ? 30 : 0,
                    y: 15,
                  }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Link
                    href={`/services/${service.slug}`}
                    className="group block rounded-2xl border border-sand bg-cream/50 overflow-hidden hover:shadow-card transition-shadow"
                  >
                    <div className="relative aspect-[16/9] bg-cream overflow-hidden">
                      {service.image ? (
                        <Image
                          src={service.image}
                          alt={service.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-sand/50 to-cream">
                          <span className="text-4xl opacity-30">🦷</span>
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="font-display text-lg text-espresso group-hover:text-gold transition-colors mb-1">
                        {service.title}
                      </h3>
                      <p className="font-body text-sm text-muted line-clamp-2">
                        {service.shortDescription}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

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
            Ready for Your{" "}
            <span className="text-gold">{title}</span>?
          </h2>
          <p className="font-body text-pearl/70 max-w-lg mx-auto mb-8">
            Schedule your appointment with {CLINIC.doctor.name} today and take
            the first step toward a healthier smile.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#appointment-form"
              className="inline-flex items-center justify-center gap-2 bg-gold text-pearl px-8 py-3.5 rounded-xl font-body text-sm font-semibold hover:bg-gold/90 transition-colors"
            >
              Book Appointment
            </Link>
            <a
              href={WA_LINK(WA_MESSAGES.service(title))}
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
