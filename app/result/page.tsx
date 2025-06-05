"use client";

import { CelestialInfo } from "@/components/celestial-info";
import { Header } from "@/components/header";
import { MoonPhaseDisplay } from "@/components/moon-phase-display";
import { ParallaxStars } from "@/components/parallax-stars";
import { ParticlesBackground } from "@/components/particles-background";
import { ShareSection } from "@/components/share-section";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  getMoonPhase,
  getMoonSign,
  getZodiacSign,
} from "@/lib/celestial-utils";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { ArrowLeft, Share2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CelestialInfluences } from "@/components/celestial-influences";
import { ShareButton } from "@/components/share-button";

export default function ResultPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dateParam = searchParams.get("date");
  const nameParam = searchParams.get("name");
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
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Parse the date string and create a local date
        const [year, month, day] = dateParam.split("-").map(Number);
        const birthDate = new Date(year, month - 1, day); // month is 0-based in JS Date

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
    ? (() => {
        const [year, month, day] = dateParam.split("-").map(Number);
        const date = new Date(year, month - 1, day);
        return format(date, "MMMM d, yyyy");
      })()
    : "";

  // Calculate share URL
  const shareUrl = dateParam
    ? typeof window !== "undefined"
      ? `${window.location.origin}/result?date=${dateParam}${
          nameParam ? `&name=${encodeURIComponent(nameParam)}` : ""
        }`
      : ""
    : "";

  return (
    <div className="container pt-32 pb-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">
          {nameParam ? `${nameParam}'s` : "Your"} Lunar Birth Chart
        </h1>
        <p className="text-lg text-muted-foreground">
          {isLoading ? (
            <Skeleton className="h-6 w-48 rounded-md" />
          ) : (
            `Birth Date: ${formattedDate}`
          )}
        </p>
        {!isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-4 w-fit"
          >
            <ShareButton shareUrl={shareUrl} />
          </motion.div>
        )}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {isLoading ? (
            <div
              className="glass-morphism rounded-xl p-6 md:p-8 flex items-center justify-center"
              style={{ minHeight: "400px" }}
            >
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">
                  Calculating lunar position...
                </p>
              </div>
            </div>
          ) : (
            <div className="glass-morphism rounded-xl p-6 md:p-8 relative overflow-hidden">
              <div className="absolute inset-0 aurora-gradient opacity-20"></div>
              <div className="relative z-10">
                <div className="flex flex-col items-center">
                  <MoonPhaseDisplay
                    moonPhaseData={moonPhaseData}
                    canvasStyles="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80"
                  />

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-center mb-4"
                  >
                    <h2 className="text-2xl font-serif font-bold mb-2">
                      {moonPhaseData.phase}
                    </h2>
                    <p className="text-muted-foreground">
                      {moonPhaseData.phaseDescription}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="grid grid-cols-2 gap-4 w-full"
                  >
                    <div className="bg-background/30 backdrop-blur-sm rounded-lg p-4 text-center">
                      <p className="text-sm text-muted-foreground mb-1">
                        Illumination
                      </p>
                      <p className="text-xl font-medium">
                        {Math.round(moonPhaseData.illumination * 100)}%
                      </p>
                    </div>
                    <div className="bg-background/30 backdrop-blur-sm rounded-lg p-4 text-center">
                      <p className="text-sm text-muted-foreground mb-1">
                        Lunar Age
                      </p>
                      <p className="text-xl font-medium">
                        {Math.round((moonPhaseData.phaseAngle / 360) * 29.53)}{" "}
                        days
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {isLoading ? (
            <div className="glass-morphism rounded-xl p-6 md:p-8">
              <Skeleton className="h-8 w-48 mb-6 rounded-md" />
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-24 w-full rounded-xl" />
                ))}
              </div>
            </div>
          ) : (
            <CelestialInfo moonPhaseData={moonPhaseData} />
          )}
        </motion.div>
      </div>

      {!isLoading && (
        <>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8"
          >
            <CelestialInfluences moonPhaseData={moonPhaseData} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8"
          >
            <ShareSection
              birthDate={dateParam ? new Date(dateParam) : undefined}
              moonPhaseData={moonPhaseData}
              name={nameParam || undefined}
            />
          </motion.div>
        </>
      )}
    </div>
  );
}
