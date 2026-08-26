"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import { getUmkm } from "@/lib/firebase/umkm";
import type { UmkmData } from "@/lib/firebase/umkm";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const categories = [
  "Semua",
  "Kuliner",
  "Kerajinan",
  "Pertanian",
  "Perkebunan",
  "Peternakan",
  "Jasa",
  "Lainnya",
];

export default function UmkmPage() {
  const [data, setData] = useState<UmkmData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Semua");

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError("");

        const result = await getUmkm();

        setData(
          result.filter(
            (item) => item.status === "aktif"
          )
        );
      } catch (error) {
        console.error(
          "Gagal mengambil data UMKM:",
          error
        );

        setError(
          "Data UMKM belum dapat dimuat. Silakan coba beberapa saat lagi."
        );
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const filteredData = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return data.filter((item) => {
      const matchCategory =
        category === "Semua" ||
        item.kategori === category;

      const matchSearch =
        !keyword ||
        item.nama.toLowerCase().includes(keyword) ||
        item.kategori.toLowerCase().includes(keyword) ||
        item.deskripsi.toLowerCase().includes(keyword) ||
        item.pemilik.toLowerCase().includes(keyword);

      return matchCategory && matchSearch;
    });
  }, [data, search, category]);

  return (
    <div className="min-h-screen bg-[#f7f9f7] dark:bg-[#0d1713]">

      {/* =====================================================
          NAVBAR
      ====================================================== */}

      <Navbar />

      {/* =====================================================
          MAIN
      ====================================================== */}

      <main className="pb-24 pt-32">

        {/* ===================================================
            HERO
        ==================================================== */}

        <section className="px-6">
          <div className="mx-auto max-w-[1180px]">

            <div className="max-w-[720px]">

              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#2e8066]">
                Potensi Lokal
              </div>

              <h1 className="mt-4 text-[40px] font-semibold tracking-[-0.05em] text-[#17201d] sm:text-[52px] dark:text-[#edf5f0]">
                Produk Lokal
              </h1>

              <p className="mt-5 max-w-[650px] text-[14px] leading-[1.8] text-[#7a8580] dark:text-[#91a098]">
                Kenali berbagai UMKM dan pelaku usaha
                lokal yang berkembang di Kampung Paluh.
                Dukung produk lokal dan ekonomi masyarakat
                kampung.
              </p>

            </div>

          </div>
        </section>

        {/* ===================================================
            SEARCH & FILTER
        ==================================================== */}

        <section className="mt-12 px-6">
          <div className="mx-auto max-w-[1180px]">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              {/* SEARCH */}
              <div className="relative w-full lg:max-w-[360px]">
                <SearchIcon />
                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Cari UMKM..."
                  className="h-12 w-full rounded-xl border border-[#dfe6e2] bg-white pl-11 pr-4 text-[13px] text-[#17201d] outline-none placeholder:text-[#a0aaa5] focus:border-[#075b43] focus:ring-4 focus:ring-[#075b43]/10 dark:border-[#263a31] dark:bg-[#132019] dark:text-[#edf5f0] dark:placeholder:text-[#718078]"
                />
              </div>

              {/* CATEGORY */}
              <div className="scrollbar-hide flex gap-2 overflow-x-auto">
                {categories.map((item) => {
                  const active = category === item;

                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setCategory(item)}
                      className={`shrink-0 rounded-full px-4 py-2.5 text-[11px] font-medium transition-all
                        ${
                          active
                            ? "bg-[#075b43] text-white shadow-[0_6px_18px_rgba(7,91,67,0.15)]"
                            : "bg-white text-[#68736e] hover:bg-[#eaf1ed] hover:text-[#075b43] dark:bg-[#17261f] dark:text-[#9aa9a2] dark:hover:bg-[#21352c] dark:hover:text-[#9de0bf]"
                        }
                      `}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
        {/* ===================================================
            CONTENT
        ==================================================== */}

        <section className="mt-10 px-6">
          <div className="mx-auto max-w-[1180px]">

            {loading ? (
              <LoadingState />

            ) : error ? (
              <ErrorState message={error} />

            ) : filteredData.length === 0 ? (
              <EmptyState
                search={search}
                category={category}
                onReset={() => {
                  setSearch("");
                  setCategory("Semua");
                }}
              />

            ) : (
              <>

                <div className="mb-5 flex items-center justify-between">

                  <div>
                    <h2 className="text-[15px] font-semibold text-[#27322e] dark:text-[#edf5f0]">
                      UMKM Kampung Paluh
                    </h2>

                    <p className="mt-1 text-[11px] text-[#8a9490]">
                      {filteredData.length} usaha ditemukan
                    </p>
                  </div>

                </div>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

                  {filteredData.map((item) => (
                    <UmkmCard
                      key={item.id}
                      item={item}
                    />
                  ))}

                </div>

              </>
            )}

          </div>
        </section>

      </main>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <Footer />

    </div>
  );
}


/* =========================================================
   UMKM CARD
========================================================= */

function UmkmCard({
  item,
}: {
  item: UmkmData;
}) {
  return (
    <Link
      href={`/umkm/${item.slug}`}
      className="group block overflow-hidden rounded-[22px] border border-[#e4ebe7] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#cbdcd3] hover:shadow-[0_16px_40px_rgba(23,61,49,0.08)] dark:border-[#263a31] dark:bg-[#132019]"
    >
      {/* IMAGE */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#e9f1ed] dark:bg-[#193027]">
        {item.foto ? (
          <img
            src={item.foto}
            alt={item.nama}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <ImagePlaceholder />
        )}

        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[9px] font-semibold text-[#39705b] shadow-sm backdrop-blur-sm dark:bg-[#132019]/90 dark:text-[#9de0bf]">
          {item.kategori}
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5">
        <h3 className="text-[16px] font-semibold tracking-[-0.02em] text-[#27322e] dark:text-[#edf5f0]">
          {item.nama}
        </h3>

        {item.pemilik && (
          <p className="mt-1 text-[10px] text-[#8a9490]">
            Oleh {item.pemilik}
          </p>
        )}

        {item.deskripsi && (
          <p className="mt-4 line-clamp-3 text-[12px] leading-[1.7] text-[#727d78] dark:text-[#8b9992]">
            {item.deskripsi}
          </p>
        )}

        <div className="mt-5 space-y-2.5 border-t border-[#edf1ef] pt-4 dark:border-[#263a31]">
          {item.alamat && (
            <div className="flex items-start gap-2.5">
              <span className="mt-0.5 text-[#5d8976]">
                <LocationIcon />
              </span>

              <span className="text-[10px] leading-[1.6] text-[#7b8581] dark:text-[#899790]">
                {item.alamat}
              </span>
            </div>
          )}

          {item.kontak && (
            <div className="flex items-center gap-2.5">
              <span className="text-[#5d8976]">
                <PhoneIcon />
              </span>

              <span className="text-[10px] text-[#7b8581] dark:text-[#899790]">
                {item.kontak}
              </span>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="mt-5 flex h-10 w-full items-center justify-center rounded-xl bg-[#e9f3ed] text-[11px] font-semibold text-[#075b43] transition-colors group-hover:bg-[#dcebe3] dark:bg-[#193a2e] dark:text-[#9de0bf] dark:group-hover:bg-[#214637]">
          Lihat Detail UMKM
        </div>
      </div>
    </Link>
  );
}
/* =========================================================
   ICONS
========================================================= */

function LeafIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
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
  );
}

function SearchIcon() {
  return (
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
        d="M16 16L20 20"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M20 15.5C18.9 16 17.7 16.3 16.5 16.3C11.8 16.3 8 12.5 8 7.8C8 6.5 8.3 5.3 8.8 4.2C5.5 5.5 3.2 8.7 3.2 12.4C3.2 17.2 7.1 21 11.8 21C15.5 21 18.7 18.8 20 15.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* =========================================================
   IMAGE PLACEHOLDER
========================================================= */

function ImagePlaceholder() {
  return (
    <div className="flex h-full w-full items-center justify-center text-[#75a28f]">

      <svg
        width="42"
        height="42"
        viewBox="0 0 24 24"
        fill="none"
      >
        <rect
          x="4"
          y="4"
          width="16"
          height="16"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.4"
        />

        <circle
          cx="9"
          cy="9"
          r="1.5"
          stroke="currentColor"
          strokeWidth="1.4"
        />

        <path
          d="M5 17L10 12L13 15L15 13L19 17"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

    </div>
  );
}

/* =========================================================
   LOCATION ICON
========================================================= */

function LocationIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M20 10C20 15 12 21 12 21C12 21 4 15 4 10C4 5.6 7.6 3 12 3C16.4 3 20 5.6 20 10Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />

      <circle
        cx="12"
        cy="10"
        r="2.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

/* =========================================================
   PHONE ICON
========================================================= */

function PhoneIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M6.5 4H9L10.5 8L8.5 9.5C9.4 11.5 11 13.1 13 14L14.5 12L18.5 13.5V16C18.5 17.1 17.6 18 16.5 18C10.4 18 6 13.6 6 7.5C6 6.4 6.4 5.3 6.5 4Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* =========================================================
   LOADING
========================================================= */

function LoadingState() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="overflow-hidden rounded-[22px] border border-[#e4ebe7] bg-white dark:border-[#263a31] dark:bg-[#132019]"
        >
          <div className="aspect-[16/10] animate-pulse bg-[#e5ece8] dark:bg-[#193027]" />

          <div className="space-y-3 p-5">

            <div className="h-5 w-3/5 animate-pulse rounded bg-[#e5ece8] dark:bg-[#193027]" />

            <div className="h-3 w-2/5 animate-pulse rounded bg-[#e5ece8] dark:bg-[#193027]" />

            <div className="h-12 w-full animate-pulse rounded bg-[#e5ece8] dark:bg-[#193027]" />

          </div>
        </div>
      ))}

    </div>
  );
}

