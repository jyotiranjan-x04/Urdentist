/* ============================================================
   SERVICES INDEX PAGE — Full implementation
   Source: Implementation Plan §4.2 S-04
   
   Structure:
   - Hero banner
   - All 6 service cards with animations
   - CTA booking section
   ============================================================ */

import type { Metadata } from "next";
import ServicesPageContent from "./ServicesPageContent";

export const metadata: Metadata = {
  title: "Dental Services",
  description:
    "Comprehensive dental services at Ur Dentist Bhopal — Dental Implants, Braces, Root Canal Treatment, Invisible Aligners, Dental Checkups & Missing Teeth solutions by Dr. Arjun Singh Baghel.",
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesPage() {
  return <ServicesPageContent />;
}
