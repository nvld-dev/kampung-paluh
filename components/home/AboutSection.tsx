"use client";

import { useEffect, useState } from "react";

import { getProfile, ProfileData } from "@/lib/firebase/profile";

export default function AboutSection() {
  const [profile, setProfile] =
    useState<Partial<ProfileData> | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (error) {
        console.error("Gagal mengambil data profil:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  /*
   * Format angka agar lebih nyaman dibaca.
   * Contoh:
   * 3200 → 3.2k
   * 3500 → 3.5k
   * 15 → 15
   */
  function formatNumber(
    value: number | null | undefined
  ) {
    if (value === null || value === undefined) {
      return "-";
    }

    if (value >= 1000) {
      const formatted = (value / 1000)
        .toFixed(1)
        .replace(".0", "");

      return `${formatted}k`;
    }

    return value.toLocaleString("id-ID");
  }

  /*
   * Format luas wilayah.
   */
  function formatArea(
    value: number | null | undefined,
    unit: string | undefined
  ) {
    if (value === null || value === undefined) {
      return "-";
    }

    return `${value.toLocaleString("id-ID")} ${unit || "km²"}`;
  }

  /*
   * Loading sederhana supaya tidak langsung
   * menampilkan data kosong ketika halaman pertama dibuka.
   */
  if (loading) {
    return (
      <section
        id="jelajah"
        className="
          bg-white py-24
          transition-colors duration-500
          dark:bg-[#0a110e]
          lg:py-28
        "
      >
        <div className="mx-auto grid max-w-[1320px] items-center gap-14 px-6 lg:grid-cols-2 lg:px-8">

          <div className="max-w-[540px]">
            <div className="h-3 w-28 animate-pulse rounded-full bg-[#e9f1ed] dark:bg-[#17352a]" />

            <div className="mt-4 h-10 w-72 animate-pulse rounded-lg bg-[#edf2ef] dark:bg-[#17352a]" />

            <div className="mt-8 space-y-3">
              <div className="h-4 w-full animate-pulse rounded bg-[#edf2ef] dark:bg-[#17352a]" />
              <div className="h-4 w-[92%] animate-pulse rounded bg-[#edf2ef] dark:bg-[#17352a]" />
              <div className="h-4 w-[80%] animate-pulse rounded bg-[#edf2ef] dark:bg-[#17352a]" />
            </div>
          </div>

          <div className="h-[360px] animate-pulse rounded-[28px] bg-[#e9f1ed] dark:bg-[#17352a] sm:h-[440px]" />
        </div>
      </section>
    );
  }

  return (
    <section
      id="jelajah"
      className="
        bg-white py-24
        transition-colors duration-500
        dark:bg-[#0a110e]
        lg:py-28
      "
    >
      <div className="mx-auto grid max-w-[1320px] items-center gap-14 px-6 lg:grid-cols-2 lg:px-8">

        {/* =====================================================
            TEXT
        ====================================================== */}
        <div className="max-w-[540px]">

          <span
            className="
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.2em]
              text-[#2e8066]
              dark:text-[#75c6a4]
            "
          >
            Tentang Kampung
          </span>

          <h2
            className="
              mt-3
              text-[30px]
              font-semibold
              leading-tight
              tracking-[-0.04em]
              text-[#202724]
              transition-colors duration-500
              dark:text-[#edf5f0]
              sm:text-[36px]
            "
          >
            Kenali Kampung Paluh
          </h2>

          {/* Deskripsi dari CMS */}
          {profile?.deskripsiSingkat ? (
            <p
              className="
                mt-6
                text-[15px]
                leading-[1.8]
                text-[#68716d]
                transition-colors duration-500
                dark:text-[#9eaea6]
              "
            >
              {profile.deskripsiSingkat}
            </p>
          ) : (
            <>
              <p
                className="
                  mt-6
                  text-[15px]
                  leading-[1.8]
                  text-[#68716d]
                  transition-colors duration-500
                  dark:text-[#9eaea6]
                "
              >
                Kampung Paluh merupakan kampung yang memiliki
                sejarah, potensi lokal, serta kehidupan masyarakat
                yang terus berkembang.
              </p>

              <p
                className="
                  mt-4
                  text-[15px]
                  leading-[1.8]
                  text-[#68716d]
                  transition-colors duration-500
                  dark:text-[#9eaea6]
                "
              >
                Kenali lebih dekat sejarah, kehidupan masyarakat,
                dan berbagai potensi yang dimiliki Kampung Paluh.
              </p>
            </>
          )}

          
          {/* Link */}
          <a
            href="/profil"
            className="
              mt-7
              inline-flex
              items-center
              gap-2
              text-[13px]
              font-semibold
              text-[#075b43]
              transition-all duration-300
              hover:gap-3
              dark:text-[#75c6a4]
              dark:hover:text-[#9de0bf]
            "
          >
            Baca Sejarah Kampung

            <span className="transition-transform duration-300">
              →
            </span>
          </a>
        </div>

        {/* =====================================================
            IMAGE
        ====================================================== */}
        <div className="relative">

          <div
            className="
              relative
              h-[360px]
              overflow-hidden
              rounded-[28px]
              bg-[#e9f1ed]
              transition-colors duration-500
              dark:bg-[#17352a]
              sm:h-[440px]
            "
          >
            <div
              className="
                absolute inset-0
                bg-cover bg-center
                transition-all duration-700
                dark:brightness-[0.65]
                dark:saturate-[0.85]
              "
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1400&q=85')",
              }}
            />

            {/* Image overlay */}
            <div
              className="
                absolute inset-0
                bg-gradient-to-t
                from-black/35
                via-transparent
                to-transparent
              "
            />
          </div>

          {/* =================================================
              STATS
          ================================================== */}
          <div
            className="
              absolute
              bottom-5
              left-5
              right-5
              flex
              items-center
              justify-between
              gap-4
              rounded-[18px]
              border
              border-white/50
              bg-white/90
              px-5
              py-5
              shadow-lg
              backdrop-blur-md
              transition-colors duration-500
              dark:border-white/10
              dark:bg-[#10221b]/90
              sm:left-6
              sm:right-6
              sm:px-6
            "
          >

            {/* Penduduk */}
            <div className="min-w-0">

              <div
                className="
                  text-[22px]
                  font-semibold
                  tracking-[-0.04em]
                  text-[#123e31]
                  dark:text-[#9de0bf]
                "
              >
                {formatNumber(profile?.jumlahPenduduk)}
              </div>

              <div
                className="
                  mt-0.5
                  text-[10px]
                  text-[#727b77]
                  dark:text-[#8fa099]
                "
              >
                Penduduk
              </div>

            </div>

            {/* Divider */}
            <div className="h-9 w-px shrink-0 bg-[#dfe6e2] dark:bg-white/10" />

            {/* UMKM */}
            <div className="min-w-0">

              <div
                className="
                  text-[22px]
                  font-semibold
                  tracking-[-0.04em]
                  text-[#075b43]
                  dark:text-[#75c6a4]
                "
              >
                {formatNumber(profile?.jumlahUmkm)}
              </div>

              <div
                className="
                  mt-0.5
                  text-[10px]
                  text-[#727b77]
                  dark:text-[#8fa099]
                "
              >
                UMKM Aktif
              </div>

            </div>

            {/* Divider */}
            <div className="h-9 w-px shrink-0 bg-[#dfe6e2] dark:bg-white/10" />

            {/* Luas Wilayah */}
            <div className="min-w-0">

              <div
                className="
                  whitespace-nowrap
                  text-[18px]
                  font-semibold
                  tracking-[-0.04em]
                  text-[#075b43]
                  dark:text-[#75c6a4]
                  sm:text-[20px]
                "
              >
                {formatArea(
                  profile?.luasWilayah,
                  profile?.satuanLuas
                )}
              </div>

              <div
                className="
                  mt-0.5
                  text-[10px]
                  text-[#727b77]
                  dark:text-[#8fa099]
                "
              >
                Luas Wilayah
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
}