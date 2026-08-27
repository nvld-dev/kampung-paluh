"use client";

import { useEffect, useState } from "react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LeafletMap from "./LeafletMap";

import { getProfile, ProfileData } from "@/lib/firebase/profile";

export default function ProfilPage() {
  const [profile, setProfile] = useState<Partial<ProfileData> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (error) {
        console.error("Gagal mengambil profil:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7f9f7] dark:bg-[#0d1713]">
        <Navbar />

        <main className="mx-auto max-w-[1320px] px-6 pb-24 pt-36 lg:px-8">
          <div className="animate-pulse">
            <div className="h-3 w-32 rounded bg-[#dce8e2] dark:bg-[#20362d]" />
            <div className="mt-5 h-12 w-[420px] max-w-full rounded bg-[#dce8e2] dark:bg-[#20362d]" />
            <div className="mt-4 h-4 w-[620px] max-w-full rounded bg-[#e4ece8] dark:bg-[#1b2d25]" />

            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              <div className="h-40 rounded-[24px] bg-[#e4ece8] dark:bg-[#1b2d25]" />
              <div className="h-40 rounded-[24px] bg-[#e4ece8] dark:bg-[#1b2d25]" />
              <div className="h-40 rounded-[24px] bg-[#e4ece8] dark:bg-[#1b2d25]" />
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  const nama = profile?.nama || "Kampung Paluh";

  const deskripsi =
    profile?.deskripsiSingkat ||
    "Mengenal lebih dekat Kampung Paluh, kehidupan masyarakat, potensi lokal, dan wilayahnya.";

  const sejarahSingkat =
    profile?.sejarahSingkat ||
    "Informasi sejarah Kampung Paluh belum tersedia.";

  const sejarahLengkap =
    profile?.sejarahLengkap ||
    "Informasi sejarah lengkap Kampung Paluh belum tersedia.";

  const alamat =
    profile?.alamat ||
    "Alamat Kampung Paluh belum tersedia.";

  const lokasi = [
    profile?.kecamatan,
    profile?.kabupaten,
    profile?.provinsi,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="min-h-screen bg-[#f7f9f7] text-[#17201d] dark:bg-[#0d1713] dark:text-[#edf5f0]">
      <Navbar />

      <main>
      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="relative overflow-hidden bg-white pt-32 dark:bg-[#0a110e] lg:pt-40">

        {/* Decorative */}
        <div className="pointer-events-none absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full bg-[#dfeee7] blur-3xl dark:bg-[#123326]" />

        <div className="pointer-events-none absolute -left-40 bottom-0 h-[300px] w-[300px] rounded-full bg-[#edf5f1] blur-3xl dark:bg-[#10271e]" />

        <div className="relative mx-auto max-w-[1320px] px-6 pb-24 lg:px-8 lg:pb-32">

          {/* HERO CONTENT */}
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_450px] lg:gap-16">

            {/* KIRI — TEXT */}
            <div className="max-w-[850px]">

              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#2e8066] dark:text-[#75c6a4]">
                Tentang Kampung
              </span>

              <h1 className="mt-5 text-[44px] font-semibold leading-[1.05] tracking-[-0.055em] text-[#075b43] dark:text-[#9de0bf] sm:text-[56px] lg:text-[68px]">
                {nama}
              </h1>

              <p className="mt-7 max-w-[720px] text-[16px] leading-[1.9] text-[#68716d] dark:text-[#9eaea6]">
                {deskripsi}
              </p>

              <div className="mt-9 flex flex-wrap gap-3">

                {profile?.kecamatan && (
                  <span className="rounded-full border border-[#dce8e2] bg-[#f7faf8] px-4 py-2 text-[11px] font-medium text-[#416157] dark:border-[#294238] dark:bg-[#13241d] dark:text-[#a8beb4]">
                    Kecamatan {profile.kecamatan}
                  </span>
                )}

                {profile?.kabupaten && (
                  <span className="rounded-full border border-[#dce8e2] bg-[#f7faf8] px-4 py-2 text-[11px] font-medium text-[#416157] dark:border-[#294238] dark:bg-[#13241d] dark:text-[#a8beb4]">
                    Kabupaten {profile.kabupaten}
                  </span>
                )}

              </div>

            </div>

            {/* KANAN — LOGO */}
            <div className="flex items-center justify-center lg:justify-end">

              {/* CIRCLE */}
              <div className="relative aspect-square w-[280px] sm:w-[360px] lg:w-[400px]">

                {/* Outer Circle */}
                <div className="absolute inset-0 rounded-full border border-[#d8e8e0] bg-[#f7faf8] dark:border-[#294238] dark:bg-[#10271e]" />

                {/* Inner Circle */}
                <div className="absolute inset-[14px] rounded-full border border-[#e4eee9] dark:border-[#213b30]" />

                {/* Logo */}
                <div className="absolute inset-0 flex items-center justify-center">

                  <img
                    src="/images/logo.png"
                    alt="Logo Kampung Paluh"
                    className="h-[190px] w-[190px] object-contain sm:h-[240px] sm:w-[240px] lg:h-[270px] lg:w-[270px]"
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

        {/* =========================================================
            STATISTIK
        ========================================================== */}
        <section className="bg-white dark:bg-[#0a110e]">
          <div className="mx-auto max-w-[1320px] px-6 pb-24 lg:px-8">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {/* Penduduk */}
              <div className="rounded-[24px] border border-[#e2ebe6] bg-[#f7f9f7] p-6 dark:border-[#263b32] dark:bg-[#12221b]">
                <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7e8984] dark:text-[#82978e]">
                  Penduduk
                </div>

                <div className="mt-4 text-[30px] font-semibold tracking-[-0.04em] text-[#075b43] dark:text-[#9de0bf]">
                  {profile?.jumlahPenduduk ?? "-"}
                </div>

                <div className="mt-1 text-[11px] text-[#8b9691]">
                  Jiwa
                </div>
              </div>

              {/* UMKM */}
              <div className="rounded-[24px] border border-[#e2ebe6] bg-[#f7f9f7] p-6 dark:border-[#263b32] dark:bg-[#12221b]">
                <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7e8984] dark:text-[#82978e]">
                  UMKM
                </div>

                <div className="mt-4 text-[30px] font-semibold tracking-[-0.04em] text-[#075b43] dark:text-[#9de0bf]">
                  {profile?.jumlahUmkm ?? "-"}
                </div>

                <div className="mt-1 text-[11px] text-[#8b9691]">
                  Pelaku usaha
                </div>
              </div>

              {/* Dusun */}
              <div className="rounded-[24px] border border-[#e2ebe6] bg-[#f7f9f7] p-6 dark:border-[#263b32] dark:bg-[#12221b]">
                <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7e8984] dark:text-[#82978e]">
                  Dusun
                </div>

                <div className="mt-4 text-[30px] font-semibold tracking-[-0.04em] text-[#075b43] dark:text-[#9de0bf]">
                  {profile?.dusun ?? "-"}
                </div>

                <div className="mt-1 text-[11px] text-[#8b9691]">
                  Wilayah dusun
                </div>
              </div>

              {/* Luas */}
              <div className="rounded-[24px] border border-[#e2ebe6] bg-[#f7f9f7] p-6 dark:border-[#263b32] dark:bg-[#12221b]">
                <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7e8984] dark:text-[#82978e]">
                  Luas Wilayah
                </div>

                <div className="mt-4 text-[30px] font-semibold tracking-[-0.04em] text-[#075b43] dark:text-[#9de0bf]">
                  {profile?.luasWilayah ?? "-"}
                </div>

                <div className="mt-1 text-[11px] text-[#8b9691]">
                  {profile?.satuanLuas || "Satuan belum diatur"}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SEJARAH
        ========================================================== */}
        <section className="bg-[#f7f9f7] py-24 dark:bg-[#0d1713] lg:py-32">
          <div className="mx-auto max-w-[1320px] px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
              {/* Heading */}
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#2e8066] dark:text-[#75c6a4]">
                  Mengenal Lebih Dekat
                </span>

                <h2 className="mt-4 text-[38px] font-semibold leading-[1.1] tracking-[-0.045em] text-[#17201d] dark:text-[#edf5f0] sm:text-[46px]">
                  Sejarah
                  <br />
                  Kampung Paluh
                </h2>

                <div className="mt-7 h-[2px] w-16 bg-[#075b43] dark:bg-[#75c6a4]" />
              </div>

              {/* Content */}
              <div className="space-y-7">
                <p className="text-[16px] font-medium leading-[1.9] text-[#40534b] dark:text-[#b6c8c0]">
                  {sejarahLengkap}
                </p>

                <div className="h-px bg-[#dfe8e3] dark:bg-[#263b32]" />
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            INFORMASI WILAYAH
        ========================================================== */}
        <section className="bg-white py-24 dark:bg-[#0a110e] lg:py-32">
          <div className="mx-auto max-w-[1320px] px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-24">
              {/* Heading */}
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#2e8066] dark:text-[#75c6a4]">
                  Wilayah Kampung
                </span>

                <h2 className="mt-4 text-[38px] font-semibold leading-[1.1] tracking-[-0.045em] text-[#17201d] dark:text-[#edf5f0] sm:text-[46px]">
                  Informasi
                  <br />
                  Wilayah
                </h2>

                <p className="mt-5 max-w-[440px] text-[14px] leading-[1.9] text-[#68716d] dark:text-[#9eaea6]">
                  Informasi administratif dan lokasi Kampung Paluh
                  untuk membantu pengunjung mengenal wilayah kampung.
                </p>
              </div>

              {/* Information */}
              <div className="overflow-hidden rounded-[28px] border border-[#e1e9e4] bg-[#f7f9f7] dark:border-[#263b32] dark:bg-[#12221b]">
                <div className="divide-y divide-[#e1e9e4] dark:divide-[#263b32]">
                  <InfoRow
                    label="Alamat"
                    value={alamat}
                  />

                  <InfoRow
                    label="Kecamatan"
                    value={profile?.kecamatan}
                  />

                  <InfoRow
                    label="Kabupaten"
                    value={profile?.kabupaten}
                  />

                  <InfoRow
                    label="Provinsi"
                    value={profile?.provinsi}
                  />

                  <InfoRow
                    label="Koordinat"
                    value={
                      profile?.latitude && profile?.longitude
                        ? `${profile.latitude}, ${profile.longitude}`
                        : undefined
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

{/* =========================================================
    LOKASI
========================================================= */}

<section className="bg-[#f7f9f7] py-24 dark:bg-[#0d1713] lg:py-28">
  <div className="mx-auto max-w-[1320px] px-6 lg:px-8">

    <div className="overflow-hidden rounded-[30px] border border-[#dfe8e3] bg-[#eaf1ed] dark:border-[#263b32] dark:bg-[#12221b]">

      <div className="grid lg:grid-cols-[0.8fr_1.2fr]">

        {/* =====================================================
            TEXT
        ====================================================== */}

        <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-14">

          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#2e8066] dark:text-[#75c6a4]">
            Lokasi
          </span>

          <h2 className="mt-4 text-[34px] font-semibold tracking-[-0.04em] text-[#075b43] dark:text-[#9de0bf]">
            Kampung Paluh
          </h2>

          <p className="mt-4 text-[14px] leading-[1.9] text-[#68716d] dark:text-[#9eaea6]">
            {lokasi || "Lokasi administratif belum tersedia."}
          </p>

          <p className="mt-3 text-[13px] leading-[1.8] text-[#7c8882] dark:text-[#879b92]">
            {alamat}
          </p>

          {/* BUTTON GOOGLE MAPS */}

          {profile?.latitude && profile?.longitude && (
            <a
              href={`https://www.google.com/maps?q=${profile.latitude},${profile.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="
                mt-7
                inline-flex
                w-fit
                items-center
                gap-2
                rounded-full
                bg-[#003c2b]
                px-5
                py-3
                text-[12px]
                font-semibold
                text-white
                transition-colors
                hover:bg-[#075b43]
              "
            >
              Lihat di Google Maps
              <span>↗</span>
            </a>
          )}

        </div>

        {/* =====================================================
            MAP
        ====================================================== */}

        <div className="relative min-h-[360px] bg-[#dce8e2] dark:bg-[#1a3027]">

          {profile?.latitude && profile?.longitude ? (

            <LeafletMap
              latitude={Number(profile.latitude)}
              longitude={Number(profile.longitude)}
              nama="Kampung Paluh"
            />

          ) : (

            <div className="flex h-full min-h-[360px] items-center justify-center p-8 text-center">

              <div>

                <div className="text-[13px] font-semibold text-[#50645b] dark:text-[#a8bbb2]">
                  Lokasi belum tersedia
                </div>

                <p className="mt-2 text-[11px] text-[#82908a]">
                  Koordinat Kampung Paluh dapat ditambahkan melalui
                  halaman admin.
                </p>

              </div>

            </div>

          )}

        </div>

      </div>

    </div>

  </div>
</section>
      </main>

      <Footer />
    </div>
  );
}

/* =============================================================
   INFO ROW
============================================================= */

function InfoRow({
  label,
  value,
}: {
  label: string;
  value?: string | number | null;
}) {
  return (
    <div className="grid gap-2 px-6 py-5 sm:grid-cols-[180px_1fr] sm:gap-6 sm:px-8">
      <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#89958f] dark:text-[#7f9389]">
        {label}
      </div>

      <div className="text-[13px] font-medium leading-[1.7] text-[#40534b] dark:text-[#b7c9c0]">
        {value || "Belum tersedia"}
      </div>
    </div>
  );
}