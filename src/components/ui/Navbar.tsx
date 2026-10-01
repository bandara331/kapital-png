"use client";

import Link from "next/link";
import { Menu, X, ChevronDown, Zap } from "lucide-react";
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
      { label: "Analytics", href: "/services#analytics" },
      { label: "Setup & Migration", href: "/services#setup" },
      { label: "Advisory Services", href: "/services#advisory" },
    ],
  },
  { label: "Who We Serve", href: "/who-we-serve" },
  { label: "How We Work", href: "/how-we-work" },
];

export function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const { openModal } = useBookingModal();
  const pathname = usePathname();
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
    supabase.auth.getSession().then(({ data: { session } }: any) => setSession(session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e: any, s: any) => setSession(s));
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      if (mobileOpen) setMobileOpen(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { subscription.unsubscribe(); window.removeEventListener("scroll", onScroll); };
  }, [mobileOpen]);

  useEffect(() => { setMobileOpen(false); setOpenDropdown(null); }, [pathname]);

  const handleSignOut = async () => { await supabase.auth.signOut(); window.location.href = "/"; };

  return (
    <>
      {/* ── Sticky wrapper ── */}
      <div className={`sticky top-0 z-50 transition-all duration-500 ${scrolled ? "py-2" : "py-0"}`}>
        <header
          className={`transition-all duration-500 ${
            scrolled
              ? "mx-auto max-w-[1160px] rounded-2xl shadow-[0_8px_32px_rgba(29,66,102,0.18)] border border-white/10"
              : "w-full border-b border-white/5"
          } bg-[#0D1F35]/90 backdrop-blur-xl`}
        >
          {/* Subtle top gradient line */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#3ECDB0]/50 to-transparent rounded-t-2xl pointer-events-none" />

          <nav className="wrap flex items-center justify-between h-[64px] px-4 lg:px-6">

            {/* ── Logo ── */}
            <Link
              href="/"
              className="flex items-center gap-2 font-[family-name:var(--font-space-grotesk)] font-bold text-[20px] text-white no-underline tracking-[-0.02em] group"
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-[#3ECDB0] to-[#2FBEA1] shadow-[0_0_16px_rgba(62,205,176,0.4)] group-hover:shadow-[0_0_24px_rgba(62,205,176,0.6)] transition-shadow duration-300">
                <Zap size={15} className="text-white fill-white" />
              </span>
              Kapital <span className="text-[#3ECDB0]">PNG</span>
            </Link>

            {/* ── Desktop nav links ── */}
            <div className="hidden lg:flex items-center gap-0.5">
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
                      className={`relative flex items-center gap-1 px-4 py-2 rounded-lg text-[13.5px] font-medium transition-all duration-200 group ${
                        active
                          ? "text-[#3ECDB0]"
                          : "text-white/65 hover:text-white"
                      }`}
                    >
                      {/* Hover bg pill */}
                      <span className="absolute inset-0 rounded-lg bg-white/0 group-hover:bg-white/6 transition-colors duration-200" />
                      <span className="relative">{link.label}</span>
                      {hasChildren && (
                        <ChevronDown
                          size={13}
                          className={`relative transition-transform duration-200 ${openDropdown === link.label ? "rotate-180 text-[#3ECDB0]" : ""}`}
                        />
                      )}
                      {/* Active underline glow */}
                      {active && (
                        <motion.span
                          layoutId="nav-active"
                          className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-[#3ECDB0] shadow-[0_0_8px_rgba(62,205,176,0.8)]"
                        />
                      )}
                    </Link>

                    {/* ── Dropdown ── */}
                    <AnimatePresence>
                      {hasChildren && openDropdown === link.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.97 }}
                          transition={{ duration: 0.18, ease: "easeOut" }}
                          className="absolute top-full left-0 mt-2 w-56 rounded-2xl bg-[#0D1F35]/95 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.4)] overflow-hidden"
                        >
                          {/* Top accent */}
                          <div className="h-[1px] bg-gradient-to-r from-transparent via-[#3ECDB0]/40 to-transparent" />
                          <div className="p-2">
                            {link.children!.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={(e) => {
                                  setOpenDropdown(null);
                                  if (pathname === "/services" && child.href.startsWith("/services#")) {
                                    e.preventDefault();
                                    window.location.hash = child.href.split("#")[1];
                                  }
                                }}
                                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-[13px] text-white/70 hover:text-[#3ECDB0] hover:bg-white/6 transition-all duration-150 group/item"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-[#3ECDB0]/40 group-hover/item:bg-[#3ECDB0] transition-colors duration-150 shrink-0" />
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* ── Right actions ── */}
            <div className="flex items-center gap-2">
              {mounted && session ? (
                <button
                  onClick={handleSignOut}
                  className="hidden sm:inline-flex items-center text-[13px] font-medium text-white/50 hover:text-red-400 transition-colors px-3 py-1.5"
                >
                  Sign Out
                </button>
              ) : mounted ? (
                <>
                  <Link
                    href="/login"
                    className="hidden sm:inline-flex items-center text-[13px] font-medium text-white/60 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/6"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="hidden sm:inline-flex items-center text-[13px] font-medium text-white/40 hover:text-white transition-colors px-2 py-1.5 rounded-lg hover:bg-white/6"
                  >
                    Sign Up
                  </Link>
                </>
              ) : null}

              {/* Primary CTA */}
              <button
                onClick={openModal}
                className="hidden sm:inline-flex items-center gap-2 font-[family-name:var(--font-space-grotesk)] font-semibold text-[13px] px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#3ECDB0] to-[#2CB99E] text-white transition-all duration-300 hover:shadow-[0_0_24px_rgba(62,205,176,0.5)] hover:-translate-y-[1px] relative overflow-hidden group"
              >
                <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300 rounded-xl" />
                <span className="relative">Get started</span>
              </button>

              {/* Hamburger */}
              <button
                onClick={() => setMobileOpen((o) => !o)}
                className="lg:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/8 transition-colors"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
              >
                {mobileOpen ? <X size={21} /> : <Menu size={21} />}
              </button>
            </div>
          </nav>
        </header>
      </div>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              key="drawer"
              initial={{ opacity: 0, x: "100%" }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[80vw] max-w-[320px] bg-[#0D1F35]/98 backdrop-blur-2xl border-l border-white/10 flex flex-col lg:hidden"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 h-[64px] border-b border-white/8 shrink-0">
                <Link href="/" className="font-[family-name:var(--font-space-grotesk)] font-bold text-[18px] text-white">
                  Kapital <span className="text-[#3ECDB0]">PNG</span>
                </Link>
                <button onClick={() => setMobileOpen(false)} className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/8 transition-colors">
                  <X size={19} />
                </button>
              </div>

              {/* Links */}
              <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-0.5">
                {navLinks.map((link, i) => {
                  const active = pathname === link.href;
                  return (
                    <motion.div key={link.href} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 + 0.08 }}>
                      <Link
                        href={link.href}
                        className={`flex items-center w-full px-4 py-3 rounded-xl text-[15px] font-medium transition-all ${
                          active
                            ? "bg-[#3ECDB0]/15 text-[#3ECDB0] border border-[#3ECDB0]/20"
                            : "text-white/70 hover:text-white hover:bg-white/6"
                        }`}
                      >
                        {link.label}
                      </Link>
                      {link.children && (
                        <div className="ml-4 mt-0.5 space-y-0.5">
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={(e) => {
                                setMobileOpen(false);
                                if (pathname === "/services" && child.href.startsWith("/services#")) {
                                  e.preventDefault();
                                  window.location.hash = child.href.split("#")[1];
                                }
                              }}
                              className="flex items-center gap-2 w-full px-4 py-2.5 rounded-xl text-[13.5px] text-white/50 hover:text-[#3ECDB0] hover:bg-white/5 transition-colors"
                            >
                              <span className="w-1 h-1 rounded-full bg-[#3ECDB0]/50 shrink-0" />
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  );
                })}

                <div className="h-px bg-white/8 my-4" />

                {mounted && session ? (
                  <button onClick={handleSignOut} className="flex w-full px-4 py-3 rounded-xl text-[15px] font-medium text-red-400 hover:bg-red-500/10 transition-colors text-left">
                    Sign Out
                  </button>
                ) : mounted ? (
                  <>
                    <Link href="/login" className="flex items-center w-full px-4 py-3 rounded-xl text-[15px] font-medium text-white/70 hover:text-white hover:bg-white/6 transition-colors">
                      Login
                    </Link>
                    <Link href="/register" className="flex items-center w-full px-4 py-3 rounded-xl text-[15px] font-medium text-white/50 hover:text-white hover:bg-white/6 transition-colors">
                      Sign Up
                    </Link>
                  </>
                ) : null}
              </nav>

              {/* CTA */}
              <div className="px-6 py-5 border-t border-white/8 shrink-0">
                <button
                  onClick={() => { openModal(); setMobileOpen(false); }}
                  className="w-full font-[family-name:var(--font-space-grotesk)] font-semibold text-[15px] py-3.5 rounded-xl bg-gradient-to-r from-[#3ECDB0] to-[#2CB99E] text-white hover:shadow-[0_0_24px_rgba(62,205,176,0.45)] transition-all duration-300"
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
