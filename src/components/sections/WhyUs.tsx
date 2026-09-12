"use client";

import { motion } from "framer-motion";
import { MapPin, Cloud, Brain, Eye, Clock, Lock } from "lucide-react";

const revealVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};

export function WhyUs() {
  return (
    <section className="py-20 bg-white dark:bg-[#021F45]">
      <div className="wrap">
        <motion.div
          variants={revealVariants} initial="hidden" whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="text-center max-w-[640px] mx-auto mb-14"
        >
          <p className="inline-flex items-center gap-2 text-[12px] font-mono tracking-[0.12em] uppercase text-[#0176D3] mb-4 bg-[#EEF4FF] px-3.5 py-1.5 rounded-full border border-[#0176D3]/20">
            Why Kapital PNG
          </p>
          <h2 className="text-[clamp(26px,3.2vw,38px)] font-bold font-[family-name:var(--font-space-grotesk)] text-[#032D60] dark:text-white leading-[1.15]">
            What you get working with us.
          </h2>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Card 1: Local Expertise */}
          <motion.div
            variants={revealVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="group relative overflow-hidden bg-[#F3F8FF] dark:bg-[#032D60] border border-[#E5E7EB] dark:border-white/10 rounded-3xl p-8 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(1,118,211,0.12)] hover:border-[#0176D3]/30 transition-all duration-300 flex flex-col"
          >
            <div className="flex-1">
              <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#0176D3]/20 flex items-center justify-center text-[#0176D3] mb-5 shadow-sm">
                <MapPin size={20} />
              </div>
              <h3 className="text-[20px] font-semibold font-[family-name:var(--font-space-grotesk)] text-[#032D60] dark:text-white mb-2.5">
                Local expertise, trusted foundation
              </h3>
              <p className="text-[14.5px] text-[#54698D] dark:text-white/70 leading-relaxed mb-6">
                Backed by Das Kapital Limited — an established Port Moresby accounting and consulting firm with a proven track record across PNG.
              </p>
            </div>
            <div className="w-full h-[180px] rounded-2xl overflow-hidden mt-auto border border-[#E5E7EB] dark:border-white/10">
              <img 
                src="https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?q=80&w=800&auto=format&fit=crop" 
                alt="Port Moresby"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </motion.div>

          {/* Card 2: Cloud-first */}
          <motion.div
            variants={revealVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="group bg-white dark:bg-[#032D60] border border-[#E5E7EB] dark:border-white/10 rounded-3xl p-8 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(1,118,211,0.12)] hover:border-[#0176D3]/30 transition-all duration-300 flex flex-col"
          >
            <div className="flex-1">
              <div className="w-10 h-10 rounded-xl bg-[#EEF4FF] dark:bg-[#0176D3]/20 flex items-center justify-center text-[#0176D3] mb-5">
                <Cloud size={20} />
              </div>
              <h3 className="text-[18px] font-semibold font-[family-name:var(--font-space-grotesk)] text-[#032D60] dark:text-white mb-2.5">
                Cloud-first, PNG-focused
              </h3>
              <p className="text-[14.5px] text-[#54698D] dark:text-white/60 leading-relaxed mb-6">
                We specialise in Xero and other cloud platforms, bringing modern global standards specifically to the Papua New Guinea business environment.
              </p>
            </div>
            <div className="w-full h-[180px] rounded-2xl overflow-hidden mt-auto border border-[#E5E7EB] dark:border-white/10">
              <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=400&auto=format&fit=crop" alt="Cloud tech" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
          </motion.div>

          {/* Card 3: Beyond the numbers */}
          <motion.div
            variants={revealVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="group bg-white dark:bg-[#032D60] border border-[#E5E7EB] dark:border-white/10 rounded-3xl p-8 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(1,118,211,0.12)] hover:border-[#0176D3]/30 transition-all duration-300 flex flex-col"
          >
            <div className="flex-1">
              <div className="w-10 h-10 rounded-xl bg-[#EEF4FF] dark:bg-[#0176D3]/20 flex items-center justify-center text-[#0176D3] mb-5">
                <Brain size={20} />
              </div>
              <h3 className="text-[18px] font-semibold font-[family-name:var(--font-space-grotesk)] text-[#032D60] dark:text-white mb-2.5">
                Beyond the numbers
              </h3>
              <p className="text-[14.5px] text-[#54698D] dark:text-white/60 leading-relaxed mb-6">
                Bookkeeping paired with AI-aided analytics gives you forward-looking insight, not just historical records of what happened last month.
              </p>
            </div>
            <div className="w-full h-[180px] rounded-2xl overflow-hidden mt-auto border border-[#E5E7EB] dark:border-white/10">
              <img src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=400&auto=format&fit=crop" alt="Data analytics" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
          </motion.div>

          {/* Card 4: Real-time visibility */}
          <motion.div
            variants={revealVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.3 }}
            className="group relative overflow-hidden bg-[#032D60] border border-[#032D60] dark:border-white/10 rounded-3xl p-8 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(3,45,96,0.3)] transition-all duration-300 flex flex-col"
          >
            <div className="flex-1 z-30">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white mb-5 backdrop-blur-sm">
                <Eye size={20} />
              </div>
              <h3 className="text-[20px] font-semibold font-[family-name:var(--font-space-grotesk)] text-white mb-2.5">
                Real-time visibility 
              </h3>
              <p className="text-[14.5px] text-white/70 leading-relaxed mb-6">
                Your books and financial reports are accessible anytime, from anywhere in Papua New Guinea — or the world.
              </p>
            </div>
            
            {/* The 2 Animated Images */}
            <div className="w-full relative h-[180px] mt-auto">
              <motion.img 
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=500&auto=format&fit=crop" 
                alt="Dashboard Data"
                className="absolute left-0 bottom-4 w-[60%] h-[140px] object-cover rounded-2xl shadow-2xl border border-white/10 z-10"
              />
              <motion.img 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, ease: "easeInOut", repeat: Infinity, delay: 1 }}
                src="https://images.unsplash.com/photo-1543286386-2e659306cd6c?q=80&w=400&auto=format&fit=crop" 
                alt="Mobile Dashboard"
                className="absolute right-4 top-0 w-[55%] h-[150px] object-cover rounded-2xl shadow-2xl border border-white/10 z-20"
              />
            </div>
          </motion.div>

          {/* Card 5: Affordable */}
          <motion.div
            variants={revealVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.4 }}
            className="group bg-white dark:bg-[#032D60] border border-[#E5E7EB] dark:border-white/10 rounded-3xl p-8 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(1,118,211,0.12)] hover:border-[#0176D3]/30 transition-all duration-300 flex flex-col"
          >
            <div className="flex-1">
              <div className="w-10 h-10 rounded-xl bg-[#EEF4FF] dark:bg-[#0176D3]/20 flex items-center justify-center text-[#0176D3] mb-5">
                <Clock size={20} />
              </div>
              <h3 className="text-[18px] font-semibold font-[family-name:var(--font-space-grotesk)] text-[#032D60] dark:text-white mb-2.5">
                Affordable & Scalable
              </h3>
              <p className="text-[14.5px] text-[#54698D] dark:text-white/60 leading-relaxed mb-6">
                Services scaled to fit your SME. We grow with you, from a single-owner business to a large operation with growing teams.
              </p>
            </div>
            <div className="w-full h-[180px] rounded-2xl overflow-hidden mt-auto border border-[#E5E7EB] dark:border-white/10">
              <img src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=400&auto=format&fit=crop" alt="Scalable business" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
          </motion.div>

          {/* Card 6: Confidential */}
          <motion.div
            variants={revealVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} transition={{ delay: 0.5 }}
            className="group bg-white dark:bg-[#032D60] border border-[#E5E7EB] dark:border-white/10 rounded-3xl p-8 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(1,118,211,0.12)] hover:border-[#0176D3]/30 transition-all duration-300 flex flex-col"
          >
            <div className="flex-1 z-10">
              <div className="w-10 h-10 rounded-xl bg-[#EEF4FF] dark:bg-[#0176D3]/20 flex items-center justify-center text-[#0176D3] mb-5">
                <Lock size={20} />
              </div>
              <h3 className="text-[18px] font-semibold font-[family-name:var(--font-space-grotesk)] text-[#032D60] dark:text-white mb-2.5">
                Confidential & Secure
              </h3>
              <p className="text-[14.5px] text-[#54698D] dark:text-white/60 leading-relaxed mb-6">
                Strict confidentiality protocols and enterprise-grade cloud systems protect your financial data at all times.
              </p>
            </div>
            <div className="w-full h-[180px] rounded-2xl overflow-hidden mt-auto border border-[#E5E7EB] dark:border-white/10">
              <img src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=600&auto=format&fit=crop" alt="Security" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
