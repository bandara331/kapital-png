"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Download, CheckCircle, Clock, AlertCircle, MessageSquare, X, Send } from "lucide-react";

type Document = {
  id: string;
  client_id: string;
  file_name: string;
  file_path: string;
  file_size: number;
  status: string;
  created_at: string;
  admin_reply?: string;
  clientName?: string;
};

export function DocumentVault() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [reviewingDoc, setReviewingDoc] = useState<Document | null>(null);
  const [replyText, setReplyText] = useState("");
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      // Fetch documents
      const { data: docsData, error: docsError } = await supabase
        .from("documents")
        .select("*")
        .order("created_at", { ascending: false });

      if (docsError) throw docsError;

      // Fetch clients to match names
      const { data: clientsData } = await supabase.from("clients").select("id, company_name");
      const clientMap = new Map(clientsData?.map(c => [c.id, c.company_name]) || []);

      const enhancedDocs = (docsData || []).map(doc => ({
        ...doc,
        clientName: clientMap.get(doc.client_id) || "Unknown Client"
      }));

      setDocuments(enhancedDocs);
    } catch (err) {
      console.error("Error fetching documents:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("documents")
        .update({ status: newStatus })
        .eq("id", id);
      
      if (error) throw error;
      setDocuments(prev => prev.map(d => d.id === id ? { ...d, status: newStatus } : d));
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const downloadFile = async (path: string, name: string) => {
    try {
      const { data, error } = await supabase.storage.from("client_documents").download(path);
      if (error) throw error;
      
      const url = URL.createObjectURL(data);
      const a = document.createElement("a");
      a.href = url;
      a.download = name;
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error("Download error:", err);
      alert("Error downloading file.");
    }
  };

  const openReviewModal = (doc: Document) => {
    setReviewingDoc(doc);
    setReplyText(doc.admin_reply || "");
  };

  const sendReply = async () => {
    if (!reviewingDoc) return;
    setIsSending(true);
    try {
      const { error } = await supabase
        .from("documents")
        .update({ 
          admin_reply: replyText,
          status: "Processed" // Auto-update status when replied
        })
        .eq("id", reviewingDoc.id);
      
      if (error) throw error;
      
      setDocuments(prev => prev.map(d => 
        d.id === reviewingDoc.id 
          ? { ...d, admin_reply: replyText, status: "Processed" } 
          : d
      ));
      
      setReviewingDoc(null);
    } catch (err) {
      console.error("Error sending reply:", err);
      alert("Failed to send reply");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      <div className="bg-[color:var(--card)] border border-[color:var(--border)] rounded-2xl overflow-hidden relative z-0">
        <div className="p-6 border-b border-[color:var(--border)] bg-white/5 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-[family-name:var(--font-space-grotesk)] font-semibold text-white">Document Vault</h2>
            <p className="text-sm text-white/50 mt-1">Review and process uploaded client documents</p>
          </div>
          <button onClick={fetchDocuments} className="text-xs text-[color:var(--color-teal-2)] hover:underline">
            Refresh
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/20 text-[13px] text-white/40 font-medium border-b border-[color:var(--border)]">
                <th className="px-6 py-4">File Name</th>
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4">Upload Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[color:var(--border)]">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-white/40">Loading documents...</td>
                </tr>
              ) : documents.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-white/40">No documents uploaded yet.</td>
                </tr>
              ) : (
                documents.map((doc, i) => (
                  <motion.tr 
                    key={doc.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="hover:bg-white/5 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                          <FileText size={14} className="text-blue-400" />
                        </div>
                        <div>
                          <span className="font-medium text-[14px] text-white/90">{doc.file_name}</span>
                          <p className="text-xs text-white/40">{(doc.file_size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[13px] text-white/80">{doc.clientName}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-[13px] text-white/60">
                        {new Date(doc.created_at).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {doc.status === "Pending Review" ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-[11px] font-semibold tracking-wide">
                          <Clock size={12} /> Pending
                        </span>
                      ) : doc.status === "Processed" ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-[11px] font-semibold tracking-wide">
                          <CheckCircle size={12} /> Processed
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[11px] font-semibold tracking-wide">
                          <AlertCircle size={12} /> {doc.status}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => downloadFile(doc.file_path, doc.file_name)}
                          className="p-1.5 text-white/40 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                          title="Download File"
                        >
                          <Download size={16} />
                        </button>
                        
                        <button 
                          onClick={() => openReviewModal(doc)}
                          className="px-3 py-1.5 bg-[color:var(--color-teal)]/10 text-[color:var(--color-teal-2)] hover:bg-[color:var(--color-teal)]/20 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5"
                        >
                          <MessageSquare size={14} />
                          Review & Reply
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Modal */}
      <AnimatePresence>
        {reviewingDoc && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-[color:var(--color-navy)] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/10 bg-white/5">
                <h3 className="text-lg font-bold text-white font-[family-name:var(--font-space-grotesk)] flex items-center gap-2">
                  <FileText size={18} className="text-[color:var(--color-teal)]" />
                  Review Document
                </h3>
                <button 
                  onClick={() => setReviewingDoc(null)}
                  className="text-white/40 hover:text-white transition-colors p-1"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="p-4 bg-black/20 rounded-xl border border-white/5">
                  <p className="text-sm text-white/50 mb-1">File from {reviewingDoc.clientName}</p>
                  <p className="font-medium text-white break-all">{reviewingDoc.file_name}</p>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-white/80 block">
                    Message to Client
                  </label>
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="e.g., 'Received! Data has been logged in Xero.' or 'Please re-upload a clearer image.'"
                    className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white placeholder-white/30 focus:border-[color:var(--color-teal)] outline-none resize-none transition-colors"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button 
                    onClick={() => setReviewingDoc(null)}
                    className="px-5 py-2.5 text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={sendReply}
                    disabled={isSending || !replyText.trim()}
                    className="flex items-center gap-2 px-5 py-2.5 bg-[color:var(--color-teal)] text-[color:var(--color-navy-3)] text-sm font-bold rounded-xl hover:bg-[color:var(--color-teal-2)] disabled:opacity-50 transition-colors"
                  >
                    {isSending ? "Sending..." : (
                      <>
                        <Send size={16} />
                        Send Reply
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
