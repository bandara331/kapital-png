import { Process } from "@/components/sections/Process";
import type { Metadata } from "next";
import { MessageSquare, Video, ShieldCheck, FileUp } from "lucide-react";

export const metadata: Metadata = {
  title: "How We Work — Kapital PNG",
  description: "Discover Kapital PNG's secure workflow, from digital consultations to the exclusive Client Hub.",
};

export default function HowWeWorkPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <Process />

      {/* Digital Consultations Section */}
      <section className="py-20 bg-[#F0F4F8] border-y border-[#D9E4EE] relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#3ECDB0]/8 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
        
        <div className="wrap relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="w-16 h-16 bg-[#3ECDB0]/10 text-[#3ECDB0] rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Video size={32} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-space-grotesk)] text-[#1D4266] mb-4">
              Face-to-Face, Digitally
            </h2>
            <p className="text-lg text-[#5A7A9C] leading-relaxed">
              You don&apos;t need to be in our Port Moresby office to get expert advisory. We conduct comprehensive check-ins and financial reviews via <strong className="text-[#1D4266]">Zoom and Google Meet</strong>, giving you direct access to our expertise wherever you operate.
            </p>
          </div>
        </div>
      </section>

      {/* Secure Client Hub Section */}
      <section className="py-24 bg-white relative">
        <div className="wrap">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="order-2 lg:order-1">
              <div className="bg-[#F8F9FA] border border-[#D9E4EE] rounded-[24px] p-8 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#3ECDB0]/8 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
                
                <h3 className="text-xl font-bold text-[#1D4266] mb-6 font-[family-name:var(--font-space-grotesk)] flex items-center gap-3">
                  <ShieldCheck size={24} className="text-[#3ECDB0]" />
                  Exclusive Client Dashboard
                </h3>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#3ECDB0]/10 flex items-center justify-center shrink-0">
                      <FileUp size={20} className="text-[#3ECDB0]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#1D4266] mb-1">Drag &amp; Drop Uploads</h4>
                      <p className="text-sm text-[#5A7A9C] leading-relaxed">No more email chains with lost receipts. Upload documents directly into our secure vault.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#1D4266]/8 flex items-center justify-center shrink-0">
                      <MessageSquare size={20} className="text-[#1D4266]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#1D4266] mb-1">Direct Private Messaging</h4>
                      <p className="text-sm text-[#5A7A9C] leading-relaxed">Once you become a registered client, you unlock real-time chat with your dedicated advisor right inside the dashboard.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <p className="font-mono text-[13px] tracking-[0.14em] uppercase text-[#3ECDB0] mb-4 flex items-center gap-2 before:content-[''] before:w-6 before:h-px before:bg-[#3ECDB0]">
                Secure Client Hub
              </p>
              <h2 className="text-[clamp(32px,4vw,42px)] leading-[1.1] font-bold font-[family-name:var(--font-space-grotesk)] text-[#1D4266] mb-6">
                Everything in one secure place.
              </h2>
              <p className="text-lg text-[#5A7A9C] mb-8 leading-relaxed">
                We believe in streamlined communication. That&apos;s why we built a proprietary, bank-level secure dashboard exclusively for our registered clients. 
              </p>
              <a href="/login" className="inline-flex items-center justify-center px-8 py-4 bg-[#3ECDB0] text-white font-semibold rounded-full hover:bg-[#2FBEA1] transition-all">
                Explore the Dashboard
              </a>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}
