"use client";

import { motion } from "framer-motion";

const revealVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } }
};

export function WhyUs() {
  const reasons = [
    { title: 'Local expertise, trusted foundation', desc: 'Backed by Das Kapital Limited — an established Port Moresby accounting and consulting firm.' },
    { title: 'Cloud-first, PNG-focused', desc: 'We specialise in Xero and other cloud accounting platforms, not generic bookkeeping.' },
    { title: 'Beyond the numbers', desc: 'Bookkeeping paired with AI-aided analytics gives you insight, not just historical records.' },
    { title: 'Real-time visibility', desc: 'Your books and reports are accessible anytime, from anywhere.' },
    { title: 'Affordable and scalable', desc: 'Services scaled to fit SMEs, from single-owner businesses to growing teams.' },
    { title: 'Confidential and secure', desc: 'Strict confidentiality protocols and secure cloud systems protect your financial data.' },
  ];

  return (
    <section className="py-[104px] md:py-[72px]">
      <div className="wrap">
        <motion.div 
          variants={revealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-[640px] mb-[52px]"
        >
          <p className="flex items-center gap-[10px] font-mono text-[12.5px] tracking-[0.14em] uppercase text-[#1C8E76] mb-[18px] before:content-[''] before:w-[22px] before:h-[1px] before:bg-[color:var(--color-teal)] before:inline-block">
            Why Kapital PNG
          </p>
          <h2 className="text-[clamp(28px,3.4vw,38px)] leading-[1.15] font-semibold font-[family-name:var(--font-space-grotesk)]">
            What you get, working with us.
          </h2>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[34px_40px]">
          {reasons.map((reason, i) => (
            <motion.div 
              key={i}
              variants={revealVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="border-t border-[color:var(--border)] pt-[20px]"
            >
              <h3 className="text-[18px] font-semibold font-[family-name:var(--font-space-grotesk)] mb-[8px]">
                {reason.title}
              </h3>
              <p className="text-[color:var(--muted)] text-[15px] m-0">
                {reason.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
