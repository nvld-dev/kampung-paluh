export default function AboutSection() {
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
            Kampung Paluh telah dikenal sejak tahun 1937 dan pada awalnya
            berkembang melalui perkebunan sawit dan karet. Nama “Paluh”
            dipercaya berasal dari kata “peluh”, yang terucap oleh masyarakat
            saat membuka lahan perkebunan.
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
            Seiring waktu, Kampung Paluh terus berkembang dan menjadi bagian
            dari perjalanan masyarakat yang menjaga kehidupan kampung melalui
            pembangunan serta musyawarah bersama.
          </p>

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
            <span
              className="transition-transform duration-300"
            >
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
      3.2k
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
      15+
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
        text-[22px]
        font-semibold
        tracking-[-0.04em]
        text-[#075b43]
        dark:text-[#75c6a4]
      "
    >
      4876,54 ha
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