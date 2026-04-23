/* ============================================================
   CONTACT PAGE CONTENT — Client component with animations
   ============================================================ */

"use client";

import { motion } from "framer-motion";
import AppointmentForm from "@/components/forms/AppointmentForm";
import { CLINIC, WA_LINK, WA_MESSAGES } from "@/lib/constants";

const contactCards = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: "Call Us",
    value: CLINIC.phone,
    href: `tel:${CLINIC.phone}`,
    color: "text-gold",
  },
  {
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
    label: "WhatsApp",
    value: "Message Us",
    href: WA_LINK(WA_MESSAGES.contact),
    color: "text-trust",
    external: true,
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: "Email",
    value: CLINIC.email,
    href: `mailto:${CLINIC.email}`,
    color: "text-gold",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: "Visit Us",
    value: CLINIC.address.full,
    href: `https://www.google.com/maps?q=${CLINIC.geo.lat},${CLINIC.geo.lng}`,
    color: "text-gold",
    external: true,
  },
];

export default function ContactPageContent() {
  return (
    <div className="min-h-screen bg-pearl">
      {/* ════════════ HERO BANNER ════════════ */}
      <section className="relative bg-espresso overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "radial-gradient(circle at 50% 50%, #C9A96E 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="container-content pt-32 pb-16 md:py-24 relative z-10">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-body text-xs font-medium uppercase tracking-[0.2em] text-gold mb-4">
              Get In Touch
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-pearl leading-tight mb-6">
              We&apos;d Love to{" "}
              <span className="text-gold">Hear From You</span>
            </h1>
            <p className="font-body text-pearl/70 text-lg leading-relaxed max-w-xl">
              Visit us at {CLINIC.address.area}, {CLINIC.address.city} or reach
              out online. We&apos;re here to help with all your dental care
              needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ════════════ CONTACT CARDS ════════════ */}
      <section className="bg-cream py-12">
        <div className="container-content">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactCards.map((card, i) => (
              <motion.a
                key={i}
                href={card.href}
                target={card.external ? "_blank" : undefined}
                rel={card.external ? "noopener noreferrer" : undefined}
                className="group bg-pearl rounded-2xl border border-sand p-5 hover:shadow-card hover:border-gold/30 transition-all flex items-start gap-4"
                initial={{ opacity: 0, y: 20, x: i < 2 ? -20 : 20 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div
                  className={`${card.color} shrink-0 group-hover:scale-110 transition-transform`}
                >
                  {card.icon}
                </div>
                <div>
                  <p className="font-body text-xs text-muted uppercase tracking-wider mb-1">
                    {card.label}
                  </p>
                  <p className="font-body text-sm font-semibold text-espresso group-hover:text-gold transition-colors break-all">
                    {card.value}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ FORM + MAP SECTION ════════════ */}
      <section className="section-padding bg-pearl">
        <div className="container-content">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* ═══ FORM (Left) ═══ */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
              <p className="overline mb-3">Book Online</p>
              <h2 className="font-display text-3xl text-espresso mb-6">
                Schedule Your <span className="text-gold">Appointment</span>
              </h2>
              <div className="rounded-2xl border border-sand bg-cream/30 p-6 md:p-8">
                <AppointmentForm />
              </div>
            </motion.div>

            {/* ═══ MAP + HOURS (Right) ═══ */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Google Maps embed */}
              <div className="rounded-2xl overflow-hidden shadow-card-lg border border-sand aspect-[4/3]">
                <iframe
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${CLINIC.geo.lat},${CLINIC.geo.lng}&zoom=16`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ur Dentist location on Google Maps"
                />
              </div>

              {/* Clinic Hours */}
              <div className="rounded-2xl border border-sand bg-cream/50 p-6">
                <h3 className="font-display text-xl text-espresso mb-4">
                  Clinic Hours
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between font-body text-sm">
                    <span className="text-muted">
                      {CLINIC.hours.weekdays.label}
                    </span>
                    <span className="text-espresso font-medium">
                      {CLINIC.hours.weekdays.open} – {CLINIC.hours.weekdays.close}
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

              {/* Address card */}
              <div className="rounded-2xl border border-sand bg-cream/50 p-6">
                <h3 className="font-display text-xl text-espresso mb-2">
                  Address
                </h3>
                <p className="font-body text-sm text-muted leading-relaxed mb-4">
                  {CLINIC.address.full}, {CLINIC.address.state} -{" "}
                  {CLINIC.address.pin}
                </p>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${CLINIC.geo.lat},${CLINIC.geo.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-espresso text-pearl px-5 py-2.5 rounded-xl font-body text-sm font-semibold hover:bg-espresso/90 transition-colors"
                >
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
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    />
                  </svg>
                  Get Directions
                </a>
              </div>

              {/* Social links */}
              <div className="flex gap-3">
                <a
                  href={CLINIC.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 border border-sand rounded-xl py-3 font-body text-sm text-espresso hover:border-gold hover:text-gold transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                  Instagram
                </a>
                <a
                  href={CLINIC.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 border border-sand rounded-xl py-3 font-body text-sm text-espresso hover:border-gold hover:text-gold transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════ EMERGENCY STRIP ════════════ */}
      <section className="bg-espresso py-12">
        <motion.div
          className="container-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🔔</span>
                <h2 className="font-display text-2xl text-pearl">
                  Dental Emergency?
                </h2>
              </div>
              <p className="font-body text-pearl/70 text-sm">
                Don&apos;t wait — reach us immediately for urgent dental care in{" "}
                {CLINIC.address.city}.
              </p>
            </div>
            <div className="flex gap-3">
              <a
                href={`tel:${CLINIC.phone}`}
                className="inline-flex items-center gap-2 bg-gold text-pearl px-6 py-3 rounded-xl font-body text-sm font-semibold hover:bg-gold/90 transition-colors"
              >
                📞 Call Now
              </a>
              <a
                href={WA_LINK(WA_MESSAGES.emergency)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-trust text-pearl px-6 py-3 rounded-xl font-body text-sm font-semibold hover:bg-trust/90 transition-colors"
              >
                💬 WhatsApp
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
