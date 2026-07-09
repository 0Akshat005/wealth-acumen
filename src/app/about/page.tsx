"use client";

import { useRef } from "react";
import Image from "next/image";
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
      <section className="relative overflow-hidden pt-28 pb-16 bg-[#FFFDF9]">
        {/* Background effects */}
        <div className="absolute inset-0 select-none pointer-events-none z-0">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-orange-50/40 rounded-full blur-[120px] animate-pulse-glow" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#FFFDF9] rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: "2s" }} />
        </div>

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.01]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(217, 121, 26, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(217, 121, 26, 0.03) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Content Column (55% width) */}
            <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
              <span className="text-xs font-bold text-[#D9791A] tracking-[0.2em] uppercase leading-none">
                Who We Are
              </span>
              
              <h1 className="font-[family-name:var(--font-serif)] text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-[#10141F] leading-[1.1] tracking-tight">
                About <span className="text-[#D9791A]">Wealth Acumen</span>
              </h1>

              <div className="space-y-4 text-base text-[#5B5955] leading-relaxed font-normal">
                <p className="text-lg font-semibold text-slate-800 leading-snug">
                  Guiding your financial journey with trust, clarity and purpose.
                </p>
                <p>
                  At Wealth Acumen, we believe that smart investing begins with the right guidance. As a trusted partner in your financial journey, we help you make informed decisions, achieve your goals and build long-term wealth for a secure future.
                </p>
              </div>

              {/* Trust Pillars - Minimal & Luxurious Typographic Layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full pt-8 border-t border-slate-200/60 mt-8">
                {/* Pillar 1 */}
                <div className="flex flex-col space-y-2">
                  <span className="font-[family-name:var(--font-serif)] text-2xl font-light text-[#D9791A] leading-none">01</span>
                  <h3 className="font-[family-name:var(--font-outfit)] text-sm font-bold text-slate-900">
                    Client First
                  </h3>
                  <p className="text-xs text-[#5B5955] leading-relaxed">
                    Your goals are our priority. We put your interests first.
                  </p>
                </div>
                
                {/* Pillar 2 */}
                <div className="flex flex-col space-y-2">
                  <span className="font-[family-name:var(--font-serif)] text-2xl font-light text-[#D9791A] leading-none">02</span>
                  <h3 className="font-[family-name:var(--font-outfit)] text-sm font-bold text-slate-900">
                    Transparent Advice
                  </h3>
                  <p className="text-xs text-[#5B5955] leading-relaxed">
                    Honest, unbiased and clear guidance you can always rely on.
                  </p>
                </div>
                
                {/* Pillar 3 */}
                <div className="flex flex-col space-y-2">
                  <span className="font-[family-name:var(--font-serif)] text-2xl font-light text-[#D9791A] leading-none">03</span>
                  <h3 className="font-[family-name:var(--font-outfit)] text-sm font-bold text-slate-900">
                    Goal Based Approach
                  </h3>
                  <p className="text-xs text-[#5B5955] leading-relaxed">
                    Personalized strategies designed around your dreams and needs.
                  </p>
                </div>
                
                {/* Pillar 4 */}
                <div className="flex flex-col space-y-2">
                  <span className="font-[family-name:var(--font-serif)] text-2xl font-light text-[#D9791A] leading-none">04</span>
                  <h3 className="font-[family-name:var(--font-outfit)] text-sm font-bold text-slate-900">
                    Long Term Growth
                  </h3>
                  <p className="text-xs text-[#5B5955] leading-relaxed">
                    Focused on creating sustainable wealth and financial independence.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column (45% width) with overlapping credentials card */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative w-full lg:h-full lg:min-h-[420px]">
              {/* Main Visual Image */}
              <div className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden border border-[#E7E1D8] shadow-lg bg-white">
                <Image
                  src="/assets/images/about-hero-visual.jpg"
                  alt="Financial Growth Compass"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Overlapping Floating Credentials Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full max-w-[340px] rounded-[24px] border border-orange-500/10 shadow-xl shadow-orange-950/[0.03] bg-[#FFFDF9]/95 backdrop-blur-md p-6 mt-6 lg:mt-0 lg:absolute lg:bottom-4 lg:-right-10 z-20"
              >
                <div className="flex justify-between items-center mb-5">
                  <span className="font-[family-name:var(--font-outfit)] text-xs font-bold text-[#D9791A] uppercase tracking-wider">
                    Our Credentials
                  </span>
                  <div className="w-7 h-7 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center text-[#D9791A]">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                  </div>
                </div>

                <div className="flex flex-col space-y-3.5 mb-6 text-xs text-[#5B5955]">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">AMFI Registration</span>
                    <span className="font-semibold text-slate-800">ARN-{brand.amfiRegNo}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                    <span className="text-slate-500 font-medium">EUIN Number</span>
                    <span className="font-semibold text-slate-800">{brand.euinNo}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-medium">Advisory Type</span>
                    <span className="font-semibold text-slate-800">Mutual Fund Distributor</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center text-[#D9791A] font-bold text-xs">
                    WA
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-800 leading-none">Wealth Acumen</span>
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
