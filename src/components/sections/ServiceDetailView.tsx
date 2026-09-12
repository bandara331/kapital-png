"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

type Benefit = {
  title: string;
  description: string;
};

type Props = {
  serviceId: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  benefits: Benefit[];
};

// custom = delay in seconds; resolved by Framer Motion when `custom` prop is set
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" as const, delay },
  }),
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export function ServiceDetailView({
  serviceId,
  title,
  subtitle,
  description,
  features,
  benefits,
}: Props) {
  return (
    <main className="flex flex-col min-h-screen">
      {/* ── Dark Hero Banner ──────────────────────────────────────── */}
      <section className="relative bg-gradient-to-b from-[color:var(--color-navy)] to-[color:var(--color-navy-3)] text-white overflow-hidden pt-[120px] pb-[96px]">
        {/* SVG line grid – matches Hero */}
        <svg
          className="absolute inset-0 opacity-[0.14] pointer-events-none w-full h-full object-cover"
          viewBox="0 0 1200 500"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M-50,120 C200,60 350,180 600,110 C850,40 1000,150 1250,90"
            stroke="var(--color-teal-2)"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M-50,220 C220,160 400,280 640,200 C880,120 1020,240 1250,180"
            stroke="var(--color-teal-2)"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M-50,320 C240,270 420,370 660,310 C900,250 1030,340 1250,290"
            stroke="var(--color-teal-2)"
            strokeWidth="1"
            fill="none"
          />
        </svg>

        {/* Ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[color:var(--color-teal)]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="wrap relative z-10">
          {/* Breadcrumb */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0}
          >
            <Link
              href="/services"
              className="inline-flex items-center gap-2 font-mono text-[13px] text-white/50 hover:text-[color:var(--color-teal)] transition-colors mb-10 group"
            >
              <ArrowLeft
                size={14}
                className="group-hover:-translate-x-1 transition-transform"
              />
              Back to Services
            </Link>
          </motion.div>

          {/* Eyebrow */}
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0.05}
            className="flex items-center gap-[10px] font-mono text-[12.5px] tracking-[0.14em] uppercase text-[color:var(--color-teal)] mb-5
                       before:content-[''] before:w-[22px] before:h-[1px] before:bg-[color:var(--color-teal)] before:inline-block"
          >
            {serviceId} / {title}
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0.1}
            className="text-[clamp(36px,5vw,64px)] leading-[1.07] font-semibold font-[family-name:var(--font-space-grotesk)] text-white max-w-[780px] mb-6"
          >
            {subtitle}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0.18}
            className="text-[18px] text-white/65 max-w-[620px] leading-relaxed mb-10"
          >
            {description}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0.25}
            className="flex flex-wrap gap-4"
          >
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[color:var(--color-teal)] text-[color:var(--color-navy-3)] font-semibold font-[family-name:var(--font-space-grotesk)] rounded-full hover:bg-[color:var(--color-teal-2)] hover:-translate-y-[2px] hover:shadow-[0_10px_28px_rgba(47,174,147,0.35)] transition-all duration-200"
            >
              Get Started <ArrowRight size={17} />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-8 py-4 border border-white/25 text-white/80 font-semibold font-[family-name:var(--font-space-grotesk)] rounded-full hover:border-white hover:text-white hover:bg-white/5 transition-all duration-200"
            >
              All Services
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Features + Benefits ───────────────────────────────────── */}
      <section className="relative bg-[color:var(--background)] py-[96px]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[color:var(--color-teal)]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="wrap relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-28">

            {/* ── Features Column ─────────────────────── */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={stagger}
            >
              <motion.p
                variants={fadeUp}
                custom={0}
                className="flex items-center gap-[10px] font-mono text-[12px] tracking-[0.14em] uppercase text-[color:var(--color-teal)] mb-5
                           before:content-[''] before:w-[18px] before:h-[1px] before:bg-[color:var(--color-teal)] before:inline-block"
              >
                What&apos;s Included
              </motion.p>

              <motion.h2
                variants={fadeUp}
                custom={0.04}
                className="text-[clamp(24px,2.8vw,32px)] font-semibold font-[family-name:var(--font-space-grotesk)] text-[color:var(--foreground)] mb-8"
              >
                Everything you get with {title}
              </motion.h2>

              <motion.ul className="space-y-5" variants={stagger}>
                {features.map((feature, i) => (
                  <motion.li
                    key={i}
                    variants={fadeUp}
                    custom={i * 0.04}
                    className="flex gap-4 items-start group"
                  >
                    <div className="mt-[3px] shrink-0 w-5 h-5 rounded-full bg-[color:var(--color-teal)]/10 flex items-center justify-center group-hover:bg-[color:var(--color-teal)]/20 transition-colors">
                      <CheckCircle2
                        size={14}
                        className="text-[color:var(--color-teal)]"
                      />
                    </div>
                    <p className="text-[16.5px] text-[color:var(--foreground)]/80 leading-relaxed">
                      {feature}
                    </p>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>

            {/* ── Benefits Column ──────────────────────── */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={stagger}
            >
              <motion.p
                variants={fadeUp}
                custom={0}
                className="flex items-center gap-[10px] font-mono text-[12px] tracking-[0.14em] uppercase text-[color:var(--color-gold)] mb-5
                           before:content-[''] before:w-[18px] before:h-[1px] before:bg-[color:var(--color-gold)] before:inline-block"
              >
                The Value Add
              </motion.p>

              <motion.h2
                variants={fadeUp}
                custom={0.04}
                className="text-[clamp(24px,2.8vw,32px)] font-semibold font-[family-name:var(--font-space-grotesk)] text-[color:var(--foreground)] mb-8"
              >
                Why it matters for your business
              </motion.h2>

              <motion.div className="grid gap-4" variants={stagger}>
                {benefits.map((benefit, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp}
                    custom={i * 0.06}
                    className="group bg-[color:var(--card)] border border-[color:var(--border)] rounded-2xl p-6
                               hover:border-[color:var(--color-teal)]/50 hover:shadow-[0_4px_24px_rgba(47,174,147,0.08)]
                               transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="mt-[2px] shrink-0 w-8 h-8 rounded-xl bg-[color:var(--color-teal)]/10 flex items-center justify-center group-hover:bg-[color:var(--color-teal)]/20 transition-colors">
                        <Sparkles
                          size={14}
                          className="text-[color:var(--color-teal)]"
                        />
                      </div>
                      <div>
                        <h3 className="text-[17px] font-semibold text-[color:var(--foreground)] font-[family-name:var(--font-space-grotesk)] mb-1">
                          {benefit.title}
                        </h3>
                        <p className="text-[15px] text-[color:var(--muted)] leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Mission Banner ────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          custom={0}
          className="relative w-full min-h-[280px] md:min-h-[360px] flex items-center"
        >
          {/* Background image */}
          <Image
            src="/mission_banner.png"
            alt="Our Mission — AI-aided financial insight for PNG businesses"
            fill
            className="object-cover object-center"
            priority={false}
          />
          {/* Dark gradient overlay for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--color-navy-3)]/90 via-[color:var(--color-navy-3)]/60 to-transparent" />

          <div className="wrap relative z-10 py-16">
            <motion.span
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0.05}
              className="block font-mono text-[12px] tracking-[0.14em] uppercase text-[color:var(--color-teal)] mb-4"
            >
              Our Mission
            </motion.span>
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0.1}
              className="text-[clamp(24px,3.5vw,42px)] font-semibold font-[family-name:var(--font-space-grotesk)] text-white leading-[1.12] max-w-[560px] mb-5"
            >
              Decisions made on real numbers, not guesswork.
            </motion.h2>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0.16}
              className="text-white/70 text-[16px] max-w-[500px] leading-relaxed"
            >
              To empower Papua New Guinea businesses, including SMEs, with
              accurate, real-time, cloud-based financial information and{" "}
              <strong className="text-white font-semibold">AI-aided insight</strong>{" "}
              — so owners can make faster, better-informed decisions and spend
              less time chasing spreadsheets.
            </motion.p>
          </div>
        </motion.div>
      </section>

      {/* ── Vision Banner ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          custom={0}
          className="relative w-full min-h-[280px] md:min-h-[360px] flex items-center"
        >
          {/* Background image */}
          <Image
            src="/vision_banner.png"
            alt="Our Vision — PNG's leading cloud bookkeeping partner"
            fill
            className="object-cover object-center"
            priority={false}
          />
          {/* Dark gradient overlay — stronger on left for vision card */}
          <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--color-navy-3)]/95 via-[color:var(--color-navy-3)]/65 to-transparent" />

          <div className="wrap relative z-10 py-16">
            <motion.span
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0.05}
              className="block font-mono text-[12px] tracking-[0.14em] uppercase text-[color:var(--color-teal-2)] mb-4"
            >
              Our Vision
            </motion.span>
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0.1}
              className="text-[clamp(24px,3.5vw,42px)] font-semibold font-[family-name:var(--font-space-grotesk)] text-white leading-[1.12] max-w-[520px] mb-5"
            >
              PNG&apos;s leading cloud bookkeeping partner.
            </motion.h2>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0.16}
              className="text-white/70 text-[16px] max-w-[480px] leading-relaxed"
            >
              To be Papua New Guinea&apos;s leading cloud bookkeeping and
              financial analytics partner — recognised for making modern
              accounting technology accessible, affordable, and genuinely
              useful for local businesses.
            </motion.p>

            {/* Value pill badges */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0.22}
              className="flex flex-wrap gap-3 mt-6"
            >
              {["Partner", "Affordable", "Useful"].map((label) => (
                <span
                  key={label}
                  className="inline-flex items-center px-4 py-1.5 rounded-full bg-[color:var(--color-teal)]/20 border border-[color:var(--color-teal)]/40 text-[color:var(--color-teal-2)] font-mono text-[12px] tracking-widest uppercase"
                >
                  {label}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── CTA Strip ─────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-r from-[color:var(--color-navy)] via-[color:var(--color-navy-2)] to-[color:var(--color-navy)] text-white py-[72px] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.12] pointer-events-none">
          <svg
            viewBox="0 0 1200 200"
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            <path
              d="M-50,100 C300,40 600,160 900,80 C1050,50 1150,120 1250,80"
              stroke="var(--color-teal-2)"
              strokeWidth="1"
              fill="none"
            />
          </svg>
        </div>

        <div className="wrap relative text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={stagger}
          >
            <motion.p
              variants={fadeUp}
              custom={0}
              className="font-mono text-[12.5px] tracking-[0.14em] uppercase text-[color:var(--color-teal)] mb-4"
            >
              Ready to get started?
            </motion.p>

            <motion.h2
              variants={fadeUp}
              custom={0.06}
              className="text-[clamp(28px,3.5vw,44px)] font-semibold font-[family-name:var(--font-space-grotesk)] text-white mb-4"
            >
              Let&apos;s build smarter numbers together.
            </motion.h2>

            <motion.p
              variants={fadeUp}
              custom={0.12}
              className="text-white/60 text-[17px] max-w-[480px] mx-auto mb-10"
            >
              Drop us a message and we&apos;ll scope out the right plan for your
              business within 24 hours.
            </motion.p>

            <motion.div
              variants={fadeUp}
              custom={0.18}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[color:var(--color-teal)] text-[color:var(--color-navy-3)] font-semibold font-[family-name:var(--font-space-grotesk)] rounded-full hover:bg-[color:var(--color-teal-2)] hover:-translate-y-[2px] hover:shadow-[0_10px_28px_rgba(47,174,147,0.35)] transition-all duration-200"
              >
                Book a free consultation <ArrowRight size={17} />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-8 py-4 border border-white/25 text-white/80 font-semibold font-[family-name:var(--font-space-grotesk)] rounded-full hover:border-white hover:text-white hover:bg-white/5 transition-all duration-200"
              >
                View all services
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
