const news = [
  {
    category: "Masyarakat",
    title: "Cerita dan Aktivitas Masyarakat Kampung Paluh",
    date: "Cerita Kampung",
  },
  {
    category: "UMKM",
    title: "Potensi Produk Lokal Kampung Paluh",
    date: "Potensi Lokal",
  },
  {
    category: "Kegiatan",
    title: "Kegiatan dan Kebersamaan Masyarakat",
    date: "Kegiatan",
  },
];

export default function NewsSection() {
  return (
    <section
      className="
        bg-[#f7f9f7]
        py-24
        transition-colors duration-500
        dark:bg-[#0d1713]
        lg:py-28
      "
    >
      <div className="mx-auto max-w-[1320px] px-6 lg:px-8">

        {/* Heading */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div className="max-w-[560px]">
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
              Cerita Kampung
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
              Cerita & Berita
            </h2>

            <p
              className="
                mt-4
                text-[14px]
                leading-[1.8]
                text-[#68716d]
                dark:text-[#9eaea6]
              "
            >
              Temukan cerita, informasi, dan berbagai aktivitas
              yang berkembang di Kampung Paluh.
            </p>
          </div>

          <a
            href="/berita"
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
            Lihat Semua Berita
            <span>→</span>
          </a>
        </div>

        {/* News */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {news.map((item) => (
            <article
              key={item.title}
              className="
                group
                rounded-[22px]
                border border-black/[0.05]
                bg-white
                p-6
                transition-all duration-300
                hover:-translate-y-1
                hover:shadow-[0_18px_45px_rgba(0,0,0,0.06)]
                dark:border-white/[0.07]
                dark:bg-[#12221b]
                dark:hover:shadow-none
              "
            >
              <div className="flex items-center justify-between">
                <span
                  className="
                    rounded-full
                    bg-[#e9f1ed]
                    px-3
                    py-1.5
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.12em]
                    text-[#075b43]
                    dark:bg-[#193a2e]
                    dark:text-[#9de0bf]
                  "
                >
                  {item.category}
                </span>

                <span
                  className="
                    text-[10px]
                    text-[#89938f]
                    dark:text-[#71817a]
                  "
                >
                  {item.date}
                </span>
              </div>

              <h3
                className="
                  mt-7
                  text-[19px]
                  font-semibold
                  leading-[1.35]
                  tracking-[-0.025em]
                  text-[#17201d]
                  dark:text-[#edf5f0]
                "
              >
                {item.title}
              </h3>

              <a
                href="/berita"
                className="
                  mt-8
                  inline-flex
                  items-center
                  gap-2
                  text-[12px]
                  font-semibold
                  text-[#075b43]
                  transition-all duration-300
                  group-hover:gap-3
                  dark:text-[#75c6a4]
                "
              >
                Baca Selengkapnya
                <span>→</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}