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
      <section className="py-20 bg-[color:var(--color-navy)] border-y border-[color:var(--border)] relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[color:var(--color-teal)]/5 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
        
        <div className="wrap relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="w-16 h-16 bg-[color:var(--color-teal)]/10 text-[color:var(--color-teal-2)] rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Video size={32} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-space-grotesk)] text-white mb-4">
              Face-to-Face, Digitally
            </h2>
            <p className="text-lg text-white/60 leading-relaxed">
              You don't need to be in our Port Moresby office to get expert advisory. We conduct comprehensive check-ins and financial reviews via <strong className="text-white">Zoom and Google Meet</strong>, giving you direct access to our expertise wherever you operate.
            </p>
          </div>
        </div>
      </section>

      {/* Secure Client Hub Section */}
      <section className="py-24 bg-[color:var(--background)] relative">
        <div className="wrap">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="order-2 lg:order-1">
              <div className="bg-[color:var(--card)] border border-[color:var(--border)] rounded-[24px] p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[color:var(--color-teal)]/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
                
                <h3 className="text-xl font-bold text-white mb-6 font-[family-name:var(--font-space-grotesk)] flex items-center gap-3">
                  <ShieldCheck size={24} className="text-[color:var(--color-teal)]" />
                  Exclusive Client Dashboard
                </h3>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                      <FileUp size={20} className="text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-1">Drag & Drop Uploads</h4>
                      <p className="text-sm text-white/50 leading-relaxed">No more email chains with lost receipts. Upload documents directly into our secure vault.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0">
                      <MessageSquare size={20} className="text-purple-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-1">Direct Private Messaging</h4>
                      <p className="text-sm text-white/50 leading-relaxed">Once you become a registered client, you unlock real-time chat with your dedicated advisor right inside the dashboard.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <p className="font-mono text-[13px] tracking-[0.14em] uppercase text-[#1C8E76] mb-4 flex items-center gap-2 before:content-[''] before:w-6 before:h-px before:bg-[color:var(--color-teal)]">
                Secure Client Hub
              </p>
              <h2 className="text-[clamp(32px,4vw,42px)] leading-[1.1] font-bold font-[family-name:var(--font-space-grotesk)] text-white mb-6">
                Everything in one secure place.
              </h2>
              <p className="text-lg text-white/60 mb-8 leading-relaxed">
                We believe in streamlined communication. That's why we built a proprietary, bank-level secure dashboard exclusively for our registered clients. 
              </p>
              <a href="/login" className="inline-flex items-center justify-center px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-[color:var(--color-teal)] hover:text-white transition-all">
                Explore the Dashboard
              </a>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}
