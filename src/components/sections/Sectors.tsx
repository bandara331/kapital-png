"use client";

import { motion } from "framer-motion";

const revealVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } }
};

export function Sectors() {
  return (
    <section id="sectors" className="bg-[color:var(--color-navy)] text-white py-[104px] md:py-[72px]">
      <div className="wrap">
        <motion.div 
          variants={revealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-[600px] mb-[40px]"
        >
          <p className="flex items-center gap-[10px] font-mono text-[12.5px] tracking-[0.14em] uppercase text-[color:var(--color-teal)] mb-[18px] before:content-[''] before:w-[22px] before:h-[1px] before:bg-[color:var(--color-teal)] before:inline-block">
            Who We Serve
          </p>
          <h2 className="text-[clamp(26px,3vw,34px)] text-white font-semibold font-[family-name:var(--font-space-grotesk)]">
            Built for PNG businesses moving to the cloud.
          </h2>
          <p className="text-white/70 mt-[14px]">
            SMEs and organisations across Papua New Guinea that use, or want to move to, cloud accounting systems.
          </p>
        </motion.div>
        
        <motion.div 
          variants={revealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="flex flex-wrap gap-[12px]"
        >
          {[
            'Retail, trade & services',
            'Import & export businesses',
            'Professional practices & consultancies',
            'Hospitality & tourism operators',
            'NGOs & not-for-profits',
            'Start-ups moving off manual books'
          ].map((sector, i) => (
            <span 
              key={i} 
              className="border border-white/20 rounded-full px-[20px] py-[11px] text-[14.5px] font-[family-name:var(--font-space-grotesk)] font-medium text-white/90 transition-all duration-200 hover:border-[color:var(--color-teal-2)] hover:bg-[rgba(95,212,184,0.08)]"
            >
              {sector}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
