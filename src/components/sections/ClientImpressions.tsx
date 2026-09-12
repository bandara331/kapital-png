"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Star, Quote, Send, CheckCircle, ChevronDown } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

/* ── types ────────────────────────────────────────────────────── */
interface Review {
  id: string;
  name: string;
  role: string | null;
  company: string | null;
  industry: string | null;
  quote: string;
  rating: number;
  created_at: string;
}

/* ── animation variants ───────────────────────────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (d: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const, delay: d },
  }),
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ── avatar gradient pool ─────────────────────────────────────── */
const GRADIENTS = [
  "from-[#2FAEA3] to-[#5FD4B8]",
  "from-[#C99A46] to-[#E8B96A]",
  "from-[#6B8FD6] to-[#8BA8E8]",
  "from-[#C47FD0] to-[#E0A8E8]",
  "from-[#2FAEA3] to-[#C99A46]",
  "from-[#5C6B76] to-[#8BA8A0]",
];

/* ── StarPicker ───────────────────────────────────────────────── */
function StarPicker({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          onMouseEnter={() => setHovered(n)}
          onMouseLeave={() => setHovered(0)}
          className="p-0.5 transition-transform hover:scale-110"
          aria-label={`Rate ${n} star${n > 1 ? "s" : ""}`}
        >
          <Star
            size={28}
            className={`transition-colors ${
              n <= (hovered || value)
                ? "fill-[color:var(--color-gold)] text-[color:var(--color-gold)]"
                : "text-[color:var(--border)] fill-transparent"
            }`}
          />
        </button>
      ))}
    </div>
  );
}

