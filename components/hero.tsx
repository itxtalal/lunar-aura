"use client";

import { BirthDatePicker } from "@/components/birth-date-picker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function Hero() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [name, setName] = useState("");

  const handleDateSelected = (date: Date) => {
    setSelectedDate(date);
    setIsDatePickerOpen(false);
  };

  const handleSubmit = () => {
    if (selectedDate && name.trim()) {
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const day = String(selectedDate.getDate()).padStart(2, "0");
      const dateString = `${year}-${month}-${day}`;

      const queryParams = new URLSearchParams({ date: dateString });
      queryParams.append("name", name.trim());
      router.push(`/result?${queryParams.toString()}`);
    }
  };

  return (
    <section className="container min-h-screen flex flex-col items-center justify-center py-24 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center max-w-3xl"
      >
        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
          Discover Your Lunar Destiny
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed">
          Uncover the moon's secrets on the day you arrived and explore your
          celestial connections to the cosmos.
        </p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="glass-morphism rounded-xl p-6 md:p-8 mb-8 max-w-md mx-auto relative overflow-hidden"
        >
          <div className="absolute inset-0 aurora-gradient opacity-30"></div>
          <div className="relative z-10">
            <h2 className="text-xl md:text-2xl font-serif mb-4">
              When were you born?
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Enter your name and birth date to reveal your lunar destiny
            </p>

            <div className="space-y-4">
              <Input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-background/40 border-primary/30"
              />

              {!isDatePickerOpen ? (
                <Button
                  onClick={() => setIsDatePickerOpen(true)}
                  className="w-full bg-primary/50 hover:bg-primary/30 text-primary-foreground border border-primary/30 backdrop-blur-sm"
                >
                  {selectedDate
                    ? selectedDate.toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "Choose Your Birth Date"}
                </Button>
              ) : (
                <div>
                  <BirthDatePicker
                    onDateSelected={handleDateSelected}
                    onClose={() => setIsDatePickerOpen(false)}
                  />
                </div>
              )}

              <Button
                onClick={handleSubmit}
                disabled={!selectedDate || !name.trim()}
                className="w-full bg-primary hover:bg-primary/90"
              >
                Find Your Lunar Phase
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex items-center justify-center gap-3 text-sm text-muted-foreground"
        >
          <Sparkles className="h-4 w-4 text-primary" />
          <span>Over 10,000 lunar destinies discovered</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
