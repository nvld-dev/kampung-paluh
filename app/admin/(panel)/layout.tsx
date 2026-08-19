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
      <div className="flex min-h-screen bg-[#f5f8f6]">
        <AdminSidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <AdminHeader />

          <main className="min-w-0 flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </AdminGuard>
  );
}