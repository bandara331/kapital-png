"use client";

import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }: any) => {
      if (!session) {
        router.push("/login");
      } else if (session.user.email !== "daskapitalltd@gmail.com") {
        setIsAdmin(false);
      } else {
        setIsAdmin(true);
      }
    });
  }, [router]);

  if (isAdmin === null) {
    return (
      <div className="flex h-screen items-center justify-center bg-[color:var(--background)]">
        <div className="w-6 h-6 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
      </div>
    );
  }

  if (isAdmin === false) {
    return (
      <div className="flex h-screen items-center justify-center bg-[color:var(--background)] flex-col gap-4 text-center px-6">
        <AlertTriangle size={48} className="text-red-400" />
        <h1 className="text-2xl font-bold text-white">Access Denied</h1>
        <p className="text-white/60">You do not have permission to view this page.</p>
        <Link
          href="/"
          className="mt-4 px-6 py-2 bg-[color:var(--color-teal)] text-[color:var(--color-navy-3)] font-semibold rounded-full hover:-translate-y-1 transition-transform"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[color:var(--background)]">
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
