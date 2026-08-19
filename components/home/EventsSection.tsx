export default function EventsSection() {
  return (
    <section
      className="
        bg-white
        py-24
        transition-colors duration-500
        dark:bg-[#0a110e]
        lg:py-28
      "
    >
      <div className="mx-auto max-w-[1320px] px-6 lg:px-8">

        {/* Heading */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
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
              Kegiatan Kampung
            </span>

            <h2
              className="
                mt-3
                text-[32px]
                font-semibold
                tracking-[-0.04em]
                text-[#17201d]
                dark:text-[#edf5f0]
                sm:text-[38px]
              "
            >
              Event & Kegiatan
            </h2>
          </div>

          <a
            href="/kegiatan"
            className="
              inline-flex
              w-fit
              items-center
              gap-2
              text-[13px]
              font-semibold
              text-[#075b43]
              hover:gap-3
              dark:text-[#75c6a4]
            "
          >
            Lihat Semua Kegiatan
            <span>→</span>
          </a>
        </div>

        {/* Featured Event */}
        <article
          className="
            mt-12
            grid
            overflow-hidden
            rounded-[28px]
            border border-black/[0.05]
            bg-[#f5f8f6]
            lg:grid-cols-[1.15fr_0.85fr]
            dark:border-white/[0.07]
            dark:bg-[#12221b]
          "
        >
          {/* Image */}
          <div className="relative min-h-[340px] overflow-hidden lg:min-h-[420px]">
            <div
              className="
                absolute inset-0
                bg-cover bg-center
                dark:brightness-[0.65]
              "
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1400&q=85')",
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>

          {/* Content */}
          <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-14">
            <span
              className="
                w-fit
                rounded-full
                bg-[#e9f1ed]
                px-3
                py-1.5
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.15em]
                text-[#075b43]
                dark:bg-[#193a2e]
                dark:text-[#9de0bf]
              "
            >
              Kegiatan Masyarakat
            </span>

            <h3
              className="
                mt-5
                text-[30px]
                font-semibold
                tracking-[-0.04em]
                text-[#17201d]
                dark:text-[#edf5f0]
              "
            >
              Rewang Riang
            </h3>

            <p
              className="
                mt-4
                text-[14px]
                leading-[1.8]
                text-[#68716d]
                dark:text-[#9eaea6]
              "
            >
              Salah satu kegiatan masyarakat yang dapat diperkenalkan
              sebagai bagian dari kehidupan dan kebersamaan masyarakat
              Kampung Paluh.
            </p>

            <a
              href="/kegiatan"
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
                transition-all duration-300
                hover:bg-[#075b43]
                dark:bg-[#075b43]
                dark:text-white
                dark:hover:bg-[#176d53]
              "
            >
              Lihat Kegiatan
              <span>→</span>
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}