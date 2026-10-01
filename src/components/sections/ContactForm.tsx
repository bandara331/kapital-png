"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Loader2, Mail, MapPin, Phone, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

const revealVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } }
};

export function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", company: "", message: "" });
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [session, setSession] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    supabase.auth.getSession().then(({ data: { session } }: any) => setSession(session));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e: any, s: any) => setSession(s));
    return () => { subscription.unsubscribe(); };
  }, []);

  // Don't render anything until auth state is known, and hide entirely from visitors
  if (!mounted || !session) return null;

  const validate = () => {
    let isValid = true;
    const newErrors = { name: "", email: "", message: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    if (!session) {
      setAuthError("You must log in first to send a message.");
      return;
    }

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to send message");
      }

      setIsSuccess(true);
      setFormData({ name: "", email: "", company: "", message: "" });
      
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err: unknown) {
      console.error(err);
      // Optional: set a general error state to show the user
      const errorMessage = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-14 bg-[#F0F5F9] relative overflow-hidden">
      {/* Background styling */}
      <svg className="absolute inset-0 opacity-[0.06] pointer-events-none w-full h-full object-cover" viewBox="0 0 1200 500" preserveAspectRatio="none">
        <path d="M-50,120 C200,60 350,180 600,110 C850,40 1000,150 1250,90" stroke="#3ECDB0" strokeWidth="1" fill="none"/>
        <path d="M-50,280 C240,230 400,330 640,270 C880,200 1020,300 1250,250" stroke="#3ECDB0" strokeWidth="1" fill="none"/>
      </svg>
      
      <div className="wrap relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-[48px] items-start">
        
        {/* Left Side: Info */}
        <motion.div 
          variants={revealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          <p className="flex items-center gap-[10px] font-mono text-[12.5px] tracking-[0.14em] uppercase text-[#3ECDB0] mb-[18px] before:content-[''] before:w-[22px] before:h-[1px] before:bg-[#3ECDB0] before:inline-block">
            Get In Touch
          </p>
          <h2 className="text-[clamp(28px,3.4vw,40px)] leading-[1.12] font-semibold font-[family-name:var(--font-space-grotesk)] text-[#1D4266] mb-[24px]">
            Ready to upgrade your bookkeeping?
          </h2>
          <p className="text-[#5A7A9C] text-[16px] mb-[40px] max-w-[420px]">
            Leave us a message, and our team in Port Moresby will get back to you within 24 hours.
          </p>

          <div className="space-y-[24px]">
            <div className="flex items-start gap-[16px]">
              <div className="w-[42px] h-[42px] rounded-full bg-[#3ECDB0]/10 border border-[#3ECDB0]/20 flex items-center justify-center flex-shrink-0">
                <MapPin size={20} className="text-[color:var(--color-teal-2)]" />
              </div>
              <div>
                <h4 className="font-[family-name:var(--font-space-grotesk)] font-semibold text-[16px] text-[#1D4266] mb-[4px]">Location</h4>
                <p className="text-[#5A7A9C] text-[14px] leading-relaxed">
                  A trading division of Das Kapital Limited<br />
                  P.O. Box 414, Vision City<br />
                  Waigani, Port Moresby, PNG
                </p>
              </div>
            </div>

            <div className="flex items-start gap-[16px]">
              <div className="w-[42px] h-[42px] rounded-full bg-[#3ECDB0]/10 border border-[#3ECDB0]/20 flex items-center justify-center flex-shrink-0">
                <Mail size={20} className="text-[#3ECDB0]" />
              </div>
              <div>
                <h4 className="font-[family-name:var(--font-space-grotesk)] font-semibold text-[16px] text-[#1D4266] mb-[4px]">Email</h4>
                <a href="mailto:daskapitalltd@gmail.com" className="text-[#5A7A9C] text-[14px] hover:text-[#3ECDB0] transition-colors">daskapitalltd@gmail.com</a>
              </div>
            </div>

            <div className="flex items-start gap-[16px]">
              <div className="w-[42px] h-[42px] rounded-full bg-[#3ECDB0]/10 border border-[#3ECDB0]/20 flex items-center justify-center flex-shrink-0">
                <Phone size={20} className="text-[#3ECDB0]" />
              </div>
              <div>
                <h4 className="font-[family-name:var(--font-space-grotesk)] font-semibold text-[16px] text-[#1D4266] mb-[4px]">Phone</h4>
                <div className="text-[#5A7A9C] text-[14px] flex flex-col gap-1">
                  <a href="tel:+67581504134" className="hover:text-[#3ECDB0] transition-colors">+675 8150 4134</a>
                  <a href="https://wa.me/67575388212" target="_blank" rel="noopener noreferrer" className="hover:text-[#3ECDB0] transition-colors flex items-center gap-1.5">
                    +675 75388212 <span className="text-[11px] bg-[#25D366]/20 text-[#25D366] px-1.5 py-0.5 rounded-full font-mono">WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Form */}
        <motion.div 
          variants={revealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="bg-white border border-[#D9E4EE] rounded-[24px] p-[32px] md:p-[40px] relative overflow-hidden shadow-sm"
        >
          {isSuccess ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 bg-white flex flex-col items-center justify-center p-[40px] text-center z-20"
            >
              <div className="w-[64px] h-[64px] rounded-full bg-[#3ECDB0]/15 flex items-center justify-center mb-[24px]">
                <CheckCircle2 size={32} className="text-[#3ECDB0]" />
              </div>
              <h3 className="font-[family-name:var(--font-space-grotesk)] font-semibold text-[24px] text-[#1D4266] mb-[12px]">Message Sent Successfully</h3>
              <p className="text-[#5A7A9C] text-[15px]">
                Thank you for reaching out. A member of the Kapital PNG team will be in touch shortly.
              </p>
            </motion.div>
          ) : null}

          {authError && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3">
              <AlertCircle size={20} className="text-red-400 shrink-0 mt-0.5" />
              <p className="text-[14px] text-red-200">{authError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-[20px] relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px]">
              <div className="flex flex-col gap-[6px]">
                <label htmlFor="name" className="text-[13px] font-medium text-[#1D4266]">Full Name</label>
                <input 
                  type="text" 
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className={`bg-[#F8F9FA] border ${errors.name ? 'border-red-400' : 'border-[#D9E4EE] focus:border-[#3ECDB0]'} rounded-[12px] px-[16px] py-[12px] text-[14px] text-[#1D4266] outline-none transition-colors`}
                  placeholder="John Doe"
                />
                {errors.name && <span className="text-red-500 text-[12px]">{errors.name}</span>}
              </div>
              <div className="flex flex-col gap-[6px]">
                <label htmlFor="email" className="text-[13px] font-medium text-[#1D4266]">Email Address</label>
                <input 
                  type="email" 
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className={`bg-[#F8F9FA] border ${errors.email ? 'border-red-400' : 'border-[#D9E4EE] focus:border-[#3ECDB0]'} rounded-[12px] px-[16px] py-[12px] text-[14px] text-[#1D4266] outline-none transition-colors`}
                  placeholder="john@example.com"
                />
                {errors.email && <span className="text-red-500 text-[12px]">{errors.email}</span>}
              </div>
            </div>

            <div className="flex flex-col gap-[6px]">
              <label htmlFor="company" className="text-[13px] font-medium text-[#1D4266]">Company Name (Optional)</label>
              <input 
                type="text" 
                id="company"
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                className="bg-[#F8F9FA] border border-[#D9E4EE] focus:border-[#3ECDB0] rounded-[12px] px-[16px] py-[12px] text-[14px] text-[#1D4266] outline-none transition-colors"
                placeholder="Your Business Ltd"
              />
            </div>

            <div className="flex flex-col gap-[6px]">
              <label htmlFor="message" className="text-[13px] font-medium text-[#1D4266]">How can we help?</label>
              <textarea 
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                rows={4}
                className={`bg-[#F8F9FA] border ${errors.message ? 'border-red-400' : 'border-[#D9E4EE] focus:border-[#3ECDB0]'} rounded-[12px] px-[16px] py-[12px] text-[14px] text-[#1D4266] outline-none transition-colors resize-none`}
                placeholder="Tell us about your current bookkeeping setup..."
              />
              {errors.message && <span className="text-red-500 text-[12px]">{errors.message}</span>}
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="mt-[8px] flex items-center justify-center gap-2 font-[family-name:var(--font-space-grotesk)] font-semibold text-[15px] px-[24px] py-[14px] rounded-full transition-all duration-200 bg-[color:var(--color-teal)] text-[color:var(--color-navy-3)] hover:bg-[color:var(--color-teal-2)] hover:shadow-[0_10px_24px_rgba(47,174,147,0.25)] disabled:opacity-70 disabled:cursor-not-allowed w-full md:w-auto self-start"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <Send size={16} />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
