"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import Link from "next/link";

import { getEvents } from "@/lib/firebase/events";
import type { EventData } from "@/lib/firebase/events";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function DetailKegiatanPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "";

  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState(0);

  useEffect(() => {
    async function loadEvent() {
      try {
        setLoading(true);

        const events = await getEvents();
        const foundEvent = events.find(
          (item) => item.slug === slug && item.status === "aktif"
        );

        setEvent(foundEvent ?? null);
        setSelectedPhoto(0);
      } catch (error) {
        console.error("Gagal mengambil detail kegiatan:", error);
        setEvent(null);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      loadEvent();
    }
  }, [slug]);

  /* =====================================================
     LOADING
  ====================================================== */

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0a110e]">
        <Navbar />

        <main className="mx-auto max-w-[1320px] px-6 pb-24 pt-32 lg:px-8">
          <div className="animate-pulse">
            <div className="h-3 w-32 rounded bg-[#e7ede9] dark:bg-[#193027]" />
            <div className="mt-8 h-12 w-3/4 rounded bg-[#e7ede9] dark:bg-[#193027]" />
            <div className="mt-4 h-5 w-1/2 rounded bg-[#edf2ef] dark:bg-[#193027]" />

            <div className="mt-10 grid gap-4 lg:grid-cols-[1.5fr_0.5fr]">
              <div className="h-[430px] rounded-[28px] bg-[#e7ede9] dark:bg-[#193027]" />

              <div className="hidden gap-4 lg:grid">
                <div className="rounded-[22px] bg-[#edf2ef] dark:bg-[#193027]" />
                <div className="rounded-[22px] bg-[#edf2ef] dark:bg-[#193027]" />
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  /* =====================================================
     NOT FOUND
  ====================================================== */

  if (!event) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#0a110e]">
        <Navbar />

        <main className="flex min-h-[70vh] items-center justify-center px-6 pt-24">
          <div className="max-w-[480px] text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#e9f1ed] text-[#075b43] dark:bg-[#193a2e] dark:text-[#75c6a4]">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <rect
                  x="3"
                  y="5"
                  width="18"
                  height="16"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="1.7"
                />
                <path
                  d="M8 3V7M16 3V7M3 10H21"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
                <path
                  d="M8 14H16M8 17H13"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <h1 className="mt-6 text-[24px] font-semibold tracking-[-0.03em] text-[#17201d] dark:text-[#edf5f0]">
              Kegiatan Tidak Ditemukan
            </h1>

            <p className="mt-3 text-[13px] leading-[1.8] text-[#737d78] dark:text-[#9eaea6]">
              Kegiatan yang Anda cari tidak tersedia atau sudah tidak aktif.
            </p>

            <Link
              href="/kegiatan"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#003c2b] px-5 py-3 text-[12px] font-semibold text-white transition-all hover:bg-[#075b43] hover:gap-3"
            >
              ← Kembali ke Kegiatan
            </Link>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  const photos = Array.isArray(event.foto)
    ? event.foto.filter(Boolean)
    : [];

  const activePhoto = photos[selectedPhoto] ?? "";

  /* =====================================================
     MAIN
  ====================================================== */

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a110e]">
      <Navbar />

      <main className="pb-24 pt-28 lg:pt-32">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-8">
          {/* BREADCRUMB */}
          <div className="flex items-center gap-2 text-[11px] text-[#89938f] dark:text-[#71817a]">
            <Link
              href="/"
              className="transition-colors hover:text-[#075b43] dark:hover:text-[#75c6a4]"
            >
              Beranda
            </Link>

            <span>/</span>

            <Link
              href="/kegiatan"
              className="transition-colors hover:text-[#075b43] dark:hover:text-[#75c6a4]"
            >
              Kegiatan
            </Link>

            <span>/</span>

            <span className="truncate text-[#53615b] dark:text-[#aab8b1]">
              {event.judul}
            </span>
          </div>

          {/* HEADER */}
          <div className="mt-8 max-w-[900px]">
            <span className="inline-flex rounded-full bg-[#e9f1ed] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-[#075b43] dark:bg-[#193a2e] dark:text-[#9de0bf]">
              Kegiatan Masyarakat
            </span>

            <h1 className="mt-5 text-[36px] font-semibold leading-[1.15] tracking-[-0.045em] text-[#17201d] dark:text-[#edf5f0] sm:text-[46px] lg:text-[54px]">
              {event.judul}
            </h1>

            {/* META */}
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-[12px] text-[#727b77] dark:text-[#91a29a]">
              {/* Tanggal */}
              <div className="flex items-center gap-2">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-[#075b43] dark:text-[#75c6a4]"
                >
                  <rect
                    x="3"
                    y="5"
                    width="18"
                    height="16"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />
                  <path
                    d="M8 3V7M16 3V7M3 10H21"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                </svg>

                <span>{event.tanggal}</span>
              </div>

              {/* Waktu */}
              {event.waktu && (
                <div className="flex items-center gap-2">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-[#075b43] dark:text-[#75c6a4]"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="9"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />
                    <path
                      d="M12 7V12L15 14"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <span>{event.waktu}</span>
                </div>
              )}

              {/* Lokasi */}
              {event.lokasi && (
                <div className="flex items-center gap-2">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-[#075b43] dark:text-[#75c6a4]"
                  >
                    <path
                      d="M20 10C20 15 12 21 12 21S4 15 4 10C4 5.6 7.6 3 12 3S20 5.6 20 10Z"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />
                    <circle
                      cx="12"
                      cy="10"
                      r="2.5"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />
                  </svg>

                  <span>{event.lokasi}</span>
                </div>
              )}
            </div>
          </div>

          {/* GALLERY */}
          {photos.length > 0 ? (
            <section className="mt-10">
              <div className="grid gap-4 lg:grid-cols-[1.5fr_0.5fr]">
                {/* MAIN PHOTO */}
                <div className="relative min-h-[360px] overflow-hidden rounded-[28px] bg-[#edf2ef] sm:min-h-[460px] lg:min-h-[520px]">
                  <img
                    src={activePhoto}
                    alt={event.judul}
                    className="h-full w-full object-cover"
                  />

                  {/* Counter */}
                  {photos.length > 1 && (
                    <div className="absolute bottom-5 left-5 rounded-full bg-black/45 px-3 py-1.5 text-[10px] font-medium text-white backdrop-blur-sm">
                      {selectedPhoto + 1} / {photos.length}
                    </div>
                  )}
                </div>

                {/* THUMBNAILS */}
                {photos.length > 1 && (
                  <div className="grid grid-cols-2 gap-4 lg:grid-cols-1">
                    {photos.slice(0, 4).map((photo, index) => (
                      <button
                        key={`${photo}-${index}`}
                        type="button"
                        onClick={() => setSelectedPhoto(index)}
                        className={`group relative min-h-[130px] overflow-hidden rounded-[20px] bg-[#edf2ef] outline-none ring-offset-2 transition-all lg:min-h-0 ${
                          selectedPhoto === index
                            ? "ring-2 ring-[#075b43] dark:ring-[#75c6a4]"
                            : "hover:ring-2 hover:ring-[#075b43]/30"
                        }`}
                      >
                        <img
                          src={photo}
                          alt={`${event.judul} - Foto ${index + 1}`}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />

                        {selectedPhoto === index && (
                          <div className="absolute inset-0 bg-[#075b43]/10" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* EXTRA PHOTOS */}
              {photos.length > 4 && (
                <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                  {photos.slice(4).map((photo, index) => {
                    const actualIndex = index + 4;

                    return (
                      <button
                        key={`${photo}-${actualIndex}`}
                        type="button"
                        onClick={() => setSelectedPhoto(actualIndex)}
                        className="group relative aspect-[4/3] overflow-hidden rounded-[20px] bg-[#edf2ef]"
                      >
                        <img
                          src={photo}
                          alt={`${event.judul} - Foto ${actualIndex + 1}`}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </button>
                    );
                  })}
                </div>
              )}
            </section>
          ) : (
            <div className="mt-10 flex min-h-[300px] items-center justify-center rounded-[28px] bg-[#f5f8f6] dark:bg-[#12221b]">
              <div className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e9f1ed] text-[#075b43] dark:bg-[#193a2e] dark:text-[#75c6a4]">
                  <svg width="25" height="25" viewBox="0 0 24 24" fill="none">
                    <rect
                      x="4"
                      y="4"
                      width="16"
                      height="16"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />
                    <circle
                      cx="9"
                      cy="9"
                      r="1.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M5 17L10 12L13 15L15 13L19 17"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <p className="mt-4 text-[12px] text-[#89938f] dark:text-[#91a29a]">
                  Belum ada foto kegiatan.
                </p>
              </div>
            </div>
          )}

          {/* CONTENT */}
          <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_300px]">
            {/* DESCRIPTION */}
            <article>
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#2e8066] dark:text-[#75c6a4]">
                Tentang Kegiatan
              </div>

              <h2 className="mt-3 text-[26px] font-semibold tracking-[-0.035em] text-[#17201d] dark:text-[#edf5f0]">
                {event.judul}
              </h2>

              <div className="mt-6 whitespace-pre-line text-[14px] leading-[2] text-[#68716d] dark:text-[#9eaea6]">
                {event.deskripsi || "Deskripsi kegiatan belum tersedia."}
              </div>
            </article>

            {/* INFO CARD */}
            <aside>
              <div className="rounded-[22px] border border-black/[0.05] bg-[#f5f8f6] p-6 dark:border-white/[0.07] dark:bg-[#12221b]">
                <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#2e8066] dark:text-[#75c6a4]">
                  Informasi
                </div>

                <div className="mt-5 space-y-5">
                  <InfoItem label="Tanggal" value={event.tanggal} />

                  {event.waktu && (
                    <InfoItem label="Waktu" value={event.waktu} />
                  )}

                  {event.lokasi && (
                    <InfoItem label="Lokasi" value={event.lokasi} />
                  )}

                  <InfoItem
                    label="Status"
                    value={event.status === "aktif" ? "Aktif" : "Nonaktif"}
                  />
                </div>
              </div>

              <Link
                href="/kegiatan"
                className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-[#dfe6e2] px-5 py-3 text-[11px] font-semibold text-[#53615b] transition-all hover:border-[#075b43] hover:text-[#075b43] dark:border-white/[0.1] dark:text-[#aab8b1] dark:hover:border-[#75c6a4] dark:hover:text-[#75c6a4]"
              >
                ← Semua Kegiatan
              </Link>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

/* =========================================================
   INFO ITEM
========================================================= */

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[9px] font-semibold uppercase tracking-[0.12em] text-[#929c97] dark:text-[#71817a]">
        {label}
      </div>

      <div className="mt-1.5 text-[12px] font-medium leading-[1.6] text-[#37413d] dark:text-[#d3dfd8]">
        {value}
      </div>
    </div>
  );
}