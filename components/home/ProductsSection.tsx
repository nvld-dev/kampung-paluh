const products = [
  {
    name: "Keripik Singkong",
    category: "Produk Lokal",
    description:
      "Olahan singkong yang menjadi salah satu produk lokal Kampung Paluh.",
    image:
      "https://images.unsplash.com/photo-1621447504864-d8686e12698c?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Kacang Ganepo",
    category: "Produk Lokal",
    description:
      "Produk olahan kacang yang menjadi bagian dari potensi usaha masyarakat.",
    image:
      "https://images.unsplash.com/photo-1564894809611-1742fc40ed80?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Madu Sialang",
    category: "Produk Lokal",
    description:
      "Produk madu lokal yang menjadi salah satu potensi Kampung Paluh.",
    image:
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=900&q=85",
  },
];

export default function ProductsSection() {
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
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-[580px]">
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
              Potensi Lokal
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
              UMKM & Produk Lokal
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
              Kenali produk lokal dan potensi UMKM yang berkembang
              bersama masyarakat Kampung Paluh.
            </p>
          </div>

          <a
            href="/umkm"
            className="
              inline-flex
              w-fit
              items-center
              gap-2
              text-[13px]
              font-semibold
              text-[#075b43]
              transition-all duration-300
              hover:gap-3
              dark:text-[#75c6a4]
            "
          >
            Lihat Semua Produk
            <span>→</span>
          </a>
        </div>

        {/* Products */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.name}
              className="
                group
                overflow-hidden
                rounded-[24px]
                border border-black/[0.05]
                bg-white
                shadow-[0_8px_30px_rgba(0,0,0,0.04)]
                transition-all duration-300
                hover:-translate-y-1
                hover:shadow-[0_18px_45px_rgba(0,0,0,0.08)]
                dark:border-white/[0.07]
                dark:bg-[#12221b]
                dark:shadow-none
              "
            >
              {/* Image */}
              <div className="relative h-[250px] overflow-hidden">
                <div
                  className="
                    absolute inset-0
                    bg-cover bg-center
                    transition-transform duration-700
                    group-hover:scale-105
                    dark:brightness-[0.7]
                  "
                  style={{
                    backgroundImage: `url('${product.image}')`,
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />

                <span
                  className="
                    absolute
                    left-4
                    top-4
                    rounded-full
                    bg-white/90
                    px-3
                    py-1.5
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.12em]
                    text-[#075b43]
                    backdrop-blur-md
                    dark:bg-[#10221b]/90
                    dark:text-[#9de0bf]
                  "
                >
                  {product.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3
                  className="
                    text-[18px]
                    font-semibold
                    tracking-[-0.025em]
                    text-[#17201d]
                    dark:text-[#edf5f0]
                  "
                >
                  {product.name}
                </h3>

                <p
                  className="
                    mt-3
                    text-[13px]
                    leading-[1.7]
                    text-[#727b77]
                    dark:text-[#91a29a]
                  "
                >
                  {product.description}
                </p>

                <a
                  href="/umkm"
                  className="
                    mt-5
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
                  Lihat Produk
                  <span>→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}