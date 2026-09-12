import { About } from "@/components/sections/About";
import { MissionVision } from "@/components/sections/MissionVision";
import { ClientImpressions } from "@/components/sections/ClientImpressions";
import { WhyUs } from "@/components/sections/WhyUs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — Kapital PNG",
  description: "Learn about Kapital PNG, the cloud accounting arm of Das Kapital Limited, serving Papua New Guinea businesses.",
};

export default function AboutPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <About />
      <MissionVision />
      <ClientImpressions />
      <WhyUs />
    </main>
  );
}
