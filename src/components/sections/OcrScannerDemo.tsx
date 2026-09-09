"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, FileText, CheckCircle2, AlertCircle, ImageIcon } from "lucide-react";
import { createWorker } from "tesseract.js";
import Image from "next/image";

const revealVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } }
};

type ScanState = "idle" | "reading_image" | "scanning" | "complete" | "error";

type ExtractedData = {
  vendor: string;
  total: string;
  date: string;
  category: string;
};

const MOCK_RECEIPT_TEXT = `TechStore PNG
Port Moresby, NCD
Date: August 11 2026
Invoice #TS-99201

MacBook Pro 16"   K 9,500.00
Magic Mouse        K 350.00
USB-C Hub          K 240.00

Subtotal:          K 10,090.00
GST (10%):         K 1,009.00
Total:             K 11,099.00

Thank you for your purchase!`;

export function OcrScannerDemo() {
  const [scanState, setScanState] = useState<ScanState>("idle");
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processTextWithGroq = async (textToProcess: string) => {
    setScanState("scanning");
    try {
      const res = await fetch("/api/ocr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ receiptText: textToProcess }),
      });

      const json = await res.json();

      if (!res.ok || json.error) {
        throw new Error(json.error ?? "API error occurred.");
      }

      setExtractedData(json.data);
      setScanState("complete");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setErrorMsg(message);
      setScanState("error");
    }
  };

  const handleTestScan = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the file input wrapper click
    if (scanState !== "idle") return;
    setErrorMsg("");
    setImageUrl(null); // Use the CSS wireframe
    await processTextWithGroq(MOCK_RECEIPT_TEXT);
  };

  const handleFileProcess = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setErrorMsg("Please upload a valid image file (JPG, PNG).");
      setScanState("error");
      return;
    }

    const localUrl = URL.createObjectURL(file);
    setImageUrl(localUrl);
    setScanState("reading_image");
    setErrorMsg("");

    try {
      // 1. Read image with Tesseract.js in the browser
      const worker = await createWorker('eng');
      const ret = await worker.recognize(localUrl);
      const text = ret.data.text;
      await worker.terminate();

      if (!text || text.trim().length < 5) {
        throw new Error("Could not detect any text in this image. Is it blurry?");
      }

      // 2. Send extracted raw text to Groq API
      await processTextWithGroq(text);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to read image.";
      setErrorMsg(message);
      setScanState("error");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileProcess(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileProcess(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleReset = () => {
    setScanState("idle");
    setExtractedData(null);
    setErrorMsg("");
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
      setImageUrl(null);
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <section className="py-[104px] md:py-[72px] overflow-hidden">
      <div className="wrap">
        <motion.div
          variants={revealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="max-w-[640px] mb-[48px]"
        >
          <p className="flex items-center gap-[10px] font-mono text-[12.5px] tracking-[0.14em] uppercase text-[#1C8E76] mb-[18px] before:content-[''] before:w-[22px] before:h-[1px] before:bg-[color:var(--color-teal)] before:inline-block">
            AI-Aided Automation
          </p>
          <h2 className="text-[clamp(28px,3.4vw,38px)] leading-[1.15] font-semibold font-[family-name:var(--font-space-grotesk)]">
            Scan. Extract. Automate.
          </h2>
          <p className="text-[color:var(--muted)] text-[16.5px] mt-[14px]">
            Our AI instantly extracts line items, taxes, and vendor details from your invoices and receipts — powered by Groq's ultra-fast Llama 3 model — and logs them directly into Xero.
          </p>
        </motion.div>

        <motion.div
          variants={revealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="bg-[color:var(--card)] border border-[color:var(--border)] rounded-[20px] p-[24px] md:p-[48px] shadow-[0_20px_60px_rgba(0,0,0,0.04)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.2)]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[48px] items-center">

            {/* Upload / Scan Area */}
            <div className="relative">
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                accept="image/*" 
                className="hidden" 
              />
              <div
                className={`relative border-2 border-dashed rounded-[16px] flex flex-col items-center justify-center p-[40px] transition-all duration-300 min-h-[360px] overflow-hidden ${
                  scanState === "idle"
                    ? isDragging 
                      ? "border-[color:var(--color-teal)] bg-[rgba(47,174,147,0.1)] scale-[1.02]"
                      : "border-[color:var(--color-line)] dark:border-white/20 bg-black/5 dark:bg-white/5 cursor-pointer hover:border-[color:var(--color-teal)] hover:bg-[rgba(47,174,147,0.05)]"
                    : "border-[color:var(--color-teal)] bg-[rgba(47,174,147,0.05)]"
                }`}
                onClick={() => scanState === "idle" && fileInputRef.current?.click()}
                onDragOver={scanState === "idle" ? handleDragOver : undefined}
                onDragLeave={scanState === "idle" ? handleDragLeave : undefined}
                onDrop={scanState === "idle" ? handleDrop : undefined}
              >
                <AnimatePresence mode="wait">
                  {scanState === "idle" && (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="text-center flex flex-col items-center pointer-events-none"
                    >
                      <UploadCloud size={48} className="text-[color:var(--color-teal)] mb-[16px]" />
                      <h3 className="font-[family-name:var(--font-space-grotesk)] font-semibold text-[18px] mb-[8px]">
                        {isDragging ? "Drop receipt now" : "Drop a receipt to scan"}
                      </h3>
                      <p className="text-[14px] text-[color:var(--muted)] mb-[24px]">or click "Test Scan" to see Groq AI in action</p>
                      <button 
                        onClick={handleTestScan}
                        className="pointer-events-auto inline-flex items-center gap-2 font-[family-name:var(--font-space-grotesk)] font-semibold text-[14.5px] px-[22px] py-[10px] rounded-full transition-all duration-200 bg-[color:var(--color-teal)] text-[color:var(--color-navy-3)] hover:-translate-y-[2px] shadow-[0_4px_14px_rgba(47,174,147,0.25)]"
                      >
                        Test Scan
                      </button>
                    </motion.div>
                  )}

                  {(scanState === "reading_image" || scanState === "scanning" || scanState === "complete" || scanState === "error") && (
                    <motion.div
                      key="scanning"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute inset-0 flex items-center justify-center bg-[color:var(--card)] p-4"
                    >
                      {imageUrl ? (
                        <div className="relative w-full h-full max-w-[280px] max-h-[320px] rounded-lg overflow-hidden border border-[color:var(--border)] shadow-lg bg-black/10">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={imageUrl} alt="Uploaded receipt" className="w-full h-full object-contain opacity-70" />
                          
                          {/* Laser animation */}
                          {(scanState === "reading_image" || scanState === "scanning") && (
                            <>
                              <motion.div
                                initial={{ top: "0%" }}
                                animate={{ top: "100%" }}
                                transition={{ duration: 2.5, ease: "linear", repeat: Infinity }}
                                className="absolute left-0 right-0 h-[2px] bg-[color:var(--color-teal-2)] shadow-[0_0_8px_2px_rgba(95,212,184,0.6)] z-10"
                              />
                              <div className="absolute inset-0 bg-[linear-gradient(rgba(95,212,184,0.1)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none z-0" />
                            </>
                          )}
                        </div>
                      ) : (
                        // CSS Wireframe Fallback for Test Scan
                        <div className="relative w-[220px] bg-white border border-[color:var(--color-line)] shadow-lg pt-6 pb-8 px-5 font-mono text-[10px] text-[color:var(--color-ink)] opacity-70">
                          <div className="text-center font-bold text-[14px] mb-3 border-b border-dashed border-[color:var(--color-line)] pb-2">TechStore PNG</div>
                          <div className="flex justify-between mb-1"><span>Date:</span><span>11 Aug 2026</span></div>
                          <div className="flex justify-between mb-4"><span>Inv:</span><span>#TS-99201</span></div>
                          <div className="flex justify-between mb-1"><span>MacBook Pro 16"</span><span>K9,500.00</span></div>
                          <div className="flex justify-between mb-1"><span>Magic Mouse</span><span>K350.00</span></div>
                          <div className="flex justify-between mb-4"><span>USB-C Hub</span><span>K240.00</span></div>
                          <div className="border-t border-dashed border-[color:var(--color-line)] pt-2 flex justify-between mb-1"><span>Subtotal</span><span>K10,090.00</span></div>
                          <div className="flex justify-between mb-2"><span>GST (10%)</span><span>K1,009.00</span></div>
                          <div className="border-t border-[color:var(--color-line)] pt-2 flex justify-between font-bold text-[12px]"><span>TOTAL</span><span>K11,099.00</span></div>

                          {(scanState === "scanning") && (
                            <>
                              <motion.div
                                initial={{ top: "0%" }}
                                animate={{ top: "100%" }}
                                transition={{ duration: 2.5, ease: "linear", repeat: Infinity }}
                                className="absolute left-0 right-0 h-[2px] bg-[color:var(--color-teal-2)] shadow-[0_0_8px_2px_rgba(95,212,184,0.6)] z-10"
                              />
                              <div className="absolute inset-0 bg-[linear-gradient(rgba(95,212,184,0.1)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none z-0" />
                            </>
                          )}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Results Area */}
            <div className="relative min-h-[360px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {scanState === "idle" && (
                  <motion.div
                    key="waiting"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center text-[color:var(--muted)] text-center h-full border border-dashed border-[color:var(--color-line)] dark:border-white/10 rounded-[16px] p-[30px]"
                  >
                    <FileText size={40} className="opacity-20 mb-[16px]" />
                    <p className="font-mono text-[13px] uppercase tracking-wider">Awaiting Scan Data...</p>
                  </motion.div>
                )}

                {scanState === "reading_image" && (
                  <motion.div
                    key="reading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center text-[color:var(--muted)] text-center h-full border border-dashed border-blue-400/40 rounded-[16px] p-[30px]"
                  >
                    <ImageIcon size={40} className="text-blue-400/40 mb-[16px]" />
                    <p className="font-mono text-[13px] uppercase tracking-wider text-blue-400">Reading Image...</p>
                    <p className="text-[12px] mt-2 text-[color:var(--muted)] animate-pulse">Running local OCR with Tesseract...</p>
                  </motion.div>
                )}

                {scanState === "scanning" && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center text-[color:var(--muted)] text-center h-full border border-dashed border-[color:var(--color-teal)]/40 dark:border-[color:var(--color-teal)]/20 rounded-[16px] p-[30px]"
                  >
                    <FileText size={40} className="text-[color:var(--color-teal)]/40 mb-[16px]" />
                    <p className="font-mono text-[13px] uppercase tracking-wider text-[color:var(--color-teal)]">Sending to Groq AI...</p>
                    <p className="text-[12px] mt-2 text-[color:var(--muted)] animate-pulse">Extracting fields with Llama 3...</p>
                  </motion.div>
                )}

                {scanState === "error" && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex flex-col items-center justify-center text-center h-full border border-dashed border-red-400/30 rounded-[16px] p-[30px]"
                  >
                    <AlertCircle size={40} className="text-red-400 mb-4" />
                    <p className="text-red-400 font-semibold font-[family-name:var(--font-space-grotesk)]">Extraction Failed</p>
                    <p className="text-[color:var(--muted)] text-[13px] mt-2">{errorMsg}</p>
                    <button onClick={handleReset} className="mt-6 border border-[color:var(--color-line)] dark:border-white/20 rounded-full px-5 py-2 text-[13px] hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                      Try Again
                    </button>
                  </motion.div>
                )}

                {scanState === "complete" && extractedData && (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-[color:var(--color-navy)] text-white rounded-[16px] p-[32px] shadow-lg relative overflow-hidden h-full flex flex-col justify-center"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[color:var(--color-teal)] opacity-[0.08] blur-[40px] rounded-full" />

                    <div className="flex items-center gap-[10px] mb-[24px]">
                      <CheckCircle2 size={24} className="text-[color:var(--color-teal-2)]" />
                      <div>
                        <h3 className="font-[family-name:var(--font-space-grotesk)] font-semibold text-[18px]">Extraction Complete</h3>
                        <p className="text-white/40 text-[11px] mt-0.5">via Groq · Qwen · 27B</p>
                      </div>
                    </div>

                    <div className="space-y-[16px] font-mono text-[14px]">
                      {Object.entries(extractedData).map(([key, value], i) => (
                        <motion.div
                          key={key}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex justify-between border-b border-white/10 pb-[8px] last:border-0"
                        >
                          <span className="text-white/50 capitalize">{key}:</span>
                          <span className={key === "total" ? "text-[color:var(--color-gold)] font-bold text-[16px] text-right" : "text-[color:var(--color-teal-2)] text-right"}>
                            {value}
                          </span>
                        </motion.div>
                      ))}
                    </div>

                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      onClick={handleReset}
                      className="mt-[32px] w-full border border-white/20 text-white/80 hover:bg-white/10 hover:text-white py-[10px] rounded-full transition-colors text-[14px] font-semibold font-[family-name:var(--font-space-grotesk)]"
                    >
                      Scan Another Receipt
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
