"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useBookingModal } from "@/context/BookingModalContext";

export function Hero() {
  const [cashPosition, setCashPosition] = useState(128460.75);
  const { openModal } = useBookingModal();

  useEffect(() => {
    const interval = setInterval(() => {
      setCashPosition((prev) => prev + (Math.random() * 38 - 12));
    }, 3400);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-gradient-to-b from-[color:var(--color-navy)] to-[color:var(--color-navy-3)] text-white overflow-hidden pt-[96px] pb-[48px]">
      <svg className="absolute inset-0 opacity-[0.16] pointer-events-none w-full h-full object-cover" viewBox="0 0 1200 500" preserveAspectRatio="none" aria-hidden="true">
        <path d="M-50,120 C200,60 350,180 600,110 C850,40 1000,150 1250,90" stroke="var(--color-teal-2)" strokeWidth="1" fill="none"/>
        <path d="M-50,200 C220,150 380,260 620,190 C860,120 1010,230 1250,170" stroke="var(--color-teal-2)" strokeWidth="1" fill="none"/>
        <path d="M-50,280 C240,230 400,330 640,270 C880,200 1020,300 1250,250" stroke="var(--color-teal-2)" strokeWidth="1" fill="none"/>
        <path d="M-50,360 C260,320 420,400 660,350 C900,290 1030,370 1250,330" stroke="var(--color-teal-2)" strokeWidth="1" fill="none"/>
      </svg>

      <div className="wrap relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid gap-[28px] max-w-[780px]"
        >
          <p className="flex items-center gap-[10px] font-mono text-[12.5px] tracking-[0.14em] uppercase text-[color:var(--color-teal)] mb-[18px] before:content-[''] before:w-[22px] before:h-[1px] before:bg-[color:var(--color-teal)] before:inline-block">
            A trading division of Das Kapital Limited · Port Moresby
          </p>
          <h1 className="text-[clamp(34px,5.4vw,60px)] leading-[1.06] text-white font-semibold font-[family-name:var(--font-space-grotesk)]">
            Smarter numbers.<br/>Stronger business.<br/>
            <span className="text-[color:var(--color-teal-2)]">Built for Papua New Guinea.</span>
          </h1>
          <p className="text-[18px] text-white/75 max-w-[600px] m-0">
            We pair qualified bookkeeping with AI-aided analytics on Xero and other cloud platforms, so PNG business owners can see exactly where they stand — in real time, wherever they are.
          </p>
          <div className="flex gap-[14px] flex-wrap mt-[6px]">
            <button onClick={openModal} className="inline-flex items-center gap-2 font-[family-name:var(--font-space-grotesk)] font-semibold text-[14.5px] px-[22px] py-[12px] rounded-full transition-all duration-200 border border-transparent bg-[color:var(--color-teal)] text-[color:var(--color-navy-3)] hover:-translate-y-[2px] hover:shadow-[0_10px_24px_rgba(47,174,147,0.35)]">
              Talk to us
            </button>
            <Link href="#services" className="inline-flex items-center gap-2 font-[family-name:var(--font-space-grotesk)] font-semibold text-[14.5px] px-[22px] py-[12px] rounded-full no-underline transition-all duration-200 border border-white/35 text-white hover:border-white hover:bg-white/5">
              See what we do
            </Link>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative z-10 mt-[64px] border-t border-[color:var(--color-line-dark)] pt-[26px] pb-[30px] grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-[22px] items-center"
        >
          <div>
            <p className="font-mono text-[12.5px] tracking-[0.1em] uppercase text-white/55 mb-[10px]">
              Cash position — the kind of view you get, live
              <span className="inline-block w-[7px] h-[7px] rounded-full bg-[color:var(--color-gold)] ml-2 shadow-[0_0_0_0_rgba(201,154,70,0.6)] animate-[pulse_2.2s_infinite]"></span>
            </p>
            <div className="font-mono text-[28px] text-[color:var(--color-teal-2)] flex items-baseline gap-[10px]">
              <span className="text-[15px] text-white/50">PGK</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={cashPosition}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  {cashPosition.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
          <svg className="w-full h-auto block" viewBox="0 0 420 90" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="tideGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-teal-2)" stopOpacity="0.35"/>
                <stop offset="100%" stopColor="var(--color-teal-2)" stopOpacity="0"/>
              </linearGradient>
            </defs>
            <motion.path 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.6, delay: 1.2 }}
              className="fill-[url(#tideGrad)]" 
              d="M0,60 C40,50 60,68 100,55 C140,42 160,60 200,48 C240,36 260,52 300,40 C340,28 360,44 420,30 L420,90 L0,90 Z"
            />
            <motion.path 
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.4, delay: 0.3, ease: "easeInOut" }}
              className="fill-none stroke-[color:var(--color-teal-2)] stroke-2" 
              d="M0,60 C40,50 60,68 100,55 C140,42 160,60 200,48 C240,36 260,52 300,40 C340,28 360,44 420,30"
            />
            <motion.circle 
              initial={{ cx: 400, cy: 30 }}
              animate={{ cx: 420, cy: 30 }}
              transition={{ duration: 2.4, delay: 0.3, ease: "easeOut" }}
              className="fill-[color:var(--color-gold)]" 
              r="4"
            />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
