export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#f7f9f7] transition-colors duration-500 dark:bg-[#0a110e]">
      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 scale-105 bg-cover bg-center transition-all duration-700 dark:brightness-[0.55] dark:saturate-[0.8]"
          style={{ backgroundImage: "url('/images/hero.jpeg')" }}
        />

        {/* Light overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/15 transition-opacity duration-500 dark:from-[#0a110e] dark:via-[#0a110e]/85 dark:to-[#0a110e]/10" />

        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white via-white/60 to-transparent transition-colors duration-500 dark:from-[#0a110e] dark:via-[#0a110e]/70 dark:to-transparent" />

        {/* Top fade */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/10 to-transparent dark:from-black/40 dark:to-transparent" />
      </div>

      {/* CONTENT */}
      <div className="relative mx-auto flex min-h-screen max-w-[1380px] items-center px-6 pb-24 pt-32 lg:px-8">
        <div className="max-w-[720px]">
          {/* EYEBROW */}
          <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-[#075b43]/10 bg-white/75 px-4 py-2.5 shadow-sm backdrop-blur-md transition-colors duration-500 dark:border-[#75c6a4]/15 dark:bg-[#10221b]/75">

            <span className="text-[10px] font-semibold tracking-[0.18em] text-[#31594b] transition-colors duration-500 dark:text-[#9acdb5]">
              PORTAL PROMOSI KAMPUNG
            </span>
          </div>

          {/* HEADING */}
          <h1 className="max-w-[700px] text-[45px] font-semibold leading-[1.04] tracking-[-0.055em] text-[#17201d] transition-colors duration-500 dark:text-[#edf5f0] sm:text-[56px] lg:text-[70px]">
            Mengenal lebih dekat
            <br />
            <span className="text-[#075b43] transition-colors duration-500 dark:text-[#75c6a4]">
              Kampung Paluh
            </span>
          </h1>

          {/* DESCRIPTION */}
          <p className="mt-7 max-w-[590px] text-[15px] leading-[1.8] text-[#59635f] transition-colors duration-500 dark:text-[#a1b0a9] sm:text-[16px]">
            Temukan profil kampung, potensi lokal, produk UMKM, kegiatan
            masyarakat, serta cerita yang tumbuh di Kampung Paluh.
          </p>

          {/* ACTIONS */}
          <div className="mt-9 flex flex-wrap items-center gap-3">
            {/* Primary */}
            <a
              href="#jelajah"
              className="group inline-flex items-center gap-3 rounded-full bg-[#003c2b] px-6 py-3.5 text-[13px] font-semibold text-white shadow-[0_10px_30px_rgba(0,60,43,0.15)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#075b43] hover:shadow-[0_14px_35px_rgba(0,60,43,0.2)] dark:bg-[#075b43] dark:text-white dark:hover:bg-[#176d53]"
            >
              <span>Jelajahi Kampung</span>

              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-white transition-transform duration-300 group-hover:translate-x-0.5">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12H19M13 6L19 12L13 18"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </a>

            {/* Secondary */}
            <a
              href="/profil"
              className="inline-flex items-center gap-2 rounded-full border border-[#173d31]/10 bg-white/70 px-6 py-3.5 text-[13px] font-semibold text-[#31594b] backdrop-blur-sm transition-all duration-300 hover:border-[#075b43]/20 hover:bg-white hover:text-[#075b43] dark:border-white/10 dark:bg-[#10221b]/70 dark:text-[#a8cfc0] dark:hover:border-[#75c6a4]/20 dark:hover:bg-[#17352a] dark:hover:text-[#c3ead5]"
            >
              Tentang Kampung
            </a>
          </div>

          {/* SMALL INFORMATION */}
          <div className="mt-12 flex items-center gap-6">
            {/* Potensi Lokal */}
            <div className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-[#2e8066] dark:bg-[#75c6a4]" />
              <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#6c7772] transition-colors duration-500 dark:text-[#91a29a]">
                Potensi Lokal
              </span>
            </div>

            <div className="h-4 w-px bg-[#9aa9a2]/40 dark:bg-white/15" />

            {/* UMKM */}
            <div className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-[#2e8066] dark:bg-[#75c6a4]" />
              <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#6c7772] transition-colors duration-500 dark:text-[#91a29a]">
                UMKM
              </span>
            </div>

            <div className="h-4 w-px bg-[#9aa9a2]/40 dark:bg-white/15" />

            {/* Kegiatan */}
            <div className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-[#2e8066] dark:bg-[#75c6a4]" />
              <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#6c7772] transition-colors duration-500 dark:text-[#91a29a]">
                Kegiatan
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* SCROLL INDICATOR */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center">
        <span className="text-[8px] font-semibold tracking-[0.3em] text-[#61706a] transition-colors duration-500 dark:text-[#82948b]">
          SCROLL
        </span>

        <div className="mt-2 flex h-8 w-5 items-start justify-center rounded-full border border-[#31594b]/30 p-1 transition-colors duration-500 dark:border-[#9de0bf]/25">
          <span className="h-1.5 w-1 animate-bounce rounded-full bg-[#31594b] dark:bg-[#9de0bf]" />
        </div>
      </div>

      {/* SIDE LABEL */}
      <div className="absolute bottom-12 right-8 hidden lg:block">
        <div className="flex items-center gap-3 [writing-mode:vertical-rl]">
          <span className="text-[9px] font-medium tracking-[0.25em] text-[#7a8580] transition-colors duration-500 dark:text-[#82948b]">
            KAMPUNG PALUH
          </span>

          <span className="h-12 w-px bg-[#7a8580]/30 transition-colors duration-500 dark:bg-[#82948b]/25" />
        </div>
      </div>
    </section>
  );
}