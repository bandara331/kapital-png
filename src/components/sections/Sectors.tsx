"use client";

import { motion } from "framer-motion";
import { Building2, ShoppingBag, Ship, Hotel, Heart, Lightbulb, ArrowUpRight } from "lucide-react";

const sectors = [
  {
    id: 1,
    icon: <Building2 size={20} />,
    title: "Small & Medium Enterprises",
    short: "SMEs",
    desc: "Enterprise-level financial visibility for PNG's SMEs. Real-time books, automated bank feeds, and advanced analytics so owners make decisions with confidence.",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80",
    tags: ["Bookkeeping", "Xero", "Analytics"],
  },
  {
    id: 2,
    icon: <ShoppingBag size={20} />,
    title: "Retail & Services",
    short: "Retail",
    desc: "From trade stores to service companies — clean books, payroll, inventory tracking, and real-time cash flow so you focus on customers, not spreadsheets.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
    tags: ["Inventory", "Payroll", "Cash Flow"],
  },
  {
    id: 3,
    icon: <Ship size={20} />,
    title: "Import & Export",
    short: "Trade",
    desc: "Multi-currency accounts, cross-border transactions, and FX gains/losses handled accurately in Xero. Fully compliant and transparent international operations.",
    image: "https://images.pexels.com/photos/1427107/pexels-photo-1427107.jpeg?auto=compress&cs=tinysrgb&w=800",
    tags: ["Multi-currency", "Compliance", "Xero"],
  },
  {
    id: 4,
    icon: <Hotel size={20} />,
    title: "Hospitality & Tourism",
    short: "Hospitality",
    desc: "Hotels, lodges, and tour operators across PNG. Occupancy-driven revenue tracking, supplier payables, and seamless back-office management.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    tags: ["Revenue", "Payables", "Reporting"],
  },
  {
    id: 5,
    icon: <Heart size={20} />,
    title: "NGOs & Not-for-profits",
    short: "NGOs",
    desc: "Donor reporting, grant management, and compliance made simple. Tracking codes and structured accounting for full stakeholder transparency.",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
    tags: ["Grants", "Donors", "Compliance"],
  },
  {
    id: 6,
    icon: <Lightbulb size={20} />,
    title: "Start-ups",
    short: "Start-ups",
    desc: "Build your financial foundation right from day one. Clean charts of accounts, scalable processes, and cloud-native bookkeeping for hyper-growth.",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&q=80",
    tags: ["Setup", "Cloud", "Scale"],
  },
];

export function Sectors() {
  return (
    <section id="sectors" className="py-16 bg-[#F0F5F9] relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#3ECDB0]/6 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#1D4266]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="wrap relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="flex items-center gap-2.5 font-mono text-[12px] tracking-[0.14em] uppercase text-[#3ECDB0] mb-4
                        before:content-[''] before:w-[22px] before:h-[1px] before:bg-[#3ECDB0] before:inline-block">
            Who We Serve
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="text-[clamp(28px,3.8vw,50px)] font-bold font-[family-name:var(--font-space-grotesk)] text-[#1D4266] leading-[1.08] max-w-[560px]">
              Built for PNG businesses<br />
              <span className="text-[#3ECDB0]">moving to the cloud.</span>
            </h2>
            <p className="text-[15px] text-[#1D4266]/60 max-w-[320px] leading-relaxed">
              SMEs and organisations across Papua New Guinea ready to move to cloud accounting.
            </p>
          </div>
        </motion.div>

        {/* Video Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sectors.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 32, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
              className="group relative rounded-3xl overflow-hidden border border-[#1D4266]/10 bg-white hover:border-[#3ECDB0]/40 transition-all duration-500 hover:shadow-[0_24px_60px_rgba(62,205,176,0.15)] hover:-translate-y-1 cursor-default"
              style={{ minHeight: "360px" }}
            >
              {/* Image background */}
              <img
                src={s.image}
                alt={s.title}
                className="absolute inset-0 w-full h-full object-cover opacity-100 group-hover:opacity-100 transition-transform duration-700 scale-105 group-hover:scale-100"
              />

              {/* Gradient overlay (Solid at bottom for text, clear at top for image) */}
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/95 to-white/10 group-hover:via-white/90 transition-all duration-500" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#3ECDB0]/0 to-[#3ECDB0]/0 group-hover:from-[#3ECDB0]/5 transition-all duration-500" />

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-between p-7" style={{ minHeight: "360px" }}>
                {/* Top */}
                <div className="flex items-start justify-between">
                  {/* Number badge */}
                  <span className="font-mono text-[11px] tracking-[0.14em] text-[#3ECDB0]/60 bg-[#3ECDB0]/10 border border-[#3ECDB0]/20 rounded-full px-3 py-1">
                    {String(s.id).padStart(2, "0")}
                  </span>
                  {/* Arrow icon */}
                  <span className="w-8 h-8 rounded-full border border-[#1D4266]/10 bg-[#1D4266]/5 flex items-center justify-center text-[#1D4266]/40 group-hover:border-[#3ECDB0]/40 group-hover:text-[#3ECDB0] group-hover:bg-[#3ECDB0]/10 transition-all duration-300">
                    <ArrowUpRight size={14} />
                  </span>
                </div>

                {/* Bottom */}
                <div>
                  {/* Icon + Title */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[#3ECDB0]/15 border border-[#3ECDB0]/25 flex items-center justify-center text-[#3ECDB0] shrink-0 group-hover:bg-[#3ECDB0] group-hover:text-white transition-all duration-300">
                      {s.icon}
                    </div>
                    <h3 className="text-[17px] font-bold font-[family-name:var(--font-space-grotesk)] text-[#1D4266] leading-tight">
                      {s.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-[13.5px] text-[#1D4266]/65 leading-relaxed mb-5 group-hover:text-[#1D4266]/80 transition-colors duration-300">
                    {s.desc}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {s.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono text-[#3ECDB0]/70 bg-[#3ECDB0]/8 border border-[#3ECDB0]/15 rounded-full px-3 py-1 group-hover:text-[#3ECDB0] group-hover:border-[#3ECDB0]/30 transition-colors duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
