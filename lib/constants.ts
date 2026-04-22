/* ============================================================
   CLINIC CONSTANTS — Single source of truth
   Source: PRD §2 + §6 — All real clinic data, ZERO fabrication
   ============================================================ */

export const CLINIC = {
  name: "Ur Dentist",
  tagline: "Your Best Dental Experience",
  doctor: {
    name: "Dr. Arjun Singh Baghel",
    degree: "MDS Periodontics & Implantology",
    shortDegree: "MDS",
    specialty: "Periodontics & Implantology",
  },
  phone: "8233144250",
  email: "drarjunperio@gmail.com",
  address: {
    street: "Gufa Mandir Road, In Front of PNB Bank",
    area: "Lalghati",
    city: "Bhopal",
    state: "Madhya Pradesh",
    pin: "462036",
    full: "Gufa Mandir Road, In Front of PNB Bank, Lalghati, Bhopal",
    short: "Lalghati, Bhopal",
  },
  geo: {
    lat: 23.2599,
    lng: 77.4126,
  },
  hours: {
    weekdays: { open: "10:00 AM", close: "8:00 PM", label: "Mon – Sat" },
    sunday: { open: "10:00 AM", close: "2:00 PM", label: "Sunday" },
  },
  social: {
    // PLACEHOLDER — clinic to provide actual handles
    instagram: "https://www.instagram.com/urdentist",
    facebook: "https://www.facebook.com/urdentist",
  },
  website: "https://urdentist.in",
} as const;

/* ============================================================
   WHATSAPP SYSTEM (Implementation Plan §2.3)
   6 pre-written message variants for different CTAs
   ============================================================ */

/**
 * Build WhatsApp deep link with pre-filled message
 * Uses wa.me API for universal compatibility
 */
export function WA_LINK(message?: string): string {
  const base = `https://wa.me/91${CLINIC.phone}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export const WA_MESSAGES = {
  /** Generic CTA — floating button, mobile bar */
  general: `Hi, I'd like to inquire about dental services at ${CLINIC.name}.`,

  /** After form submission error — fallback CTA */
  formFallback: `Hi, I tried booking online but had an issue. I'd like to schedule an appointment at ${CLINIC.name}.`,

  /** Hero section CTA */
  hero: `Hi Dr. Baghel, I visited your website and would like to book an appointment at ${CLINIC.name}, Lalghati.`,

  /** Service page CTA — includes service name placeholder */
  service: (serviceName: string) =>
    `Hi, I'm interested in ${serviceName} at ${CLINIC.name}, Lalghati. Could I book a consultation?`,

  /** Contact page CTA */
  contact: `Hi, I'd like to visit ${CLINIC.name} at Lalghati, Bhopal. What are the available slots?`,

  /** Emergency CTA */
  emergency: `Hi, I have a dental emergency. Is Dr. Baghel available at ${CLINIC.name} today?`,
} as const;

/* ============================================================
   NAVIGATION LINKS (Implementation Plan §2.3)
   ============================================================ */

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Dental Checkup", href: "/services/dental-checkup" },
      { label: "Braces", href: "/services/braces" },
      { label: "Dental Implants", href: "/services/dental-implants" },
      { label: "Missing Teeth", href: "/services/missing-teeth" },
      { label: "Root Canal Treatment", href: "/services/root-canal-treatment" },
      { label: "Invisible Aligners", href: "/services/invisible-aligners" },
    ],
  },
  { label: "Contact", href: "/contact" },
] as const;

/* ============================================================
   STATS — PLACEHOLDER values (PRD §6.3)
   Marked clearly — clinic to provide real numbers post-launch
   ============================================================ */

export const STATS = [
  { value: 10, suffix: "+", label: "Years of Experience", isPlaceholder: true },
  { value: 2000, suffix: "+", label: "Patients Treated", isPlaceholder: true },
  { value: 6, suffix: "", label: "Specialized Services", isPlaceholder: false },
  { value: 0, suffix: "", label: "MDS Periodontics & Implantology", displayValue: "MDS", isPlaceholder: false },
] as const;
