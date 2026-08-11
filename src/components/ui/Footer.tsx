export function Footer() {
  return (
    <footer className="bg-[color:var(--color-navy-3)] text-white/50 py-[26px] text-[13px]">
      <div className="wrap flex justify-between flex-wrap gap-[10px]">
        <span>© {new Date().getFullYear()} Kapital PNG — a trading division of Das Kapital Limited.</span>
        <span>Port Moresby, Papua New Guinea</span>
      </div>
    </footer>
  );
}
