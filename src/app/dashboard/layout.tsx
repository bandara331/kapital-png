import type { Metadata } from "next";
import { DashboardSidebar } from "@/components/ui/DashboardSidebar";

export const metadata: Metadata = {
  title: "Client Portal | Kapital PNG",
  description: "Securely access your financial reports, upload documents, and manage your account.",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#08192d]">
      <DashboardSidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        {children}
      </main>
    </div>
  );
}
