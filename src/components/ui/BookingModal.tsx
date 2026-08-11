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
                  Let's discuss your current bookkeeping setup and explore how cloud integration and AI analytics can save you time.
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

            {/* Right Panel - Mock Calendar */}
            <div className="w-full md:w-[60%] p-8 bg-[color:var(--background)]">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-semibold text-lg font-[family-name:var(--font-space-grotesk)] text-[color:var(--foreground)] dark:text-white">Select a Date & Time</h3>
                <button onClick={onClose} className="p-2 rounded-full hover:bg-[color:var(--color-line)] dark:hover:bg-white/10 transition-colors text-[color:var(--muted)] hover:text-[color:var(--foreground)] dark:hover:text-white">
                  <X size={20} />
                </button>
              </div>

              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4 text-sm font-medium text-[color:var(--foreground)] dark:text-white">
                  <Calendar size={16} /> August 2026
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {dates.map((date, i) => (
                    <button
                      key={date}
                      onClick={() => setSelectedDate(date)}
                      className={`flex-shrink-0 w-14 h-16 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all ${
                        selectedDate === date 
                          ? 'border-[color:var(--color-teal)] bg-[color:var(--color-teal)]/10 text-[color:var(--color-teal)]' 
                          : 'border-[color:var(--color-line)] dark:border-white/10 text-[color:var(--muted)] hover:border-[color:var(--color-teal)]/50'
                      }`}
                    >
                      <span className="text-[10px] uppercase font-semibold">
                        {['Tue', 'Wed', 'Thu', 'Fri', 'Sat'][i]}
                      </span>
                      <span className="text-lg font-bold">{date}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h4 className="text-sm font-medium mb-3 text-[color:var(--foreground)] dark:text-white/80">Available Times</h4>
                <div className="grid grid-cols-2 gap-3">
                  {times.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`py-3 rounded-lg border text-sm font-medium transition-all ${
                        selectedTime === time
                          ? 'border-[color:var(--color-teal)] bg-[color:var(--color-teal)] text-[color:var(--color-navy-3)] dark:text-white'
                          : 'border-[color:var(--color-line)] dark:border-white/10 text-[color:var(--foreground)] dark:text-white hover:border-[color:var(--color-teal)]'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <button
                disabled={!selectedDate || !selectedTime}
                className="w-full py-4 rounded-xl font-[family-name:var(--font-space-grotesk)] font-bold text-[15px] transition-all bg-[color:var(--color-navy-3)] dark:bg-white text-white dark:text-[color:var(--color-navy)] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[color:var(--color-teal)] dark:hover:bg-[color:var(--color-teal)]"
              >
                Confirm Booking
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
