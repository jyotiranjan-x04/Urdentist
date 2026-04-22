import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Patient Testimonials",
  description:
    "Read what patients say about their experience at Ur Dentist, Lalghati, Bhopal. Trusted dental care by Dr. Arjun Singh Baghel.",
  alternates: {
    canonical: "/testimonials",
  },
};

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-pearl">
      <section className="container-content section-padding">
        <p className="overline mb-4">What Our Patients Say</p>
        <h1 className="font-display text-4xl md:text-6xl text-espresso mb-6">
          Patient Testimonials
        </h1>
        <p className="font-body text-muted text-lg max-w-2xl">
          Testimonials page with placeholder state (C-04) will be implemented in
          Phase 4.
        </p>
      </section>
    </div>
  );
}
