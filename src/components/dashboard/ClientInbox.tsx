"use client";

import { useState, useEffect, useRef } from "react";
import { Send, MessageSquare } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

type Message = {
  id: string;
  content: string;
  is_from_admin: boolean;
  created_at: string;
};

export function ClientInbox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;
    let channel: any;

    const setupInbox = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      if (isMounted) setUserId(user.id);

      // Fetch existing messages
      const { data: existingMessages } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: true });
      
      if (existingMessages && isMounted) {
        setMessages(existingMessages);
      }
      if (isMounted) setLoading(false);
    };

    setupInbox();

    // Setup realtime subscription synchronously so cleanup always catches it
    channel = supabase
      .channel(`client-messages-${Math.random()}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Message]);
        }
      )
      .subscribe();

    return () => {
      isMounted = false;
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !userId) return;

    const content = newMessage.trim();
    setNewMessage(""); // Optimistic UI clear

    // 1. Insert into Supabase
    const { error } = await supabase
      .from("messages")
      .insert({ client_id: userId, content, is_from_admin: false });

    if (error) {
      console.error("Error sending message:", error);
      return;
    }

    // 2. Trigger email notification to Admin
    fetch("/api/notify-admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: content })
    }).catch(console.error);
  };

  if (loading) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[color:var(--color-teal)]"></div>
      </div>
    );
  }

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col h-[400px]">
      <div className="px-6 py-4 border-b border-white/10 flex items-center gap-3">
        <MessageSquare size={18} className="text-[color:var(--color-teal)]" />
        <h2 className="text-white font-[family-name:var(--font-space-grotesk)] font-semibold text-[16px]">Message Your Advisor</h2>
      </div>
      
      {/* Messages List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-white/30 text-[13px] text-center px-4">
            <MessageSquare size={32} className="mb-3 opacity-50" />
            <p>Send a message to your advisor.<br/>They will reply shortly.</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.is_from_admin ? "justify-start" : "justify-end"}`}>
              <div 
                className={`max-w-[80%] px-4 py-2 rounded-2xl text-[14px] ${
                  msg.is_from_admin 
                    ? "bg-white/10 text-white rounded-tl-sm" 
                    : "bg-[color:var(--color-teal)]/20 text-[color:var(--color-teal-2)] rounded-tr-sm border border-[color:var(--color-teal)]/20"
                }`}
              >
                {msg.content}
                <div className={`text-[10px] mt-1 opacity-50 ${msg.is_from_admin ? "text-left" : "text-right"}`}>
                  {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 bg-black/20 border-t border-white/10">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-[14px] text-white outline-none focus:border-[color:var(--color-teal)] transition-colors"
          />
          <button 
            type="submit"
            disabled={!newMessage.trim()}
            className="w-10 h-10 rounded-xl bg-[color:var(--color-teal)] text-[color:var(--color-navy)] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[color:var(--color-teal-2)] transition-colors shrink-0"
          >
            <Send size={16} className="-ml-0.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
