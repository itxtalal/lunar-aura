"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { toPng } from "html-to-image";
import { Check, Copy, Download, Facebook, Twitter } from "lucide-react";
import { useRef, useState } from "react";
import { MoonPhaseDisplay } from "@/components/moon-phase-display";

interface ShareSectionProps {
  birthDate?: Date;
  moonPhaseData: any;
  name?: string;
}

interface CharacteristicBadgeProps {
  text: string;
  color: string;
}

function CharacteristicBadge({ text, color }: CharacteristicBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm",
        "border border-white/10 shadow-lg",
        color
      )}
    >
      {text}
    </motion.div>
  );
}

export function ShareSection({
  birthDate,
  moonPhaseData,
  name,
}: ShareSectionProps) {
  const { toast } = useToast();
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  if (!birthDate || !moonPhaseData) return null;

  const formattedDate = format(birthDate, "MMMM d, yyyy");
  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/result?date=${format(
          birthDate,
          "yyyy-MM-dd"
        )}${name ? `&name=${encodeURIComponent(name)}` : ""}`
      : "";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast({
      title: "Link copied!",
      description: "Share link has been copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;

    try {
      const dataUrl = await toPng(cardRef.current, {
        quality: 0.95,
        backgroundColor: "#0f172a",
      });

      const link = document.createElement("a");
      link.download = `lunar-aura-${format(birthDate, "yyyy-MM-dd")}.png`;
      link.href = dataUrl;
      link.click();

      toast({
        title: "Image downloaded!",
        description: "Your lunar card has been saved",
      });
    } catch (error) {
      console.error("Error generating image:", error);
      toast({
        title: "Download failed",
        description: "There was an error generating your image",
        variant: "destructive",
      });
    }
  };

  const getCharacteristics = () => {
    const characteristics = [];

    // Add zodiac element characteristic
    characteristics.push({
      text: `${moonPhaseData.zodiacSign.element} Element`,
      color:
        moonPhaseData.zodiacSign.element.toLowerCase() === "fire"
          ? "bg-rose-900/40 text-rose-200 border-rose-700"
          : moonPhaseData.zodiacSign.element.toLowerCase() === "earth"
          ? "bg-emerald-900/40 text-emerald-200 border-emerald-700"
          : moonPhaseData.zodiacSign.element.toLowerCase() === "air"
          ? "bg-sky-900/40 text-sky-200 border-sky-700"
          : "bg-indigo-900/40 text-indigo-200 border-indigo-700", // Water
    });

    // Add moon phase characteristic
    const phaseTraits = {
      "New Moon": [
        {
          text: "Pioneering Spirit",
          color: "bg-purple-900/40 text-purple-200 border-purple-700",
        },
        {
          text: "Fresh Starts",
          color: "bg-purple-900/40 text-purple-200 border-purple-700",
        },
        {
          text: "Creative",
          color: "bg-purple-900/40 text-purple-200 border-purple-700",
        },
      ],
      "Waxing Crescent": [
        {
          text: "Growth-Oriented",
          color: "bg-blue-900/40 text-blue-200 border-blue-700",
        },
        {
          text: "Determined",
          color: "bg-blue-900/40 text-blue-200 border-blue-700",
        },
        {
          text: "Nurturing",
          color: "bg-blue-900/40 text-blue-200 border-blue-700",
        },
      ],
      "First Quarter": [
        {
          text: "Action-Driven",
          color: "bg-green-900/40 text-green-200 border-green-700",
        },
        {
          text: "Decisive",
          color: "bg-green-900/40 text-green-200 border-green-700",
        },
        {
          text: "Resilient",
          color: "bg-green-900/40 text-green-200 border-green-700",
        },
      ],
      "Waxing Gibbous": [
        {
          text: "Detail-Focused",
          color: "bg-yellow-900/40 text-yellow-200 border-yellow-700",
        },
        {
          text: "Analytical",
          color: "bg-yellow-900/40 text-yellow-200 border-yellow-700",
        },
        {
          text: "Perfectionist",
          color: "bg-yellow-900/40 text-yellow-200 border-yellow-700",
        },
      ],
      "Full Moon": [
        {
          text: "Intuitive",
          color: "bg-pink-900/40 text-pink-200 border-pink-700",
        },
        {
          text: "Emotionally Aware",
          color: "bg-pink-900/40 text-pink-200 border-pink-700",
        },
        {
          text: "Charismatic",
          color: "bg-pink-900/40 text-pink-200 border-pink-700",
        },
      ],
      "Waning Gibbous": [
        {
          text: "Knowledge-Sharing",
          color: "bg-orange-900/40 text-orange-200 border-orange-700",
        },
        {
          text: "Communicative",
          color: "bg-orange-900/40 text-orange-200 border-orange-700",
        },
        {
          text: "Teacher",
          color: "bg-orange-900/40 text-orange-200 border-orange-700",
        },
      ],
      "Last Quarter": [
        {
          text: "Transitional",
          color: "bg-red-900/40 text-red-200 border-red-700",
        }, // Using red for transition
        {
          text: "Critical Thinker",
          color: "bg-red-900/40 text-red-200 border-red-700",
        },
        {
          text: "Adaptable",
          color: "bg-red-900/40 text-red-200 border-red-700",
        },
      ],
      "Waning Crescent": [
        {
          text: "Contemplative",
          color: "bg-indigo-900/40 text-indigo-200 border-indigo-700",
        },
        {
          text: "Spiritual",
          color: "bg-indigo-900/40 text-indigo-200 border-indigo-700",
        },
        {
          text: "Reflective",
          color: "bg-indigo-900/40 text-indigo-200 border-indigo-700",
        },
      ],
    };

    // Add all moon phase traits
    characteristics.push(
      ...phaseTraits[moonPhaseData.phase as keyof typeof phaseTraits]
    );

    // Add zodiac sign specific traits
    const zodiacTraits = {
      Aries: [
        {
          text: "Courageous",
          color: "bg-rose-900/40 text-rose-200 border-rose-700",
        },
        {
          text: "Energetic",
          color: "bg-rose-900/40 text-rose-200 border-rose-700",
        },
      ],
      Taurus: [
        {
          text: "Reliable",
          color: "bg-emerald-900/40 text-emerald-200 border-emerald-700",
        },
        {
          text: "Patient",
          color: "bg-emerald-900/40 text-emerald-200 border-emerald-700",
        },
      ],
      Gemini: [
        {
          text: "Adaptable",
          color: "bg-sky-900/40 text-sky-200 border-sky-700",
        },
        { text: "Curious", color: "bg-sky-900/40 text-sky-200 border-sky-700" },
      ],
      Cancer: [
        {
          text: "Nurturing",
          color: "bg-indigo-900/40 text-indigo-200 border-indigo-700",
        },
        {
          text: "Intuitive",
          color: "bg-indigo-900/40 text-indigo-200 border-indigo-700",
        },
      ],
      Leo: [
        {
          text: "Confident",
          color: "bg-rose-900/40 text-rose-200 border-rose-700",
        },
        {
          text: "Creative",
          color: "bg-rose-900/40 text-rose-200 border-rose-700",
        },
      ],
      Virgo: [
        {
          text: "Analytical",
          color: "bg-emerald-900/40 text-emerald-200 border-emerald-700",
        },
        {
          text: "Practical",
          color: "bg-emerald-900/40 text-emerald-200 border-emerald-700",
        },
      ],
      Libra: [
        {
          text: "Diplomatic",
          color: "bg-sky-900/40 text-sky-200 border-sky-700",
        },
        {
          text: "Harmonious",
          color: "bg-sky-900/40 text-sky-200 border-sky-700",
        },
      ],
      Scorpio: [
        {
          text: "Intense",
          color: "bg-indigo-900/40 text-indigo-200 border-indigo-700",
        },
        {
          text: "Determined",
          color: "bg-indigo-900/40 text-indigo-200 border-indigo-700",
        },
      ],
      Sagittarius: [
        {
          text: "Adventurous",
          color: "bg-rose-900/40 text-rose-200 border-rose-700",
        },
        {
          text: "Optimistic",
          color: "bg-rose-900/40 text-rose-200 border-rose-700",
        },
      ],
      Capricorn: [
        {
          text: "Ambitious",
          color: "bg-emerald-900/40 text-emerald-200 border-emerald-700",
        },
        {
          text: "Disciplined",
          color: "bg-emerald-900/40 text-emerald-200 border-emerald-700",
        },
      ],
      Aquarius: [
        {
          text: "Innovative",
          color: "bg-sky-900/40 text-sky-200 border-sky-700",
        },
        {
          text: "Independent",
          color: "bg-sky-900/40 text-sky-200 border-sky-700",
        },
      ],
      Pisces: [
        {
          text: "Compassionate",
          color: "bg-indigo-900/40 text-indigo-200 border-indigo-700",
        },
        {
          text: "Imaginative",
          color: "bg-indigo-900/40 text-indigo-200 border-indigo-700",
        },
      ],
    };

    // Add zodiac sign traits
    characteristics.push(
      ...zodiacTraits[
        moonPhaseData.zodiacSign.sign as keyof typeof zodiacTraits
      ]
    );

    // Add moon sign element characteristic
    characteristics.push({
      text: `${moonPhaseData.moonSign.element} Moon`,
      color:
        moonPhaseData.moonSign.element.toLowerCase() === "fire"
          ? "bg-rose-900/40 text-rose-200 border-rose-700"
          : moonPhaseData.moonSign.element.toLowerCase() === "earth"
          ? "bg-emerald-900/40 text-emerald-200 border-emerald-700"
          : moonPhaseData.moonSign.element.toLowerCase() === "air"
          ? "bg-sky-900/40 text-sky-200 border-sky-700"
          : "bg-indigo-900/40 text-indigo-200 border-indigo-700", // Water
    });

    return characteristics;
  };

  return (
    <div className="glass-morphism rounded-xl p-6 md:p-8 relative overflow-hidden">
      <div className="absolute inset-0 aurora-gradient opacity-20"></div>
      <div className="relative z-10">
        <h2 className="text-2xl font-bold mb-6">Share Your Lunar Card</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div
            ref={cardRef}
            className="glass-morphism rounded-xl p-8 aspect-[4/5] flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute inset-0 aurora-gradient opacity-30"></div>
            <div className="relative z-10 flex flex-col h-full">
              <div className="text-center mb-8">
                <h3 className="text-lg font-semibold text-primary">
                  LunarAura
                </h3>
                <p className="text-sm text-muted-foreground">
                  Birth Moon Reading
                </p>
              </div>

              {name && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-center mb-6"
                >
                  <h4 className="text-3xl font-bold text-primary/90 tracking-wide">
                    {name}
                  </h4>
                </motion.div>
              )}

              <div className="flex flex-col items-center justify-center flex-grow mb-6">
                {/* Moon Phase Icon/Symbol */}
                <div className="w-32 h-32 rounded-full bg-background/50 backdrop-blur-sm flex items-center justify-center mb-6 border border-white/10 shadow-inner">
                  <MoonPhaseDisplay moonPhaseData={moonPhaseData} />
                </div>
                <h3 className="text-3xl font-bold text-white mt-6 mb-2">
                  {moonPhaseData.phase}
                </h3>
                <p className="text-muted-foreground text-base">
                  {Math.round(moonPhaseData.illumination * 100)}% Illumination
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center mb-8">
                <div>
                  <p className="text-xs text-muted-foreground">Sun Sign</p>
                  <p className="text-sm font-medium text-white">
                    {moonPhaseData.zodiacSign.sign}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Moon Sign</p>
                  <p className="text-sm font-medium text-white">
                    {moonPhaseData.moonSign.sign}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Birth Date</p>
                  <p className="text-sm font-medium text-white">
                    {formattedDate}
                  </p>
                </div>
              </div>

              {/* Characteristics Section */}
              <div className="mt-auto pt-6 border-t border-white/10">
                <h4 className="text-sm font-semibold mb-3 text-white/80">
                  Characteristics
                </h4>
                <div className="flex flex-wrap gap-2 justify-center">
                  {getCharacteristics().map((char, index) => (
                    <CharacteristicBadge
                      key={index}
                      text={char.text}
                      color={char.color}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 text-center">
              <p className="text-xs text-muted-foreground">
                Generated by LunarAura
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Share Your Lunar Profile
              </h3>
              <p className="text-lg text-muted-foreground mb-4">
                Download your personalized lunar card or share it with friends.
              </p>
            </div>

            <div className="space-y-3 text-lg">
              <Button
                onClick={handleDownload}
                className="w-full bg-primary hover:bg-primary/90"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Image
              </Button>

              <Button
                onClick={handleCopyLink}
                variant="outline"
                className="w-full"
              >
                {copied ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Share Link
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
