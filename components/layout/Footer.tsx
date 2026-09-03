import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#003c2b] text-white">
      {/* Decorative background */}
      <div
        className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#176d53]/30 blur-3xl"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-[#2e8066]/20 blur-3xl"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#075b43]/20 blur-3xl"
        aria-hidden="true"
      />

      {/* Main Footer */}
      <div className="relative mx-auto max-w-[1320px] px-6 pb-10 pt-16 lg:px-8 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.7fr_1fr_1fr_1.15fr] lg:gap-16">
          {/* Brand */}
          <div className="max-w-[390px]">
            <Link
              href="/"
              className="group inline-flex items-center gap-3"
            >
              {/* Logo */}
              <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-white ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-[1.03]">
                <img
                  src="/images/logo.png"
                  alt="Logo Kampung Paluh"
                  className="h-full w-full object-contain p-1.5"
                />
              </div>

              <div>
                <div className="text-[20px] font-semibold tracking-[-0.035em]">
                  Kampung Paluh
                </div>

                <div className="mt-1 text-[9px] font-medium uppercase tracking-[0.2em] text-[#9de0bf]/65">
                  Portal Promosi Kampung
                </div>
              </div>
            </Link>

            <p className="mt-6 max-w-[350px] text-[13px] leading-[1.9] text-white/55">
              Portal digital Kampung Paluh yang menghadirkan informasi
              mengenai profil kampung, potensi UMKM, produk lokal,
              kegiatan, serta cerita masyarakat.
            </p>

            {/* Small accent */}
            <div className="mt-7 flex items-center gap-3">
              <span className="h-px w-10 bg-[#75c6a4]/60" />
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/35">
                Kenali • Jelajahi • Dukung
              </span>
            </div>
          </div>

          {/* Navigasi */}
          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9de0bf]">
              Navigasi
            </h3>

            <nav className="mt-5 flex flex-col gap-3.5">
              <FooterLink href="/" label="Beranda" />

              <FooterLink
                href="/profil"
                label="Profil Kampung"
              />

              <FooterLink
                href="/umkm"
                label="UMKM & Produk Lokal"
              />

              <FooterLink
                href="/kegiatan"
                label="Kegiatan"
              />

              <FooterLink
                href="/berita"
                label="Berita & Cerita"
              />
            </nav>
          </div>

          {/* Jelajahi */}
          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9de0bf]">
              Jelajahi
            </h3>

            <nav className="mt-5 flex flex-col gap-3.5">
              <FooterLink
                href="/profil#sejarah"
                label="Sejarah Kampung"
              />

              <FooterLink
                href="/profil#potensi"
                label="Potensi Kampung"
              />

              <FooterLink
                href="/umkm"
                label="Pelaku UMKM"
              />

              <FooterLink
                href="/umkm"
                label="Produk Lokal"
              />

              <FooterLink
                href="/kegiatan"
                label="Agenda Kegiatan"
              />
            </nav>
          </div>

          {/* Informasi */}
          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9de0bf]">
              Informasi
            </h3>

            <div className="mt-5 space-y-5">
              {/* Location */}
              <div>
                <div className="flex items-center gap-2 text-[11px] font-medium text-white/35">
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M12 21C16.5 16.8 19 13.6 19 9.8C19 5.9 15.9 3 12 3C8.1 3 5 5.9 5 9.8C5 13.6 7.5 16.8 12 21Z"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />

                    <circle
                      cx="12"
                      cy="9.5"
                      r="2.5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />
                  </svg>

                  Lokasi
                </div>

                <p className="mt-2 text-[13px] leading-[1.8] text-white/55">
                  Kampung Paluh
                  <br />
                  Kecamatan Mempura
                  <br />
                  Kabupaten Siak, Riau
                </p>
              </div>

              {/* Website */}
              <div>
                <div className="flex items-center gap-2 text-[11px] font-medium text-white/35">
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="9"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />

                    <path
                      d="M3 12H21M12 3C14.2 5.4 15.3 8.4 15.3 12C15.3 15.6 14.2 18.6 12 21C9.8 18.6 8.7 15.6 8.7 12C8.7 8.4 9.8 5.4 12 3Z"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />
                  </svg>

                  Website
                </div>

                <p className="mt-2 text-[13px] text-white/55">
                  kampungpaluh.my.id
                </p>
              </div>

              {/* Back to top */}
              <a
                href="#top"
                className="group inline-flex items-center gap-2 pt-1 text-[11px] font-medium uppercase tracking-[0.12em] text-[#9de0bf]/70 transition-colors hover:text-[#9de0bf]"
              >
                Kembali ke atas

                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="transition-transform duration-200 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                >
                  <path
                    d="M12 19V5M6 11L12 5L18 11"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-14 h-px bg-white/[0.09]" />

        {/* Bottom */}
        <div className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[11px] text-white/35">
              © 2026 Kampung Paluh. Seluruh hak cipta dilindungi.
            </p>
          </div>

          <div className="flex items-center gap-5">
            <span className="text-[11px] text-white/25">
              Portal Promosi Kampung Paluh
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* -------------------------------------------------
 * Footer Link
 * ------------------------------------------------- */

function FooterLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="group flex w-fit items-center gap-2 text-[13px] text-white/55 transition-all duration-200 hover:translate-x-1 hover:text-white"
    >
      <span>{label}</span>

      <svg
        width="11"
        height="11"
        viewBox="0 0 24 24"
        fill="none"
        className="opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-60"
        aria-hidden="true"
      >
        <path
          d="M9 5L16 12L9 19"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
}