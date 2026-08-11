"use client";

import { motion } from "framer-motion";

const revealVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } }
};

export function MissionVision() {
  return (
    <section className="py-[88px] md:py-[72px]">
      <div className="wrap grid grid-cols-1 md:grid-cols-2 gap-[22px]">
        <motion.div 
          variants={revealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="bg-[color:var(--card)] border border-[color:var(--border)] rounded-[14px] p-[38px]"
        >
          <span className="block font-mono text-[12px] tracking-[0.12em] uppercase text-[color:var(--color-teal)] mb-[14px]">
            Our Mission
          </span>
          <h3 className="text-[23px] font-semibold font-[family-name:var(--font-space-grotesk)] mb-[12px]">
            Decisions made on real numbers, not guesswork.
          </h3>
          <p className="text-[color:var(--muted)] text-[15.5px] m-0">
            To empower Papua New Guinean businesses, including SMEs, with accurate, real-time, cloud-based financial information and AI-aided insight — so owners can make faster, better-informed decisions and spend less time chasing spreadsheets.
          </p>
        </motion.div>
        
        <motion.div 
          variants={revealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15, margin: "-50px" }}
          className="bg-[color:var(--color-navy)] text-white rounded-[14px] p-[38px]"
        >
          <span className="block font-mono text-[12px] tracking-[0.12em] uppercase text-[color:var(--color-teal-2)] mb-[14px]">
            Our Vision
          </span>
          <h3 className="text-[23px] font-semibold font-[family-name:var(--font-space-grotesk)] mb-[12px]">
            PNG's leading cloud bookkeeping partner.
          </h3>
          <p className="text-white/75 text-[15.5px] m-0">
            To be Papua New Guinea's leading cloud bookkeeping and financial analytics partner — recognised for making modern accounting technology accessible, affordable, and genuinely useful for local businesses.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
