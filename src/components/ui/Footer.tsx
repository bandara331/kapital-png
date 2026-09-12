"use client";

import Link from "next/link";
import { Mail, MapPin, Phone, ExternalLink, Share2 } from "lucide-react";

const col1 = {
  heading: "Services",
  links: [
    { label: "Cloud Bookkeeping", href: "/services#bookkeeping" },
    { label: "AI-Aided Analytics", href: "/services#analytics" },
    { label: "Setup & Migration", href: "/services#setup" },
    { label: "Advisory Services", href: "/services#advisory" },
    { label: "ROI Calculator", href: "/#calculator" },
  ],
};

const col2 = {
  heading: "About Kapital PNG",
  links: [
    { label: "Who We Are", href: "/about" },
    { label: "How We Work", href: "/how-we-work" },
    { label: "Who We Serve", href: "/who-we-serve" },
    { label: "Das Kapital Limited", href: "#" },
    { label: "Careers", href: "#" },
  ],
};

const col3 = {
  heading: "Quick Links",
  links: [
    { label: "Client Login", href: "/login" },
    { label: "Create Account", href: "/register" },
    { label: "Client Dashboard", href: "/dashboard" },
    { label: "Contact Us", href: "/#contact" },
    { label: "Privacy Policy", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-white dark:bg-[#021F45] border-t border-[#E5E7EB] dark:border-white/10">

      {/* Main footer grid */}
      <div className="wrap pt-16 pb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand column */}
        <div>
          <Link
            href="/"
            className="inline-block font-[family-name:var(--font-space-grotesk)] font-bold text-[20px] text-[#032D60] dark:text-white no-underline tracking-[-0.02em] mb-4"
          >
            Kapital <span className="text-[#0176D3]">PNG</span>
          </Link>
          <p className="text-[14px] text-[#54698D] dark:text-white/55 leading-relaxed mb-6">
            Cloud bookkeeping & AI-aided financial analytics, built for Papua New Guinea businesses. A trading division of Das Kapital Limited.
          </p>

          {/* Social */}
          <div className="flex items-center gap-2">
            {[
              { icon: <ExternalLink size={14} />, href: "https://linkedin.com", label: "LinkedIn" },
              { icon: <Share2 size={14} />, href: "https://facebook.com", label: "Facebook" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-8 h-8 rounded-full border border-[#E5E7EB] dark:border-white/15 flex items-center justify-center text-[#54698D] dark:text-white/50 hover:text-[#0176D3] hover:border-[#0176D3] transition-colors duration-200"
              >
                {s.icon}
              </a>
            ))}
          </div>

          {/* Contact */}
          <ul className="mt-6 space-y-3">
            <li className="flex items-center gap-2.5 text-[13.5px] text-[#54698D] dark:text-white/55">
              <MapPin size={14} className="text-[#0176D3] shrink-0" />
              Port Moresby, Papua New Guinea
            </li>
            <li className="flex items-center gap-2.5">
              <Mail size={14} className="text-[#0176D3] shrink-0" />
              <a href="mailto:info@kapitalpng.com" className="text-[13.5px] text-[#54698D] dark:text-white/55 hover:text-[#0176D3] transition-colors">
                info@kapitalpng.com
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone size={14} className="text-[#0176D3] shrink-0" />
              <a href="tel:+67570000000" className="text-[13.5px] text-[#54698D] dark:text-white/55 hover:text-[#0176D3] transition-colors">
                +675 000 0000
              </a>
            </li>
          </ul>
        </div>

        {/* Link columns */}
        {[col1, col2, col3].map((col) => (
          <div key={col.heading}>
            <h4 className="text-[12px] font-mono tracking-[0.12em] uppercase text-[#54698D] dark:text-white/50 mb-5">
              {col.heading}
            </h4>
            <ul className="space-y-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[14px] text-[#0176D3] hover:underline hover:text-[#1B96FF] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Dark bottom bar */}
      <div className="bg-[#032D60] dark:bg-[#010F1F]">
        <div className="wrap py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12.5px] text-white/40">
          <span>
            © {new Date().getFullYear()} Kapital PNG — a trading division of Das Kapital Limited. All rights reserved.
          </span>
          <div className="flex items-center gap-5">
            <Link href="#" className="hover:text-white/70 transition-colors">Legal</Link>
            <Link href="#" className="hover:text-white/70 transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white/70 transition-colors">Terms</Link>
            <span className="text-white/25">Port Moresby, PNG</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
