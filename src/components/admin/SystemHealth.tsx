"use client";

import { motion } from "framer-motion";
import { Server, Database, Cloud } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export function SystemHealth() {
  const [dbLatency, setDbLatency] = useState<number | null>(null);
  const [storageStatus, setStorageStatus] = useState("Checking...");

  useEffect(() => {
    checkHealth();
    const interval = setInterval(checkHealth, 30000); // Check every 30s
    return () => clearInterval(interval);
  }, []);

  const checkHealth = async () => {
    // 1. Check DB Latency
    const start = performance.now();
    const { error: dbError } = await supabase.from('clients').select('id').limit(1);
    const end = performance.now();
    
    if (!dbError) {
      setDbLatency(Math.round(end - start));
    } else {
      setDbLatency(-1);
    }

    // 2. Check Storage
    const { error: storageError } = await supabase.storage.getBucket('client_documents');
    if (!storageError) {
      setStorageStatus("Operational");
    } else {
      setStorageStatus("Error");
    }
  };

  const systems = [
    {
      name: "Supabase Database",
      status: dbLatency !== -1 ? "Operational" : "Offline",
      metric: dbLatency ? (dbLatency === -1 ? "Error" : `${dbLatency}ms`) : "Pinging...",
      icon: Database,
      color: "text-[color:var(--color-teal-2)]",
      bg: "bg-[color:var(--color-teal)]/10",
      isHealthy: dbLatency !== -1
    },
    {
      name: "Client Storage Bucket",
      status: storageStatus,
      metric: "Connected",
      icon: Cloud,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      isHealthy: storageStatus === "Operational"
    },
    {
      name: "Next.js Web Server",
      status: "Operational",
      metric: "Online",
      icon: Server,
      color: "text-white/80",
      bg: "bg-white/10",
      isHealthy: true
    }
  ];

  return (
    <div className="bg-[color:var(--card)] border border-[color:var(--border)] rounded-2xl p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-[family-name:var(--font-space-grotesk)] font-semibold text-white">System Health</h2>
        <div className="text-xs px-2.5 py-1 rounded-full bg-green-500/10 text-green-400 font-medium">
          All Systems Go
        </div>
      </div>
      
      <div className="flex-1 space-y-4">
        {systems.map((sys, index) => {
          const Icon = sys.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${sys.bg}`}>
                  <Icon size={18} className={sys.color} />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white/90">{sys.name}</h4>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <div className={`w-1.5 h-1.5 rounded-full ${sys.isHealthy ? 'bg-green-400' : 'bg-red-400'}`} />
                    <span className="text-[11px] text-white/40">{sys.status}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-mono text-white/70">{sys.metric}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
