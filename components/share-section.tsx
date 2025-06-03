"use client";

import { CharacteristicBadge } from "@/components/characteristic-badge";
import { MoonPhaseDisplay } from "@/components/moon-phase-display";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { toPng } from "html-to-image";
import { Check, Copy, Download } from "lucide-react";
import { useRef, useState } from "react";

interface ShareSectionProps {
  birthDate?: Date;
  moonPhaseData: any;
  name?: string;
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
        quality: 1,
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
          : "bg-indigo-900/40 text-indigo-200 border-indigo-700",
    });

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
          : "bg-indigo-900/40 text-indigo-200 border-indigo-700",
    });

    return characteristics;
  };

  return (
    <div className="glass-morphism rounded-xl p-4 md:p-6 lg:p-8 relative overflow-hidden border border-white/10">
      {/* Background gradient */}
      <div className="absolute inset-0 aurora-gradient opacity-20"></div>

      <div className="relative z-10">
        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-white text-center md:text-left">
          Share Your Lunar Card
        </h2>

        {/* Mobile-first layout */}
        <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-8">
          {/* Lunar Card */}
          <div
            ref={cardRef}
            className="glass-morphism rounded-xl p-4 md:p-6 lg:p-8 relative overflow-hidden border border-white/20 mx-auto max-w-sm lg:max-w-none"
          >
            {/* Card background */}
            <div className="absolute inset-0 aurora-gradient opacity-30"></div>

            <div className="relative z-10 flex flex-col h-full min-h-[500px] md:min-h-[600px]">
              {/* Header */}
              <div className="text-center mb-6 md:mb-8">
                <h3 className="text-base md:text-lg font-semibold text-purple-300">
                  LunarAura
                </h3>
                <p className="text-xs md:text-sm text-white/60">
                  Birth Moon Reading
                </p>
              </div>

              {/* Name */}
              {name && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-center mb-4 md:mb-6"
                >
                  <h4 className="text-xl md:text-2xl lg:text-3xl font-bold text-white tracking-wide">
                    {name}
                  </h4>
                </motion.div>
              )}

              {/* Moon Phase Display */}
              <div className="flex flex-col items-center justify-center flex-grow mb-4 md:mb-6">
                <div className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center my-7 md:my-12 border border-white/10 shadow-inner">
                  <MoonPhaseDisplay moonPhaseData={moonPhaseData} />
                </div>
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 text-center">
                  {moonPhaseData.phase}
                </h3>
                <p className="text-white/60 text-sm md:text-base text-center">
                  {Math.round(moonPhaseData.illumination * 100)}% Illumination
                </p>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-3 gap-2 md:gap-4 text-center mb-4 md:mb-6">
                <div>
                  <p className="text-xs text-white/50">Sun Sign</p>
                  <p className="text-xs md:text-sm font-medium text-white">
                    {moonPhaseData.zodiacSign.sign}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-white/50">Moon Sign</p>
                  <p className="text-xs md:text-sm font-medium text-white">
                    {moonPhaseData.moonSign.sign}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-white/50">Birth Date</p>
                  <p className="text-xs md:text-sm font-medium text-white">
                    {birthDate.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              {/* Characteristics */}
              <div className="mt-auto pt-4 md:pt-6 border-t border-white/10">
                <h4 className="text-xs md:text-sm font-semibold mb-2 md:mb-3 text-white/80 text-center">
                  Characteristics
                </h4>
                <div className="flex flex-wrap gap-1 md:gap-2 justify-center">
                  {getCharacteristics()
                    .slice(0, 6)
                    .map((char, index) => (
                      <CharacteristicBadge
                        key={index}
                        text={char.text}
                        color={char.color}
                      />
                    ))}
                </div>
              </div>

              {/* Footer */}
              <div className="mt-4 text-center">
                <p className="text-xs text-white/40">
                  Generated by LunarAura | lunar-aura.vercel.app
                </p>
              </div>
            </div>
          </div>

          {/* Share Options */}
          <div className="flex flex-col justify-center space-y-4 md:space-y-6">
            <div className="text-center lg:text-left">
              <h3 className="text-lg md:text-xl font-semibold mb-2 text-white">
                Share Your Lunar Profile
              </h3>
              <p className="text-sm md:text-base lg:text-lg text-white/70 mb-4 md:mb-6">
                Download your personalized lunar card or share it with friends.
              </p>
            </div>

            <div className="space-y-3 max-w-sm mx-auto lg:max-w-none lg:mx-0">
              <Button onClick={handleDownload} className="w-full">
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

            {/* Additional mobile spacing */}
            <div className="h-4 lg:hidden"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
