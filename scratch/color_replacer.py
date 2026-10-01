import os

directory = r"c:\Users\Sasmitha Thejan\OneDrive\Desktop\Kapital network\src"

replacements = {
    "bg-[#FAFAFA]": "bg-[#F0F5F9]",
    "bg-[#F4F7FB]": "bg-[#E9EFF5]"
}

for root, _, files in os.walk(directory):
    for file in files:
        if file.endswith((".tsx", ".ts", ".css")):
            filepath = os.path.join(root, file)
            with open(filepath, "r", encoding="utf-8") as f:
                content = f.read()
            
            new_content = content
            for old, new in replacements.items():
                new_content = new_content.replace(old, new)
                
            if new_content != content:
                with open(filepath, "w", encoding="utf-8") as f:
                    f.write(new_content)
                print(f"Updated {filepath}")
