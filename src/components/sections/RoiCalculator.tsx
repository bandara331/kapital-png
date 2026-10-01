"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const revealVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } }
};

export function RoiCalculator() {
  const [employees, setEmployees] = useState<number>(10);
  const [transactions, setTransactions] = useState<number>(500);

  const [timeSaved, setTimeSaved] = useState<number>(0);
  const [moneySaved, setMoneySaved] = useState<number>(0);

  useEffect(() => {
    // Assumptions:
    // Base time saved switching to cloud: 10 hours
    // Time saved per employee (payroll/admin): 0.5 hours/month
    // Time saved per 100 transactions: 1.5 hours/month
    // Avg value of owner/manager time: 150 PGK/hour (roughly $40 USD)
    const calculatedTime = 10 + (employees * 0.5) + ((transactions / 100) * 1.5);
    const calculatedMoney = calculatedTime * 150; // PGK

    setTimeSaved(Math.round(calculatedTime));
    setMoneySaved(Math.round(calculatedMoney));
  }, [employees, transactions]);

  return (
    <section id="calculator" className="py-16 bg-[#F0F5F9]">
      <div className="wrap">
        <motion.div 
          variants={revealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-[640px] mb-[48px] text-center mx-auto"
        >
          <p className="flex items-center justify-center gap-[10px] font-mono text-[12.5px] tracking-[0.14em] uppercase text-[#3ECDB0] mb-[18px]">
            <span className="w-[22px] h-[1px] bg-[#3ECDB0] inline-block"></span>
            Value Calculator
            <span className="w-[22px] h-[1px] bg-[#3ECDB0] inline-block"></span>
          </p>
          <h2 className="text-[clamp(28px,3.4vw,38px)] leading-[1.15] font-semibold font-[family-name:var(--font-space-grotesk)] text-[#1D4266] dark:text-white">
            Calculate your potential savings.
          </h2>
          <p className="text-[#5A7A9C] dark:text-white/70 text-[16.5px] mt-[14px]">
            See how much time and money you could reclaim each month by moving to cloud-based bookkeeping and AI analytics.
          </p>
        </motion.div>

        <motion.div 
          variants={revealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="bg-white dark:bg-[#0D2135] border border-[#D9E4EE] dark:border-white/10 rounded-[24px] p-[32px] md:p-[48px] shadow-md max-w-[900px] mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-[48px]"
        >
          {/* Controls */}
          <div className="flex flex-col justify-center">
            <div className="mb-[40px]">
              <div className="flex justify-between mb-[20px]">
                <label className="font-semibold text-[15px] font-[family-name:var(--font-space-grotesk)] text-[#1D4266] dark:text-white">Number of Employees</label>
                <span className="font-mono text-[15px] font-bold text-[#3ECDB0] bg-[#E8FAF7] dark:bg-[#3ECDB0]/20 px-3 py-1 rounded-md">{employees}</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="100" 
                value={employees} 
                onChange={(e) => setEmployees(Number(e.target.value))}
                className="w-full h-2 bg-[#D9E4EE] dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#3ECDB0] focus:outline-none focus:ring-2 focus:ring-[#3ECDB0]/50"
              />
              <div className="flex justify-between text-[12px] font-medium text-[#5A7A9C] dark:text-white/50 mt-[12px]">
                <span>1</span>
                <span>100+</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-[20px]">
                <label className="font-semibold text-[15px] font-[family-name:var(--font-space-grotesk)] text-[#1D4266] dark:text-white">Monthly Transactions</label>
                <span className="font-mono text-[15px] font-bold text-[#3ECDB0] bg-[#E8FAF7] dark:bg-[#3ECDB0]/20 px-3 py-1 rounded-md">{transactions.toLocaleString()}</span>
              </div>
              <input 
                type="range" 
                min="50" 
                max="5000" 
                step="50"
                value={transactions} 
                onChange={(e) => setTransactions(Number(e.target.value))}
                className="w-full h-2 bg-[#D9E4EE] dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#3ECDB0] focus:outline-none focus:ring-2 focus:ring-[#3ECDB0]/50"
              />
              <div className="flex justify-between text-[12px] font-medium text-[#5A7A9C] dark:text-white/50 mt-[12px]">
                <span>50</span>
                <span>5,000+</span>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="bg-[#1D4266] rounded-[20px] p-[32px] md:p-[40px] text-white flex flex-col justify-center relative overflow-hidden shadow-inner">
            <svg className="absolute inset-0 opacity-[0.05] pointer-events-none w-full h-full object-cover" viewBox="0 0 400 300" preserveAspectRatio="none">
              <path d="M-50,150 C100,80 200,200 450,120" stroke="#3ECDB0" strokeWidth="2" fill="none"/>
            </svg>
            
            <div className="relative z-10 text-center mb-[32px]">
              <span className="block font-mono text-[12px] tracking-[0.12em] uppercase text-[#60A5FA] mb-[12px] font-semibold">
                Estimated Time Saved
              </span>
              <div className="flex items-baseline justify-center gap-[8px]">
                <span className="font-[family-name:var(--font-space-grotesk)] font-bold text-[48px] leading-none tracking-tight">{timeSaved}</span>
                <span className="text-white/70 text-[15px] font-medium">hrs/month</span>
              </div>
            </div>

            <div className="relative z-10 text-center mb-[36px]">
              <span className="block font-mono text-[12px] tracking-[0.12em] uppercase text-[#60A5FA] mb-[12px] font-semibold">
                Estimated Value Unlocked
              </span>
              <div className="flex items-baseline justify-center gap-[8px]">
                <span className="font-[family-name:var(--font-space-grotesk)] font-bold text-[48px] leading-none tracking-tight text-white">
                  <span className="text-[20px] mr-2 text-white/70">PGK</span>
                  {moneySaved.toLocaleString()}
                </span>
                <span className="text-white/70 text-[15px] font-medium">/month</span>
              </div>
            </div>

            <div className="relative z-10 text-center">
              <Link href="/#contact" className="inline-block w-full text-center font-[family-name:var(--font-space-grotesk)] font-semibold text-[15px] px-[24px] py-[16px] rounded-full no-underline transition-all duration-200 bg-[#3ECDB0] text-white hover:bg-[#2FBEA1] hover:-translate-y-[2px] hover:shadow-[0_10px_24px_rgba(62,205,176,0.35)]">
                Start Saving Now
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
