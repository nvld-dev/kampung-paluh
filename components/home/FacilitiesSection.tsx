"use client";

import { useEffect, useState } from "react";

import { getFacilities, FacilityData } from "@/lib/firebase/facilities";

/* =====================================================
   ICON
===================================================== */

function FacilityIcon({ name }: { name: string }) {
  const normalized = name.toLowerCase();

  /* ---------------------------------------------------
     MASJID / MUSHOLA
  --------------------------------------------------- */

  if (
    normalized.includes("masjid") ||
    normalized.includes("mushola") ||
    normalized.includes("mushalla")
  ) {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 20V10L12 5L20 10V20"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />

        <path
          d="M8 20V14H16V20M12 5V2"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  /* ---------------------------------------------------
     SEKOLAH / SD / MTS
  --------------------------------------------------- */

  if (
    normalized.includes("sekolah") ||
    normalized.includes("sd") ||
    normalized.includes("mts") ||
    normalized.includes("madrasah")
  ) {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 10L12 5L20 10"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          d="M6 10V19H18V10"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />

        <path
          d="M9 19V14H15V19"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />

        <path
          d="M4 19H20"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  /* ---------------------------------------------------
     KANTOR / KANTOR DESA
  --------------------------------------------------- */

  if (
    normalized.includes("kantor") ||
    normalized.includes("balai desa") ||
    normalized.includes("balai kampung")
  ) {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 10L12 4L20 10"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <path
          d="M5 10V20H19V10"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />

        <path
          d="M9 20V13H15V20"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />

        <path
          d="M3 20H21"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  /* ---------------------------------------------------
     POSYANDU / KESEHATAN
  --------------------------------------------------- */

  if (
    normalized.includes("posyandu") ||
    normalized.includes("kesehatan") ||
    normalized.includes("puskesmas")
  ) {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect
          x="4"
          y="4"
          width="16"
          height="16"
          rx="3"
          stroke="currentColor"
          strokeWidth="1.8"
        />

        <path
          d="M12 8V16M8 12H16"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  /* ---------------------------------------------------
     PEMUDA / SEKRETARIAT PEMUDA
  --------------------------------------------------- */

  if (
    normalized.includes("pemuda") ||
    normalized.includes("karang") ||
    normalized.includes("organisasi")
  ) {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.8" />

        <circle
          cx="16.5"
          cy="9"
          r="2.5"
          stroke="currentColor"
          strokeWidth="1.8"
        />

        <path
          d="M3.5 20C3.5 16.7 5.9 14 9 14C12.1 14 14.5 16.7 14.5 20"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        <path
          d="M14 15C14.8 14.4 15.7 14 16.7 14C19.1 14 20.5 16 20.5 19"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  /* ---------------------------------------------------
     BALAI LATIHAN KERJA / PELATIHAN
  --------------------------------------------------- */

  if (
    normalized.includes("latihan") ||
    normalized.includes("disnaker") ||
    normalized.includes("pelatihan") ||
    normalized.includes("kerja")
  ) {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 7H20V19H4V7Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />

        <path
          d="M8 7V5C8 4.4 8.4 4 9 4H15C15.6 4 16 4.4 16 5V7"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />

        <path d="M4 12H20" stroke="currentColor" strokeWidth="1.8" />

        <path
          d="M10 12V14H14V12"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  /* ---------------------------------------------------
     TOILET
  --------------------------------------------------- */

  if (normalized.includes("toilet") || normalized.includes("wc")) {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="8" cy="5" r="2" stroke="currentColor" strokeWidth="1.7" />

        <path
          d="M8 8V14M5 11H11M6 20L8 14L10 20"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <circle cx="17" cy="5" r="2" stroke="currentColor" strokeWidth="1.7" />

        <path
          d="M17 8V19"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  /* ---------------------------------------------------
     WARUNG / KULINER
  --------------------------------------------------- */

  if (
    normalized.includes("warung") ||
    normalized.includes("makan") ||
    normalized.includes("kuliner")
  ) {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M6 3V10M9 3V10M12 3V10M9 10V21"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        <path
          d="M6 10C6 11.7 7.3 13 9 13C10.7 13 12 11.7 12 10"
          stroke="currentColor"
          strokeWidth="1.8"
        />

        <path
          d="M17 3C15.9 5.3 15.5 8 15.5 11V21"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        <path
          d="M15.5 8H19.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  /* ---------------------------------------------------
     DEFAULT / FASILITAS UMUM
  --------------------------------------------------- */

  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 10L12 4L20 10V20H4V10Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />

      <path
        d="M8 20V14H16V20"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* =====================================================
   FACILITY CARD
   (dipisah jadi komponen sendiri biar tidak duplikat
   markup untuk data statis & data Firebase)
===================================================== */

function FacilityCard({ nama, meta, variant = "solid",} : {
  nama: string;
  meta: string;
  variant?: "solid" | "tint";
}) {
  return (
    <div
      className="group flex w-full items-center gap-3.5 rounded-2xl border border-black/[0.04] bg-[#f3f5f3] py-3.5 pl-3.5 pr-4 transition-all duration-300 hover:border-[#075b43]/10 hover:bg-[#e9f1ed] hover:shadow-[0_10px_26px_rgba(0,60,43,0.07)] dark:border-white/[0.06] dark:bg-[#12221b] dark:hover:border-[#75c6a4]/15 dark:hover:bg-[#17352a] sm:w-[calc(50%-8px)]"
    >
      {/* ICON BADGE — solid untuk fasilitas utama (bobot lebih tegas),
          tint untuk fasilitas tambahan (bobot lebih ringan) */}

      <div
        className={
          variant === "solid"
            ? `flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] bg-[#075b43] text-white shadow-[0_6px_16px_rgba(7,91,67,0.28)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:rotate-[-2deg] dark:bg-[#75c6a4] dark:text-[#0a110e] dark:shadow-[0_6px_16px_rgba(117,198,164,0.18)]`
            : `flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] border border-[#075b43]/15 bg-[#075b43]/[0.06] text-[#075b43] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:rotate-[-2deg] dark:border-[#75c6a4]/20 dark:bg-[#75c6a4]/[0.08] dark:text-[#75c6a4]`
        }
      >
        <FacilityIcon name={nama} />
      </div>

      {/* TEXT */}

      <div className="flex min-w-0 flex-col items-start text-left">
        <span className="truncate text-[12.5px] font-semibold leading-[1.3] text-[#3d4542] dark:text-[#dcebe4]">
          {nama}
        </span>

        <span className="mt-0.5 text-[9.5px] font-medium text-[#7b8781] dark:text-[#8fa099]">
          {meta}
        </span>
      </div>
    </div>
  );
}

function FacilityCardSkeleton() {
  return (
    <div className="h-[72px] w-full animate-pulse rounded-2xl bg-[#f3f5f3] dark:bg-[#12221b] sm:w-[calc(50%-8px)]" />
  );
}

/* =====================================================
   FASILITAS UTAMA KAMPUNG PALUH
===================================================== */

const mainFacilities = [
  {
    nama: "Kantor Desa",
    jumlah: null,
  },
  {
    nama: "Posyandu",
    jumlah: null,
  },
  {
    nama: "Sekretariat Pemuda",
    jumlah: null,
  },
  {
    nama: "Balai Latihan Kerja Disnaker",
    jumlah: null,
  },
];

/* =====================================================
   COMPONENT
===================================================== */

export default function FacilitiesSection() {
  const [facilities, setFacilities] = useState<FacilityData[]>([]);
  const [loading, setLoading] = useState(true);

  /* ===================================================
     LOAD DATA FIREBASE
  =================================================== */

  useEffect(() => {
    async function loadFacilities() {
      try {
        const data = await getFacilities();

        const activeFacilities = data.filter((item) => item.status === "aktif");

        setFacilities(activeFacilities);
      } catch (error) {
        console.error("Gagal mengambil fasilitas:", error);
      } finally {
        setLoading(false);
      }
    }

    loadFacilities();
  }, []);

  /* ===================================================
     RENDER
  =================================================== */

  return (
    <section className="bg-white py-20 transition-colors duration-500 dark:bg-[#0a110e] lg:py-24">
      <div className="mx-auto grid max-w-[1320px] items-center gap-12 px-6 lg:grid-cols-[1fr_1.15fr] lg:gap-16 lg:px-8">
        {/* =================================================
            LEFT CONTENT
        ================================================= */}

        <div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#2e8066] dark:text-[#75c6a4]">
            Kenyamanan Pengunjung
          </span>

          <h2 className="mt-3 text-[34px] font-semibold leading-[1.05] tracking-[-0.045em] text-[#075b43] transition-colors duration-500 dark:text-[#75c6a4] sm:text-[42px] lg:text-[46px]">
            Fasilitas
            <br />
            Tersedia
          </h2>

          <p className="mt-5 max-w-[470px] text-[14px] leading-[1.8] text-[#68716d] transition-colors duration-500 dark:text-[#9eaea6]">
            Berbagai fasilitas yang tersedia untuk mendukung kebutuhan
            masyarakat dan pengunjung di Kampung Paluh.
          </p>

          {/* =================================================
              FASILITAS UTAMA
              (grid auto-fill: kolom menyesuaikan lebar
              kontainer, jadi tidak ada sel kosong ganjil)
          ================================================= */}

          <div className="mt-8 flex max-w-[560px] flex-wrap gap-3 sm:gap-4">
            {mainFacilities.map((facility) => (
              <FacilityCard
                key={facility.nama}
                nama={facility.nama}
                meta="Fasilitas Kampung"
                variant="solid"
              />
            ))}
          </div>

          {/* =================================================
              DATA FIREBASE TAMBAHAN
          ================================================= */}

          {(loading || facilities.length > 0) && (
            <>
              <div className="mt-8 mb-4 flex items-center gap-3">
                <div className="h-px flex-1 bg-[#e2ebe6] dark:bg-[#263b32]" />

                <span className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#8a9690]">
                  Fasilitas Lainnya
                </span>

                <div className="h-px flex-1 bg-[#e2ebe6] dark:bg-[#263b32]" />
              </div>

              <div className="flex max-w-[560px] flex-wrap gap-3 sm:gap-4">
                {loading ? (
                  <>
                    <FacilityCardSkeleton />
                    <FacilityCardSkeleton />
                  </>
                ) : (
                  facilities.map((facility) => (
                    <FacilityCard
                      key={facility.id}
                      nama={facility.nama}
                      meta={`${facility.jumlah ?? 1} unit`}
                      variant="tint"
                    />
                  ))
                )}
              </div>
            </>
          )}
        </div>

        {/* =================================================
            RIGHT — PETA INFOGRAFIS
        ================================================= */}

        <div className="relative overflow-hidden rounded-[28px] border border-[#e1e9e4] bg-[#edf2ef] shadow-[0_15px_45px_rgba(0,60,43,0.06)] transition-all duration-500 dark:border-[#263b32] dark:bg-[#12221b]" >
          {/* FOTO PETA */}

          <img
            src="/images/petadesa.webp"
            alt="Peta Infografis Kampung Paluh"
            className="block h-auto min-h-[420px] w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
          />

          {/* OVERLAY */}

          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/[0.18] via-transparent to-transparent"
          />
        </div>
      </div>
    </section>
  );
}
