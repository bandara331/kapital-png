import { Services } from "@/components/sections/Services";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services — Kapital PNG",
  description: "Explore Kapital PNG's cloud bookkeeping, analytics, system setup, and advisory services built around Xero.",
};

export default function ServicesPage() {
  return (
    <main className="flex flex-col min-h-screen bg-[#F0F5F9]">
      <div className="flex-1 flex flex-col">
        <Services />
      </div>
    </main>
  );
}
