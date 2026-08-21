"use client";

import { useEffect, useState } from "react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import { getEvents, type EventData } from "@/lib/firebase/events";

/* =========================================================
   FEATURED EVENT
========================================================= */

function FeaturedEvent({ event }: { event: EventData }) {
  const coverPhoto = event.foto?.length > 0 ? event.foto[0] : "";

  return (
    <article className="overflow-hidden rounded-[28px] border border-black/[0.05] bg-[#f5f8f6] transition-all duration-300 dark:border-white/[0.07] dark:bg-[#12221b] lg:grid lg:grid-cols-[1.15fr_0.85fr]">
      {/* IMAGE */}
      <div className="relative min-h-[320px] overflow-hidden bg-[#e9f1ed] sm:min-h-[380px] lg:min-h-[460px]">
        {coverPhoto ? (
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105 dark:brightness-[0.65]"
            style={{ backgroundImage: `url("${coverPhoto}")` }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-[#e9f1ed] dark:bg-[#193027]">
            <svg
              width="52"
              height="52"
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

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent" />

        {/* Photo count */}
        {event.foto?.length > 1 && (
          <div className="absolute bottom-5 right-5 rounded-full bg-black/45 px-3 py-1.5 text-[10px] font-medium text-white backdrop-blur-sm">
            {event.foto.length} foto
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="flex flex-col justify-center p-7 sm:p-9 lg:p-12">
        {/* Label */}
        <span className="w-fit rounded-full bg-[#e9f1ed] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-[#075b43] dark:bg-[#193a2e] dark:text-[#9de0bf]">
          Kegiatan Kampung
        </span>

        {/* Title */}
        <h2 className="mt-5 text-[28px] font-semibold leading-[1.2] tracking-[-0.04em] text-[#17201d] dark:text-[#edf5f0] sm:text-[32px]">
          {event.judul}
        </h2>

        {/* Description */}
        {event.deskripsi && (
          <p className="mt-4 line-clamp-4 text-[13px] leading-[1.8] text-[#68716d] dark:text-[#9eaea6]">
            {event.deskripsi}
          </p>
        )}

        {/* INFORMATION */}
        <div className="mt-6 space-y-3 text-[11px] text-[#727b77] dark:text-[#91a29a]">
          {/* DATE */}
          <div className="flex items-center gap-2.5">
            <svg
              width="16"
              height="16"
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

            <span>{formatDate(event.tanggal)}</span>
          </div>

          {/* TIME */}
          {event.waktu && (
            <div className="flex items-center gap-2.5">
              <svg
                width="16"
                height="16"
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

          {/* LOCATION */}
          {event.lokasi && (
            <div className="flex items-center gap-2.5">
              <svg
                width="16"
                height="16"
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
          href={`/kegiatan/${event.slug}`}
          className="mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-[#003c2b] px-5 py-3 text-[12px] font-semibold text-white transition-all duration-300 hover:gap-3 hover:bg-[#075b43] dark:bg-[#075b43] dark:hover:bg-[#176d53]"
        >
          Lihat Detail
          <span>→</span>
        </a>
      </div>
    </article>
  );
}

/* =========================================================
   EVENT CARD
========================================================= */

function EventCard({ event }: { event: EventData }) {
  const coverPhoto = event.foto?.length > 0 ? event.foto[0] : "";

  return (
    <article className="group overflow-hidden rounded-[22px] border border-black/[0.05] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(0,0,0,0.06)] dark:border-white/[0.07] dark:bg-[#12221b] dark:hover:shadow-none">
      {/* IMAGE */}
      <div className="relative h-[210px] overflow-hidden bg-[#e9f1ed] dark:bg-[#193027]">
        {coverPhoto ? (
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 dark:brightness-[0.65]"
            style={{ backgroundImage: `url("${coverPhoto}")` }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-[#75a893] dark:text-[#4f806c]">
            <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
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

        <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />

        {/* Photo count */}
        {event.foto?.length > 1 && (
          <div className="absolute bottom-4 right-4 rounded-full bg-black/45 px-2.5 py-1 text-[9px] font-medium text-white backdrop-blur-sm">
            {event.foto.length} foto
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-6">
        {/* Date */}
        <div className="flex items-center gap-2 text-[10px] font-medium text-[#7d8782] dark:text-[#899a92]">
          <svg
            width="14"
            height="14"
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

          {formatDate(event.tanggal)}
        </div>

        {/* Title */}
        <h3 className="mt-4 line-clamp-2 text-[19px] font-semibold leading-[1.35] tracking-[-0.025em] text-[#17201d] dark:text-[#edf5f0]">
          {event.judul}
        </h3>

        {/* Description */}
        {event.deskripsi && (
          <p className="mt-3 line-clamp-3 text-[12px] leading-[1.75] text-[#727c77] dark:text-[#9eaea6]">
            {event.deskripsi}
          </p>
        )}

        {/* Location */}
        {event.lokasi && (
          <div className="mt-4 flex items-center gap-2 text-[10px] text-[#7d8782] dark:text-[#899a92]">
            <svg
              width="14"
              height="14"
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

            <span className="truncate">{event.lokasi}</span>
          </div>
        )}

        {/* Detail */}
        <a
          href={`/kegiatan/${event.slug}`}
          className="mt-6 inline-flex items-center gap-2 text-[11px] font-semibold text-[#075b43] transition-all duration-300 group-hover:gap-3 dark:text-[#75c6a4]"
        >
          Lihat Detail
          <span>→</span>
        </a>
      </div>
    </article>
  );
}

/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyState() {
  return (
    <div className="rounded-[28px] border border-black/[0.05] bg-[#f5f8f6] px-6 py-20 text-center dark:border-white/[0.07] dark:bg-[#12221b]">
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
        </svg>
      </div>

      <h3 className="mt-5 text-[16px] font-semibold text-[#27322e] dark:text-[#edf5f0]">
        Belum ada kegiatan
      </h3>

      <p className="mx-auto mt-2 max-w-[430px] text-[12px] leading-[1.8] text-[#7b8580] dark:text-[#91a29a]">
        Belum terdapat kegiatan Kampung Paluh yang sedang ditampilkan.
      </p>
    </div>
  );
}

/* =========================================================
   LOADING
========================================================= */

function LoadingState() {
  return (
    <div className="space-y-6">
      {/* Featured skeleton */}
      <div className="grid overflow-hidden rounded-[28px] border border-black/[0.05] bg-[#f5f8f6] lg:grid-cols-[1.15fr_0.85fr] dark:border-white/[0.07] dark:bg-[#12221b]">
        <div className="min-h-[320px] animate-pulse bg-[#e4ebe7] sm:min-h-[380px] lg:min-h-[460px] dark:bg-[#193027]" />

        <div className="flex flex-col justify-center p-8 lg:p-12">
          <div className="h-6 w-32 animate-pulse rounded-full bg-[#dfe8e3] dark:bg-[#193027]" />
          <div className="mt-5 h-9 w-3/4 animate-pulse rounded bg-[#dfe8e3] dark:bg-[#193027]" />
          <div className="mt-5 h-20 w-full animate-pulse rounded bg-[#e8eeeb] dark:bg-[#193027]" />
          <div className="mt-7 h-10 w-32 animate-pulse rounded-full bg-[#dfe8e3] dark:bg-[#193027]" />
        </div>
      </div>

      {/* Cards skeleton */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="overflow-hidden rounded-[22px] border border-black/[0.05] bg-white dark:border-white/[0.07] dark:bg-[#12221b]"
          >
            <div className="h-[210px] animate-pulse bg-[#e4ebe7] dark:bg-[#193027]" />

            <div className="p-6">
              <div className="h-3 w-20 animate-pulse rounded bg-[#e1e8e4] dark:bg-[#193027]" />
              <div className="mt-4 h-6 w-4/5 animate-pulse rounded bg-[#dfe8e3] dark:bg-[#193027]" />
              <div className="mt-3 h-12 w-full animate-pulse rounded bg-[#e8eeeb] dark:bg-[#193027]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   FORMAT DATE
========================================================= */

function formatDate(date: string) {
  if (!date) return "-";

  const parsedDate = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

/* =========================================================
   PAGE
========================================================= */

export default function KegiatanPage() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadEvents() {
      try {
        setLoading(true);
        setError("");

        const data = await getEvents();
        const activeEvents = data.filter((item) => item.status === "aktif");

        setEvents(activeEvents);
      } catch (error) {
        console.error("Gagal mengambil kegiatan:", error);
        setError("Kegiatan belum dapat dimuat. Silakan coba kembali.");
      } finally {
        setLoading(false);
      }
    }

    loadEvents();
  }, []);

  /*
   * Karena getEvents() sudah mengurutkan
   * tanggal terbaru, event pertama menjadi
   * featured event.
   */
  const featuredEvent = events.length > 0 ? events[0] : null;
  const otherEvents = events.length > 1 ? events.slice(1) : [];

  return (
    <div className="min-h-screen bg-white text-[#17201d] dark:bg-[#0a110e] dark:text-[#edf5f0]">
      {/* NAVBAR */}
      <Navbar />

      {/* MAIN */}
      <main>
        {/* HERO */}
        <section className="relative overflow-hidden bg-[#f7f9f7] pb-16 pt-36 transition-colors duration-500 dark:bg-[#0d1713] lg:pb-20 lg:pt-40">
          {/* Decorative background */}
          <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#dcebe3] blur-3xl dark:bg-[#193a2e]" />
          <div className="pointer-events-none absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-[#e9f1ed] blur-3xl dark:bg-[#12221b]" />

          <div className="relative mx-auto max-w-[1320px] px-6 lg:px-8">
            <div className="max-w-[720px]">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#2e8066] dark:text-[#75c6a4]">
                Kegiatan Kampung
              </span>

              <h1 className="mt-4 text-[38px] font-semibold leading-[1.1] tracking-[-0.05em] text-[#17201d] dark:text-[#edf5f0] sm:text-[48px] lg:text-[56px]">
                Kegiatan & Event
                <br />
                Kampung Paluh
              </h1>

              <p className="mt-5 max-w-[620px] text-[14px] leading-[1.9] text-[#68716d] dark:text-[#9eaea6] sm:text-[15px]">
                Temukan berbagai kegiatan, aktivitas masyarakat, dan event
                yang berlangsung di Kampung Paluh.
              </p>
            </div>
          </div>
        </section>

        {/* CONTENT */}
        <section className="bg-white py-16 transition-colors duration-500 dark:bg-[#0a110e] lg:py-20">
          <div className="mx-auto max-w-[1320px] px-6 lg:px-8">
            {/* ERROR */}
            {!loading && error && (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-[12px] text-red-700 dark:border-red-900/40 dark:bg-red-950/20 dark:text-red-300">
                {error}
              </div>
            )}

            {/* LOADING */}
            {loading && <LoadingState />}

            {/* EMPTY */}
            {!loading && !error && events.length === 0 && <EmptyState />}

            {/* EVENTS */}
            {!loading && !error && featuredEvent && (
              <div>
                {/* Featured */}
                <div>
                  <div className="mb-5">
                    <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#2e8066] dark:text-[#75c6a4]">
                      Kegiatan Terbaru
                    </span>
                  </div>

                  <FeaturedEvent event={featuredEvent} />
                </div>

                {/* Other Events */}
                {otherEvents.length > 0 && (
                  <div className="mt-20">
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                      <div>
                        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#2e8066] dark:text-[#75c6a4]">
                          Kegiatan Lainnya
                        </span>

                        <h2 className="mt-3 text-[28px] font-semibold tracking-[-0.04em] text-[#17201d] dark:text-[#edf5f0] sm:text-[34px]">
                          Aktivitas Kampung
                        </h2>

                        <p className="mt-3 max-w-[560px] text-[13px] leading-[1.8] text-[#68716d] dark:text-[#9eaea6]">
                          Lihat berbagai kegiatan lainnya yang telah dan
                          sedang berlangsung di Kampung Paluh.
                        </p>
                      </div>

                      <div className="text-[11px] font-medium text-[#8a9490] dark:text-[#71817a]">
                        {otherEvents.length} kegiatan
                      </div>
                    </div>

                    <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {otherEvents.map((event) => (
                        <EventCard key={event.id} event={event} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}