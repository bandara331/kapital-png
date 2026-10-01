"use client";

import { motion, useInView } from "framer-motion";
import { MapPin, Cloud, Brain, Eye, Clock, Lock, TrendingUp, Users, Award, Zap } from "lucide-react";
import { useRef, useEffect, useState } from "react";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(to / 50);
    const timer = setInterval(() => {
      start += step;
      if (start >= to) { setCount(to); clearInterval(timer); }
      else setCount(start);
    }, 28);
    return () => clearInterval(timer);
  }, [inView, to]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const card: any = {
  hidden: { opacity: 0, y: 28 },
  visible: (d: number) => ({ opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: d } }),
};

export function WhyUs() {
  return (
    <section className="py-16 bg-[#F0F5F9] relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#3ECDB0]/6 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#1D4266]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="wrap relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="flex items-center gap-2.5 font-mono text-[12px] tracking-[0.14em] uppercase text-[#3ECDB0] mb-4
                        before:content-[''] before:w-[22px] before:h-[1px] before:bg-[#3ECDB0] before:inline-block">
            Why Kapital PNG
          </p>
          <h2 className="text-[clamp(28px,3.5vw,46px)] font-bold font-[family-name:var(--font-space-grotesk)] text-[#1D4266] leading-[1.1] max-w-[560px]">
            What you get<br />
            <span className="text-[#3ECDB0]">working with us.</span>
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 auto-rows-auto">

          {/* ── LARGE FEATURED CARD (col-span-5) — Local Expertise ── */}
          <motion.div
            variants={card} initial="hidden" whileInView="visible" custom={0}
            viewport={{ once: true }}
            className="md:col-span-5 relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#E8FAF7] via-white to-[#F2FCFA] border border-[#1D4266]/10 p-8 flex flex-col min-h-[340px] group hover:border-[#3ECDB0]/60 transition-all duration-500 hover:shadow-[0_24px_60px_rgba(62,205,176,0.18)]"
          >
            <div className="absolute -top-16 -right-16 w-64 h-64 bg-[#3ECDB0]/15 rounded-full blur-3xl group-hover:bg-[#3ECDB0]/25 transition-colors duration-700" />
            <div className="w-11 h-11 rounded-2xl bg-[#3ECDB0]/10 border border-[#3ECDB0]/20 flex items-center justify-center text-[#3ECDB0] mb-6 relative">
              <MapPin size={20} />
            </div>
            <h3 className="text-[22px] font-bold font-[family-name:var(--font-space-grotesk)] text-[#1D4266] mb-3 relative">
              Local expertise,<br />trusted foundation.
            </h3>
            <p className="text-[14.5px] text-[#1D4266]/70 leading-relaxed relative max-w-[340px]">
              Backed by Das Kapital Limited — an established Port Moresby accounting and consulting firm with a proven track record across PNG.
            </p>
            <div className="mt-auto pt-6 flex items-center gap-6 relative">
              <div className="text-center">
                <p className="text-[28px] font-bold text-[#3ECDB0]"><Counter to={100} suffix="+" /></p>
                <p className="text-[11px] text-[#1D4266]/50 font-mono uppercase tracking-wider">PNG Clients</p>
              </div>
              <div className="w-[1px] h-10 bg-[#1D4266]/10" />
              <div className="text-center">
                <p className="text-[28px] font-bold text-[#3ECDB0]"><Counter to={10} suffix="+" /></p>
                <p className="text-[11px] text-[#1D4266]/50 font-mono uppercase tracking-wider">Years Experience</p>
              </div>
              <div className="w-[1px] h-10 bg-[#1D4266]/10" />
              <div className="text-center">
                <p className="text-[28px] font-bold text-[#3ECDB0]"><Counter to={24} suffix="/7" /></p>
                <p className="text-[11px] text-[#1D4266]/50 font-mono uppercase tracking-wider">Cloud Access</p>
              </div>
            </div>
          </motion.div>

          {/* ── LOTTIE ANIMATION CARD (col-span-3) — Real-time ── */}
          <motion.div
            variants={card} initial="hidden" whileInView="visible" custom={0.1}
            viewport={{ once: true }}
            className="md:col-span-4 relative rounded-3xl overflow-hidden bg-white border border-[#1D4266]/10 p-7 flex flex-col group hover:border-[#3ECDB0]/30 transition-all duration-500 hover:shadow-[0_16px_40px_rgba(62,205,176,0.12)] min-h-[340px]"
          >
            <div className="flex-1 flex flex-col">
              <div className="w-11 h-11 rounded-2xl bg-[#3ECDB0]/15 border border-[#3ECDB0]/20 flex items-center justify-center text-[#3ECDB0] mb-4">
                <Eye size={20} />
              </div>
              <h3 className="text-[18px] font-bold font-[family-name:var(--font-space-grotesk)] text-[#1D4266] mb-2">Real-time visibility</h3>
              <p className="text-[13.5px] text-[#1D4266]/70 leading-relaxed">
                Your books and financial reports accessible anytime, anywhere — PNG or the world.
              </p>
            </div>
            <div className="mt-4 flex justify-center">
              <div className="w-20 h-20 rounded-3xl bg-[#3ECDB0]/15 border border-[#3ECDB0]/20 flex items-center justify-center text-[#3ECDB0]">
                <Eye size={36} />
              </div>
            </div>
          </motion.div>

          {/* ── STAT CARD (col-span-3) — Cloud ── */}
          <motion.div
            variants={card} initial="hidden" whileInView="visible" custom={0.2}
            viewport={{ once: true }}
            className="md:col-span-3 relative rounded-3xl overflow-hidden bg-white border border-[#1D4266]/10 p-7 flex flex-col group hover:border-[#3ECDB0]/30 transition-all duration-500 min-h-[340px]"
          >
            <div className="absolute -bottom-8 -right-8 w-36 h-36 bg-[#3ECDB0]/10 rounded-full blur-2xl" />
            <div className="w-11 h-11 rounded-2xl bg-[#3ECDB0]/15 border border-[#3ECDB0]/20 flex items-center justify-center text-[#3ECDB0] mb-4">
              <Cloud size={20} />
            </div>
            <h3 className="text-[18px] font-bold font-[family-name:var(--font-space-grotesk)] text-[#1D4266] mb-2">Cloud-first, PNG-focused</h3>
            <p className="text-[13.5px] text-[#1D4266]/70 leading-relaxed mb-6">
              Xero and other cloud platforms, bringing modern global standards to PNG businesses.
            </p>
            <div className="mt-auto space-y-3 relative">
              {["Xero Certified", "Bank Feed Automation", "Multi-device Access"].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-2.5 text-[13px] text-[#1D4266]/80"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3ECDB0] shrink-0" />
                  {item}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── SMALL CARD — Analytics ── */}
          <motion.div
            variants={card} initial="hidden" whileInView="visible" custom={0.25}
            viewport={{ once: true }}
            className="md:col-span-4 relative rounded-3xl overflow-hidden bg-[#F8FAFC] border border-[#1D4266]/10 p-7 flex flex-col group hover:border-[#3ECDB0]/30 transition-all duration-500 hover:shadow-[0_16px_40px_rgba(62,205,176,0.12)]"
          >
            <div className="w-11 h-11 rounded-2xl bg-[#3ECDB0]/15 border border-[#3ECDB0]/20 flex items-center justify-center text-[#3ECDB0] mb-4">
              <Brain size={20} />
            </div>
            <h3 className="text-[18px] font-bold font-[family-name:var(--font-space-grotesk)] text-[#1D4266] mb-2">Beyond the numbers</h3>
            <p className="text-[13.5px] text-[#1D4266]/70 leading-relaxed">
              Advanced analytics gives you forward-looking insight, not just historical records of what happened last month.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <div className="flex-1 h-1.5 rounded-full bg-[#1D4266]/10 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "82%" }}
                  transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="h-full rounded-full bg-gradient-to-r from-[#3ECDB0] to-[#2FBEA1]"
                />
              </div>
              <span className="text-[12px] font-mono text-[#3ECDB0]">82% faster</span>
            </div>
            <p className="text-[11px] text-[#1D4266]/50 mt-1.5">Time saved vs manual reporting</p>
          </motion.div>

          {/* ── LOTTIE SECURITY CARD (col-span-4) ── */}
          <motion.div
            variants={card} initial="hidden" whileInView="visible" custom={0.3}
            viewport={{ once: true }}
            className="md:col-span-4 relative rounded-3xl overflow-hidden bg-white border border-[#1D4266]/10 p-7 flex flex-col items-center text-center group hover:border-[#3ECDB0]/30 transition-all duration-500"
          >
            <div className="w-20 h-20 rounded-3xl bg-[#3ECDB0]/15 border border-[#3ECDB0]/20 flex items-center justify-center text-[#3ECDB0] mx-auto mb-2">
              <Lock size={36} />
            </div>
            <div className="w-full mt-4">
              <div className="w-11 h-11 rounded-2xl bg-[#3ECDB0]/15 border border-[#3ECDB0]/20 flex items-center justify-center text-[#3ECDB0] mb-3 mx-auto">
                <Lock size={20} />
              </div>
              <h3 className="text-[18px] font-bold font-[family-name:var(--font-space-grotesk)] text-[#1D4266] mb-2">Confidential & Secure</h3>
              <p className="text-[13.5px] text-[#1D4266]/70 leading-relaxed">
                Enterprise-grade cloud security and strict confidentiality protocols protect your data at all times.
              </p>
            </div>
          </motion.div>

          {/* ── GROWTH LOTTIE CARD (col-span-4) ── */}
          <motion.div
            variants={card} initial="hidden" whileInView="visible" custom={0.35}
            viewport={{ once: true }}
            className="md:col-span-4 relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#E8FAF7] to-white border border-[#3ECDB0]/20 p-7 flex flex-col group hover:border-[#3ECDB0]/50 transition-all duration-500 hover:shadow-[0_16px_40px_rgba(62,205,176,0.15)]"
          >
            <div className="w-11 h-11 rounded-2xl bg-[#3ECDB0]/20 border border-[#3ECDB0]/30 flex items-center justify-center text-[#3ECDB0] mb-4">
              <TrendingUp size={20} />
            </div>
            <h3 className="text-[18px] font-bold font-[family-name:var(--font-space-grotesk)] text-[#1D4266] mb-2">Affordable & Scalable</h3>
            <p className="text-[13.5px] text-[#1D4266]/70 leading-relaxed mb-4">
              Services scaled for your SME. We grow with you — from a single-owner business to a large operation.
            </p>
            <div className="mt-auto flex justify-center">
              <div className="w-20 h-20 rounded-3xl bg-[#3ECDB0]/15 border border-[#3ECDB0]/20 flex items-center justify-center text-[#3ECDB0]">
                <TrendingUp size={36} />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
