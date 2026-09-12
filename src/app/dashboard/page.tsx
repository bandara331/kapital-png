"use client";

import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";
import { useSearchParams } from "next/navigation";
import { ClientInbox } from "@/components/dashboard/ClientInbox";
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
  X,
  Loader2,
  Video,
  Calendar
} from "lucide-react";

const stats = [
  { label: "Cash Balance", value: "K 128,460", change: "+12.4%", positive: true, icon: TrendingUp },
  { label: "Reports Ready", value: "3", change: "New this month", positive: true, icon: FileCheck },
  { label: "Docs Pending Review", value: "2", change: "Uploaded by you", positive: null, icon: FileText },
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

function DashboardContent() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  
  const [reports, setReports] = useState<any[]>([]);
  const [showWelcome, setShowWelcome] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [meetings, setMeetings] = useState<any[]>([]);
  
  const searchParams = useSearchParams();

  useEffect(() => {
    async function loadUserAndReports() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email || "");
        setUserId(user.id);
        
        // Fetch reports
        const { data: docs } = await supabase
          .from("documents")
          .select("*")
          .eq("client_id", user.id)
          .eq("status", "Ready")
          .order("created_at", { ascending: false });
          
        if (docs) {
          setReports(docs);
        }

        // Fetch client meetings
        const { data: meetingsData } = await supabase
          .from("client_meetings")
          .select("*")
          .eq("client_id", user.id)
          .eq("status", "Scheduled")
          .order("meeting_date", { ascending: true });
          
        if (meetingsData) {
          setMeetings(meetingsData);
        }
      }
    }
    
    loadUserAndReports();

    if (searchParams.get("welcome") === "true") {
      setShowWelcome(true);
      setTimeout(() => setShowWelcome(false), 4000);
    }
  }, [searchParams]);

  const handleFileUpload = async (files: File[]) => {
    if (!userId || files.length === 0) return;
    setIsUploading(true);
    
    try {
      for (const file of files) {
        // 1. Upload to storage
        const filePath = `${userId}/${Date.now()}_${file.name}`;
        const { error: uploadError } = await supabase.storage
          .from("client_documents")
          .upload(filePath, file);
          
        if (uploadError) throw uploadError;
        
        // 2. Insert into documents table
        const { error: dbError } = await supabase
          .from("documents")
          .insert({
            client_id: userId,
            file_name: file.name,
            file_path: filePath,
            file_type: file.type || "unknown",
            file_size: file.size,
            status: "Pending Review"
          });
          
        if (dbError) throw dbError;
        
        setUploadedFiles(prev => [...prev, file.name]);
      }
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload document. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFileUpload(files);
  };
  
  const handleDownload = async (filePath: string, fileName: string) => {
    try {
      const { data, error } = await supabase.storage
        .from("client_documents")
        .createSignedUrl(filePath, 60); // 60 seconds expiry
        
      if (error) throw error;
      
      // Trigger download
      const link = document.createElement('a');
      link.href = data.signedUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to download document.");
    }
  };

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Welcome Toast */}
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -60 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-[color:var(--color-teal)] text-[color:var(--color-navy-3)] px-5 py-3.5 rounded-2xl shadow-[0_8px_32px_rgba(47,174,147,0.4)] font-semibold text-[14px]"
          >
            <CheckCircle2 size={18} />
            Welcome back! 👋 You're now signed in.
            <button onClick={() => setShowWelcome(false)} className="ml-2 hover:opacity-70">
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Bar */}
      <header className="sticky top-0 z-10 bg-[#08192d]/80 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-white font-[family-name:var(--font-space-grotesk)] font-bold text-[20px]">Client Portal</h1>
          <p className="text-white/40 text-[13px]">Welcome back, {userEmail || "Client"} 👋</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative p-2.5 rounded-full bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-colors">
            <Bell size={18} />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[color:var(--color-teal)] ring-2 ring-[#08192d]"></span>
          </button>
        </div>
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
              {reports.length === 0 ? (
                <div className="px-6 py-8 text-center text-white/40 text-[13px]">
                  No reports available yet.
                </div>
              ) : (
                reports.map((report) => (
                  <div key={report.id} className="flex items-center gap-4 px-6 py-4 hover:bg-white/5 transition-colors group">
                    <div className="w-9 h-9 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                      <FileText size={16} className="text-red-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-[14px] font-medium truncate">{report.file_name}</p>
                      <p className="text-white/40 text-[12px] mt-0.5">
                        {new Date(report.created_at).toLocaleDateString()} · {(report.file_size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-[11px] px-2 py-1 rounded-full font-medium bg-[color:var(--color-teal)]/15 text-[color:var(--color-teal-2)]">
                        {report.status}
                      </span>
                      <button 
                        onClick={() => handleDownload(report.file_path, report.file_name)}
                        className="w-8 h-8 rounded-lg bg-white/0 group-hover:bg-white/10 border border-transparent group-hover:border-white/10 flex items-center justify-center text-white/40 group-hover:text-white transition-all hover:text-[color:var(--color-teal-2)]"
                      >
                        <Download size={14} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>

          {/* Right Column */}
          <div className="flex flex-col gap-6">
            
            {/* Upcoming Meetings Widget */}
            <motion.div
              custom={4}
              variants={cardVariant}
              initial="hidden"
              animate="visible"
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
                <h2 className="text-white font-[family-name:var(--font-space-grotesk)] font-semibold text-[16px] flex items-center gap-2">
                  <Calendar size={18} className="text-blue-400" />
                  Upcoming Meetings
                </h2>
              </div>
              <div className="divide-y divide-white/5">
                {meetings.length === 0 ? (
                  <div className="px-6 py-8 text-center text-white/40 text-[13px]">
                    No upcoming meetings scheduled.
                  </div>
                ) : (
                  meetings.map((meeting) => (
                    <div key={meeting.id} className="p-5 hover:bg-white/5 transition-colors">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <h3 className="text-white font-medium text-[15px]">{meeting.title}</h3>
                          <p className="text-white/50 text-[13px] mt-1 flex items-center gap-1.5">
                            <Clock size={14} />
                            {new Date(meeting.meeting_date).toLocaleString([], { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                      <a 
                        href={meeting.meeting_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2.5 rounded-xl text-[13.5px] font-semibold shadow-lg shadow-blue-500/20 transition-colors"
                      >
                        <Video size={16} />
                        Join Meeting
                      </a>
                    </div>
                  ))
                )}
              </div>
            </motion.div>

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
                  } ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}
                >
                  {isUploading ? (
                    <Loader2 size={28} className="text-[color:var(--color-teal-2)] mx-auto mb-2 animate-spin" />
                  ) : (
                    <UploadCloud size={28} className="text-[color:var(--color-teal-2)] mx-auto mb-2" />
                  )}
                  <p className="text-white/70 text-[13px] font-medium">
                    {isUploading ? "Uploading..." : "Drag & drop files here"}
                  </p>
                  <p className="text-white/30 text-[12px] mt-1">PDF, JPG, PNG up to 20MB</p>
                  
                  {!isUploading && (
                    <label className="mt-4 inline-block cursor-pointer text-[13px] font-semibold text-[color:var(--color-teal-2)] hover:text-white border border-[color:var(--color-teal)]/30 hover:border-white/30 rounded-full px-4 py-2 transition-colors">
                      Browse files
                      <input type="file" className="hidden" multiple onChange={(e) => {
                        const files = Array.from(e.target.files || []);
                        handleFileUpload(files);
                      }} />
                    </label>
                  )}
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
            
            {/* Real-time Messaging Inbox */}
            <motion.div
              custom={6}
              variants={cardVariant}
              initial="hidden"
              animate="visible"
            >
              <ClientInbox />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="flex-1 flex h-screen items-center justify-center text-white/50">Loading dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
