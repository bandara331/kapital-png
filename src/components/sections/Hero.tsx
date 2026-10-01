"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((m) => m.Player),
  { ssr: false }
);
import { useBookingModal } from "@/context/BookingModalContext";
import { ArrowRight, BarChart3, CloudLightning, ShieldCheck, TrendingUp } from "lucide-react";


const stats = [
  { value: "100+", label: "PNG Businesses" },
  { value: "Xero", label: "Certified Partner" },
  { value: "Advanced", label: "Analytics" },
  { value: "24/7", label: "Cloud Access" },
];

const featurePills = [
  { icon: <CloudLightning size={14} />, label: "Cloud Bookkeeping" },
  { icon: <BarChart3 size={14} />, label: "Analytics" },
  { icon: <ShieldCheck size={14} />, label: "Xero Certified" },
  { icon: <TrendingUp size={14} />, label: "Real-time Reports" },
];

export function Hero() {
  const { openModal } = useBookingModal();
  const router = useRouter();
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }: any) => setSession(session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e: any, s: any) => setSession(s));
    return () => subscription.unsubscribe();
  }, []);

  const handleGetStarted = () => {
    if (session) {
      openModal();
    } else {
      router.push("/register");
    }
  };

  return (
    <section className="relative bg-[#F0F5F9] overflow-hidden min-h-[75vh] flex flex-col">

      {/* ── Background layers ── */}

      {/* Deep gradient overlays for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-[#3ECDB0]/5 pointer-events-none" />

      {/* Glowing teal orb — top right */}
      <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-[#3ECDB0]/10 blur-[120px] pointer-events-none" />
      {/* Subtle navy orb — bottom left */}
      <div className="absolute -bottom-24 -left-24 w-[480px] h-[480px] rounded-full bg-[#1D4266]/5 blur-[100px] pointer-events-none" />
      {/* Second teal glow — center */}
      <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] rounded-full bg-[#3ECDB0]/6 blur-[90px] pointer-events-none" />

      {/* Dot grid overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dotgrid" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#3ECDB0" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dotgrid)" />
      </svg>

      {/* Diagonal accent line */}
      <div className="absolute top-0 right-[38%] w-[1px] h-full bg-gradient-to-b from-transparent via-[#3ECDB0]/15 to-transparent pointer-events-none hidden lg:block" />

      {/* ── Main content grid ── */}
      <div className="wrap relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-20 pb-16 lg:pt-24 lg:pb-20">

          {/* ── LEFT — Text ── */}
          <div className="flex flex-col max-w-[680px]">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >


              {/* Heading with rotating word */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18, duration: 0.8 }}
                className="text-[clamp(36px,5vw,64px)] leading-[1.06] font-bold font-[family-name:var(--font-space-grotesk)] text-[#1D4266] mb-3"
              >
                Smarter numbers.<br />
                Stronger business.
              </motion.h1>

              {/* Subtext */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-[17px] text-[#1D4266]/70 max-w-[500px] leading-relaxed mb-8 mt-4"
              >
                We pair qualified bookkeeping with advanced analytics on Xero and other cloud platforms, so PNG business owners can see exactly where they stand — in real time, wherever they are.
              </motion.p>

              {/* Feature pills */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap gap-2 mb-10"
              >
                {featurePills.map((pill) => (
                  <span
                    key={pill.label}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1D4266]/5 border border-[#1D4266]/10 text-[12.5px] text-[#1D4266]/80 font-medium hover:border-[#3ECDB0]/40 hover:text-[#3ECDB0] transition-colors cursor-default"
                  >
                    <span className="text-[#3ECDB0]">{pill.icon}</span>
                    {pill.label}
                  </span>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex gap-3 flex-wrap"
              >
                <button
                  onClick={handleGetStarted}
                  className="inline-flex items-center gap-2 font-[family-name:var(--font-space-grotesk)] font-semibold text-[14.5px] px-7 py-3.5 rounded-full bg-[#3ECDB0] text-white hover:bg-[#2FBEA1] transition-all duration-200 hover:-translate-y-[2px] hover:shadow-[0_12px_32px_rgba(62,205,176,0.45)]"
                >
                  Get started for free <ArrowRight size={16} />
                </button>
                <Link
                  href="#services"
                  className="inline-flex items-center gap-2 font-[family-name:var(--font-space-grotesk)] font-semibold text-[14.5px] px-7 py-3.5 rounded-full border border-[#1D4266]/20 text-[#1D4266]/80 hover:border-[#3ECDB0]/50 hover:text-[#3ECDB0] transition-all duration-200 no-underline"
                >
                  Explore services
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* ── RIGHT — Image ── */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="relative hidden lg:flex justify-end items-center"
          >
            <div className="relative w-full max-w-[550px] aspect-[4/3] flex items-center justify-center">
              <Player
                autoplay
                loop
                src="/lottie-analytics.json"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          </motion.div>

        </div>
      </div>

      {/* Stats strip */}
      <div className="relative z-10 border-t border-[#1D4266]/10 bg-white/60 backdrop-blur-md">
        <div className="wrap py-5 grid grid-cols-2 md:grid-cols-4 gap-0">
          {stats.map((s, i) => (
            <div
              key={i}
              className={`flex flex-col items-center py-3 ${i < 3 ? "border-r border-[#1D4266]/10" : ""}`}
            >
              <span className="text-[22px] font-bold font-[family-name:var(--font-space-grotesk)] text-[#3ECDB0]">{s.value}</span>
              <span className="text-[11.5px] text-[#1D4266]/60 font-mono uppercase tracking-wider mt-0.5">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
