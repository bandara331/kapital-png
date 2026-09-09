"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Settings, Save, CheckCircle2, Loader2, AlertCircle } from "lucide-react";

export function AdminSettings() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    async function fetchSettings() {
      const { data, error } = await supabase
        .from("admin_settings")
        .select("admin_email")
        .eq("id", 1)
        .single();
        
      if (data && !error) {
        setEmail(data.admin_email);
      }
      setIsLoading(false);
    }
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    const { error } = await supabase
      .from("admin_settings")
      .update({ admin_email: email, updated_at: new Date().toISOString() })
      .eq("id", 1);

    if (error) {
      console.error(error);
      setMessage({ type: 'error', text: "Failed to update email. Make sure you have admin rights." });
    } else {
      setMessage({ type: 'success', text: "Admin notification email updated successfully!" });
      setTimeout(() => setMessage(null), 3000);
    }
    
    setIsSaving(false);
  };

  return (
    <div className="bg-[color:var(--card)] border border-[color:var(--border)] rounded-2xl p-6 relative overflow-hidden">
      
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-[color:var(--color-teal)]/10 flex items-center justify-center border border-[color:var(--color-teal)]/20">
          <Settings size={20} className="text-[color:var(--color-teal)]" />
        </div>
        <div>
          <h2 className="text-lg font-[family-name:var(--font-space-grotesk)] font-semibold text-white">System Settings</h2>
          <p className="text-sm text-white/50">Manage global platform configurations</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="max-w-md space-y-4">
        <div>
          <label className="block text-[13px] font-medium text-white/80 mb-2">
            Notification Email Address
          </label>
          <div className="text-[12px] text-white/40 mb-3">
            This email will receive real-time alerts when clients send you a message or upload documents.
          </div>
          
          <div className="relative">
            <input
              type="email"
              required
              disabled={isLoading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              className="w-full bg-black/20 border border-[color:var(--border)] rounded-xl px-4 py-2.5 text-[14px] text-white outline-none focus:border-[color:var(--color-teal)] transition-colors disabled:opacity-50"
            />
          </div>
        </div>

        {message && (
          <div className={`p-3 rounded-lg text-[13px] flex items-center gap-2 ${message.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
            {message.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            {message.text}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading || isSaving}
          className="flex items-center gap-2 bg-[color:var(--color-teal)] text-[color:var(--color-navy)] px-5 py-2.5 rounded-xl font-medium text-[14px] hover:bg-[color:var(--color-teal-2)] transition-colors disabled:opacity-50"
        >
          {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          Save Changes
        </button>
      </form>
    </div>
  );
}
