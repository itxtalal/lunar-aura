import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Stars, Sparkles, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for demonstration (will be replaced by actual prop data)
// This mock data structure might need adjustment based on the actual moonPhaseData prop
// For now, assuming it matches the required structure for getPhaseCharacteristics etc.

const getPhaseCharacteristics = (phase: string) => {
  const characteristics: { [key: string]: string[] } = {
    "New Moon": [
      "Innovative",
      "Pioneer",
      "Fresh Start",
      "Intuitive",
      "Creative",
      "Visionary",
    ],
    "Waxing Crescent": [
      "Growth-oriented",
      "Persistent",
      "Nurturing",
      "Determined",
      "Patient",
      "Builder",
    ],
    "First Quarter": [
      "Decisive",
      "Action-oriented",
      "Resilient",
      "Strong-willed",
      "Courageous",
      "Leadership",
    ],
    "Waxing Gibbous": [
      "Detail-oriented",
      "Perfectionist",
      "Analytical",
      "Methodical",
      "Refined",
      "Quality-focused",
    ],
    "Full Moon": [
      "Charismatic",
      "Emotionally aware",
      "Intuitive",
      "Social",
      "Expressive",
      "Magnetic",
    ],
    "Waning Gibbous": [
      "Teacher",
      "Communicator",
      "Wise",
      "Generous",
      "Helpful",
      "Mentor",
    ],
    "Last Quarter": [
      "Critical thinker",
      "Transformer",
      "Adaptable",
      "Wise",
      "Reflective",
      "Release-focused",
    ],
    "Waning Crescent": [
      "Contemplative",
      "Spiritual",
      "Peaceful",
      "Intuitive",
      "Wise",
      "Transitional",
    ],
  };
  return characteristics[phase] || [];
};

const getZodiacCharacteristics = (sign: string) => {
  const characteristics: { [key: string]: string[] } = {
    Aries: [
      "Bold",
      "Energetic",
      "Leader",
      "Independent",
      "Competitive",
      "Adventurous",
    ],
    Taurus: [
      "Reliable",
      "Patient",
      "Practical",
      "Determined",
      "Sensual",
      "Stable",
    ],
    Gemini: [
      "Curious",
      "Adaptable",
      "Social",
      "Quick-witted",
      "Versatile",
      "Communicative",
    ],
    Cancer: [
      "Nurturing",
      "Emotional",
      "Protective",
      "Intuitive",
      "Caring",
      "Home-loving",
    ],
    Leo: [
      "Confident",
      "Creative",
      "Generous",
      "Dramatic",
      "Loyal",
      "Leadership",
    ],
    Virgo: [
      "Analytical",
      "Practical",
      "Helpful",
      "Detail-oriented",
      "Organized",
      "Perfectionist",
    ],
    Libra: [
      "Harmonious",
      "Diplomatic",
      "Social",
      "Aesthetic",
      "Fair",
      "Charming",
    ],
    Scorpio: [
      "Intense",
      "Passionate",
      "Mysterious",
      "Transformative",
      "Loyal",
      "Intuitive",
    ],
    Sagittarius: [
      "Adventurous",
      "Optimistic",
      "Philosophical",
      "Freedom-loving",
      "Honest",
      "Enthusiastic",
    ],
    Capricorn: [
      "Ambitious",
      "Disciplined",
      "Practical",
      "Responsible",
      "Patient",
      "Traditional",
    ],
    Aquarius: [
      "Independent",
      "Innovative",
      "Humanitarian",
      "Unique",
      "Progressive",
      "Intellectual",
    ],
    Pisces: [
      "Compassionate",
      "Artistic",
      "Intuitive",
      "Dreamy",
      "Sensitive",
      "Spiritual",
    ],
  };
  return characteristics[sign] || [];
};

