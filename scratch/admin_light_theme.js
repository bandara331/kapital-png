const fs = require('fs');
const path = require('path');

const filepath = 'c:\\Users\\Sasmitha Thejan\\OneDrive\\Desktop\\Kapital network\\src\\app\\admin\\page.tsx';

const replacements = {
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
};

let content = fs.readFileSync(filepath, 'utf8');

for (const [oldStr, newStr] of Object.entries(replacements)) {
    // Escape special characters for regex
    const escapedOld = oldStr.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(escapedOld, 'g');
    content = content.replace(regex, newStr);
}

fs.writeFileSync(filepath, content, 'utf8');
console.log("Admin portal updated to light theme via Node.");
