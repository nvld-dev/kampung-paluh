"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import {
  getUmkmBySlug,
  UmkmData,
} from "@/lib/firebase/umkm";

export default function UmkmDetailPage() {
  const params = useParams();

  const slug =
    typeof params.slug === "string"
      ? params.slug
      : "";

  const [umkm, setUmkm] =
    useState<UmkmData | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [selectedImage, setSelectedImage] =
    useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    async function loadData() {
      try {
        setLoading(true);
        setError("");

        const result =
          await getUmkmBySlug(slug);

        if (!result) {
          setError(
            "UMKM tidak ditemukan."
          );
          return;
        }

        setUmkm(result);
      } catch (error) {
        console.error(
          "Gagal mengambil detail UMKM:",
          error
        );

        setError(
          "Data UMKM gagal dimuat."
        );
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [slug]);

  /* =========================
     LOADING
  ========================= */

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f7f9f7] px-6 pb-20 pt-32 dark:bg-[#0d1713]">
        <div className="mx-auto max-w-[1100px]">

          <div className="animate-pulse">

            <div className="h-4 w-28 rounded bg-[#dfe8e3] dark:bg-[#193027]" />

            <div className="mt-8 h-[420px] rounded-[28px] bg-[#e4ebe7] dark:bg-[#193027]" />

            <div className="mt-8 h-8 w-[55%] rounded bg-[#dfe8e3] dark:bg-[#193027]" />

            <div className="mt-4 h-5 w-[35%] rounded bg-[#dfe8e3] dark:bg-[#193027]" />

            <div className="mt-8 h-32 rounded-2xl bg-[#e8eeeb] dark:bg-[#193027]" />

          </div>

        </div>
      </main>
    );
  }

  /* =========================
     ERROR
  ========================= */

  if (error || !umkm) {
    return (
      <main className="min-h-screen bg-[#f7f9f7] px-6 pb-20 pt-32 dark:bg-[#0d1713]">

        <div className="mx-auto max-w-[900px]">

          <Link
            href="/umkm"
            className="text-[12px] font-medium text-[#075b43] dark:text-[#9de0bf]"
          >
            ← Kembali ke Produk Lokal
          </Link>

          <div className="mt-10 rounded-[24px] border border-[#e4ebe7] bg-white p-10 text-center dark:border-[#25372e] dark:bg-[#101914]">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e9f1ed] text-[#075b43] dark:bg-[#193a2e] dark:text-[#9de0bf]">
              !
            </div>

            <h1 className="mt-5 text-[20px] font-semibold text-[#17201d] dark:text-[#edf5f0]">
              UMKM Tidak Ditemukan
            </h1>

            <p className="mx-auto mt-2 max-w-[430px] text-[12px] leading-[1.7] text-[#7a8580] dark:text-[#8fa198]">
              UMKM yang kamu cari tidak tersedia
              atau sudah tidak dipublikasikan.
            </p>

            <Link
              href="/umkm"
              className="mt-6 inline-flex rounded-xl bg-[#003c2b] px-5 py-3 text-[11px] font-semibold text-white transition-colors hover:bg-[#075b43]"
            >
              Lihat Semua UMKM
            </Link>

          </div>

        </div>

      </main>
    );
  }

  /* =========================
     WHATSAPP
  ========================= */

  const whatsappNumber =
    umkm.kontak.replace(/\D/g, "");

  const whatsappUrl =
    whatsappNumber
      ? `https://wa.me/${
          whatsappNumber.startsWith("0")
            ? `62${whatsappNumber.slice(1)}`
            : whatsappNumber
        }`
      : null;

  /* =========================
     GALLERY
  ========================= */

  const galleryImages = [
    ...(umkm.foto ? [umkm.foto] : []),
    ...(umkm.gallery || []),
  ].filter(
    (image, index, array) =>
      image &&
      array.indexOf(image) === index
  );

  return (
    <main className="min-h-screen bg-[#f7f9f7] pb-24 pt-32 dark:bg-[#0d1713]">

      <div className="mx-auto max-w-[1100px] px-6">

        {/* BACK */}

        <Link
          href="/umkm"
          className="
            inline-flex
            items-center
            gap-2
            text-[12px]
            font-medium
            text-[#65726c]
            transition-colors
            hover:text-[#075b43]
            dark:text-[#9aa9a2]
            dark:hover:text-[#9de0bf]
          "
        >
          ← Produk Lokal
        </Link>

        {/* HERO */}

        <section className="mt-7 overflow-hidden rounded-[28px] border border-[#e4ebe7] bg-white shadow-[0_15px_45px_rgba(0,60,43,0.06)] dark:border-[#25372e] dark:bg-[#101914]">

          <div className="grid lg:grid-cols-[1.15fr_0.85fr]">

            {/* FOTO */}

            <div className="relative min-h-[320px] bg-[#e9f1ed] lg:min-h-[500px] dark:bg-[#193027]">

              {umkm.foto ? (
                <img
                  src={umkm.foto}
                  alt={umkm.nama}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full min-h-[320px] items-center justify-center text-[#75a28f]">

                  <ImagePlaceholder />

                </div>
              )}

            </div>

            {/* INFO */}

            <div className="flex flex-col justify-center p-7 sm:p-10">

              <span className="w-fit rounded-full bg-[#edf5f0] px-3 py-1.5 text-[10px] font-semibold text-[#39705b] dark:bg-[#193a2e] dark:text-[#9de0bf]">
                {umkm.kategori}
              </span>

              <h1 className="mt-5 text-[30px] font-semibold tracking-[-0.04em] text-[#17201d] sm:text-[38px] dark:text-[#edf5f0]">
                {umkm.nama}
              </h1>

              {umkm.pemilik && (
                <p className="mt-3 text-[12px] text-[#7a8580] dark:text-[#91a099]">
                  Dikelola oleh{" "}
                  <span className="font-semibold text-[#37413d] dark:text-[#c7d5ce]">
                    {umkm.pemilik}
                  </span>
                </p>
              )}

              <div className="mt-8 h-px bg-[#edf1ef] dark:bg-[#25372e]" />

              {/* ALAMAT */}

              {umkm.alamat && (
                <div className="mt-7 flex gap-4">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#e9f1ed] text-[#075b43] dark:bg-[#193a2e] dark:text-[#9de0bf]">
                    <LocationIcon />
                  </div>

                  <div>

                    <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#8a9490]">
                      Alamat
                    </div>

                    <p className="mt-1 text-[12px] leading-[1.7] text-[#53615b] dark:text-[#aebdb5]">
                      {umkm.alamat}
                    </p>

                  </div>

                </div>
              )}

              {/* KONTAK */}

              {umkm.kontak && (
                <div className="mt-5 flex gap-4">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#e9f1ed] text-[#075b43] dark:bg-[#193a2e] dark:text-[#9de0bf]">
                    <PhoneIcon />
                  </div>

                  <div>

                    <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#8a9490]">
                      Kontak
                    </div>

                    <p className="mt-1 text-[12px] text-[#53615b] dark:text-[#aebdb5]">
                      {umkm.kontak}
                    </p>

                  </div>

                </div>
              )}

              {/* BUTTON */}

              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    mt-8
                    inline-flex
                    h-12
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#003c2b]
                    px-5
                    text-[12px]
                    font-semibold
                    text-white
                    transition-colors
                    hover:bg-[#075b43]
                  "
                >
                  Hubungi UMKM
                </a>
              )}

            </div>

          </div>

        </section>

        {/* DESKRIPSI */}

        {umkm.deskripsi && (
          <section className="mx-auto mt-10 max-w-[780px]">

            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#2e8066]">
              Tentang UMKM
            </div>

            <h2 className="mt-2 text-[22px] font-semibold tracking-[-0.03em] text-[#17201d] dark:text-[#edf5f0]">
              Mengenal {umkm.nama}
            </h2>

            <p className="mt-5 whitespace-pre-line text-[13px] leading-[1.9] text-[#68736e] dark:text-[#aebdb5]">
              {umkm.deskripsi}
            </p>

          </section>
        )}

        {/* =================================================
            GALLERY
        ================================================= */}

        {galleryImages.length > 0 && (
          <section className="mx-auto mt-14 max-w-[1000px]">

            <div className="text-center">

              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#2e8066]">
                Galeri
              </div>

              <h2 className="mt-2 text-[24px] font-semibold tracking-[-0.03em] text-[#17201d] dark:text-[#edf5f0]">
                Galeri {umkm.nama}
              </h2>

              <p className="mt-2 text-[12px] text-[#7a8580] dark:text-[#899790]">
                Dokumentasi dan suasana usaha {umkm.nama}.
              </p>

            </div>

            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">

              {galleryImages.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => setSelectedImage(image)}
                  className="group relative aspect-square overflow-hidden rounded-[18px] bg-[#e9f1ed] text-left dark:bg-[#193027]"
                >

                  <img
                    src={image}
                    alt={`${umkm.nama} - Foto ${index + 1}`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />

                  <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />

                </button>
              ))}

            </div>

          </section>
        )}

      </div>

      {/* =================================================
          IMAGE LIGHTBOX
      ================================================= */}

      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-5 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >

          <button
            type="button"
            aria-label="Tutup gambar"
            onClick={() => setSelectedImage(null)}
            className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition-colors hover:bg-white/20"
          >
            ×
          </button>

          <img
            src={selectedImage}
            alt={umkm.nama}
            className="max-h-[90vh] max-w-[92vw] rounded-2xl object-contain shadow-2xl"
            onClick={(event) =>
              event.stopPropagation()
            }
          />

        </div>
      )}

    </main>
  );
}

/* =========================================================
   ICONS
========================================================= */

function ImagePlaceholder() {
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 24 24"
      fill="none"
    >
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.4"
      />

      <circle
        cx="8.5"
        cy="8.5"
        r="1.5"
        stroke="currentColor"
        strokeWidth="1.4"
      />

      <path
        d="M4 17L9.5 11.5L13 15L15.5 12.5L20 17"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M20 10.5C20 15.5 12 21 12 21S4 15.5 4 10.5C4 6.9 7.6 4 12 4S20 6.9 20 10.5Z"
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

function PhoneIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M6.5 4H9L10.5 8L8.5 9.5C9.4 11.4 11 13 13 14L14.5 12L18.5 13.5V16C18.5 17.1 17.6 18 16.5 18C10.7 18 6 13.3 6 7.5C6 6.4 6 5 6.5 4Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}