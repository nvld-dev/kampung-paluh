"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const navItems = [
  { label: "Beranda", href: "/" },
  { label: "Profil Kampung", href: "/profil" },
  { label: "Kegiatan", href: "/kegiatan" },
  { label: "Produk Lokal", href: "/umkm" },
  { label: "Berita", href: "/berita" },
];

export default function Navbar() {
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [dark, setDark] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [hovered, setHovered] = useState<string | null>(null);
  const [underline, setUnderline] = useState({ left: 0, width: 0, ready: false });

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Slide the underline to whichever item is hovered, falling back to the active page
  const measure = (href: string) => {
    const el = itemRefs.current[href];
    const nav = navRef.current;
    if (!el || !nav) return;
    const elBox = el.getBoundingClientRect();
    const navBox = nav.getBoundingClientRect();
    setUnderline({ left: elBox.left - navBox.left, width: elBox.width, ready: true });
  };

  useLayoutEffect(() => {
    const target = hovered ?? navItems.find((item) => isActive(item.href))?.href;
    if (target) measure(target);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hovered, pathname]);

  useEffect(() => {
    const onResize = () => {
      const target = hovered ?? navItems.find((item) => isActive(item.href))?.href;
      if (target) measure(target);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hovered, pathname]);

  // Shrink navbar slightly once the page scrolls
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile drawer whenever the route changes
  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Focus the search field the moment it opens
  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  // Close on Escape from anywhere
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMobileOpen(false);
      setSearchOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Sync a `dark` class on <html>. Swap this for next-themes' useTheme()
  // if that package is already wired up in the project.
  useEffect(() => {
    const stored = window.localStorage.getItem("theme");
    const prefersDark =
      stored === "dark" ||
      (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setDark(prefersDark);
    document.documentElement.classList.toggle("dark", prefersDark);
  }, []);

  const toggleTheme = () => {
    setDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      window.localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 px-4 transition-[padding] duration-300 sm:px-6 ${
        scrolled ? "pt-2" : "pt-4"
      }`}
    >
      <div
        className={`mx-auto flex max-w-[1720px] items-center justify-between rounded-[22px] px-4 transition-all duration-300 sm:px-5 ${
          scrolled ? "py-2" : "py-3"
        } ${
          scrolled
            ? "border border-black/[0.05] bg-white/95 shadow-[0_8px_30px_rgba(0,0,0,0.05)] backdrop-blur-xl dark:border-white/[0.07] dark:bg-[#101914]/95"
            : "border border-transparent bg-transparent shadow-none backdrop-blur-0"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-[15px]">
            <img
              src="/images/logo.png"
              alt="Logo Kampung Paluh"
              className="h-10 w-10 object-contain"
            />
          </div>

          <div className="hidden sm:block">
            <div className="text-[17px] font-bold tracking-[-0.02em] text-[#173d31] dark:text-[#edf5f0]">
              Kampung Paluh
            </div>

            <div className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#7b8983] dark:text-[#82958c]">
              Portal Promosi Kampung
            </div>
          </div>
        </Link>

        {/* Desktop navigation */}
        <nav
          ref={navRef}
          onMouseLeave={() => setHovered(null)}
          className="relative hidden items-center gap-7 px-2 lg:flex"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              ref={(el) => {
                itemRefs.current[item.href] = el;
              }}
              onMouseEnter={() => setHovered(item.href)}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`py-2 text-[12.5px] font-semibold tracking-[0.01em] transition-colors duration-200 ${
              isActive(item.href)
                ? "text-[#075b43] dark:text-[#9de0bf]"
                : "text-[#68736e] hover:text-[#075b43] dark:text-[#9aa9a2] dark:hover:text-[#9de0bf]"
            }`}  
          >
              {item.label}
            </Link>
          ))}

          {/* Sliding underline indicator */}
          <span
            aria-hidden
            className={`pointer-events-none absolute bottom-0 h-[2px] rounded-full bg-[#075b43] transition-all duration-300 ease-out dark:bg-[#9de0bf] ${
              underline.ready ? "opacity-100" : "opacity-0"
            }`}
            style={{ left: underline.left, width: underline.width }}
          />
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Search */}
          <div className="relative flex items-center">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Cari di Kampung Paluh..."
              aria-hidden={!searchOpen}
              tabIndex={searchOpen ? 0 : -1}
              className={`absolute right-[calc(100%+8px)] h-10 rounded-full border border-[#dce3df] bg-white px-4 text-[13px] text-[#173d31] outline-none transition-all duration-300 focus:border-[#075b43] dark:border-[#293a32] dark:bg-[#16231d] dark:text-[#edf5f0] ${
                searchOpen
                  ? "w-40 opacity-100 sm:w-56"
                  : "pointer-events-none w-0 border-transparent px-0 opacity-0"
              }`}
            />
            <button
              type="button"
              aria-label={searchOpen ? "Tutup pencarian" : "Pencarian"}
              aria-expanded={searchOpen}
              onClick={() => setSearchOpen((v) => !v)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#64716b] transition-colors hover:bg-[#f1f5f3] hover:text-[#075b43] dark:text-[#a0afa8] dark:hover:bg-[#192820]"
            >
              {searchOpen ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6 6L18 18M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="2.1" />
                  <path d="M16 16L20 20" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </div>

          <div className="hidden h-7 w-px bg-[#dce3df] sm:block dark:bg-[#293a32]" />

          {/* Theme toggle */}
          <button
            type="button"
            aria-label={dark ? "Aktifkan mode terang" : "Aktifkan mode gelap"}
            aria-pressed={dark}
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#64716b] transition-colors hover:bg-[#f1f5f3] hover:text-[#075b43] dark:text-[#a0afa8] dark:hover:bg-[#192820]"
          >
            {dark ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.7" />
                <path
                  d="M12 2.5V4.5M12 19.5V21.5M4.5 12H2.5M21.5 12H19.5M5.6 5.6L4.2 4.2M19.8 19.8L18.4 18.4M18.4 5.6L19.8 4.2M4.2 19.8L5.6 18.4"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M20 15.5C18.9 16 17.7 16.3 16.5 16.3C11.8 16.3 8 12.5 8 7.8C8 6.5 8.3 5.3 8.8 4.2C5.5 5.5 3.2 8.7 3.2 12.4C3.2 17.2 7.1 21 11.8 21C15.5 21 18.7 18.8 20 15.5Z"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            type="button"
            aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#64716b] transition-colors hover:bg-[#f1f5f3] hover:text-[#075b43] dark:text-[#a0afa8] dark:hover:bg-[#192820] lg:hidden"
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
              {mobileOpen ? (
                <path
                  d="M6 6L18 18M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7H20M4 12H20M4 17H20"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`mx-auto mt-2 max-w-[1720px] overflow-hidden transition-all duration-300 lg:hidden ${
          mobileOpen ? "max-h-96 opacity-100" : "pointer-events-none max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col rounded-[22px] border border-black/[0.05] bg-white/95 p-2 shadow-[0_8px_30px_rgba(0,0,0,0.05)] backdrop-blur-xl dark:border-white/[0.07] dark:bg-[#101914]/95">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`border-l-2 px-4 py-3 text-[14px] font-semibold transition-colors ${
              isActive(item.href)
                ? "border-[#075b43] text-[#075b43] dark:border-[#9de0bf] dark:text-[#9de0bf]"
                : "border-transparent text-[#68736e] hover:border-[#dce3df] hover:text-[#075b43] dark:text-[#9aa9a2] dark:hover:border-[#293a32] dark:hover:text-[#9de0bf]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}