const getMoonSignCharacteristics = (sign: string) => {
  const characteristics: { [key: string]: string[] } = {
    Aries: [
      "Impulsive emotions",
      "Quick reactions",
      "Passionate",
      "Independent feelings",
      "Energetic",
      "Direct",
    ],
    Taurus: [
      "Stable emotions",
      "Comfort-seeking",
      "Sensual",
      "Possessive",
      "Patient",
      "Practical feelings",
    ],
    Gemini: [
      "Changeable moods",
      "Curious emotions",
      "Social needs",
      "Mental stimulation",
      "Communicative",
      "Restless",
    ],
    Cancer: [
      "Deep emotions",
      "Nurturing instincts",
      "Protective",
      "Home-oriented",
      "Sensitive",
      "Caring",
    ],
    Leo: [
      "Dramatic emotions",
      "Need for attention",
      "Generous heart",
      "Creative expression",
      "Proud",
      "Warm",
    ],
    Virgo: [
      "Analytical emotions",
      "Need for order",
      "Helpful nature",
      "Critical",
      "Practical",
      "Service-oriented",
    ],
    Libra: [
      "Harmonious emotions",
      "Need for balance",
      "Relationship-focused",
      "Aesthetic",
      "Diplomatic",
      "Social",
    ],
    Scorpio: [
      "Intense emotions",
      "Secretive",
      "Transformative",
      "Passionate",
      "Mysterious",
      "Deep feelings",
    ],
    Sagittarius: [
      "Optimistic emotions",
      "Freedom-loving",
      "Adventurous spirit",
      "Philosophical",
      "Honest",
      "Restless",
    ],
    Capricorn: [
      "Controlled emotions",
      "Ambitious feelings",
      "Practical",
      "Reserved",
      "Disciplined",
      "Traditional",
    ],
    Aquarius: [
      "Detached emotions",
      "Unique feelings",
      "Independent",
      "Humanitarian",
      "Progressive",
      "Intellectual",
    ],
    Pisces: [
      "Intuitive emotions",
      "Compassionate",
      "Dreamy",
      "Sensitive",
      "Spiritual",
      "Empathetic",
    ],
  };
  return characteristics[sign] || [];
};

const getPhaseDescription = (phase: string) => {
  const descriptions: { [key: string]: string } = {
    "New Moon":
      "Being born during a new moon phase suggests a natural affinity for new beginnings and fresh starts. You possess a pioneering spirit and the ability to initiate projects with enthusiasm. Your intuitive creativity is heightened during new cycles, making you excellent at planting seeds for future growth.",
    "Waxing Crescent":
      "Being born during a waxing crescent moon phase suggests you're a naturally growth-oriented person with a gift for building momentum. You excel at nurturing ideas from their earliest stages and have a persistent, determined nature that helps you overcome initial obstacles.",
    "First Quarter":
      "Being born during a first quarter moon phase suggests you have a natural ability to overcome obstacles and push through challenges. Your decisiveness and action-oriented nature helps you make progress when others might hesitate, making you a natural problem-solver.",
    "Waxing Gibbous":
      "Being born during a waxing gibbous moon phase suggests you possess a detail-oriented and perfectionistic nature. You excel at refining and improving existing structures and have strong analytical abilities that help you perfect your craft.",
    "Full Moon":
      "Being born during a full moon phase suggests you have heightened emotional awareness and intuitive abilities. You possess strong interpersonal skills and a natural charisma that draws others to you, making you excellent at connecting with people on a deep level.",
    "Waning Gibbous":
      "Being born during a waning gibbous moon phase suggests you have natural teaching abilities and a gift for communication. You excel at sharing knowledge and helping others understand complex concepts, making you a natural mentor and guide.",
    "Last Quarter":
      "Being born during a last quarter moon phase suggests you possess strong critical thinking skills and the ability to release what no longer serves you. You're naturally adept at transitions and letting go, helping you navigate life's changes with wisdom.",
    "Waning Crescent":
      "Being born during a waning crescent moon phase suggests you have a contemplative nature and deep spiritual insights. You're comfortable with endings and the quiet space before new beginnings, making you naturally wise and reflective.",
  };
  return descriptions[phase] || "";
};

