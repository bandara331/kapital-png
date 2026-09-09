import { Sectors } from "@/components/sections/Sectors";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Who We Serve — Kapital PNG",
  description: "Kapital PNG serves SMEs and organisations across Papua New Guinea moving to cloud accounting systems.",
};

export default function WhoWeServePage() {
  return (
    <main className="flex flex-col min-h-screen">
      <Sectors />
    </main>
  );
}
