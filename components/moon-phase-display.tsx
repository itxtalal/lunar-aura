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
  canvasStyles = "w-40 h-40 sm:w-48 sm:h-48 md:w-60 md:h-60 lg:w-80 lg:h-80",
}: MoonPhaseDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !moonPhaseData) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Get the actual rendered size of the canvas
    const rect = canvas.getBoundingClientRect();
    const displayWidth = rect.width;
    const displayHeight = rect.height;
    const displaySize = Math.min(displayWidth, displayHeight);

    // Get device pixel ratio for sharp rendering
    const dpr = window.devicePixelRatio || 1;

    // Set the actual canvas size in memory (scaled up for retina displays)
    canvas.width = displayWidth * dpr;
    canvas.height = displayHeight * dpr;

    // Scale the drawing context so everything draws at the correct size
    ctx.scale(dpr, dpr);

    // Set the CSS size to the original size (this prevents the canvas from appearing scaled)
    canvas.style.width = displayWidth + "px";
    canvas.style.height = displayHeight + "px";

    // Clear canvas
    ctx.clearRect(0, 0, displayWidth, displayHeight);

    // Calculate moon phase
    const { phaseAngle } = moonPhaseData;

    // Moon parameters - use display size for calculations
    const centerX = displayWidth / 2;
    const centerY = displayHeight / 2;
    const padding = displaySize * 0.1; // 10% padding
    const baseRadius = (displaySize - padding * 2) / 2;

    // Draw moon base (full circle)
    ctx.beginPath();
    ctx.arc(centerX, centerY, baseRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#e6e6e6";
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

    ctx.fillStyle = "#1f2937";
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

    // Draw craters with positions relative to moon size
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

    // Glow effect
    const gradient = ctx.createRadialGradient(
      centerX,
      centerY,
      baseRadius * 0.9,
      centerX,
      centerY,
      baseRadius * 1.2
    );
    gradient.addColorStop(0, "rgba(255, 255, 255, 0.3)");
    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

    ctx.globalCompositeOperation = "source-over";
    ctx.beginPath();
    ctx.arc(centerX, centerY, baseRadius * 1.2, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Add a resize observer to handle dynamic size changes
    const resizeObserver = new ResizeObserver(() => {
      // Re-trigger the effect when canvas size changes
      const event = new Event("resize");
      window.dispatchEvent(event);
    });

    resizeObserver.observe(canvas);

    return () => {
      resizeObserver.disconnect();
    };
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
