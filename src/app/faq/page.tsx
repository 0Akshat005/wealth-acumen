"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { faqs } from "@/config/content";

/* ─── Animation Helper ─── */
function FadeInSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Accordion Item ─── */
function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`glass rounded-2xl overflow-hidden transition-all duration-350 ${
        isOpen
          ? "border-indigo-500/30 shadow-[0_0_24px_-8px_rgba(99,102,241,0.15)]"
          : ""
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 p-6 sm:p-7 text-left group cursor-pointer"
        aria-expanded={isOpen}
      >
        <span className="font-[family-name:var(--font-outfit)] text-base sm:text-lg font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors">
          {question}
        </span>
        <span
          className={`w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
            isOpen ? "rotate-45 bg-indigo-500/20" : ""
          }`}
        >
          <svg
            className="w-4 h-4 text-indigo-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 sm:px-7 pb-6 sm:pb-7">
              <div className="h-px bg-slate-100 mb-5" />
              <p className="text-slate-600 leading-relaxed">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── FAQ PAGE ─── */
export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden pt-32 pb-20">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-indigo-500/10 rounded-full blur-[128px] animate-pulse-glow" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-cyan-500/8 rounded-full blur-[128px] animate-pulse-glow" style={{ animationDelay: "2s" }} />
        </div>

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-[family-name:var(--font-outfit)] text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-6 text-slate-900"
          >
            Frequently Asked <span className="gradient-text">Questions</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed"
          >
            Have questions about our services? Find answers to the most common
            queries below.
          </motion.p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F8FAFC] to-transparent" />
      </section>

      {/* ═══ FAQ ACCORDION ═══ */}
      <section className="section-padding">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <FadeInSection key={i} delay={i * 0.06}>
                <AccordionItem
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openIndex === i}
                  onToggle={() => handleToggle(i)}
                />
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
