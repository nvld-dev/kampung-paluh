"use client";

import { useEffect, useState } from "react";

import {
  getUmkm,
  UmkmData,
} from "@/lib/firebase/umkm";

import {
  getProducts,
  ProductData,
} from "@/lib/firebase/products";


import {
  getEvents,
  EventData,
} from "@/lib/firebase/events";

import {
  getNews,
  NewsData,
} from "@/lib/firebase/news";

export default function AdminDashboardPage() {
  const [umkm, setUmkm] = useState<UmkmData[]>([]);
  const [products, setProducts] =
    useState<ProductData[]>([]);
  const [events, setEvents] =
    useState<EventData[]>([]);
  const [news, setNews] =
    useState<NewsData[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
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

      setUmkm(umkmData);
      setProducts(productData);
      setEvents(eventData);
      setNews(newsData);
    } catch (error) {
      console.error(
        "Gagal mengambil data dashboard:",
        error
      );

      setError(
        "Data dashboard gagal dimuat."
      );
    } finally {
      setLoading(false);
    }
  }

  const stats = [
    {
      label: "UMKM",
      value: umkm.length,
      description: "Data pelaku usaha",
    },
    {
      label: "Produk",
      value: products.length,
      description: "Produk lokal",
    },
    {
      label: "Kegiatan",
      value: events.filter(
        (item) => item.status === "aktif"
      ).length,
      description: "Event kampung aktif",
    },
    {
      label: "Berita",
      value: news.filter(
        (item) => item.status === "aktif"
      ).length,
      description: "Cerita & berita aktif",
    },
  ];

  return (
    <div className="p-6 lg:p-8">

      {/* =====================================================
          HEADING
      ====================================================== */}

      <div>
        <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#2e8066]">
          Dashboard
        </div>

        <h1 className="mt-2 text-[28px] font-semibold tracking-[-0.04em] text-[#17201d]">
          Ringkasan Kampung Paluh
        </h1>

        <p className="mt-2 max-w-[600px] text-[13px] leading-[1.7] text-[#7a8580]">
          Kelola dan pantau konten Portal Promosi
          Kampung Paluh dari satu tempat.
        </p>
      </div>

      {/* =====================================================
          ERROR
      ====================================================== */}

      {error && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[12px] text-red-700">
          {error}
        </div>
      )}

      {/* =====================================================
          STATS
      ====================================================== */}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {stats.map((stat) => (
          <div
            key={stat.label}
            className="
              rounded-2xl
              border
              border-[#e4ebe7]
              bg-white
              p-5
              shadow-[0_4px_20px_rgba(20,50,40,0.03)]
            "
          >

            <div className="text-[11px] font-medium text-[#7e8984]">
              {stat.label}
            </div>

            <div className="mt-3 text-[28px] font-semibold tracking-[-0.04em] text-[#075b43]">

              {loading ? (
                <span className="inline-block h-8 w-10 animate-pulse rounded-lg bg-[#e9f1ed]" />
              ) : (
                stat.value
              )}

            </div>

            <div className="mt-1 text-[10px] text-[#9aa39f]">
              {stat.description}
            </div>

          </div>
        ))}

      </div>

      {/* =====================================================
          CONTENT OVERVIEW
      ====================================================== */}

      <div className="mt-6 grid gap-4 lg:grid-cols-2">

        {/* Produk */}

        <div className="rounded-2xl border border-[#e4ebe7] bg-white p-6">

          <div className="flex items-start justify-between">

            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#2e8066]">
                Produk
              </div>

              <h2 className="mt-2 text-[16px] font-semibold text-[#27322e]">
                Produk Lokal
              </h2>
            </div>

            <a
              href="/admin/produk"
              className="text-[10px] font-semibold text-[#075b43] hover:text-[#176d53]"
            >
              Kelola →
            </a>

          </div>

          <div className="mt-5 grid grid-cols-3 gap-3">

            <div className="rounded-xl bg-[#f6f9f7] p-4">
              <div className="text-[9px] uppercase tracking-[0.1em] text-[#8a9490]">
                Total
              </div>

              <div className="mt-2 text-[21px] font-semibold text-[#075b43]">
                {loading
                  ? "-"
                  : products.length}
              </div>
            </div>

            <div className="rounded-xl bg-[#f6f9f7] p-4">
              <div className="text-[9px] uppercase tracking-[0.1em] text-[#8a9490]">
                UMKM
              </div>

              <div className="mt-2 text-[21px] font-semibold text-[#075b43]">
                {loading
                  ? "-"
                  : products.filter(
                      (item) =>
                        item.tipe === "umkm"
                    ).length}
              </div>
            </div>

            <div className="rounded-xl bg-[#f6f9f7] p-4">
              <div className="text-[9px] uppercase tracking-[0.1em] text-[#8a9490]">
                Lokal
              </div>

              <div className="mt-2 text-[21px] font-semibold text-[#075b43]">
                {loading
                  ? "-"
                  : products.filter(
                      (item) =>
                        item.tipe !== "umkm"
                    ).length}
              </div>
            </div>

          </div>

        </div>

        {/* Kegiatan */}

        <div className="rounded-2xl border border-[#e4ebe7] bg-white p-6">

          <div className="flex items-start justify-between">

            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#2e8066]">
                Kegiatan
              </div>

              <h2 className="mt-2 text-[16px] font-semibold text-[#27322e]">
                Event Kampung
              </h2>
            </div>

            <a
              href="/admin/kegiatan"
              className="text-[10px] font-semibold text-[#075b43] hover:text-[#176d53]"
            >
              Kelola →
            </a>

          </div>

          <div className="mt-5 grid grid-cols-3 gap-3">

            <div className="rounded-xl bg-[#f6f9f7] p-4">
              <div className="text-[9px] uppercase tracking-[0.1em] text-[#8a9490]">
                Total
              </div>

              <div className="mt-2 text-[21px] font-semibold text-[#075b43]">
                {loading
                  ? "-"
                  : events.length}
              </div>
            </div>

            <div className="rounded-xl bg-[#f6f9f7] p-4">
              <div className="text-[9px] uppercase tracking-[0.1em] text-[#8a9490]">
                Aktif
              </div>

              <div className="mt-2 text-[21px] font-semibold text-[#075b43]">
                {loading
                  ? "-"
                  : events.filter(
                      (item) =>
                        item.status ===
                        "aktif"
                    ).length}
              </div>
            </div>

            <div className="rounded-xl bg-[#f6f9f7] p-4">
              <div className="text-[9px] uppercase tracking-[0.1em] text-[#8a9490]">
                Mendatang
              </div>

              <div className="mt-2 text-[21px] font-semibold text-[#075b43]">
                {loading
                  ? "-"
                  : events.filter(
                      (item) =>
                        item.status ===
                          "aktif" &&
                        item.tanggal >=
                          new Date()
                            .toISOString()
                            .split("T")[0]
                    ).length}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* =====================================================
          WELCOME
      ====================================================== */}

      <div className="mt-6 rounded-2xl border border-[#dce9e2] bg-[#e9f1ed] p-6">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <div className="text-[13px] font-semibold text-[#174f3d]">
              CMS siap digunakan
            </div>

            <p className="mt-1 max-w-[650px] text-[11px] leading-[1.7] text-[#668077]">
              Mulai kelola profil Kampung Paluh,
              UMKM, produk lokal, kegiatan,
              fasilitas, dan berita.
            </p>

          </div>

          <a
            href="/admin/profil"
            className="
              inline-flex
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-[#003c2b]
              px-5
              py-3
              text-[11px]
              font-semibold
              text-white
              transition-colors
              hover:bg-[#075b43]
            "
          >
            Kelola Profil
            <span className="ml-2">
              →
            </span>
          </a>

        </div>

      </div>

    </div>
  );
}