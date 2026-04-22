/* ============================================================
   HOME PAGE CONTENT — Client wrapper for HeroStrip pre-fill state
   Source: Implementation Plan §5.2 (C-03)
   
   Manages the data flow from HeroStrip (in HeroSection)
   to AppointmentForm (in ProcessBookingSection).
   
   Uses useState to pass pre-fill values down through props.
   ============================================================ */

"use client";

import { useState, useCallback } from "react";
import HeroSection from "@/components/sections/HeroSection";
import TrustAboutSection from "@/components/sections/TrustAboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import TransformationsSection from "@/components/sections/TransformationsSection";
import ProcessBookingSection from "@/components/sections/ProcessBookingSection";
import dynamic from "next/dynamic";

const VideoStatsSection = dynamic(() => import("@/components/sections/VideoStatsSection"), { ssr: true });
const SocialProofSection = dynamic(() => import("@/components/sections/SocialProofSection"), { ssr: true });
const TeamSection = dynamic(() => import("@/components/sections/TeamSection"), { ssr: true });
const FAQSection = dynamic(() => import("@/components/sections/FAQSection"), { ssr: true });

export default function HomeContent() {
  const [prefillName, setPrefillName] = useState("");
  const [prefillPhone, setPrefillPhone] = useState("");

  /** Called by HeroStrip when user clicks "Book Now" with pre-filled fields */
  const handleHeroStripSubmit = useCallback(
    (name: string, phone: string) => {
      setPrefillName(name);
      setPrefillPhone(phone);

      // Scroll to booking form
      setTimeout(() => {
        const form = document.getElementById("appointment-form");
        if (form) {
          form.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    },
    []
  );

  return (
    <>
      <HeroSection onHeroStripSubmit={handleHeroStripSubmit} />
      <TrustAboutSection />
      <ServicesSection />
      <TransformationsSection />
      <ProcessBookingSection
        prefillName={prefillName}
        prefillPhone={prefillPhone}
      />
      <VideoStatsSection />
      <SocialProofSection />
      <TeamSection />
      <FAQSection />

      {/* Spacer for mobile bottom bar */}
      <div className="h-16 md:hidden" />
    </>
  );
}
