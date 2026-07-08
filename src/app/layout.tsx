import type { Metadata } from "next";
import { Inter, Outfit, Hanken_Grotesk, JetBrains_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-hanken-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Wealth Acumen | Personalized Investment Solutions for Long-Term Wealth",
  description:
    "Choose Wealth Acumen for personalized strategies, trusted insights, ethical guidance, and steady, long-term wealth growth. AMFI Registered Mutual Fund Distributor.",
  keywords: [
    "wealth acumen",
    "mutual fund distributor",
    "investment services",
    "equity",
    "mutual funds",
    "insurance",
    "ETFs",
    "bonds",
    "fixed deposit",
    "SIP",
    "Angel One",
    "AMFI registered",
    "financial planning India",
  ],
  authors: [{ name: "Wealth Acumen" }],
  openGraph: {
    title: "Wealth Acumen | Personalized Investment Solutions",
    description:
      "Personalized strategies, trusted insights, and ethical guidance for long-term wealth growth.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} ${hankenGrotesk.variable} ${jetbrainsMono.variable} ${playfair.variable} antialiased`}
      style={{ colorScheme: "light" }}
    >
      <body className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A] noise-overlay">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
