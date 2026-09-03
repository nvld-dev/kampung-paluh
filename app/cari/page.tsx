"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import { getNews } from "@/lib/firebase/news";
import type { NewsData } from "@/lib/firebase/news";

import { getEvents } from "@/lib/firebase/events";
import type { EventData } from "@/lib/firebase/events";

import { getUmkm } from "@/lib/firebase/umkm";
import type { UmkmData } from "@/lib/firebase/umkm";

import { getProducts } from "@/lib/firebase/products";
import type { ProductData } from "@/lib/firebase/products";

type SearchResult = {
  id: string;
  type: "UMKM" | "Produk" | "Kegiatan" | "Berita";
  title: string;
  description: string;
  image: string;
  href: string;
  meta?: string;
};

export default function CariPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q")?.trim() ?? "";

  const [umkm, setUmkm] = useState<UmkmData[]>([]);
  const [products, setProducts] = useState<ProductData[]>([]);
  const [events, setEvents] = useState<EventData[]>([]);
  const [news, setNews] = useState<NewsData[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError("");

        const [
          umkmData,
          productData,
          eventData,
          newsData,
        ] = await Promise.all([
          getUmkm(),
          getProducts(),
          getEvents(),
          getNews(),
        ]);

        setUmkm(
          umkmData.filter((item) => item.status === "aktif")
        );

        setProducts(
          productData.filter((item) => item.status === "aktif")
        );

        setEvents(
          eventData.filter((item) => item.status === "aktif")
        );

        setNews(
          newsData.filter((item) => item.status === "aktif")
        );
      } catch (err) {
        console.error("Gagal melakukan pencarian:", err);
        setError("Pencarian gagal dimuat. Silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const results = useMemo<SearchResult[]>(() => {
    if (!query) return [];

    const keyword = query.toLowerCase();

    const result: SearchResult[] = [];

    // UMKM
    umkm.forEach((item) => {
      const searchable = [
        item.nama,
        item.pemilik,
        item.kategori,
        item.deskripsi,
        item.alamat,
      ]
        .join(" ")
        .toLowerCase();

      if (!searchable.includes(keyword)) return;

      result.push({
        id: `umkm-${item.id}`,
        type: "UMKM",
        title: item.nama,
        description:
          item.deskripsi || "Informasi UMKM Kampung Paluh.",
        image: item.foto,
        href: item.slug ? `/umkm/${item.slug}` : "/umkm",
        meta: item.kategori,
      });
    });

    // PRODUK
    products.forEach((item) => {
      const searchable = [
        item.nama,
        item.penjual,
        item.kategori,
        item.deskripsi,
        item.tipe,
      ]
        .join(" ")
        .toLowerCase();

      if (!searchable.includes(keyword)) return;

      result.push({
        id: `produk-${item.id}`,
        type: "Produk",
        title: item.nama,
        description:
          item.deskripsi || "Produk lokal Kampung Paluh.",
        image: item.foto,
        href: "/umkm",
        meta: item.kategori,
      });
    });

    // KEGIATAN
    events.forEach((item) => {
      const searchable = [
        item.judul,
        item.deskripsi,
        item.lokasi,
        item.tanggal,
      ]
        .join(" ")
        .toLowerCase();

      if (!searchable.includes(keyword)) return;

      result.push({
        id: `kegiatan-${item.id}`,
        type: "Kegiatan",
        title: item.judul,
        description:
          item.deskripsi || "Informasi kegiatan Kampung Paluh.",
        image: item.foto?.[0] ?? "",
        href: `/kegiatan/${item.slug}`,
        meta: item.tanggal,
      });
    });

    // BERITA
    news.forEach((item) => {
      const searchable = [
        item.judul,
        item.ringkasan,
        item.isi,
        item.kategori,
        item.penulis,
      ]
        .join(" ")
        .toLowerCase();

      if (!searchable.includes(keyword)) return;

      result.push({
        id: `berita-${item.id}`,
        type: "Berita",
        title: item.judul,
        description:
          item.ringkasan || "Informasi Kampung Paluh.",
        image: item.foto,
        href: `/berita/${item.slug}`,
        meta: item.kategori,
      });
    });

    return result;
  }, [query, umkm, products, events, news]);

  return (
    <div className="min-h-screen bg-white text-[#17201d] dark:bg-[#0d1713] dark:text-[#edf5f0]">
      <Navbar />

      <main className="pb-24 pt-32 lg:pt-40">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-8">

          {/* HEADER */}
          <div className="max-w-[760px]">
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#2e8066] dark:text-[#75c6a4]">
              Pencarian
            </div>

            <h1 className="mt-4 text-[38px] font-semibold leading-[1.1] tracking-[-0.045em] sm:text-[48px]">
              Hasil Pencarian
            </h1>

            {query ? (
              <p className="mt-4 text-[14px] leading-[1.8] text-[#68736e] dark:text-[#9eaea6]">
                Menampilkan hasil untuk{" "}
                <span className="font-semibold text-[#075b43] dark:text-[#9de0bf]">
                  "{query}"
                </span>
              </p>
            ) : (
              <p className="mt-4 text-[14px] leading-[1.8] text-[#68736e] dark:text-[#9eaea6]">
                Cari informasi mengenai Kampung Paluh.
              </p>
            )}
          </div>

          {/* SEARCH BOX */}
          <form
            action="/cari"
            method="GET"
            className="mt-8 flex max-w-[680px] items-center gap-2 rounded-2xl border border-[#dfe7e2] bg-[#f7f9f7] p-2 dark:border-white/[0.08] dark:bg-[#12221b]"
          >
            <div className="flex h-11 flex-1 items-center gap-3 px-3">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                className="shrink-0 text-[#89938f]"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="6.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />

                <path
                  d="M16 16L20 20"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>

              <input
                name="q"
                defaultValue={query}
                placeholder="Cari UMKM, produk, kegiatan, berita..."
                className="w-full bg-transparent text-[13px] text-[#17201d] outline-none placeholder:text-[#9aa39f] dark:text-[#edf5f0]"
              />
            </div>

            <button
              type="submit"
              className="rounded-xl bg-[#003c2b] px-5 py-3 text-[12px] font-semibold text-white transition-colors hover:bg-[#075b43]"
            >
              Cari
            </button>
          </form>

          {/* ERROR */}
          {error && (
            <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-[12px] text-red-700">
              {error}
            </div>
          )}

          {/* LOADING */}
          {loading && query && (
            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-[280px] animate-pulse rounded-[22px] bg-[#edf2ef] dark:bg-[#193027]"
                />
              ))}
            </div>
          )}

          {/* RESULTS */}
          {!loading && !error && query && results.length > 0 && (
            <>
              <div className="mt-12 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#89938f]">
                {results.length} hasil ditemukan
              </div>

              <div className="mt-5 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {results.map((item) => (
                  <SearchCard
                    key={item.id}
                    item={item}
                  />
                ))}
              </div>
            </>
          )}

          {/* EMPTY */}
          {!loading &&
            !error &&
            query &&
            results.length === 0 && (
              <div className="mt-12 flex min-h-[280px] items-center justify-center rounded-[24px] bg-[#f7f9f7] dark:bg-[#12221b]">
                <div className="text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e9f1ed] text-[#075b43] dark:bg-[#193a2e] dark:text-[#75c6a4]">
                    <svg
                      width="25"
                      height="25"
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
                  </div>

                  <h2 className="mt-4 text-[16px] font-semibold">
                    Tidak ada hasil
                  </h2>

                  <p className="mt-2 text-[12px] text-[#7b8580] dark:text-[#91a29a]">
                    Tidak ditemukan informasi yang sesuai dengan
                    pencarian "{query}".
                  </p>
                </div>
              </div>
            )}

          {/* INITIAL */}
          {!loading && !query && (
            <div className="mt-12 rounded-[24px] bg-[#f7f9f7] p-10 dark:bg-[#12221b]">
              <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#2e8066] dark:text-[#75c6a4]">
                Jelajahi Kampung Paluh
              </div>

              <p className="mt-3 max-w-[550px] text-[13px] leading-[1.8] text-[#68716d] dark:text-[#9eaea6]">
                Gunakan pencarian untuk menemukan UMKM, produk lokal,
                kegiatan, dan berita Kampung Paluh.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

/* =========================================================
   SEARCH CARD
========================================================= */

function SearchCard({
  item,
}: {
  item: SearchResult;
}) {
  return (
    <Link
      href={item.href}
      className="group overflow-hidden rounded-[22px] border border-black/[0.05] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(0,0,0,0.06)] dark:border-white/[0.07] dark:bg-[#12221b]"
    >
      <div className="relative h-[190px] overflow-hidden bg-[#e9f1ed] dark:bg-[#193027]">
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-[#75a28f]">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
            >
              <rect
                x="3"
                y="4"
                width="18"
                height="17"
                rx="2"
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

        <div className="absolute left-4 top-4">
          <span className="rounded-full bg-white/95 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#075b43]">
            {item.type}
          </span>
        </div>
      </div>

      <div className="p-5">
        {item.meta && (
          <div className="text-[10px] font-medium text-[#89938f] dark:text-[#71817a]">
            {item.meta}
          </div>
        )}

        <h2 className="mt-2 line-clamp-2 text-[18px] font-semibold leading-[1.35] tracking-[-0.025em]">
          {item.title}
        </h2>

        <p className="mt-3 line-clamp-2 text-[12px] leading-[1.8] text-[#68716d] dark:text-[#9eaea6]">
          {item.description}
        </p>

        <div className="mt-5 text-[11px] font-semibold text-[#075b43] dark:text-[#75c6a4]">
          Lihat Selengkapnya →
        </div>
      </div>
    </Link>
  );
}