"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { auth } from "@/lib/firebase/auth";
import { db } from "@/lib/firebase/firestore";

export default function AdminHeader() {
  const [adminName, setAdminName] = useState("Administrator");
  const [adminEmail, setAdminEmail] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (user) => {
        if (!user) return;

        setAdminEmail(user.email ?? "");

        try {
          const snapshot = await getDoc(
            doc(db, "admins", user.uid)
          );

          if (snapshot.exists()) {
            const data = snapshot.data();

            if (data.nama) {
              setAdminName(data.nama);
            }
          }
        } catch (error) {
          console.error(
            "Gagal mengambil data admin:",
            error
          );
        }
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <header className="flex h-[76px] shrink-0 items-center justify-between border-b border-[#e5ebe7] bg-white px-6 lg:px-8">

      {/* Left */}
      <div>
        <div className="text-[11px] font-medium text-[#8a9490]">
          Administrator
        </div>

        <div className="mt-0.5 text-[14px] font-semibold text-[#17201d]">
          Panel Administrasi
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">

        {/* Notification */}
        <button
          type="button"
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            border
            border-[#e3eae6]
            text-[#68736e]
            transition-colors
            hover:bg-[#f4f7f5]
            hover:text-[#075b43]
          "
          aria-label="Notifikasi"
        >
          <svg
            width="17"
            height="17"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M18 9C18 5.7 15.8 3.5 12 3.5C8.2 3.5 6 5.7 6 9V13L4.5 16H19.5L18 13V9Z"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinejoin="round"
            />

            <path
              d="M10 19C10.5 20 11.2 20.5 12 20.5C12.8 20.5 13.5 20 14 19"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Admin */}
        <div className="flex items-center gap-3 border-l border-[#e5ebe7] pl-4">

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e9f1ed] text-[12px] font-semibold text-[#075b43]">
            {adminName
              .split(" ")
              .slice(0, 2)
              .map((word) => word.charAt(0))
              .join("")
              .toUpperCase()}
          </div>

          <div className="hidden sm:block">
            <div className="max-w-[170px] truncate text-[11px] font-semibold text-[#27322e]">
              {adminName}
            </div>

            <div className="max-w-[170px] truncate text-[9px] text-[#8a9490]">
              {adminEmail}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}