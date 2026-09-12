"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useBookingModal } from "@/context/BookingModalContext";
import { supabase } from "@/lib/supabaseClient";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Overview", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Cloud Bookkeeping", href: "/services#bookkeeping" },
      { label: "AI-Aided Analytics", href: "/services#analytics" },
      { label: "Setup & Migration", href: "/services#setup" },
      { label: "Advisory Services", href: "/services#advisory" },
    ],
  },
  { label: "Who We Serve", href: "/who-we-serve" },
  { label: "How We Work", href: "/how-we-work" },
];

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { openModal } = useBookingModal();
  const pathname = usePathname();

  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
      if (mobileOpen) setMobileOpen(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { subscription.unsubscribe(); window.removeEventListener("scroll", onScroll); };
  }, [mobileOpen]);

  useEffect(() => { setMobileOpen(false); setOpenDropdown(null); }, [pathname]);

  const handleSignOut = async () => { await supabase.auth.signOut(); window.location.href = "/"; };
  const isAdmin = session?.user?.email === "daskapitalltd@gmail.com";

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-200 ${
          scrolled
            ? "bg-white shadow-[0_2px_12px_rgba(3,45,96,0.10)] border-b border-[#E5E7EB]"
            : "bg-white border-b border-[#E5E7EB]"
        } dark:bg-[#021F45] dark:border-white/10`}
      >
        <nav className="wrap flex items-center justify-between h-[64px]">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-baseline gap-1 font-[family-name:var(--font-space-grotesk)] font-bold text-[20px] text-[#032D60] dark:text-white no-underline tracking-[-0.02em]"
          >
            Kapital<span className="text-[#0176D3]">&nbsp;PNG</span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              const hasChildren = !!link.children;
              return (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => hasChildren && setOpenDropdown(link.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    href={link.href}
                    className={`flex items-center gap-1 px-3.5 py-2 rounded-md text-[14px] font-medium transition-colors duration-150 ${
                      active
                        ? "text-[#0176D3]"
                        : "text-[#032D60] hover:text-[#0176D3] dark:text-white/80 dark:hover:text-white"
                    }`}
                  >
                    {link.label}
                    {hasChildren && <ChevronDown size={14} className={`transition-transform duration-200 ${openDropdown === link.label ? "rotate-180" : ""}`} />}
                  </Link>

                  {/* Dropdown */}
                  <AnimatePresence>
                    {hasChildren && openDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-1 w-52 bg-white dark:bg-[#032D60] border border-[#E5E7EB] dark:border-white/10 rounded-xl shadow-xl overflow-hidden"
                      >
                        {link.children!.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={(e) => {
                              setOpenDropdown(null);
                              // If we are already on the services page, force a native hash change
                              if (pathname === '/services' && child.href.startsWith('/services#')) {
                                e.preventDefault();
                                window.location.hash = child.href.split('#')[1];
                              }
                            }}
                            className="flex items-center px-4 py-3 text-[13.5px] text-[#032D60] dark:text-white/80 hover:bg-[#EEF4FF] dark:hover:bg-white/10 hover:text-[#0176D3] transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-full text-[#54698D] dark:text-white/70 hover:bg-[#EEF4FF] dark:hover:bg-white/10 hover:text-[#0176D3] transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
              </button>
            )}

            {/* Auth — desktop */}
            {mounted && session ? (
              <>
                <Link
                  href={isAdmin ? "/admin" : "/dashboard"}
                  className="hidden sm:inline-flex items-center text-[13.5px] font-medium text-[#0176D3] hover:underline transition-colors px-2 py-1"
                >
                  {isAdmin ? "Admin" : "Dashboard"}
                </Link>
                <button
                  onClick={handleSignOut}
                  className="hidden sm:inline-flex items-center text-[13.5px] font-medium text-[#54698D] dark:text-white/50 hover:text-red-500 transition-colors px-2 py-1"
                >
                  Sign Out
                </button>
              </>
            ) : mounted ? (
              <>
                <Link
                  href="/login"
                  className="hidden sm:inline-flex items-center text-[13.5px] font-medium text-[#032D60] dark:text-white/80 hover:text-[#0176D3] transition-colors px-3 py-1.5"
                >
                  Client Login
                </Link>
                <Link
                  href="/register"
                  className="hidden sm:inline-flex items-center text-[13.5px] font-medium text-[#54698D] dark:text-white/60 hover:text-[#0176D3] transition-colors px-2 py-1.5"
                >
                  Sign Up
                </Link>
              </>
            ) : null}

            {/* Primary CTA */}
            <button
              onClick={openModal}
              className="hidden sm:inline-flex items-center gap-2 font-[family-name:var(--font-space-grotesk)] font-semibold text-[13.5px] px-5 py-2.5 rounded-full bg-[#0176D3] text-white hover:bg-[#1B96FF] transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[0_6px_20px_rgba(1,118,211,0.35)]"
            >
              Get started
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="lg:hidden p-2 rounded-md text-[#032D60] dark:text-white/80 hover:bg-[#EEF4FF] dark:hover:bg-white/10 transition-colors"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              key="drawer"
              initial={{ opacity: 0, x: "100%" }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[80vw] max-w-[320px] bg-white dark:bg-[#021F45] border-l border-[#E5E7EB] dark:border-white/10 flex flex-col lg:hidden"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 h-[64px] border-b border-[#E5E7EB] dark:border-white/10 shrink-0">
                <Link href="/" className="font-[family-name:var(--font-space-grotesk)] font-bold text-[18px] text-[#032D60] dark:text-white">
                  Kapital <span className="text-[#0176D3]">PNG</span>
                </Link>
                <button onClick={() => setMobileOpen(false)} className="p-1.5 rounded-md text-[#54698D] hover:bg-[#EEF4FF]"><X size={19} /></button>
              </div>

              {/* Links */}
              <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-0.5">
                {navLinks.map((link, i) => {
                  const active = pathname === link.href;
                  return (
                    <motion.div key={link.href} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 + 0.08 }}>
                      <Link
                        href={link.href}
                        className={`flex items-center w-full px-4 py-3 rounded-lg text-[15px] font-medium transition-colors ${
                          active ? "bg-[#EEF4FF] text-[#0176D3]" : "text-[#032D60] dark:text-white/80 hover:bg-[#F3F8FF] hover:text-[#0176D3]"
                        }`}
                      >
                        {link.label}
                      </Link>
                      {link.children && (
                        <div className="ml-4 mt-0.5 space-y-0.5">
                          {link.children.map((child) => (
                            <Link key={child.href} href={child.href}
                              onClick={(e) => {
                                setMobileOpen(false);
                                if (pathname === '/services' && child.href.startsWith('/services#')) {
                                  e.preventDefault();
                                  window.location.hash = child.href.split('#')[1];
                                }
                              }}
                              className="flex items-center w-full px-4 py-2 rounded-lg text-[13.5px] text-[#54698D] dark:text-white/60 hover:text-[#0176D3] hover:bg-[#EEF4FF] transition-colors"
                            >{child.label}</Link>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  );
                })}

                <div className="h-px bg-[#E5E7EB] dark:bg-white/10 my-4" />

                {mounted && session ? (
                  <>
                    <Link href={isAdmin ? "/admin" : "/dashboard"} className="flex items-center w-full px-4 py-3 rounded-lg text-[15px] font-medium text-[#0176D3] hover:bg-[#EEF4FF] transition-colors">
                      {isAdmin ? "Admin Portal" : "My Dashboard"}
                    </Link>
                    <button onClick={handleSignOut} className="flex w-full px-4 py-3 rounded-lg text-[15px] font-medium text-red-500 hover:bg-red-50 transition-colors text-left">
                      Sign Out
                    </button>
                  </>
                ) : mounted ? (
                  <>
                    <Link href="/login" className="flex items-center w-full px-4 py-3 rounded-lg text-[15px] font-medium text-[#032D60] dark:text-white/80 hover:bg-[#EEF4FF] hover:text-[#0176D3] transition-colors">
                      Client Login
                    </Link>
                    <Link href="/register" className="flex items-center w-full px-4 py-3 rounded-lg text-[15px] font-medium text-[#54698D] hover:bg-[#EEF4FF] hover:text-[#0176D3] transition-colors">
                      Sign Up
                    </Link>
                  </>
                ) : null}
              </nav>

              {/* CTA */}
              <div className="px-6 py-5 border-t border-[#E5E7EB] dark:border-white/10 shrink-0">
                <button
                  onClick={() => { openModal(); setMobileOpen(false); }}
                  className="w-full font-[family-name:var(--font-space-grotesk)] font-semibold text-[15px] py-3.5 rounded-full bg-[#0176D3] text-white hover:bg-[#1B96FF] transition-colors"
                >
                  Get started
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
