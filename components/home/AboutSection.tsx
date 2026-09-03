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

  function formatArea(
    value: number | null | undefined,
    unit: string | undefined
  ) {
    if (value === null || value === undefined) {
      return "-";
    }

    return `${value.toLocaleString("id-ID")} ${unit || "km²"}`;
  }

  if (loading) {
    return (
      <section
        id="jelajah"
        className="
          bg-white py-24
          transition-colors duration-500
          dark:bg-[#0a110e]
          lg:py-32
        "
      >
        <div
          className="
            mx-auto grid max-w-[1320px]
            items-center gap-20 px-6
            lg:grid-cols-[0.9fr_1.1fr]
            lg:px-8
          "
        >
          <div className="max-w-[560px]">
            <div className="h-3 w-28 animate-pulse rounded-full bg-[#e9f1ed] dark:bg-[#17352a]" />

            <div className="mt-5 h-12 w-80 animate-pulse rounded-lg bg-[#edf2ef] dark:bg-[#17352a]" />

            <div className="mt-8 space-y-3">
              <div className="h-4 w-full animate-pulse rounded bg-[#edf2ef] dark:bg-[#17352a]" />
              <div className="h-4 w-[94%] animate-pulse rounded bg-[#edf2ef] dark:bg-[#17352a]" />
              <div className="h-4 w-[82%] animate-pulse rounded bg-[#edf2ef] dark:bg-[#17352a]" />
            </div>
          </div>

          <div className="h-[430px] animate-pulse rounded-[32px] bg-[#f1f6f3] dark:bg-[#12241c]" />
        </div>
      </section>
    );
  }

  return (
    <section
      id="jelajah"
      className="
        relative overflow-hidden
        bg-white py-24
        transition-colors duration-500
        dark:bg-[#0a110e]
        lg:py-32
      "
    >
      <div
        className="
          mx-auto grid max-w-[1320px]
          items-center gap-20 px-6
          lg:grid-cols-[0.9fr_1.1fr]
          lg:px-8
        "
      >
        {/* =====================================================
            LEFT — ABOUT
        ====================================================== */}
        <div className="relative z-10 max-w-[560px]">
          <span
            className="
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.28em]
              text-[#2e8066]
              dark:text-[#75c6a4]
            "
          >
            Tentang Kampung
          </span>

          <h2
            className="
              mt-4
              max-w-[520px]
              text-[38px]
              font-semibold
              leading-[1.08]
              tracking-[-0.055em]
              text-[#17231e]
              dark:text-[#edf5f0]
              sm:text-[46px]
              lg:text-[52px]
            "
          >
            Kenali
            <br />
            <span className="text-[#075b43] dark:text-[#75c6a4]">
              Kampung Paluh
            </span>
          </h2>

          {profile?.deskripsiSingkat ? (
            <p
              className="
                mt-7
                max-w-[510px]
                text-[15px]
                leading-[1.9]
                text-[#68716d]
                dark:text-[#9eaea6]
              "
            >
              {profile.deskripsiSingkat}
            </p>
          ) : (
            <>
              <p
                className="
                  mt-7
                  max-w-[510px]
                  text-[15px]
                  leading-[1.9]
                  text-[#68716d]
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
                  max-w-[510px]
                  text-[15px]
                  leading-[1.9]
                  text-[#68716d]
                  dark:text-[#9eaea6]
                "
              >
                Kenali lebih dekat sejarah, kehidupan masyarakat,
                dan berbagai potensi yang dimiliki Kampung Paluh.
              </p>
            </>
          )}

          <a
            href="/profil"
            className="
              group
              mt-8
              inline-flex
              items-center
              gap-3
              text-[13px]
              font-semibold
              text-[#075b43]
              dark:text-[#75c6a4]
            "
          >
            <span>Baca Sejarah Kampung</span>

            <span
              className="
                flex h-8 w-8
                items-center justify-center
                rounded-full
                border
                border-[#cbded5]
                transition-all duration-300
                group-hover:translate-x-1
                group-hover:bg-[#075b43]
                group-hover:text-white
                dark:border-[#315345]
              "
            >
              →
            </span>
          </a>
        </div>

        {/* =====================================================
            RIGHT — MODERN INFO PANEL
        ====================================================== */}
        <div className="relative">
          {/* Decorative year */}
          <div
            className="
              pointer-events-none
              absolute
              -right-2
              -top-16
              select-none
              text-[110px]
              font-semibold
              leading-none
              tracking-[-0.08em]
              text-[#edf4f0]
              dark:text-[#11241c]
              sm:text-[140px]
            "
          >
            1937
          </div>

          <div
            className="
              relative
              overflow-hidden
              rounded-[34px]
              border
              border-[#dce8e2]
              bg-[#f8fbf9]
              px-7
              py-8
              dark:border-[#203a2f]
              dark:bg-[#0f1d17]
              sm:px-10
              sm:py-10
            "
          >
            {/* Decorative circle */}
            <div
              className="
                pointer-events-none
                absolute
                -right-20
                -top-20
                h-64
                w-64
                rounded-full
                border-[28px]
                border-[#e2f0ea]
                dark:border-[#173127]
              "
            />

            <div
              className="
                pointer-events-none
                absolute
                -bottom-28
                -left-28
                h-64
                w-64
                rounded-full
                border
                border-[#dcece5]
                dark:border-[#1b3429]
              "
            />

            {/* Header */}
            <div className="relative">
              <div className="flex items-center justify-between">
                <span
                  className="
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.25em]
                    text-[#2e8066]
                    dark:text-[#75c6a4]
                  "
                >
                  Sekilas Paluh
                </span>

                <span
                  className="
                    text-[10px]
                    font-medium
                    tracking-[0.15em]
                    text-[#9aa7a1]
                    dark:text-[#65776e]
                  "
                >
                  01
                </span>
              </div>

              <div className="mt-8">
                <div
                  className="
                    text-[72px]
                    font-semibold
                    leading-none
                    tracking-[-0.07em]
                    text-[#075b43]
                    dark:text-[#75c6a4]
                    sm:text-[86px]
                  "
                >
                  {formatNumber(profile?.jumlahPenduduk)}
                </div>

                <div
                  className="
                    mt-3
                    text-[12px]
                    font-medium
                    uppercase
                    tracking-[0.18em]
                    text-[#7b8782]
                    dark:text-[#84958d]
                  "
                >
                  Penduduk Kampung Paluh
                </div>
              </div>
            </div>

            {/* Divider */}
            <div
              className="
                relative
                my-9
                h-px
                bg-[#dce6e1]
                dark:bg-[#243d33]
              "
            />

            {/* Secondary statistics */}
            <div
              className="
                relative
                grid
                grid-cols-3
                divide-x
                divide-[#dce6e1]
                dark:divide-[#294137]
              "
            >
              {/* UMKM */}
              <div className="pr-4">
                <div
                  className="
                    text-[28px]
                    font-semibold
                    tracking-[-0.05em]
                    text-[#1c3028]
                    dark:text-[#d8e7e0]
                    sm:text-[32px]
                  "
                >
                  {formatNumber(profile?.jumlahUmkm)}
                </div>

                <div
                  className="
                    mt-2
                    text-[10px]
                    leading-4
                    text-[#7c8783]
                    dark:text-[#83958c]
                  "
                >
                  UMKM
                  <br />
                  Aktif
                </div>
              </div>

              {/* Dusun */}
              <div className="px-4">
                <div
                  className="
                    text-[28px]
                    font-semibold
                    tracking-[-0.05em]
                    text-[#1c3028]
                    dark:text-[#d8e7e0]
                    sm:text-[32px]
                  "
                >
                  {formatNumber(profile?.dusun)}
                </div>

                <div
                  className="
                    mt-2
                    text-[10px]
                    leading-4
                    text-[#7c8783]
                    dark:text-[#83958c]
                  "
                >
                  Pembagian
                  <br />
                  Dusun
                </div>
              </div>

              {/* Luas */}
              <div className="pl-4">
                <div
                  className="
                    whitespace-nowrap
                    text-[20px]
                    font-semibold
                    tracking-[-0.04em]
                    text-[#1c3028]
                    dark:text-[#d8e7e0]
                    sm:text-[23px]
                  "
                >
                  {formatArea(
                    profile?.luasWilayah,
                    profile?.satuanLuas
                  )}
                </div>

                <div
                  className="
                    mt-2
                    text-[10px]
                    leading-4
                    text-[#7c8783]
                    dark:text-[#83958c]
                  "
                >
                  Luas
                  <br />
                  Wilayah
                </div>
              </div>
            </div>

            {/* Location */}
            <div
              className="
                relative
                mt-9
                flex
                items-center
                justify-between
                border-t
                border-[#dce6e1]
                pt-6
                dark:border-[#243d33]
              "
            >
              <div>
                <div
                  className="
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.22em]
                    text-[#8a9691]
                    dark:text-[#71827a]
                  "
                >
                  Lokasi
                </div>

                <div
                  className="
                    mt-1.5
                    text-[13px]
                    font-medium
                    text-[#34453e]
                    dark:text-[#c8d7d0]
                  "
                >
                  {profile?.kabupaten
                    ? `${profile.kabupaten}, ${
                        profile.provinsi || ""
                      }`
                    : "Kampung Paluh"}
                </div>
              </div>

              {/* Location icon */}
              <div
                className="
                  flex h-10 w-10
                  items-center justify-center
                  rounded-full
                  bg-[#e3f1eb]
                  text-[#075b43]
                  dark:bg-[#19372b]
                  dark:text-[#75c6a4]
                "
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-5 w-5"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z"
                  />

                  <circle
                    cx="12"
                    cy="9"
                    r="2.2"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Small floating accent */}
          <div
            className="
              absolute
              -bottom-4
              -left-4
              hidden
              h-14
              w-14
              rounded-full
              border
              border-[#cfe2d9]
              bg-white
              lg:block
              dark:border-[#29483a]
              dark:bg-[#0a110e]
            "
          >
            <div
              className="
                absolute
                inset-3
                rounded-full
                bg-[#075b43]
                dark:bg-[#75c6a4]
              "
            />
          </div>
        </div>
      </div>
    </section>
  );
}