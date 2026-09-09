"use client";

import { motion } from "framer-motion";
import { FileText, Download, Filter, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ReportsPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReports() {
      const { data, error } = await supabase
        .from('reports')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) {
        console.error('Error fetching reports:', error);
      } else {
        setReports(data || []);
      }
      setLoading(false);
    }
    fetchReports();
  }, []);

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8">
      <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-white font-[family-name:var(--font-space-grotesk)] font-bold text-[24px]">Reports</h1>
          <p className="text-white/40 text-[14px] mt-1">Access and download your financial statements and tax returns.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input 
              type="text" 
              placeholder="Search reports..." 
              className="bg-white/5 border border-white/10 rounded-full pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[color:var(--color-teal)] transition-colors w-[200px]"
            />
          </div>
          <button className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors">
            <Filter size={16} />
            Filter
          </button>
        </div>
      </header>

      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr] px-6 py-4 border-b border-white/10 text-[13px] font-medium text-white/40">
          <div>Report Name</div>
          <div>Date Generated</div>
          <div>Size & Type</div>
          <div className="text-right">Action</div>
        </div>
        <div className="divide-y divide-white/5">
          {loading ? (
            <div className="p-6 text-center text-white/40">Loading reports...</div>
          ) : reports.length === 0 ? (
            <div className="p-6 text-center text-white/40">No reports found.</div>
          ) : (
            reports.map((report, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="grid grid-cols-[2fr_1fr_1fr_1fr] items-center px-6 py-4 hover:bg-white/5 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
                    <FileText size={18} className="text-red-400" />
                  </div>
                  <div>
                    <p className="text-white text-[14px] font-medium">{report.name}</p>
                    <p className="text-white/40 text-[12px] mt-0.5">{report.status}</p>
                  </div>
                </div>
                <div className="text-[14px] text-white/70">{report.date}</div>
                <div className="text-[14px] text-white/70">{report.size} · {report.type}</div>
                <div className="flex justify-end">
                  <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 group-hover:bg-[color:var(--color-teal)]/10 text-white/60 group-hover:text-[color:var(--color-teal-2)] transition-colors text-[13px] font-medium">
                    <Download size={14} />
                    Download
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
