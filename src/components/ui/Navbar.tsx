"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useBookingModal } from "@/context/BookingModalContext";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { openModal } = useBookingModal();

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-[rgba(15,44,72,0.92)] dark:bg-[rgba(11,35,56,0.92)] backdrop-blur-md border-b border-[color:var(--color-line-dark)]">
      <nav className="wrap flex items-center justify-between h-[76px]">
        <Link href="#top" className="flex items-baseline gap-2 font-[family-name:var(--font-space-grotesk)] font-bold text-[22px] text-white no-underline tracking-[-0.02em]">
          Kapital<span className="text-[color:var(--color-teal-2)]">&nbsp;PNG</span>
        </Link>
        <div className="hidden md:flex items-center gap-9">
          <Link href="#about" className="text-white/80 hover:text-white text-[14.5px] font-medium tracking-[0.01em] transition-colors">
            About
          </Link>
          <Link href="#services" className="text-white/80 hover:text-white text-[14.5px] font-medium tracking-[0.01em] transition-colors">
            Services
          </Link>
          <Link href="#sectors" className="text-white/80 hover:text-white text-[14.5px] font-medium tracking-[0.01em] transition-colors">
            Who We Serve
          </Link>
          <Link href="#process" className="text-white/80 hover:text-white text-[14.5px] font-medium tracking-[0.01em] transition-colors">
            How We Work
          </Link>
        </div>
        <div className="flex items-center gap-3">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full text-white/80 hover:bg-white/10 hover:text-white transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )}
          <Link
            href="/dashboard"
            className="hidden sm:inline-flex items-center gap-2 font-[family-name:var(--font-space-grotesk)] font-semibold text-[13.5px] md:text-[14px] px-[16px] py-[10px] md:px-[18px] md:py-[11px] rounded-full transition-all duration-200 border border-white/25 text-white/80 hover:text-white hover:border-white/50 hover:bg-white/5"
          >
            Client Login
          </Link>
          <button
            onClick={openModal}
            className="inline-flex items-center gap-2 font-[family-name:var(--font-space-grotesk)] font-semibold text-[13.5px] md:text-[14.5px] px-[18px] py-[10px] md:px-[22px] md:py-[12px] rounded-full transition-all duration-200 border border-transparent bg-[color:var(--color-teal)] text-[color:var(--color-navy-3)] hover:-translate-y-[2px] hover:shadow-[0_10px_24px_rgba(47,174,147,0.35)]"
          >
            Get in touch
          </button>
        </div>
      </nav>
    </header>
  );
}
