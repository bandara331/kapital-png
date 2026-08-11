"use client";

import { motion } from "framer-motion";

const revealVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } }
};

export function Services() {
  return (
    <section id="services" className="py-[104px] md:py-[72px]">
      <div className="wrap">
        <motion.div 
          variants={revealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-[640px] mb-[52px]"
        >
          <p className="flex items-center gap-[10px] font-mono text-[12.5px] tracking-[0.14em] uppercase text-[#1C8E76] mb-[18px] before:content-[''] before:w-[22px] before:h-[1px] before:bg-[color:var(--color-teal)] before:inline-block">
            What We Do
          </p>
          <h2 className="text-[clamp(28px,3.4vw,38px)] leading-[1.15] font-semibold font-[family-name:var(--font-space-grotesk)]">
            A focused suite, built around Xero.
          </h2>
          <p className="text-[color:var(--muted)] text-[16.5px] mt-[14px]">
            Four services that work together — from getting your books onto the cloud, to reading what they're telling you.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
          {/* Card 1 */}
          <motion.div 
            variants={revealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="bg-[color:var(--card)] border border-[color:var(--border)] rounded-[14px] p-[32px_30px] transition-all duration-200 hover:border-[color:var(--color-teal)] hover:-translate-y-[3px]"
          >
            <span className="block font-mono text-[12.5px] text-[color:var(--color-teal)] tracking-[.08em] mb-[14px]">01 / Bookkeeping</span>
            <h3 className="text-[21px] font-semibold font-[family-name:var(--font-space-grotesk)] mb-[10px]">Cloud Bookkeeping Services</h3>
            <p className="text-[color:var(--muted)] text-[15px] m-[0_0_18px]">Accurate, up-to-date books maintained directly in your cloud accounting system, so you always know where your business stands.</p>
            <ul className="m-0 p-0 list-none">
              {['Daily, weekly, or monthly bookkeeping in Xero and other cloud platforms', 'Bank feed setup and reconciliations', 'Accounts payable and receivable management', 'Payroll processing and compliance support', 'Chart of accounts design and clean-up', 'GST and statutory reporting support'].map((item, i) => (
                <li key={i} className="text-[14.5px] text-[color:var(--card-foreground)] pl-[18px] relative mb-[9px] before:content-[''] before:absolute before:left-0 before:top-[8px] before:w-[7px] before:h-[1px] before:bg-[color:var(--color-gold)]">
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
          {/* Card 2 */}
          <motion.div 
            variants={revealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="bg-[color:var(--card)] border border-[color:var(--border)] rounded-[14px] p-[32px_30px] transition-all duration-200 hover:border-[color:var(--color-teal)] hover:-translate-y-[3px]"
          >
            <span className="block font-mono text-[12.5px] text-[color:var(--color-teal)] tracking-[.08em] mb-[14px]">02 / Analytics</span>
            <h3 className="text-[21px] font-semibold font-[family-name:var(--font-space-grotesk)] mb-[10px]">AI-Aided Financial Analytics</h3>
            <p className="text-[color:var(--muted)] text-[15px] m-[0_0_18px]">We layer AI-driven analysis on top of your cloud accounting data to turn raw transactions into clear, actionable insight.</p>
            <ul className="m-0 p-0 list-none">
              {['AI-generated management reports and performance dashboards', 'Cash flow monitoring, trend analysis, and forecasting', 'Automated anomaly and variance detection', 'KPI tracking tailored to your industry', 'Plain-language financial summaries for non-accountants', 'Scenario and budget-vs-actual analysis'].map((item, i) => (
                <li key={i} className="text-[14.5px] text-[color:var(--card-foreground)] pl-[18px] relative mb-[9px] before:content-[''] before:absolute before:left-0 before:top-[8px] before:w-[7px] before:h-[1px] before:bg-[color:var(--color-gold)]">
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
          {/* Card 3 */}
          <motion.div 
            variants={revealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="bg-[color:var(--card)] border border-[color:var(--border)] rounded-[14px] p-[32px_30px] transition-all duration-200 hover:border-[color:var(--color-teal)] hover:-translate-y-[3px]"
          >
            <span className="block font-mono text-[12.5px] text-[color:var(--color-teal)] tracking-[.08em] mb-[14px]">03 / Setup & Migration</span>
            <h3 className="text-[21px] font-semibold font-[family-name:var(--font-space-grotesk)] mb-[10px]">Cloud System Setup & Migration</h3>
            <p className="text-[color:var(--muted)] text-[15px] m-[0_0_18px]">End-to-end support moving your business onto Xero or another cloud platform, or getting more value from the system you already use.</p>
            <ul className="m-0 p-0 list-none">
              {['Needs assessment and platform recommendation', 'Migration from manual records or legacy software', 'System configuration, apps, and integrations', 'Staff training and ongoing user support'].map((item, i) => (
                <li key={i} className="text-[14.5px] text-[color:var(--card-foreground)] pl-[18px] relative mb-[9px] before:content-[''] before:absolute before:left-0 before:top-[8px] before:w-[7px] before:h-[1px] before:bg-[color:var(--color-gold)]">
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
          {/* Card 4 */}
          <motion.div 
            variants={revealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="bg-[color:var(--card)] border border-[color:var(--border)] rounded-[14px] p-[32px_30px] transition-all duration-200 hover:border-[color:var(--color-teal)] hover:-translate-y-[3px]"
          >
            <span className="block font-mono text-[12.5px] text-[color:var(--color-teal)] tracking-[.08em] mb-[14px]">04 / Advisory</span>
            <h3 className="text-[21px] font-semibold font-[family-name:var(--font-space-grotesk)] mb-[10px]">Advisory & Outsourced Support</h3>
            <p className="text-[color:var(--muted)] text-[15px] m-[0_0_18px]">Ongoing, practical advice that helps SME owners act on their numbers, backed by the full advisory capability of Das Kapital Limited.</p>
            <ul className="m-0 p-0 list-none">
              {['Financial planning, budgeting, and forecasting', 'Outsourced finance function for growing businesses', 'Business performance reviews', "Access to Das Kapital's wider consulting services — tax, import/export, business advisory"].map((item, i) => (
                <li key={i} className="text-[14.5px] text-[color:var(--card-foreground)] pl-[18px] relative mb-[9px] before:content-[''] before:absolute before:left-0 before:top-[8px] before:w-[7px] before:h-[1px] before:bg-[color:var(--color-gold)]">
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
