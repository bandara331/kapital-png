"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail, Video, Settings, Loader2, Send,
  Users, Calendar, Phone, MessageSquare, CheckCircle2,
} from "lucide-react";

type Client = { id: string; company_name: string; email: string; created_at: string };

export default function AdminDashboardPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"meetings" | "email" | "settings">("meetings");

  // Meeting state
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [meetingTitle, setMeetingTitle] = useState("Monthly Sync");
  const [meetingDate, setMeetingDate] = useState("");
  const [meetingTime, setMeetingTime] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const [meetingType, setMeetingType] = useState<"zoom" | "meet" | "teams" | "whatsapp">("zoom");
  const [isSavingMeeting, setIsSavingMeeting] = useState(false);
  const [meetingSuccess, setMeetingSuccess] = useState(false);

  // Email state
  const [emailClient, setEmailClient] = useState<Client | null>(null);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState(false);

  // Settings state
  const [notifyEmail, setNotifyEmail] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [settingsSaved, setSettingsSaved] = useState(false);

  useEffect(() => {
    async function load() {
      const [{ data: clientData }, { data: settingsData }] = await Promise.all([
        supabase.from("clients").select("*").order("created_at", { ascending: false }),
        supabase.from("admin_settings").select("admin_email, whatsapp_number").single(),
      ]);
      setClients(clientData || []);
      if (settingsData) {
        setNotifyEmail(settingsData.admin_email || "");
        setWhatsappNumber(settingsData.whatsapp_number || "");
      }
      setLoading(false);
    }
    load();
  }, []);

  const handleSaveMeeting = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClient || !meetingTitle || !meetingDate || !meetingTime || !meetingLink) return;
    setIsSavingMeeting(true);
    try {
      const { error } = await supabase.from("client_meetings").insert({
        client_id: selectedClient.id,
        title: meetingTitle,
        meeting_date: `${meetingDate}T${meetingTime}:00`,
        meeting_link: meetingLink,
        meeting_type: meetingType,
        status: "Scheduled",
      });
      if (error) throw error;
      setMeetingSuccess(true);
      setMeetingLink(""); setMeetingDate(""); setMeetingTime("");
      setTimeout(() => setMeetingSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      alert("Error scheduling meeting.");
    } finally {
      setIsSavingMeeting(false);
    }
  };

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailClient || !emailSubject.trim() || !emailMessage.trim()) return;
    setIsSendingEmail(true);
    try {
      const res = await fetch("/api/send-client-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toEmail: emailClient.email,
          clientName: emailClient.company_name,
          subject: emailSubject,
          message: emailMessage,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setEmailSuccess(true);
      setEmailSubject(""); setEmailMessage("");
      setTimeout(() => setEmailSuccess(false), 3000);
    } catch {
      alert("Error sending email. Please try again.");
    } finally {
      setIsSendingEmail(false);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingSettings(true);
    try {
      const { error } = await supabase
        .from("admin_settings")
        .update({ admin_email: notifyEmail, whatsapp_number: whatsappNumber, updated_at: new Date().toISOString() })
        .eq("id", 1);
      if (error) throw error;
      setSettingsSaved(true);
      setTimeout(() => setSettingsSaved(false), 3000);
    } catch {
      alert("Error saving settings.");
    } finally {
      setIsSavingSettings(false);
    }
  };

  const tabs = [
    { id: "meetings", label: "Schedule Meeting", icon: <Video size={16} /> },
    { id: "email",    label: "Send Email",       icon: <Mail size={16} /> },
    { id: "settings", label: "Settings",         icon: <Settings size={16} /> },
  ] as const;

  const meetingTypeOptions = [
    { value: "zoom",      label: "Zoom",         placeholder: "https://zoom.us/j/123456789" },
    { value: "meet",      label: "Google Meet",  placeholder: "https://meet.google.com/abc-defg-hij" },
    { value: "teams",     label: "Teams",        placeholder: "https://teams.microsoft.com/l/..." },
    { value: "whatsapp",  label: "WhatsApp",     placeholder: "https://wa.me/67575388212" },
  ] as const;

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-[family-name:var(--font-space-grotesk)] font-bold text-[#1D4266] mb-1">
          Admin Portal
        </h1>
        <p className="text-[#1D4266]/50 text-sm">Manage meetings, send emails, and update contact settings.</p>
      </header>

      {/* Summary strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: <Users size={20} />, label: "Registered Clients", value: loading ? "—" : clients.length.toString() },
          { icon: <Calendar size={20} />, label: "Meeting Types", value: "Zoom · Meet · Teams · WhatsApp" },
          { icon: <MessageSquare size={20} />, label: "Quick Actions", value: "Schedule · Email · Settings" },
        ].map((s) => (
          <div key={s.label} className="bg-white shadow-sm border border-[#1D4266]/10 rounded-2xl p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[color:var(--color-teal)]/15 flex items-center justify-center text-[color:var(--color-teal-2)] shrink-0">
              {s.icon}
            </div>
            <div>
              <p className="text-[13px] text-[#1D4266]/40 font-mono uppercase tracking-wider">{s.label}</p>
              <p className="text-[15px] font-semibold text-[#1D4266] mt-0.5">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tab bar */}
      <div className="flex gap-2 bg-white shadow-sm border border-[#1D4266]/10 rounded-2xl p-1.5">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-[13.5px] font-semibold transition-all duration-200 ${
              activeTab === tab.id
                ? "bg-[color:var(--color-teal)] text-[color:var(--color-navy-3)] shadow"
                : "text-[#1D4266]/50 hover:text-[#1D4266]"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* ── SCHEDULE MEETING TAB ── */}
        {activeTab === "meetings" && (
          <motion.div key="meetings" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            className="bg-white shadow-sm border border-[#1D4266]/10 rounded-2xl p-6 space-y-6">
            <h2 className="text-lg font-bold text-[#1D4266] font-[family-name:var(--font-space-grotesk)]">Schedule a Meeting</h2>

            {/* Client picker */}
            <div>
              <label className="text-sm font-medium text-[#1D4266]/70 block mb-3">Select Client</label>
              {loading ? (
                <div className="text-[#1D4266]/30 text-sm flex items-center gap-2"><Loader2 size={14} className="animate-spin" /> Loading clients...</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                  {clients.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedClient(c)}
                      className={`text-left px-4 py-3 rounded-xl border text-sm transition-all ${
                        selectedClient?.id === c.id
                          ? "border-[color:var(--color-teal)] bg-[color:var(--color-teal)]/10 text-[#1D4266]"
                          : "border-[#1D4266]/10 bg-white shadow-sm text-[#1D4266]/60 hover:border-[#1D4266]/30 hover:text-[#1D4266]"
                      }`}
                    >
                      <span className="font-semibold block">{c.company_name}</span>
                      <span className="text-[11px] opacity-60">{c.email}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Meeting form */}
            <form onSubmit={handleSaveMeeting} className="space-y-4">
              {/* Meeting type */}
              <div>
                <label className="text-sm font-medium text-[#1D4266]/70 block mb-2">Platform</label>
                <div className="flex gap-2 flex-wrap">
                  {meetingTypeOptions.map((o) => (
                    <button
                      key={o.value}
                      type="button"
                      onClick={() => { setMeetingType(o.value); setMeetingLink(""); }}
                      className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
                        meetingType === o.value
                          ? "border-blue-400 bg-blue-500/15 text-blue-600"
                          : "border-[#1D4266]/10 text-[#1D4266]/50 hover:border-[#1D4266]/30 hover:text-[#1D4266]"
                      }`}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-[#1D4266]/70 block mb-2">Meeting Title</label>
                <input
                  required
                  type="text"
                  value={meetingTitle}
                  onChange={(e) => setMeetingTitle(e.target.value)}
                  placeholder="e.g. Q3 Financial Review"
                  className="w-full bg-white shadow-sm border border-[#1D4266]/10 rounded-xl px-4 py-2.5 text-sm text-[#1D4266] placeholder-[#1D4266]/30 outline-none focus:border-[color:var(--color-teal)] transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-[#1D4266]/70 block mb-2">Date</label>
                  <input required type="date" value={meetingDate} onChange={(e) => setMeetingDate(e.target.value)}
                    className="w-full bg-white shadow-sm border border-[#1D4266]/10 rounded-xl px-4 py-2.5 text-sm text-[#1D4266] outline-none focus:border-[color:var(--color-teal)] transition-colors" />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#1D4266]/70 block mb-2">Time</label>
                  <input required type="time" value={meetingTime} onChange={(e) => setMeetingTime(e.target.value)}
                    className="w-full bg-white shadow-sm border border-[#1D4266]/10 rounded-xl px-4 py-2.5 text-sm text-[#1D4266] outline-none focus:border-[color:var(--color-teal)] transition-colors" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-[#1D4266]/70 block mb-2">
                  {meetingTypeOptions.find((o) => o.value === meetingType)?.label} Link
                </label>
                <input
                  required
                  type="url"
                  value={meetingLink}
                  onChange={(e) => setMeetingLink(e.target.value)}
                  placeholder={meetingTypeOptions.find((o) => o.value === meetingType)?.placeholder}
                  className="w-full bg-white shadow-sm border border-[#1D4266]/10 rounded-xl px-4 py-2.5 text-sm text-[#1D4266] placeholder-[#1D4266]/30 outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <AnimatePresence>
                  {meetingSuccess && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="flex items-center gap-2 text-green-600 text-sm font-medium">
                      <CheckCircle2 size={16} /> Meeting scheduled!
                    </motion.div>
                  )}
                </AnimatePresence>
                <button
                  type="submit"
                  disabled={isSavingMeeting || !selectedClient}
                  className="ml-auto flex items-center gap-2 px-6 py-2.5 bg-[color:var(--color-teal)] text-[color:var(--color-navy-3)] text-sm font-bold rounded-xl hover:bg-[color:var(--color-teal-2)] disabled:opacity-40 transition-colors"
                >
                  {isSavingMeeting ? <><Loader2 size={15} className="animate-spin" /> Saving...</> : <><Video size={15} /> Schedule Meeting</>}
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* ── SEND EMAIL TAB ── */}
        {activeTab === "email" && (
          <motion.div key="email" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            className="bg-white shadow-sm border border-[#1D4266]/10 rounded-2xl p-6 space-y-6">
            <h2 className="text-lg font-bold text-[#1D4266] font-[family-name:var(--font-space-grotesk)]">Send Email to Client</h2>

            {/* Client picker */}
            <div>
              <label className="text-sm font-medium text-[#1D4266]/70 block mb-3">Select Client</label>
              {loading ? (
                <div className="text-[#1D4266]/30 text-sm flex items-center gap-2"><Loader2 size={14} className="animate-spin" /> Loading clients...</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                  {clients.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setEmailClient(c)}
                      className={`text-left px-4 py-3 rounded-xl border text-sm transition-all ${
                        emailClient?.id === c.id
                          ? "border-[color:var(--color-teal)] bg-[color:var(--color-teal)]/10 text-[#1D4266]"
                          : "border-[#1D4266]/10 bg-white shadow-sm text-[#1D4266]/60 hover:border-[#1D4266]/30 hover:text-[#1D4266]"
                      }`}
                    >
                      <span className="font-semibold block">{c.company_name}</span>
                      <span className="text-[11px] opacity-60">{c.email}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form onSubmit={handleSendEmail} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-[#1D4266]/70 block mb-2">Subject</label>
                <input required type="text" value={emailSubject} onChange={(e) => setEmailSubject(e.target.value)}
                  placeholder="e.g. Your Q3 Financials are Ready"
                  className="w-full bg-white shadow-sm border border-[#1D4266]/10 rounded-xl px-4 py-2.5 text-sm text-[#1D4266] placeholder-[#1D4266]/30 outline-none focus:border-[color:var(--color-teal)] transition-colors" />
              </div>
              <div>
                <label className="text-sm font-medium text-[#1D4266]/70 block mb-2">Message</label>
                <textarea required value={emailMessage} onChange={(e) => setEmailMessage(e.target.value)}
                  rows={5} placeholder="Type your message here..."
                  className="w-full bg-white shadow-sm border border-[#1D4266]/10 rounded-xl p-4 text-sm text-[#1D4266] placeholder-[#1D4266]/30 focus:border-[color:var(--color-teal)] outline-none resize-none transition-colors" />
              </div>
              <div className="flex items-center justify-between pt-2">
                <AnimatePresence>
                  {emailSuccess && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="flex items-center gap-2 text-green-600 text-sm font-medium">
                      <CheckCircle2 size={16} /> Email sent!
                    </motion.div>
                  )}
                </AnimatePresence>
                <button type="submit" disabled={isSendingEmail || !emailClient}
                  className="ml-auto flex items-center gap-2 px-6 py-2.5 bg-[color:var(--color-teal)] text-[color:var(--color-navy-3)] text-sm font-bold rounded-xl hover:bg-[color:var(--color-teal-2)] disabled:opacity-40 transition-colors">
                  {isSendingEmail ? <><Loader2 size={15} className="animate-spin" /> Sending...</> : <><Send size={15} /> Send Email</>}
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* ── SETTINGS TAB ── */}
        {activeTab === "settings" && (
          <motion.div key="settings" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            className="bg-white shadow-sm border border-[#1D4266]/10 rounded-2xl p-6 space-y-6">
            <h2 className="text-lg font-bold text-[#1D4266] font-[family-name:var(--font-space-grotesk)]">Contact Settings</h2>
            <form onSubmit={handleSaveSettings} className="space-y-5">
              <div>
                <label className="text-sm font-medium text-[#1D4266]/70 flex items-center gap-2 mb-2">
                  <Mail size={14} className="text-[color:var(--color-teal)]" /> Notification Email (Gmail)
                </label>
                <input type="email" required value={notifyEmail} onChange={(e) => setNotifyEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full bg-white shadow-sm border border-[#1D4266]/10 rounded-xl px-4 py-3 text-sm text-[#1D4266] placeholder-[#1D4266]/30 outline-none focus:border-[color:var(--color-teal)] transition-colors" />
                <p className="text-[11px] text-[#1D4266]/35 mt-1.5">Contact form submissions will be sent to this address.</p>
              </div>
              <div>
                <label className="text-sm font-medium text-[#1D4266]/70 flex items-center gap-2 mb-2">
                  <Phone size={14} className="text-[#25D366]" /> WhatsApp Number
                </label>
                <input type="text" value={whatsappNumber} onChange={(e) => setWhatsappNumber(e.target.value)}
                  placeholder="+675 75388212"
                  className="w-full bg-white shadow-sm border border-[#1D4266]/10 rounded-xl px-4 py-3 text-sm text-[#1D4266] placeholder-[#1D4266]/30 outline-none focus:border-[#25D366] transition-colors" />
                <p className="text-[11px] text-[#1D4266]/35 mt-1.5">This number is shown on the website for client inquiries.</p>
              </div>
              <div className="flex items-center justify-between pt-2">
                <AnimatePresence>
                  {settingsSaved && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="flex items-center gap-2 text-green-600 text-sm font-medium">
                      <CheckCircle2 size={16} /> Settings saved!
                    </motion.div>
                  )}
                </AnimatePresence>
                <button type="submit" disabled={isSavingSettings}
                  className="ml-auto flex items-center gap-2 px-6 py-2.5 bg-[color:var(--color-teal)] text-[color:var(--color-navy-3)] text-sm font-bold rounded-xl hover:bg-[color:var(--color-teal-2)] disabled:opacity-40 transition-colors">
                  {isSavingSettings ? <><Loader2 size={15} className="animate-spin" /> Saving...</> : <><Settings size={15} /> Save Settings</>}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
