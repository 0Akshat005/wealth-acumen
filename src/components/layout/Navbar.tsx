"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { brand } from "@/config/brand";

const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "About Us",
    href: "/about",
    children: [
      { label: "About Us", href: "/about" },
      { label: "Proprietor", href: "/about#proprietor" },
      { label: "FAQs", href: "/faq" },
      { label: "DIY (Do It Yourself)", href: "/diy" },
    ],
  },
  {
    label: "Services",
    href: "/services/equity",
    children: [
      { label: "Equity", href: "/services/equity" },
      { label: "Mutual Funds", href: "/services/mutual-funds" },
      { label: "Insurance", href: "/services/insurance" },
      { label: "ETFs", href: "/services/etfs" },
      { label: "Bonds", href: "/services/bonds" },
      { label: "Fixed Deposit", href: "/services/fixed-deposit" },
    ],
  },
  {
    label: "Learning",
    href: "/learning/e-book",
    children: [{ label: "Free E-Book", href: "/learning/e-book" }],
  },
  {
    label: "Downloads",
    href: "/downloads",
    children: [
      { label: "KYC/FATCA Forms", href: "/downloads" },
      { label: "MF Factsheet", href: brand.amfiFactsheet },
      { label: "Mutual Fund Taxation", href: brand.amfiTaxation },
    ],
  },
  { label: "Blogs", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

const loginLinks = [
  { label: "App Login", href: brand.angelOneAppLogin },
  { label: "Demat-Free MF Login", href: brand.dematFreeMFLogin },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showAnnouncement, setShowAnnouncement] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const dismissed = localStorage.getItem("wealth_acumen_announcement_dismissed");
    if (!dismissed) {
      setTimeout(() => {
        setShowAnnouncement(true);
      }, 0);
    }
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const dismissAnnouncement = () => {
    setShowAnnouncement(false);
    localStorage.setItem("wealth_acumen_announcement_dismissed", "true");
  };

  const currentMonthName = new Date().toLocaleString("en-US", { month: "long" });

  return (
    <>
      <AnimatePresence>
        {showAnnouncement && (
          <motion.div
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 right-0 z-[55] h-10 bg-black text-white flex items-center justify-between px-4 text-xs sm:text-sm font-sans"
          >
            <div className="flex-1 flex items-center justify-center gap-2">
              <span className="text-[#D9791A] text-base leading-none select-none">★</span>
              <span className="text-[#EFEEEB] font-medium hidden md:inline">
                LIMITED OFFER: July Portfolio Audit Cycle – Only 4 complimentary reviews left this week.
              </span>
              <span className="text-[#EFEEEB] font-medium inline md:hidden text-[10px] sm:text-[11px] truncate max-w-[45vw]">
                Portfolio Audit: 4 free slots left
              </span>
              <a
                href={brand.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#D9791A] hover:bg-[#C75A00] text-[#10141F] font-bold py-1 px-3.5 rounded-full text-xs transition-colors shrink-0 whitespace-nowrap ml-1 shadow-sm"
              >
                Claim Free Slot &rarr;
              </a>
            </div>
            <button
              onClick={dismissAnnouncement}
              className="p-1 hover:bg-white/10 rounded-full transition-colors shrink-0 ml-2"
              aria-label="Dismiss"
            >
              <svg className="w-4 h-4 text-slate-400 hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <nav
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
          showAnnouncement ? "top-10" : "top-0"
        } ${
          scrolled
            ? "bg-white border-b border-[#E7E1D8] shadow-md shadow-[#10141F]/[0.03]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-none mx-auto px-4 sm:px-10 lg:px-16 xl:px-20">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo lockup matching screenshot */}
            <Link href="/" className="flex items-center gap-3 shrink-0">
              <div className="relative w-[45px] h-[35px] overflow-hidden shrink-0">
                <div className="absolute top-[-1px] left-0 w-full h-[130%]">
                  <Image
                    src="/assets/logo/logo.png"
                    alt="Wealth Acumen"
                    fill
                    className="object-contain object-top"
                    priority
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-[family-name:var(--font-outfit)] font-extrabold text-[21px] text-[#10141F] tracking-tight leading-none">
                  Wealth Acumen
                </span>
                <span className="text-[9px] font-bold text-[#5B5955] tracking-[0.16em] uppercase mt-1 leading-none">
                  INVEST RIGHT, PROSPER BRIGHT
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1 h-full">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
                return (
                  <div
                    key={link.label}
                    className="relative h-full flex items-center"
                    onMouseEnter={() =>
                      link.children && setActiveDropdown(link.label)
                    }
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Link
                      href={link.href}
                      className={`px-3 py-2 text-[16px] font-semibold tracking-wide transition-colors flex items-center gap-1 relative ${
                        isActive ? "text-[#D9791A]" : "text-[#10141F] hover:text-[#D9791A]"
                      }`}
                    >
                      {link.label}
                      {link.children && (
                        <svg
                          className={`w-3 h-3 transition-transform ${
                            activeDropdown === link.label ? "rotate-180" : ""
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      )}
                      {isActive && (
                        <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#D9791A] rounded-full" />
                      )}
                    </Link>

                    <AnimatePresence>
                      {link.children && activeDropdown === link.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.96 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-1 w-56 py-2 rounded-xl bg-white border border-[#E7E1D8] shadow-lg shadow-[#10141F]/[0.06]"
                        >
                          {link.children.map((child) => {
                            const isExternal = child.href.startsWith("http");
                            const Tag = isExternal ? "a" : Link;
                            return (
                              <Tag
                                key={child.label}
                                href={child.href}
                                {...(isExternal
                                  ? { target: "_blank", rel: "noopener noreferrer" }
                                  : {})}
                                className="block px-4 py-2.5 text-sm font-medium text-[#5B5955] hover:text-[#D9791A] hover:bg-slate-50 transition-colors"
                                onClick={() => setActiveDropdown(null)}
                              >
                                {child.label}
                              </Tag>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Desktop Action Cluster */}
            <div className="hidden lg:flex items-center gap-3">
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown("login")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="px-4 py-2 text-sm font-semibold text-[#10141F] hover:text-[#D9791A] bg-[#EFEEEB] hover:bg-[#E2E1DE] transition-colors rounded-full flex items-center gap-1.5 shadow-sm border border-slate-200/50">
                  Login / Register
                  <svg
                    className={`w-3.5 h-3.5 transition-transform ${
                      activeDropdown === "login" ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <AnimatePresence>
                  {activeDropdown === "login" && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full right-0 mt-1 w-56 py-2 rounded-xl bg-white border border-[#E7E1D8] shadow-lg shadow-[#10141F]/[0.06]"
                    >
                      {loginLinks.map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block px-4 py-2.5 text-sm font-medium text-[#5B5955] hover:text-[#D9791A] hover:bg-slate-50 transition-colors"
                        >
                          {item.label}
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <a
                href={brand.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#D9791A] hover:bg-[#C75A00] text-white font-bold py-2 px-5 rounded-full inline-flex items-center gap-2 text-sm transition-all duration-300 transform hover:scale-[1.02] shadow-md shadow-orange-600/10 cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Us
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span
                  className={`block h-0.5 w-6 bg-slate-900 rounded-full transition-all duration-300 ${
                    mobileOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-6 bg-slate-900 rounded-full transition-all duration-300 ${
                    mobileOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-6 bg-slate-900 rounded-full transition-all duration-300 ${
                    mobileOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white border-l border-slate-200 overflow-y-auto flex flex-col"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 shrink-0">
                <Link href="/" className="flex items-center gap-2.5" onClick={() => setMobileOpen(false)}>
                  <div className="relative w-[36px] h-[28px] overflow-hidden shrink-0">
                    <div className="absolute top-[-1px] left-0 w-full h-[130%]">
                      <Image
                        src={brand.logo}
                        alt="Wealth Acumen"
                        fill
                        className="object-contain object-top"
                        priority
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-[family-name:var(--font-outfit)] font-extrabold text-[16px] text-[#10141F] tracking-tight leading-none">
                      Wealth Acumen
                    </span>
                    <span className="text-[7px] font-bold text-[#5B5955] tracking-[0.16em] uppercase mt-0.5 leading-none">
                      INVEST RIGHT, PROSPER BRIGHT
                    </span>
                  </div>
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 -mr-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-6 space-y-2 overflow-y-auto flex-1">
                {navLinks.map((link) => (
                  <div key={link.label}>
                    <Link
                      href={link.href}
                      className="block px-4 py-3 text-base font-medium text-slate-700 hover:text-[#D9791A] hover:bg-slate-50 rounded-lg transition-colors"
                      onClick={() => !link.children && setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                    {link.children && (
                      <div className="ml-4 border-l border-slate-100 pl-4 space-y-1 mt-1 mb-2">
                        {link.children.map((child) => {
                          const isExternal = child.href.startsWith("http");
                          const Tag = isExternal ? "a" : Link;
                          return (
                            <Tag
                              key={child.label}
                              href={child.href}
                              {...(isExternal
                                ? {
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                  }
                                : {})}
                              className="block px-3 py-2 text-sm text-slate-500 hover:text-[#D9791A] hover:bg-slate-50 rounded-lg transition-colors"
                              onClick={() => setMobileOpen(false)}
                            >
                              {child.label}
                            </Tag>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}

                <div className="pt-4 border-t border-slate-100 space-y-2">
                  <p className="px-4 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    Login / Register
                  </p>
                  {loginLinks.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-4 py-2.5 text-sm text-slate-600 hover:text-[#D9791A] hover:bg-slate-50 rounded-lg transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>

                <div className="pt-4">
                  <a
                    href={brand.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full text-center block text-sm"
                    onClick={() => setMobileOpen(false)}
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
