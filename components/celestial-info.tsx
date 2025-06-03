import React from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { 
  Sunrise, 
  Sunset, 
  Moon, 
  Sun, 
  Stars, 
  MoonStar, 
  Sparkles 
} from "lucide-react";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

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
    moonSign: {
      sign: string;
      element: string;
      description: string;
    };
  };
}

export function CelestialInfo({ moonPhaseData }: CelestialInfoProps) {
  if (!moonPhaseData) return null;

  const { zodiacSign, moonSign } = moonPhaseData;

  const getElementColor = (element: string): string => {
    switch (element.toLowerCase()) {
      case "fire": return "text-red-400";
      case "earth": return "text-emerald-400";
      case "air": return "text-sky-400";
      case "water": return "text-indigo-400";
      default: return "text-primary";
    }
  };

  const staggerItems = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
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
          <motion.div variants={item} className="flex items-center gap-4 bg-background/30 backdrop-blur-sm rounded-lg p-4">
            <div className="bg-primary/20 p-3 rounded-full">
              <Sun className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Sun Sign (Zodiac)</p>
              <p className="text-xl font-medium flex items-center">
                {zodiacSign.sign} 
                <span className="ml-2 text-lg">{zodiacSign.symbol}</span>
                <span className={cn("ml-2 text-sm", getElementColor(zodiacSign.element))}>
                  ({zodiacSign.element})
                </span>
              </p>
            </div>
          </motion.div>

          <motion.div variants={item} className="flex items-center gap-4 bg-background/30 backdrop-blur-sm rounded-lg p-4">
            <div className="bg-accent/20 p-3 rounded-full">
              <MoonStar className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Moon Sign</p>
              <p className="text-xl font-medium flex items-center">
                {moonSign.sign}
                <span className={cn("ml-2 text-sm", getElementColor(moonSign.element))}>
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

          <motion.div variants={item} className="mt-6">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="zodiac" className="border-muted">
                <AccordionTrigger className="text-md hover:no-underline hover:text-primary">
                  <div className="flex items-center">
                    <Stars className="mr-2 h-4 w-4" />
                    Zodiac Influence
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {zodiacSign.description}
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="moonsign" className="border-muted">
                <AccordionTrigger className="text-md hover:no-underline hover:text-primary">
                  <div className="flex items-center">
                    <Moon className="mr-2 h-4 w-4" />
                    Moon Sign Influence
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {moonSign.description}
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="moonphase" className="border-muted">
                <AccordionTrigger className="text-md hover:no-underline hover:text-primary">
                  <div className="flex items-center">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Birth Moon Phase Meaning
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Being born during a {moonPhaseData.phase.toLowerCase()} moon phase suggests 
                    {moonPhaseData.phase === "New Moon" && " a natural affinity for new beginnings and fresh starts. You may possess a pioneering spirit and the ability to initiate projects with enthusiasm. Your intuitive creativity is heightened during new cycles."}
                    {moonPhaseData.phase === "Waxing Crescent" && " you're a naturally growth-oriented person with a gift for building momentum. You likely excel at nurturing ideas from their earliest stages and have a persistent, determined nature."}
                    {moonPhaseData.phase === "First Quarter" && " you have a natural ability to overcome obstacles and push through challenges. Your decisiveness and action-oriented nature helps you make progress when others might hesitate."}
                    {moonPhaseData.phase === "Waxing Gibbous" && " you possess a detail-oriented and perfectionistic nature. You excel at refining and improving existing structures and have strong analytical abilities."}
                    {moonPhaseData.phase === "Full Moon" && " you have heightened emotional awareness and intuitive abilities. You likely possess strong interpersonal skills and a natural charisma that draws others to you."}
                    {moonPhaseData.phase === "Waning Gibbous" && " you have natural teaching abilities and a gift for communication. You excel at sharing knowledge and helping others understand complex concepts."}
                    {moonPhaseData.phase === "Last Quarter" && " you possess strong critical thinking skills and the ability to release what no longer serves you. You're naturally adept at transitions and letting go."}
                    {moonPhaseData.phase === "Waning Crescent" && " you have a contemplative nature and deep spiritual insights. You're comfortable with endings and the quiet space before new beginnings."}
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}