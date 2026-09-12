"use client";

import { useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogIn, Loader2, CheckCircle2 } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

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

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setIsLoading(false);
      return;
    }

    if (data.user?.email === 'daskapitalltd@gmail.com') {
      router.push("/admin");
    } else {
      router.push("/dashboard?welcome=true");
    }
  };

  return (
    <div className="min-h-screen bg-[color:var(--color-navy)] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background styling */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[color:var(--color-teal)]/5 rounded-full blur-[100px] pointer-events-none" />
      
      <Link href="/" className="absolute top-8 left-8 text-white/50 hover:text-white transition-colors font-mono text-sm">
        ← Back to Home
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[420px] bg-[color:var(--card)] border border-[color:var(--border)] rounded-[24px] p-8 md:p-10 shadow-2xl relative z-10"
      >
        <div className="text-center mb-8">
          <h1 className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-white/50 text-sm">Sign in to access your financial dashboard.</p>
        </div>

        <AnimatePresence>
          {justRegistered && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 bg-[color:var(--color-teal)]/10 border border-[color:var(--color-teal)]/30 text-[color:var(--color-teal-2)] text-sm px-4 py-3 rounded-xl mb-6"
            >
              <CheckCircle2 size={16} className="shrink-0" />
              Account created! Sign in with your new credentials.
            </motion.div>
          )}
        </AnimatePresence>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-white/80">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/5 border border-white/10 focus:border-[color:var(--color-teal)] rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors"
              placeholder="you@company.com"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <label className="text-[13px] font-medium text-white/80">Password</label>
              <a href="#" className="text-[12px] text-[color:var(--color-teal)] hover:text-[color:var(--color-teal-2)]">Forgot?</a>
            </div>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white/5 border border-white/10 focus:border-[color:var(--color-teal)] rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="mt-2 flex items-center justify-center gap-2 font-[family-name:var(--font-space-grotesk)] font-semibold text-[15px] px-6 py-3.5 rounded-xl transition-all duration-200 bg-[color:var(--color-teal)] text-[color:var(--color-navy-3)] hover:bg-[color:var(--color-teal-2)] hover:shadow-[0_10px_24px_rgba(47,174,147,0.25)] disabled:opacity-70 w-full"
          >
            {isLoading ? <Loader2 size={18} className="animate-spin" /> : <><LogIn size={18} /> Sign In</>}
          </button>
        </form>

        <p className="text-center text-white/50 text-sm mt-8">
          Don't have an account? <Link href="/register" className="text-[color:var(--color-teal)] hover:text-[color:var(--color-teal-2)] transition-colors font-medium">Create one</Link>
        </p>
      </motion.div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[color:var(--color-navy)] flex items-center justify-center text-white/50">Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}
