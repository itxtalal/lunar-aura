"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar } from "@/components/ui/calendar";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BirthDatePickerProps {
  onDateSelected: (date: Date) => void;
  onClose: () => void;
}

export function BirthDatePicker({
  onDateSelected,
  onClose,
}: BirthDatePickerProps) {
  const today = new Date();
  const hundred_years_ago = new Date();
  hundred_years_ago.setFullYear(today.getFullYear() - 100);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="relative"
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="absolute right-0 top-0 z-10"
      >
        <X className="h-4 w-4" />
      </Button>
      <Calendar
        mode="single"
        selected={undefined}
        onSelect={(date) => date && onDateSelected(date)}
        disabled={{ after: today }}
        fromDate={hundred_years_ago}
        toDate={today}
        className="rounded-md border bg-card text-card-foreground shadow-md"
      />
    </motion.div>
  );
}