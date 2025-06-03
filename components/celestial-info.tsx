import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { MoonStar, Sun, Sunrise, Sunset } from "lucide-react";

interface CelestialInfoProps {
  moonPhaseData: {
    date: Date;
    phase: string;
    moonrise: string;
    moonset: string;
    zodiacSign: {
      sign: string;
      symbol: string;
      element: string;
      description: string;
    };
    moonSign: { sign: string; element: string; description: string };
  };
}

export function CelestialInfo({ moonPhaseData }: CelestialInfoProps) {
  if (!moonPhaseData) return null;

  const { zodiacSign, moonSign } = moonPhaseData;

  const getElementColor = (element: string): string => {
    switch (element.toLowerCase()) {
      case "fire":
        return "text-red-400";
      case "earth":
        return "text-emerald-400";
      case "air":
        return "text-sky-400";
      case "water":
        return "text-indigo-400";
      default:
        return "text-primary";
    }
  };

  const staggerItems = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="glass-morphism rounded-xl p-6 md:p-8 relative overflow-hidden h-full">
      <div className="absolute inset-0 aurora-gradient opacity-20"></div>
      <div className="relative z-10">
        <h2 className="text-2xl font-serif font-bold mb-6">
          Your Celestial Profile
        </h2>

        <motion.div
          variants={staggerItems}
          initial="hidden"
          animate="show"
          className="space-y-4"
        >
          <motion.div
            variants={item}
            className="flex items-center gap-4 bg-background/30 backdrop-blur-sm rounded-lg p-4"
          >
            <div className="bg-primary/20 p-3 rounded-full">
              <Sun className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Sun Sign (Zodiac)</p>
              <p className="text-xl font-medium flex items-center">
                {zodiacSign.sign}
                <span className="ml-2 text-lg">{zodiacSign.symbol}</span>
                <span
                  className={cn(
                    "ml-2 text-sm",
                    getElementColor(zodiacSign.element)
                  )}
                >
                  ({zodiacSign.element})
                </span>
              </p>
            </div>
          </motion.div>

          <motion.div
            variants={item}
            className="flex items-center gap-4 bg-background/30 backdrop-blur-sm rounded-lg p-4"
          >
            <div className="bg-accent/20 p-3 rounded-full">
              <MoonStar className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Moon Sign</p>
              <p className="text-xl font-medium flex items-center">
                {moonSign.sign}
                <span
                  className={cn(
                    "ml-2 text-sm",
                    getElementColor(moonSign.element)
                  )}
                >
                  ({moonSign.element})
                </span>
              </p>
            </div>
          </motion.div>

          <motion.div variants={item} className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 bg-background/30 backdrop-blur-sm rounded-lg p-4">
              <Sunrise className="h-5 w-5 text-chart-4" />
              <div>
                <p className="text-xs text-muted-foreground">Moonrise</p>
                <p className="text-sm font-medium">
                  {moonPhaseData.moonrise || "Not visible"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-background/30 backdrop-blur-sm rounded-lg p-4">
              <Sunset className="h-5 w-5 text-chart-5" />
              <div>
                <p className="text-xs text-muted-foreground">Moonset</p>
                <p className="text-sm font-medium">
                  {moonPhaseData.moonset || "Not visible"}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
