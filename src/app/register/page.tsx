"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { UserPlus, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // 1. Sign up the user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setIsLoading(false);
      return;
    }

    // 2. Insert into the clients table so Admin can see it
    if (authData.user) {
      const { error: dbError } = await supabase
        .from('clients')
        .insert([
          { 
            id: authData.user.id,
            company_name: companyName,
            email: email,
          }
        ]);
        
      if (dbError) {
        console.warn("Could not insert into clients table (non-fatal):", dbError.message || dbError);
        // Non-fatal: user auth already created, don't block registration
      }
    }

    setIsLoading(false);
    // Always redirect to login page after registration
    router.push("/login?registered=true");
  };

  return (
    <div className="min-h-screen bg-[color:var(--color-navy)] flex flex-col items-center justify-center p-4 relative overflow-hidden">
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
          <h1 className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-white/50 text-sm">Get started with Kapital PNG analytics.</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-white/80">Company Name</label>
            <input 
              type="text" 
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="bg-white/5 border border-white/10 focus:border-[color:var(--color-teal)] rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors"
              placeholder="Your Business Ltd"
              required
            />
          </div>

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
            <label className="text-[13px] font-medium text-white/80">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white/5 border border-white/10 focus:border-[color:var(--color-teal)] rounded-xl px-4 py-3 text-sm text-white outline-none transition-colors"
              placeholder="••••••••"
              minLength={6}
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="mt-2 flex items-center justify-center gap-2 font-[family-name:var(--font-space-grotesk)] font-semibold text-[15px] px-6 py-3.5 rounded-xl transition-all duration-200 bg-white text-[color:var(--color-navy-3)] hover:bg-white/90 disabled:opacity-70 w-full"
          >
            {isLoading ? <Loader2 size={18} className="animate-spin" /> : <><UserPlus size={18} /> Register</>}
          </button>
        </form>

        <p className="text-center text-white/50 text-sm mt-8">
          Already have an account? <Link href="/login" className="text-[color:var(--color-teal)] hover:text-[color:var(--color-teal-2)] transition-colors font-medium">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
}
