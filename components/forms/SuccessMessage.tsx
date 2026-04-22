/* ============================================================
   SUCCESS MESSAGE — Post-form-submit confirmation
   Source: Implementation Plan §5.2 (success state)
   
   Replaces the form on successful submission.
   Shows confirmation + WhatsApp secondary CTA.
   ============================================================ */

"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { WA_LINK, WA_MESSAGES, CLINIC } from "@/lib/constants";

interface SuccessMessageProps {
  patientName: string;
  onReset?: () => void;
}

export default function SuccessMessage({
  patientName,
  onReset,
}: SuccessMessageProps) {
  return (
    <motion.div
      className="text-center py-12 px-6"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Success icon */}
      <motion.div
        className="w-20 h-20 mx-auto mb-6 rounded-full bg-trust/10 flex items-center justify-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      >
        <svg
          className="w-10 h-10 text-trust"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </motion.div>

      {/* Heading */}
      <h3 className="font-display text-2xl md:text-3xl text-espresso mb-3">
        Thank You, {patientName}!
      </h3>

      {/* Message */}
      <p className="font-body text-base text-muted max-w-md mx-auto mb-2 leading-relaxed">
        Your appointment request has been received. Our team will confirm your
        booking within <strong className="text-espresso">2 hours</strong>.
      </p>
      <p className="font-body text-sm text-muted mb-8">
        We&apos;ll contact you at your provided phone number.
      </p>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <a
          href={WA_LINK(WA_MESSAGES.general)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-trust text-pearl px-6 py-3 rounded-xl font-body text-sm font-semibold hover:bg-trust/90 transition-colors"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Chat on WhatsApp
        </a>

        <a
          href={`tel:${CLINIC.phone}`}
          className="inline-flex items-center gap-2 border border-gold text-gold px-6 py-3 rounded-xl font-body text-sm font-semibold hover:bg-gold/5 transition-colors"
        >
          📞 Call {CLINIC.phone}
        </a>
      </div>

      {/* Book another */}
      {onReset && (
        <button
          onClick={onReset}
          className="mt-6 font-body text-sm text-muted hover:text-gold transition-colors underline underline-offset-4 cursor-pointer"
        >
          Book another appointment
        </button>
      )}
    </motion.div>
  );
}
