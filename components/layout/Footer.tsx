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

      {/* Main Footer */}
      <div className="relative mx-auto max-w-[1320px] px-6 pb-12 pt-16 lg:px-8 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div className="max-w-[360px]">
            <a
              href="/"
              className="group inline-flex items-center gap-3"
            >
              {/* Logo */}
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-[#9de0bf] ring-1 ring-white/10 transition-all duration-300 group-hover:bg-white/15 group-hover:ring-white/20">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M12 3C7.5 5.2 5 8.4 5 12.2C5 17 8.1 20 12 21C15.9 20 19 17 19 12.2C19 8.4 16.5 5.2 12 3Z"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />

                  <path
                    d="M8 14C10.2 13.5 12.2 12.4 13.8 10.7C15 9.4 15.8 8 16.2 6.6"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <div>
                <div className="text-[20px] font-semibold tracking-[-0.035em]">
                  Kampung Paluh
                </div>

                <div className="mt-1 text-[9px] font-medium uppercase tracking-[0.18em] text-white/45">
                  Portal Promosi Kampung
                </div>
              </div>
            </a>

            <p className="mt-6 max-w-[320px] text-[13px] leading-[1.8] text-white/55">
              Media digital untuk memperkenalkan profil, potensi, produk
              lokal, kegiatan, dan cerita masyarakat Kampung Paluh.
            </p>

            {/* Social / Contact placeholder */}
            <div className="mt-7 flex items-center gap-2">
              <a
                href="#"
                aria-label="Instagram Kampung Paluh"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.07] text-white/60 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/15 hover:text-white"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <rect
                    x="3"
                    y="3"
                    width="18"
                    height="18"
                    rx="5"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />

                  <circle
                    cx="12"
                    cy="12"
                    r="4"
                    stroke="currentColor"
                    strokeWidth="1.7"
                  />

                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="1"
                    fill="currentColor"
                  />
                </svg>
              </a>

              <a
                href="#"
                aria-label="Kontak Kampung Paluh"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.07] text-white/60 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/15 hover:text-white"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M4 5.5C4 4.67 4.67 4 5.5 4H8L10 9L7.8 10.4C8.75 12.5 10.5 14.25 12.6 15.2L14 13L19 15V18.5C19 19.33 18.33 20 17.5 20C10.04 20 4 13.96 4 6.5V5.5Z"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigasi */}
          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#9de0bf]">
              Navigasi
            </h3>

            <nav className="mt-5 flex flex-col gap-3.5">
              <a
                href="/"
                className="w-fit text-[13px] text-white/55 transition-all duration-200 hover:translate-x-1 hover:text-white"
              >
                Beranda
              </a>

              <a
                href="/profil"
                className="w-fit text-[13px] text-white/55 transition-all duration-200 hover:translate-x-1 hover:text-white"
              >
                Profil Kampung
              </a>

              <a
                href="/kegiatan"
                className="w-fit text-[13px] text-white/55 transition-all duration-200 hover:translate-x-1 hover:text-white"
              >
                Kegiatan
              </a>

              <a
                href="/umkm"
                className="w-fit text-[13px] text-white/55 transition-all duration-200 hover:translate-x-1 hover:text-white"
              >
                Produk Lokal
              </a>

              <a
                href="/berita"
                className="w-fit text-[13px] text-white/55 transition-all duration-200 hover:translate-x-1 hover:text-white"
              >
                Berita
              </a>
            </nav>
          </div>

          {/* Jelajahi */}
          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#9de0bf]">
              Jelajahi
            </h3>

            <nav className="mt-5 flex flex-col gap-3.5">
              <a
                href="/umkm"
                className="w-fit text-[13px] text-white/55 transition-all duration-200 hover:translate-x-1 hover:text-white"
              >
                UMKM
              </a>

              <a
                href="/umkm"
                className="w-fit text-[13px] text-white/55 transition-all duration-200 hover:translate-x-1 hover:text-white"
              >
                Produk Lokal
              </a>

              <a
                href="/kegiatan"
                className="w-fit text-[13px] text-white/55 transition-all duration-200 hover:translate-x-1 hover:text-white"
              >
                Event & Kegiatan
              </a>

              <a
                href="/berita"
                className="w-fit text-[13px] text-white/55 transition-all duration-200 hover:translate-x-1 hover:text-white"
              >
                Cerita & Berita
              </a>
            </nav>
          </div>

          {/* Informasi */}
          <div>
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#9de0bf]">
              Informasi
            </h3>

            <div className="mt-5 space-y-4">
              <div>
                <div className="text-[11px] font-medium text-white/35">
                  Lokasi
                </div>

                <p className="mt-1 text-[13px] leading-relaxed text-white/55">
                  Kampung Paluh
                  <br />
                  Tepian Sungai Siak
                </p>
              </div>

              <div>
                <div className="text-[11px] font-medium text-white/35">
                  Website
                </div>

                <p className="mt-1 text-[13px] text-white/55">
                  kampungpaluh.my.id
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-14 h-px bg-white/[0.09]" />

        {/* Bottom */}
        <div className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] text-white/35">
            © 2026 Kampung Paluh. Seluruh hak cipta dilindungi.
          </p>

          <div className="flex items-center gap-5">
            <a
              href="#"
              className="text-[11px] text-white/35 transition-colors hover:text-white/70"
            >
              Kebijakan Privasi
            </a>

            <a
              href="#"
              className="text-[11px] text-white/35 transition-colors hover:text-white/70"
            >
              Kontak
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}