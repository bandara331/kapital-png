"use client";

import { FileText, Users, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { AdminSignOutButton } from "@/components/ui/AdminSignOutButton";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
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
    return <div className="flex h-screen items-center justify-center bg-[color:var(--background)] text-white/50">Loading Admin Portal...</div>;
  }

  if (isAdmin === false) {
    return (
      <div className="flex h-screen items-center justify-center bg-[color:var(--background)] flex-col gap-4 text-center">
        <AlertTriangle size={48} className="text-red-400" />
        <h1 className="text-2xl font-bold text-white">Access Denied</h1>
        <p className="text-white/60">You are logged in as a Client. Only administrators can view this page.</p>
        <Link href="/dashboard" className="mt-4 px-6 py-2 bg-[color:var(--color-teal)] text-[color:var(--color-navy-3)] font-semibold rounded-full hover:-translate-y-1 transition-transform">
          Return to Client Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[color:var(--background)]">
      {/* Admin Sidebar */}
      <aside className="w-[280px] border-r border-[color:var(--border)] bg-[color:var(--card)] p-6 flex flex-col">
        <div className="mb-10">
          <Link href="/" className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-white">
            Kapital<span className="text-[color:var(--color-teal)]">PNG</span>
          </Link>
          <div className="text-[11px] text-[color:var(--color-gold)] font-mono mt-1 tracking-widest uppercase">Admin Portal</div>
        </div>

        <nav className="flex-1 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[color:var(--color-teal)]/10 text-[color:var(--color-teal-2)] font-medium text-sm">
            <Users size={18} />
            Overview
          </Link>
        </nav>

        <div className="mt-auto">
          <AdminSignOutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
