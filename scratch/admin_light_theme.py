import os

filepath = r"c:\Users\Sasmitha Thejan\OneDrive\Desktop\Kapital network\src\app\admin\page.tsx"

replacements = {
    "text-white/70": "text-[#1D4266]/70",
    "text-white/60": "text-[#1D4266]/60",
    "text-white/50": "text-[#1D4266]/50",
    "text-white/40": "text-[#1D4266]/40",
    "text-white/35": "text-[#1D4266]/35",
    "text-white/30": "text-[#1D4266]/30",
    "text-white": "text-[#1D4266]",
    "bg-white/5": "bg-white shadow-sm",
    "border-white/10": "border-[#1D4266]/10",
    "border-white/30": "border-[#1D4266]/30",
    "placeholder-white/30": "placeholder-[#1D4266]/30",
}

with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

new_content = content
for old, new in replacements.items():
    new_content = new_content.replace(old, new)
    
if new_content != content:
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(new_content)
    print("Admin portal updated to light theme.")
else:
    print("No changes needed.")
