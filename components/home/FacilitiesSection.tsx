const facilities = [
  {
    title: "Area Parkir",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path
          d="M6 20V5H12.5C15.5 5 17 6.5 17 9C17 11.5 15.5 13 12.5 13H6"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 9H12"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Mushola",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
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
    ),
  },
  {
    title: "Toilet",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <circle
          cx="8"
          cy="5"
          r="2"
          stroke="currentColor"
          strokeWidth="1.7"
        />
        <path
          d="M8 8V14M5 11H11M6 20L8 14L10 20"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="17"
          cy="5"
          r="2"
          stroke="currentColor"
          strokeWidth="1.7"
        />
        <path
          d="M17 8V19"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Warung Makan",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
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
    ),
  },
];

export default function FacilitiesSection() {
  return (
    <section
      className="
        bg-white
        py-20
        transition-colors duration-500
        dark:bg-[#0a110e]
        lg:py-24
      "
    >
      <div
        className="
          mx-auto
          grid
          max-w-[1320px]
          items-center
          gap-12
          px-6
          lg:grid-cols-[1fr_1.15fr]
          lg:gap-16
          lg:px-8
        "
      >
        {/* =====================================================
            LEFT CONTENT
        ====================================================== */}
        <div>
          {/* Eyebrow */}
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
            Kenyamanan Pengunjung
          </span>

          {/* Heading */}
          <h2
            className="
              mt-3
              text-[34px]
              font-semibold
              leading-[1.05]
              tracking-[-0.045em]
              text-[#075b43]
              transition-colors duration-500
              dark:text-[#75c6a4]
              sm:text-[42px]
              lg:text-[46px]
            "
          >
            Fasilitas
            <br />
            Tersedia
          </h2>

          {/* Description */}
          <p
            className="
              mt-5
              max-w-[470px]
              text-[14px]
              leading-[1.8]
              text-[#68716d]
              transition-colors duration-500
              dark:text-[#9eaea6]
            "
          >
            Beberapa fasilitas yang tersedia untuk mendukung
            kenyamanan masyarakat dan pengunjung di Kampung Paluh.
          </p>

          {/* Facilities */}
          <div className="mt-8 grid max-w-[520px] grid-cols-2 gap-4 sm:gap-5">
            {facilities.map((facility) => (
              <div
                key={facility.title}
                className="
                  group
                  flex
                  h-[112px]
                  flex-col
                  items-center
                  justify-center
                  rounded-[18px]
                  border
                  border-black/[0.04]
                  bg-[#f3f5f3]
                  text-center
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:border-[#075b43]/10
                  hover:bg-[#e9f1ed]
                  hover:shadow-[0_12px_30px_rgba(0,60,43,0.07)]
                  dark:border-white/[0.06]
                  dark:bg-[#12221b]
                  dark:hover:border-[#75c6a4]/15
                  dark:hover:bg-[#17352a]
                  dark:hover:shadow-none
                "
              >
                {/* Icon */}
                <div
                  className="
                    text-[#075b43]
                    transition-transform duration-300
                    group-hover:-translate-y-0.5
                    dark:text-[#75c6a4]
                  "
                >
                  {facility.icon}
                </div>

                {/* Title */}
                <span
                  className="
                    mt-3
                    text-[12px]
                    font-semibold
                    text-[#3d4542]
                    transition-colors duration-300
                    dark:text-[#dcebe4]
                  "
                >
                  {facility.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* =====================================================
            MAP VISUAL
        ====================================================== */}
        <div
          className="
            relative
            overflow-hidden
            rounded-[28px]
            bg-[#edf2ef]
            p-4
            transition-colors duration-500
            dark:bg-[#12221b]
            sm:p-5
            lg:p-6
          "
        >
          {/* Map */}
          <div
            className="
              relative
              h-[300px]
              overflow-hidden
              rounded-[22px]
              border-[5px]
              border-[#101513]
              bg-[#e9eee8]
              shadow-xl
              dark:border-[#1e2b25]
              sm:h-[360px]
            "
          >
            {/* Map-like background */}
            <div
              className="
                absolute
                inset-0
                bg-cover
                bg-center
                transition-all duration-700
                dark:brightness-[0.6]
                dark:saturate-[0.7]
              "
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&w=1400&q=85')",
              }}
            />

            {/* Map tint */}
            <div
              className="
                absolute
                inset-0
                bg-[#eef2e9]/60
                mix-blend-screen
                dark:bg-[#193a2e]/40
              "
            />

            {/* Map label */}
            <div
              className="
                absolute
                left-4
                top-4
                inline-flex
                items-center
                gap-1.5
                rounded-lg
                border
                border-white/30
                bg-white/90
                px-3
                py-2
                text-[10px]
                font-semibold
                text-[#394640]
                shadow-sm
                backdrop-blur-md
                dark:border-white/10
                dark:bg-[#10221b]/90
                dark:text-[#dcebe4]
              "
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M12 21C16.5 17.2 19 14 19 10.5C19 6.91 15.87 4 12 4C8.13 4 5 6.91 5 10.5C5 14 7.5 17.2 12 21Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <circle
                  cx="12"
                  cy="10.5"
                  r="2.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
              </svg>

              Peta Lokasi
            </div>

            {/* Location marker */}
            <div
              className="
                absolute
                left-1/2
                top-[48%]
                flex
                -translate-x-1/2
                -translate-y-1/2
                flex-col
                items-center
              "
            >
              <div
                className="
                  relative
                  flex
                  h-12
                  w-12
                  rotate-[-45deg]
                  items-center
                  justify-center
                  rounded-full
                  rounded-bl-none
                  bg-[#075b43]
                  text-white
                  shadow-[0_8px_20px_rgba(0,60,43,0.3)]
                  dark:bg-[#75c6a4]
                  dark:text-[#082219]
                "
              >
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="rotate-[45deg]"
                  aria-hidden="true"
                >
                  <path
                    d="M12 21C16.5 17.2 19 14 19 10.5C19 6.91 15.87 4 12 4C8.13 4 5 6.91 5 10.5C5 14 7.5 17.2 12 21Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <circle
                    cx="12"
                    cy="10.5"
                    r="2.5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                </svg>
              </div>

              <div
                className="
                  mt-2
                  rounded-md
                  border
                  border-white/30
                  bg-white/90
                  px-3
                  py-1.5
                  text-[10px]
                  font-semibold
                  text-[#27473d]
                  shadow
                  backdrop-blur-md
                  dark:border-white/10
                  dark:bg-[#10221b]/90
                  dark:text-[#dcebe4]
                "
              >
                Kampung Paluh
              </div>
            </div>
          </div>

          {/* =================================================
              MAP INFORMATION CARD
          ================================================== */}
          <div
            className="
              relative
              -mt-8
              ml-auto
              mr-4
              w-[80%]
              rounded-[16px]
              border
              border-black/[0.04]
              bg-white
              px-5
              py-4
              shadow-lg
              transition-colors duration-500
              dark:border-white/[0.06]
              dark:bg-[#10221b]
              sm:mr-6
            "
          >
            <div
              className="
                text-[13px]
                font-semibold
                text-[#23483b]
                dark:text-[#dcebe4]
              "
            >
              Kampung Paluh
            </div>

            <div
              className="
                mt-1
                text-[10px]
                leading-relaxed
                text-[#78817d]
                dark:text-[#8fa099]
              "
            >
              Lokasi Kampung Paluh, Sungai Siak
            </div>

            <div className="mt-3 flex items-center justify-between">
              <span
                className="
                  text-[10px]
                  text-[#66716c]
                  dark:text-[#82948b]
                "
              >
                Lihat lokasi
              </span>

              <a
                href="#"
                className="
                  rounded-full
                  bg-[#e9f1ed]
                  px-3
                  py-1.5
                  text-[9px]
                  font-semibold
                  text-[#075b43]
                  transition-colors duration-300
                  hover:bg-[#d8e8df]
                  dark:bg-[#193a2e]
                  dark:text-[#9de0bf]
                  dark:hover:bg-[#214636]
                "
              >
                Directions
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}