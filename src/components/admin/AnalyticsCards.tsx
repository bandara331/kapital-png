"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { motion } from "framer-motion";
import { FileText, Users, Clock, Activity } from "lucide-react";

interface AnalyticsCardsProps {
  activeClientsCount: number;
}

export function AnalyticsCards({ activeClientsCount }: AnalyticsCardsProps) {
  const [totalDocs, setTotalDocs] = useState(0);
  const [pendingDocs, setPendingDocs] = useState(0);

  useEffect(() => {
    fetchStats();

    // Subscribe to changes in documents table
    const sub = supabase
      .channel('analytics-docs')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'documents' },
        () => {
          fetchStats();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(sub);
    };
  }, []);

  const fetchStats = async () => {
    // Total docs
    const { count: docsCount } = await supabase
      .from('documents')
      .select('*', { count: 'exact', head: true });
      
    // Pending docs
    const { count: pendingCount } = await supabase
      .from('documents')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'Pending Review');

    if (docsCount !== null) setTotalDocs(docsCount);
    if (pendingCount !== null) setPendingDocs(pendingCount);
  };

  const stats = [
    {
      title: "Active Clients",
      value: activeClientsCount.toString(),
      change: "Live",
      isPositive: true,
      icon: Users,
      color: "text-[color:var(--color-teal-2)]",
      bg: "bg-[color:var(--color-teal)]/10",
    },
    {
      title: "Total Documents Processed",
      value: (totalDocs - pendingDocs).toString(),
      change: "Live",
      isPositive: true,
      icon: FileText,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
    },
    {
      title: "Pending Tasks (Review)",
      value: pendingDocs.toString(),
      change: pendingDocs > 0 ? "Action Required" : "All Caught Up",
      isPositive: pendingDocs === 0,
      icon: Clock,
      color: pendingDocs > 0 ? "text-[color:var(--color-gold)]" : "text-green-400",
      bg: pendingDocs > 0 ? "bg-[color:var(--color-gold)]/10" : "bg-green-400/10",
    },
    {
      title: "Database Connection",
      value: "Online",
      change: "Stable",
      isPositive: true,
      icon: Activity,
      color: "text-purple-400",
      bg: "bg-purple-400/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className="bg-[color:var(--card)] border border-[color:var(--border)] rounded-2xl p-6 flex flex-col relative overflow-hidden group hover:border-white/20 transition-colors"
          >
            {/* Subtle background glow effect on hover */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center`}>
                <Icon size={22} className={stat.color} />
              </div>
              <div className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${stat.isPositive ? 'bg-green-500/10 text-green-400' : 'bg-[color:var(--color-gold)]/10 text-[color:var(--color-gold)]'}`}>
                {stat.change}
              </div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-white/50 text-sm font-medium mb-1">{stat.title}</h3>
              <p className="text-3xl font-bold text-white font-[family-name:var(--font-space-grotesk)]">
                {stat.value}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
