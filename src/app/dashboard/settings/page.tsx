"use client";

import { User, Lock, Bell, CheckCircle2, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"profile" | "security" | "notifications">("profile");
  const [saved, setSaved] = useState(false);
  
  // State for user data
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function loadData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        setEmail(user.email || "");
        
        const { data: clientData } = await supabase
          .from("clients")
          .select("company_name, email")
          .eq("user_id", user.id)
          .single();
          
        if (clientData) {
          setCompanyName(clientData.company_name || "");
        }
      }
      setIsLoading(false);
    }
    loadData();
  }, []);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Update company name in DB
    if (userId) {
      await supabase
        .from("clients")
        .update({ company_name: companyName })
        .eq("user_id", userId);
    }
    
    setIsSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8">
      <header className="mb-8">
        <h1 className="text-white font-[family-name:var(--font-space-grotesk)] font-bold text-[24px]">Settings</h1>
        <p className="text-white/40 text-[14px] mt-1">Manage your account preferences and security.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
        {/* Settings Nav */}
        <nav className="flex flex-col gap-2">
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-medium transition-colors ${
              activeTab === "profile" ? "bg-[color:var(--color-teal)]/15 text-[color:var(--color-teal-2)]" : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            <User size={18} />
            Profile Details
          </button>
          <button
            onClick={() => setActiveTab("security")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-medium transition-colors ${
              activeTab === "security" ? "bg-[color:var(--color-teal)]/15 text-[color:var(--color-teal-2)]" : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            <Lock size={18} />
            Password & Security
          </button>
          <button
            onClick={() => setActiveTab("notifications")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-medium transition-colors ${
              activeTab === "notifications" ? "bg-[color:var(--color-teal)]/15 text-[color:var(--color-teal-2)]" : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            <Bell size={18} />
            Notifications
          </button>
        </nav>

        {/* Settings Content */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
          {saved && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 bg-[color:var(--color-teal)]/10 border border-[color:var(--color-teal)]/20 text-[color:var(--color-teal-2)] px-4 py-3 rounded-xl flex items-center gap-3 text-[14px]"
            >
              <CheckCircle2 size={18} />
              Settings saved successfully.
            </motion.div>
          )}

          {activeTab === "profile" && (
            <form onSubmit={handleSaveProfile} className="space-y-6 max-w-lg">
              <h2 className="text-white font-[family-name:var(--font-space-grotesk)] font-semibold text-[18px] border-b border-white/10 pb-4 mb-6">Profile Details</h2>
              
              <div className="flex flex-col gap-2">
                <label className="text-[13px] text-white/70">Full Name</label>
                <input 
                  type="text" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name" 
                  className="bg-black/20 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[color:var(--color-teal)]" 
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[13px] text-white/70">Email Address</label>
                <input 
                  type="email" 
                  value={email}
                  disabled
                  className="bg-black/20 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/50 cursor-not-allowed focus:outline-none" 
                />
                <p className="text-[11px] text-white/40">Email address cannot be changed.</p>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[13px] text-white/70">Company Name</label>
                <input 
                  type="text" 
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Enter your company name" 
                  className="bg-black/20 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[color:var(--color-teal)]" 
                />
              </div>

              <button 
                type="submit" 
                disabled={isSaving || isLoading}
                className="bg-[color:var(--color-teal)] text-[color:var(--color-navy-3)] font-semibold px-6 py-2.5 rounded-full hover:bg-[color:var(--color-teal-2)] transition-colors text-[14px] flex items-center gap-2"
              >
                {isSaving ? <Loader2 size={16} className="animate-spin" /> : null}
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </form>
          )}

          {activeTab === "security" && (
            <form onSubmit={handleSaveGeneral} className="space-y-6 max-w-lg">
              <h2 className="text-white font-[family-name:var(--font-space-grotesk)] font-semibold text-[18px] border-b border-white/10 pb-4 mb-6">Password & Security</h2>
              
              <div className="flex flex-col gap-2">
                <label className="text-[13px] text-white/70">Current Password</label>
                <input type="password" placeholder="••••••••" className="bg-black/20 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[color:var(--color-teal)]" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[13px] text-white/70">New Password</label>
                <input type="password" placeholder="••••••••" className="bg-black/20 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[color:var(--color-teal)]" />
              </div>

              <button type="submit" className="bg-[color:var(--color-teal)] text-[color:var(--color-navy-3)] font-semibold px-6 py-2.5 rounded-full hover:bg-[color:var(--color-teal-2)] transition-colors text-[14px]">
                Update Password
              </button>
            </form>
          )}

          {activeTab === "notifications" && (
            <form onSubmit={handleSaveGeneral} className="space-y-6 max-w-lg">
              <h2 className="text-white font-[family-name:var(--font-space-grotesk)] font-semibold text-[18px] border-b border-white/10 pb-4 mb-6">Email Notifications</h2>
              
              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-white/20 bg-black/20 text-[color:var(--color-teal)] focus:ring-[color:var(--color-teal)] focus:ring-offset-0 focus:ring-offset-transparent" />
                  <div>
                    <p className="text-[14px] text-white group-hover:text-white transition-colors">New Reports</p>
                    <p className="text-[12px] text-white/40">Get notified when a new financial report is uploaded.</p>
                  </div>
                </label>

                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-white/20 bg-black/20 text-[color:var(--color-teal)] focus:ring-[color:var(--color-teal)] focus:ring-offset-0 focus:ring-offset-transparent" />
                  <div>
                    <p className="text-[14px] text-white group-hover:text-white transition-colors">Tax Reminders</p>
                    <p className="text-[12px] text-white/40">Important dates for GST and other tax filings.</p>
                  </div>
                </label>
              </div>

              <button type="submit" className="bg-[color:var(--color-teal)] text-[color:var(--color-navy-3)] font-semibold px-6 py-2.5 rounded-full hover:bg-[color:var(--color-teal-2)] transition-colors text-[14px]">
                Save Preferences
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
