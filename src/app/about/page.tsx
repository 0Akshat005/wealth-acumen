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
      <section className="relative overflow-hidden pt-28 pb-16 bg-[#FCF9F4] border-b border-slate-200/50">
        {/* Background effects */}
        <div className="absolute inset-0 select-none pointer-events-none z-0">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-indigo-500/5 rounded-full blur-[128px] animate-pulse-glow" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-[128px] animate-pulse-glow" style={{ animationDelay: "2s" }} />
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

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-10 lg:px-16 xl:px-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
              <span className="text-xs font-bold text-[#D9791A] tracking-[0.2em] uppercase leading-none">
                Who We Are
              </span>
              
              <h1 className="font-[family-name:var(--font-serif)] text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-[#10141F] leading-[1.1] tracking-tight">
                About <span className="gradient-text">Wealth Acumen</span>
              </h1>

              <div className="space-y-4 text-base sm:text-lg text-[#5B5955] leading-relaxed font-normal">
                <p>
                  {aboutContent.intro}
                </p>
                <p>
                  Our focus is on delivering customized pathways, objective insights, and transparent guidance to help you navigate the markets successfully. We believe in fostering long-term partnerships built on integrity, accountability, and consistent growth.
                </p>
              </div>

              {/* Three small premium trust badges below content */}
              <div className="pt-5 flex flex-wrap gap-4 w-full border-t border-slate-200/60 mt-4">
                {/* Badge 1 */}
                <div className="flex items-center gap-2.5 bg-white/50 backdrop-blur-sm border border-orange-500/10 rounded-xl px-4 py-2.5 shadow-sm">
                  <span className="w-6 h-6 rounded-full bg-orange-50 flex items-center justify-center text-[#D9791A] shrink-0">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <circle cx="12" cy="12" r="10" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12" />
                    </svg>
                  </span>
                  <div className="text-[10px] sm:text-xs font-bold text-slate-800 leading-tight">
                    AMFI Registered <br />
                    <span className="text-[#D9791A] font-semibold">ARN {brand.amfiRegNo}</span>
                  </div>
                </div>

                {/* Badge 2 */}
                <div className="flex items-center gap-2.5 bg-white/50 backdrop-blur-sm border border-orange-500/10 rounded-xl px-4 py-2.5 shadow-sm">
                  <span className="w-6 h-6 rounded-full bg-orange-50 flex items-center justify-center text-[#D9791A] shrink-0">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                    </svg>
                  </span>
                  <div className="text-[10px] sm:text-xs font-bold text-slate-800 leading-tight">
                    SEBI Compliant <br />
                    <span className="text-slate-500">Advisory Compliant</span>
                  </div>
                </div>

                {/* Badge 3 */}
                <div className="flex items-center gap-2.5 bg-white/50 backdrop-blur-sm border border-emerald-500/10 rounded-xl px-4 py-2.5 shadow-sm">
                  <span className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="12" cy="5" r="2" />
                      <circle cx="9" cy="10" r="2" />
                      <circle cx="15" cy="10" r="2" />
                      <circle cx="6" cy="16" r="2" />
                      <circle cx="12" cy="16" r="2" />
                      <circle cx="18" cy="16" r="2" />
                    </svg>
                  </span>
                  <div className="text-[10px] sm:text-xs font-bold text-slate-800 leading-tight">
                    Channel Partner <br />
                    <span className="text-[#10141F]">Angel One Ltd</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Premium Visual Card */}
            <div className="lg:col-span-5 flex items-center justify-center relative">
              {/* Background glow behind graphic */}
              <div className="absolute w-72 h-72 rounded-full bg-orange-100/50 blur-[60px] pointer-events-none" />

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative w-full max-w-[380px] aspect-[4/3] rounded-[24px] overflow-hidden border border-[#E7E1D8] shadow-xl shadow-[#10141F]/[0.04] bg-white p-6 flex flex-col justify-between"
              >
                {/* Gold/Orange Ambient Light inside Card */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100/30 rounded-full blur-[40px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-50/40 rounded-full blur-[40px] pointer-events-none" />

                <div className="relative z-10 flex justify-between items-start">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-[#D9791A] tracking-wider uppercase">Credentials</span>
                    <span className="font-[family-name:var(--font-outfit)] text-lg font-bold text-slate-800 mt-1">Certified Distributor</span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100/50 flex items-center justify-center text-[#D9791A]">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                  </div>
                </div>

                <div className="relative z-10 my-6 flex flex-col justify-center space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-medium">AMFI Registration:</span>
                    <span className="font-semibold text-slate-800">ARN-{brand.amfiRegNo}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-medium">EUIN Number:</span>
                    <span className="font-semibold text-slate-800">{brand.euinNo}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 font-medium">Advisory Type:</span>
                    <span className="font-semibold text-slate-800">Mutual Fund Distributor</span>
                  </div>
                </div>

                <div className="relative z-10 pt-4 border-t border-slate-100 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-750 font-bold text-xs">
                    WA
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-850 leading-none">Wealth Acumen</span>
                    <span className="text-[9px] font-medium text-slate-400 mt-0.5 leading-none">Invest Right, Prosper Bright</span>
                  </div>
                </div>
              </motion.div>
            </div>
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
              <h2 className="font-[family-name:var(--font-serif)] text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900">
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
              <h2 className="font-[family-name:var(--font-serif)] text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900">
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
              <h2 className="font-[family-name:var(--font-serif)] text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900">
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
 

    </>
  );
}
