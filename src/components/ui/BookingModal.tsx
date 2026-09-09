"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, Video } from "lucide-react";
import { useState } from "react";

export function BookingModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const dates = [12, 13, 14, 15, 16];
  const times = ["09:00 AM", "11:30 AM", "01:00 PM", "03:30 PM"];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-[800px] bg-[color:var(--card)] dark:bg-[color:var(--color-navy)] rounded-[24px] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-[color:var(--border)] dark:border-white/10"
          >
            {/* Left Panel */}
            <div className="w-full md:w-[40%] bg-[color:var(--color-paper-2)] dark:bg-black/20 p-8 flex flex-col justify-between border-r border-[color:var(--border)] dark:border-white/10">
              <div>
                <span className="inline-block px-3 py-1 bg-[color:var(--color-teal-2)]/20 text-[color:var(--color-teal)] rounded-full text-xs font-semibold mb-6 font-mono tracking-widest uppercase">
                  Discovery Call
                </span>
                <h2 className="text-2xl font-[family-name:var(--font-space-grotesk)] font-bold mb-4 text-[color:var(--foreground)] dark:text-white">
                  30-Minute Consultation
                </h2>
                <p className="text-[color:var(--muted)] text-sm mb-6 leading-relaxed">
                  Let&apos;s discuss your current bookkeeping setup and explore how cloud integration and AI analytics can save you time.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm font-medium text-[color:var(--foreground)] dark:text-white/80">
                    <Clock size={18} className="text-[color:var(--color-teal)]" />
                    30 min
                  </div>
                  <div className="flex items-center gap-3 text-sm font-medium text-[color:var(--foreground)] dark:text-white/80">
                    <Video size={18} className="text-[color:var(--color-teal)]" />
                    Google Meet
                  </div>
                </div>
              </div>
              <p className="text-xs text-[color:var(--muted)] mt-12">
                Timezone: Pacific/Port_Moresby (PGT)
              </p>
            </div>

            {/* Right Panel - Calendly Embed */}
            <div className="w-full md:w-[60%] bg-[color:var(--background)] h-[500px] relative">
              <div className="absolute top-4 right-4 z-10">
                <button onClick={onClose} className="p-2 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-colors text-[color:var(--muted)] hover:text-[color:var(--foreground)] dark:hover:text-white">
                  <X size={20} />
                </button>
              </div>
              <iframe 
                src={process.env.NEXT_PUBLIC_CALENDLY_URL || "https://calendly.com/"} 
                width="100%" 
                height="100%" 
                frameBorder="0"
                className="w-full h-full"
                title="Schedule a Discovery Call"
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
