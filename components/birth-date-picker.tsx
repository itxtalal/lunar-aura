"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar } from "@/components/ui/calendar";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  // Generate years array from 100 years ago to current year
  const years = Array.from(
    { length: today.getFullYear() - hundred_years_ago.getFullYear() + 1 },
    (_, i) => today.getFullYear() - i
  );

  const handleYearChange = (year: string) => {
    const newYear = parseInt(year);
    setSelectedYear(newYear);
  };

  const handleMonthChange = (month: string) => {
    const newMonth = parseInt(month);
    setSelectedMonth(newMonth);
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      onDateSelected(date);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="relative p-4 bg-card rounded-lg shadow-lg w-[350px]"
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="absolute right-2 top-2 z-10"
      >
        <X className="h-4 w-4" />
      </Button>

      <div className="flex gap-2 mb-4">
        <Select
          value={selectedYear.toString()}
          onValueChange={handleYearChange}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent className="max-h-[200px]">
            {years.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={selectedMonth.toString()}
          onValueChange={handleMonthChange}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Month" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 12 }, (_, i) => (
              <SelectItem key={i} value={i.toString()}>
                {new Date(2000, i, 1).toLocaleString("default", {
                  month: "long",
                })}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium mb-2">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <div key={day} className="text-muted-foreground">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: 42 }, (_, i) => {
          const date = new Date(selectedYear, selectedMonth, 1);
          const firstDay = date.getDay();
          const currentDate = new Date(
            selectedYear,
            selectedMonth,
            i - firstDay + 1
          );
          const isCurrentMonth = currentDate.getMonth() === selectedMonth;
          const isDisabled =
            currentDate > today || currentDate < hundred_years_ago;
          const isSelected =
            selectedDate &&
            currentDate.getDate() === selectedDate.getDate() &&
            currentDate.getMonth() === selectedDate.getMonth() &&
            currentDate.getFullYear() === selectedDate.getFullYear();

          return (
            <button
              key={i}
              onClick={() => !isDisabled && handleDateSelect(currentDate)}
              disabled={isDisabled}
              className={`
                h-8 w-8 rounded-full text-sm
                ${
                  isDisabled
                    ? "text-muted-foreground/50 cursor-not-allowed"
                    : "hover:bg-accent hover:text-accent-foreground"
                }
                ${
                  isCurrentMonth
                    ? "text-foreground"
                    : "text-muted-foreground/50"
                }
                ${
                  isSelected
                    ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                    : ""
                }
                transition-colors
              `}
            >
              {currentDate.getDate()}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
