"use client";

import { motion } from "framer-motion";
import { Search, Database, Calculator, LineChart, ShieldCheck } from "lucide-react";

const steps = [
  { 
    num: "01", 
    title: "Discovery", 
    desc: "Reviewing your current accounting methodologies, identifying gaps, and aligning on goals.", 
    icon: <Search size={24} />,
    delay: 0
  },
  { 
    num: "02", 
    title: "Migration", 
    desc: "Configuring your Xero system or seamlessly importing legacy data from existing platforms.", 
    icon: <Database size={24} />,
    delay: 0.1
  },
  { 
    num: "03", 
    title: "Bookkeeping", 
    desc: "Maintaining systematic records with regular bank reconciliations and payroll management.", 
    icon: <Calculator size={24} />,
    delay: 0.2
  },
  { 
    num: "04", 
    title: "Analytics", 
    desc: "Delivering live financial reports and interactive dashboards straight to your Client Hub.", 
    icon: <LineChart size={24} />,
    delay: 0.3
  },
  { 
    num: "05", 
    title: "Advisory", 
    desc: "Providing strategic financial guidance and business planning to help you make confident decisions.", 
    icon: <ShieldCheck size={24} />,
    delay: 0.4
  },
];

export function Process() {
  return (
    <section id="process" className="py-16 bg-[#F0F5F9] relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#3ECDB0]/5 rounded-[100%] blur-[120px] pointer-events-none" />

      <div className="wrap relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-[640px] mx-auto mb-20"
        >
          <p className="inline-flex items-center gap-2 text-[12px] font-mono tracking-[0.14em] uppercase text-[#3ECDB0] mb-5 bg-[#3ECDB0]/10 px-4 py-2 rounded-full border border-[#3ECDB0]/20">
            How We Work
          </p>
          <h2 className="text-[clamp(28px,3.8vw,46px)] font-bold font-[family-name:var(--font-space-grotesk)] text-[#1D4266] leading-[1.1]">
            Five steps, from onboarding <br />
            <span className="text-[#3ECDB0]">to advisory.</span>
          </h2>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Animated glowing connecting line (desktop) */}
          <div className="hidden lg:block absolute top-[64px] left-[10%] right-[10%] h-[2px] bg-[#1D4266]/5 z-0 rounded-full overflow-hidden">
            <motion.div
              initial={{ x: "-100%" }}
              whileInView={{ x: "100%" }}
              transition={{ duration: 3, ease: "linear", repeat: Infinity }}
              className="w-1/2 h-full bg-gradient-to-r from-transparent via-[#3ECDB0] to-transparent opacity-70"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4">
            {steps.map((step) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6, delay: step.delay, ease: "easeOut" }}
                className="group relative z-10 bg-white border border-[#1D4266]/10 rounded-3xl p-7 hover:border-[#3ECDB0]/40 transition-all duration-500 hover:shadow-[0_16px_40px_rgba(62,205,176,0.12)] hover:-translate-y-2 overflow-hidden flex flex-col items-center text-center"
              >
                {/* Giant background number */}
                <span className="absolute -bottom-4 -right-2 text-[120px] font-black font-mono text-[#1D4266]/[0.02] group-hover:text-[#3ECDB0]/[0.05] transition-colors duration-500 pointer-events-none select-none">
                  {step.num}
                </span>

                {/* Icon Circle */}
                <div className="relative w-16 h-16 rounded-2xl bg-[#F8FAFC] border border-[#1D4266]/10 flex items-center justify-center text-[#3ECDB0] mb-6 group-hover:scale-110 group-hover:border-[#3ECDB0]/30 transition-all duration-500 shadow-inner">
                  <div className="absolute inset-0 bg-[#3ECDB0]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">{step.icon}</div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-[17px] font-bold font-[family-name:var(--font-space-grotesk)] text-[#1D4266] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[13.5px] text-[#1D4266]/60 leading-relaxed group-hover:text-[#1D4266]/80 transition-colors duration-300">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
