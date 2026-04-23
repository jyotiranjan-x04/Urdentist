import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MedicalServiceSchema from "@/components/seo/MedicalServiceSchema";
import ServiceDetailContent from "./ServiceDetailContent";

/* ============================================================
   SERVICE DETAIL PAGES — Fully implemented
   Pre-builds 6 static pages at deploy time
   Unlisted slugs → 404 (dynamicParams = false)
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

interface ServiceData {
  title: string;
  shortDescription: string;
  description: string;
  image: string;
  benefits: string[];
}

const serviceData: Record<ServiceSlug, ServiceData> = {
  "dental-checkup": {
    title: "Dental Checkup",
    shortDescription:
      "Comprehensive examination including oral cancer screening and X-rays.",
    description:
      "Comprehensive dental examination including oral cancer screening, X-rays, and preventive care assessment at Ur Dentist, Lalghati, Bhopal. Regular checkups are the cornerstone of maintaining optimal oral health and preventing costly procedures down the line.",
    image: "/images/dental_checkup.png",
    benefits: [
      "Complete oral examination with digital X-rays",
      "Early detection of cavities, gum disease, and oral cancer",
      "Professional teeth cleaning and polishing",
      "Personalised oral hygiene plan for your needs",
      "Bite analysis and jaw joint evaluation",
      "Fluoride treatment for added cavity protection",
    ],
  },
  braces: {
    title: "Braces",
    shortDescription:
      "Orthodontic treatment for teeth alignment and bite correction.",
    description:
      "Orthodontic braces treatment for teeth alignment and bite correction by MDS specialist Dr. Arjun Singh Baghel at Ur Dentist, Bhopal. We offer metal, ceramic, and self-ligating braces to suit every patient's lifestyle and budget.",
    image: "/images/braces.png",
    benefits: [
      "Customised treatment plan using digital impressions",
      "Metal, ceramic, and self-ligating bracket options",
      "Correction of crowding, spacing, overbite, and underbite",
      "Regular progress monitoring with digital tracking",
      "Comfortable modern brackets that minimise irritation",
      "Post-treatment retainers included in the plan",
    ],
  },
  "dental-implants": {
    title: "Dental Implants",
    shortDescription:
      "Permanent titanium implant solutions for missing teeth.",
    description:
      "Permanent dental implant solutions for missing teeth using advanced titanium implant technology at Ur Dentist, Lalghati, Bhopal. Dental implants look, feel, and function just like your natural teeth — a lifelong investment in your smile.",
    image: "/images/dental_implants.png",
    benefits: [
      "Biocompatible titanium implants for lifelong durability",
      "Natural-looking porcelain crowns matched to your shade",
      "Preserves jawbone density and facial structure",
      "No damage to adjacent healthy teeth (unlike bridges)",
      "Single-tooth, multi-tooth, and full-arch solutions",
      "3D guided surgery for precise and predictable placement",
    ],
  },
  "missing-teeth": {
    title: "Missing Teeth",
    shortDescription:
      "Complete solutions including bridges, dentures, and implant prosthetics.",
    description:
      "Complete solutions for missing teeth including bridges, dentures, and implant-supported prosthetics at Ur Dentist, Bhopal. We help you regain full chewing function, speech clarity, and confidence with personalised replacement options.",
    image: "/images/missing_teeth.png",
    benefits: [
      "Full range of options: bridges, dentures, and implants",
      "Implant-supported overdentures for maximum stability",
      "Porcelain fixed bridges for seamless aesthetics",
      "Flexible and lightweight partial dentures",
      "Same-day temporary teeth available in many cases",
      "Free consultation to discuss the best option for you",
    ],
  },
  "root-canal-treatment": {
    title: "Root Canal Treatment",
    shortDescription:
      "Painless therapy to save damaged teeth using modern endodontic techniques.",
    description:
      "Painless root canal therapy to save damaged teeth using modern endodontic techniques at Ur Dentist, Lalghati, Bhopal. With rotary endodontics and advanced anaesthesia, root canal treatment today is as comfortable as getting a routine filling.",
    image: "/images/root_canal.png",
    benefits: [
      "Painless procedure with advanced local anaesthesia",
      "Rotary endodontic instruments for precision",
      "Digital apex locators for accurate canal measurement",
      "Single-visit root canal for most cases",
      "Tooth-coloured crown restoration included",
      "Save your natural tooth and avoid extraction",
    ],
  },
  "invisible-aligners": {
    title: "Invisible Aligners",
    shortDescription:
      "Clear aligner therapy for discreet teeth straightening.",
    description:
      "Clear aligner therapy for discreet teeth straightening — an alternative to traditional braces at Ur Dentist, Bhopal. Virtually invisible, removable, and comfortable aligners that fit seamlessly into your lifestyle while delivering beautiful results.",
    image: "/images/invisible_aligners.png",
    benefits: [
      "Virtually invisible — no metal brackets or wires",
      "Removable — eat, drink, and brush normally",
      "Custom-fabricated for precise, predictable results",
      "Fewer clinic visits compared to traditional braces",
      "Digital smile preview before you start treatment",
      "Ideal for mild to moderate alignment issues",
    ],
  },
};

export const revalidate = false;
export const dynamicParams = false;

export async function generateStaticParams() {
  return validSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = serviceData[slug as ServiceSlug];

  if (!data) return {};

  return {
    title: `${data.title} in Bhopal`,
    description: data.description,
    alternates: {
      canonical: `/services/${slug}`,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = serviceData[slug as ServiceSlug];

  if (!data) {
    notFound();
  }

  // Prepare all services list for "Related Services" section
  const allServices = validSlugs.map((s) => ({
    slug: s,
    title: serviceData[s].title,
    shortDescription: serviceData[s].shortDescription,
    image: serviceData[s].image,
  }));

  return (
    <>
      {/* JSON-LD MedicalProcedure schema */}
      <MedicalServiceSchema
        name={data.title}
        description={data.description}
        url={`/services/${slug}`}
      />

      <ServiceDetailContent
        title={data.title}
        description={data.description}
        slug={slug}
        benefits={data.benefits}
        image={data.image}
        allServices={allServices}
      />
    </>
  );
}
