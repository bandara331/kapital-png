import { Hero } from "@/components/sections/Hero";
import { OcrScannerDemo } from "@/components/sections/OcrScannerDemo";
import { ContactForm } from "@/components/sections/ContactForm";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Hero />
      <OcrScannerDemo />
      <ContactForm />
    </main>
  );
}

