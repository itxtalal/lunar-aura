import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/footer";
import { ParallaxStars } from "@/components/parallax-stars";
import { ParticlesBackground } from "@/components/particles-background";
import { Header } from "@/components/header";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "LunarAura | Discover Your Lunar Destiny",
    template: "%s | LunarAura",
  },
  description:
    "Discover your lunar birth chart. Uncover the moon's secrets on the day you were born and explore your celestial connections.",
  metadataBase: new URL("https://lunar-aura.vercel.app/"),
  keywords: [
    "lunar birth chart",
    "moon phase",
    "astrology",
    "birth chart reading",
    "celestial influences",
    "zodiac sign",
    "moon sign",
  ],
  openGraph: {
    title: "LunarAura - Discover Your Birth Moon Phase",
    description:
      "Uncover the moon's secrets on the day you arrived and explore your celestial connections.",
    url: "https://lunar-aura.vercel.app/",
    siteName: "LunarAura",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "LunarAura - Birth Moon Chart",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LunarAura - Discover Your Birth Moon Phase",
    description:
      "Uncover the moon's secrets on the day you arrived and explore your celestial connections.",
    creator: "@yourtwitterhandle",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${playfair.variable} ${inter.variable} font-sans`}>
        <main className="relative min-h-screen overflow-hidden">
          <ParallaxStars />
          <ParticlesBackground />
          <div className="relative z-10">
            <Header />
            {children}
          </div>
        </main>
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
