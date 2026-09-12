"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, UserPlus, MessageSquare, Loader2 } from "lucide-react";

type Activity = {
  id: string;
  type: "upload" | "registration" | "message";
  title: string;
  description: string;
  time: Date;
  icon: any;
  color: string;
  bg: string;
};

export function ActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActivities();

    // Subscribe to multiple tables
    const clientsSub = supabase.channel('feed-clients').on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'clients' }, fetchActivities).subscribe();
    const docsSub = supabase.channel('feed-docs').on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'documents' }, fetchActivities).subscribe();
    const msgsSub = supabase.channel('feed-msgs').on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, fetchActivities).subscribe();

    return () => {
      supabase.removeChannel(clientsSub);
      supabase.removeChannel(docsSub);
      supabase.removeChannel(msgsSub);
    };
  }, []);

  const fetchActivities = async () => {
    try {
      // 1. Fetch recent clients
      const { data: clientsData } = await supabase.from('clients').select('id, company_name, created_at').order('created_at', { ascending: false }).limit(5);
      
      // 2. Fetch recent documents
      const { data: docsData } = await supabase.from('documents').select('id, file_name, created_at, clients(company_name)').order('created_at', { ascending: false }).limit(5);
      
      // 3. Fetch recent messages
      const { data: msgsData } = await supabase.from('messages').select('id, is_from_admin, created_at, clients(company_name)').order('created_at', { ascending: false }).limit(5);

      const allEvents: Activity[] = [];

      // Map Clients
      if (clientsData) {
        clientsData.forEach((c: any) => allEvents.push({
          id: `client-${c.id}`,
          type: "registration",
          title: "New Client Registered",
          description: `${c.company_name} has joined the platform.`,
          time: new Date(c.created_at),
          icon: UserPlus,
          color: "text-[color:var(--color-teal-2)]",
          bg: "bg-[color:var(--color-teal)]/10",
        }));
      }

      // Map Documents
      if (docsData) {
        docsData.forEach((d: any) => allEvents.push({
          id: `doc-${d.id}`,
          type: "upload",
          title: "Document Uploaded",
          description: `${(d.clients as any)?.company_name || 'A client'} uploaded ${d.file_name}.`,
          time: new Date(d.created_at),
          icon: UploadCloud,
          color: "text-blue-400",
          bg: "bg-blue-400/10",
        }));
      }

      // Map Messages
      if (msgsData) {
        msgsData.forEach((m: any) => allEvents.push({
          id: `msg-${m.id}`,
          type: "message",
          title: m.is_from_admin ? "Reply Sent" : "Message Received",
          description: m.is_from_admin 
            ? `Admin replied to ${(m.clients as any)?.company_name || 'a client'}.`
            : `${(m.clients as any)?.company_name || 'A client'} sent a message.`,
          time: new Date(m.created_at),
          icon: MessageSquare,
          color: "text-purple-400",
          bg: "bg-purple-400/10",
        }));
      }

      // Sort and take top 8
      allEvents.sort((a, b) => b.time.getTime() - a.time.getTime());
      setActivities(allEvents.slice(0, 8));
    } catch (err) {
      console.error("Error fetching unified activities:", err);
    } finally {
      setLoading(false);
    }
  };

  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div className="bg-[color:var(--card)] border border-[color:var(--border)] rounded-2xl p-6 h-[400px] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-[family-name:var(--font-space-grotesk)] font-semibold text-white">Live Activity Feed</h2>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-xs text-white/50 font-medium">Live</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {loading ? (
          <div className="flex items-center justify-center h-full text-white/30 text-sm gap-2">
            <Loader2 size={16} className="animate-spin" />
            Loading live feed...
          </div>
        ) : activities.length === 0 ? (
          <div className="flex items-center justify-center h-full text-white/30 text-sm text-center">
            Waiting for activity...<br/>Client events will appear here in real-time.
          </div>
        ) : (
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
            <AnimatePresence>
              {activities.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20, height: 0 }}
                    animate={{ opacity: 1, x: 0, height: 'auto' }}
                    exit={{ opacity: 0, x: -20, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                  >
                    {/* Timeline dot */}
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-[color:var(--card)] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow absolute left-0 md:left-1/2 md:-translate-x-1/2 ${activity.bg} z-10`}>
                      <Icon size={16} className={activity.color} />
                    </div>
                    
                    {/* Content */}
                    <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] pl-12 md:pl-0 pt-2 pb-2">
                      <div className="bg-white/5 border border-white/5 hover:border-white/10 transition-colors p-4 rounded-xl">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm font-semibold text-white/90">{activity.title}</h4>
                          <time className="text-[11px] font-medium text-white/40">{getTimeAgo(activity.time)}</time>
                        </div>
                        <p className="text-xs text-white/60 leading-relaxed">{activity.description}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
