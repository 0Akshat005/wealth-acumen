"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { brand } from "@/config/brand";
import {
  heroContent,
  missionVision,
  services,
  testimonials,
} from "@/config/content";
import { CompoundingCalculator } from "@/components/ui/CompoundingCalculator";

/* ─── Helpers ─── */
function FadeIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

function Counter({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.max(1, Math.floor(target / 60));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 25);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <span ref={ref}>{prefix}{count.toLocaleString("en-IN")}{suffix}</span>;
}

/* ─── Icons ─── */
const svcIcons: Record<string, React.ReactNode> = {
  "bar-chart-2": <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" /></svg>,
  "pie-chart": <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" /></svg>,
  "shield-check": <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg>,
  layers: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m6.115 5.19.319 1.913A6 6 0 0 0 8.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 0 0 2.288-4.042 1.087 1.087 0 0 0-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 0 1-.98-.314l-.295-.295a1.125 1.125 0 0 1 0-1.591l.13-.132a1.125 1.125 0 0 1 1.3-.21l.603.302a.809.809 0 0 0 1.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 0 0 1.528-1.732l.146-.292M6.115 5.19A9 9 0 1 0 17.18 4.64M6.115 5.19A8.965 8.965 0 0 1 12 3c1.929 0 3.716.607 5.18 1.64" /></svg>,
  lock: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>,
  landmark: <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" /></svg>,
};

const whyIcons: Record<string, React.ReactNode> = {
  target: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="3" /><path d="M12 3v3m0 12v3" /></svg>,
  "trending-up": <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" /></svg>,
  "book-open": <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" /></svg>,
  shield: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg>,
  headphones: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" /></svg>,
};

