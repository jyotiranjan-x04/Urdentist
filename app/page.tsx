/* ============================================================
   HOME PAGE — Server Component shell
   Source: Implementation Plan §4.1 — all sections in spec order
   
   Section order follows LAYOUT_BLUEPRINT §1:
   Hero → TrustAbout → Services → Transformations →
   ProcessBooking → VideoStats → SocialProof →
   Team → FAQ
   
   Footer is in layout.tsx (Server Component)
   
   Phase 5: Moved section assembly to HomeContent (client)
   to manage HeroStrip → AppointmentForm state (C-03)
   ============================================================ */

import type { Metadata } from "next";
import HomeContent from "@/components/HomeContent";

export const metadata: Metadata = {
  // Title and description are inherited from layout.tsx defaults,
  // but we explicitly define the canonical URL here.
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <main>
      <HomeContent />
    </main>
  );
}
