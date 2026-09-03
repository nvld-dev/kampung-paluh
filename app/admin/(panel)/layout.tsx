import { ReactNode } from "react";

import AdminGuard from "@/components/admin/AdminGuard";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({
  children,
}: AdminLayoutProps) {
  return (
    <AdminGuard>
      <div className="flex h-screen overflow-hidden bg-[#f5f8f6]">
        {/* SIDEBAR */}
        <AdminSidebar />

        {/* AREA UTAMA */}
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          {/* HEADER */}
          <AdminHeader />

          {/* CONTENT — HANYA BAGIAN INI YANG SCROLL */}
          <main className="min-h-0 min-w-0 flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </AdminGuard>
  );
}