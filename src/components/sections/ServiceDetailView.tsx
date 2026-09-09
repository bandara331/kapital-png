"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

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

const revealVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
};

export function ServiceDetailView({ serviceId, title, subtitle, description, features, benefits }: Props) {
  return (
    <main className="flex flex-col min-h-screen pt-[120px] pb-[80px]">
      <div className="wrap relative">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[color:var(--color-teal)]/10 rounded-full blur-[120px] pointer-events-none -z-10" />

        <Link href="/services" className="inline-flex items-center gap-2 text-white/50 hover:text-[color:var(--color-teal)] text-sm font-mono transition-colors mb-8">
          ← Back to Services
        </Link>

        {/* Hero Section */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={revealVariants}
          className="max-w-[800px] mb-20"
        >
          <span className="block font-mono text-[14px] text-[color:var(--color-teal)] tracking-[.1em] mb-4">
            {serviceId} / {title}
          </span>
          <h1 className="text-[clamp(40px,5vw,64px)] leading-[1.1] font-bold font-[family-name:var(--font-space-grotesk)] text-white mb-6">
            {subtitle}
          </h1>
          <p className="text-xl text-white/60 leading-relaxed max-w-[640px]">
            {description}
          </p>
          <div className="mt-8">
            <Link 
              href="/#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[color:var(--color-teal)] text-[color:var(--color-navy-3)] font-bold rounded-full hover:bg-[color:var(--color-teal-2)] transition-colors"
            >
              Get Started <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Features Column */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={revealVariants}
          >
            <h2 className="text-2xl font-bold font-[family-name:var(--font-space-grotesk)] text-white mb-8 border-b border-white/10 pb-4">
              What's Included
            </h2>
            <ul className="space-y-6">
              {features.map((feature, i) => (
                <li key={i} className="flex gap-4">
                  <div className="mt-1 shrink-0">
                    <CheckCircle2 size={20} className="text-[color:var(--color-gold)]" />
                  </div>
                  <p className="text-white/80 text-lg leading-relaxed">{feature}</p>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Benefits Column */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={revealVariants}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold font-[family-name:var(--font-space-grotesk)] text-white mb-8 border-b border-white/10 pb-4">
              The Value Add
            </h2>
            <div className="grid gap-6">
              {benefits.map((benefit, i) => (
                <div key={i} className="bg-[color:var(--card)] border border-[color:var(--border)] rounded-2xl p-8 hover:border-[color:var(--color-teal)]/50 transition-colors">
                  <h3 className="text-xl font-semibold text-white mb-3 font-[family-name:var(--font-space-grotesk)]">
                    {benefit.title}
                  </h3>
                  <p className="text-white/60 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
