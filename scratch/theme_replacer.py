import os

replacements = {
    "src/components/ui/Navbar.tsx": [
        ("AI-Aided Analytics", "Analytics")
    ],
    "src/components/ui/Footer.tsx": [
        ("AI-aided financial analytics", "financial analytics")
    ],
    "src/components/sections/WhyUs.tsx": [
        ("AI Analytics", "Analytics"),
        ("AI-aided analytics", "Advanced analytics")
    ],
    "src/components/sections/Services.tsx": [
        ("\"AI-Aided Analytics\"", "\"Analytics\""),
        ("AI Cash Flow Forecasting", "Cash Flow Forecasting"),
        ("Our AI builds a custom predictive model", "We build a custom predictive model"),
        ("AI-Powered Insights", "Advanced Insights")
    ],
    "src/components/sections/ServiceDetailView.tsx": [
        ("AI-aided financial insight", "Financial insight"),
        ("AI-aided insight", "advanced insight")
    ],
    "src/components/sections/Sectors.tsx": [
        ("AI analytics so owners", "advanced analytics so owners")
    ],
    "src/components/sections/RoiCalculator.tsx": [
        ("AI analytics.", "analytics.")
    ],
    "src/components/sections/OcrScannerDemo.tsx": [
        ("AI-Aided Automation", "Smart Automation"),
        ("Our AI instantly extracts line items, taxes, and vendor details from your invoices and receipts — powered by Groq's ultra-fast Llama 3 model — and logs them directly into Xero.", "Our system instantly extracts line items, taxes, and vendor details from your invoices and receipts and logs them directly into Xero."),
        ("or click \"Test Scan\" to see Groq AI in action", "or click \"Test Scan\" to see the scanner in action"),
        ("Sending to Groq AI...", "Processing...")
    ],
    "src/components/sections/MissionVision.tsx": [
        ("AI-aided insight", "advanced insight")
    ],
    "src/components/sections/Hero.tsx": [
        ("{ value: \"AI\", label: \"Powered Analytics\" }", "{ value: \"Advanced\", label: \"Analytics\" }"),
        ("label: \"AI Analytics\"", "label: \"Analytics\""),
        ("with AI-aided analytics", "with advanced analytics")
    ],
    "src/components/sections/DashboardDemo.tsx": [
        ("AI-Aided Analytics", "Advanced Analytics")
    ],
    "src/components/sections/Contact.tsx": [
        ("AI-aided insight", "advanced insight")
    ],
    "src/components/sections/About.tsx": [
        ("AI-supported financial analysis", "advanced financial analysis")
    ],
    "src/app/services/page.tsx": [
        ("AI-aided analytics", "analytics")
    ],
    "src/app/layout.tsx": [
        ("AI-Aided Analytics", "Analytics")
    ]
}

for filepath, reps in replacements.items():
    if not os.path.exists(filepath):
        print(f"File not found: {filepath}")
        continue
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    for old_str, new_str in reps:
        content = content.replace(old_str, new_str)
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print("Done replacing AI text.")
