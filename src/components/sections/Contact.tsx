"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const revealVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } }
};

export function Contact() {
  return (
    <section id="contact" className="relative bg-gradient-to-br from-[color:var(--color-navy)] to-[color:var(--color-navy-3)] text-white overflow-hidden py-[104px] md:py-[72px]">
      <svg className="absolute inset-0 opacity-[0.12] pointer-events-none w-full h-full object-cover" viewBox="0 0 1200 500" preserveAspectRatio="none" aria-hidden="true">
        <path d="M-50,120 C200,60 350,180 600,110 C850,40 1000,150 1250,90" stroke="var(--color-teal-2)" strokeWidth="1" fill="none"/>
        <path d="M-50,280 C240,230 400,330 640,270 C880,200 1020,300 1250,250" stroke="var(--color-teal-2)" strokeWidth="1" fill="none"/>
      </svg>
      
      <div className="wrap relative z-10 grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-[40px] items-end">
        <motion.div 
          variants={revealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <p className="flex items-center gap-[10px] font-mono text-[12.5px] tracking-[0.14em] uppercase text-[color:var(--color-teal)] mb-[18px] before:content-[''] before:w-[22px] before:h-[1px] before:bg-[color:var(--color-teal)] before:inline-block">
            Get In Touch
          </p>
          <h2 className="text-[clamp(28px,4vw,44px)] text-white leading-[1.12] font-semibold font-[family-name:var(--font-space-grotesk)] mb-[18px]">
            Ready to put real-time numbers behind your decisions?
          </h2>
          <p className="text-white/70 text-[17px] max-w-[480px]">
            Talk to Kapital PNG about moving your bookkeeping to the cloud and putting AI-aided insight behind your numbers.
          </p>
          <div className="flex gap-[14px] flex-wrap mt-[26px]">
            <Link href="mailto:daskapitalltd@gmail.com" className="inline-flex items-center gap-2 font-[family-name:var(--font-space-grotesk)] font-semibold text-[14.5px] px-[22px] py-[12px] rounded-full no-underline transition-all duration-200 border border-transparent bg-[color:var(--color-teal)] text-[color:var(--color-navy-3)] hover:-translate-y-[2px] hover:shadow-[0_10px_24px_rgba(47,174,147,0.35)]">
              Email us
            </Link>
            <Link href="tel:+6758150413" className="inline-flex items-center gap-2 font-[family-name:var(--font-space-grotesk)] font-semibold text-[14.5px] px-[22px] py-[12px] rounded-full no-underline transition-all duration-200 border border-white/35 text-white hover:border-white hover:bg-white/5">
              Call +675 8150 4134
            </Link>
          </div>
        </motion.div>
        
        <motion.div 
          variants={revealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="bg-white/5 border border-white/15 rounded-[14px] p-[30px_32px]"
        >
          <span className="block font-mono text-[12px] tracking-[0.1em] uppercase text-[color:var(--color-teal-2)] mb-[16px]">
            Kapital PNG
          </span>
          <div className="flex justify-between gap-[12px] py-[12px] border-b border-white/10 text-[14.5px]">
            <span className="text-white/50">Entity</span>
            <span className="text-right text-white">A trading division of Das Kapital Limited</span>
          </div>
          <div className="flex justify-between gap-[12px] py-[12px] border-b border-white/10 text-[14.5px]">
            <span className="text-white/50">Address</span>
            <span className="text-right text-white">P.O. Box 414, Vision City, Waigani, Port Moresby, PNG</span>
          </div>
          <div className="flex justify-between gap-[12px] py-[12px] border-b border-white/10 text-[14.5px]">
            <span className="text-white/50">Phone</span>
            <span className="text-right text-white">
              <Link href="tel:+6758150413" className="hover:text-[color:var(--color-teal-2)] transition-colors">+675 8150 4134</Link> / 
              <Link href="tel:+67575388212" className="hover:text-[color:var(--color-teal-2)] transition-colors ml-1">+675 75388212</Link>
            </span>
          </div>
          <div className="flex justify-between gap-[12px] pt-[12px] text-[14.5px]">
            <span className="text-white/50">Email</span>
            <span className="text-right text-white">
              <Link href="mailto:daskapitalltd@gmail.com" className="hover:text-[color:var(--color-teal-2)] transition-colors">daskapitalltd@gmail.com</Link>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
