"use client";

import { motion, Variants } from "framer-motion";
import { Target, Eye } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (d: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const, delay: d },
  }),
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cards = [
  {
    label: "Our Mission",
    title: "Decisions made on real numbers, not guesswork.",
    body: `To empower Papua New Guinea businesses, including SMEs, with accurate, real-time, cloud-based financial information and advanced insight — so owners can make faster, better-informed decisions and spend less time chasing spreadsheets.`,
    highlight: "advanced insight",
    tags: ["Real-time Books", "Xero", "Analytics"],
    img: "/mission_banner.png",
    imgAlt: "Business owner reviewing finances on a laptop",
    icon: <Target size={20} />,
    accentColor: "#3ECDB0",
    iconBg: "rgba(62,205,176,0.2)",
    tagBg: "rgba(62,205,176,0.12)",
    tagBorder: "rgba(62,205,176,0.3)",
    tagColor: "#2CBFA3",
    fadeColor: "#ffffff",
    delay: 0.05,
  },
  {
    label: "Our Vision",
    title: "PNG's leading cloud bookkeeping partner.",
    body: `To be Papua New Guinea's leading cloud bookkeeping and financial analytics partner — recognised for making modern accounting technology accessible, affordable, and genuinely useful for local businesses.`,
    highlight: "",
    tags: ["Partner", "Affordable", "Accessible"],
    img: "/vision_banner.png",
    imgAlt: "Aerial view of a growing city representing ambition",
    icon: <Eye size={20} />,
    accentColor: "#D4A84B",
    iconBg: "rgba(212,168,75,0.18)",
    tagBg: "rgba(62,205,176,0.10)",
    tagBorder: "rgba(62,205,176,0.28)",
    tagColor: "#2CBFA3",
    fadeColor: "#ffffff",
    delay: 0.15,
  },
];

export function MissionVision() {
  return (
    <section className="py-16 relative overflow-hidden bg-[#F0F5F9]">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-[color:var(--color-teal)]/5 rounded-full blur-[120px]" />
      </div>

      <div className="wrap relative">
        {/* Section label */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          custom={0}
          className="text-center mb-16"
        >
          <p className="inline-flex items-center gap-[10px] font-mono text-[12.5px] tracking-[0.14em] uppercase text-[#3ECDB0] mb-4
                        before:content-[''] before:w-[22px] before:h-[1px] before:bg-[#3ECDB0] before:inline-block
                        after:content-[''] after:w-[22px] after:h-[1px] after:bg-[#3ECDB0] after:inline-block">
            Our Purpose
          </p>
          <h2 className="text-[clamp(28px,3.4vw,40px)] font-semibold font-[family-name:var(--font-space-grotesk)] text-[#1D4266] leading-[1.15]">
            Built with intention. Driven by impact.
          </h2>
        </motion.div>

        {/* Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {cards.map((card) => (
            <motion.div
              key={card.label}
              variants={fadeUp}
              custom={card.delay}
              className="group relative bg-white rounded-[22px] overflow-hidden border border-[#1D4266]/10 hover:border-[#3ECDB0]/40 hover:shadow-[0_20px_60px_rgba(47,174,147,0.15)] transition-all duration-500"
            >
              {/* ── Image area with bottom fade ── */}
              <div className="relative w-full h-52 overflow-hidden">
                <img
                  src={card.img}
                  alt={card.imgAlt}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                {/* Gradient fade from image into white card body */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(
                      to bottom,
                      transparent 0%,
                      transparent 40%,
                      rgba(255,255,255,0.55) 65%,
                      rgba(255,255,255,0.92) 80%,
                      #ffffff 100%
                    )`,
                  }}
                />
                {/* Icon + label badge overlaid at bottom of image */}
                <div className="absolute bottom-4 left-5 flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md backdrop-blur-sm"
                    style={{ background: card.iconBg, color: card.accentColor, border: `1.5px solid ${card.accentColor}33` }}
                  >
                    {card.icon}
                  </div>
                  <span
                    className="font-mono text-[11px] tracking-[0.14em] uppercase font-semibold px-3 py-1 rounded-full backdrop-blur-sm"
                    style={{ color: card.accentColor, background: `${card.accentColor}18`, border: `1px solid ${card.accentColor}30` }}
                  >
                    {card.label}
                  </span>
                </div>
              </div>

              {/* ── Card body ── */}
              <div className="px-7 pb-7 pt-1">
                <h3 className="text-[clamp(18px,2vw,23px)] font-semibold font-[family-name:var(--font-space-grotesk)] text-[#1D4266] leading-[1.25] mb-4">
                  {card.title}
                </h3>

                <p className="text-[#1D4266]/65 text-[15px] leading-relaxed mb-6">
                  {card.highlight
                    ? card.body.split(card.highlight).map((part, i, arr) =>
                        i < arr.length - 1 ? (
                          <span key={i}>
                            {part}
                            <span style={{ color: card.accentColor }} className="font-semibold">
                              {card.highlight}
                            </span>
                          </span>
                        ) : (
                          <span key={i}>{part}</span>
                        )
                      )
                    : card.body}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {card.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3.5 py-1.5 rounded-full font-mono text-[11px] tracking-wider uppercase"
                      style={{
                        background: card.tagBg,
                        border: `1px solid ${card.tagBorder}`,
                        color: card.tagColor,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom accent line on hover */}
              <div
                className="absolute bottom-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-700 rounded-b-[22px]"
                style={{ background: card.accentColor }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
