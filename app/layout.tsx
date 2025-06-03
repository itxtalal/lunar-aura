import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "LunarAura - Discover Your Birth Moon Phase",
  description:
    "Uncover the moon's secrets on the day you arrived and explore your celestial connections.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${playfair.variable} ${inter.variable} font-sans`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
