"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, Check, Zap, Target, Shield, Clock, FileCheck, LineChart, Settings2, Compass } from "lucide-react";
import Link from "next/link";

const revealVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } }
};

type ServiceId = "bookkeeping" | "analytics" | "setup" | "advisory" | null;

const serviceData = {
  bookkeeping: {
    title: "Cloud Bookkeeping",
    subtitle: "Accurate, real-time books so you always know where you stand.",
    tiers: [
      {
        name: "Essential",
        price: "From K299/mo",
        features: ["Monthly Reconciliation", "Up to 100 Transactions", "Basic Xero Subscription", "Quarterly Tax Prep"],
        popular: false
      },
      {
        name: "Growth",
        price: "From K599/mo",
        features: ["Weekly Reconciliation", "Unlimited Transactions", "Premium Xero + Hubdoc", "Payroll for up to 5", "Priority Email Support"],
        popular: true
      },
      {
        name: "Scale",
        price: "Custom",
        features: ["Daily Reconciliation", "Complex Multi-Currency", "Full AP/AR Management", "Dedicated Account Manager", "Custom Reporting"],
        popular: false
      }
    ],
    process: [
      { step: "01", title: "Automate", desc: "We connect bank feeds and OCR tools to remove manual entry." },
      { step: "02", title: "Maintain", desc: "We keep your books flawless on a rolling basis." },
      { step: "03", title: "Review & Clean", desc: "We review your historical data and fix any existing errors." }
    ]
  },
  analytics: {
    title: "Analytics",
    subtitle: "Turn raw transactions into clear, actionable, predictive insights.",
    tiers: [
      {
        name: "Insights",
        price: "From K499/mo",
        features: ["Monthly Dashboard", "Key Metric Tracking", "Cash Flow Snapshot", "Basic Variance Analysis"],
        popular: false
      },
      {
        name: "Predictive",
        price: "From K899/mo",
        features: ["Live Interactive Dashboards", "Cash Flow Forecasting", "Automated Anomaly Alerts", "Monthly Strategy Call"],
        popular: true
      },
      {
        name: "Enterprise",
        price: "Custom",
        features: ["Custom Machine Learning Models", "Consolidated Group Reporting", "Investor-Ready Decks", "Direct Database Access"],
        popular: false
      }
    ],
    process: [
      { step: "01", title: "Connect", desc: "We securely pipe your Xero data into our analytics engine." },
      { step: "02", title: "Model", desc: "We build a custom predictive model of your business." },
      { step: "03", title: "Report", desc: "You receive stunning, actionable dashboards every month." }
    ]
  },
  setup: {
    title: "System Setup",
    subtitle: "Seamless migration and architecture for your financial tech stack.",
    tiers: [
      {
        name: "Quick Start",
        price: "K1,500 once",
        features: ["Xero Account Creation", "Chart of Accounts Design", "Bank Feed Connections", "Basic Invoice Templates"],
        popular: false
      },
      {
        name: "Ecosystem",
        price: "K3,500 once",
        features: ["Everything in Quick Start", "Inventory App Integration", "Payroll System Setup", "Historical Data Migration", "Staff Training Session"],
        popular: true
      },
      {
        name: "Transformation",
        price: "Custom",
        features: ["Full Tech Stack Overhaul", "Custom API Connections", "Multiple Entity Setup", "On-site Implementation"],
        popular: false
      }
    ],
    process: [
      { step: "01", title: "Map", desc: "We map out your current workflows and identify bottlenecks." },
      { step: "02", title: "Build", desc: "We configure Xero and connect the necessary third-party apps." },
      { step: "03", title: "Launch", desc: "We migrate your data safely and train your team on day one." }
    ]
  },
  advisory: {
    title: "Advisory Services",
    subtitle: "Strategic CFO-level guidance to help you scale profitably.",
    tiers: [
      {
        name: "Quarterly",
        price: "K900 /qtr",
        features: ["Quarterly Strategy Session", "Tax Planning Review", "High-Level Budgeting", "Compliance Check"],
        popular: false
      },
      {
        name: "Virtual CFO",
        price: "From K2,000/mo",
        features: ["Monthly Deep-Dive Meeting", "Rolling 12-Month Forecast", "Capital Raising Prep", "Unlimited Email Support", "Board Meeting Attendance"],
        popular: true
      },
      {
        name: "M&A Partner",
        price: "Custom",
        features: ["Due Diligence Prep", "Valuation Modeling", "Acquisition Strategy", "Post-Merger Integration"],
        popular: false
      }
    ],
    process: [
      { step: "01", title: "Diagnose", desc: "Deep dive into your financial health and core business goals." },
      { step: "02", title: "Strategize", desc: "We build a financial roadmap and set key performance targets." },
      { step: "03", title: "Execute", desc: "Ongoing partnership to ensure you hit your targets." }
    ]
  }
};

