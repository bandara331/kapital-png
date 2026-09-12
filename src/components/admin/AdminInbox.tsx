"use client";

import { useState, useEffect, useRef } from "react";
import { MessageSquare, Send, User } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

type Message = {
  id: string;
  client_id: string;
  content: string;
  is_from_admin: boolean;
  created_at: string;
};

type ClientMap = {
  [key: string]: { company_name: string; email: string };
};

export function AdminInbox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [clients, setClients] = useState<ClientMap>({});
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;
    let channel: any;

    const setupInbox = async () => {
      // Fetch clients for mapping
      const { data: clientsData } = await supabase.from("clients").select("id, company_name, email");
      if (clientsData && isMounted) {
        const cMap: ClientMap = {};
        clientsData.forEach((c: any) => { cMap[c.id] = c; });
        setClients(cMap);
      }

      // Fetch all messages
      const { data: existingMessages } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: true });
      
      if (existingMessages && isMounted) {
        setMessages(existingMessages);
      }
    };

    setupInbox();

    // Subscribe to real-time messages synchronously
    channel = supabase
      .channel(`admin-messages-${Math.random()}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload: any) => {
          setMessages((prev) => [...prev, payload.new as Message]);
        }
      )
      .subscribe();

    return () => {
      isMounted = false;
      if (channel) supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, selectedClient]);

  // Group messages by client
  const clientIdsWithMessages = Array.from(new Set(messages.map(m => m.client_id)));

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedClient) return;

    const content = newMessage.trim();
    setNewMessage("");

    const { error } = await supabase
      .from("messages")
      .insert({ client_id: selectedClient, content, is_from_admin: true });

    if (error) console.error("Error sending message:", error);
  };

  const currentMessages = messages.filter(m => m.client_id === selectedClient);

  return (
    <div className="bg-[color:var(--card)] border border-[color:var(--border)] rounded-2xl overflow-hidden flex h-[500px]">
      
      {/* Sidebar: Client List */}
      <div className="w-1/3 border-r border-[color:var(--border)] flex flex-col bg-white/5">
        <div className="p-4 border-b border-[color:var(--border)]">
          <h3 className="font-semibold text-white font-[family-name:var(--font-space-grotesk)] flex items-center gap-2">
            <MessageSquare size={16} className="text-[color:var(--color-teal)]" />
            Client Inbox
          </h3>
        </div>
        <div className="flex-1 overflow-y-auto">
          {clientIdsWithMessages.length === 0 ? (
            <div className="p-4 text-white/40 text-[13px] text-center">No messages yet.</div>
          ) : (
            clientIdsWithMessages.map(cid => {
              const c = clients[cid];
              const lastMessage = messages.filter(m => m.client_id === cid).pop();
              return (
                <button
                  key={cid}
                  onClick={() => setSelectedClient(cid)}
                  className={`w-full text-left p-4 border-b border-[color:var(--border)] hover:bg-white/5 transition-colors ${selectedClient === cid ? 'bg-white/10' : ''}`}
                >
                  <div className="font-medium text-[14px] text-white truncate">{c?.company_name || 'Unknown Client'}</div>
                  <div className="text-[12px] text-white/50 truncate mt-1">
                    {lastMessage?.is_from_admin ? 'You: ' : ''}{lastMessage?.content}
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Main: Chat View */}
      <div className="flex-1 flex flex-col relative bg-black/10">
        {!selectedClient ? (
          <div className="flex-1 flex items-center justify-center text-white/30 text-[14px]">
            Select a client to view messages
          </div>
        ) : (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-[color:var(--border)] bg-white/5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[color:var(--color-teal)]/20 flex items-center justify-center">
                <User size={14} className="text-[color:var(--color-teal)]" />
              </div>
              <div>
                <div className="font-medium text-[14px] text-white">{clients[selectedClient]?.company_name || 'Unknown'}</div>
                <div className="text-[11px] text-white/40">{clients[selectedClient]?.email}</div>
              </div>
            </div>
            
            {/* Chat History */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {currentMessages.map(msg => (
                <div key={msg.id} className={`flex ${msg.is_from_admin ? "justify-end" : "justify-start"}`}>
                  <div 
                    className={`max-w-[80%] px-4 py-2 rounded-2xl text-[14px] ${
                      msg.is_from_admin 
                        ? "bg-[color:var(--color-teal)]/20 text-[color:var(--color-teal-2)] rounded-tr-sm border border-[color:var(--color-teal)]/20" 
                        : "bg-white/10 text-white rounded-tl-sm"
                    }`}
                  >
                    {msg.content}
                    <div className={`text-[10px] mt-1 opacity-50 ${msg.is_from_admin ? "text-right" : "text-left"}`}>
                      {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <div className="p-4 bg-black/20 border-t border-[color:var(--border)]">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Reply to client..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-[14px] text-white outline-none focus:border-[color:var(--color-teal)]"
                />
                <button 
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="w-10 h-10 rounded-xl bg-[color:var(--color-teal)] text-[color:var(--color-navy)] flex items-center justify-center disabled:opacity-50 hover:bg-[color:var(--color-teal-2)] shrink-0"
                >
                  <Send size={16} className="-ml-0.5" />
                </button>
              </form>
            </div>
          </>
        )}
      </div>

    </div>
  );
}
