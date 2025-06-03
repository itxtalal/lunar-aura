"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

interface MoonPhaseDisplayProps {
  moonPhaseData: {
    phase: string;
    illumination: number;
    phaseAngle: number;
    phaseDescription: string;
    date: Date;
  };
}

export function MoonPhaseDisplay({ moonPhaseData }: MoonPhaseDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !moonPhaseData) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const size = 240;
    canvas.width = size;
    canvas.height = size;

    // Clear canvas
    ctx.clearRect(0, 0, size, size);

    // Calculate moon phase
    const { phaseAngle } = moonPhaseData;

    // Moon parameters
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size / 2 - 10;

    // Draw moon base (full circle)
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fillStyle = "#e6e6e6"; // Base moon color
    ctx.fill();

    // Draw shadow based on moon phase
    ctx.beginPath();

    if (phaseAngle < 180) {
      // Waxing moon (right side illuminated)
      ctx.arc(centerX, centerY, radius, -Math.PI / 2, Math.PI / 2, true);

      // Draw terminator curve
      const curveX =
        centerX + radius * Math.cos(((phaseAngle - 90) * Math.PI) / 180);
      ctx.bezierCurveTo(
        curveX,
        centerY - radius,
        curveX,
        centerY + radius,
        centerX,
        centerY + radius
      );
    } else {
      // Waning moon (left side illuminated)
      ctx.arc(centerX, centerY, radius, Math.PI / 2, -Math.PI / 2, true);

      // Draw terminator curve
      const curveX =
        centerX + radius * Math.cos(((phaseAngle - 270) * Math.PI) / 180);
      ctx.bezierCurveTo(
        curveX,
        centerY - radius,
        curveX,
        centerY + radius,
        centerX,
        centerY + radius
      );
    }

    ctx.fillStyle = "#1f2937"; // Shadow color
    ctx.fill();

    // Add subtle crater details
    const drawCrater = (x: number, y: number, size: number) => {
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(200, 200, 200, 0.8)";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x - size / 5, y - size / 5, size / 2, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(230, 230, 230, 0.5)";
      ctx.fill();
    };

    // Draw some craters
    const craters = [
      {
        x: centerX - radius * 0.3,
        y: centerY - radius * 0.4,
        size: radius * 0.12,
      },
      {
        x: centerX + radius * 0.1,
        y: centerY + radius * 0.2,
        size: radius * 0.08,
      },
      {
        x: centerX - radius * 0.2,
        y: centerY + radius * 0.5,
        size: radius * 0.1,
      },
      {
        x: centerX + radius * 0.4,
        y: centerY - radius * 0.1,
        size: radius * 0.06,
      },
    ];

    craters.forEach((crater) => {
      drawCrater(crater.x, crater.y, crater.size);
    });

    // Glow effect
    const gradient = ctx.createRadialGradient(
      centerX,
      centerY,
      radius * 0.9,
      centerX,
      centerY,
      radius * 1.3
    );
    gradient.addColorStop(0, "rgba(255, 255, 255, 0.3)");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

    ctx.globalCompositeOperation = "source-over";
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 1.3, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
  }, [moonPhaseData]);

  if (!moonPhaseData) return null;

  return (
    <div className="glass-morphism rounded-xl p-6 md:p-8 relative overflow-hidden">
      <div className="absolute inset-0 aurora-gradient opacity-20"></div>
      <div className="relative z-10">
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="moon-glow mb-6"
          >
            <canvas ref={canvasRef} className="w-[240px] h-[240px]" />
          </motion.div>

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
              <p className="text-sm text-muted-foreground mb-1">Illumination</p>
              <p className="text-xl font-medium">
                {Math.round(moonPhaseData.illumination * 100)}%
              </p>
            </div>
            <div className="bg-background/30 backdrop-blur-sm rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground mb-1">Lunar Age</p>
              <p className="text-xl font-medium">
                {Math.round((moonPhaseData.phaseAngle / 360) * 29.53)} days
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
