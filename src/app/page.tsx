import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { MissionVision } from "@/components/sections/MissionVision";
import { Services } from "@/components/sections/Services";
import { DashboardDemo } from "@/components/sections/DashboardDemo";
import { RoiCalculator } from "@/components/sections/RoiCalculator";
import { Sectors } from "@/components/sections/Sectors";
import { WhyUs } from "@/components/sections/WhyUs";
import { Process } from "@/components/sections/Process";
import { OcrScannerDemo } from "@/components/sections/OcrScannerDemo";
import { ContactForm } from "@/components/sections/ContactForm";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Hero />
      <About />
      <MissionVision />
      <Services />
      <DashboardDemo />
      <RoiCalculator />
      <Sectors />
      <WhyUs />
      <Process />
      <OcrScannerDemo />
      <ContactForm />
    </main>
  );
}
