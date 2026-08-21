"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import { getNews } from "@/lib/firebase/news";
import type { NewsData } from "@/lib/firebase/news";

export default function DetailBeritaPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "";

  const [news, setNews] = useState<NewsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadNews() {
      try {
        setLoading(true);
        setError("");

        const data = await getNews();
        const found = data.find(
          (item) => item.slug === slug && item.status === "aktif"
        );

        if (!found) {
          setError("Berita tidak ditemukan.");
          return;
        }

        setNews(found);
      } catch (error) {
        console.error("Gagal mengambil detail berita:", error);
        setError("Berita gagal dimuat.");
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      loadNews();
    }
  }, [slug]);

  return (
    <div className="min-h-screen bg-[#f7f9f7] text-[#17201d] transition-colors duration-500 dark:bg-[#0d1713] dark:text-[#edf5f0]">
      <Navbar />

      <main>
        {loading && <LoadingState />}
        {!loading && error && <NotFoundState />}
        {!loading && news && <Article news={news} />}
      </main>

      <Footer />
    </div>
  );
}

/* =========================================================
   ARTICLE
========================================================= */

function Article({ news }: { news: NewsData }) {
  return (
    <>
      {/* HEADER */}
      <section className="bg-[#003c2b] pt-32 pb-16 dark:bg-[#0a1711] lg:pt-36 lg:pb-20">
        <div className="mx-auto max-w-[980px] px-6 lg:px-8">
          {/* BACK */}
          <a
            href="/berita"
            className="inline-flex items-center gap-2 text-[11px] font-semibold text-[#b9d9ca] transition-all hover:gap-3 hover:text-white"
          >
            <span>←</span>
            Kembali ke Berita
          </a>

          {/* CATEGORY */}
          <div className="mt-10">
            <span className="rounded-full bg-[#75c6a4]/15 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-[#9de0bf]">
              {news.kategori}
            </span>
          </div>

          {/* TITLE */}
          <h1 className="mt-5 max-w-[900px] text-[36px] font-semibold leading-[1.12] tracking-[-0.05em] text-white sm:text-[46px] lg:text-[56px]">
            {news.judul}
          </h1>

          {/* META */}
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-[#b8cec4]">
            {news.tanggal && <span>{formatDate(news.tanggal)}</span>}

            {news.penulis && (
              <>
                <span className="opacity-40">•</span>
                <span>Oleh {news.penulis}</span>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ARTICLE CONTENT */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-[980px] px-6 lg:px-8">
          {/* IMAGE */}
          {news.foto && (
            <div className="overflow-hidden rounded-[26px] bg-[#e9f1ed] shadow-[0_20px_60px_rgba(0,0,0,0.08)] dark:bg-[#193027] dark:shadow-none">
              <img
                src={news.foto}
                alt={news.judul}
                className="block max-h-[560px] w-full object-cover"
              />
            </div>
          )}

          {/* BODY */}
          <article className="mx-auto mt-12 max-w-[780px]">
            {/* SUMMARY */}
            {news.ringkasan && (
              <p className="border-l-[3px] border-[#2e8066] pl-5 text-[16px] font-medium leading-[1.8] text-[#47544e] dark:text-[#b7c8c0] sm:text-[18px]">
                {news.ringkasan}
              </p>
            )}

            {/* CONTENT */}
            <div className="mt-10 whitespace-pre-line text-[14px] leading-[2] text-[#4f5b56] dark:text-[#b2c0b9] sm:text-[15px]">
              {news.isi}
            </div>

            {/* BACK */}
            <div className="mt-14 border-t border-[#e2e9e5] pt-8 dark:border-white/[0.08]">
              <a
                href="/berita"
                className="inline-flex items-center gap-2 rounded-full bg-[#003c2b] px-5 py-3 text-[11px] font-semibold text-white transition-all hover:gap-3 hover:bg-[#075b43] dark:bg-[#075b43] dark:hover:bg-[#176d53]"
              >
                <span>←</span>
                Kembali ke Berita
              </a>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}

/* =========================================================
   LOADING
========================================================= */

function LoadingState() {
  return (
    <section className="min-h-[80vh] bg-[#f7f9f7] px-6 pb-20 pt-32 dark:bg-[#0d1713]">
      <div className="mx-auto max-w-[980px]">
        {/* Breadcrumb Skeleton */}
        <div className="h-4 w-32 animate-pulse rounded bg-[#dfe8e3] dark:bg-[#193027]" />

        {/* Category Skeleton */}
        <div className="mt-10 h-5 w-24 animate-pulse rounded-full bg-[#dfe8e3] dark:bg-[#193027]" />

        {/* Title Skeleton */}
        <div className="mt-5 h-14 w-[85%] animate-pulse rounded bg-[#dfe8e3] dark:bg-[#193027]" />
        <div className="mt-4 h-14 w-[65%] animate-pulse rounded bg-[#dfe8e3] dark:bg-[#193027]" />

        {/* Hero Image Skeleton */}
        <div className="mt-10 h-[420px] animate-pulse rounded-[26px] bg-[#e4ebe7] dark:bg-[#193027]" />

        {/* Content Skeleton */}
        <div className="mx-auto mt-12 max-w-[780px]">
          <div className="h-20 animate-pulse rounded bg-[#e8eeeb] dark:bg-[#193027]" />
          <div className="mt-8 h-48 animate-pulse rounded bg-[#e8eeeb] dark:bg-[#193027]" />
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   NOT FOUND
========================================================= */

function NotFoundState() {
  return (
    <section className="flex min-h-[75vh] items-center justify-center bg-[#f7f9f7] px-6 py-32 dark:bg-[#0d1713]">
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#e9f1ed] text-[#075b43] dark:bg-[#193a2e] dark:text-[#75c6a4]">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 4H18V20H6C4.9 20 4 19.1 4 18V6C4 4.9 4.9 4 6 4Z"
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

        <h1 className="mt-5 text-[22px] font-semibold tracking-[-0.03em] text-[#17201d] dark:text-[#edf5f0]">
          Berita Tidak Ditemukan
        </h1>

        <p className="mx-auto mt-3 max-w-[420px] text-[12px] leading-[1.8] text-[#7b8580] dark:text-[#91a29a]">
          Berita yang Anda cari tidak tersedia atau sudah tidak dipublikasikan.
        </p>

        <a
          href="/berita"
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#003c2b] px-5 py-3 text-[11px] font-semibold text-white transition-all hover:bg-[#075b43]"
        >
          ← Lihat Semua Berita
        </a>
      </div>
    </section>
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