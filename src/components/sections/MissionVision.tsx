"use client";

import { motion, Variants } from "framer-motion";
import { Target, Eye } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (d: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const, delay: d },
  }),
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export function MissionVision() {
  return (
    <section className="py-16 relative overflow-hidden bg-[#F0F5F9]">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-[color:var(--color-teal)]/5 rounded-full blur-[120px]" />
      </div>

      <div className="wrap relative">
        {/* Section label */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          custom={0}
          className="text-center mb-16"
        >
          <p className="inline-flex items-center gap-[10px] font-mono text-[12.5px] tracking-[0.14em] uppercase text-[#3ECDB0] mb-4
                        before:content-[''] before:w-[22px] before:h-[1px] before:bg-[#3ECDB0] before:inline-block
                        after:content-[''] after:w-[22px] after:h-[1px] after:bg-[#3ECDB0] after:inline-block">
            Our Purpose
          </p>
          <h2 className="text-[clamp(28px,3.4vw,40px)] font-semibold font-[family-name:var(--font-space-grotesk)] text-[#1D4266] leading-[1.15]">
            Built with intention. Driven by impact.
          </h2>
        </motion.div>

        {/* Mission + Vision cards side by side */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Mission card */}
          <motion.div
            variants={fadeUp}
            custom={0.05}
            className="group relative bg-[#F8FAFC] border border-[#1D4266]/10 text-[#1D4266] rounded-[20px] p-10 overflow-hidden
                       hover:shadow-[0_20px_60px_rgba(47,174,147,0.18)] hover:border-[#3ECDB0]/40 transition-all duration-500"
          >
            {/* Glow blob */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#3ECDB0]/15 rounded-full blur-3xl group-hover:bg-[#3ECDB0]/25 transition-colors duration-700" />

            {/* Lottie animation */}
            <div className="w-full h-48 mb-6 relative rounded-2xl overflow-hidden bg-[#3ECDB0]/5 flex items-center justify-center">
              <div className="w-24 h-24 rounded-3xl bg-[#3ECDB0]/15 border border-[#3ECDB0]/25 flex items-center justify-center">
                <Target size={44} className="text-[#3ECDB0]" />
              </div>
            </div>

            {/* Icon */}
            <div className="w-12 h-12 rounded-2xl bg-[#3ECDB0]/20 flex items-center justify-center mb-8 relative">
              <Target size={22} className="text-[#3ECDB0]" />
            </div>

            <span className="block font-mono text-[11.5px] tracking-[0.14em] uppercase text-[#3ECDB0] mb-3 relative">
              Our Mission
            </span>

            <h3 className="text-[clamp(20px,2.2vw,26px)] font-semibold font-[family-name:var(--font-space-grotesk)] leading-[1.2] mb-5 relative">
              Decisions made on real numbers, not guesswork.
            </h3>

            <p className="text-[#1D4266]/70 text-[15.5px] leading-relaxed relative">
              To empower Papua New Guinea businesses, including SMEs, with
              accurate, real-time, cloud-based financial information and{" "}
              <span className="text-[#3ECDB0] font-semibold">
                advanced insight
              </span>{" "}
              — so owners can make faster, better-informed decisions and spend
              less time chasing spreadsheets.
            </p>

            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#3ECDB0] group-hover:w-full transition-all duration-700 rounded-b-[20px]" />
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={0.15}
            className="group relative bg-[#F8FAFC] text-[#1D4266] rounded-[20px] p-10 overflow-hidden
                       border border-[#1D4266]/10
                       hover:shadow-[0_20px_60px_rgba(47,174,147,0.18)] hover:border-[#3ECDB0]/35 transition-all duration-500"
          >
            {/* Glow blob */}
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-[#3ECDB0]/10 rounded-full blur-3xl group-hover:bg-[#3ECDB0]/20 transition-colors duration-700" />

            {/* Lottie animation */}
            <div className="w-full h-48 mb-6 relative rounded-2xl overflow-hidden bg-white/5 flex items-center justify-center">
              <div className="w-24 h-24 rounded-3xl bg-[color:var(--color-gold)]/15 border border-[color:var(--color-gold)]/25 flex items-center justify-center">
                <Eye size={44} className="text-[color:var(--color-gold)]" />
              </div>
            </div>

            {/* Icon */}
            <div className="w-12 h-12 rounded-2xl bg-[color:var(--color-gold)]/15 flex items-center justify-center mb-8 relative">
              <Eye size={22} className="text-[color:var(--color-gold)]" />
            </div>

            <span className="block font-mono text-[11.5px] tracking-[0.14em] uppercase text-[color:var(--color-gold)] mb-3 relative">
              Our Vision
            </span>

            <h3 className="text-[clamp(20px,2.2vw,26px)] font-semibold font-[family-name:var(--font-space-grotesk)] leading-[1.2] mb-5 relative">
              PNG&apos;s leading cloud bookkeeping partner.
            </h3>

            <p className="text-[#1D4266]/70 text-[15.5px] leading-relaxed mb-7 relative">
              To be Papua New Guinea&apos;s leading cloud bookkeeping and
              financial analytics partner — recognised for making modern
              accounting technology accessible, affordable, and genuinely
              useful for local businesses.
            </p>

            {/* Pill badges */}
            <div className="flex flex-wrap gap-2 relative">
              {["Partner", "Affordable", "Useful"].map((label) => (
                <span
                  key={label}
                  className="inline-flex items-center px-3.5 py-1 rounded-full bg-[color:var(--color-teal)]/15 border border-[color:var(--color-teal)]/30 text-[color:var(--color-teal-2)] font-mono text-[11px] tracking-widest uppercase"
                >
                  {label}
                </span>
              ))}
            </div>

            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-[color:var(--color-gold)] group-hover:w-full transition-all duration-700 rounded-b-[20px]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
