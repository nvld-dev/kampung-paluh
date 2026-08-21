"use client";

import { useEffect, useState } from "react";

import { getEvents } from "@/lib/firebase/events";
import type { EventData } from "@/lib/firebase/events";

export default function EventsSection() {
  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEvent() {
      try {
        const data = await getEvents();

        // Ambil kegiatan aktif pertama.
        // getEvents() sudah mengurutkan berdasarkan
        // tanggal terbaru.
        const activeEvent =
          data.find((item) => item.status === "aktif") ?? null;

        setEvent(activeEvent);
      } catch (error) {
        console.error("Gagal mengambil kegiatan:", error);
      } finally {
        setLoading(false);
      }
    }

    loadEvent();
  }, []);

  /*
   * Karena satu kegiatan dapat memiliki banyak foto,
   * section beranda hanya menggunakan foto pertama
   * sebagai foto utama.
   */
  const firstPhoto = event?.foto?.[0] ?? "";

  return (
    <section className="bg-white py-24 transition-colors duration-500 dark:bg-[#0a110e] lg:py-28">
      <div className="mx-auto max-w-[1320px] px-6 lg:px-8">
        {/* HEADING */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#2e8066] dark:text-[#75c6a4]">
              Kegiatan Kampung
            </span>

            <h2 className="mt-3 text-[32px] font-semibold tracking-[-0.04em] text-[#17201d] dark:text-[#edf5f0] sm:text-[38px]">
              Event & Kegiatan
            </h2>

            <p className="mt-4 max-w-[560px] text-[14px] leading-[1.8] text-[#68716d] dark:text-[#9eaea6]">
              Lihat berbagai kegiatan dan aktivitas masyarakat Kampung Paluh.
            </p>
          </div>

          <a
            href="/kegiatan"
            className="inline-flex w-fit items-center gap-2 text-[13px] font-semibold text-[#075b43] transition-all duration-300 hover:gap-3 dark:text-[#75c6a4]"
          >
            Lihat Semua Kegiatan
            <span>→</span>
          </a>
        </div>

        {/* LOADING */}
        {loading && (
          <article className="mt-12 grid overflow-hidden rounded-[28px] border border-black/[0.05] bg-[#f5f8f6] lg:grid-cols-[1.15fr_0.85fr] dark:border-white/[0.07] dark:bg-[#12221b]">
            {/* Image Skeleton */}
            <div className="min-h-[340px] animate-pulse bg-[#e4ebe7] lg:min-h-[420px] dark:bg-[#193027]" />

            {/* Content Skeleton */}
            <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-14">
              <div className="h-6 w-32 animate-pulse rounded-full bg-[#dfe8e3] dark:bg-[#193027]" />
              <div className="mt-5 h-9 w-3/4 animate-pulse rounded bg-[#dfe8e3] dark:bg-[#193027]" />
              <div className="mt-5 h-20 w-full animate-pulse rounded bg-[#e8eeeb] dark:bg-[#193027]" />
              <div className="mt-7 h-10 w-32 animate-pulse rounded-full bg-[#dfe8e3] dark:bg-[#193027]" />
            </div>
          </article>
        )}

        {/* EMPTY STATE */}
        {!loading && !event && (
          <div className="mt-12 rounded-[28px] border border-black/[0.05] bg-[#f5f8f6] px-6 py-16 text-center dark:border-white/[0.07] dark:bg-[#12221b]">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e9f1ed] text-[#075b43] dark:bg-[#193a2e] dark:text-[#75c6a4]">
              <svg width="25" height="25" viewBox="0 0 24 24" fill="none">
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
            </div>

            <h3 className="mt-4 text-[15px] font-semibold text-[#27322e] dark:text-[#edf5f0]">
              Belum ada kegiatan
            </h3>

            <p className="mx-auto mt-2 max-w-[430px] text-[12px] leading-[1.7] text-[#7b8580] dark:text-[#91a29a]">
              Kegiatan kampung yang berstatus aktif akan ditampilkan di
              halaman beranda.
            </p>
          </div>
        )}

        {/* FEATURED EVENT */}
        {!loading && event && (
          <article className="mt-12 grid overflow-hidden rounded-[28px] border border-black/[0.05] bg-[#f5f8f6] lg:grid-cols-[1.15fr_0.85fr] dark:border-white/[0.07] dark:bg-[#12221b]">
            {/* IMAGE */}
            <div className="relative min-h-[340px] overflow-hidden lg:min-h-[420px]">
              {firstPhoto ? (
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105 dark:brightness-[0.65]"
                  style={{ backgroundImage: `url('${firstPhoto}')` }}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-[#e9f1ed] dark:bg-[#193027]">
                  <svg
                    width="50"
                    height="50"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-[#75a893] dark:text-[#4f806c]"
                  >
                    <rect
                      x="3"
                      y="5"
                      width="18"
                      height="16"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M8 3V7M16 3V7M3 10H21"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              )}

              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

              {/* Photo Count */}
              {event.foto.length > 1 && (
                <div className="absolute bottom-5 left-5 rounded-full bg-black/45 px-3 py-1.5 text-[10px] font-medium text-white backdrop-blur-sm">
                  {event.foto.length} foto
                </div>
              )}
            </div>

            {/* CONTENT */}
            <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-14">
              {/* Category */}
              <span className="w-fit rounded-full bg-[#e9f1ed] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-[#075b43] dark:bg-[#193a2e] dark:text-[#9de0bf]">
                Kegiatan Masyarakat
              </span>

              {/* Title */}
              <h3 className="mt-5 text-[30px] font-semibold leading-[1.2] tracking-[-0.04em] text-[#17201d] dark:text-[#edf5f0]">
                {event.judul}
              </h3>

              {/* Description */}
              {event.deskripsi && (
                <p className="mt-4 line-clamp-4 text-[14px] leading-[1.8] text-[#68716d] dark:text-[#9eaea6]">
                  {event.deskripsi}
                </p>
              )}

              {/* DATE / TIME / LOCATION */}
              <div className="mt-6 space-y-2 text-[11px] text-[#727b77] dark:text-[#91a29a]">
                {/* Date */}
                <div className="flex items-center gap-2">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="shrink-0 text-[#075b43] dark:text-[#75c6a4]"
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

                {/* Time */}
                {event.waktu && (
                  <div className="flex items-center gap-2">
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="shrink-0 text-[#075b43] dark:text-[#75c6a4]"
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

                {/* Location */}
                {event.lokasi && (
                  <div className="flex items-center gap-2">
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="shrink-0 text-[#075b43] dark:text-[#75c6a4]"
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

              {/* Button */}
              <a
                href="/kegiatan"
                className="mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-[#003c2b] px-5 py-3 text-[12px] font-semibold text-white transition-all duration-300 hover:gap-3 hover:bg-[#075b43] dark:bg-[#075b43] dark:hover:bg-[#176d53]"
              >
                Lihat Kegiatan
                <span>→</span>
              </a>
            </div>
          </article>
        )}
      </div>
    </section>
  );
}