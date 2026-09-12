"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useBookingModal } from "@/context/BookingModalContext";
import { ArrowRight, BarChart3, CloudLightning, ShieldCheck, TrendingUp } from "lucide-react";

const stats = [
  { value: "100+", label: "PNG Businesses" },
  { value: "Xero", label: "Certified Partner" },
  { value: "AI", label: "Powered Analytics" },
  { value: "24/7", label: "Cloud Access" },
];

const featurePills = [
  { icon: <CloudLightning size={14} />, label: "Cloud Bookkeeping" },
  { icon: <BarChart3 size={14} />, label: "AI Analytics" },
  { icon: <ShieldCheck size={14} />, label: "Xero Certified" },
  { icon: <TrendingUp size={14} />, label: "Real-time Reports" },
];

export function Hero() {
  const { openModal } = useBookingModal();

  return (
    <section className="relative bg-white dark:bg-[#021F45] overflow-hidden">
      {/* Light blue wave background top */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F3F8FF] via-white to-white dark:from-[#032D60]/30 dark:via-[#021F45] dark:to-[#021F45] pointer-events-none" />

      <div className="wrap relative z-10 pt-16 pb-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[560px]">

          {/* LEFT — Text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="pb-16 lg:pb-24"
          >
            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 text-[12.5px] font-mono tracking-[0.12em] uppercase text-[#0176D3] mb-5 bg-[#EEF4FF] px-3.5 py-1.5 rounded-full border border-[#0176D3]/20"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#0176D3] animate-pulse inline-block" />
              A trading division of Das Kapital Limited · Port Moresby
            </motion.p>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.7 }}
              className="text-[clamp(34px,4.8vw,58px)] leading-[1.08] font-bold font-[family-name:var(--font-space-grotesk)] text-[#032D60] dark:text-white mb-6"
            >
              Smarter numbers.<br />
              Stronger business.<br />
              <span className="text-[#0176D3]">Built for Papua New Guinea.</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.26 }}
              className="text-[17px] text-[#54698D] dark:text-white/70 max-w-[520px] leading-relaxed mb-8"
            >
              We pair qualified bookkeeping with AI-aided analytics on Xero and other cloud platforms, so PNG business owners can see exactly where they stand — in real time, wherever they are.
            </motion.p>

            {/* Feature pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.34 }}
              className="flex flex-wrap gap-2 mb-8"
            >
              {featurePills.map((pill) => (
                <span
                  key={pill.label}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-[#032D60] border border-[#E5E7EB] dark:border-white/15 text-[12.5px] text-[#54698D] dark:text-white/70 font-medium shadow-sm"
                >
                  <span className="text-[#0176D3]">{pill.icon}</span>
                  {pill.label}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42 }}
              className="flex gap-3 flex-wrap"
            >
              <button
                onClick={openModal}
                className="inline-flex items-center gap-2 font-[family-name:var(--font-space-grotesk)] font-semibold text-[14.5px] px-7 py-3.5 rounded-full bg-[#0176D3] text-white hover:bg-[#1B96FF] transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[0_8px_24px_rgba(1,118,211,0.35)]"
              >
                Get started for free <ArrowRight size={16} />
              </button>
              <Link
                href="#services"
                className="inline-flex items-center gap-2 font-[family-name:var(--font-space-grotesk)] font-semibold text-[14.5px] px-7 py-3.5 rounded-full border border-[#0176D3] text-[#0176D3] hover:bg-[#EEF4FF] transition-all duration-200 no-underline"
              >
                Explore services
              </Link>
            </motion.div>
          </motion.div>

          {/* RIGHT — Visual dashboard card */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
            className="hidden lg:flex items-end justify-center pb-0 relative"
          >
            {/* Dashboard preview card */}
            <div className="w-full max-w-[500px] bg-white dark:bg-[#032D60] rounded-2xl shadow-[0_20px_60px_rgba(3,45,96,0.12)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.4)] border border-[#E5E7EB] dark:border-white/10 overflow-hidden">
              {/* Card header bar */}
              <div className="flex items-center gap-2 px-5 py-3.5 bg-[#F3F8FF] dark:bg-[#021F45] border-b border-[#E5E7EB] dark:border-white/10">
                <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                <div className="w-3 h-3 rounded-full bg-[#28C840]" />
                <span className="ml-3 text-[12px] font-mono text-[#54698D] dark:text-white/50">Kapital PNG — Live Dashboard</span>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-0 border-b border-[#E5E7EB] dark:border-white/10">
                {[
                  { label: "Cash Position", value: "PGK 128,460", up: true },
                  { label: "Monthly Revenue", value: "PGK 84,200", up: true },
                  { label: "Expenses", value: "PGK 31,880", up: false },
                ].map((stat, i) => (
                  <div key={i} className={`px-4 py-4 ${i < 2 ? "border-r border-[#E5E7EB] dark:border-white/10" : ""}`}>
                    <p className="text-[11px] text-[#54698D] dark:text-white/50 font-mono uppercase tracking-wider mb-1">{stat.label}</p>
                    <p className="text-[14px] font-bold text-[#032D60] dark:text-white">{stat.value}</p>
                    <p className={`text-[11px] font-mono mt-0.5 ${stat.up ? "text-[#06A59A]" : "text-red-400"}`}>
                      {stat.up ? "▲ +12%" : "▼ -3%"}
                    </p>
                  </div>
                ))}
              </div>

              {/* Chart area */}
              <div className="px-5 pt-4 pb-2">
                <p className="text-[11px] font-mono text-[#54698D] dark:text-white/50 uppercase tracking-wider mb-3">Revenue vs Expenses — Last 6 Months</p>
                <svg viewBox="0 0 440 120" className="w-full" aria-hidden="true">
                  <defs>
                    <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0176D3" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#0176D3" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#06A59A" stopOpacity="0.18" />
                      <stop offset="100%" stopColor="#06A59A" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {/* Revenue area */}
                  <path d="M0,80 C60,65 100,45 160,50 C220,55 270,30 330,28 C380,26 420,35 440,32 L440,120 L0,120 Z" fill="url(#revGrad)" />
                  <path d="M0,80 C60,65 100,45 160,50 C220,55 270,30 330,28 C380,26 420,35 440,32" fill="none" stroke="#0176D3" strokeWidth="2.5" strokeLinecap="round" />
                  {/* Expense area */}
                  <path d="M0,95 C60,88 100,78 160,82 C220,86 270,72 330,70 C380,68 420,74 440,72 L440,120 L0,120 Z" fill="url(#expGrad)" />
                  <path d="M0,95 C60,88 100,78 160,82 C220,86 270,72 330,70 C380,68 420,74 440,72" fill="none" stroke="#06A59A" strokeWidth="2" strokeDasharray="4 3" strokeLinecap="round" />
                  {/* Data points */}
                  {[[160,50],[330,28],[440,32]].map(([x,y],i) => (
                    <circle key={i} cx={x} cy={y} r="4" fill="#0176D3" stroke="white" strokeWidth="2" />
                  ))}
                </svg>
              </div>

              {/* Legend + month labels */}
              <div className="flex items-center justify-between px-5 pb-4">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5 text-[11px] text-[#54698D] dark:text-white/50">
                    <span className="w-5 h-0.5 bg-[#0176D3] rounded inline-block" />Revenue
                  </span>
                  <span className="flex items-center gap-1.5 text-[11px] text-[#54698D] dark:text-white/50">
                    <span className="w-5 h-0.5 bg-[#06A59A] rounded inline-block" />Expenses
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#54698D]/60 dark:text-white/30 uppercase tracking-wider">
                  🟢 Live · Xero synced
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="relative z-10 border-t border-[#E5E7EB] dark:border-white/10 bg-white dark:bg-[#032D60]">
        <div className="wrap py-5 grid grid-cols-2 md:grid-cols-4 gap-0">
          {stats.map((s, i) => (
            <div
              key={i}
              className={`flex flex-col items-center py-3 ${i < 3 ? "border-r border-[#E5E7EB] dark:border-white/10" : ""}`}
            >
              <span className="text-[22px] font-bold font-[family-name:var(--font-space-grotesk)] text-[#0176D3]">{s.value}</span>
              <span className="text-[11.5px] text-[#54698D] dark:text-white/50 font-mono uppercase tracking-wider mt-0.5">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Wave bottom */}
      <div className="h-12 bg-white dark:bg-[#021F45] relative">
        <svg viewBox="0 0 1440 48" className="absolute bottom-0 w-full" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0,48 C360,0 1080,0 1440,48 L1440,48 L0,48 Z" fill="#F3F8FF" className="dark:fill-[#032D60]" />
        </svg>
      </div>
    </section>
  );
}
