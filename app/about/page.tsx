import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Dr. Arjun Singh Baghel",
  description:
    "Meet Dr. Arjun Singh Baghel — MDS Periodontics & Implantology. 15+ years of experience serving Lalghati, Bhopal with premium dental care.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-pearl">
      <section className="container-content section-padding">
        <p className="overline mb-4">About Us</p>
        <h1 className="font-display text-4xl md:text-6xl text-espresso mb-6">
          About Ur Dentist
        </h1>
        <p className="font-body text-muted text-lg max-w-2xl">
          Full about page content will be implemented in Phase 4 — S-03 Trust +
          About section.
        </p>
      </section>
    </div>
  );
}
