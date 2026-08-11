"use client";

import { motion } from "framer-motion";

const revealVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } }
};

export function Process() {
  const steps = [
    { num: '01', title: 'Discovery & Assessment', desc: 'We review your current bookkeeping, systems, and reporting needs.' },
    { num: '02', title: 'Setup & Migration', desc: 'We set up or clean up your Xero file, bank feeds, and chart of accounts.' },
    { num: '03', title: 'Ongoing Bookkeeping', desc: 'Our team maintains your books on a regular cycle that suits your business.' },
    { num: '04', title: 'Analytics & Reporting', desc: 'We layer AI-aided dashboards and reports on your data for real-time insight.' },
    { num: '05', title: 'Advisory Check-ins', desc: 'We meet regularly to walk through the numbers and support your decisions.' },
  ];

  return (
    <section id="process" className="py-[88px] md:py-[72px]">
      <div className="wrap">
        <motion.div 
          variants={revealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-[640px] mb-[52px]"
        >
          <p className="flex items-center gap-[10px] font-mono text-[12.5px] tracking-[0.14em] uppercase text-[#1C8E76] mb-[18px] before:content-[''] before:w-[22px] before:h-[1px] before:bg-[color:var(--color-teal)] before:inline-block">
            How We Work
          </p>
          <h2 className="text-[clamp(28px,3.4vw,38px)] leading-[1.15] font-semibold font-[family-name:var(--font-space-grotesk)]">
            Five steps, start to steady-state.
          </h2>
        </motion.div>
        
        <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-0">
          <div className="hidden lg:block absolute top-[29px] left-0 right-0 h-[1px] z-0" style={{ background: 'repeating-linear-gradient(90deg, var(--border) 0 8px, transparent 8px 14px)' }}></div>
          
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              variants={revealVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="relative z-10 pr-0 lg:pr-[20px] mb-[36px] lg:mb-0"
            >
              <div className="w-[58px] h-[58px] rounded-full bg-[color:var(--background)] border border-[color:var(--border)] flex items-center justify-center font-mono text-[15px] text-[color:var(--color-navy)] dark:text-[color:var(--color-teal)] mb-[18px]">
                {step.num}
              </div>
              <h3 className="text-[16.5px] font-semibold font-[family-name:var(--font-space-grotesk)] mb-[8px]">
                {step.title}
              </h3>
              <p className="text-[14px] text-[color:var(--muted)] m-0">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
