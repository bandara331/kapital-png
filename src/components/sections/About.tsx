"use client";

import { motion } from "framer-motion";

const revealVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } }
};

export function About() {
  return (
    <section id="about" className="py-[104px] md:py-[72px]">
      <div className="wrap grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-[48px] items-start">
        <motion.div 
          variants={revealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <p className="flex items-center gap-[10px] font-mono text-[12.5px] tracking-[0.14em] uppercase text-[#1C8E76] mb-[18px] before:content-[''] before:w-[22px] before:h-[1px] before:bg-[color:var(--color-teal)] before:inline-block">
            About Kapital PNG
          </p>
          <h2 className="text-[clamp(28px,3.4vw,38px)] mb-[22px] leading-[1.15] font-semibold font-[family-name:var(--font-space-grotesk)]">
            The cloud accounting arm of a trusted Port Moresby firm.
          </h2>
          <p className="text-[color:var(--muted)] text-[16.5px] mb-[16px]">
            Kapital PNG is the cloud accounting and financial analytics division of Das Kapital Limited, a Port Moresby-based consulting firm with a long-standing track record in accounting, bookkeeping, finance, and business advisory across Papua New Guinea.
          </p>
          <p className="text-[color:var(--muted)] text-[16.5px] mb-[16px]">
            More PNG SMEs are running their businesses on platforms like Xero, yet very few local providers build their bookkeeping and analysis specifically around these tools. We closed that gap — pairing qualified accounting expertise with cloud technology and AI-aided analytics, so business owners get real visibility over their numbers, wherever they are.
          </p>
          <p className="text-[color:var(--muted)] text-[16.5px] mb-[16px]">
            We operate under the governance and professional standards of Das Kapital Limited: a modern, tech-forward service, grounded in the same accuracy, confidentiality, and client-focused advice our parent company was built on.
          </p>
        </motion.div>
        
        <motion.div 
          variants={revealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="bg-[color:var(--color-navy)] text-white rounded-[14px] p-[38px_34px] relative"
        >
          <div className="absolute top-[6px] left-[26px] font-[family-name:var(--font-space-grotesk)] text-[70px] text-[color:var(--color-teal)] opacity-50 leading-[1]">
            “
          </div>
          <p className="font-[family-name:var(--font-space-grotesk)] text-[20px] leading-[1.4] my-[22px] relative z-10">
            Very few local providers offer bookkeeping and analysis built specifically around cloud tools. We closed that gap.
          </p>
          <span className="font-mono text-[12.5px] text-white/55 tracking-[0.04em] uppercase">
            Why Kapital PNG exists
          </span>
        </motion.div>
      </div>
    </section>
  );
}
