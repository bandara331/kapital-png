"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import {
  LayoutDashboard,
  FileText,
  Upload,
  Settings,
  LogOut,
  Bell,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/reports", label: "Reports", icon: FileText },
  { href: "/dashboard/upload", label: "Upload", icon: Upload },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [initials, setInitials] = useState("JD");

  useEffect(() => {
    async function getUserData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email) {
        setUserEmail(user.email);
        
        // Fetch client details
        const { data: clientData } = await supabase
          .from("clients")
          .select("company_name")
          .eq("user_id", user.id)
          .single();
          
        if (clientData?.company_name) {
          setCompanyName(clientData.company_name);
          setInitials(clientData.company_name.substring(0, 2).toUpperCase());
        } else {
          setCompanyName("Client");
          setInitials(user.email.substring(0, 2).toUpperCase());
        }
      }
    }
    getUserData();
  }, []);

  return (
    <aside className="w-[72px] lg:w-[240px] min-h-screen bg-[color:var(--color-navy)] border-r border-white/10 flex flex-col shrink-0">
      {/* Logo */}
      <div className="px-4 lg:px-6 py-6 border-b border-white/10">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[color:var(--color-teal)] flex items-center justify-center shrink-0">
            <span className="font-bold text-[color:var(--color-navy-3)] text-sm font-[family-name:var(--font-space-grotesk)]">K</span>
          </div>
          <span className="hidden lg:block font-[family-name:var(--font-space-grotesk)] font-bold text-white text-[16px]">
            Kapital PNG
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 lg:px-4 py-6 flex flex-col gap-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-colors group ${
                isActive
                  ? "bg-[color:var(--color-teal)]/15 text-[color:var(--color-teal-2)]"
                  : "text-white/50 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon size={20} className="shrink-0" />
              <span className="hidden lg:block text-[14px] font-medium">{label}</span>
              {isActive && <ChevronRight size={14} className="hidden lg:block ml-auto" />}
            </Link>
          );
        })}
      </nav>

      {/* User / Logout */}
      <div className="px-2 lg:px-4 pb-6 border-t border-white/10 pt-4">
        <div className="flex items-center gap-3 px-3 py-3 rounded-xl mb-1">
          <div className="w-8 h-8 rounded-full bg-[color:var(--color-teal)]/20 border border-[color:var(--color-teal)]/30 flex items-center justify-center shrink-0">
            <span className="text-[color:var(--color-teal-2)] text-sm font-bold">{initials}</span>
          </div>
          <div className="hidden lg:block min-w-0">
            <p className="text-white text-[13px] font-semibold truncate">{companyName || "Client"}</p>
            <p className="text-white/40 text-[11px] truncate">{userEmail || "Loading..."}</p>
          </div>
        </div>
        <button
          onClick={async () => {
            await supabase.auth.signOut();
            router.push("/");
          }}
          className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-white/40 hover:text-red-400 hover:bg-red-400/5 transition-colors"
        >
          <LogOut size={18} className="shrink-0" />
          <span className="hidden lg:block text-[13px] font-medium">Sign out</span>
        </button>
      </div>
    </aside>
  );
}
