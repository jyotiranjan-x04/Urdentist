/* ============================================================
   HEADER — Sticky navigation
   Source: Implementation Plan §2.3, C-15 (merged TopBar)
   
   Scroll states:
   - scrolled (scrollY > 80) → solid bg + shadow
   - menuOpen → mobile full-screen overlay
   - servicesOpen → desktop dropdown
   
   Content per C-15:
   - Logo (Cassandra wordmark)
   - Nav links: Home · About · Services ▼ · Contact
   - Desktop right: Phone + "Book Now" CTA
   - Mobile: hamburger → overlay with nav + phone + WA
   ============================================================ */

"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import { CLINIC, NAV_LINKS, WA_LINK, WA_MESSAGES } from "@/lib/constants";
import { track } from "@/lib/analytics";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

  // Scroll detection
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 80);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  // Close services dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handlePhoneClick = useCallback(() => {
    track.phoneClick("header");
  }, []);

  const scrollToBooking = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("appointment-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  }, []);

  return (
    <>
      <header
        className={clsx(
          "fixed top-0 left-0 right-0 z-[100] transition-all duration-300",
          scrolled
            ? "bg-pearl/95 backdrop-blur-md shadow-float"
            : "bg-transparent"
        )}
      >
        <div className="container-content">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center group gap-2">
              <div className="relative w-40 h-10 md:w-48 md:h-12 overflow-hidden">
                <Image
                  src="/images/logo.webp"
                  alt={CLINIC.name}
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
              {NAV_LINKS.map((link) =>
                'children' in link ? (
                  <div key={link.label} className="relative" ref={servicesRef}>
                    <button
                      onClick={() => setServicesOpen(!servicesOpen)}
                      className={clsx(
                        "font-body text-sm font-medium transition-colors flex items-center gap-1",
                        pathname.startsWith("/services")
                          ? "text-gold"
                          : "text-espresso hover:text-gold"
                      )}
                      aria-expanded={servicesOpen}
                      aria-haspopup="true"
                    >
                      {link.label}
                      <svg
                        className={clsx(
                          "w-3.5 h-3.5 transition-transform",
                          servicesOpen && "rotate-180"
                        )}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Services Dropdown */}
                    <AnimatePresence>
                      {servicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 mt-2 w-64 bg-pearl rounded-xl border border-sand shadow-card-lg overflow-hidden"
                        >
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={clsx(
                                "block px-4 py-3 text-sm font-body transition-colors",
                                pathname === child.href
                                  ? "text-gold bg-cream"
                                  : "text-espresso hover:bg-cream hover:text-gold"
                              )}
                              onClick={() => setServicesOpen(false)}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={clsx(
                      "font-body text-sm font-medium transition-colors",
                      pathname === link.href
                        ? "text-gold"
                        : "text-espresso hover:text-gold"
                    )}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            {/* Desktop Right — Phone + CTA */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href={`tel:${CLINIC.phone}`}
                onClick={handlePhoneClick}
                className="font-body text-sm text-espresso hover:text-gold transition-colors flex items-center gap-1.5"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {CLINIC.phone}
              </a>
              <button
                onClick={scrollToBooking}
                className="bg-gold text-pearl px-6 py-2.5 rounded-xl font-body text-sm font-semibold hover:bg-gold/90 transition-colors shadow-float"
              >
                Book Now
              </button>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col items-center justify-center w-10 h-10 gap-1.5"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <span
                className={clsx(
                  "block w-6 h-0.5 bg-espresso transition-all duration-300 origin-center",
                  menuOpen && "rotate-45 translate-y-2"
                )}
              />
              <span
                className={clsx(
                  "block w-6 h-0.5 bg-espresso transition-all duration-300",
                  menuOpen && "opacity-0"
                )}
              />
              <span
                className={clsx(
                  "block w-6 h-0.5 bg-espresso transition-all duration-300 origin-center",
                  menuOpen && "-rotate-45 -translate-y-2"
                )}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[99] bg-pearl flex flex-col pt-20"
          >
            <nav className="flex flex-col items-center gap-6 mt-8" aria-label="Mobile navigation">
              {NAV_LINKS.map((link) =>
                'children' in link ? (
                  <div key={link.label} className="flex flex-col items-center gap-3">
                    <Link
                      href={link.href}
                      className="font-display text-2xl text-espresso"
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                    <div className="flex flex-col items-center gap-2">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="font-body text-sm text-muted hover:text-gold transition-colors"
                          onClick={() => setMenuOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="font-display text-2xl text-espresso hover:text-gold transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            {/* Mobile menu footer — contact CTAs */}
            <div className="mt-auto pb-24 flex flex-col items-center gap-4">
              <a
                href={`tel:${CLINIC.phone}`}
                onClick={handlePhoneClick}
                className="font-body text-base text-espresso flex items-center gap-2"
              >
                <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {CLINIC.phone}
              </a>
              <a
                href={WA_LINK(WA_MESSAGES.general)}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-base text-trust flex items-center gap-2"
                onClick={() => track.whatsAppClick("mobile_menu")}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Us
              </a>
              <button
                onClick={scrollToBooking}
                className="bg-gold text-pearl px-8 py-3 rounded-xl font-body text-sm font-semibold shadow-float mt-2"
              >
                Book an Appointment
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
