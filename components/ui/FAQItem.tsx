/* ============================================================
   FAQ ITEM — Accordion item with rotating cross icon
   Source: Implementation Plan — Phase 3 task list
   
   Controlled component — parent manages open state.
   Animates height via framer-motion for smooth expand/collapse.
   ============================================================ */

"use client";

import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}

export default function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
  index,
}: FAQItemProps) {
  return (
    <div
      className={clsx(
        "border-b border-sand last:border-b-0 transition-colors",
        isOpen && "border-gold/20"
      )}
    >
      {/* Question — clickable trigger */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-5 md:py-6 text-left group"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
        id={`faq-question-${index}`}
      >
        <span
          className={clsx(
            "font-body text-base md:text-lg font-medium transition-colors",
            isOpen ? "text-gold" : "text-espresso group-hover:text-gold"
          )}
        >
          {question}
        </span>

        {/* Rotating cross → minus */}
        <span
          className={clsx(
            "shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300",
            isOpen
              ? "border-gold bg-gold text-pearl rotate-45"
              : "border-sand text-muted group-hover:border-gold group-hover:text-gold"
          )}
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v12M6 12h12" />
          </svg>
        </span>
      </button>

      {/* Answer — animated expand/collapse */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-answer-${index}`}
            role="region"
            aria-labelledby={`faq-question-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="font-body text-sm md:text-base text-muted leading-relaxed pb-5 md:pb-6 pr-12">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
