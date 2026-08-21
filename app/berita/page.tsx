"use client";

import { useEffect, useMemo, useState } from "react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import { getNews } from "@/lib/firebase/news";
import type { NewsCategory, NewsData } from "@/lib/firebase/news";

const categories: Array<"Semua" | NewsCategory> = [
  "Semua",
  "Kegiatan",
  "UMKM",
  "Produk Lokal",
  "Kampung",
  "Pengumuman",
  "Lainnya",
];

export default function BeritaPage() {
  const [news, setNews] = useState<NewsData[]>([]);
  const [category, setCategory] = useState<"Semua" | NewsCategory>("Semua");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadNews() {
      try {
        setLoading(true);
        setError("");

        const data = await getNews();
        setNews(data.filter((item) => item.status === "aktif"));
      } catch (error) {
        console.error("Gagal mengambil berita:", error);
        setError("Berita gagal dimuat. Silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    }

    loadNews();
  }, []);

  const filteredNews = useMemo(() => {
    if (category === "Semua") {
      return news;
    }

    return news.filter((item) => item.kategori === category);
  }, [news, category]);

  return (
    <div className="min-h-screen bg-[#f7f9f7] text-[#17201d] transition-colors duration-500 dark:bg-[#0d1713] dark:text-[#edf5f0]">
      <Navbar />

      <main>
        {/* HERO */}
        <section className="relative overflow-hidden bg-[#003c2b] pt-32 pb-20 dark:bg-[#0a1711]">
          {/* Decorative */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#2e8066]/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-[#75c6a4]/10 blur-3xl" />

          <div className="relative mx-auto max-w-[1320px] px-6 lg:px-8">
            <div className="max-w-[700px]">
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9de0bf]">
                Informasi Kampung
              </span>

              <h1 className="mt-4 text-[40px] font-semibold leading-[1.08] tracking-[-0.05em] text-white sm:text-[52px] lg:text-[58px]">
                Berita & Cerita
                <br />
                Kampung Paluh
              </h1>

              <p className="mt-6 max-w-[590px] text-[14px] leading-[1.85] text-[#c9ddd4]">
                Temukan informasi, cerita, kegiatan, dan berbagai kabar
                terbaru dari Kampung Paluh.
              </p>
            </div>
          </div>
        </section>

        {/* CONTENT */}
        <section className="py-20 lg:py-24">
          <div className="mx-auto max-w-[1320px] px-6 lg:px-8">
            {/* CATEGORY FILTER */}
            <div className="flex flex-wrap gap-2">
              {categories.map((item) => {
                const active = category === item;

                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setCategory(item)}
                    className={`rounded-full px-4 py-2.5 text-[11px] font-semibold transition-all ${
                      active
                        ? "bg-[#003c2b] text-white dark:bg-[#075b43]"
                        : "border border-[#dfe7e2] bg-white text-[#68736e] hover:border-[#bfcfc7] hover:text-[#075b43] dark:border-white/[0.08] dark:bg-[#12221b] dark:text-[#9eaea6]"
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>

            {/* ERROR */}
            {error && (
              <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-[12px] text-red-700">
                {error}
              </div>
            )}

            {/* LOADING */}
            {loading && <LoadingState />}

            {/* EMPTY */}
            {!loading && !error && filteredNews.length === 0 && (
              <EmptyState filtered={category !== "Semua"} />
            )}

            {/* NEWS */}
            {!loading && !error && filteredNews.length > 0 && (
              <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredNews.map((item) => (
                  <NewsCard key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

/* =========================================================
   NEWS CARD
========================================================= */

function NewsCard({ item }: { item: NewsData }) {
  return (
    <article className="group overflow-hidden rounded-[22px] border border-black/[0.05] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(0,0,0,0.06)] dark:border-white/[0.07] dark:bg-[#12221b] dark:hover:shadow-none">
      {/* IMAGE */}
      <div className="relative h-[220px] overflow-hidden bg-[#e9f1ed] dark:bg-[#193027]">
        {item.foto ? (
          <img
            src={item.foto}
            alt={item.judul}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[#75a28f] dark:text-[#4f806c]">
            <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
              <rect
                x="3"
                y="4"
                width="18"
                height="17"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <circle
                cx="8.5"
                cy="9"
                r="1.5"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M4 17L9 12L12 15L15 12L20 17"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}

        {/* CATEGORY */}
        <div className="absolute left-4 top-4">
          <span className="rounded-full bg-white/95 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#075b43] backdrop-blur-sm">
            {item.kategori}
          </span>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-6">
        {/* DATE */}
        <div className="text-[10px] font-medium text-[#89938f] dark:text-[#71817a]">
          {formatDate(item.tanggal)}
          {item.penulis ? ` · ${item.penulis}` : ""}
        </div>

        {/* TITLE */}
        <h2 className="mt-3 line-clamp-2 text-[19px] font-semibold leading-[1.35] tracking-[-0.025em] text-[#17201d] dark:text-[#edf5f0]">
          {item.judul}
        </h2>

        {/* SUMMARY */}
        <p className="mt-3 line-clamp-3 text-[12px] leading-[1.8] text-[#68716d] dark:text-[#9eaea6]">
          {item.ringkasan ||
            "Informasi selengkapnya mengenai berita Kampung Paluh."}
        </p>

        {/* LINK */}
        <a
          href={`/berita/${item.slug}`}
          className="mt-6 inline-flex items-center gap-2 text-[11px] font-semibold text-[#075b43] transition-all duration-300 group-hover:gap-3 dark:text-[#75c6a4]"
        >
          Baca Selengkapnya
          <span>→</span>
        </a>
      </div>
    </article>
  );
}

/* =========================================================
   LOADING
========================================================= */

function LoadingState() {
  return (
    <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div
          key={item}
          className="overflow-hidden rounded-[22px] border border-black/[0.05] bg-white dark:border-white/[0.07] dark:bg-[#12221b]"
        >
          <div className="h-[220px] animate-pulse bg-[#e4ebe7] dark:bg-[#193027]" />

          <div className="p-6">
            <div className="h-3 w-24 animate-pulse rounded bg-[#e4ebe7] dark:bg-[#193027]" />
            <div className="mt-4 h-6 w-full animate-pulse rounded bg-[#e4ebe7] dark:bg-[#193027]" />
            <div className="mt-3 h-12 w-full animate-pulse rounded bg-[#edf1ef] dark:bg-[#193027]" />
            <div className="mt-6 h-4 w-32 animate-pulse rounded bg-[#e4ebe7] dark:bg-[#193027]" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyState({ filtered }: { filtered: boolean }) {
  return (
    <div className="mt-10 flex min-h-[320px] flex-col items-center justify-center rounded-[24px] border border-black/[0.05] bg-white px-6 text-center dark:border-white/[0.07] dark:bg-[#12221b]">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e9f1ed] text-[#075b43] dark:bg-[#193a2e] dark:text-[#75c6a4]">
        <svg width="25" height="25" viewBox="0 0 24 24" fill="none">
          <path
            d="M4 5.5C4 4.67 4.67 4 5.5 4H18.5C19.33 4 20 4.67 20 5.5V18.5C20 19.33 19.33 20 18.5 20H5.5C4.67 20 4 19.33 4 18.5V5.5Z"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M8 9H16M8 13H14"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <h2 className="mt-4 text-[15px] font-semibold text-[#27322e] dark:text-[#edf5f0]">
        {filtered ? "Belum ada berita di kategori ini" : "Belum ada berita"}
      </h2>

      <p className="mt-2 max-w-[430px] text-[12px] leading-[1.7] text-[#7b8580] dark:text-[#91a29a]">
        {filtered
          ? "Coba pilih kategori lainnya untuk melihat berita yang tersedia."
          : "Berita Kampung Paluh akan ditampilkan di halaman ini setelah tersedia."}
      </p>
    </div>
  );
}

/* =========================================================
   DATE
========================================================= */

function formatDate(date: string) {
  if (!date) return "-";

  return new Date(`${date}T00:00:00`).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}