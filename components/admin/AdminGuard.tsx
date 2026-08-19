"use client";

import { ReactNode, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { usePathname, useRouter } from "next/navigation";

import { auth } from "@/lib/firebase/auth";
import { db } from "@/lib/firebase/firestore";

interface AdminGuardProps {
  children: ReactNode;
}

export default function AdminGuard({
  children,
}: AdminGuardProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (user: User | null) => {
        try {
          // Belum login
          if (!user) {
            setAuthorized(false);
            router.replace(
              `/admin/login?redirect=${encodeURIComponent(pathname)}`
            );
            return;
          }

          // Ambil data admin
          const adminRef = doc(db, "admins", user.uid);
          const adminSnapshot = await getDoc(adminRef);

          if (!adminSnapshot.exists()) {
            setAuthorized(false);
            await auth.signOut();
            router.replace("/admin/login");
            return;
          }

          const adminData = adminSnapshot.data();

          // Validasi role dan status
          if (
            adminData.role !== "admin" ||
            adminData.aktif !== true
          ) {
            setAuthorized(false);
            await auth.signOut();
            router.replace("/admin/login");
            return;
          }

          setAuthorized(true);
        } catch (error) {
          console.error("ADMIN GUARD ERROR:", error);

          setAuthorized(false);

          await auth.signOut();

          router.replace("/admin/login");
        } finally {
          setLoading(false);
        }
      }
    );

    return () => unsubscribe();
  }, [router, pathname]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f8f6]">
        <div className="flex flex-col items-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#dce8e2] border-t-[#075b43]" />

          <p className="mt-4 text-[11px] font-medium tracking-wide text-[#7b8782]">
            Memuat CMS...
          </p>
        </div>
      </div>
    );
  }

  if (!authorized) {
    return null;
  }

  return <>{children}</>;
}