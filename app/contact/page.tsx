import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Ur Dentist at Gufa Mandir Road, Lalghati, Bhopal. Call 8233144250 or book an appointment online. MDS specialist Dr. Arjun Singh Baghel.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-pearl">
      <section className="container-content section-padding">
        <p className="overline mb-4">Get In Touch</p>
        <h1 className="font-display text-4xl md:text-6xl text-espresso mb-6">
          Contact Us
        </h1>
        <p className="font-body text-muted text-lg max-w-2xl">
          Contact page with map, form, and clinic details will be implemented in
          Phase 4.
        </p>
      </section>
    </div>
  );
}
