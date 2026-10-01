"use client";

import { X, Phone, Video, MessageCircle, Send } from "lucide-react";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

export function BookingModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isSent, setIsSent] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      onClose();
    }, 2500);
  };

  if (!isOpen || !mounted) return null;

  const modal = (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        backgroundColor: "rgba(0,0,0,0.6)",
      }}
    >
      {/* Click-away area */}
      <div
        onClick={onClose}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      />

      {/* Modal card */}
      <div
        style={{
          position: "relative",
          zIndex: 1000000,
          width: "100%",
          maxWidth: "500px",
          backgroundColor: "#ffffff",
          borderRadius: "20px",
          boxShadow: "0 30px 80px rgba(0,0,0,0.35)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          maxHeight: "90vh",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "linear-gradient(135deg, #1D4266 0%, #1a3a5c 100%)",
            padding: "22px 24px",
            color: "#ffffff",
            position: "relative",
            flexShrink: 0,
          }}
        >
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "14px",
              right: "14px",
              background: "rgba(255,255,255,0.15)",
              border: "none",
              borderRadius: "50%",
              width: "34px",
              height: "34px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#ffffff",
            }}
          >
            <X size={18} />
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                background: "rgba(62,205,176,0.25)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <MessageCircle size={24} color="#3ECDB0" />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: "20px", fontWeight: 700, color: "#ffffff" }}>
                Get started for free
              </h2>
              <p style={{ margin: "3px 0 0", fontSize: "13px", color: "rgba(255,255,255,0.7)" }}>
                Choose how you&apos;d like to connect with us.
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: "22px 24px", overflowY: "auto" }}>

          {/* Quick-contact cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "20px" }}>

            <a
              href="https://wa.me/67575388212"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "14px",
                border: "2px solid #e5e7eb",
                borderRadius: "12px",
                backgroundColor: "#f9fafb",
                textDecoration: "none",
                color: "inherit",
                cursor: "pointer",
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "#25D366")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "#e5e7eb")}
            >
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  background: "#e8fdf3",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Phone size={18} color="#25D366" />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: "13px", color: "#1e293b" }}>WhatsApp</div>
                <div style={{ fontSize: "11px", color: "#64748b" }}>Fastest reply</div>
              </div>
            </a>

            <a
              href="mailto:daskapitalltd@gmail.com?subject=Book%20a%20Meeting"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "14px",
                border: "2px solid #e5e7eb",
                borderRadius: "12px",
                backgroundColor: "#f9fafb",
                textDecoration: "none",
                color: "inherit",
                cursor: "pointer",
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "#4285F4")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "#e5e7eb")}
            >
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  background: "#eef3ff",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Video size={18} color="#4285F4" />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: "13px", color: "#1e293b" }}>Book Meeting</div>
                <div style={{ fontSize: "11px", color: "#64748b" }}>Google Meet / Teams</div>
              </div>
            </a>
          </div>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px" }}>
            <div style={{ flex: 1, height: "1px", background: "#e5e7eb" }} />
            <span style={{ fontSize: "12px", color: "#9ca3af", whiteSpace: "nowrap" }}>Or send us a message</span>
            <div style={{ flex: 1, height: "1px", background: "#e5e7eb" }} />
          </div>

          {/* Form / Success */}
          {isSent ? (
            <div
              style={{
                textAlign: "center",
                padding: "28px 16px",
                background: "#f0fdf4",
                borderRadius: "14px",
                border: "1px solid #bbf7d0",
              }}
            >
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  background: "#dcfce7",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 10px",
                }}
              >
                <Send size={22} color="#16a34a" />
              </div>
              <div style={{ fontWeight: 700, fontSize: "16px", color: "#15803d" }}>Message sent!</div>
              <div style={{ fontSize: "13px", color: "#86efac", marginTop: "4px" }}>
                We&apos;ll get back to you shortly.
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#374151", marginBottom: "5px" }}>
                    Name
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Your name"
                    style={{
                      width: "100%",
                      padding: "9px 13px",
                      border: "2px solid #e5e7eb",
                      borderRadius: "9px",
                      fontSize: "13px",
                      outline: "none",
                      boxSizing: "border-box",
                      fontFamily: "inherit",
                    }}
                    onFocus={e => (e.currentTarget.style.borderColor = "#3ECDB0")}
                    onBlur={e => (e.currentTarget.style.borderColor = "#e5e7eb")}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#374151", marginBottom: "5px" }}>
                    Email / Phone
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Contact details"
                    style={{
                      width: "100%",
                      padding: "9px 13px",
                      border: "2px solid #e5e7eb",
                      borderRadius: "9px",
                      fontSize: "13px",
                      outline: "none",
                      boxSizing: "border-box",
                      fontFamily: "inherit",
                    }}
                    onFocus={e => (e.currentTarget.style.borderColor = "#3ECDB0")}
                    onBlur={e => (e.currentTarget.style.borderColor = "#e5e7eb")}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#374151", marginBottom: "5px" }}>
                  Message
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="How can we help you?"
                  style={{
                    width: "100%",
                    padding: "9px 13px",
                    border: "2px solid #e5e7eb",
                    borderRadius: "9px",
                    fontSize: "13px",
                    outline: "none",
                    resize: "none",
                    boxSizing: "border-box",
                    fontFamily: "inherit",
                  }}
                  onFocus={e => (e.currentTarget.style.borderColor = "#3ECDB0")}
                  onBlur={e => (e.currentTarget.style.borderColor = "#e5e7eb")}
                />
              </div>

              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "12px",
                  backgroundColor: "#3ECDB0",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "10px",
                  fontSize: "14px",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  fontFamily: "inherit",
                }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#2FBEA1")}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#3ECDB0")}
              >
                <Send size={16} />
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );

  // Render into document.body to escape any parent stacking context
  return createPortal(modal, document.body);
}
