/* ============================================================
   S-10 — FAQ Section
   Source: Implementation Plan §4.2 S-10, LAYOUT_BLUEPRINT §S-17
   
   Build Order: #1 (no external assets needed)
   
   Structure:
   - 2-column: accordion left + sidebar right
   - 6 items from content/faq.json
   - Single open at a time (rotating cross)
   - Right sidebar: "Need Help?" + Emergency card
   ============================================================ */

"use client";

import { useState } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import FAQItem from "@/components/ui/FAQItem";
import { CLINIC, WA_LINK, WA_MESSAGES } from "@/lib/constants";
import faqData from "@/content/faq.json";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="section-padding bg-pearl">
      <div className="container-content">
        <SectionHeader
          variant="editorial"
          overline="FAQ"
          heading="Common Questions"
          accentWord="Questions"
          description="Everything you need to know about our dental services in Lalghati, Bhopal."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
          {/* Accordion — left 2/3 */}
          <div className="lg:col-span-2">
            {faqData.map((item, i) => (
              <FAQItem
                key={i}
                question={item.question}
                answer={item.answer}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
                index={i}
              />
            ))}
          </div>

          {/* Sidebar — right 1/3 */}
          <div className="space-y-4">
            {/* Need Help card */}
            <div className="rounded-2xl border border-sand bg-cream/50 p-6">
              <h3 className="font-display text-xl text-espresso mb-2">
                Need Help?
              </h3>
              <p className="font-body text-sm text-muted mb-4 leading-relaxed">
                Can&apos;t find what you&apos;re looking for? Our team is happy
                to assist you.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 bg-gold text-pearl px-5 py-2.5 rounded-xl font-body text-sm font-semibold hover:bg-gold/90 transition-colors"
              >
                Contact Us
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>

            {/* Emergency card */}
            <div className="rounded-2xl border border-red-200 bg-red-50/50 p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">⚠️</span>
                <h3 className="font-display text-lg text-espresso">
                  Dental Emergency?
                </h3>
              </div>
              <p className="font-body text-sm text-muted mb-4">
                Don&apos;t wait — contact us immediately for urgent dental care
                in Bhopal.
              </p>
              <div className="flex flex-col gap-2">
                <a
                  href={`tel:${CLINIC.phone}`}
                  className="inline-flex items-center gap-2 bg-espresso text-pearl px-5 py-2.5 rounded-xl font-body text-sm font-semibold hover:bg-espresso/90 transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  Call {CLINIC.phone}
                </a>
                <a
                  href={WA_LINK(WA_MESSAGES.emergency)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-trust text-pearl px-5 py-2.5 rounded-xl font-body text-sm font-semibold hover:bg-trust/90 transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
