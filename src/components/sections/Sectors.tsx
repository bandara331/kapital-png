"use client";

import { motion } from "framer-motion";
import { Building2, ShoppingBag, Ship, Hotel, Heart, Lightbulb } from "lucide-react";

const revealVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};

export function Sectors() {
  return (
    <section id="sectors" className="py-20 bg-white dark:bg-[#021F45]">
      <div className="wrap">
        <motion.div
          variants={revealVariants} initial="hidden" whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="text-center max-w-[640px] mx-auto mb-14"
        >
          <p className="inline-flex items-center gap-2 text-[12px] font-mono tracking-[0.12em] uppercase text-[#0176D3] mb-4 bg-[#EEF4FF] px-3.5 py-1.5 rounded-full border border-[#0176D3]/20">
            Who We Serve
          </p>
          <h2 className="text-[clamp(26px,3.2vw,38px)] font-bold font-[family-name:var(--font-space-grotesk)] text-[#032D60] dark:text-white leading-[1.15] mb-4">
            Built for PNG businesses moving to the cloud.
          </h2>
          <p className="text-[#54698D] dark:text-white/60 text-[16px]">
            SMEs and organisations across Papua New Guinea that use, or want to move to, cloud accounting systems.
          </p>
        </motion.div>

        <div className="flex flex-col gap-8">
          
          {/* 1. SMEs (Image Right) */}
          <motion.div
            variants={revealVariants} initial="hidden" whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="group flex flex-col md:flex-row items-center gap-8 bg-white dark:bg-[#032D60] border border-[#E5E7EB] dark:border-white/10 rounded-2xl p-8 hover:shadow-[0_8px_30px_rgba(1,118,211,0.10)] hover:border-[#0176D3]/30 transition-all duration-300"
          >
            <div className="flex-1 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#EEF4FF] dark:bg-[#0176D3]/20 flex items-center justify-center text-[#0176D3] shrink-0 group-hover:bg-[#0176D3] group-hover:text-white transition-colors duration-300">
                <Building2 size={24} />
              </div>
              <h3 className="text-[26px] md:text-[32px] font-semibold font-[family-name:var(--font-space-grotesk)] text-[#032D60] dark:text-white leading-tight">
                Small & Medium Enterprises (SMEs)
              </h3>
              <p className="text-[15.5px] text-[#54698D] dark:text-white/60 leading-relaxed max-w-[500px]">
                Understand what defines a Small and Medium Enterprise (SME), their economic impact, and why they're crucial for global innovation and growth. Get a clear and concise overview of how we give SMEs enterprise-level financial visibility in PNG.
              </p>
            </div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true, amount: 0.2 }}
              className="flex-1 w-full max-w-[500px] md:max-w-none"
            >
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}>
                <img 
                  src="https://images.unsplash.com/photo-1664575602276-acd073f104c1?q=80&w=1000&auto=format&fit=crop" 
                  alt="SME Business" 
                  className="w-full h-[280px] lg:h-[340px] rounded-xl shadow-lg shadow-[#0176D3]/10 border border-[#E5E7EB] dark:border-white/10 object-cover"
                />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* 2. Retail & Services (Image Left) */}
          <motion.div
            variants={revealVariants} initial="hidden" whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="group flex flex-col md:flex-row-reverse items-center gap-8 bg-white dark:bg-[#032D60] border border-[#E5E7EB] dark:border-white/10 rounded-2xl p-8 hover:shadow-[0_8px_30px_rgba(1,118,211,0.10)] hover:border-[#0176D3]/30 transition-all duration-300"
          >
            <div className="flex-1 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#EEF4FF] dark:bg-[#0176D3]/20 flex items-center justify-center text-[#0176D3] shrink-0 group-hover:bg-[#0176D3] group-hover:text-white transition-colors duration-300">
                <ShoppingBag size={24} />
              </div>
              <h3 className="text-[26px] md:text-[32px] font-semibold font-[family-name:var(--font-space-grotesk)] text-[#032D60] dark:text-white leading-tight">
                Retail & Services
              </h3>
              <p className="text-[15.5px] text-[#54698D] dark:text-white/60 leading-relaxed max-w-[500px]">
                From independent trade stores to large-scale service companies, we keep your books clean, current, and compliant. Ensure accurate inventory tracking, seamless payroll, and real-time cash flow visibility so you can focus on your customers, not your spreadsheets.
              </p>
            </div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, x: -20 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true, amount: 0.2 }}
              className="flex-1 w-full max-w-[500px] md:max-w-none"
            >
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 5, ease: "easeInOut", repeat: Infinity, delay: 0.5 }}>
                <img 
                  src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1000&auto=format&fit=crop" 
                  alt="Retail and Services" 
                  className="w-full h-[280px] lg:h-[340px] rounded-xl shadow-lg shadow-[#0176D3]/10 border border-[#E5E7EB] dark:border-white/10 object-cover"
                />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* 3. Import & Export Companies (Image Right) */}
          <motion.div
            variants={revealVariants} initial="hidden" whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="group flex flex-col md:flex-row items-center gap-8 bg-white dark:bg-[#032D60] border border-[#E5E7EB] dark:border-white/10 rounded-2xl p-8 hover:shadow-[0_8px_30px_rgba(1,118,211,0.10)] hover:border-[#0176D3]/30 transition-all duration-300"
          >
            <div className="flex-1 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#EEF4FF] dark:bg-[#0176D3]/20 flex items-center justify-center text-[#0176D3] shrink-0 group-hover:bg-[#0176D3] group-hover:text-white transition-colors duration-300">
                <Ship size={24} />
              </div>
              <h3 className="text-[26px] md:text-[32px] font-semibold font-[family-name:var(--font-space-grotesk)] text-[#032D60] dark:text-white leading-tight">
                Import & Export Companies
              </h3>
              <p className="text-[15.5px] text-[#54698D] dark:text-white/60 leading-relaxed max-w-[500px]">
                Navigating multi-currency accounts and cross-border transactions doesn't have to be complex. We handle foreign exchange gains and losses accurately in Xero, ensuring your international trading operations remain compliant and fully transparent.
              </p>
            </div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true, amount: 0.2 }}
              className="flex-1 w-full max-w-[500px] md:max-w-none"
            >
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 5, ease: "easeInOut", repeat: Infinity, delay: 0.2 }}>
                <img 
                  src="https://images.unsplash.com/photo-1494412519320-aa613dfb7738?q=80&w=1000&auto=format&fit=crop" 
                  alt="Import and Export Logistics" 
                  className="w-full h-[280px] lg:h-[340px] rounded-xl shadow-lg shadow-[#0176D3]/10 border border-[#E5E7EB] dark:border-white/10 object-cover"
                />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* 4. Hospitality & Tourism (Image Left) */}
          <motion.div
            variants={revealVariants} initial="hidden" whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="group flex flex-col md:flex-row-reverse items-center gap-8 bg-white dark:bg-[#032D60] border border-[#E5E7EB] dark:border-white/10 rounded-2xl p-8 hover:shadow-[0_8px_30px_rgba(1,118,211,0.10)] hover:border-[#0176D3]/30 transition-all duration-300"
          >
            <div className="flex-1 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#EEF4FF] dark:bg-[#0176D3]/20 flex items-center justify-center text-[#0176D3] shrink-0 group-hover:bg-[#0176D3] group-hover:text-white transition-colors duration-300">
                <Hotel size={24} />
              </div>
              <h3 className="text-[26px] md:text-[32px] font-semibold font-[family-name:var(--font-space-grotesk)] text-[#032D60] dark:text-white leading-tight">
                Hospitality & Tourism
              </h3>
              <p className="text-[15.5px] text-[#54698D] dark:text-white/60 leading-relaxed max-w-[500px]">
                Hotels, lodges, and tour operators across PNG trust us for real-time financials. From tracking occupancy-driven revenue fluctuations to managing supplier payables efficiently, we ensure your back-office runs as seamlessly as your front desk.
              </p>
            </div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, x: -20 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true, amount: 0.2 }}
              className="flex-1 w-full max-w-[500px] md:max-w-none"
            >
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 5, ease: "easeInOut", repeat: Infinity, delay: 0.6 }}>
                <img 
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000&auto=format&fit=crop" 
                  alt="Hospitality and Tourism" 
                  className="w-full h-[280px] lg:h-[340px] rounded-xl shadow-lg shadow-[#0176D3]/10 border border-[#E5E7EB] dark:border-white/10 object-cover"
                />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* 5. NGOs & Not-for-profits (Image Right) */}
          <motion.div
            variants={revealVariants} initial="hidden" whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="group flex flex-col md:flex-row items-center gap-8 bg-white dark:bg-[#032D60] border border-[#E5E7EB] dark:border-white/10 rounded-2xl p-8 hover:shadow-[0_8px_30px_rgba(1,118,211,0.10)] hover:border-[#0176D3]/30 transition-all duration-300"
          >
            <div className="flex-1 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#EEF4FF] dark:bg-[#0176D3]/20 flex items-center justify-center text-[#0176D3] shrink-0 group-hover:bg-[#0176D3] group-hover:text-white transition-colors duration-300">
                <Heart size={24} />
              </div>
              <h3 className="text-[26px] md:text-[32px] font-semibold font-[family-name:var(--font-space-grotesk)] text-[#032D60] dark:text-white leading-tight">
                NGOs & Not-for-profits
              </h3>
              <p className="text-[15.5px] text-[#54698D] dark:text-white/60 leading-relaxed max-w-[500px]">
                Donor reporting, grant management, and compliance made simple. We help nonprofits implement tracking codes and structured accounting practices, giving complete transparency to stakeholders and boards so you can focus on your mission.
              </p>
            </div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true, amount: 0.2 }}
              className="flex-1 w-full max-w-[500px] md:max-w-none"
            >
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 5, ease: "easeInOut", repeat: Infinity, delay: 0.3 }}>
                <img 
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000&auto=format&fit=crop" 
                  alt="NGO and Non-profit" 
                  className="w-full h-[280px] lg:h-[340px] rounded-xl shadow-lg shadow-[#0176D3]/10 border border-[#E5E7EB] dark:border-white/10 object-cover"
                />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* 6. Start-ups (Image Left) */}
          <motion.div
            variants={revealVariants} initial="hidden" whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="group flex flex-col md:flex-row-reverse items-center gap-8 bg-white dark:bg-[#032D60] border border-[#E5E7EB] dark:border-white/10 rounded-2xl p-8 hover:shadow-[0_8px_30px_rgba(1,118,211,0.10)] hover:border-[#0176D3]/30 transition-all duration-300"
          >
            <div className="flex-1 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#EEF4FF] dark:bg-[#0176D3]/20 flex items-center justify-center text-[#0176D3] shrink-0 group-hover:bg-[#0176D3] group-hover:text-white transition-colors duration-300">
                <Lightbulb size={24} />
              </div>
              <h3 className="text-[26px] md:text-[32px] font-semibold font-[family-name:var(--font-space-grotesk)] text-[#032D60] dark:text-white leading-tight">
                Start-ups
              </h3>
              <p className="text-[15.5px] text-[#54698D] dark:text-white/60 leading-relaxed max-w-[500px]">
                Build your financial foundation right from day one with cloud-native bookkeeping. Avoid messy historical clean-ups later by starting with clean charts of accounts, seamless tech stack integrations, and scalable processes designed for hyper-growth.
              </p>
            </div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, x: -20 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true, amount: 0.2 }}
              className="flex-1 w-full max-w-[500px] md:max-w-none"
            >
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 5, ease: "easeInOut", repeat: Infinity, delay: 0.8 }}>
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop" 
                  alt="Start-ups and Innovation" 
                  className="w-full h-[280px] lg:h-[340px] rounded-xl shadow-lg shadow-[#0176D3]/10 border border-[#E5E7EB] dark:border-white/10 object-cover"
                />
              </motion.div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
