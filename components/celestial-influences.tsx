import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Moon, Stars, Sun, X } from "lucide-react";
import { useState } from "react";

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

// Mock data for demonstration
const mockMoonPhaseData = {
  date: new Date(),
  phase: "Full Moon",
  illumination: 100,
  phaseAngle: 180,
  phaseDescription: "The moon is fully illuminated",
  moonrise: "6:30 PM",
  moonset: "6:45 AM",
  zodiacSign: {
    sign: "Leo",
    symbol: "♌",
    element: "Fire",
    description:
      "Leos are natural leaders with a warm, generous heart and magnetic personality. They possess strong creative abilities and love to be in the spotlight, inspiring others with their confidence and enthusiasm.",
  },
  moonSign: {
    sign: "Pisces",
    element: "Water",
    description:
      "With the moon in Pisces, you have deep emotional intuition and a rich inner world. You're naturally empathetic, artistic, and drawn to spiritual or mystical experiences that connect you to something greater.",
  },
};

export function CelestialInfluences({
  moonPhaseData = mockMoonPhaseData,
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
      shortLabel: "Phase",
      icon: Moon,
      color: "from-purple-600 to-indigo-700",
      accentColor: "text-purple-300",
    },
    {
      id: "zodiac",
      label: "Sun Sign",
      shortLabel: "Sun",
      icon: Sun,
      color: "from-orange-600 to-red-700",
      accentColor: "text-orange-300",
    },
    {
      id: "moon",
      label: "Moon Sign",
      shortLabel: "Moon",
      icon: Stars,
      color: "from-blue-600 to-cyan-700",
      accentColor: "text-blue-300",
    },
  ];

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

  const renderContent = () => {
    const currentView = views.find((view) => view.id === activeView);
    const accentColorClass = currentView?.accentColor || "text-white";

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
            <div className="text-center mb-6 md:mb-8">
              <div
                className={`inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br ${currentView?.color} rounded-full mb-4`}
              >
                <Moon className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {phase}
              </h3>
              <p className={accentColorClass}>Your Birth Moon Phase</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 border border-white/20">
              <p className="text-base md:text-lg leading-relaxed text-white/90">
                {getPhaseDescription(phase)}
              </p>
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
            <div className="text-center mb-6 md:mb-8">
              <div
                className={`inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br ${currentView?.color} rounded-full mb-4`}
              >
                <span className="text-2xl md:text-3xl text-white">
                  {zodiacSign.symbol}
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {zodiacSign.sign}
              </h3>
              <p className={accentColorClass}>
                Your Sun Sign • {zodiacSign.element} Element
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 border border-white/20">
              <p className="text-base md:text-lg leading-relaxed text-white/90 mb-4">
                {zodiacSign.description}
              </p>
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
            <div className="text-center mb-6 md:mb-8">
              <div
                className={`inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br ${currentView?.color} rounded-full mb-4`}
              >
                <Stars className="w-8 h-8 md:w-10 md:h-10 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {moonSign.sign}
              </h3>
              <p className={accentColorClass}>
                Your Moon Sign • {moonSign.element} Element
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 border border-white/20">
              <p className="text-base md:text-lg leading-relaxed text-white/90 mb-4">
                {moonSign.description}
              </p>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 overflow-hidden flex items-center justify-center">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        {[...Array(30)].map((_, i) => (
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

      <div className="relative z-10 container mx-auto px-4 py-8 md:py-12 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-12"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 md:mb-4">
            Celestial Influences
          </h1>
          <p className="text-lg md:text-xl text-white/70">
            Discover how the cosmos shaped your arrival
          </p>
        </motion.div>

        {/* Mobile-First Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-8 md:mb-12"
        >
          {/* Mobile Navigation - Stacked vertically on very small screens */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl md:rounded-full p-2 border border-white/20 w-full max-w-sm md:max-w-none md:w-auto">
            <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-1">
              {views.map((view) => {
                const Icon = view.icon;
                return (
                  <button
                    key={view.id}
                    onClick={() => setActiveView(view.id)}
                    className={cn(
                      "relative px-4 py-3 md:px-6 rounded-xl md:rounded-full transition-all duration-300 flex items-center justify-center sm:justify-start space-x-2 text-sm md:text-base",
                      activeView === view.id
                        ? "bg-white text-slate-900 shadow-lg font-medium"
                        : "text-white hover:bg-white/20"
                    )}
                  >
                    <Icon className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="font-medium hidden sm:inline">
                      {view.label}
                    </span>
                    <span className="font-medium sm:hidden">
                      {view.shortLabel}
                    </span>
                    {activeView === view.id && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute inset-0 bg-white rounded-xl md:rounded-full -z-10"
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
