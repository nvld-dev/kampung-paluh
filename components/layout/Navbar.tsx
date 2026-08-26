"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    {
      label: "Beranda",
      href: "/",
    },
    {
      label: "Profil Kampung",
      href: "/profil",
    },
    {
      label: "Kegiatan",
      href: "/kegiatan",
    },
    {
      label: "Produk Lokal",
      href: "/umkm",
    },
    {
      label: "Berita",
      href: "/berita",
    },
  ];

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <div className="mx-auto flex max-w-[1720px] items-center justify-between rounded-[22px] border border-black/[0.05] bg-white/95 px-4 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.05)] backdrop-blur-xl dark:border-white/[0.07] dark:bg-[#101914]/95 sm:px-5">

        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-[15px] bg-[#e9f1ed] text-[#075b43] dark:bg-[#193a2e] dark:text-[#9de0bf]">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.5 4.5C14 4.5 8 6.5 6 11.5C4.4 15.5 6.5 19.5 10.5 20C14.5 20.5 18 17.5 19.5 13C20.5 10 20 7 19.5 4.5Z"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5 19C8 16 11 13 17 10"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="hidden sm:block">
            <div className="text-[17px] font-semibold tracking-[-0.02em] text-[#173d31] dark:text-[#edf5f0]">
              Kampung Paluh
            </div>

            <div className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.18em] text-[#7b8983] dark:text-[#82958c]">
              Portal Promosi Kampung
            </div>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-1 rounded-[16px] bg-[#f4f7f5] p-1 lg:flex dark:bg-[#16231d]">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-[12px] px-5 py-3 text-[12px] font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-white text-[#075b43] shadow-[0_3px_12px_rgba(0,0,0,0.05)] dark:bg-[#21352c] dark:text-[#9de0bf]"
                    : "text-[#68736e] hover:text-[#075b43] dark:text-[#9aa9a2] dark:hover:text-[#9de0bf]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <button
            type="button"
            aria-label="Pencarian"
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#64716b] transition-colors hover:bg-[#f1f5f3] hover:text-[#075b43] dark:text-[#a0afa8] dark:hover:bg-[#192820]"
          >
            <svg
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="11"
                cy="11"
                r="6.5"
                stroke="currentColor"
                strokeWidth="1.7"
              />
              <path
                d="M16 16L20 20"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <div className="hidden h-7 w-px bg-[#dce3df] sm:block dark:bg-[#293a32]" />

          {/* Theme */}
          <button
            type="button"
            aria-label="Ubah tema"
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#64716b] transition-colors hover:bg-[#f1f5f3] hover:text-[#075b43] dark:text-[#a0afa8] dark:hover:bg-[#192820]"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 15.5C18.9 16 17.7 16.3 16.5 16.3C11.8 16.3 8 12.5 8 7.8C8 6.5 8.3 5.3 8.8 4.2C5.5 5.5 3.2 8.7 3.2 12.4C3.2 17.2 7.1 21 11.8 21C15.5 21 18.7 18.8 20 15.5Z"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}