/* ── ReviewCard ───────────────────────────────────────────────── */
function ReviewCard({ review, index }: { review: Review; index: number }) {
  const initials = review.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const gradient = GRADIENTS[index % GRADIENTS.length];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="group relative bg-[color:var(--card)] border border-[color:var(--border)] rounded-[18px] p-7 flex flex-col
                 hover:border-[color:var(--color-teal)]/40 hover:shadow-[0_8px_40px_rgba(47,174,147,0.1)]
                 transition-all duration-300 overflow-hidden"
    >
      {/* Top shimmer on hover */}
      <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-[color:var(--color-teal)] to-transparent" />

      {/* Quote icon */}
      <Quote size={24} className="text-[color:var(--color-teal)] opacity-35 mb-4" strokeWidth={1.5} />

      {/* Stars */}
      <div className="flex gap-0.5 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={14}
            className={
              i < review.rating
                ? "fill-[color:var(--color-gold)] text-[color:var(--color-gold)]"
                : "text-[color:var(--border)] fill-transparent"
            }
          />
        ))}
      </div>

      {/* Quote */}
      <p className="text-[color:var(--foreground)]/80 text-[15px] leading-relaxed flex-1 mb-6">
        &ldquo;{review.quote}&rdquo;
      </p>

      {/* Divider */}
      <div className="h-px bg-[color:var(--border)] mb-5" />

      {/* Author row */}
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center shrink-0 shadow-sm`}
        >
          <span className="text-white text-[12px] font-bold">{initials}</span>
        </div>
        <div className="min-w-0">
          <p className="text-[14px] font-semibold text-[color:var(--foreground)] font-[family-name:var(--font-space-grotesk)] leading-tight truncate">
            {review.name}
          </p>
          {(review.role || review.company) && (
            <p className="text-[12px] text-[color:var(--muted)] font-mono truncate">
              {[review.role, review.company].filter(Boolean).join(" · ")}
            </p>
          )}
        </div>
        {review.industry && (
          <span className="ml-auto shrink-0 text-[10.5px] font-mono tracking-wider uppercase px-2.5 py-1 rounded-full bg-[color:var(--color-teal)]/8 text-[color:var(--color-teal)] border border-[color:var(--color-teal)]/20">
            {review.industry}
          </span>
        )}
      </div>
    </motion.div>
  );
}

/* ── SubmitForm ───────────────────────────────────────────────── */
function SubmitForm({ onSuccess }: { onSuccess: () => void }) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [form, setForm] = useState({
    name: "", role: "", company: "", industry: "", quote: "",
  });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating) { setError("Please pick a star rating."); return; }
    if (!form.name.trim() || !form.quote.trim()) {
      setError("Name and review are required.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, rating }),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d.error || "Something went wrong.");
      }
      setDone(true);
      onSuccess();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const INDUSTRIES = [
    "Retail", "Hospitality", "Agriculture", "Construction",
    "Transport", "Healthcare", "Finance", "Other",
  ];

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center gap-4 py-12 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-[color:var(--color-teal)]/15 flex items-center justify-center">
          <CheckCircle size={32} className="text-[color:var(--color-teal)]" />
        </div>
        <h4 className="text-[20px] font-semibold font-[family-name:var(--font-space-grotesk)] text-[color:var(--foreground)]">
          Thank you for your review!
        </h4>
        <p className="text-[color:var(--muted)] text-[15px] max-w-[380px]">
          Your review is pending a quick approval and will appear on this page shortly.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="border border-[color:var(--border)] rounded-[20px] overflow-hidden">
      {/* Toggle header */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-8 py-5 bg-[color:var(--card)] hover:bg-[color:var(--color-teal)]/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[color:var(--color-teal)]/15 flex items-center justify-center">
            <Star size={16} className="text-[color:var(--color-teal)]" />
          </div>
          <span className="font-semibold text-[16px] font-[family-name:var(--font-space-grotesk)] text-[color:var(--foreground)]">
            Share your experience with Kapital PNG
          </span>
        </div>
        <ChevronDown
          size={20}
          className={`text-[color:var(--muted)] transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <form
              onSubmit={handleSubmit}
              className="px-8 py-7 bg-[color:var(--card)] border-t border-[color:var(--border)] grid grid-cols-1 sm:grid-cols-2 gap-5"
            >
              {/* Star rating — full width */}
              <div className="sm:col-span-2">
                <label className="block text-[13px] font-mono uppercase tracking-wider text-[color:var(--muted)] mb-2">
                  Your rating *
                </label>
                <StarPicker value={rating} onChange={setRating} />
              </div>

              {/* Name */}
              <div>
                <label className="block text-[13px] font-mono uppercase tracking-wider text-[color:var(--muted)] mb-1.5">
                  Full name *
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="James Kila"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-[color:var(--background)] border border-[color:var(--border)] text-[color:var(--foreground)] text-[15px] placeholder:text-[color:var(--muted)] focus:outline-none focus:border-[color:var(--color-teal)] focus:ring-1 focus:ring-[color:var(--color-teal)] transition-colors"
                />
              </div>

              {/* Role */}
              <div>
                <label className="block text-[13px] font-mono uppercase tracking-wider text-[color:var(--muted)] mb-1.5">
                  Role / Title
                </label>
                <input
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  placeholder="Director"
                  className="w-full px-4 py-3 rounded-xl bg-[color:var(--background)] border border-[color:var(--border)] text-[color:var(--foreground)] text-[15px] placeholder:text-[color:var(--muted)] focus:outline-none focus:border-[color:var(--color-teal)] focus:ring-1 focus:ring-[color:var(--color-teal)] transition-colors"
                />
              </div>

              {/* Company */}
              <div>
                <label className="block text-[13px] font-mono uppercase tracking-wider text-[color:var(--muted)] mb-1.5">
                  Company
                </label>
                <input
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="Kila Trading Ltd"
                  className="w-full px-4 py-3 rounded-xl bg-[color:var(--background)] border border-[color:var(--border)] text-[color:var(--foreground)] text-[15px] placeholder:text-[color:var(--muted)] focus:outline-none focus:border-[color:var(--color-teal)] focus:ring-1 focus:ring-[color:var(--color-teal)] transition-colors"
                />
              </div>

              {/* Industry */}
              <div>
                <label className="block text-[13px] font-mono uppercase tracking-wider text-[color:var(--muted)] mb-1.5">
                  Industry
                </label>
                <select
                  name="industry"
                  value={form.industry}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-[color:var(--background)] border border-[color:var(--border)] text-[color:var(--foreground)] text-[15px] focus:outline-none focus:border-[color:var(--color-teal)] focus:ring-1 focus:ring-[color:var(--color-teal)] transition-colors"
                >
                  <option value="">Select industry</option>
                  {INDUSTRIES.map((ind) => (
                    <option key={ind} value={ind}>{ind}</option>
                  ))}
                </select>
              </div>

              {/* Review — full width */}
              <div className="sm:col-span-2">
                <label className="block text-[13px] font-mono uppercase tracking-wider text-[color:var(--muted)] mb-1.5">
                  Your review *
                </label>
                <textarea
                  name="quote"
                  value={form.quote}
                  onChange={handleChange}
                  placeholder="Tell us about your experience working with Kapital PNG..."
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl bg-[color:var(--background)] border border-[color:var(--border)] text-[color:var(--foreground)] text-[15px] placeholder:text-[color:var(--muted)] focus:outline-none focus:border-[color:var(--color-teal)] focus:ring-1 focus:ring-[color:var(--color-teal)] transition-colors resize-none"
                />
              </div>

              {/* Error */}
              {error && (
                <p className="sm:col-span-2 text-red-500 text-[13.5px] font-mono">
                  ⚠ {error}
                </p>
              )}

              {/* Submit */}
              <div className="sm:col-span-2 flex items-center justify-between">
                <p className="text-[13px] text-[color:var(--muted)]">
                  Reviews are approved before going live.
                </p>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-2 px-7 py-3 bg-[color:var(--color-teal)] text-[color:var(--color-navy-3)] font-semibold font-[family-name:var(--font-space-grotesk)] rounded-full
                             hover:bg-[color:var(--color-teal-2)] hover:-translate-y-[2px] hover:shadow-[0_8px_24px_rgba(47,174,147,0.35)]
                             disabled:opacity-50 disabled:cursor-not-allowed disabled:translate-y-0
                             transition-all duration-200 text-[15px]"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Submitting…
                    </span>
                  ) : (
                    <>
                      Submit Review <Send size={15} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Main component ───────────────────────────────────────────── */
export function ClientImpressions() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = useCallback(async () => {
    try {
      const res = await fetch("/api/reviews");
      if (res.ok) {
        const data: Review[] = await res.json();
        setReviews(data);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReviews();

    // Real-time subscription — fires whenever a review is approved
    const channel = supabase
      .channel("reviews-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "reviews", filter: "approved=eq.true" },
        () => { fetchReviews(); }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [fetchReviews]);

  /* average rating */
  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
      : "—";

  return (
    <section className="py-[104px] relative overflow-hidden">
      {/* Background glow blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] h-[400px] bg-[color:var(--color-teal)]/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-[color:var(--color-gold)]/5 rounded-full blur-[100px]" />
      </div>

      <div className="wrap relative">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="text-center mb-14"
        >
          <motion.p
            variants={fadeUp}
            custom={0}
            className="inline-flex items-center gap-[10px] font-mono text-[12.5px] tracking-[0.14em] uppercase text-[color:var(--color-teal)] mb-4
                       before:content-[''] before:w-[22px] before:h-[1px] before:bg-[color:var(--color-teal)] before:inline-block
                       after:content-[''] after:w-[22px] after:h-[1px] after:bg-[color:var(--color-teal)] after:inline-block"
          >
            Client Impressions
          </motion.p>

          <motion.h2
            variants={fadeUp}
            custom={0.08}
            className="text-[clamp(28px,3.4vw,42px)] font-semibold font-[family-name:var(--font-space-grotesk)] leading-[1.15] mb-4"
          >
            What PNG business owners say.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            custom={0.14}
            className="text-[color:var(--muted)] text-[17px] max-w-[520px] mx-auto"
          >
            Real results, real businesses — submitted live by our clients.
          </motion.p>
        </motion.div>

        {/* Stats strip */}
        {reviews.length > 0 && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
            className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 mb-14"
          >
            {[
              { value: `${avgRating}★`, label: "Average rating" },
              { value: `${reviews.length}`, label: "Verified reviews" },
              { value: "100%", label: "Satisfied clients" },
              { value: "24h", label: "Response guarantee" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center">
                <span className="text-[26px] font-bold font-[family-name:var(--font-space-grotesk)] text-[color:var(--color-teal)]">
                  {s.value}
                </span>
                <span className="text-[12.5px] text-[color:var(--muted)] font-mono uppercase tracking-wider">
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>
        )}

        {/* Review cards grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-[280px] rounded-[18px] bg-[color:var(--card)] border border-[color:var(--border)] animate-pulse"
              />
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 mb-10"
          >
            <div className="w-16 h-16 rounded-full bg-[color:var(--color-teal)]/10 flex items-center justify-center mx-auto mb-4">
              <Star size={28} className="text-[color:var(--color-teal)] opacity-50" />
            </div>
            <p className="text-[color:var(--muted)] text-[16px]">
              No reviews yet — be the first to share your experience!
            </p>
          </motion.div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10"
          >
            <AnimatePresence mode="popLayout">
              {reviews.map((review, i) => (
                <ReviewCard key={review.id} review={review} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Submit form */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          custom={0}
        >
          <SubmitForm onSuccess={fetchReviews} />
        </motion.div>
      </div>
    </section>
  );
}
