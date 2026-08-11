"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User } from "lucide-react";

type Message = {
  id: string;
  sender: "user" | "bot";
  text: string;
};

// Shape expected by the API: { role, content }
type ApiMessage = {
  role: "user" | "assistant";
  content: string;
};

export function AiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", sender: "bot", text: "Hi! I'm Kapital AI, your bookkeeping assistant. Ask me anything about PNG GST taxes, Xero integrations, or accounting automation." }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const buildApiHistory = (msgs: Message[]): ApiMessage[] => {
    return msgs
      .filter((m) => m.id !== "1") // skip initial greeting
      .map((m) => ({
        role: m.sender === "user" ? "user" : "assistant",
        content: m.text,
      }));
  };

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue.trim();
    const userMsg: Message = { id: Date.now().toString(), sender: "user", text: userText };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputValue("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: buildApiHistory(updatedMessages) }),
      });

      const data = await res.json();
      const botText = data.reply ?? "Sorry, I couldn't get a response. Please try again.";

      setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), sender: "bot", text: botText }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), sender: "bot", text: "Connection error. Please check your internet and try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200, damping: 20 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[color:var(--color-teal)] text-[color:var(--color-navy-3)] shadow-[0_8px_24px_rgba(47,174,147,0.4)] flex items-center justify-center transition-transform hover:scale-110 ${isOpen ? "hidden" : "flex"}`}
        aria-label="Open AI Chat"
      >
        <MessageSquare size={24} className="fill-[color:var(--color-navy-3)]" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[350px] sm:w-[380px] h-[520px] max-h-[80vh] flex flex-col bg-[rgba(255,255,255,0.97)] dark:bg-[rgba(15,44,72,0.97)] backdrop-blur-xl border border-[color:var(--color-line)] dark:border-[color:var(--color-line-dark)] rounded-[20px] shadow-[0_20px_60px_rgba(0,0,0,0.15)] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 bg-[color:var(--color-navy)] text-white shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[color:var(--color-teal)] flex items-center justify-center">
                  <Bot size={18} className="text-[color:var(--color-navy-3)]" />
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-space-grotesk)] font-semibold text-[15px] leading-tight">Kapital AI</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--color-teal-2)] animate-pulse" />
                    <p className="text-[11px] text-white/60">Powered by Groq · Llama 3</p>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white transition-colors p-1">
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${msg.sender === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center mt-1 ${msg.sender === "user" ? "bg-[color:var(--color-slate)]" : "bg-[color:var(--color-teal-2)]"}`}>
                    {msg.sender === "user" ? <User size={14} className="text-white" /> : <Bot size={14} className="text-[color:var(--color-navy-3)]" />}
                  </div>
                  <div className={`max-w-[78%] rounded-[14px] p-3 text-[14px] leading-[1.55] ${
                    msg.sender === "user"
                      ? "bg-[color:var(--color-navy)] text-white rounded-tr-sm"
                      : "bg-[color:var(--color-paper)] dark:bg-white/10 text-[color:var(--foreground)] rounded-tl-sm"
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator while waiting for Groq */}
              {isLoading && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-3">
                  <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center mt-1 bg-[color:var(--color-teal-2)]">
                    <Bot size={14} className="text-[color:var(--color-navy-3)]" />
                  </div>
                  <div className="bg-[color:var(--color-paper)] dark:bg-white/10 rounded-[14px] rounded-tl-sm p-3 flex gap-1 items-center h-[42px]">
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-1.5 h-1.5 bg-[color:var(--muted)] rounded-full" />
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-1.5 h-1.5 bg-[color:var(--muted)] rounded-full" />
                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-1.5 h-1.5 bg-[color:var(--muted)] rounded-full" />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-[color:var(--color-line)] dark:border-[color:var(--color-line-dark)] bg-white dark:bg-transparent shrink-0">
              <div className="relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about GST, Xero, automation..."
                  disabled={isLoading}
                  className="w-full bg-[color:var(--color-paper)] dark:bg-white/5 border border-transparent dark:border-white/10 rounded-full pl-4 pr-12 py-3 text-[14px] text-[color:var(--foreground)] focus:outline-none focus:border-[color:var(--color-teal)] transition-colors disabled:opacity-60"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full text-[color:var(--color-teal)] disabled:opacity-40 hover:bg-[color:var(--color-teal)] hover:text-[color:var(--color-navy-3)] transition-colors"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
