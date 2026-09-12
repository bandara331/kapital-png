"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { motion, AnimatePresence } from "framer-motion";
import { Building, Mail, Clock, MoreVertical, Ban, ShieldCheck, Activity, Send, X, Loader2, Video } from "lucide-react";
import { AnalyticsCards } from "@/components/admin/AnalyticsCards";
import { ActivityFeed } from "@/components/admin/ActivityFeed";
import { SystemHealth } from "@/components/admin/SystemHealth";
import { DocumentVault } from "@/components/admin/DocumentVault";
import { AdminInbox } from "@/components/admin/AdminInbox";
import { AdminSettings } from "@/components/admin/AdminSettings";

export default function AdminDashboardPage() {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Email Modal State
  const [selectedClientForEmail, setSelectedClientForEmail] = useState<any | null>(null);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  // Advanced Meeting Scheduler State
  const [selectedClientForMeeting, setSelectedClientForMeeting] = useState<any | null>(null);
  const [meetingTitle, setMeetingTitle] = useState("");
  const [meetingDate, setMeetingDate] = useState("");
  const [meetingTime, setMeetingTime] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const [isSavingMeeting, setIsSavingMeeting] = useState(false);

  useEffect(() => {
    async function fetchClients() {
      const { data, error } = await supabase
        .from("clients")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching clients:", error);
      } else {
        setClients(data || []);
      }
      setLoading(false);
    }
    fetchClients();
  }, []);

  const handleExportCSV = () => {
    if (clients.length === 0) return;
    
    // Create CSV headers
    const headers = ["Company Name", "Contact Email", "Status", "Date Joined"];
    
    // Create CSV rows
    const rows = clients.map(c => [
      `"${c.company_name || ''}"`,
      `"${c.email || ''}"`,
      `"Active"`, // Or pull real status if you have it
      `"${new Date(c.created_at).toLocaleDateString()}"`
    ]);
    
    // Combine into CSV string
    const csvContent = [
      headers.join(","),
      ...rows.map(r => r.join(","))
    ].join("\n");
    
    // Create blob and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Kapital_PNG_Clients_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClientForEmail || !emailSubject.trim() || !emailMessage.trim()) return;

    setIsSendingEmail(true);
    try {
      const res = await fetch("/api/send-client-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toEmail: selectedClientForEmail.email,
          clientName: selectedClientForEmail.company_name,
          subject: emailSubject,
          message: emailMessage,
        })
      });

      if (!res.ok) throw new Error("Failed to send email");
      
      // Reset and close
      setSelectedClientForEmail(null);
      setEmailSubject("");
      setEmailMessage("");
      alert("Email sent securely!");
    } catch (err) {
      console.error(err);
      alert("Error sending email. Please try again.");
    } finally {
      setIsSendingEmail(false);
    }
  };

  const handleSaveMeetingLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClientForMeeting || !meetingTitle || !meetingDate || !meetingTime || !meetingLink) return;

    setIsSavingMeeting(true);
    try {
      // Combine date and time into a single timestamp string
      const dateTimeString = `${meetingDate}T${meetingTime}:00`;
      
      const { error } = await supabase
        .from("client_meetings")
        .insert({
          client_id: selectedClientForMeeting.id,
          title: meetingTitle,
          meeting_date: dateTimeString,
          meeting_link: meetingLink,
          status: 'Scheduled'
        });

      if (error) throw error;
      
      alert("Meeting scheduled successfully!");
      setSelectedClientForMeeting(null);
      setMeetingLink("");
      setMeetingTitle("");
      setMeetingDate("");
      setMeetingTime("");
    } catch (err) {
      console.error(err);
      alert("Error scheduling meeting.");
    } finally {
      setIsSavingMeeting(false);
    }
  };

  return (
    <div className="p-6 md:p-10 space-y-8">
      <header>
        <h1 className="text-3xl font-[family-name:var(--font-space-grotesk)] font-bold text-white mb-2">Admin Overview</h1>
        <p className="text-white/50">Manage your registered clients and monitor platform activity in real-time.</p>
      </header>

      {/* Analytics Section */}
      <section>
        <AnalyticsCards activeClientsCount={clients.length} />
      </section>

      {/* Dashboard Grid (Activity Feed + System Health) */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[400px]">
        <div className="lg:col-span-2 h-[400px]">
          <ActivityFeed />
        </div>
        <div className="h-[400px]">
          <SystemHealth />
        </div>
      </section>

      {/* Real-time Client Inbox */}
      <section className="mt-8">
        <AdminInbox />
      </section>

      {/* Advanced Client Directory */}
      <section className="bg-[color:var(--card)] border border-[color:var(--border)] rounded-2xl overflow-hidden mt-8">
        <div className="p-6 border-b border-[color:var(--border)] flex items-center justify-between bg-white/5">
          <div>
            <h2 className="text-lg font-[family-name:var(--font-space-grotesk)] font-semibold text-white">Client Directory</h2>
            <p className="text-sm text-white/50 mt-1">Full registry of organizations using Kapital PNG</p>
          </div>
          <button 
            onClick={handleExportCSV}
            className="px-4 py-2 bg-[color:var(--color-teal)]/10 text-[color:var(--color-teal-2)] rounded-lg text-sm font-medium hover:bg-[color:var(--color-teal)]/20 transition-colors"
          >
            Export CSV
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/20 text-[13px] text-white/40 font-medium border-b border-[color:var(--border)]">
                <th className="px-6 py-4">Company Name</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Contact Email</th>
                <th className="px-6 py-4">Date Joined</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[color:var(--border)]">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="inline-flex items-center gap-3 text-white/40">
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
                      Loading clients...
                    </div>
                  </td>
                </tr>
              ) : clients.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-white/40">No clients registered yet.</td>
                </tr>
              ) : (
                clients.map((client, i) => (
                  <motion.tr 
                    key={client.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="hover:bg-white/5 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[color:var(--color-teal)]/20 to-[color:var(--color-navy)] border border-white/10 flex items-center justify-center shrink-0 shadow-inner">
                          <Building size={18} className="text-[color:var(--color-teal-2)]" />
                        </div>
                        <div>
                          <span className="font-semibold text-[14px] text-white/90 group-hover:text-white transition-colors">{client.company_name}</span>
                          <p className="text-xs text-white/30 font-mono mt-0.5">{client.id.split('-')[0]}...</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-[11px] font-semibold uppercase tracking-wider">
                        <ShieldCheck size={12} />
                        Active
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-[13px] text-white/60 group-hover:text-white/80 transition-colors">
                        <Mail size={14} className="opacity-50" />
                        {client.email || <span className="italic opacity-50">Not provided</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-[13px] text-white/60">
                        <Clock size={14} className="opacity-50" />
                        {new Date(client.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => {
                            setSelectedClientForMeeting(client);
                            setMeetingTitle("Monthly Sync");
                            setMeetingLink("");
                            setMeetingDate("");
                            setMeetingTime("");
                          }}
                          className="px-3 py-1.5 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5"
                        >
                          <Video size={14} />
                          Schedule Meeting
                        </button>
                        <button 
                          onClick={() => setSelectedClientForEmail(client)}
                          className="px-3 py-1.5 bg-[color:var(--color-teal)]/10 text-[color:var(--color-teal-2)] hover:bg-[color:var(--color-teal)]/20 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5"
                        >
                          <Send size={14} />
                          Send Email
                        </button>
                        <button className="p-1.5 text-white/30 hover:text-white hover:bg-white/10 rounded-lg transition-colors inline-flex items-center justify-center">
                          <MoreVertical size={18} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Document Vault */}
      <section className="mt-8">
        <DocumentVault />
      </section>

      {/* Settings Panel */}
      <section className="mt-8 pb-8">
        <AdminSettings />
      </section>

      {/* Email Composer Modal */}
      <AnimatePresence>
        {selectedClientForEmail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-[color:var(--color-navy)] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5">
                <h3 className="text-lg font-bold text-white font-[family-name:var(--font-space-grotesk)] flex items-center gap-2">
                  <Mail size={18} className="text-[color:var(--color-teal)]" />
                  Email {selectedClientForEmail.company_name}
                </h3>
                <button 
                  onClick={() => setSelectedClientForEmail(null)}
                  className="text-white/40 hover:text-white transition-colors p-1"
                >
                  <X size={20} />
                </button>
              </div>
              
              <form onSubmit={handleSendEmail} className="p-6 space-y-5">
                <div>
                  <label className="text-sm font-medium text-white/80 block mb-2">Subject</label>
                  <input
                    required
                    type="text"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    placeholder="e.g., Your Q3 Financials are Ready"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-[color:var(--color-teal)] transition-colors"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-white/80 block mb-2">Message</label>
                  <textarea
                    required
                    value={emailMessage}
                    onChange={(e) => setEmailMessage(e.target.value)}
                    placeholder="Type your message here..."
                    className="w-full h-40 bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white placeholder-white/30 focus:border-[color:var(--color-teal)] outline-none resize-none transition-colors"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button 
                    type="button"
                    onClick={() => setSelectedClientForEmail(null)}
                    className="px-5 py-2.5 text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={isSendingEmail || !emailSubject.trim() || !emailMessage.trim()}
                    className="flex items-center gap-2 px-5 py-2.5 bg-[color:var(--color-teal)] text-[color:var(--color-navy-3)] text-sm font-bold rounded-xl hover:bg-[color:var(--color-teal-2)] disabled:opacity-50 transition-colors"
                  >
                    {isSendingEmail ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Email
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Meeting Link Composer Modal */}
      <AnimatePresence>
        {selectedClientForMeeting && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-[color:var(--color-navy)] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5">
                <h3 className="text-lg font-bold text-white font-[family-name:var(--font-space-grotesk)] flex items-center gap-2">
                  <Video size={18} className="text-blue-400" />
                  Schedule Meeting with {selectedClientForMeeting.company_name}
                </h3>
                <button 
                  onClick={() => setSelectedClientForMeeting(null)}
                  className="text-white/40 hover:text-white transition-colors p-1"
                >
                  <X size={20} />
                </button>
              </div>
              
              <form onSubmit={handleSaveMeetingLink} className="p-6 space-y-5">
                <div>
                  <label className="text-sm font-medium text-white/80 block mb-2">Meeting Title</label>
                  <input
                    required
                    type="text"
                    value={meetingTitle}
                    onChange={(e) => setMeetingTitle(e.target.value)}
                    placeholder="e.g. Q3 Financial Review"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-white/80 block mb-2">Date</label>
                    <input
                      required
                      type="date"
                      value={meetingDate}
                      onChange={(e) => setMeetingDate(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-white/80 block mb-2">Time</label>
                    <input
                      required
                      type="time"
                      value={meetingTime}
                      onChange={(e) => setMeetingTime(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-white/80 block mb-2">Zoom / Teams URL</label>
                  <input
                    required
                    type="url"
                    value={meetingLink}
                    onChange={(e) => setMeetingLink(e.target.value)}
                    placeholder="https://zoom.us/j/123456789"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button 
                    type="button"
                    onClick={() => setSelectedClientForMeeting(null)}
                    className="px-5 py-2.5 text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={isSavingMeeting}
                    className="flex items-center gap-2 px-5 py-2.5 bg-blue-500 text-white text-sm font-bold rounded-xl hover:bg-blue-600 disabled:opacity-50 transition-colors"
                  >
                    {isSavingMeeting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        Schedule Meeting
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