/* =========================================================
   EMPTY
========================================================= */

function EmptyState({
  search,
  category,
  onReset,
}: {
  search: string;
  category: string;
  onReset: () => void;
}) {
  return (
    <div className="flex min-h-[320px] flex-col items-center justify-center rounded-[22px] border border-[#e4ebe7] bg-white px-6 text-center dark:border-[#263a31] dark:bg-[#132019]">

      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e9f1ed] text-[#075b43] dark:bg-[#193a2e] dark:text-[#9de0bf]">
        <StoreIcon />
      </div>

      <h2 className="mt-4 text-[15px] font-semibold text-[#27322e] dark:text-[#edf5f0]">
        Tidak ada UMKM ditemukan
      </h2>

      <p className="mt-2 max-w-[400px] text-[11px] leading-[1.7] text-[#8a9490]">
        {search
          ? `Tidak ditemukan UMKM dengan kata kunci "${search}".`
          : `Belum ada UMKM aktif pada kategori ${category}.`}
      </p>

      <button
        type="button"
        onClick={onReset}
        className="mt-5 rounded-xl bg-[#e9f1ed] px-4 py-2.5 text-[11px] font-semibold text-[#075b43] transition-colors hover:bg-[#dcebe3] dark:bg-[#193a2e] dark:text-[#9de0bf]"
      >
        Tampilkan Semua
      </button>

    </div>
  );
}

/* =========================================================
   STORE ICON
========================================================= */

function StoreIcon() {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 24 24"
      fill="none"
    >
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
  );
}

/* =========================================================
   ERROR
========================================================= */

function ErrorState({
  message,
}: {
  message: string;
}) {
  return (
    <div className="flex min-h-[280px] flex-col items-center justify-center rounded-[22px] border border-red-100 bg-white px-6 text-center dark:border-red-900/30 dark:bg-[#132019]">

      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600 dark:bg-red-950/30">
        !
      </div>

      <h2 className="mt-4 text-[14px] font-semibold text-[#27322e] dark:text-[#edf5f0]">
        Data belum dapat ditampilkan
      </h2>

      <p className="mt-2 text-[11px] text-[#8a9490]">
        {message}
      </p>

    </div>
  );
}