"use client";

import { useEffect, useState } from "react";

import { getNews } from "@/lib/firebase/news";
import type { NewsData } from "@/lib/firebase/news";

export default function NewsSection() {
  const [news, setNews] = useState<NewsData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNews() {
      try {
        const data = await getNews();

        // Hanya tampilkan berita aktif
        // dan maksimal 3 berita terbaru.
        const activeNews = data
          .filter((item) => item.status === "aktif")
          .slice(0, 3);

        setNews(activeNews);
      } catch (error) {
        console.error("Gagal mengambil berita:", error);
      } finally {
        setLoading(false);
      }
    }

    loadNews();
  }, []);

  return (
    <section className="bg-[#f7f9f7] py-24 transition-colors duration-500 dark:bg-[#0d1713] lg:py-28">
      <div className="mx-auto max-w-[1320px] px-6 lg:px-8">
        {/* HEADING */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div className="max-w-[560px]">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#2e8066] dark:text-[#75c6a4]">
              Cerita Kampung
            </span>

            <h2 className="mt-3 text-[32px] font-semibold tracking-[-0.04em] text-[#17201d] dark:text-[#edf5f0] sm:text-[38px]">
              Cerita & Berita
            </h2>

            <p className="mt-4 text-[14px] leading-[1.8] text-[#68716d] dark:text-[#9eaea6]">
              Temukan cerita, informasi, dan berbagai aktivitas yang
              berkembang di Kampung Paluh.
            </p>
          </div>

          <a
            href="/berita"
            className="inline-flex w-fit items-center gap-2 text-[13px] font-semibold text-[#075b43] transition-all duration-300 hover:gap-3 dark:text-[#75c6a4]"
          >
            Lihat Semua Berita
            <span>→</span>
          </a>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <article
                key={item}
                className="rounded-[22px] border border-black/[0.05] bg-white p-6 dark:border-white/[0.07] dark:bg-[#12221b]"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="h-6 w-24 animate-pulse rounded-full bg-[#e5ece8] dark:bg-[#193027]" />
                  <div className="h-4 w-20 animate-pulse rounded bg-[#edf1ef] dark:bg-[#193027]" />
                </div>

                <div className="mt-7 h-16 w-full animate-pulse rounded bg-[#e9efeb] dark:bg-[#193027]" />
                <div className="mt-8 h-4 w-32 animate-pulse rounded bg-[#e9efeb] dark:bg-[#193027]" />
              </article>
            ))}
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && news.length === 0 && (
          <div className="mt-12 rounded-[22px] border border-black/[0.05] bg-white px-6 py-16 text-center dark:border-white/[0.07] dark:bg-[#12221b]">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e9f1ed] text-[#075b43] dark:bg-[#193a2e] dark:text-[#75c6a4]">
              <svg width="25" height="25" viewBox="0 0 24 24" fill="none">
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
                  d="M8 9H16M8 13H16M8 17H13"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <h3 className="mt-4 text-[15px] font-semibold text-[#27322e] dark:text-[#edf5f0]">
              Belum ada berita
            </h3>

            <p className="mx-auto mt-2 max-w-[430px] text-[12px] leading-[1.7] text-[#7b8580] dark:text-[#91a29a]">
              Berita yang berstatus aktif akan ditampilkan di halaman
              beranda.
            </p>
          </div>
        )}

        {/* NEWS */}
        {!loading && news.length > 0 && (
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {news.map((item) => (
              <article
                key={item.id}
                className="group rounded-[22px] border border-black/[0.05] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(0,0,0,0.06)] dark:border-white/[0.07] dark:bg-[#12221b] dark:hover:shadow-none"
              >
                {/* CATEGORY + DATE */}
                <div className="flex items-center justify-between gap-4">
                  <span className="rounded-full bg-[#e9f1ed] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#075b43] dark:bg-[#193a2e] dark:text-[#9de0bf]">
                    {item.kategori}
                  </span>

                  <span className="shrink-0 text-[10px] text-[#89938f] dark:text-[#71817a]">
                    {item.tanggal}
                  </span>
                </div>

                {/* TITLE */}
                <h3 className="mt-7 line-clamp-3 text-[19px] font-semibold leading-[1.35] tracking-[-0.025em] text-[#17201d] dark:text-[#edf5f0]">
                  {item.judul}
                </h3>

                {/* SUMMARY */}
                {item.ringkasan && (
                  <p className="mt-3 line-clamp-3 text-[12px] leading-[1.7] text-[#7a8580] dark:text-[#91a29a]">
                    {item.ringkasan}
                  </p>
                )}

                {/* AUTHOR */}
                {item.penulis && (
                  <div className="mt-4 text-[10px] text-[#9aa39f] dark:text-[#71817a]">
                    Oleh {item.penulis}
                  </div>
                )}

                {/* LINK */}
                <a
                  href={`/berita/${item.slug}`}
                  className="mt-8 inline-flex items-center gap-2 text-[12px] font-semibold text-[#075b43] transition-all duration-300 group-hover:gap-3 dark:text-[#75c6a4]"
                >
                  Baca Selengkapnya
                  <span>→</span>
                </a>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}