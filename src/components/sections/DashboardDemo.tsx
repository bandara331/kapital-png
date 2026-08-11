"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";

const revealVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } }
};

// Mock Datasets
const dataCashflow = [
  { month: "Jan", in: 125000, out: 95000 },
  { month: "Feb", in: 132000, out: 98000 },
  { month: "Mar", in: 115000, out: 105000 },
  { month: "Apr", in: 145000, out: 92000 },
  { month: "May", in: 155000, out: 99000 },
  { month: "Jun", in: 142000, out: 101000 },
];

const dataPnL = [
  { month: "Jan", revenue: 140000, expense: 95000, profit: 45000 },
  { month: "Feb", revenue: 148000, expense: 98000, profit: 50000 },
  { month: "Mar", revenue: 130000, expense: 105000, profit: 25000 },
  { month: "Apr", revenue: 162000, expense: 92000, profit: 70000 },
  { month: "May", revenue: 175000, expense: 99000, profit: 76000 },
  { month: "Jun", revenue: 160000, expense: 101000, profit: 59000 },
];

const dataTax = [
  { month: "Jan", estimated: 13500, paid: 13500 },
  { month: "Feb", estimated: 15000, paid: 15000 },
  { month: "Mar", estimated: 7500, paid: 7500 },
  { month: "Apr", estimated: 21000, paid: 0 },
  { month: "May", estimated: 22800, paid: 0 },
  { month: "Jun", estimated: 17700, paid: 0 },
];

type TabType = "cashflow" | "pnl" | "tax";

export function DashboardDemo() {
  const [activeTab, setActiveTab] = useState<TabType>("cashflow");

  const renderChart = () => {
    switch(activeTab) {
      case "cashflow":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dataCashflow} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorIn" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-teal)" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="var(--color-teal)" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorOut" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="month" stroke="currentColor" className="text-[12px] opacity-50" tickLine={false} axisLine={false} />
              <YAxis stroke="currentColor" className="text-[12px] opacity-50" tickLine={false} axisLine={false} tickFormatter={(value) => `K${value/1000}k`} />
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="opacity-10" />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--color-navy)', borderColor: 'var(--color-line-dark)', color: '#fff', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
                formatter={(value: any) => [`PGK ${Number(value).toLocaleString()}`, '']}
              />
              <Area type="monotone" name="Cash In" dataKey="in" stroke="var(--color-teal)" strokeWidth={3} fillOpacity={1} fill="url(#colorIn)" />
              <Area type="monotone" name="Cash Out" dataKey="out" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorOut)" />
              <Legend iconType="circle" wrapperStyle={{ fontSize: '13px', paddingTop: '10px' }} />
            </AreaChart>
          </ResponsiveContainer>
        );
      case "pnl":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dataPnL} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <XAxis dataKey="month" stroke="currentColor" className="text-[12px] opacity-50" tickLine={false} axisLine={false} />
              <YAxis stroke="currentColor" className="text-[12px] opacity-50" tickLine={false} axisLine={false} tickFormatter={(value) => `K${value/1000}k`} />
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="opacity-10" />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--color-navy)', borderColor: 'var(--color-line-dark)', color: '#fff', borderRadius: '8px' }}
                cursor={{ fill: 'currentColor', opacity: 0.05 }}
                formatter={(value: any) => [`PGK ${Number(value).toLocaleString()}`, '']}
              />
              <Legend iconType="circle" wrapperStyle={{ fontSize: '13px', paddingTop: '10px' }} />
              <Bar name="Revenue" dataKey="revenue" fill="var(--color-teal)" radius={[4, 4, 0, 0]} />
              <Bar name="Expenses" dataKey="expense" fill="#ef4444" radius={[4, 4, 0, 0]} />
              <Bar name="Net Profit" dataKey="profit" fill="var(--color-gold)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
      case "tax":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dataTax} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorEst" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-gold)" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="var(--color-gold)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="month" stroke="currentColor" className="text-[12px] opacity-50" tickLine={false} axisLine={false} />
              <YAxis stroke="currentColor" className="text-[12px] opacity-50" tickLine={false} axisLine={false} tickFormatter={(value) => `K${value/1000}k`} />
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="opacity-10" />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--color-navy)', borderColor: 'var(--color-line-dark)', color: '#fff', borderRadius: '8px' }}
                formatter={(value: any) => [`PGK ${Number(value).toLocaleString()}`, '']}
              />
              <Area type="step" name="Estimated Tax Liability" dataKey="estimated" stroke="var(--color-gold)" strokeWidth={3} fillOpacity={1} fill="url(#colorEst)" />
              <Area type="step" name="Tax Paid" dataKey="paid" stroke="var(--color-teal)" strokeWidth={3} fillOpacity={0.2} fill="var(--color-teal)" />
              <Legend iconType="circle" wrapperStyle={{ fontSize: '13px', paddingTop: '10px' }} />
            </AreaChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <section className="py-[104px] md:py-[72px] overflow-hidden">
      <div className="wrap">
        <motion.div 
          variants={revealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-[640px] mb-[48px]"
        >
          <p className="flex items-center gap-[10px] font-mono text-[12.5px] tracking-[0.14em] uppercase text-[#1C8E76] mb-[18px] before:content-[''] before:w-[22px] before:h-[1px] before:bg-[color:var(--color-teal)] before:inline-block">
            AI-Aided Analytics
          </p>
          <h2 className="text-[clamp(28px,3.4vw,38px)] leading-[1.15] font-semibold font-[family-name:var(--font-space-grotesk)]">
            Your numbers, visualized.
          </h2>
          <p className="text-[color:var(--muted)] text-[16.5px] mt-[14px]">
            We build custom live dashboards over your Xero data, giving you instant clarity on cash flow, profitability, and tax liabilities without waiting for month-end reports.
          </p>
        </motion.div>

        <motion.div 
          variants={revealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="bg-[color:var(--card)] border border-[color:var(--border)] rounded-[20px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.04)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.2)]"
        >
          {/* Dashboard Header / Tabs */}
          <div className="border-b border-[color:var(--border)] bg-black/5 dark:bg-white/[0.02] p-[16px_24px] flex flex-wrap gap-[12px] md:gap-[24px] items-center">
            {(["cashflow", "pnl", "tax"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-[16px] py-[8px] text-[14px] font-[family-name:var(--font-space-grotesk)] font-medium transition-colors ${activeTab === tab ? "text-[color:var(--foreground)]" : "text-[color:var(--muted)] hover:text-[color:var(--foreground)]"}`}
              >
                {tab === "cashflow" ? "Monthly Cashflow" : tab === "pnl" ? "Profit & Loss" : "Tax Estimates"}
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute bottom-[-17px] left-0 right-0 h-[2px] bg-[color:var(--color-teal)]"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Chart Area */}
          <div className="p-[24px_24px_16px_16px] md:p-[40px_40px_24px_24px] h-[380px] md:h-[480px] w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full"
              >
                {renderChart()}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
