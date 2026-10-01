"use client";

import Link from "next/link";
import { Mail, MapPin, Phone, ExternalLink, Share2 } from "lucide-react";

const col1 = {
  heading: "Services",
  links: [
    { label: "Cloud Bookkeeping", href: "/services#bookkeeping" },
    { label: "Advisory Services", href: "/services#advisory" },
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


export function Footer() {
  return (
    <footer className="bg-[#F0F5F9] dark:bg-[#0D2135] border-t border-[#D9E4EE] dark:border-white/10">

      {/* Main footer grid */}
      <div className="wrap pt-16 pb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

        {/* Brand column */}
        <div>
          <Link
            href="/"
            className="inline-block font-[family-name:var(--font-space-grotesk)] font-bold text-[20px] text-[#1D4266] dark:text-white no-underline tracking-[-0.02em] mb-4"
          >
            Kapital <span className="text-[#3ECDB0]">PNG</span>
          </Link>
          <p className="text-[14px] text-[#5A7A9C] dark:text-white/55 leading-relaxed mb-6">
            Cloud bookkeeping & financial analytics, built for Papua New Guinea businesses. A trading division of Das Kapital Limited.
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
                className="w-8 h-8 rounded-full border border-[#D9E4EE] dark:border-white/15 flex items-center justify-center text-[#5A7A9C] dark:text-white/50 hover:text-[#3ECDB0] hover:border-[#3ECDB0] transition-colors duration-200"
              >
                {s.icon}
              </a>
            ))}
          </div>

          {/* Contact */}
          <ul className="mt-6 space-y-3">
            <li className="flex items-center gap-2.5 text-[13.5px] text-[#5A7A9C] dark:text-white/55">
              <MapPin size={14} className="text-[#3ECDB0] shrink-0" />
              Port Moresby, Papua New Guinea
            </li>
            <li className="flex items-center gap-2.5">
              <Mail size={14} className="text-[#3ECDB0] shrink-0" />
              <a href="mailto:info@kapitalpng.com" className="text-[13.5px] text-[#5A7A9C] dark:text-white/55 hover:text-[#3ECDB0] transition-colors">
                info@kapitalpng.com
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone size={14} className="text-[#3ECDB0] shrink-0" />
              <a href="https://wa.me/67575388212" target="_blank" rel="noopener noreferrer" className="text-[13.5px] text-[#5A7A9C] dark:text-white/55 hover:text-[#3ECDB0] transition-colors flex items-center gap-1.5">
                +675 75388212
                <span className="text-[10px] bg-[#25D366]/15 text-[#25D366] px-1.5 py-0.5 rounded-full font-mono">WhatsApp</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Link columns */}
        {[col1, col2].map((col) => (
          <div key={col.heading}>
            <h4 className="text-[12px] font-mono tracking-[0.12em] uppercase text-[#5A7A9C] dark:text-white/50 mb-5">
              {col.heading}
            </h4>
            <ul className="space-y-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[14px] text-[#3ECDB0] hover:underline hover:text-[#2FBEA1] transition-colors"
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
      <div className="bg-[#F8FAFC] border-t border-[#D9E4EE]">
        <div className="wrap py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12.5px] text-[#5A7A9C]">
            © {new Date().getFullYear()} Kapital PNG. All rights reserved.
          <div className="flex items-center gap-5">
            <Link href="#" className="hover:text-[#1D4266] transition-colors">Legal</Link>
            <Link href="#" className="hover:text-[#1D4266] transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-[#1D4266] transition-colors">Terms</Link>
            <span className="text-[#5A7A9C]/60">Port Moresby, PNG</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
