"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, Mail, MessageCircle } from "lucide-react";

export function BookingModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
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
            className="relative w-full max-w-md bg-[color:var(--card)] dark:bg-[color:var(--color-navy)] rounded-[24px] shadow-2xl overflow-hidden border border-[color:var(--border)] dark:border-white/10 p-8"
          >
            <div className="absolute top-4 right-4 z-10">
              <button 
                onClick={onClose} 
                className="p-2 rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-colors text-[color:var(--muted)] hover:text-[color:var(--foreground)] dark:hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#25D366]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle size={32} className="text-[#25D366]" />
              </div>
              <h2 className="text-2xl font-[family-name:var(--font-space-grotesk)] font-bold mb-2 text-[color:var(--foreground)] dark:text-white">
                Get in Touch
              </h2>
              <p className="text-[color:var(--muted)] text-sm">
                Reach out to us directly to discuss your bookkeeping needs. We typically reply within a few hours.
              </p>
            </div>

            <div className="space-y-4">
              <a 
                href="https://wa.me/67575388212" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl border border-[color:var(--border)] dark:border-white/10 hover:border-[#25D366] dark:hover:border-[#25D366] bg-[color:var(--background)] hover:bg-[#25D366]/5 transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center shrink-0">
                  <Phone size={20} className="text-[#25D366]" />
                </div>
                <div>
                  <div className="font-semibold text-[color:var(--foreground)] dark:text-white group-hover:text-[#25D366] transition-colors">
                    WhatsApp Message
                  </div>
                  <div className="text-sm text-[color:var(--muted)]">
                    +675 75388212
                  </div>
                </div>
              </a>

              <a 
                href="mailto:daskapitalltd@gmail.com"
                className="flex items-center gap-4 p-4 rounded-xl border border-[color:var(--border)] dark:border-white/10 hover:border-[color:var(--color-teal)] dark:hover:border-[color:var(--color-teal)] bg-[color:var(--background)] hover:bg-[color:var(--color-teal)]/5 transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-[color:var(--color-teal)]/10 flex items-center justify-center shrink-0">
                  <Mail size={20} className="text-[color:var(--color-teal)]" />
                </div>
                <div>
                  <div className="font-semibold text-[color:var(--foreground)] dark:text-white group-hover:text-[color:var(--color-teal)] transition-colors">
                    Send an Email
                  </div>
                  <div className="text-sm text-[color:var(--muted)]">
                    daskapitalltd@gmail.com
                  </div>
                </div>
              </a>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
