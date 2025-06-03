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
  canvasStyles?: string;
}

export function MoonPhaseDisplay({
  moonPhaseData,
  canvasStyles = "w-40 h-40 sm:w-48 sm:h-48 md:w-60 md:h-60 lg:w-80 lg:h-80", // Default responsive sizes
}: MoonPhaseDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !moonPhaseData) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions based on rendered size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    const size = Math.min(canvas.width, canvas.height);

    // Clear canvas
    ctx.clearRect(0, 0, size, size);

    // Calculate moon phase
    const { phaseAngle } = moonPhaseData;

    // Moon parameters - adjusted for padding and glow
    const centerX = size / 2;
    const centerY = size / 2;
    const glowPadding = 10; // Adjusted this value to make the moon bigger
    const maxGlowRadius = size / 2 - glowPadding;
    const baseRadius = maxGlowRadius / 1.3; // Calculate base moon radius based on desired max glow radius

    // Draw moon base (full circle)
    ctx.beginPath();
    ctx.arc(centerX, centerY, baseRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#e6e6e6"; // Base moon color
    ctx.fill();

    // Draw shadow based on moon phase
    ctx.beginPath();

    if (phaseAngle < 180) {
      // Waxing moon (right side illuminated)
      ctx.arc(centerX, centerY, baseRadius, -Math.PI / 2, Math.PI / 2, true);

      // Draw terminator curve
      const curveX =
        centerX + baseRadius * Math.cos(((phaseAngle - 90) * Math.PI) / 180);
      ctx.bezierCurveTo(
        curveX,
        centerY - baseRadius,
        curveX,
        centerY + baseRadius,
        centerX,
        centerY + baseRadius
      );
    } else {
      // Waning moon (left side illuminated)
      ctx.arc(centerX, centerY, baseRadius, Math.PI / 2, -Math.PI / 2, true);

      // Draw terminator curve
      const curveX =
        centerX + baseRadius * Math.cos(((phaseAngle - 270) * Math.PI) / 180);
      ctx.bezierCurveTo(
        curveX,
        centerY - baseRadius,
        curveX,
        centerY + baseRadius,
        centerX,
        centerY + baseRadius
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

    // Draw some craters - adjusted positions and sizes relative to baseRadius
    const craters = [
      {
        x: centerX - baseRadius * 0.3,
        y: centerY - baseRadius * 0.4,
        size: baseRadius * 0.12,
      },
      {
        x: centerX + baseRadius * 0.1,
        y: centerY + baseRadius * 0.2,
        size: baseRadius * 0.08,
      },
      {
        x: centerX - baseRadius * 0.2,
        y: centerY + baseRadius * 0.5,
        size: baseRadius * 0.1,
      },
      {
        x: centerX + baseRadius * 0.4,
        y: centerY - baseRadius * 0.1,
        size: baseRadius * 0.06,
      },
    ];

    craters.forEach((crater) => {
      drawCrater(crater.x, crater.y, crater.size);
    });

    // Glow effect - adjusted radius based on calculated baseRadius
    const gradient = ctx.createRadialGradient(
      centerX,
      centerY,
      baseRadius * 0.9,
      centerX,
      centerY,
      baseRadius * 1.3
    );
    gradient.addColorStop(0, "rgba(255, 255, 255, 0.3)");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

    ctx.globalCompositeOperation = "source-over";
    ctx.beginPath();
    ctx.arc(centerX, centerY, baseRadius * 1.3, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
  }, [moonPhaseData]);

  if (!moonPhaseData) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="moon-glow mb-6 flex justify-center items-center"
    >
      <canvas ref={canvasRef} className={canvasStyles} />
    </motion.div>
  );
}
