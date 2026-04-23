/* ============================================================
   CONTACT PAGE — Full implementation
   Source: Implementation Plan §4.2
   
   Structure:
   - Hero banner
   - Contact info cards
   - Appointment form
   - Google Maps embed
   - Clinic hours
   ============================================================ */

import type { Metadata } from "next";
import ContactPageContent from "./ContactPageContent";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Ur Dentist at Gufa Mandir Road, Lalghati, Bhopal. Call 8233144250 or book an appointment online. MDS specialist Dr. Arjun Singh Baghel.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return <ContactPageContent />;
}
