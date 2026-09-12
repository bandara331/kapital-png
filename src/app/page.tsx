import { Hero } from "@/components/sections/Hero";
import { OcrScannerDemo } from "@/components/sections/OcrScannerDemo";
import { MissionVision } from "@/components/sections/MissionVision";
import { Services } from "@/components/sections/Services";
import { WhyUs } from "@/components/sections/WhyUs";
import { Sectors } from "@/components/sections/Sectors";
import { Process } from "@/components/sections/Process";
import { RoiCalculator } from "@/components/sections/RoiCalculator";
import { ClientImpressions } from "@/components/sections/ClientImpressions";
import { ContactForm } from "@/components/sections/ContactForm";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* 1. Hook — who we are and what we do */}
      <Hero />

      {/* 2. Live product demo — AI OCR scanner in action */}
      <OcrScannerDemo />

      {/* 3. Mission & Vision — why we exist */}
      <MissionVision />

      {/* 4. Services — what we offer with pricing */}
      <Services />

      {/* 5. Why Us — our differentiators */}
      <WhyUs />

      {/* 6. Who We Serve — target audience */}
      <Sectors />

      {/* 7. How It Works — 5-step process */}
      <Process />

      {/* 8. ROI Calculator — personalised value proof */}
      <RoiCalculator />

      {/* 9. Client Impressions — live reviews + submission */}
      <ClientImpressions />

      {/* 10. Contact / CTA — convert */}
      <ContactForm />
    </main>
  );
}

