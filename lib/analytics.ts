/* ============================================================
   GA4 ANALYTICS — 6 event types
   Source: Implementation Plan §7.2, PRODUCTION_UPGRADE §13.5
   Safe to call even when GA is not loaded (dev/no consent)
   ============================================================ */

type GAEvent = {
  action: string;
  category: string;
  label?: string;
  value?: number;
};

/**
 * Send event to GA4 (gtag). No-ops if gtag is not available.
 * Safe for SSR — checks `window` existence.
 */
function sendEvent({ action, category, label, value }: GAEvent): void {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  if (!gtag) return;

  gtag("event", action, {
    event_category: category,
    event_label: label,
    value,
  });
}

/* ============================================================
   TYPED TRACKING FUNCTIONS
   Each maps to a specific user journey milestone
   ============================================================ */

export const track = {
  /** User started filling the appointment form (Step 1 focus) */
  formStart: () =>
    sendEvent({
      action: "form_start",
      category: "appointment",
      label: "booking_form",
    }),

  /** User completed Step 1 and advanced to Step 2 */
  formStep2: () =>
    sendEvent({
      action: "form_step2",
      category: "appointment",
      label: "booking_form",
    }),

  /** Form submitted successfully */
  formSubmit: () =>
    sendEvent({
      action: "form_submit",
      category: "appointment",
      label: "booking_form",
    }),

  /** User clicked WhatsApp link (any placement) */
  whatsAppClick: (placement: string) =>
    sendEvent({
      action: "whatsapp_click",
      category: "contact",
      label: placement,
    }),

  /** User clicked phone number (call CTA) */
  phoneClick: (placement: string) =>
    sendEvent({
      action: "phone_click",
      category: "contact",
      label: placement,
    }),

  /** User clicked a service card or link */
  serviceClick: (serviceName: string) =>
    sendEvent({
      action: "service_click",
      category: "engagement",
      label: serviceName,
    }),
} as const;