interface CelestialInfluencesProps {
  moonPhaseData: {
    date: Date;
    phase: string;
    illumination: number;
    phaseAngle: number;
    phaseDescription: string;
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

export function CelestialInfluences({
  moonPhaseData,
}: CelestialInfluencesProps) {
  const [activeView, setActiveView] = useState("phase");
  const [selectedChip, setSelectedChip] = useState<{
    trait: string;
    type: string;
    index: number;
  } | null>(null);

  if (!moonPhaseData) return null;

  const { phase, zodiacSign, moonSign } = moonPhaseData;

  const views = [
    {
      id: "phase",
      label: "Moon Phase",
      icon: Moon,
      color: "from-purple-600 to-indigo-700",
      accentColor: "text-purple-300",
    },
    {
      id: "zodiac",
      label: "Sun Sign",
      icon: Sun,
      color: "from-orange-600 to-red-700",
      accentColor: "text-orange-300",
    },
    {
      id: "moon",
      label: "Moon Sign",
      icon: Stars,
      color: "from-blue-600 to-cyan-700",
      accentColor: "text-blue-300",
    },
  ];

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

  const renderCharacteristics = (
    characteristics: { text: string; color: string }[],
    type: string
  ) => (
    <motion.div
      className="flex flex-wrap gap-2 mt-4"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      {characteristics.map((char, index) => (
        <motion.button
          key={char.text}
          onClick={() => setSelectedChip({ trait: char.text, type, index })}
          className={cn(
            "px-3 py-1 backdrop-blur-sm rounded-full text-sm font-medium transition-all duration-300 hover:scale-105",
            char.color, // Apply the dynamic color class here
            "border hover:border-white/70"
          )}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {char.text}
        </motion.button>
      ))}
    </motion.div>
  );

  const renderContent = () => {
    const currentView = views.find((view) => view.id === activeView);
    const accentColorClass = currentView?.accentColor || "text-white";

    // Get all characteristics and filter based on the active view
    const allCharacteristics = getCharacteristics();
    const filteredCharacteristics = allCharacteristics.filter((char) => {
      // Simple filtering logic based on characteristic text content
      // This might need refinement if characteristic texts overlap across types
      if (activeView === "phase")
        return (
          char.text.includes("Spirit") ||
          char.text.includes("Starts") ||
          char.text.includes("Creative") ||
          char.text.includes("Oriented") ||
          char.text.includes("Determined") ||
          char.text.includes("Nurturing") ||
          char.text.includes("Action") ||
          char.text.includes("Decisive") ||
          char.text.includes("Resilient") ||
          char.text.includes("Detail") ||
          char.text.includes("Analytical") ||
          char.text.includes("Perfectionist") ||
          char.text.includes("Intuitive") ||
          char.text.includes("Emotionally") ||
          char.text.includes("Charismatic") ||
          char.text.includes("Knowledge") ||
          char.text.includes("Communicative") ||
          char.text.includes("Teacher") ||
          char.text.includes("Transitional") ||
          char.text.includes("Critical") ||
          char.text.includes("Adaptable") ||
          char.text.includes("Contemplative") ||
          char.text.includes("Spiritual") ||
          char.text.includes("Reflective")
        );
      if (activeView === "zodiac")
        return (
          (!char.text.includes("Moon") &&
            !char.text.includes("Spirit") &&
            !char.text.includes("Starts") &&
            !char.text.includes("Creative") &&
            !char.text.includes("Oriented") &&
            !char.text.includes("Determined") &&
            !char.text.includes("Nurturing") &&
            !char.text.includes("Action") &&
            !char.text.includes("Decisive") &&
            !char.text.includes("Resilient")) ||
          char.text.includes("Courageous") ||
          char.text.includes("Energetic") ||
          char.text.includes("Reliable") ||
          char.text.includes("Patient") ||
          char.text.includes("Practical") ||
          char.text.includes("Adaptable") ||
          char.text.includes("Curious") ||
          char.text.includes("Nurturing") ||
          char.text.includes("Intuitive") ||
          char.text.includes("Confident") ||
          char.text.includes("Creative") ||
          char.text.includes("Analytical") ||
          char.text.includes("Practical") ||
          char.text.includes("Diplomatic") ||
          char.text.includes("Harmonious") ||
          char.text.includes("Passionate") ||
          char.text.includes("Determined") ||
          char.text.includes("Adventurous") ||
          char.text.includes("Optimistic") ||
          char.text.includes("Ambitious") ||
          char.text.includes("Disciplined") ||
          char.text.includes("Innovative") ||
          char.text.includes("Independent") ||
          char.text.includes("Compassionate") ||
          char.text.includes("Imaginative")
        ); // Assuming zodiac traits don't include 'Moon' or the specific phase trait words
      if (activeView === "moon")
        return char.text.includes("Moon") && !char.text.includes("Element"); // Assuming moon sign traits include 'Moon' and are not the element trait
      return false;
    });

    switch (activeView) {
      case "phase":
        return (
          <motion.div
            key="phase"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div
                className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${currentView?.color} rounded-full mb-4`}
              >
                <Moon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">{phase}</h3>
              <p className={accentColorClass}>Your Birth Moon Phase</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <p className="text-lg leading-relaxed text-white/90">
                {getPhaseDescription(phase)}
              </p>
              {renderCharacteristics(filteredCharacteristics, "phase")}
            </div>
          </motion.div>
        );

      case "zodiac":
        return (
          <motion.div
            key="zodiac"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div
                className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${currentView?.color} rounded-full mb-4`}
              >
                <span className="text-3xl text-white">{zodiacSign.symbol}</span>
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">
                {zodiacSign.sign}
              </h3>
              <p className={accentColorClass}>
                Your Sun Sign • {zodiacSign.element} Element
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <p className="text-lg leading-relaxed text-white/90 mb-4">
                {zodiacSign.description}
              </p>
              {renderCharacteristics(filteredCharacteristics, "zodiac")}
            </div>
          </motion.div>
        );

      case "moon":
        return (
          <motion.div
            key="moon"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div
                className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${currentView?.color} rounded-full mb-4`}
              >
                <Stars className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">
                {moonSign.sign}
              </h3>
              <p className={accentColorClass}>
                Your Moon Sign • {moonSign.element} Element
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <p className="text-lg leading-relaxed text-white/90 mb-4">
                {moonSign.description}
              </p>
              {renderCharacteristics(filteredCharacteristics, "moon")}
            </div>
          </motion.div>
        );
      default:
        return null; // Should not happen with defined views
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 overflow-hidden flex items-center justify-center">
      {/* Animated background elements (simplified for clarity, original might be more complex) */}
      {/* Consider if these background elements are desired/needed here or should be part of a higher-level layout */}
      <div className="absolute inset-0 z-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-70"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Celestial Influences
          </h1>
          <p className="text-xl text-white/70">
            Discover how the cosmos shaped your arrival
          </p>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-full p-2 border border-white/20">
            <div className="flex space-x-1">
              {views.map((view) => {
                const Icon = view.icon;
                return (
                  <button
                    key={view.id}
                    onClick={() => setActiveView(view.id)}
                    className={cn(
                      "relative px-6 py-3 rounded-full transition-all duration-300 flex items-center space-x-2",
                      activeView === view.id
                        ? "bg-primary-foreground text-primary shadow-lg"
                        : "text-white hover:bg-white/20"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{view.label}</span>
                    {activeView === view.id && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute inset-0 bg-primary-foreground rounded-full -z-10"
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6,
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
        </div>
      </div>

      {/* Chip Detail Modal */}
      <AnimatePresence>
        {selectedChip && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedChip(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white/20 backdrop-blur-md rounded-2xl p-6 max-w-md w-full border border-white/30 text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">{selectedChip.trait}</h3>
                <button
                  onClick={() => setSelectedChip(null)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-white/80 leading-relaxed">
                This characteristic reflects your{" "}
                {selectedChip.type === "phase"
                  ? "moon phase"
                  : selectedChip.type === "zodiac"
                  ? "sun sign"
                  : "moon sign"}{" "}
                influence, showing how cosmic energies have shaped your
                personality and approach to life.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
