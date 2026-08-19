"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";

import { auth } from "@/lib/firebase/auth";

const menuItems = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect
          x="4"
          y="4"
          width="6"
          height="6"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.7"
        />
        <rect
          x="14"
          y="4"
          width="6"
          height="6"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.7"
        />
        <rect
          x="4"
          y="14"
          width="6"
          height="6"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.7"
        />
        <rect
          x="14"
          y="14"
          width="6"
          height="6"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.7"
        />
      </svg>
    ),
  },

  {
    label: "Beranda",
    href: "/admin/beranda",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path
          d="M4 11.5L12 4L20 11.5V20H4V11.5Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path
          d="M9 20V14H15V20"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },

  {
    label: "Profil",
    href: "/admin/profil",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <circle
          cx="12"
          cy="8"
          r="3.2"
          stroke="currentColor"
          strokeWidth="1.7"
        />
        <path
          d="M5 20C5.8 15.9 8.1 14 12 14C15.9 14 18.2 15.9 19 20"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    ),
  },

  {
    label: "UMKM",
    href: "/admin/umkm",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path
          d="M4 10L6 4H18L20 10"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path
          d="M5 10V20H19V10"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path
          d="M4 10C4 12 5.3 13 7 13C8.7 13 10 12 10 10C10 12 11.3 13 13 13C14.7 13 16 12 16 10C16 12 17.3 13 19 13C20 13 20 12 20 10"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    ),
  },

  {
    label: "Produk",
    href: "/admin/produk",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path
          d="M5 7.5L12 4L19 7.5V16.5L12 20L5 16.5V7.5Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path
          d="M5 7.5L12 11L19 7.5M12 11V20"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },

  {
    label: "Fasilitas",
    href: "/admin/fasilitas",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <path
          d="M4 20V10L12 4L20 10V20"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path
          d="M8 20V14H16V20"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },

  {
    label: "Kegiatan",
    href: "/admin/kegiatan",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect
          x="4"
          y="5"
          width="16"
          height="15"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.7"
        />
        <path
          d="M8 3V7M16 3V7M4 10H20"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <path
          d="M8 14H10M14 14H16M8 17H10"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    ),
  },

  {
    label: "Berita",
    href: "/admin/berita",
    icon: (
      <svg viewBox="0 0 24 24" fill="none">
        <rect
          x="4"
          y="4"
          width="16"
          height="16"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.7"
        />
        <path
          d="M8 8H16M8 12H16M8 16H12"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await signOut(auth);
    router.replace("/admin/login");
  }

  return (
    <aside className="flex h-screen w-[250px] shrink-0 flex-col border-r border-[#e3eae6] bg-white">

      {/* Brand */}
      <div className="flex h-[76px] items-center border-b border-[#edf1ef] px-6">
        <Link
          href="/admin"
          className="flex items-center gap-3"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#003c2b] text-white">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 3C7.5 5.2 5 8.4 5 12.2C5 17 8.1 20 12 21C15.9 20 19 17 19 12.2C19 8.4 16.5 5.2 12 3Z"
                stroke="currentColor"
                strokeWidth="1.8"
              />
              <path
                d="M8 14C10.2 13.5 12.2 12.4 13.8 10.7C15 9.4 15.8 8 16.2 6.6"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div>
            <div className="text-[14px] font-semibold tracking-[-0.02em] text-[#17201d]">
              Kampung Paluh
            </div>

            <div className="mt-0.5 text-[8px] font-semibold uppercase tracking-[0.18em] text-[#83908a]">
              CMS Admin
            </div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-5">

        <div className="mb-3 px-3 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#9aa39f]">
          Menu Utama
        </div>

        <div className="space-y-1">
          {menuItems.map((item) => {
            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  group
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  px-3
                  py-2.5
                  text-[12px]
                  font-medium
                  transition-all
                  ${
                    active
                      ? "bg-[#e9f1ed] text-[#075b43]"
                      : "text-[#66716c] hover:bg-[#f4f7f5] hover:text-[#17201d]"
                  }
                `}
              >
                <span
                  className={`
                    flex h-5 w-5 items-center justify-center
                    ${
                      active
                        ? "text-[#075b43]"
                        : "text-[#87928d] group-hover:text-[#075b43]"
                    }
                  `}
                >
                  <span className="h-[17px] w-[17px]">
                    {item.icon}
                  </span>
                </span>

                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom */}
      <div className="border-t border-[#edf1ef] p-3">

        <Link
          href="/"
          target="_blank"
          className="
            mb-1
            flex
            items-center
            gap-3
            rounded-xl
            px-3
            py-2.5
            text-[12px]
            font-medium
            text-[#66716c]
            transition-colors
            hover:bg-[#f4f7f5]
            hover:text-[#17201d]
          "
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M14 5H19V10M19 5L11 13"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19 14V18C19 19.1 18.1 20 17 20H6C4.9 20 4 19.1 4 18V7C4 5.9 4.9 5 6 5H10"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
          </svg>

          Lihat Website
        </Link>

        <button
          type="button"
          onClick={handleLogout}
          className="
            flex
            w-full
            items-center
            gap-3
            rounded-xl
            px-3
            py-2.5
            text-left
            text-[12px]
            font-medium
            text-[#9a625d]
            transition-colors
            hover:bg-[#fff5f3]
            hover:text-[#a63d32]
          "
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M10 5H6C4.9 5 4 5.9 4 7V17C4 18.1 4.9 19 6 19H10"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
            <path
              d="M14 8L18 12L14 16M18 12H9"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          Keluar
        </button>
      </div>
    </aside>
  );
}