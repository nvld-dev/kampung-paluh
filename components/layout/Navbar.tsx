"use client";

import { useEffect, useState } from "react";

const navigation = [
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

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("kampung-paluh-theme");

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else if (savedTheme === "light") {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      if (prefersDark) {
        document.documentElement.classList.add("dark");
        setDarkMode(true);
      }
    }
  }, []);

  const toggleDarkMode = () => {
    const nextMode = !darkMode;

    setDarkMode(nextMode);

    if (nextMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("kampung-paluh-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("kampung-paluh-theme", "light");
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto px-4 pt-3 sm:px-6 lg:px-8">
        <nav className="mx-auto flex h-[68px] max-w-[1380px] items-center justify-between rounded-2xl border border-black/[0.06] bg-white/90 px-4 shadow-[0_8px_35px_rgba(0,0,0,0.05)] backdrop-blur-xl transition-colors duration-300 dark:border-white/[0.08] dark:bg-[#0d1713]/90 dark:shadow-[0_8px_35px_rgba(0,0,0,0.25)] sm:px-5 lg:px-6">

          {/* Brand */}
          <a
            href="/"
            className="group flex shrink-0 items-center gap-3"
            aria-label="Kampung Paluh"
          >
            <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-[#e7f1eb] text-[#075b43] transition-all duration-300 group-hover:scale-105 group-hover:bg-[#dcebe3] dark:bg-[#163a2d] dark:text-[#75c6a4] dark:group-hover:bg-[#1c4939]">
              <svg
                width="21"
                height="21"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M12 3C7.5 5.2 5 8.4 5 12.2C5 17 8.1 20 12 21C15.9 20 19 17 19 12.2C19 8.4 16.5 5.2 12 3Z"
                  stroke="currentColor"
                  strokeWidth="1.7"
                />
                <path
                  d="M8 14C10.2 13.5 12.2 12.4 13.8 10.7C15 9.4 15.8 8 16.2 6.6"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div className="hidden sm:block">
              <div className="text-[17px] font-semibold leading-none tracking-[-0.035em] text-[#103c30] dark:text-[#e9f5ef]">
                Kampung Paluh
              </div>

              <div className="mt-1 text-[9px] font-medium uppercase tracking-[0.16em] text-[#7a8781] dark:text-[#82948b]">
                Portal Promosi Kampung
              </div>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden items-center lg:flex">
            <div className="flex items-center gap-1 rounded-xl bg-[#f4f7f5] p-1 dark:bg-white/[0.045]">
              {navigation.map((item, index) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`relative rounded-lg px-4 py-2.5 text-[12px] font-medium transition-all duration-200 ${
                    index === 0
                      ? "bg-white text-[#075b43] shadow-[0_2px_10px_rgba(0,0,0,0.06)] dark:bg-[#193a2e] dark:text-[#9de0bf]"
                      : "text-[#68756f] hover:bg-white/80 hover:text-[#075b43] dark:text-[#8d9c95] dark:hover:bg-white/[0.05] dark:hover:text-[#b5e7ce]"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-2 lg:flex">

            {/* Search */}
            <button
              type="button"
              aria-label="Cari"
              className="group flex h-10 w-10 items-center justify-center rounded-xl text-[#52615a] transition-all duration-200 hover:bg-[#eef4f0] hover:text-[#075b43] dark:text-[#9aa9a2] dark:hover:bg-white/[0.06] dark:hover:text-[#a9e2c5]"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="6.5"
                  stroke="currentColor"
                  strokeWidth="1.7"
                />
                <path
                  d="M16 16L21 21"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <div className="mx-1 h-7 w-px bg-black/[0.08] dark:bg-white/[0.08]" />

            {/* Dark Mode */}
            <button
              type="button"
              onClick={toggleDarkMode}
              aria-label={
                darkMode
                  ? "Aktifkan mode terang"
                  : "Aktifkan mode gelap"
              }
              title={darkMode ? "Light mode" : "Dark mode"}
              className="group relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl text-[#52615a] transition-all duration-300 hover:bg-[#eef4f0] hover:text-[#075b43] dark:text-[#9aa9a2] dark:hover:bg-white/[0.06] dark:hover:text-[#b5e7ce]"
            >
              {darkMode ? (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="4"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />
                  <path
                    d="M12 2V4M12 20V22M4.93 4.93L6.34 6.34M17.66 17.66L19.07 19.07M2 12H4M20 12H22M4.93 19.07L6.34 17.66M17.66 6.34L19.07 4.93"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M20.5 15.2C19.5 15.7 18.4 16 17.2 16C13.1 16 9.8 12.7 9.8 8.6C9.8 7.4 10.1 6.3 10.6 5.3C6.7 6 3.7 9.4 3.7 13.5C3.7 18.1 7.4 21.8 7.4 13.5C7.4 18.1 11.1 21.8 15.7 21.8C17.8 21.8 19.7 21 20.5 15.2Z"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-1 lg:hidden">

            {/* Dark Mode */}
            <button
              type="button"
              onClick={toggleDarkMode}
              aria-label={
                darkMode
                  ? "Aktifkan mode terang"
                  : "Aktifkan mode gelap"
              }
              className="flex h-10 w-10 items-center justify-center rounded-xl text-[#52615a] transition-colors hover:bg-[#eef4f0] hover:text-[#075b43] dark:text-[#9aa9a2] dark:hover:bg-white/[0.06]"
            >
              {darkMode ? (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="4"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />
                  <path
                    d="M12 2V4M12 20V22M4.93 4.93L6.34 6.34M17.66 17.66L19.07 19.07M2 12H4M20 12H22M4.93 19.07L6.34 17.66M17.66 6.34L19.07 4.93"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M20.5 15.2C19.5 15.7 18.4 16 17.2 16C13.1 16 9.8 12.7 9.8 8.6C9.8 7.4 10.1 6.3 10.6 5.3C6.7 6 3.7 9.4 3.7 13.5C3.7 18.1 7.4 21.8 12 21.8C16.1 21.8 19.5 18.8 20.5 15.2Z"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>

            {/* Hamburger */}
            <button
              type="button"
              aria-label={isOpen ? "Tutup menu" : "Buka menu"}
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-xl text-[#52615a] transition-colors hover:bg-[#eef4f0] hover:text-[#075b43] dark:text-[#9aa9a2] dark:hover:bg-white/[0.06]"
            >
              {isOpen ? (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M6 6L18 18M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M4 7H20M4 12H20M4 17H20"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`mx-auto mt-2 max-w-[1380px] overflow-hidden rounded-2xl border border-black/[0.06] bg-white/95 shadow-xl backdrop-blur-xl transition-all duration-300 dark:border-white/[0.08] dark:bg-[#0d1713]/95 ${
            isOpen
              ? "max-h-[500px] translate-y-0 opacity-100"
              : "pointer-events-none max-h-0 -translate-y-2 opacity-0"
          }`}
        >
          <div className="p-3">
            {navigation.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-medium transition-colors ${
                  index === 0
                    ? "bg-[#e9f1ed] text-[#075b43] dark:bg-[#173a2d] dark:text-[#a8e2c3]"
                    : "text-[#56635d] hover:bg-[#f2f6f3] hover:text-[#075b43] dark:text-[#9aa9a2] dark:hover:bg-white/[0.05] dark:hover:text-[#b5e7ce]"
                }`}
              >
                <span>{item.label}</span>

                {index === 0 && (
                  <span className="h-1.5 w-1.5 rounded-full bg-[#2e8066]" />
                )}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}