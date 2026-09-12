"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { UploadCloud, File, X, CheckCircle2, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

type UploadedFile = {
  name: string;
  size: string;
  status: "uploading" | "done" | "error";
  errorMsg?: string;
  id?: string;
  admin_reply?: string;
};

export default function UploadPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }: any) => {
      if (session?.user) {
        setUserId(session.user.id);
        fetchExistingDocuments(session.user.id);
      }
    });
  }, []);

  const fetchExistingDocuments = async (clientId: string) => {
    const { data, error } = await supabase
      .from("documents")
      .select("*")
      .eq("client_id", clientId)
      .order("created_at", { ascending: false });

    if (!error && data) {
      const existingFiles = data.map((doc: any) => ({
        id: doc.id,
        name: doc.file_name,
        size: (doc.file_size / 1024 / 1024).toFixed(2) + " MB",
        status: "done" as const,
      }));
      setFiles(existingFiles);
    }
  };

  const processUpload = async (file: File) => {
    if (!userId) return;
    
    const fileIndex = files.length;
    const sizeStr = (file.size / 1024 / 1024).toFixed(2) + " MB";
    
    // Add to UI as uploading
    setFiles((prev) => [...prev, { name: file.name, size: sizeStr, status: "uploading" }]);

    try {
      const fileExt = file.name.split(".").pop();
      const filePath = `${userId}/${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;

      // 1. Upload to Storage
      const { error: uploadError } = await supabase.storage
        .from("client_documents")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. Add to Database
      const { data: dbData, error: dbError } = await supabase
        .from("documents")
        .insert([
          {
            client_id: userId,
            file_name: file.name,
            file_path: filePath,
            file_type: file.type,
            file_size: file.size,
          }
        ])
        .select()
        .single();

      if (dbError) throw dbError;

      // Update UI to done
      setFiles((prev) =>
        prev.map((f) =>
          f.name === file.name && f.status === "uploading"
            ? { ...f, status: "done", id: dbData.id }
            : f
        )
      );
    } catch (err: any) {
      console.error("Upload error:", err);
      // Update UI to error
      setFiles((prev) =>
        prev.map((f) =>
          f.name === file.name && f.status === "uploading"
            ? { ...f, status: "error", errorMsg: err.message || "Upload failed" }
            : f
        )
      );
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    for (const file of Array.from(e.dataTransfer.files)) {
      await processUpload(file);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    for (const file of Array.from(e.target.files)) {
      await processUpload(file);
    }
    // Reset input
    e.target.value = "";
  };

  const removeFile = (index: number) => {
    // We only remove it from the UI for now to prevent accidental DB deletion. 
    // True deletion could be added later.
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8">
      <header className="mb-8">
        <h1 className="text-white font-[family-name:var(--font-space-grotesk)] font-bold text-[24px]">Upload Documents</h1>
        <p className="text-white/40 text-[14px] mt-1">Upload receipts, bank statements, or any other financial documents for our team to review.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8">
        <div className="space-y-6">
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-12 transition-all duration-300 ${
              isDragging
                ? "border-[color:var(--color-teal)] bg-[color:var(--color-teal)]/5 scale-[1.02]"
                : "border-white/10 hover:border-white/20 bg-white/5"
            }`}
          >
            <div className="w-16 h-16 rounded-full bg-[color:var(--color-teal)]/10 flex items-center justify-center mb-6">
              <UploadCloud size={32} className="text-[color:var(--color-teal-2)]" />
            </div>
            <h3 className="text-white font-medium text-[18px] mb-2">Drag & Drop files here</h3>
            <p className="text-white/40 text-[14px] text-center mb-6 max-w-sm">
              We accept PDF, JPG, PNG, and CSV files up to 20MB in size.
            </p>
            <label className="cursor-pointer bg-[color:var(--color-teal)] text-[color:var(--color-navy-3)] font-semibold font-[family-name:var(--font-space-grotesk)] px-6 py-3 rounded-full hover:bg-[color:var(--color-teal-2)] transition-colors">
              Browse Files
              <input type="file" multiple className="hidden" onChange={handleFileChange} />
            </label>
          </div>

          {files.length > 0 && (
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-white/10">
                <h3 className="text-white font-medium">Uploaded Files</h3>
              </div>
              <div className="divide-y divide-white/5">
                {files.map((file, i) => (
                  <motion.div 
                    key={file.id || i}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="flex flex-col"
                  >
                    <div className="px-6 py-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-lg border flex items-center justify-center ${
                          file.status === "error" ? "bg-red-500/10 border-red-500/20" : "bg-blue-500/10 border-blue-500/20"
                        }`}>
                          <File size={18} className={file.status === "error" ? "text-red-400" : "text-blue-400"} />
                        </div>
                        <div>
                          <p className="text-white text-[14px] font-medium">{file.name}</p>
                          <p className={`text-[12px] ${file.status === "error" ? "text-red-400" : "text-white/40"}`}>
                            {file.status === "error" ? file.errorMsg : file.size}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        {file.status === "uploading" ? (
                          <span className="text-[12px] text-white/50 italic animate-pulse">Uploading...</span>
                        ) : file.status === "error" ? (
                          <span className="flex items-center gap-1 text-[12px] text-red-400 bg-red-400/10 px-2 py-1 rounded-full">
                            <AlertCircle size={14} /> Failed
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-[12px] text-[color:var(--color-teal-2)] bg-[color:var(--color-teal)]/10 px-2 py-1 rounded-full">
                            <CheckCircle2 size={14} /> Saved
                          </span>
                        )}
                        <button onClick={() => removeFile(i)} className="text-white/40 hover:text-white p-1 transition-colors">
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                    
                    {/* Admin Reply Section */}
                    {file.admin_reply && (
                      <div className="px-6 pb-4 pt-1">
                        <div className="bg-[color:var(--color-teal)]/10 border border-[color:var(--color-teal)]/20 rounded-xl p-4 flex gap-3 items-start">
                          <div className="w-6 h-6 rounded-full bg-[color:var(--color-teal)]/20 flex items-center justify-center shrink-0 mt-0.5">
                            <span className="text-[10px] font-bold text-[color:var(--color-teal-2)]">ADMIN</span>
                          </div>
                          <div>
                            <p className="text-[13px] text-[color:var(--color-teal-2)] font-medium mb-1">Reply from Kapital PNG</p>
                            <p className="text-[13px] text-white/80">{file.admin_reply}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-fit">
          <h3 className="text-white font-[family-name:var(--font-space-grotesk)] font-semibold text-[16px] mb-4">Guidelines</h3>
          <ul className="space-y-4 text-[13px] text-white/60">
            <li className="flex gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[color:var(--color-gold)] mt-1.5 shrink-0" />
              <p>Please ensure receipts are clearly legible and not blurry.</p>
            </li>
            <li className="flex gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[color:var(--color-gold)] mt-1.5 shrink-0" />
              <p>For bank statements, CSV exports are preferred over PDFs if possible.</p>
            </li>
            <li className="flex gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[color:var(--color-gold)] mt-1.5 shrink-0" />
              <p>Our team reviews new uploads every Tuesday and Thursday.</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
