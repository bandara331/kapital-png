"use client";

import { motion } from "framer-motion";

const revealVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};

const steps = [
  { num: "01", title: "Discovery & Assessment", desc: "Reviewing your current accounting methodologies, identifying gaps, and aligning on your financial reporting goals." },
  { num: "02", title: "Setup & Migration", desc: "Configuring your Xero system or seamlessly importing legacy data from your existing accounting platform." },
  { num: "03", title: "Ongoing Bookkeeping", desc: "Maintaining systematic and accurate financial records with regular bank reconciliations and payroll management." },
  { num: "04", title: "Analytics & Reporting", desc: "Delivering live financial reports and interactive dashboards powered by AI, straight to your Client Hub." },
  { num: "05", title: "Advisory Check-ins", desc: "Providing strategic financial guidance and business planning support to help you make confident decisions." },
];

export function Process() {
  return (
    <section id="process" className="py-20 bg-[#F3F8FF] dark:bg-[#032D60]">
      <div className="wrap">
        <motion.div
          variants={revealVariants} initial="hidden" whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="text-center max-w-[640px] mx-auto mb-14"
        >
          <p className="inline-flex items-center gap-2 text-[12px] font-mono tracking-[0.12em] uppercase text-[#0176D3] mb-4 bg-white dark:bg-[#0176D3]/20 px-3.5 py-1.5 rounded-full border border-[#0176D3]/20">
            How We Work
          </p>
          <h2 className="text-[clamp(26px,3.2vw,38px)] font-bold font-[family-name:var(--font-space-grotesk)] text-[#032D60] dark:text-white leading-[1.15]">
            Five steps, from onboarding to advisory.
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line — desktop */}
          <div className="hidden lg:block absolute top-[28px] left-[10%] right-[10%] h-[2px] bg-[#E5E7EB] dark:bg-white/10 z-0" />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                variants={revealVariants} initial="hidden" whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: i * 0.08 }}
                className="relative z-10 bg-white dark:bg-[#021F45] border border-[#E5E7EB] dark:border-white/10 rounded-2xl p-6 text-center hover:shadow-[0_6px_24px_rgba(1,118,211,0.10)] hover:border-[#0176D3]/30 transition-all duration-300"
              >
                {/* Step number circle */}
                <div className="w-14 h-14 rounded-full bg-[#EEF4FF] dark:bg-[#0176D3]/20 border-2 border-[#0176D3]/30 flex items-center justify-center mx-auto mb-4 font-mono text-[15px] font-bold text-[#0176D3]">
                  {step.num}
                </div>
                <h3 className="text-[14.5px] font-semibold font-[family-name:var(--font-space-grotesk)] text-[#032D60] dark:text-white mb-2 leading-tight">
                  {step.title}
                </h3>
                <p className="text-[13px] text-[#54698D] dark:text-white/55 leading-relaxed m-0">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
