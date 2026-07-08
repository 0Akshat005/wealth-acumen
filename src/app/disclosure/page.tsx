"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { disclosureContent } from "@/config/content";

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

/* ─── DISCLOSURE PAGE ─── */
export default function DisclosurePage() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-cyan-500/8 rounded-full blur-[128px] animate-pulse-glow" />
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
            className="font-[family-name:var(--font-outfit)] text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-4 text-slate-900"
          >
            {disclosureContent.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg text-slate-600"
          >
            {disclosureContent.subtitle}
          </motion.p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F8FAFC] to-transparent" />
      </section>

      {/* ═══ DISCLOSURE CONTENT ═══ */}
      <section className="section-padding">
        <div className="max-w-3xl mx-auto">
          <FadeInSection>
            <div className="glass rounded-2xl p-8 md:p-12">
              <ol className="space-y-6">
                {disclosureContent.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-sm font-semibold text-indigo-600">
                        {i + 1}
                      </span>
                    </span>
                    <p className="text-slate-600 leading-relaxed pt-1">
                      {point}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </FadeInSection>
        </div>
      </section>
    </>
  );
}
