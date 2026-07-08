"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { brand } from "@/config/brand";
import { aboutContent, proprietor, whyChooseUs } from "@/config/content";

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

/* ─── Icon Map (first 3) ─── */
const iconMap: Record<string, React.ReactNode> = {
  target: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v3m0 12v3" />
    </svg>
  ),
  "trending-up": (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
    </svg>
  ),
  "book-open": (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
    </svg>
  ),
};

/* ─── ABOUT PAGE ─── */
export default function AboutPage() {
  const top3 = whyChooseUs.slice(0, 3);

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden pt-32 pb-20">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-indigo-500/10 rounded-full blur-[128px] animate-pulse-glow" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-[128px] animate-pulse-glow" style={{ animationDelay: "2s" }} />
        </div>

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs font-medium text-slate-300 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            AMFI Registered &bull; ARN {brand.amfiRegNo}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-[family-name:var(--font-outfit)] text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-6"
          >
            About <span className="gradient-text">Wealth Acumen</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            {aboutContent.intro}
          </motion.p>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F8FAFC] to-transparent" />
      </section>

      {/* ═══ WHY CHOOSE US ═══ */}
      <section className="section-padding">
        <div className="max-w-6xl mx-auto">
          <FadeInSection>
            <div className="text-center mb-16">
              <p className="text-sm font-medium text-indigo-600 tracking-wider uppercase mb-3">
                We bring the best things for you
              </p>
              <h2 className="font-[family-name:var(--font-outfit)] text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900">
                Why <span className="gradient-text">Choose Us</span>
              </h2>
            </div>
          </FadeInSection>
 
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {top3.map((item, i) => (
              <FadeInSection key={item.title} delay={i * 0.1}>
                <div className="glass glass-hover rounded-2xl p-7 h-full">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 flex items-center justify-center mb-5 text-indigo-600">
                    {iconMap[item.icon] || iconMap.target}
                  </div>
                  <h3 className="font-[family-name:var(--font-outfit)] text-lg font-semibold text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ OUR MISSION ═══ */}
      <section className="section-padding bg-gradient-to-b from-transparent via-indigo-500/[0.02] to-transparent">
        <div className="max-w-4xl mx-auto">
          <FadeInSection>
            <div className="text-center mb-10">
              <p className="text-sm font-medium text-indigo-600 tracking-wider uppercase mb-3">
                Our Purpose
              </p>
              <h2 className="font-[family-name:var(--font-outfit)] text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900">
                Our <span className="gradient-text">Mission</span>
              </h2>
            </div>
          </FadeInSection>
 
          <FadeInSection delay={0.15}>
            <div className="glass rounded-2xl p-8 md:p-12">
              <div className="flex items-start gap-5">
                <div className="hidden sm:flex w-14 h-14 rounded-xl bg-indigo-500/10 items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-7 h-7 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                </div>
                <p className="text-slate-700 leading-relaxed text-base sm:text-lg">
                  {aboutContent.missionFull}
                </p>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>
 
      {/* ═══ ANGEL ONE CHANNEL PARTNER ═══ */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto">
          <FadeInSection>
            <div className="text-center mb-10">
              <p className="text-sm font-medium text-cyan-600 tracking-wider uppercase mb-3">
                Partnership
              </p>
              <h2 className="font-[family-name:var(--font-outfit)] text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900">
                Angel One <span className="gradient-text">Channel Partner</span>
              </h2>
            </div>
          </FadeInSection>
 
          <FadeInSection delay={0.1}>
            <div className="glass rounded-2xl p-8 md:p-12">
              <p className="text-slate-700 leading-relaxed text-base sm:text-lg mb-8">
                {aboutContent.angelOnePartnership}
              </p>
 
              <h3 className="font-[family-name:var(--font-outfit)] text-lg font-semibold text-slate-900 mb-5">
                Through this partnership, I aim to provide my clients with:
              </h3>
 
              <ul className="space-y-4">
                {aboutContent.angelOneBenefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 flex-shrink-0" />
                    <span className="text-slate-600 leading-relaxed">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeInSection>
        </div>
      </section>
 
      {/* ═══ PROPRIETOR ═══ */}
      <section
        id="proprietor"
        className="section-padding bg-gradient-to-b from-transparent via-cyan-500/[0.02] to-transparent"
      >
        <div className="max-w-4xl mx-auto">
          <FadeInSection>
            <div className="text-center mb-10">
              <p className="text-sm font-medium text-amber-600 tracking-wider uppercase mb-3">
                Meet the Founder
              </p>
              <h2 className="font-[family-name:var(--font-outfit)] text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900">
                The Mind Behind <span className="gradient-text-amber">Wealth Acumen</span>
              </h2>
            </div>
          </FadeInSection>
 
          <FadeInSection delay={0.15}>
            <div className="glass glass-hover rounded-2xl p-8 md:p-12 text-center">
              {/* Avatar */}
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6">
                {proprietor.name
                  .split(" ")
                  .map((n) => n.charAt(0))
                  .join("")}
              </div>
 
              <h3 className="font-[family-name:var(--font-outfit)] text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
                {proprietor.name}
              </h3>
 
              <p className="text-sm text-indigo-600 font-medium mb-6">
                Proprietor, {brand.name}
              </p>
 
              <p className="text-slate-600 leading-relaxed max-w-2xl mx-auto">
                {proprietor.bio}
              </p>
            </div>
          </FadeInSection>
        </div>
      </section>
 
      {/* ═══ AMFI REGISTRATION BADGE ═══ */}
      <section className="section-padding">
        <div className="max-w-3xl mx-auto">
          <FadeInSection>
            <div className="glass rounded-2xl p-8 md:p-10 text-center">
              <div className="flex items-center justify-center gap-3 mb-5">
                <svg className="w-8 h-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                </svg>
                <h3 className="font-[family-name:var(--font-outfit)] text-xl font-semibold text-slate-900">
                  AMFI Registered Mutual Fund Distributor
                </h3>
              </div>
 
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">ARN:</span>
                  <span className="text-slate-900 font-semibold">{brand.amfiRegNo}</span>
                </div>
                <div className="hidden sm:block w-px h-4 bg-slate-300" />
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">EUIN:</span>
                  <span className="text-slate-900 font-semibold">{brand.euinNo}</span>
                </div>
                <div className="hidden sm:block w-px h-4 bg-slate-300" />
                <div className="flex items-center gap-2">
                  <span className="text-slate-500">Channel Partner:</span>
                  <span className="text-slate-900 font-semibold">Angel One Ltd.</span>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>
    </>
  );
}
