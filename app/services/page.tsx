import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dental Services",
  description:
    "Comprehensive dental services at Ur Dentist Bhopal — Dental Implants, Braces, Root Canal Treatment, Invisible Aligners, Dental Checkups & Missing Teeth solutions.",
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-pearl">
      <section className="container-content section-padding">
        <p className="overline mb-4">Our Services</p>
        <h1 className="font-display text-4xl md:text-6xl text-espresso mb-6">
          Dental Services
        </h1>
        <p className="font-body text-muted text-lg max-w-2xl">
          Service index page will be implemented in Phase 4 — S-04 Services
          section.
        </p>
      </section>
    </div>
  );
}
