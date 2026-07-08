"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { brand } from "@/config/brand";
import { diyContent } from "@/config/content";

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

/* ─── DIY PAGE ─── */
export default function DIYPage() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden pt-32 pb-20">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/8 rounded-full blur-[128px] animate-pulse-glow" />
          <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-indigo-500/10 rounded-full blur-[128px] animate-pulse-glow" style={{ animationDelay: "2s" }} />
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
            <span className="gradient-text-amber">{diyContent.title}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed"
          >
            Start investing on your own terms with the tools and support you need.
          </motion.p>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F8FAFC] to-transparent" />
      </section>

      {/* ═══ DIY CONTENT ═══ */}
      <section className="section-padding">
        <div className="max-w-3xl mx-auto">
          <FadeInSection>
            <div className="glass rounded-2xl p-8 md:p-12">
              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center mx-auto mb-8">
                <svg className="w-8 h-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                </svg>
              </div>

              <p className="text-slate-700 leading-relaxed text-base sm:text-lg text-center mb-10">
                {diyContent.description}
              </p>

              {/* CTA */}
              <div className="text-center">
                <a
                  href={brand.angelOneAppLogin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary text-base inline-flex items-center gap-2.5 !px-8 !py-3.5"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                  Download Angel One App
                </a>
                <p className="text-xs text-slate-500 mt-4">
                  Your one-stop platform for stocks, mutual funds, ETFs, IPOs, and more.
                </p>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>
    </>
  );
}