/* ══════════════════════════════════════════════ */
/*                  HOME PAGE                    */
/* ══════════════════════════════════════════════ */
export default function HomePage() {

  const [showScrollAlert, setShowScrollAlert] = useState(false);
  const [scrollAlertDismissed, setScrollAlertDismissed] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  useEffect(() => {
    const isDismissed = sessionStorage.getItem("wealth_acumen_scroll_alert_dismissed");
    if (isDismissed) {
      setScrollAlertDismissed(true);
    }
  }, []);

  useEffect(() => {
    if (scrollAlertDismissed) return;

    const handleScrollAlert = () => {
      if (window.scrollY > 600) {
        setShowScrollAlert(true);
      } else {
        setShowScrollAlert(false);
      }
    };

    window.addEventListener("scroll", handleScrollAlert, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollAlert);
  }, [scrollAlertDismissed]);

  const dismissScrollAlert = () => {
    setShowScrollAlert(false);
    setScrollAlertDismissed(true);
    sessionStorage.setItem("wealth_acumen_scroll_alert_dismissed", "true");
  };

  return (
    <>
      {/* ═══════════════════════════════════════════ */}
      {/*              CINEMATIC HERO                */}
      {/* ═══════════════════════════════════════════ */}
                  <section ref={heroRef} className="relative min-h-[100dvh] pt-24 pb-12 sm:pt-36 sm:pb-16 flex items-center justify-center bg-[#FCF9F4] overflow-x-hidden">
        {/* Full-bleed golden hour desk skyline background */}
        <div className="absolute inset-0 select-none pointer-events-none z-0">
          <Image
            src="/assets/images/hero-desk-composite.png"
            alt=""
            fill
            className="object-cover object-[center_right] sm:object-center"
            priority
            quality={95}
          />
          {/* Soft cream-to-transparent overlay for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FCF9F4] via-[#FCF9F4]/90 sm:via-[#FCF9F4]/75 to-transparent" />
          {/* Bottom fade to page content */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FCF9F4] to-transparent" />
        </div>

        {/* Fine grid design overlay */}
        <div className="absolute inset-0 opacity-[0.015] z-0 pointer-events-none" style={{
          backgroundImage: "linear-gradient(rgba(15,23,42,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }} />

        {/* Main Grid Container */}
        <div className="relative z-10 max-w-none mx-auto px-4 sm:px-10 lg:px-16 xl:px-20 w-full flex flex-col justify-between">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
            {/* Left Content Column */}
            <div className="lg:col-span-9 flex flex-col items-start text-left space-y-6 sm:space-y-8">
              {/* Trust Badge Strip */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col sm:flex-row sm:items-center gap-y-3 gap-x-4 sm:gap-x-8 select-none py-1 w-full sm:w-auto"
              >
                {/* AMFI Registered */}
                <div className="flex items-center gap-2">
                  <span className="w-9 h-9 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center text-[#D9791A] shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <circle cx="12" cy="12" r="10" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12" />
                    </svg>
                  </span>
                  <div className="text-[11px] font-bold text-left leading-tight text-[#5B5955]">
                    AMFI Registered <br />
                    <span className="text-[#10141F]">ARN {brand.amfiRegNo}</span>
                  </div>
                </div>

                {/* Divider */}
                <div className="hidden sm:block w-px h-8 bg-[#E7E1D8]" />

                {/* Channel Partner */}
                <div className="flex items-center gap-2">
                  <span className="w-9 h-9 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="12" cy="5" r="1.8" />
                      <circle cx="9" cy="10" r="2.2" />
                      <circle cx="15" cy="10" r="2.2" />
                      <circle cx="6" cy="16" r="2.6" />
                      <circle cx="12" cy="16" r="2.6" />
                      <circle cx="18" cy="16" r="2.6" />
                    </svg>
                  </span>
                  <div className="text-[11px] font-bold text-left leading-tight text-[#5B5955]">
                    Channel Partner of <br />
                    <span className="text-[#10141F]">Angel One</span>
                  </div>
                </div>

                {/* Divider */}
                <div className="hidden sm:block w-px h-8 bg-[#E7E1D8]" />

                {/* SEBI Compliant */}
                <div className="flex items-center gap-2">
                  <span className="w-9 h-9 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center text-[#D9791A] shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                    </svg>
                  </span>
                  <div className="text-[11px] font-bold text-left leading-tight text-[#5B5955]">
                    SEBI Compliant <br />
                    <span className="text-[#10141F]">Advisory</span>
                  </div>
                </div>
              </motion.div>

              {/* Serif Title Headline */}
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.15 }}
                  className="font-[family-name:var(--font-serif)] text-[2.35rem] min-[380px]:text-[2.75rem] sm:text-6xl lg:text-[4.25rem] font-bold text-[#10141F] leading-[1.08] tracking-tight text-left"
                >
                  Smart Investment. <br />
                  Stronger Future. <br />
                  <span className="gradient-text block">
                    Built Together.
                  </span>
                </motion.h1>
              </div>

              {/* Subtext Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-base sm:text-lg text-[#5B5955] max-w-3xl text-left leading-relaxed"
              >
                Personalized strategies, trusted insights, and ethical guidance <br className="hidden sm:inline" />
                to grow your wealth with <strong className="text-[#10141F] font-bold">clarity</strong> and <strong className="text-[#10141F] font-bold">confidence.</strong>
              </motion.p>

              {/* CTA pair buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.45 }}
                className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto justify-start"
              >
                <a
                  href={brand.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#D9791A] hover:bg-[#C75A00] text-white font-bold py-4 px-8 rounded-full shadow-lg shadow-orange-600/20 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2.5 text-base w-full sm:w-auto cursor-pointer"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Start Your Journey
                </a>
                <Link
                  href="/services/equity"
                  className="bg-white hover:bg-slate-50 text-[#10141F] font-bold py-4 px-8 rounded-full border border-[#E7E1D8] hover:border-[#D9791A] transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2.5 text-base w-full sm:w-auto shadow-sm"
                >
                  Explore Services
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" /></svg>
                </Link>
              </motion.div>

              {/* Trust Microcopy */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row sm:items-center gap-y-2.5 gap-x-4 text-xs font-semibold text-[#5B5955] justify-start pt-2 select-none w-full"
              >
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-[#D9791A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 0 1-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8Z" />
                  </svg>
                  Avg. Response &lt; 15 mins
                </span>
                <span className="text-slate-300 hidden sm:block">|</span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-[#D9791A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                  </svg>
                  Free Initial Audit
                </span>
                <span className="text-slate-300 hidden sm:block">|</span>
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4 text-[#D9791A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                  </svg>
                  100% SEBI Compliant
                </span>
              </motion.div>
            </div>

            {/* Right Column: Visual Composite & Floating Limited Slots Card */}
            <div className="lg:col-span-3 flex flex-col space-y-8 w-full h-full justify-between py-4">




              {/* Large spacing on desktop to keep the layout open and show off the laptop/plaque background */}
              <div className="hidden lg:block h-60" />
            </div>
          </div>

          {/* Bottom Overlapping Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="w-full max-w-none mx-auto mt-16 relative z-20"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {/* Stat 1 */}
              <div className="flex flex-col lg:flex-row items-center justify-center gap-4 bg-[#FFFDF9]/10 backdrop-blur-[8px] border border-[#D9791A]/10 rounded-[18px] p-5 sm:p-6 shadow-sm shadow-orange-600/[0.03] transition-all duration-300 hover:border-[#D9791A]/20 hover:shadow-md hover:shadow-orange-600/[0.05]">
                <div className="w-12 h-12 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center text-[#D9791A] shrink-0 shadow-sm">
                  <svg className="w-6 h-6 text-[#D9791A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18c-2-3-2-8 0-12m1-1c-1.5 2-1.5 5 0 8m-2-5c1 1.5 3 1.5 4 0" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18c2-3 2-8 0-12m-1-1c1.5 2 1.5 5 0 8m2-5c-1 1.5-3 1.5-4 0" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                  </svg>
                </div>
                <div className="text-center lg:text-left">
                  <p className="font-[family-name:var(--font-serif)] text-3xl font-extrabold text-[#C75A00] tracking-tight">
                    <Counter target={4} suffix="+" />
                  </p>
                  <p className="text-xs font-bold text-[#5B5955] mt-0.5 uppercase tracking-wide">Years of Excellence</p>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="flex flex-col lg:flex-row items-center justify-center gap-4 bg-[#FFFDF9]/10 backdrop-blur-[8px] border border-[#D9791A]/10 rounded-[18px] p-5 sm:p-6 shadow-sm shadow-orange-600/[0.03] transition-all duration-300 hover:border-[#D9791A]/20 hover:shadow-md hover:shadow-orange-600/[0.05]">
                <div className="w-12 h-12 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center text-[#D9791A] shrink-0 shadow-sm">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.109A11.386 11.386 0 0 0 12 21c-2.829 0-5.437-.893-7.563-2.4a9.338 9.338 0 0 1 13.813-2.493M14 9.75a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                  </svg>
                </div>
                <div className="text-center lg:text-left">
                  <p className="font-[family-name:var(--font-serif)] text-3xl font-extrabold text-[#C75A00] tracking-tight">
                    <Counter target={500} suffix="+" />
                  </p>
                  <p className="text-xs font-bold text-[#5B5955] mt-0.5 uppercase tracking-wide">Happy Clients</p>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="flex flex-col lg:flex-row items-center justify-center gap-4 bg-[#FFFDF9]/10 backdrop-blur-[8px] border border-[#D9791A]/10 rounded-[18px] p-5 sm:p-6 shadow-sm shadow-orange-600/[0.03] transition-all duration-300 hover:border-[#D9791A]/20 hover:shadow-md hover:shadow-orange-600/[0.05]">
                <div className="w-12 h-12 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center text-[#D9791A] shrink-0 shadow-sm">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21a7.5 7.5 0 0 0-7.5-7.5v7.5Z" />
                  </svg>
                </div>
                <div className="text-center lg:text-left">
                  <p className="font-[family-name:var(--font-serif)] text-3xl font-extrabold text-[#C75A00] tracking-tight">
                    <Counter target={6} />
                  </p>
                  <p className="text-xs font-bold text-[#5B5955] mt-0.5 uppercase tracking-wide">Investment Products</p>
                </div>
              </div>

              {/* Stat 4 */}
              <div className="flex flex-col lg:flex-row items-center justify-center gap-4 bg-[#FFFDF9]/10 backdrop-blur-[8px] border border-[#D9791A]/10 rounded-[18px] p-5 sm:p-6 shadow-sm shadow-orange-600/[0.03] transition-all duration-300 hover:border-[#D9791A]/20 hover:shadow-md hover:shadow-orange-600/[0.05]">
                <div className="w-12 h-12 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center text-[#D9791A] shrink-0 shadow-sm">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                  </svg>
                </div>
                <div className="text-center lg:text-left">
                  <p className="font-[family-name:var(--font-serif)] text-3xl font-extrabold text-[#C75A00] tracking-tight">
                    <Counter target={100} suffix="%" />
                  </p>
                  <p className="text-xs font-bold text-[#5B5955] mt-0.5 uppercase tracking-wide">Transparent Advisory</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/*           TRUST MARQUEE STRIP              */}
      {/* ═══════════════════════════════════════════ */}
      <section className="py-8 border-y border-slate-200 bg-slate-50/50 overflow-hidden">
        <div className="marquee-track">
          {[...Array(2)].map((_, rep) => (
            <div key={rep} className="flex items-center gap-12 shrink-0">
              {["AMFI Registered Distributor", "ARN 247468", "EUIN E459104", "Channel Partner of Angel One", "SEBI Compliant", "Serving All India", "NISM Certified Analyst", "4+ Years Market Experience"].map((text, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-slate-600 whitespace-nowrap font-medium">
                  <svg className="w-4 h-4 text-indigo-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                  {text}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/*          MISSION / VISION SPLIT            */}
      {/* ═══════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 relative overflow-hidden bg-[#FCF9F4]">
        {/* Left mandala decoration */}
        <div className="absolute -left-14 top-1/2 -translate-y-1/2 w-64 h-64 opacity-[0.07] select-none pointer-events-none">
          <svg viewBox="0 0 200 200" fill="none" className="w-full h-full text-[#C75A00]">
            <circle cx="100" cy="100" r="95" stroke="currentColor" strokeWidth="1" strokeDasharray="6 3"/>
            <circle cx="100" cy="100" r="75" stroke="currentColor" strokeWidth="1.5"/>
            <circle cx="100" cy="100" r="55" stroke="currentColor" strokeWidth="1"/>
            <circle cx="100" cy="100" r="35" stroke="currentColor" strokeWidth="1.5"/>
            <circle cx="100" cy="100" r="15" stroke="currentColor" strokeWidth="1"/>
            {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg,i) => {
              const r = deg * Math.PI/180;
              return <g key={i}>
                <line x1={100+15*Math.cos(r)} y1={100+15*Math.sin(r)} x2={100+95*Math.cos(r)} y2={100+95*Math.sin(r)} stroke="currentColor" strokeWidth="0.7" strokeOpacity="0.6"/>
                <ellipse cx={100+55*Math.cos(r)} cy={100+55*Math.sin(r)} rx="5" ry="12" fill="currentColor" fillOpacity="0.25" transform={`rotate(${deg} ${100+55*Math.cos(r)} ${100+55*Math.sin(r)})`}/>
              </g>;
            })}
          </svg>
        </div>
        {/* Right mandala decoration */}
        <div className="absolute -right-14 top-1/2 -translate-y-1/2 w-64 h-64 opacity-[0.07] select-none pointer-events-none">
          <svg viewBox="0 0 200 200" fill="none" className="w-full h-full text-[#C75A00]">
            <circle cx="100" cy="100" r="95" stroke="currentColor" strokeWidth="1" strokeDasharray="6 3"/>
            <circle cx="100" cy="100" r="75" stroke="currentColor" strokeWidth="1.5"/>
            <circle cx="100" cy="100" r="55" stroke="currentColor" strokeWidth="1"/>
            <circle cx="100" cy="100" r="35" stroke="currentColor" strokeWidth="1.5"/>
            <circle cx="100" cy="100" r="15" stroke="currentColor" strokeWidth="1"/>
            {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg,i) => {
              const r = deg * Math.PI/180;
              return <g key={i}>
                <line x1={100+15*Math.cos(r)} y1={100+15*Math.sin(r)} x2={100+95*Math.cos(r)} y2={100+95*Math.sin(r)} stroke="currentColor" strokeWidth="0.7" strokeOpacity="0.6"/>
                <ellipse cx={100+55*Math.cos(r)} cy={100+55*Math.sin(r)} rx="5" ry="12" fill="currentColor" fillOpacity="0.25" transform={`rotate(${deg} ${100+55*Math.cos(r)} ${100+55*Math.sin(r)})`}/>
              </g>;
            })}
          </svg>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Header */}
          <FadeIn>
            <p className="text-[10px] sm:text-xs font-bold text-indigo-500 tracking-[0.25em] uppercase mb-4 text-center">
              THE PROMISE WE MAKE
            </p>
          </FadeIn>
          <FadeIn delay={0.06}>
            <h2 className="font-[family-name:var(--font-serif)] text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-14 leading-tight text-slate-900">
              Built on <span className="text-[#D9791A]">Trust</span>, driven by <span className="text-[#1E614D]">Vision</span>
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-7 lg:gap-10">

            {/* ══ LEFT CARD — Mission to Inspire ══ */}
            <FadeIn delay={0.1}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/60 overflow-hidden"
                style={{ borderBottom: "6px solid #5E3F97" }}
              >
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-0 p-6 sm:p-8">

                  {/* Lighthouse Illustration */}
                  <div className="w-44 sm:w-52 shrink-0 select-none">
                    <svg viewBox="0 0 130 140" className="w-full h-full">
                      {/* Sun glow */}
                      <circle cx="65" cy="58" r="36" fill="#FFFBEB" />
                      <circle cx="65" cy="58" r="26" fill="#FEF3C7" />

                      {/* Books stack */}
                      <rect x="14" y="90" width="26" height="7" rx="2" fill="#D9791A"/>
                      <rect x="14" y="97" width="26" height="4" rx="1" fill="#F59E0B"/>
                      <rect x="15" y="101" width="24" height="12" rx="1.5" fill="#B45309"/>

                      {/* Blue book leaning */}
                      <path d="M14 68 L18 56 L34 62 L30 74 Z" fill="#3B82F6"/>
                      <path d="M16 67 L19 57 L23 59 L20 69 Z" fill="#93C5FD"/>
                      <line x1="18" y1="65" x2="29" y2="70" stroke="#BFDBFE" strokeWidth="1" strokeLinecap="round"/>

                      {/* Light beams from lighthouse */}
                      <path d="M65 38 L12 10 L22 30 Z" fill="#FDE68A" fillOpacity="0.5"/>
                      <path d="M65 38 L118 10 L108 30 Z" fill="#FDE68A" fillOpacity="0.5"/>
                      <path d="M65 38 L5 38 L20 48 Z" fill="#FDE68A" fillOpacity="0.3"/>

                      {/* Lighthouse tower */}
                      <path d="M59 113 L61 40 L69 40 L71 113 Z" fill="#E2E8F0"/>
                      {/* Orange bands */}
                      <path d="M60 95 L60.5 75 L69.5 75 L70 95 Z" fill="#EA580C"/>
                      <path d="M60.5 65 L61 50 L69 50 L69.5 65 Z" fill="#EA580C"/>
                      {/* Gallery ledge */}
                      <rect x="57" y="37" width="16" height="3.5" rx="1" fill="#64748B"/>
                      {/* Lantern room */}
                      <rect x="60" y="25" width="10" height="12" fill="#FDE047"/>
                      <line x1="65" y1="25" x2="65" y2="37" stroke="#475569" strokeWidth="1"/>
                      <line x1="60" y1="31" x2="70" y2="31" stroke="#475569" strokeWidth="1"/>
                      {/* Dome */}
                      <path d="M59 25 L65 15 L71 25 Z" fill="#475569"/>
                      <circle cx="65" cy="15" r="2" fill="#FDE047"/>
                      {/* Base */}
                      <rect x="55" y="110" width="20" height="8" rx="1.5" fill="#CBD5E1"/>

                      {/* Compass */}
                      <circle cx="90" cy="95" r="22" fill="#D97706" stroke="#B45309" strokeWidth="1.5"/>
                      <circle cx="90" cy="95" r="19" fill="white"/>
                      <circle cx="90" cy="95" r="17" fill="#FFFBEB"/>
                      {/* Cardinal tick marks */}
                      <line x1="90" y1="78" x2="90" y2="82" stroke="#B45309" strokeWidth="1.5" strokeLinecap="round"/>
                      <line x1="90" y1="108" x2="90" y2="112" stroke="#B45309" strokeWidth="1.5" strokeLinecap="round"/>
                      <line x1="73" y1="95" x2="77" y2="95" stroke="#B45309" strokeWidth="1.5" strokeLinecap="round"/>
                      <line x1="103" y1="95" x2="107" y2="95" stroke="#B45309" strokeWidth="1.5" strokeLinecap="round"/>
                      {/* Cardinal Letters */}
                      <text x="90" y="76" fontSize="4.5" fontWeight="bold" fill="#B45309" textAnchor="middle" fontFamily="sans-serif">N</text>
                      <text x="90" y="116" fontSize="4.5" fontWeight="bold" fill="#94A3B8" textAnchor="middle" fontFamily="sans-serif">S</text>
                      <text x="70" y="96.5" fontSize="4.5" fontWeight="bold" fill="#94A3B8" textAnchor="middle" fontFamily="sans-serif">W</text>
                      <text x="110" y="96.5" fontSize="4.5" fontWeight="bold" fill="#94A3B8" textAnchor="middle" fontFamily="sans-serif">E</text>
                      {/* Needle */}
                      <path d="M90 95 L93 89 L90 80 Z" fill="#EF4444"/>
                      <path d="M90 95 L87 89 L90 80 Z" fill="#DC2626" fillOpacity="0.7"/>
                      <path d="M90 95 L93 101 L90 110 Z" fill="#64748B"/>
                      <path d="M90 95 L87 101 L90 110 Z" fill="#94A3B8"/>
                      <circle cx="90" cy="95" r="2.5" fill="white" stroke="#D97706" strokeWidth="1"/>

                      {/* Clouds */}
                      <ellipse cx="30" cy="28" rx="8" ry="4" fill="white" fillOpacity="0.7"/>
                      <ellipse cx="38" cy="26" rx="6" ry="3" fill="white" fillOpacity="0.7"/>
                      <ellipse cx="100" cy="22" rx="9" ry="4" fill="white" fillOpacity="0.7"/>
                      <ellipse cx="108" cy="20" rx="6" ry="3" fill="white" fillOpacity="0.7"/>
                    </svg>
                  </div>

                  {/* Mission text */}
                  <div className="flex-1 sm:pl-4 space-y-5 text-center sm:text-left">
                    <div>
                      <p className="font-[family-name:var(--font-outfit)] text-xl font-medium text-slate-700 leading-tight">Mission to</p>
                      <p className="font-[family-name:var(--font-outfit)] text-3xl font-extrabold text-slate-900 leading-tight">Inspire</p>
                    </div>
                    <ul className="space-y-3 text-left">
                      {[
                        { color: "bg-[#EDE9FE] text-[#5E3F97] border-[#C4B5FD]", emoji: "🛡", label: "Empowering Indian Investors" },
                        { color: "bg-rose-50 text-rose-600 border-rose-200", emoji: "📈", label: "Personalized Strategies" },
                        { color: "bg-red-50 text-red-600 border-red-200", emoji: "🎯", label: "Goal-Oriented Wealth" },
                        { color: "bg-slate-100 text-slate-700 border-slate-200", emoji: "🎓", label: "Financial Confidence" },
                      ].map((b, i) => (
                        <li key={i} className="flex items-center gap-2.5 text-sm font-semibold text-slate-700">
                          <span className={`w-6 h-6 rounded-md border flex items-center justify-center text-xs shrink-0 ${b.color}`}>{b.emoji}</span>
                          {b.label}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </FadeIn>

            {/* ══ RIGHT CARD — Vision of Success ══ */}
            <FadeIn delay={0.18}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/60 overflow-hidden"
                style={{ borderBottom: "6px solid #1C694F" }}
              >
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-0 p-6 sm:p-8">

                  {/* Rupee Money Tree Illustration */}
                  <div className="w-44 sm:w-52 shrink-0 select-none">
                    <svg viewBox="0 0 130 140" className="w-full h-full">
                      {/* Sun glow */}
                      <circle cx="65" cy="55" r="38" fill="#FFFBEB"/>
                      <circle cx="65" cy="55" r="26" fill="#FEF3C7"/>

                      {/* Sparkle stars */}
                      <circle cx="25" cy="35" r="1.5" fill="#FDE047"/>
                      <circle cx="105" cy="30" r="1.5" fill="#FDE047"/>
                      <circle cx="115" cy="55" r="1" fill="#FDE047"/>
                      <circle cx="20" cy="65" r="1" fill="#FDE047"/>

                      {/* Tree trunk & branches */}
                      <path d="M65 100 L65 60" stroke="#78350F" strokeWidth="4" strokeLinecap="round"/>
                      <path d="M65 85 Q50 72 40 65" stroke="#92400E" strokeWidth="2.5" strokeLinecap="round"/>
                      <path d="M65 75 Q80 62 90 55" stroke="#92400E" strokeWidth="2.5" strokeLinecap="round"/>
                      <path d="M65 65 Q55 50 58 38" stroke="#92400E" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M65 65 Q75 50 72 38" stroke="#92400E" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M65 60 Q60 40 65 26" stroke="#92400E" strokeWidth="2" strokeLinecap="round"/>

                      {/* Rupee Coins */}
                      {[
                        { cx: 40, cy: 65, r: 8 },
                        { cx: 90, cy: 55, r: 8 },
                        { cx: 58, cy: 38, r: 7.5 },
                        { cx: 72, cy: 38, r: 7.5 },
                        { cx: 65, cy: 18, r: 9 },
                        { cx: 28, cy: 52, r: 6 },
                        { cx: 102, cy: 42, r: 6 },
                      ].map((c, i) => (
                        <g key={i}>
                          <circle cx={c.cx} cy={c.cy} r={c.r} fill="#F59E0B" stroke="#D97706" strokeWidth="1"/>
                          <circle cx={c.cx} cy={c.cy} r={c.r - 2} fill="#FDE68A"/>
                          <text x={c.cx} y={c.cy + c.r * 0.4} fontSize={c.r * 1.1} fontWeight="bold" fill="#78350F" textAnchor="middle" fontFamily="sans-serif">₹</text>
                        </g>
                      ))}

                      {/* Green leaves */}
                      {[
                        { cx: 35, cy: 58, rx: 5, ry: 3, rot: -30 },
                        { cx: 95, cy: 50, rx: 5, ry: 3, rot: 30 },
                        { cx: 53, cy: 33, rx: 4, ry: 2.5, rot: -20 },
                        { cx: 78, cy: 33, rx: 4, ry: 2.5, rot: 20 },
                      ].map((l, i) => (
                        <ellipse key={i} cx={l.cx} cy={l.cy} rx={l.rx} ry={l.ry} fill="#10B981" fillOpacity="0.7" transform={`rotate(${l.rot} ${l.cx} ${l.cy})`}/>
                      ))}

                      {/* Hands */}
                      {/* Left teal sleeve */}
                      <rect x="18" y="88" width="16" height="22" rx="3" fill="#0F766E"/>
                      {/* Right teal sleeve */}
                      <rect x="96" y="88" width="16" height="22" rx="3" fill="#0F766E"/>
                      {/* Shirt cuffs */}
                      <rect x="18" y="85" width="16" height="6" rx="1.5" fill="white"/>
                      <rect x="96" y="85" width="16" height="6" rx="1.5" fill="white"/>
                      {/* Left palm */}
                      <path d="M34 91 C42 91 55 95 62 99 C64 100 65 102 62 104 C56 106 42 105 32 100 C25 97 22 92 28 89 Z" fill="#FCD3A1"/>
                      {/* Right palm */}
                      <path d="M96 91 C88 91 75 95 68 99 C66 100 65 102 68 104 C74 106 88 105 98 100 C105 97 108 92 102 89 Z" fill="#FCD3A1"/>
                      {/* Soil mound */}
                      <ellipse cx="65" cy="103" rx="20" ry="6" fill="#78350F" fillOpacity="0.5"/>
                      <ellipse cx="65" cy="101" rx="14" ry="4" fill="#92400E" fillOpacity="0.6"/>
                    </svg>
                  </div>

                  {/* Vision text */}
                  <div className="flex-1 sm:pl-4 space-y-5 text-center sm:text-left">
                    <div>
                      <p className="font-[family-name:var(--font-outfit)] text-xl font-medium text-slate-700 leading-tight">Vision of</p>
                      <p className="font-[family-name:var(--font-outfit)] text-3xl font-extrabold text-slate-900 leading-tight">Success</p>
                    </div>
                    <ul className="space-y-3 text-left">
                      {[
                        { color: "bg-amber-50 text-amber-600 border-amber-200", emoji: "🤝", label: "Your Lifelong Partner" },
                        { color: "bg-green-50 text-green-600 border-green-200", emoji: "🌱", label: "Sustainable Growth" },
                        { color: "bg-yellow-50 text-yellow-500 border-yellow-200", emoji: "💡", label: "Smart Wealth Building" },
                        { color: "bg-emerald-50 text-emerald-600 border-emerald-200", emoji: "💸", label: "True Financial Freedom" },
                      ].map((b, i) => (
                        <li key={i} className="flex items-center gap-2.5 text-sm font-semibold text-slate-700">
                          <span className={`w-6 h-6 rounded-md border flex items-center justify-center text-xs shrink-0 ${b.color}`}>{b.emoji}</span>
                          {b.label}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/*     PREMIUM EDITORIAL SERVICES SECTION      */}
      {/* ═══════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-[#FFFDF9] relative overflow-hidden">
        {/* Subtle warm ambient */}
        <div className="absolute top-[20%] left-[40%] w-[30vw] h-[30vw] rounded-full bg-orange-100/20 blur-[120px] pointer-events-none select-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <FadeIn>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-10 bg-gradient-to-r from-transparent to-[#D9791A]/40" />
              <p className="text-sm font-bold text-[#D9791A] tracking-[0.2em] uppercase">What we offer</p>
              <div className="h-px w-10 bg-gradient-to-l from-transparent to-[#D9791A]/40" />
            </div>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h2 className="font-[family-name:var(--font-serif)] text-4xl sm:text-5xl md:text-[3.5rem] font-bold text-center mb-5 leading-tight text-[#10141F]">
              Solutions Designed for{" "}
              <span className="bg-gradient-to-r from-[#E8A33D] to-[#C9670A] bg-clip-text text-transparent">Your Financial Growth</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-base sm:text-lg text-[#5B5955] text-center max-w-2xl mx-auto mb-16 sm:mb-20 font-normal leading-relaxed">
              We provide a wide range of financial solutions tailored to your goals.<br className="hidden sm:inline" />
              Simple, transparent, and focused on building long-term wealth.
            </p>
          </FadeIn>

          {/* Hub-and-Spoke Layout */}
          <div className="relative">
            {/* ── DESKTOP LAYOUT (lg+) ── */}
            <div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-0">

              {/* LEFT COLUMN — Equity, ETFs, Mutual Funds */}
              <div className="flex flex-col gap-14 pr-8">
                {/* Service 1: Equity */}
                <FadeIn delay={0.05}>
                  <Link href="/services/equity" className="group flex items-start gap-4 text-right flex-row-reverse">
                    <div className="w-12 h-12 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center text-[#D9791A] shrink-0 group-hover:bg-orange-100 transition-colors">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" /></svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-[family-name:var(--font-outfit)] text-base font-bold text-[#10141F] mb-1 group-hover:text-[#D9791A] transition-colors">Equity</h3>
                      <p className="text-xs text-[#5B5955] leading-relaxed">We assist you in your equity investment journey by helping you access tools, research insights, and educational content available through our partner Angel One.</p>
                    </div>
                  </Link>
                </FadeIn>

                {/* Service 2: ETFs */}
                <FadeIn delay={0.1}>
                  <Link href="/services/etfs" className="group flex items-start gap-4 text-right flex-row-reverse">
                    <div className="w-12 h-12 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center text-[#D9791A] shrink-0 group-hover:bg-orange-100 transition-colors">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m6.115 5.19.319 1.913A6 6 0 0 0 8.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 0 0 2.288-4.042 1.087 1.087 0 0 0-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 0 1-.98-.314l-.295-.295a1.125 1.125 0 0 1 0-1.591l.13-.132a1.125 1.125 0 0 1 1.3-.21l.603.302a.809.809 0 0 0 1.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 0 0 1.528-1.732l.146-.292M6.115 5.19A9 9 0 1 0 17.18 4.64M6.115 5.19A8.965 8.965 0 0 1 12 3c1.929 0 3.716.607 5.18 1.64" /></svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-[family-name:var(--font-outfit)] text-base font-bold text-[#10141F] mb-1 group-hover:text-[#D9791A] transition-colors">ETFs (Exchange Traded Funds)</h3>
                      <p className="text-xs text-[#5B5955] leading-relaxed">Looking for low-cost, diversified investment options? We guide you in selecting the right ETFs.</p>
                    </div>
                  </Link>
                </FadeIn>

                {/* Service 3: Mutual Funds */}
                <FadeIn delay={0.15}>
                  <Link href="/services/mutual-funds" className="group flex items-start gap-4 text-right flex-row-reverse">
                    <div className="w-12 h-12 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center text-[#D9791A] shrink-0 group-hover:bg-orange-100 transition-colors">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" /></svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-[family-name:var(--font-outfit)] text-base font-bold text-[#10141F] mb-1 group-hover:text-[#D9791A] transition-colors">Mutual Funds</h3>
                      <p className="text-xs text-[#5B5955] leading-relaxed">We offer end-to-end support for mutual fund investments, right from risk profiling to portfolio selection.</p>
                    </div>
                  </Link>
                </FadeIn>
              </div>

              {/* CENTER — Illustration with connector lines */}
              <div className="relative flex items-center justify-center w-[320px] h-[420px]">
                {/* Soft radial glow behind illustration */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                  <div className="w-64 h-64 rounded-full bg-gradient-radial from-orange-100/40 via-orange-50/20 to-transparent blur-[40px]" />
                </div>

                {/* Left connector lines with accent dots */}
                <div className="absolute left-0 top-[15%] w-10 h-px bg-gradient-to-r from-[#E7E1D8] to-[#D9791A]/20">
                  <div className="absolute -left-1 -top-[3px] w-2 h-2 rounded-full bg-[#D9791A]/60" />
                </div>
                <div className="absolute left-0 top-1/2 w-10 h-px bg-gradient-to-r from-[#E7E1D8] to-[#D9791A]/20 -translate-y-1/2">
                  <div className="absolute -left-1 -top-[3px] w-2 h-2 rounded-full bg-[#D9791A]/60" />
                </div>
                <div className="absolute left-0 bottom-[15%] w-10 h-px bg-gradient-to-r from-[#E7E1D8] to-[#D9791A]/20">
                  <div className="absolute -left-1 -top-[3px] w-2 h-2 rounded-full bg-[#D9791A]/60" />
                </div>

                {/* Right connector lines with accent dots */}
                <div className="absolute right-0 top-[15%] w-10 h-px bg-gradient-to-l from-[#E7E1D8] to-[#D9791A]/20">
                  <div className="absolute -right-1 -top-[3px] w-2 h-2 rounded-full bg-[#D9791A]/60" />
                </div>
                <div className="absolute right-0 top-1/2 w-10 h-px bg-gradient-to-l from-[#E7E1D8] to-[#D9791A]/20 -translate-y-1/2">
                  <div className="absolute -right-1 -top-[3px] w-2 h-2 rounded-full bg-[#D9791A]/60" />
                </div>
                <div className="absolute right-0 bottom-[15%] w-10 h-px bg-gradient-to-l from-[#E7E1D8] to-[#D9791A]/20">
                  <div className="absolute -right-1 -top-[3px] w-2 h-2 rounded-full bg-[#D9791A]/60" />
                </div>

                {/* Center Illustration */}
                <FadeIn delay={0.1}>
                  <div className="relative w-56 h-56 rounded-full bg-gradient-to-br from-white via-[#FFFDF9] to-orange-50/30 border border-orange-100/30 shadow-lg shadow-orange-100/20 flex items-center justify-center overflow-hidden">
                    <Image
                      src="/assets/images/finance-illustration.png"
                      alt="Financial Solutions"
                      width={180}
                      height={180}
                      className="object-contain drop-shadow-md"
                    />
                  </div>
                </FadeIn>
              </div>

              {/* RIGHT COLUMN — Insurance, Bonds, Fixed Deposit */}
              <div className="flex flex-col gap-14 pl-8">
                {/* Service 4: Insurance */}
                <FadeIn delay={0.05}>
                  <Link href="/services/insurance" className="group flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center text-[#D9791A] shrink-0 group-hover:bg-orange-100 transition-colors">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-[family-name:var(--font-outfit)] text-base font-bold text-[#10141F] mb-1 group-hover:text-[#D9791A] transition-colors">Insurance</h3>
                      <p className="text-xs text-[#5B5955] leading-relaxed">Protecting your wealth is as important as growing it. We assist you in choosing the right insurance products.</p>
                    </div>
                  </Link>
                </FadeIn>

                {/* Service 5: Bonds */}
                <FadeIn delay={0.1}>
                  <Link href="/services/bonds" className="group flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center text-[#D9791A] shrink-0 group-hover:bg-orange-100 transition-colors">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-[family-name:var(--font-outfit)] text-base font-bold text-[#10141F] mb-1 group-hover:text-[#D9791A] transition-colors">Bonds</h3>
                      <p className="text-xs text-[#5B5955] leading-relaxed">For conservative investors, we offer guidance on investing in fixed-income securities.</p>
                    </div>
                  </Link>
                </FadeIn>

                {/* Service 6: Fixed Deposit */}
                <FadeIn delay={0.15}>
                  <Link href="/services/fixed-deposit" className="group flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center text-[#D9791A] shrink-0 group-hover:bg-orange-100 transition-colors">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" /></svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-[family-name:var(--font-outfit)] text-base font-bold text-[#10141F] mb-1 group-hover:text-[#D9791A] transition-colors">Fixed Deposit</h3>
                      <p className="text-xs text-[#5B5955] leading-relaxed">Fixed Deposits (FDs) are your go-to investment option for peace of mind and steady growth.</p>
                    </div>
                  </Link>
                </FadeIn>
              </div>
            </div>

            {/* ── MOBILE / TABLET LAYOUT (below lg) ── */}
            <div className="lg:hidden">
              {/* Center Illustration */}
              <FadeIn delay={0.05}>
                <div className="flex justify-center mb-12">
                  <div className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-full bg-gradient-to-br from-white via-[#FFFDF9] to-orange-50/30 border border-orange-100/30 shadow-lg shadow-orange-100/20 flex items-center justify-center overflow-hidden">
                    <Image
                      src="/assets/images/finance-illustration.png"
                      alt="Financial Solutions"
                      width={160}
                      height={160}
                      className="object-contain drop-shadow-md"
                    />
                  </div>
                </div>
              </FadeIn>

              {/* Services in a clean list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
                {[
                  { href: "/services/equity", title: "Equity", desc: "We assist you in your equity investment journey by helping you access tools, research insights, and educational content.", icon: "bar-chart-2" },
                  { href: "/services/insurance", title: "Insurance", desc: "Protecting your wealth is as important as growing it. We assist you in choosing the right insurance products.", icon: "shield-check" },
                  { href: "/services/etfs", title: "ETFs", desc: "Looking for low-cost, diversified investment options? We guide you in selecting the right ETFs.", icon: "layers" },
                  { href: "/services/bonds", title: "Bonds", desc: "For conservative investors, we offer guidance on investing in fixed-income securities.", icon: "lock" },
                  { href: "/services/mutual-funds", title: "Mutual Funds", desc: "We offer end-to-end support for mutual fund investments, right from risk profiling to portfolio selection.", icon: "pie-chart" },
                  { href: "/services/fixed-deposit", title: "Fixed Deposit", desc: "Fixed Deposits are your go-to investment option for peace of mind and steady growth.", icon: "landmark" },
                ].map((s, i) => (
                  <FadeIn key={s.href} delay={i * 0.06}>
                    <Link href={s.href} className="group flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center text-[#D9791A] shrink-0 group-hover:bg-orange-100 transition-colors">
                        {svcIcons[s.icon]}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-[family-name:var(--font-outfit)] text-sm font-bold text-[#10141F] mb-0.5 group-hover:text-[#D9791A] transition-colors">{s.title}</h3>
                        <p className="text-xs text-[#5B5955] leading-relaxed">{s.desc}</p>
                      </div>
                    </Link>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/*            WHY CHOOSE US                   */}
      {/* ═══════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 relative overflow-hidden bg-[#FCF9F4]">
        {/* Subtle warm ambient glow */}
        <div className="absolute top-[15%] right-[-8%] w-[30vw] h-[30vw] rounded-full bg-orange-200/20 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[10%] left-[-5%] w-[25vw] h-[25vw] rounded-full bg-amber-100/25 blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <FadeIn>
            <p className="text-sm font-bold text-[#D9791A] tracking-[0.2em] uppercase mb-4 text-center">
              We bring the best things for you
            </p>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h2 className="font-[family-name:var(--font-serif)] text-4xl sm:text-5xl md:text-[3.5rem] font-bold text-center mb-16 leading-tight text-[#10141F]">
              Why investors{" "}
              <span className="bg-gradient-to-r from-[#E8A33D] to-[#C9670A] bg-clip-text text-transparent">
                choose us
              </span>
            </h2>
          </FadeIn>

          {/* ── Bento Grid ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 auto-rows-auto">

            {/* ═══ CARD 01 — Personalized Strategies (top-left) ═══ */}
            <FadeIn delay={0.1} className="lg:col-span-4 lg:row-span-1">
              <div className="bg-white rounded-3xl border border-[#E7E1D8] p-6 sm:p-7 h-full shadow-sm hover:shadow-md transition-shadow duration-300 group">
                <div className="flex items-start gap-3 mb-5">
                  <span className="font-[family-name:var(--font-serif)] text-3xl font-light text-[#D9791A]/40 select-none leading-none">01</span>
                  <h3 className="font-[family-name:var(--font-outfit)] text-lg sm:text-xl font-bold text-[#10141F] leading-snug">
                    Personalized Strategies
                  </h3>
                </div>
                {/* Dashboard Mockup */}
                <div className="bg-[#FAFBFC] rounded-2xl border border-slate-100 p-4 space-y-3">
                  {/* Header row */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-[#10141F] uppercase tracking-wider">Personalized asset allocation</span>
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                    </div>
                  </div>
                  {/* Allocation bars */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#D9791A] shrink-0" />
                      <span className="text-[9px] font-semibold text-slate-500 w-16 shrink-0">Equity</span>
                      <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                        <motion.div initial={{ width: 0 }} whileInView={{ width: "60%" }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="h-full bg-gradient-to-r from-[#D9791A] to-[#E8A33D] rounded-full" />
                      </div>
                      <span className="text-[9px] font-bold text-[#10141F] w-6 text-right">60%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                      <span className="text-[9px] font-semibold text-slate-500 w-16 shrink-0">Debt</span>
                      <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                        <motion.div initial={{ width: 0 }} whileInView={{ width: "25%" }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }} className="h-full bg-emerald-500 rounded-full" />
                      </div>
                      <span className="text-[9px] font-bold text-[#10141F] w-6 text-right">25%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                      <span className="text-[9px] font-semibold text-slate-500 w-16 shrink-0">Gold</span>
                      <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                        <motion.div initial={{ width: 0 }} whileInView={{ width: "15%" }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="h-full bg-blue-500 rounded-full" />
                      </div>
                      <span className="text-[9px] font-bold text-[#10141F] w-6 text-right">15%</span>
                    </div>
                  </div>
                  {/* Info callout */}
                  <div className="flex items-start gap-2 bg-orange-50 rounded-xl p-2.5 border border-orange-100">
                    <svg className="w-3.5 h-3.5 text-[#D9791A] mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" /></svg>
                    <span className="text-[9px] text-[#5B5955] leading-relaxed">
                      Understand how asset allocation drives over <strong className="text-[#10141F]">90%</strong> of return variance
                    </span>
                  </div>
                  {/* Bottom sub-cards */}
                  <div className="flex gap-2 pt-1">
                    <div className="flex-1 bg-white rounded-xl border border-slate-100 p-2.5 text-center">
                      <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">Portfolio overview</p>
                      <div className="flex justify-center gap-1 mt-1.5">
                        {[35, 55, 45, 65, 50].map((h, idx) => (
                          <motion.div key={idx} initial={{ height: 0 }} whileInView={{ height: h * 0.4 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: idx * 0.08 }} className="w-2.5 rounded-sm bg-gradient-to-t from-[#D9791A] to-[#E8A33D]" />
                        ))}
                      </div>
                    </div>
                    <div className="flex-1 bg-white rounded-xl border border-slate-100 p-2.5 text-center">
                      <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">55% Completed</p>
                      <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2 overflow-hidden">
                        <motion.div initial={{ width: 0 }} whileInView={{ width: "55%" }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="h-full bg-emerald-500 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* ═══ CARD 03 — Financial Literacy Focus (center, tall) ═══ */}
            <FadeIn delay={0.15} className="lg:col-span-4 lg:row-span-2">
              <div className="bg-white rounded-3xl border border-[#E7E1D8] p-6 sm:p-7 h-full shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">
                <div className="flex items-start gap-3 mb-3">
                  <span className="font-[family-name:var(--font-serif)] text-3xl font-light text-[#D9791A]/40 select-none leading-none">03</span>
                  <div>
                    <h3 className="font-[family-name:var(--font-outfit)] text-lg sm:text-xl font-bold text-[#10141F] leading-snug">
                      Financial Literacy Focus
                    </h3>
                    <p className="text-xs text-[#5B5955] mt-1.5 leading-relaxed">
                      We empower our clients with financial literacy, because an informed investor is a confident investor.
                    </p>
                  </div>
                </div>
                {/* Modular Finance Courses UI */}
                <div className="bg-[#FAFBFC] rounded-2xl border border-slate-100 p-4 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-bold text-[#10141F]">Modular Finance Courses</span>
                    <span className="text-[9px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">Module 01</span>
                  </div>
                  <div className="space-y-2.5 flex-1">
                    {[
                      { label: "Module 01: Basics", active: true },
                      { label: "Module 02: Wealth Building", active: false },
                      { label: "Module 03: Advanced Strategies", active: false },
                    ].map((mod, idx) => (
                      <div key={idx} className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-xs font-semibold transition-colors ${mod.active ? "bg-white border-[#D9791A]/20 text-[#10141F] shadow-sm" : "bg-white/60 border-slate-100 text-[#5B5955]"}`}>
                        <span>{mod.label}</span>
                        <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" /></svg>
                      </div>
                    ))}
                  </div>
                  {/* Progress row */}
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
                    <span className="text-[10px] font-semibold text-[#D9791A]">55% Completed</span>
                    <span className="text-[10px] font-semibold text-slate-400">Next: Variance</span>
                  </div>
                  {/* Certificate badge */}
                  <div className="flex items-center gap-2.5 mt-3 bg-orange-50 rounded-xl p-3 border border-orange-100">
                    <div className="w-8 h-8 rounded-full bg-[#D9791A]/10 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-[#D9791A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" /></svg>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-[#10141F]">Certificate</p>
                      <p className="text-[9px] text-[#5B5955]">Earn certification on completion</p>
                    </div>
                  </div>
                </div>
                {/* Bottom description */}
                <div className="mt-4 pt-4 border-t border-[#E7E1D8]">
                  <h4 className="text-sm font-bold text-[#10141F] mb-1">Financial Literacy Focus</h4>
                  <p className="text-xs text-[#5B5955] leading-relaxed">
                    We empower our clients with financial literacy&mdash;an informed investor is a confident investor.
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* ═══ CARD 04 — Ethical & Transparent Advisory (top-right) ═══ */}
            <FadeIn delay={0.2} className="lg:col-span-4 lg:row-span-1">
              <div className="bg-white rounded-3xl border border-[#E7E1D8] p-6 sm:p-7 h-full shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-start gap-3 mb-4">
                  <span className="font-[family-name:var(--font-serif)] text-3xl font-light text-[#D9791A]/40 select-none leading-none">04</span>
                  <div>
                    <h3 className="font-[family-name:var(--font-outfit)] text-lg sm:text-xl font-bold text-[#10141F] leading-snug">
                      Ethical & Transparent Advisory
                    </h3>
                    <p className="text-xs text-[#5B5955] mt-1.5 leading-relaxed">
                      Trust is the foundation of our relationship. No hidden charges, no last honest, transparent guidance.
                    </p>
                  </div>
                </div>
                {/* Transparency Matrix */}
                <div className="bg-[#FAFBFC] rounded-2xl border border-slate-100 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold text-[#10141F] uppercase tracking-wider">Transparency Matrix</span>
                  </div>
                  <div className="flex gap-2">
                    <div className="hidden sm:flex items-center">
                      <span className="text-[8px] font-bold text-slate-400 tracking-[0.15em] uppercase" style={{ writingMode: "vertical-lr", transform: "rotate(180deg)" }}>Key Principles</span>
                    </div>
                    <div className="flex-1 grid grid-cols-2 gap-2">
                    {[
                      "No Hidden Fees",
                      "Full Disclosure",
                      "Full Disclosure",
                      "Open-Forms & Preflist",
                    ].map((item, idx) => (
                      <div key={idx} className="bg-white rounded-xl border border-slate-100 px-3 py-3 text-center shadow-sm hover:border-[#D9791A]/20 transition-colors">
                        <span className="text-[10px] font-semibold text-[#10141F]">{item}</span>
                      </div>
                    ))}
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* ═══ CARD 02 — Goal-Oriented & Disciplined Investing (bottom-left) ═══ */}
            <FadeIn delay={0.25} className="lg:col-span-4 lg:row-span-1">
              <div className="bg-white rounded-3xl border border-[#E7E1D8] p-6 sm:p-7 h-full shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-start gap-3 mb-5">
                  <span className="font-[family-name:var(--font-serif)] text-3xl font-light text-[#D9791A]/40 select-none leading-none">02</span>
                  <h3 className="font-[family-name:var(--font-outfit)] text-lg sm:text-xl font-bold text-[#10141F] leading-snug">
                    Goal-Oriented &<br />Disciplined Investing
                  </h3>
                </div>
                {/* Goal Progress Mockup */}
                <div className="bg-[#FAFBFC] rounded-2xl border border-slate-100 p-4 space-y-3">
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { icon: "🏠", label: "Retirement", sublabel: "Goal Progress", pct: 72, color: "bg-[#D9791A]" },
                      { icon: "🏡", label: "Home", sublabel: "Goal Progress", pct: 45, color: "bg-emerald-500" },
                      { icon: "🎓", label: "Home", sublabel: "Goal Progress", pct: 88, color: "bg-blue-500" },
                    ].map((goal, idx) => (
                      <div key={idx} className="bg-white rounded-xl border border-slate-100 p-2.5 text-center shadow-sm">
                        <span className="text-lg">{goal.icon}</span>
                        <p className="text-[9px] font-bold text-[#10141F] mt-1">{goal.label}</p>
                        <p className="text-[7px] text-slate-400">{goal.sublabel}</p>
                        <div className="w-full bg-slate-100 rounded-full h-1.5 mt-1.5 overflow-hidden">
                          <motion.div initial={{ width: 0 }} whileInView={{ width: `${goal.pct}%` }} viewport={{ once: true }} transition={{ duration: 0.8, delay: idx * 0.1 }} className={`h-full ${goal.color} rounded-full`} />
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Steps */}
                  <div className="pt-2 border-t border-slate-100">
                    <p className="text-[9px] font-bold text-[#10141F] uppercase tracking-wider mb-2">Disciplined investing steps</p>
                    <div className="flex gap-2">
                      {[
                        { step: "Step 1", text: "Start SIP" },
                        { step: "Step 2", text: "Progress investing enrichment" },
                        { step: "Step 3", text: "Complete your Goaler" },
                      ].map((s, idx) => (
                        <div key={idx} className="flex-1 bg-white rounded-lg border border-slate-100 p-2 text-center">
                          <p className="text-[8px] font-bold text-[#D9791A]">{s.step}</p>
                          <p className="text-[7px] text-slate-500 mt-0.5 leading-snug">{s.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Card 03 already placed above as center tall card (lg:row-span-2) */}

            {/* ═══ CARD 05 — Continuous Support & Guidance (bottom-right) ═══ */}
            <FadeIn delay={0.3} className="lg:col-span-4 lg:row-span-1">
              <div className="bg-white rounded-3xl border border-[#E7E1D8] p-6 sm:p-7 h-full shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-start gap-3 mb-4">
                  <span className="font-[family-name:var(--font-serif)] text-3xl font-light text-[#D9791A]/40 select-none leading-none">05</span>
                  <h3 className="font-[family-name:var(--font-outfit)] text-lg sm:text-xl font-bold text-[#10141F] leading-snug">
                    Continuous<br />Support & Guidance
                  </h3>
                </div>
                {/* Chat Widget Mockup */}
                <div className="bg-[#FAFBFC] rounded-2xl border border-slate-100 p-4 space-y-2.5">
                  {/* Chat header */}
                  <div className="flex items-center justify-between bg-[#10141F] rounded-xl px-3.5 py-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-white">Customer support</p>
                        <p className="text-[8px] text-slate-400">Advisor advisor</p>
                      </div>
                    </div>
                    <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
                  </div>
                  {/* Chat messages */}
                  <div className="space-y-2 py-1">
                    <div className="flex justify-start">
                      <div className="bg-slate-100 rounded-xl rounded-tl-sm px-3 py-2 max-w-[75%]">
                        <p className="text-[9px] text-[#10141F] leading-relaxed">Hey, momen, we want to tell your market advisor?</p>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="bg-[#D9791A] rounded-xl rounded-tr-sm px-3 py-2 max-w-[75%]">
                        <p className="text-[9px] text-white leading-relaxed">Yooo completed a audit!</p>
                      </div>
                    </div>
                  </div>
                  {/* Availability */}
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="text-[8px] font-semibold text-emerald-600">Availability</span>
                    <span className="text-[8px] text-slate-400 ml-auto">Tues at 10 AM</span>
                  </div>
                  {/* Input */}
                  <div className="flex items-center gap-2 bg-white rounded-xl border border-slate-100 px-3 py-2">
                    <span className="text-[9px] text-slate-400 flex-1">Type a message...</span>
                    <svg className="w-3.5 h-3.5 text-[#D9791A]" fill="currentColor" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
                  </div>
                </div>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/*             TESTIMONIALS                   */}
      {/* ═══════════════════════════════════════════ */}
      <section className="section-padding bg-gradient-to-b from-transparent via-cyan-500/[0.015] to-transparent relative">
        <div className="max-w-6xl mx-auto">
          <FadeIn><p className="text-sm font-medium text-amber-400 tracking-widest uppercase mb-4 text-center">Testimonials</p></FadeIn>
          <FadeIn delay={0.05}>
            <h2 className="font-[family-name:var(--font-outfit)] text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-16 leading-tight">
              Trusted by <span className="gradient-text-amber">happy clients</span>
            </h2>
          </FadeIn>
          {/* Infinite Horizontal Marquee */}
          <div className="relative w-full overflow-hidden py-4">
            {/* Elegant Left/Right Gradient Fade Masks */}
            <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#F8FAFC] to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#F8FAFC] to-transparent z-10 pointer-events-none" />

            {/* Marquee Track - Duplicated once for seamless infinite loop */}
            <div className="flex flex-row flex-nowrap gap-6 animate-marquee hover:[animation-play-state:paused] w-max items-stretch">
              {[...testimonials, ...testimonials].map((t, i) => (
                <div key={i} className="w-[300px] sm:w-[400px] md:w-[450px] shrink-0 glass bento-glow glass-hover rounded-3xl p-8 md:p-10 relative flex flex-col justify-between">
                  <div>
                    {/* Large quote mark */}
                    <svg className="absolute top-8 right-8 w-16 h-16 text-indigo-500/[0.06]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                    {/* Stars */}
                    <div className="flex gap-1 mb-5">
                      {[...Array(5)].map((_, j) => (
                        <svg key={j} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-slate-700 font-medium leading-relaxed mb-8 text-sm sm:text-[15px]">&ldquo;{t.text}&rdquo;</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-500/20">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-[family-name:var(--font-outfit)] font-semibold text-slate-800">{t.name}</p>
                      <p className="text-xs text-slate-500">Verified Client</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/*        COMPOUNDING CALCULATOR              */}
      {/* ═══════════════════════════════════════════ */}
      <section id="calculator" className="section-padding">
        <div className="max-w-6xl mx-auto">
          <FadeIn><p className="text-sm font-medium text-indigo-400 tracking-widest uppercase mb-4 text-center">Interactive Tool</p></FadeIn>
          <FadeIn delay={0.05}>
            <h2 className="font-[family-name:var(--font-outfit)] text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-6 leading-tight">
              The power of <span className="gradient-text">compounding</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}><p className="text-lg text-slate-600 text-center max-w-2xl mx-auto mb-12 font-normal">See how a consistent SIP can grow exponentially over time. Start early, stay invested, and let compounding do the heavy lifting.</p></FadeIn>
          <FadeIn delay={0.15}><CompoundingCalculator /></FadeIn>
        </div>
      </section>



      {/* ═══════════════════════════════════════════ */}
      {/*          CINEMATIC CTA BANNER              */}
      {/* ═══════════════════════════════════════════ */}
      <section className="section-padding !py-12 bg-slate-50/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <FadeIn>
            <div className="relative rounded-[2.5rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/50 p-8 sm:p-12 lg:p-16 overflow-hidden">
              {/* Subtle Ambient Background Decorative Shapes */}
              <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-indigo-50/30 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-cyan-50/20 rounded-full blur-[100px] pointer-events-none" />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                {/* Left Content Column */}
                <div className="lg:col-span-7 space-y-6 sm:space-y-8">
                  {/* Trust Pill Badge */}
                  <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-orange-50/60 border border-orange-100/50 shadow-sm self-start">
                    <svg className="w-4 h-4 text-[#D9791A] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.109A11.386 11.386 0 0012 21c-2.829 0-5.437-.893-7.563-2.4a9.338 9.338 0 0113.813-2.493M14 9.75a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                    </svg>
                    <span className="text-xs font-bold text-[#C75A00]/90">Trusted by 500+ Indian Investors</span>
                    <div className="flex -space-x-2 overflow-hidden ml-1">
                      {[
                        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&h=80&q=80",
                        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80",
                        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&h=80&q=80",
                        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80&q=80"
                      ].map((url, idx) => (
                        <img
                          key={idx}
                          className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover shrink-0"
                          src={url}
                          alt=""
                        />
                      ))}
                      <div className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-orange-100 ring-2 ring-white text-[10px] font-bold text-[#C75A00] shrink-0">
                        +
                      </div>
                    </div>
                  </div>

                  {/* Main Title Heading */}
                  <h2 className="font-[family-name:var(--font-serif)] text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-slate-900 leading-[1.1] tracking-tight">
                    Ready to start your <br />
                    <span className="bg-gradient-to-r from-[#E8A33D] to-[#C9670A] bg-clip-text text-transparent">wealth journey?</span>
                  </h2>

                  {/* Subtext Description */}
                  <p className="text-base sm:text-lg text-[#5B5955] max-w-xl leading-relaxed font-normal">
                    Get personalized guidance from our team. We are here to help you make informed investment decisions and build lasting wealth.
                  </p>

                  {/* Button Panel */}
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <a
                      href={brand.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto bg-[#D9791A] hover:bg-[#C75A00] text-white font-bold py-4 px-8 rounded-2xl shadow-lg shadow-orange-600/20 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2.5 text-base cursor-pointer"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                      Chat on WhatsApp
                    </a>
                    <a
                      href={brand.angelOneAppLogin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto bg-transparent hover:bg-slate-50 text-[#D9791A] font-bold py-4 px-8 rounded-2xl border border-slate-200 hover:border-[#D9791A] transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2 text-base cursor-pointer"
                    >
                      Open Demat Account
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
                    </a>
                  </div>

                  {/* Credentials Row */}
                  <div className="flex flex-wrap items-center gap-y-4 gap-x-6 sm:gap-x-8 pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-3">
                      <span className="shrink-0 w-9 h-9 rounded-xl bg-orange-50 border border-orange-100/50 flex items-center justify-center text-[#D9791A] shadow-sm">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                        </svg>
                      </span>
                      <span className="text-[11px] sm:text-xs font-bold text-slate-500 leading-snug">
                        AMFI Registered<br /><span className="text-slate-700">Distributor</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="shrink-0 w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100/50 flex items-center justify-center text-emerald-500 shadow-sm">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <circle cx="12" cy="12" r="9" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      </span>
                      <span className="text-[11px] sm:text-xs font-bold text-slate-500 leading-snug">
                        Personalized<br /><span className="text-slate-700">Strategy</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="shrink-0 w-9 h-9 rounded-xl bg-amber-50 border border-amber-100/50 flex items-center justify-center text-amber-500 shadow-sm">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22" />
                        </svg>
                      </span>
                      <span className="text-[11px] sm:text-xs font-bold text-slate-500 leading-snug">
                        Long-term<br /><span className="text-slate-700">Wealth Focus</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Illustration and Stats Card Column */}
                <div className="lg:col-span-5 flex flex-col items-center gap-6">
                  {/* Floating 3D Illustration Graphic */}
                  <div className="relative w-full aspect-[4/3] flex items-center justify-center select-none">
                    {/* Circle Backdrop Glow */}
                    <div className="absolute w-72 h-72 rounded-full bg-slate-100/60 blur-[40px] pointer-events-none" />
                    
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                      className="relative w-full h-full max-w-[340px]"
                    >
                      <Image
                        src="/assets/images/cta-3d-graphic.png"
                        alt="Wealth Acumen Dashboard graphic"
                        fill
                        className="object-contain"
                        sizes="(max-width: 1024px) 100vw, 35vw"
                        priority
                      />
                    </motion.div>
                  </div>

                  {/* Horizontal 4-Column Stats Card */}
                  <div className="w-full bg-white rounded-2xl p-5 border border-slate-100 shadow-lg shadow-slate-100/80">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-4 sm:gap-y-0 divide-x-0 sm:divide-x divide-slate-100">
                      {/* Stat 1 */}
                      <div className="text-center px-1 sm:px-2">
                        <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-[#D9791A] mb-2 mx-auto shadow-sm">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.109A11.386 11.386 0 0012 21c-2.829 0-5.437-.893-7.563-2.4a9.338 9.338 0 0113.813-2.493M14 9.75a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                          </svg>
                        </div>
                        <p className="text-lg font-[family-name:var(--font-outfit)] font-black text-slate-800 tracking-tight">500+</p>
                        <p className="text-[10px] font-semibold text-slate-400 mt-0.5 leading-none">Happy Investors</p>
                      </div>

                      {/* Stat 2 */}
                      <div className="text-center px-1 sm:px-2">
                        <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 mb-2 mx-auto shadow-sm">
                          <span className="text-xs font-bold font-sans">₹</span>
                        </div>
                        <p className="text-lg font-[family-name:var(--font-outfit)] font-black text-slate-800 tracking-tight">₹100Cr+</p>
                        <p className="text-[10px] font-semibold text-slate-400 mt-0.5 leading-none">Assets Guided</p>
                      </div>

                      {/* Stat 3 */}
                      <div className="text-center px-1 sm:px-2">
                        <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 mb-2 mx-auto shadow-sm">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        </div>
                        <p className="text-lg font-[family-name:var(--font-outfit)] font-black text-slate-800 tracking-tight">4+</p>
                        <p className="text-[10px] font-semibold text-slate-400 mt-0.5 leading-none">Years Experience</p>
                      </div>

                      {/* Stat 4 */}
                      <div className="text-center px-1 sm:px-2">
                        <div className="w-8 h-8 rounded-full bg-cyan-50 flex items-center justify-center text-cyan-500 mb-2 mx-auto shadow-sm">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                          </svg>
                        </div>
                        <p className="text-lg font-[family-name:var(--font-outfit)] font-black text-slate-800 tracking-tight">98%</p>
                        <p className="text-[10px] font-semibold text-slate-400 mt-0.5 leading-none">Client Sat.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Floating Scroll-Triggered Opportunity Cost Notification */}
      <AnimatePresence>
        {showScrollAlert && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-6 left-6 z-40 max-w-sm w-[calc(100vw-3rem)] glass rounded-3xl p-5 border border-slate-200/80 shadow-2xl shadow-indigo-900/[0.08] font-sans flex items-start gap-4"
          >
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-500 shrink-0 mt-0.5 shadow-sm">
              <svg className="w-5 h-5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-[family-name:var(--font-outfit)] font-bold text-slate-900 pr-4">
                Procrastination is expensive!
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed mt-1">
                Delaying a ₹10,000 monthly SIP by just 1 year could cost you over <strong className="text-indigo-600 font-bold">₹5,00,000</strong> in lost potential compound wealth.
              </p>
              <div className="flex items-center gap-3 mt-3">
                <a
                  href="#calculator"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors"
                >
                  Calculate Loss
                </a>
                <span className="text-slate-300 text-[10px] select-none">&bull;</span>
                <a
                  href={brand.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-emerald-600 hover:text-emerald-750 transition-colors flex items-center gap-1"
                >
                  Consult Advisor &rarr;
                </a>
              </div>
            </div>
            <button
              onClick={dismissScrollAlert}
              className="absolute top-4 right-4 p-1 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
              aria-label="Close"
            >
              <svg className="w-3.5 h-3.5 text-slate-400 hover:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
