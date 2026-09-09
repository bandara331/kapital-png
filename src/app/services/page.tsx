import { Services } from "@/components/sections/Services";
import { RoiCalculator } from "@/components/sections/RoiCalculator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services — Kapital PNG",
  description: "Explore Kapital PNG's cloud bookkeeping, AI-aided analytics, system setup, and advisory services built around Xero.",
};

export default function ServicesPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <Services />
      <RoiCalculator />
    </main>
  );
}
