/* ============================================================
   MEDICAL SERVICE SCHEMA — JSON-LD per service page
   Source: Implementation Plan §7.2
   
   Renders on individual service pages (/services/[slug])
   Type: MedicalProcedure
   ============================================================ */

import { CLINIC } from "@/lib/constants";

interface MedicalServiceSchemaProps {
  name: string;
  description: string;
  url: string;
}

export default function MedicalServiceSchema({
  name,
  description,
  url,
}: MedicalServiceSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name,
    description,
    url: `${CLINIC.website}${url}`,
    procedureType: "https://schema.org/NoninvasiveProcedure",
    howPerformed: `Performed by ${CLINIC.doctor.name}, ${CLINIC.doctor.degree} at ${CLINIC.name}, ${CLINIC.address.area}, ${CLINIC.address.city}.`,
    provider: {
      "@type": "Dentist",
      name: CLINIC.name,
      telephone: `+91${CLINIC.phone}`,
      address: {
        "@type": "PostalAddress",
        streetAddress: CLINIC.address.street,
        addressLocality: CLINIC.address.city,
        addressRegion: CLINIC.address.state,
        postalCode: CLINIC.address.pin,
        addressCountry: "IN",
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
