import type { Metadata, Viewport } from "next";
import { Playfair_Display, Outfit, Lora } from "next/font/google";
import "./globals.css";
import RootProviders from "@/components/providers/RootProviders";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileBottomBar from "@/components/layout/MobileBottomBar";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import GoogleAnalytics from "@/components/seo/GoogleAnalytics";
import ErrorBoundary from "@/components/ui/ErrorBoundary";

/* ============================================================
   FONT SYSTEM (C-01 — Google Fonts Only)
   Playfair Display for headings and accents
   Outfit for clean body copy
   Lora for quotes
   ============================================================ */

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-quote",
  display: "swap",
});

/* ============================================================
   ROOT METADATA — SEO (Implementation Plan §7.1)
   Per-page metadata via generateMetadata() overrides these
   ============================================================ */

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://urdentist.in"
  ),
  title: {
    template: "%s · Ur Dentist Bhopal",
    default:
      "Ur Dentist — Best Dentist in Lalghati, Bhopal | MDS Specialist",
  },
  description:
    "Ur Dentist Clinic in Lalghati, Bhopal — led by Dr. Arjun Singh Baghel, MDS Periodontics & Implantology. Dental Implants, Braces, Root Canal, Invisible Aligners.",
  keywords: [
    "dentist Bhopal",
    "dentist Lalghati",
    "dental clinic Bhopal",
    "dental implants Bhopal",
    "braces Bhopal",
    "root canal Bhopal",
    "Dr Arjun Singh Baghel",
    "Ur Dentist",
    "periodontist Bhopal",
  ],
  authors: [{ name: "Dr. Arjun Singh Baghel" }],
  creator: "Ur Dentist",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Ur Dentist",
    title: "Ur Dentist — Best Dentist in Lalghati, Bhopal",
    description:
      "Premium dental care by Dr. Arjun Singh Baghel, MDS. Dental Implants, Braces, Root Canal & more at Lalghati, Bhopal.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "geo.region": "IN-MP",
    "geo.placename": "Bhopal",
    "geo.position": "23.2599;77.4126",
    ICBM: "23.2599, 77.4126",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#C9A96E",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

/* ============================================================
   ROOT LAYOUT — Server Component
   Implementation Plan §2.1 — All 10 responsibilities
   ============================================================ */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${playfair.variable} ${lora.variable} overflow-x-hidden`}>
      <body className="font-body bg-pearl text-espresso antialiased">
        {/* GA4 — afterInteractive, does NOT block LCP */}
        <GoogleAnalytics />

        {/* Header — sticky nav, Server Component shell with client interactivity */}
        <Header />

        {/* Global ErrorBoundary (Added from Gap Analysis) */}
        <ErrorBoundary>
          {/* RootProviders — client wrapper: Lenis + GSAP + AnimatePresence */}
          <RootProviders>
            <main className="min-h-screen overflow-x-hidden">{children}</main>
          </RootProviders>
        </ErrorBoundary>

        {/* Footer — pure Server Component */}
        <Footer />

        {/* MobileBottomBar — always visible mobile, md:hidden (C-08) */}
        <MobileBottomBar />

        {/* FloatingWhatsApp — desktop, hides at #appointment-form (C-09) */}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
