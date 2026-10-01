"use client";

import { motion } from "framer-motion";

const revealVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } }
};

export function About() {
  return (
    <section id="about" className="py-16 md:py-14 bg-[#F0F5F9]">
      <div className="wrap grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-[48px] items-start">
        <motion.div 
          variants={revealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <p className="flex items-center gap-[10px] font-mono text-[12.5px] tracking-[0.14em] uppercase text-[#3ECDB0] mb-[18px] before:content-[''] before:w-[22px] before:h-[1px] before:bg-[#3ECDB0] before:inline-block">
            About Kapital PNG
          </p>
          <h2 className="text-[clamp(28px,3.4vw,38px)] mb-[22px] leading-[1.15] font-semibold font-[family-name:var(--font-space-grotesk)] text-[#1D4266]">
            Cloud Based Accounting for PNG Businesses
          </h2>
          <p className="text-[#5A7A9C] text-[16.5px] mb-[16px]">
            Kapital PNG is the cloud based accounting and financial analytics firm trusted by many businesses across Papua New Guinea.
          </p>
          <p className="text-[#5A7A9C] text-[16.5px] mb-[16px]">
            We help businesses in Papua New Guinea manage their accounting, bookkeeping and financial information using modern cloud platforms such as Xero and other accounting software.
          </p>
          <p className="text-[#5A7A9C] text-[16.5px] mb-[16px]">
            As more businesses move to cloud accounting, we provide a simple solution that combines professional accounting knowledge, cloud technology and advanced financial analysis. This helps business owners understand their numbers, monitor performance and make better business decisions from anywhere.
          </p>
          <p className="text-[#5A7A9C] text-[16.5px] mb-[16px]">
            Kapital PNG operates under the professional standards with a strong focus on accuracy, confidentiality, reliability and practical business advice.
          </p>
        </motion.div>
        
        <motion.div 
          variants={revealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="bg-[#EBF2FA] border border-[#D9E4EE] rounded-[14px] p-[38px_34px] relative"
        >
          <div className="absolute top-[6px] left-[26px] font-[family-name:var(--font-space-grotesk)] text-[70px] text-[#3ECDB0] opacity-40 leading-[1]">
            &ldquo;
          </div>
          <p className="font-[family-name:var(--font-space-grotesk)] text-[20px] leading-[1.4] my-[22px] relative z-10 text-[#1D4266]">
            A simple solution that combines professional accounting knowledge, cloud technology and advanced financial analysis — helping PNG business owners make better decisions from anywhere.
          </p>
          <span className="font-mono text-[12.5px] text-[#5A7A9C] tracking-[0.04em] uppercase">
            What we do
          </span>
        </motion.div>
      </div>
    </section>
  );
}
