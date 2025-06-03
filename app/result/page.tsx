"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { Header } from "@/components/header";
import { ParallaxStars } from "@/components/parallax-stars";
import { ParticlesBackground } from "@/components/particles-background";
import { MoonPhaseDisplay } from "@/components/moon-phase-display";
import { CelestialInfo } from "@/components/celestial-info";
import { ShareSection } from "@/components/share-section";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { getMoonPhase, getZodiacSign, getMoonSign } from "@/lib/celestial-utils";
import { Skeleton } from "@/components/ui/skeleton";

export default function ResultPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dateParam = searchParams.get("date");
  const [isLoading, setIsLoading] = useState(true);
  const [moonPhaseData, setMoonPhaseData] = useState<any>(null);

  useEffect(() => {
    if (!dateParam) {
      router.push("/");
      return;
    }

    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        const birthDate = new Date(dateParam);
        
        // Calculate moon phase and other celestial data
        const moonPhase = getMoonPhase(birthDate);
        const zodiacSign = getZodiacSign(birthDate);
        const moonSign = getMoonSign(birthDate);
        
        setMoonPhaseData({
          date: birthDate,
          phase: moonPhase.phase,
          illumination: moonPhase.illumination,
          phaseAngle: moonPhase.phaseAngle,
          phaseDescription: moonPhase.description,
          moonrise: moonPhase.moonrise,
          moonset: moonPhase.moonset,
          zodiacSign,
          moonSign,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dateParam, router]);

  const formattedDate = dateParam 
    ? format(new Date(dateParam), "MMMM d, yyyy")
    : "";

  return (
    <main className="relative min-h-screen overflow-hidden">
      <ParallaxStars />
      <ParticlesBackground />
      <div className="relative z-10">
        <Header />
        
        <div className="container pt-32 pb-16 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="mb-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">
              Your Lunar Birth Chart
            </h1>
            <p className="text-lg text-muted-foreground">
              {isLoading ? (
                <Skeleton className="h-6 w-48" />
              ) : (
                `Birth Date: ${formattedDate}`
              )}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {isLoading ? (
                <div className="glass-morphism rounded-xl p-6 md:p-8 flex items-center justify-center\" style={{ minHeight: "400px" }}>
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Calculating lunar position...</p>
                  </div>
                </div>
              ) : (
                <MoonPhaseDisplay moonPhaseData={moonPhaseData} />
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {isLoading ? (
                <div className="glass-morphism rounded-xl p-6 md:p-8">
                  <Skeleton className="h-8 w-48 mb-6" />
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <Skeleton key={i} className="h-24 w-full" />
                    ))}
                  </div>
                </div>
              ) : (
                <CelestialInfo moonPhaseData={moonPhaseData} />
              )}
            </motion.div>
          </div>

          {!isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8"
            >
              <ShareSection birthDate={dateParam ? new Date(dateParam) : undefined} moonPhaseData={moonPhaseData} />
            </motion.div>
          )}
        </div>
      </div>
    </main>
  );
}