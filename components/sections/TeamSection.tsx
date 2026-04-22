/* ============================================================
   S-09 — Team Section
   Source: Implementation Plan §4.2 S-09, LAYOUT_BLUEPRINT §S-15
   
   Build Order: #4
   
   Layout: Centered header + team card grid
   Center card is Dr. Baghel (featured)
   ============================================================ */

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import TeamCard from "@/components/ui/TeamCard";
import SectionHeader from "@/components/ui/SectionHeader";
import { CLINIC } from "@/lib/constants";

const team = [
  {
    name: CLINIC.doctor.name,
    degree: CLINIC.doctor.degree,
    specialty: CLINIC.doctor.specialty,
    featured: true,
  },
];

export default function TeamSection() {
  return (
    <section id="team" className="section-padding bg-pearl">
      <div className="container-content">
        <SectionHeader
          variant="centered"
          overline="Meet the Doctor"
          heading="Our Expert Team"
          accentWord="Expert"
          description="Led by a qualified MDS specialist committed to your dental health."
        />

        {/* Featured doctor */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center max-w-sm">
            {/* Large portrait placeholder */}
            <div className="relative w-56 h-56 md:w-72 md:h-72 mx-auto mb-6 rounded-full overflow-hidden border-4 border-sand bg-cream">
              <Image
                src="/images/team_doctor.png"
                alt={CLINIC.doctor.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 224px, 288px"
              />
              {/* Gold badge */}
              <div className="absolute bottom-2 right-2 w-14 h-14 rounded-full bg-gold flex items-center justify-center shadow-float">
                <span className="text-pearl font-body text-[10px] font-bold uppercase leading-tight text-center">
                  MDS
                </span>
              </div>
            </div>

            {/* Name */}
            <h3 className="font-display text-2xl md:text-3xl text-espresso mb-1">
              {CLINIC.doctor.name}
            </h3>

            {/* Degree */}
            <p className="font-body text-sm text-muted mb-3">
              {CLINIC.doctor.degree}
            </p>

            {/* Specialty badge */}
            <span className="inline-block px-4 py-1.5 rounded-full bg-gold/10 text-gold font-body text-xs font-medium">
              {CLINIC.doctor.specialty}
            </span>

            {/* Bio */}
            <p className="font-body text-sm text-muted mt-4 leading-relaxed max-w-xs mx-auto">
              With over a decade of expertise in periodontics and dental
              implantology, Dr. Baghel brings world-class dental care to
              Lalghati, Bhopal.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
