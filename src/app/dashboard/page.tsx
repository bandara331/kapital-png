"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  FileText,
  Upload,
  Bell,
  Download,
  FileCheck,
  UploadCloud,
  ArrowUpRight,
  Clock,
  CheckCircle2,
} from "lucide-react";

const stats = [
  { label: "Cash Balance", value: "K 128,460", change: "+12.4%", positive: true, icon: TrendingUp },
  { label: "Reports Ready", value: "3", change: "New this month", positive: true, icon: FileCheck },
  { label: "Docs Pending Review", value: "2", change: "Uploaded by you", positive: null, icon: FileText },
];

const reports = [
  { name: "July 2026 Tax Report", date: "Aug 5, 2026", size: "1.2 MB", type: "PDF", status: "Ready", file: "July_Tax_Report.pdf" },
  { name: "Q2 Profit & Loss Statement", date: "Jul 22, 2026", size: "842 KB", type: "PDF", status: "Ready", file: "Q2_PnL_Statement.pdf" },
  { name: "June 2026 GST Return", date: "Jul 10, 2026", size: "560 KB", type: "PDF", status: "Ready", file: "June_GST_Return.pdf" },
  { name: "May 2026 Cashflow Summary", date: "Jun 8, 2026", size: "720 KB", type: "PDF", status: "Archived", file: "May_Cashflow_Summary.pdf" },
];

const activity = [
  { icon: CheckCircle2, label: "Q2 P&L Report uploaded by Kapital team", time: "2 hours ago", color: "text-[color:var(--color-teal-2)]" },
  { icon: Clock, label: "GST return filed for June 2026", time: "3 days ago", color: "text-yellow-400" },
  { icon: Upload, label: "You uploaded 2 receipts for reconciliation", time: "5 days ago", color: "text-blue-400" },
];

const cardVariant = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const }
  })
};

export default function DashboardPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files).map((f) => f.name);
    setUploadedFiles((prev) => [...prev, ...files]);
  };

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Top Bar */}
      <header className="sticky top-0 z-10 bg-[#08192d]/80 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-white font-[family-name:var(--font-space-grotesk)] font-bold text-[20px]">Client Portal</h1>
          <p className="text-white/40 text-[13px]">Welcome back, John 👋</p>
        </div>
        <button className="relative p-2.5 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-colors">
          <Bell size={18} />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[color:var(--color-teal)] ring-2 ring-[#08192d]"></span>
        </button>
      </header>

      <div className="p-6 md:p-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              custom={i}
              variants={cardVariant}
              initial="hidden"
              animate="visible"
              className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-start justify-between hover:bg-white/8 transition-colors"
            >
              <div>
                <p className="text-white/50 text-[12.5px] mb-1.5">{stat.label}</p>
                <p className="text-white font-[family-name:var(--font-space-grotesk)] font-bold text-[26px] leading-tight">{stat.value}</p>
                <p className={`text-[12px] mt-1.5 ${stat.positive ? "text-[color:var(--color-teal-2)]" : "text-white/40"}`}>
                  {stat.positive && <ArrowUpRight size={12} className="inline mr-0.5" />}
                  {stat.change}
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                <stat.icon size={20} className="text-[color:var(--color-teal-2)]" />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1.4fr_1fr] gap-6">
          {/* Recent Reports */}
          <motion.div
            custom={3}
            variants={cardVariant}
            initial="hidden"
            animate="visible"
            className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <h2 className="text-white font-[family-name:var(--font-space-grotesk)] font-semibold text-[16px]">Recent Reports</h2>
              <span className="text-[color:var(--color-teal-2)] text-[13px] font-medium cursor-pointer hover:underline">View all</span>
            </div>
            <div className="divide-y divide-white/5">
              {reports.map((report, i) => (
                <div key={i} className="flex items-center gap-4 px-6 py-4 hover:bg-white/5 transition-colors group">
                  <div className="w-9 h-9 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                    <FileText size={16} className="text-red-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-[14px] font-medium truncate">{report.name}</p>
                    <p className="text-white/40 text-[12px] mt-0.5">{report.date} · {report.size}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className={`text-[11px] px-2 py-1 rounded-full font-medium ${report.status === "Ready" ? "bg-[color:var(--color-teal)]/15 text-[color:var(--color-teal-2)]" : "bg-white/5 text-white/40"}`}>
                      {report.status}
                    </span>
                    <button className="w-8 h-8 rounded-lg bg-white/0 group-hover:bg-white/10 border border-transparent group-hover:border-white/10 flex items-center justify-center text-white/40 group-hover:text-white transition-all">
                      <Download size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column */}
          <div className="flex flex-col gap-6">
            {/* Upload Zone */}
            <motion.div
              custom={4}
              variants={cardVariant}
              initial="hidden"
              animate="visible"
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-white/10">
                <h2 className="text-white font-[family-name:var(--font-space-grotesk)] font-semibold text-[16px]">Upload Documents</h2>
              </div>
              <div className="p-5">
                <div
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${
                    isDragging
                      ? "border-[color:var(--color-teal)] bg-[color:var(--color-teal)]/5"
                      : "border-white/10 hover:border-white/20 hover:bg-white/5"
                  }`}
                >
                  <UploadCloud size={28} className="text-[color:var(--color-teal-2)] mx-auto mb-2" />
                  <p className="text-white/70 text-[13px] font-medium">Drag & drop files here</p>
                  <p className="text-white/30 text-[12px] mt-1">PDF, JPG, PNG up to 20MB</p>
                  <label className="mt-4 inline-block cursor-pointer text-[13px] font-semibold text-[color:var(--color-teal-2)] hover:text-white border border-[color:var(--color-teal)]/30 hover:border-white/30 rounded-full px-4 py-2 transition-colors">
                    Browse files
                    <input type="file" className="hidden" multiple onChange={(e) => {
                      const names = Array.from(e.target.files || []).map((f) => f.name);
                      setUploadedFiles((prev) => [...prev, ...names]);
                    }} />
                  </label>
                </div>
                {uploadedFiles.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {uploadedFiles.map((name, i) => (
                      <div key={i} className="flex items-center gap-2 text-[13px] text-[color:var(--color-teal-2)] bg-[color:var(--color-teal)]/10 rounded-lg px-3 py-2">
                        <CheckCircle2 size={14} />
                        <span className="truncate">{name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>

            {/* Activity Feed */}
            <motion.div
              custom={5}
              variants={cardVariant}
              initial="hidden"
              animate="visible"
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-white/10">
                <h2 className="text-white font-[family-name:var(--font-space-grotesk)] font-semibold text-[16px]">Recent Activity</h2>
              </div>
              <div className="px-6 py-4 space-y-4">
                {activity.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <item.icon size={16} className={`${item.color} shrink-0 mt-0.5`} />
                    <div>
                      <p className="text-white/80 text-[13px] leading-relaxed">{item.label}</p>
                      <p className="text-white/30 text-[11px] mt-0.5">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
