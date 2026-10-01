"use client";

import { useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogIn, Loader2, CheckCircle2, ArrowLeft, Zap, BarChart3, ShieldCheck, TrendingUp } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const features = [
  { icon: BarChart3, label: "Real-time analytics dashboard" },
  { icon: ShieldCheck, label: "Xero certified bookkeeping" },
  { icon: TrendingUp, label: "Business growth insights" },
];

function LoginContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const justRegistered = searchParams.get("registered") === "true";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setIsLoading(false);
      return;
    }

    if (data.user?.email === "daskapitalltd@gmail.com") {
      router.push("/admin");
    } else {
      router.push("/dashboard?welcome=true");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* ── LEFT PANEL — Branding ── */}
      <div className="hidden lg:flex lg:w-[45%] relative bg-[#0D1F35] flex-col justify-between p-12 overflow-hidden">
        {/* Glow orbs */}
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#3ECDB0]/10 blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-40 -right-20 w-[400px] h-[400px] rounded-full bg-[#1D4266]/60 blur-[100px] pointer-events-none" />
        {/* Grid dots */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none">
          <defs>
            <pattern id="login-dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="#3ECDB0" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#login-dots)" />
        </svg>

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-2.5">
          <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-[#3ECDB0] to-[#2FBEA1] shadow-[0_0_20px_rgba(62,205,176,0.5)]">
            <Zap size={17} className="text-white fill-white" />
          </span>
          <span className="font-[family-name:var(--font-space-grotesk)] font-bold text-[20px] text-white tracking-[-0.02em]">
            Kapital <span className="text-[#3ECDB0]">PNG</span>
          </span>
        </div>

        {/* Centre copy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#3ECDB0]/15 border border-[#3ECDB0]/25 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3ECDB0] animate-pulse" />
            <span className="text-[#3ECDB0] text-[12px] font-mono tracking-widest uppercase">Welcome Back</span>
          </div>

          <h2 className="font-[family-name:var(--font-space-grotesk)] text-[40px] font-bold text-white leading-[1.1] mb-5">
            Your finances,<br />
            <span className="text-[#3ECDB0]">crystal clear.</span>
          </h2>

          <p className="text-white/55 text-[15px] leading-relaxed mb-10 max-w-[340px]">
            Sign in to access your live financial dashboard, reports, and direct line to your bookkeeping team.
          </p>

          <div className="space-y-4">
            {features.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#3ECDB0]/15 border border-[#3ECDB0]/20 flex items-center justify-center flex-shrink-0">
                  <Icon size={15} className="text-[#3ECDB0]" />
                </div>
                <span className="text-white/70 text-[14px]">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bottom */}
        <div className="relative z-10 border-t border-white/10 pt-6">
          <p className="text-white/40 text-[12px] font-mono tracking-wide">
            © 2025 Das Kapital Limited · Port Moresby, PNG
          </p>
        </div>
      </div>

      {/* ── RIGHT PANEL — Form ── */}
      <div className="flex-1 bg-[#F0F5F9] flex flex-col items-center justify-center p-6 md:p-12 relative">
        {/* Back link */}
        <Link
          href="/"
          className="absolute top-8 left-8 flex items-center gap-2 text-[#5A7A9C] hover:text-[#1D4266] transition-colors group"
        >
          <span className="w-8 h-8 rounded-full bg-white border border-[#D9E4EE] flex items-center justify-center group-hover:border-[#3ECDB0] group-hover:bg-[#3ECDB0]/5 transition-all">
            <ArrowLeft size={14} />
          </span>
          <span className="text-[13px] font-medium hidden sm:block">Back to Home</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-[420px]"
        >
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2 justify-center mb-8">
            <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-[#3ECDB0] to-[#2FBEA1]">
              <Zap size={17} className="text-white fill-white" />
            </span>
            <span className="font-[family-name:var(--font-space-grotesk)] font-bold text-[20px] text-[#1D4266]">
              Kapital <span className="text-[#3ECDB0]">PNG</span>
            </span>
          </div>

          <div className="mb-8">
            <h1 className="font-[family-name:var(--font-space-grotesk)] text-[32px] font-bold text-[#1D4266] mb-2">
              Welcome back
            </h1>
            <p className="text-[#5A7A9C] text-[14px]">
              Sign in to access your financial dashboard.
            </p>
          </div>

          <AnimatePresence>
            {justRegistered && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 bg-[#3ECDB0]/10 border border-[#3ECDB0]/30 text-[#2FBEA1] text-[13px] px-4 py-3 rounded-xl mb-6"
              >
                <CheckCircle2 size={16} className="shrink-0" />
                Account created! Sign in with your new credentials.
              </motion.div>
            )}
          </AnimatePresence>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 text-red-600 text-[13px] px-4 py-3 rounded-xl mb-6"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-[#1D4266]">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white border-2 border-[#D9E4EE] focus:border-[#3ECDB0] rounded-xl px-4 py-3 text-[14px] text-[#1D4266] outline-none transition-colors shadow-sm placeholder:text-[#B0C4D8]"
                placeholder="you@company.com"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label className="text-[13px] font-semibold text-[#1D4266]">Password</label>
                <a href="#" className="text-[12px] text-[#3ECDB0] hover:text-[#2FBEA1] transition-colors">Forgot?</a>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white border-2 border-[#D9E4EE] focus:border-[#3ECDB0] rounded-xl px-4 py-3 text-[14px] text-[#1D4266] outline-none transition-colors shadow-sm placeholder:text-[#B0C4D8]"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 flex items-center justify-center gap-2 font-[family-name:var(--font-space-grotesk)] font-bold text-[15px] px-6 py-3.5 rounded-xl transition-all duration-200 bg-gradient-to-r from-[#3ECDB0] to-[#2CB99E] text-white hover:shadow-[0_12px_28px_rgba(62,205,176,0.35)] hover:-translate-y-[1px] disabled:opacity-60 disabled:cursor-not-allowed w-full"
            >
              {isLoading
                ? <Loader2 size={18} className="animate-spin" />
                : <><LogIn size={18} /> Sign In</>}
            </button>
          </form>

          <div className="relative my-7">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#D9E4EE]" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-[#F0F5F9] text-[12px] text-[#9BB3C8]">Don&apos;t have an account?</span>
            </div>
          </div>

          <Link
            href="/register"
            className="flex items-center justify-center gap-2 w-full border-2 border-[#D9E4EE] hover:border-[#3ECDB0] text-[#1D4266] hover:text-[#3ECDB0] font-semibold text-[14px] py-3 rounded-xl transition-all duration-200 bg-white"
          >
            Create an account
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0D1F35] flex items-center justify-center">
        <div className="flex items-center gap-3 text-white/50">
          <Loader2 size={20} className="animate-spin" />
          <span className="font-mono text-sm">Loading...</span>
        </div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}
