/* ============================================================
   LOCAL BUSINESS SCHEMA — JSON-LD structured data
   Source: Implementation Plan §7.2
   
   Renders on every page via layout.tsx
   Type: Dentist + LocalBusiness (dual-type per Google guidelines)
   ============================================================ */

import { CLINIC } from "@/lib/constants";

export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["Dentist", "LocalBusiness"],
    name: CLINIC.name,
    description: `Premium dental clinic in ${CLINIC.address.area}, ${CLINIC.address.city} — led by ${CLINIC.doctor.name}, ${CLINIC.doctor.degree}. Specializing in Dental Implants, Braces, Root Canal Treatment, and Invisible Aligners.`,
    url: CLINIC.website,
    telephone: `+91${CLINIC.phone}`,
    email: CLINIC.email,
    image: `${CLINIC.website}/images/clinic_exterior.png`,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: CLINIC.address.street,
      addressLocality: CLINIC.address.city,
      addressRegion: CLINIC.address.state,
      postalCode: CLINIC.address.pin,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: CLINIC.geo.lat,
      longitude: CLINIC.geo.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "10:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "10:00",
        closes: "14:00",
      },
    ],
    founder: {
      "@type": "Person",
      name: CLINIC.doctor.name,
      jobTitle: CLINIC.doctor.specialty,
      description: `${CLINIC.doctor.degree} — Specialist in Periodontics & Implantology`,
    },
    sameAs: [
      CLINIC.social.instagram,
      CLINIC.social.facebook,
    ],
    areaServed: {
      "@type": "City",
      name: CLINIC.address.city,
    },
    hasMap: `https://www.google.com/maps?q=${CLINIC.geo.lat},${CLINIC.geo.lng}`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