export function Services() {
  const [activeService, setActiveService] = useState<ServiceId>(null);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (["bookkeeping", "analytics", "setup", "advisory"].includes(hash)) {
        setActiveService(hash as ServiceId);
        // Scroll to the opened details panel after a tiny delay for it to render
        setTimeout(() => {
          document.getElementById('service-details')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 200);
      }
    };
    
    // Check on initial load
    handleHash();

    // Listen for hash changes (e.g., when clicking dropdown links on the same page)
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const toggleService = (id: ServiceId) => {
    setActiveService(activeService === id ? null : id);
    if (activeService !== id) {
      setTimeout(() => {
        document.getElementById('service-details')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  return (
    <section id="services" className="py-16 md:py-14 flex-1 relative bg-[#F0F5F9]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[800px] bg-[#3ECDB0]/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      
      <div className="wrap">
        <motion.div 
          variants={revealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-[640px] mb-10"
        >
          <p className="flex items-center gap-[10px] font-mono text-[12.5px] tracking-[0.14em] uppercase text-[#3ECDB0] mb-[18px] before:content-[''] before:w-[22px] before:h-[1px] before:bg-[#3ECDB0] before:inline-block">
            What We Do
          </p>
          <h2 className="text-[clamp(28px,3.4vw,38px)] leading-[1.15] font-semibold font-[family-name:var(--font-space-grotesk)] text-[#1D4266]">
            A focused suite, built around Xero.
          </h2>
          <p className="text-[#1D4266]/70 text-[16.5px] mt-[14px]">
            Click on any service below to explore our practical pricing tiers and step-by-step implementation process.
          </p>
        </motion.div>
        
        {/* Service Cards Grid - Premium Redesign */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {[
            { id: "bookkeeping", num: "01", title: "Bookkeeping", desc: "Automated & Accurate", icon: <FileCheck size={28} /> },
            { id: "analytics", num: "02", title: "Analytics", desc: "Advanced Insights", icon: <LineChart size={28} /> },
            { id: "setup", num: "03", title: "System Setup", desc: "Seamless Migration", icon: <Settings2 size={28} /> },
            { id: "advisory", num: "04", title: "Advisory", desc: "Strategic CFO Guidance", icon: <Compass size={28} /> },
          ].map((service) => (
            <motion.button 
              key={service.id}
              id={service.id}
              onClick={() => toggleService(service.id as ServiceId)}
              variants={revealVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className={`text-left border rounded-[20px] p-5 transition-all duration-500 relative overflow-hidden group min-h-[160px] flex flex-col justify-between ${
                activeService === service.id 
                  ? "bg-white border-[#3ECDB0] shadow-[0_8px_30px_rgba(62,205,176,0.15)] -translate-y-1" 
                  : "bg-white border-[#1D4266]/10 hover:bg-[#F8FAFC] hover:border-[#3ECDB0]/40 hover:-translate-y-0.5"
              }`}
            >
              {/* Subtle hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#3ECDB0]/0 to-[#3ECDB0]/0 group-hover:from-[#3ECDB0]/5 transition-all duration-500" />
              
              {/* Top Section */}
              <div className="relative z-10 flex items-start justify-between w-full">
                {/* Number Badge */}
                <span className={`font-mono text-[11px] tracking-[0.14em] px-3 py-1 rounded-full border transition-colors ${
                  activeService === service.id ? "bg-[#3ECDB0]/20 border-[#3ECDB0]/30 text-[#3ECDB0]" : "bg-[#1D4266]/5 border-[#1D4266]/10 text-[#1D4266]/40 group-hover:bg-[#3ECDB0]/10 group-hover:text-[#3ECDB0] group-hover:border-[#3ECDB0]/20"
                }`}>
                  {service.num}
                </span>

                {/* Arrow Icon */}
                <div className={`transition-all duration-500 ${
                  activeService === service.id ? "rotate-180 text-[#3ECDB0]" : "text-[#1D4266]/20 group-hover:text-[#3ECDB0] group-hover:translate-y-1"
                }`}>
                  <ArrowDown size={20} />
                </div>
              </div>

              <div className="relative z-10 mt-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-colors shadow-inner ${
                  activeService === service.id ? "bg-[#3ECDB0] text-white" : "bg-white text-[#3ECDB0] group-hover:bg-[#3ECDB0]/10 border border-[#1D4266]/10 group-hover:border-[#3ECDB0]/20"
                }`}>
                  {service.icon}
                </div>
                <h3 className={`text-[19px] font-bold font-[family-name:var(--font-space-grotesk)] transition-colors mb-1.5 ${
                  activeService === service.id ? "text-[#1D4266]" : "text-[#1D4266]/90 group-hover:text-[#1D4266]"
                }`}>
                  {service.title}
                </h3>
                <p className={`text-[13.5px] transition-colors leading-snug ${
                  activeService === service.id ? "text-[#1D4266]/70" : "text-[#1D4266]/60 group-hover:text-[#1D4266]/80"
                }`}>
                  {service.desc}
                </p>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Dynamic Expansion Panel */}
        <AnimatePresence mode="wait">
          {activeService && (
            <motion.div 
              id="service-details"
              key={activeService}
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 40 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="bg-white border border-[#1D4266]/10 rounded-[24px] p-8 md:p-12 relative overflow-hidden shadow-sm">
                
                <div className="text-center max-w-2xl mx-auto mb-16">
                  <h3 className="text-[clamp(32px,4vw,48px)] font-bold font-[family-name:var(--font-space-grotesk)] text-[#1D4266] mb-4">
                    {serviceData[activeService].title}
                  </h3>
                  <p className="text-[16px] text-[#1D4266]/70">
                    {serviceData[activeService].subtitle}
                  </p>
                </div>

                {/* Workflow Timeline */}
                <div className="mb-20">
                  <h4 className="text-[12px] font-mono text-[#3ECDB0] tracking-[0.12em] uppercase mb-10 text-center font-semibold">How We Execute</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    <div className="hidden md:block absolute top-8 left-[15%] right-[15%] h-[1px] bg-[#1D4266]/10 border-t border-dashed border-[#3ECDB0]/30" />
                    
                    {serviceData[activeService].process.map((step, i) => (
                      <div key={i} className="relative z-10 bg-[#F8FAFC] border border-[#1D4266]/10 rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
                        <div className="w-16 h-16 rounded-full bg-[#E8FAF7] border-2 border-[#3ECDB0] flex items-center justify-center mx-auto mb-6 text-[18px] font-bold font-mono text-[#3ECDB0]">
                          {step.step}
                        </div>
                        <h5 className="text-[18px] font-bold text-[#1D4266] mb-3">{step.title}</h5>
                        <p className="text-[14px] text-[#1D4266]/60 leading-relaxed">{step.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing Tiers */}
                <div>
                  <h4 className="text-[12px] font-mono text-[#3ECDB0] tracking-[0.12em] uppercase mb-10 text-center font-semibold">Transparent Pricing</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
                    {serviceData[activeService].tiers.map((tier, i) => (
                      <div key={i} className={`bg-[#F8FAFC] rounded-3xl p-8 flex flex-col relative transition-all duration-300 ${
                        tier.popular 
                          ? "border-2 border-[#3ECDB0] shadow-[0_16px_40px_rgba(62,205,176,0.12)] md:-mt-4 md:mb-4 bg-white" 
                          : "border border-[#1D4266]/10"
                      }`}>
                        {tier.popular && (
                          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#3ECDB0] text-white text-[11px] font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                            Most Popular
                          </div>
                        )}
                        <h5 className="text-[18px] font-semibold text-[#1D4266] mb-2">{tier.name}</h5>
                        <div className="text-[32px] font-bold font-[family-name:var(--font-space-grotesk)] text-[#1D4266] mb-8">
                          {tier.price}
                        </div>
                        <ul className="space-y-4 mb-10 flex-1">
                          {tier.features.map((feat, j) => (
                            <li key={j} className="flex gap-3 text-[14.5px] text-[#1D4266]/70 leading-snug">
                              <Check size={18} className="text-[#3ECDB0] shrink-0" />
                              {feat}
                            </li>
                          ))}
                        </ul>
                        <Link 
                          href="/#contact"
                          className={`w-full py-3.5 rounded-full font-[family-name:var(--font-space-grotesk)] font-semibold text-[14.5px] transition-all duration-200 flex items-center justify-center ${
                            tier.popular 
                              ? "bg-[#3ECDB0] text-white hover:bg-[#2FBEA1] hover:-translate-y-[1px] hover:shadow-[0_6px_20px_rgba(62,205,176,0.35)]" 
                              : "bg-[#E8FAF7] text-[#3ECDB0] hover:bg-[#3ECDB0] hover:text-white"
                          }`}
                        >
                          Select Plan
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
