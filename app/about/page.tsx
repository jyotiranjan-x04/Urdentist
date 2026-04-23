/* ============================================================
   ABOUT PAGE — Full implementation
   Source: Implementation Plan §4.2, PRD §3.4
   
   Structure:
   - Hero banner with doctor photo
   - Mission statement
   - Animated stats counters
   - Clinic features grid
   - Doctor profile card
   - Clinic gallery
   - CTA booking section
   ============================================================ */

import type { Metadata } from "next";
import AboutPageContent from "./AboutPageContent";

export const metadata: Metadata = {
  title: "About Dr. Arjun Singh Baghel",
  description:
    "Meet Dr. Arjun Singh Baghel — MDS Periodontics & Implantology. Expert dental care serving Lalghati, Bhopal with premium dental solutions including implants, braces, and root canal treatment.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return <AboutPageContent />;
}
