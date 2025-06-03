import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CharacteristicBadgeProps {
  text: string;
  color: string;
}

export function CharacteristicBadge({ text, color }: CharacteristicBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "px-2 py-1 md:px-3 md:py-1.5 rounded-full text-xs md:text-sm font-medium backdrop-blur-sm",
        "border border-white/10 shadow-lg",
        color
      )}
    >
      {text}
    </motion.div>
  );
}
