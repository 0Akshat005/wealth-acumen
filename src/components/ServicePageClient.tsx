"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { brand } from "@/config/brand";
import { services } from "@/config/content";

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

/* ─── Service Icons ─── */
const serviceIcons: Record<string, React.ReactNode> = {
  "bar-chart-2": (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
    </svg>
  ),
  "pie-chart": (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
    </svg>
  ),
  "shield-check": (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
    </svg>
  ),
  layers: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m6.115 5.19.319 1.913A6 6 0 0 0 8.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 0 0 2.288-4.042 1.087 1.087 0 0 0-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 0 1-.98-.314l-.295-.295a1.125 1.125 0 0 1 0-1.591l.13-.132a1.125 1.125 0 0 1 1.3-.21l.603.302a.809.809 0 0 0 1.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 0 0 1.528-1.732l.146-.292M6.115 5.19A9 9 0 1 0 17.18 4.64M6.115 5.19A8.965 8.965 0 0 1 12 3c1.929 0 3.716.607 5.18 1.64" />
    </svg>
  ),
  lock: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
    </svg>
  ),
  landmark: (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
    </svg>
  ),
};

/* ─── Sidebar Nav Links ─── */
function ServiceNav({ currentSlug }: { currentSlug: string }) {
  return (
    <nav className="glass rounded-2xl p-5">
      <h3 className="font-[family-name:var(--font-outfit)] text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
        All Services
      </h3>
      <ul className="space-y-1.5">
        {services.map((s) => (
          <li key={s.slug}>
            <Link
              href={`/services/${s.slug}`}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                s.slug === currentSlug
                  ? "bg-indigo-50 text-indigo-600 border border-indigo-200"
                  : "text-slate-600 hover:text-indigo-600 hover:bg-slate-50"
              }`}
            >
              {s.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/* ─── SERVICE PAGE CLIENT ─── */
export default function ServicePageClient({ slug }: { slug: string }) {
  const service = services.find((s) => s.slug === slug);

  if (!service) return null;

  const heroLineParts = service.heroLine.split(". ");
  const heroMain = heroLineParts[0];
  const heroSub = heroLineParts.slice(1).join(". ");

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-indigo-500/10 rounded-full blur-[128px] animate-pulse-glow" />
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-cyan-500/8 rounded-full blur-[128px] animate-pulse-glow" style={{ animationDelay: "2s" }} />
        </div>
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">


          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="font-[family-name:var(--font-outfit)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6"
          >
            <span className="gradient-text">{heroMain}</span>
            {heroSub && (
              <>
                <br className="hidden sm:block" />
                <span className="text-slate-800 text-2xl sm:text-3xl md:text-4xl font-semibold block mt-3">{heroSub}</span>
              </>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed"
          >
            {service.shortDescription}
          </motion.p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#F8FAFC] to-transparent" />
      </section>

      {/* ═══ CONTENT + SIDEBAR ═══ */}
      <section className="section-padding !pt-0">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_280px] gap-10">
            <div className="space-y-12">
              <FadeInSection>
                <div className="glass rounded-2xl p-8 md:p-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-1 h-8 rounded-full bg-gradient-to-b from-indigo-500 to-cyan-500" />
                    <h2 className="font-[family-name:var(--font-outfit)] text-2xl sm:text-3xl font-bold text-slate-900">
                      About {service.title}
                    </h2>
                  </div>
                  <p className="text-slate-600 leading-relaxed text-base md:text-lg">{service.fullDescription}</p>
                </div>
              </FadeInSection>

              <FadeInSection delay={0.1}>
                <div className="glass rounded-2xl p-8 md:p-10">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-1 h-8 rounded-full bg-gradient-to-b from-cyan-500 to-indigo-500" />
                    <h2 className="font-[family-name:var(--font-outfit)] text-2xl sm:text-3xl font-bold text-slate-900">Key Features</h2>
                  </div>
                  <ul className="space-y-4">
                    {service.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.5, delay: i * 0.06 }}
                        className="flex items-start gap-4 group"
                      >
                        <span className="shrink-0 w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center mt-0.5 shadow-sm">
                          <svg className="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                          </svg>
                        </span>
                        <span className="text-slate-700 leading-relaxed text-base">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </FadeInSection>
            </div>

            <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
              <FadeInSection delay={0.2}><ServiceNav currentSlug={service.slug} /></FadeInSection>
              <FadeInSection delay={0.3}>
                <div className="glass rounded-2xl p-6">
                  <h3 className="font-[family-name:var(--font-outfit)] text-base font-semibold text-slate-900 mb-3">Need guidance?</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-5">Reach out to us for personalized assistance with {service.title.toLowerCase()} investments.</p>
                  <a href={brand.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-primary text-sm inline-flex items-center gap-2 w-full justify-center !py-3">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                    Chat on WhatsApp
                  </a>
                </div>
              </FadeInSection>
              <FadeInSection delay={0.35}>
                <div className="glass rounded-2xl p-6">
                  <h3 className="font-[family-name:var(--font-outfit)] text-base font-semibold text-slate-900 mb-4">Credentials</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between"><span className="text-slate-500 font-medium">AMFI ARN</span><span className="text-slate-800 font-bold">{brand.amfiRegNo}</span></div>
                    <div className="h-px bg-slate-200" />
                    <div className="flex justify-between"><span className="text-slate-500 font-medium">EUIN</span><span className="text-slate-800 font-bold">{brand.euinNo}</span></div>
                    <div className="h-px bg-slate-200" />
                    <div className="flex justify-between"><span className="text-slate-500 font-medium">Partner</span><span className="text-slate-800 font-bold">Angel One</span></div>
                  </div>
                </div>
              </FadeInSection>
            </aside>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="section-padding !pt-4">
        <div className="max-w-4xl mx-auto">
          <FadeInSection>
            <div className="relative glass rounded-3xl p-10 md:p-16 text-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-cyan-500/10" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
              <div className="relative z-10">
                <h2 className="font-[family-name:var(--font-outfit)] text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                  Interested in {service.title}?
                </h2>
                <p className="text-slate-600 mb-8 max-w-xl mx-auto">
                  Get personalized guidance from our team. We are here to help you make informed investment decisions.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a href={brand.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-primary text-base inline-flex items-center gap-2.5 !px-8 !py-3.5">
                    Start Your Journey
                  </a>
                  <Link href="/" className="btn-secondary text-base inline-flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" /></svg>
                    Back to Home
                  </Link>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>
    </>
  );
}
