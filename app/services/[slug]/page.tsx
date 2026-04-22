import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MedicalServiceSchema from "@/components/seo/MedicalServiceSchema";

/* ============================================================
   SERVICE DETAIL PAGES — ISG (Implementation Plan §2.4)
   Pre-builds 6 static pages at deploy time
   Unlisted slugs → 404 (dynamicParams = false)
   Phase 7: Added MedicalServiceSchema JSON-LD (§7.2)
   ============================================================ */

const validSlugs = [
  "dental-checkup",
  "braces",
  "dental-implants",
  "missing-teeth",
  "root-canal-treatment",
  "invisible-aligners",
] as const;

type ServiceSlug = (typeof validSlugs)[number];

const serviceTitles: Record<ServiceSlug, string> = {
  "dental-checkup": "Dental Checkup",
  "braces": "Braces",
  "dental-implants": "Dental Implants",
  "missing-teeth": "Missing Teeth",
  "root-canal-treatment": "Root Canal Treatment",
  "invisible-aligners": "Invisible Aligners",
};

const serviceDescriptions: Record<ServiceSlug, string> = {
  "dental-checkup":
    "Comprehensive dental examination including oral cancer screening, X-rays, and preventive care assessment at Ur Dentist, Lalghati, Bhopal.",
  "braces":
    "Orthodontic braces treatment for teeth alignment and bite correction by MDS specialist Dr. Arjun Singh Baghel at Ur Dentist, Bhopal.",
  "dental-implants":
    "Permanent dental implant solutions for missing teeth using advanced titanium implant technology at Ur Dentist, Lalghati, Bhopal.",
  "missing-teeth":
    "Complete solutions for missing teeth including bridges, dentures, and implant-supported prosthetics at Ur Dentist, Bhopal.",
  "root-canal-treatment":
    "Painless root canal therapy to save damaged teeth using modern endodontic techniques at Ur Dentist, Lalghati, Bhopal.",
  "invisible-aligners":
    "Clear aligner therapy for discreet teeth straightening — an alternative to traditional braces at Ur Dentist, Bhopal.",
};

export const revalidate = false;
export const dynamicParams = false;

export async function generateStaticParams() {
  return validSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const slug = params.slug as ServiceSlug;
  const title = serviceTitles[slug];

  if (!title) return {};

  return {
    title: `${title} in Bhopal`,
    description: serviceDescriptions[slug] || `${title} service at Ur Dentist, Lalghati, Bhopal. Expert treatment by Dr. Arjun Singh Baghel, MDS Periodontics & Implantology.`,
    alternates: {
      canonical: `/services/${slug}`,
    },
  };
}

export default function ServiceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug as ServiceSlug;
  const title = serviceTitles[slug];

  if (!title) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-pearl">
      {/* JSON-LD MedicalProcedure schema (§7.2) */}
      <MedicalServiceSchema
        name={title}
        description={serviceDescriptions[slug]}
        url={`/services/${slug}`}
      />

      <section className="container-content section-padding">
        <p className="overline mb-4">Our Services</p>
        <h1 className="font-display text-4xl md:text-6xl text-espresso mb-6">
          {title}
        </h1>
        <p className="font-body text-muted text-lg max-w-2xl">
          Detailed service page content will be implemented in Phase 4. Service
          data will come from content/services.json.
        </p>
      </section>
    </div>
  );
}
