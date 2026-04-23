/* ============================================================
   S-06 — Process + Booking Section
   Source: Implementation Plan §4.2 S-06, LAYOUT_BLUEPRINT §S-10/S-11
   
   Build Order: #6
   C-02: 2-step form | C-03: HeroStrip pre-fill
   
   Structure:
   - 4-step horizontal process strip with connector lines
   - 2-column: booking form left + info panel right
   
   NOW WIRED: AppointmentForm with full RHF + Zod (Phase 5)
   ============================================================ */

"use client";

import { motion } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import AppointmentForm from "@/components/forms/AppointmentForm";
import { CLINIC, WA_LINK, WA_MESSAGES } from "@/lib/constants";
import { useAnimationConfig } from "@/hooks/useAnimationConfig";

const steps = [
  {
    number: "01",
    title: "Book Appointment",
    description: "Schedule your visit online or via WhatsApp",
  },
  {
    number: "02",
    title: "Consultation",
    description: "Meet Dr. Baghel for a comprehensive assessment",
  },
  {
    number: "03",
    title: "Treatment Plan",
    description: "Receive a personalized treatment roadmap",
  },
  {
    number: "04",
    title: "Ongoing Care",
    description: "Regular follow-ups for lasting results",
  },
];

interface ProcessBookingSectionProps {
  /** Pre-filled name from HeroStrip (C-03) */
  prefillName?: string;
  /** Pre-filled phone from HeroStrip (C-03) */
  prefillPhone?: string;
}

export default function ProcessBookingSection({
  prefillName,
  prefillPhone,
}: ProcessBookingSectionProps) {
  const { enableStagger } = useAnimationConfig();

  return (
    <>
      {/* ════════════ PROCESS STRIP ════════════ */}
      <section className="section-padding bg-cream">
        <div className="container-content">
          <SectionHeader
            variant="centered"
            overline="How It Works"
            heading="Your Journey to a Better Smile"
            accentWord="Journey"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                className="relative text-center"
                initial={enableStagger ? { opacity: 0, y: 30, x: i % 2 === 0 ? -20 : 20 } : false}
                whileInView={enableStagger ? { opacity: 1, y: 0, x: 0 } : undefined}
                viewport={{ once: false, margin: "-50px", amount: 0.2 }}
                transition={{ duration: 0.4, delay: i * 0.12 }}
              >
                {/* Connector line (hidden on mobile and last item) */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-[2px] bg-sand z-0">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gold" />
                  </div>
                )}

                {/* Step circle */}
                <div className="relative w-16 h-16 mx-auto mb-4 rounded-full bg-pearl border-2 border-gold/30 flex items-center justify-center z-10">
                  <span className="font-body text-lg font-bold text-gold">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
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

      {/* ════════════ BOOKING FORM ════════════ */}
      <section
        id="appointment-form"
        className="section-padding bg-pearl"
      >
        <div className="container-content">
          <SectionHeader
            variant="editorial"
            overline="Book Now"
            heading="Schedule Your Appointment"
            accentWord="Appointment"
            description="Fill out the form and we'll confirm your booking within a few hours."
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* ═══ FORM (left 2/3) ═══ */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-sand bg-cream/30 p-6 md:p-8">
                <AppointmentForm
                  prefillName={prefillName}
                  prefillPhone={prefillPhone}
                />
              </div>
            </div>

            {/* ═══ INFO PANEL (right 1/3) ═══ */}
            <div className="space-y-4">
              {/* Clinic Hours card */}
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

              {/* Emergency card */}
              <div className="rounded-2xl border border-gold/30 bg-gold/5 p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">🔔</span>
                  <h3 className="font-display text-lg text-espresso">
                    Need Urgent Care?
                  </h3>
                </div>
                <p className="font-body text-sm text-muted mb-4">
                  For dental emergencies, reach us immediately.
                </p>
                <div className="flex flex-col gap-2">
                  <a
                    href={`tel:${CLINIC.phone}`}
                    className="inline-flex items-center justify-center gap-2 bg-gold text-pearl py-2.5 rounded-xl font-body text-sm font-semibold hover:bg-gold/90 transition-colors"
                  >
                    📞 Call {CLINIC.phone}
                  </a>
                  <a
                    href={WA_LINK(WA_MESSAGES.emergency)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-trust text-pearl py-2.5 rounded-xl font-body text-sm font-semibold hover:bg-trust/90 transition-colors"
                  >
                    💬 WhatsApp Now
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
