"use client";

import { cn } from "@/lib/utils";
import { Moon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-md py-2 shadow-md"
          : "bg-transparent py-4"
      )}
    >
      <div className="container flex items-center justify-center">
        <Link href="/" className="flex items-center space-x-2">
          <Moon className="h-8 w-8 text-primary" />
          <span className="font-serif text-2xl font-bold tracking-tight">
            LunarAura
          </span>
        </Link>
      </div>
    </header>
  );
}
