"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import {
  getUmkm,
  UmkmData,
} from "@/lib/firebase/umkm";

import {
  getProducts,
  ProductData,
} from "@/lib/firebase/products";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

/* =========================================================
   HELPER: cn
   Menormalkan whitespace pada className multi-baris agar
   tidak terjadi hydration mismatch akibat perbedaan
   line-ending (CRLF di Windows vs LF di server/client).
========================================================= */

function cn(str: string) {
  return str.replace(/\s+/g, " ").trim();
}

const categories = [
  "Semua",
  "Kuliner",
  "Kerajinan",
  "Pertanian",
  "Perkebunan",
  "Peternakan",
  "Jasa",
  "Lainnya",
];

export default function UmkmProdukPage() {
  const [umkm, setUmkm] = useState<UmkmData[]>([]);
  const [products, setProducts] = useState<ProductData[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [umkmSearch, setUmkmSearch] = useState("");
  const [productSearch, setProductSearch] = useState("");
  const [category, setCategory] = useState("Semua");

  /* =========================================================
     LOAD DATA
  ========================================================= */

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError("");

        const [umkmData, productData] = await Promise.all([
          getUmkm(),
          getProducts(),
        ]);

        setUmkm(umkmData.filter((item) => item.status === "aktif"));
        setProducts(productData.filter((item) => item.status === "aktif"));
      } catch (error) {
        console.error("Gagal mengambil data UMKM dan produk:", error);
        setError(
          "Data UMKM dan produk belum dapat dimuat. Silakan coba beberapa saat lagi."
        );
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  /* =========================================================
     FILTER UMKM
  ========================================================= */

  const filteredUmkm = useMemo(() => {
    const keyword = umkmSearch.trim().toLowerCase();

    return umkm.filter((item) => {
      if (!keyword) return true;

      return (
        item.nama.toLowerCase().includes(keyword) ||
        item.kategori.toLowerCase().includes(keyword) ||
        item.deskripsi.toLowerCase().includes(keyword) ||
        item.pemilik.toLowerCase().includes(keyword)
      );
    });
  }, [umkm, umkmSearch]);

  /* =========================================================
     FILTER PRODUK
  ========================================================= */

  const filteredProducts = useMemo(() => {
    const keyword = productSearch.trim().toLowerCase();

    return products.filter((item) => {
      const matchCategory =
        category === "Semua" || item.kategori === category;

      const owner = item.idUmkm
        ? umkm.find((business) => business.id === item.idUmkm)
        : undefined;

      const ownerName = owner?.nama ?? "";

      const matchSearch =
        !keyword ||
        item.nama.toLowerCase().includes(keyword) ||
        item.kategori.toLowerCase().includes(keyword) ||
        item.deskripsi.toLowerCase().includes(keyword) ||
        item.penjual.toLowerCase().includes(keyword) ||
        ownerName.toLowerCase().includes(keyword);

      return matchCategory && matchSearch;
    });
  }, [products, umkm, productSearch, category]);

  /* =========================================================
     HELPERS
  ========================================================= */

  function getUmkmName(item: ProductData) {
    if (item.tipe === "perorangan") {
      return item.penjual || "Pelaku Usaha";
    }

    if (item.tipe === "produk_kampung") {
      return "Produk Kampung";
    }

    if (!item.idUmkm) {
      return "UMKM Kampung Paluh";
    }

    return (
      umkm.find((business) => business.id === item.idUmkm)?.nama ??
      "UMKM Kampung Paluh"
    );
  }

  function getUmkmForProduct(item: ProductData) {
    if (!item.idUmkm) return null;
    return umkm.find((business) => business.id === item.idUmkm) ?? null;
  }

  function formatPrice(price: number | null | undefined) {
    if (price === null || price === undefined) {
      return "Harga belum tersedia";
    }
    return `Rp ${price.toLocaleString("id-ID")}`;
  }

  function getTypeLabel(tipe: ProductData["tipe"]) {
    if (tipe === "perorangan") return "Perorangan";
    if (tipe === "produk_kampung") return "Produk Kampung";
    return "UMKM";
  }

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="min-h-screen bg-[#f7f9f7] dark:bg-[#0d1713]">
      {/* NAVBAR */}
      <Navbar />

      {/* MAIN */}
      <main className="pb-24 pt-32">
        {/* HERO */}
        <section className="px-6">
          <div className="mx-auto max-w-[1180px]">
            <div className="max-w-[760px]">
              <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#2e8066]">
                Potensi Lokal
              </div>

              <h1 className="mt-4 text-[40px] font-semibold leading-[1.05] tracking-[-0.055em] text-[#17201d] sm:text-[54px] dark:text-[#edf5f0]">
                UMKM & Produk
                <br />
                <span className="text-[#075b43] dark:text-[#75c6a4]">
                  Lokal Kampung Paluh
                </span>
              </h1>

              <p className="mt-6 max-w-[650px] text-[14px] leading-[1.9] text-[#7a8580] dark:text-[#91a098]">
                Kenali berbagai usaha masyarakat serta produk lokal yang
                dihasilkan oleh UMKM dan pelaku usaha Kampung Paluh.
              </p>
            </div>

            {/* QUICK STATS */}
            {!loading && !error && (
              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4 border-t border-[#dfe7e3] pt-6 dark:border-[#263a31]">
                <MiniStat value={umkm.length} label="UMKM Aktif" />
                <MiniStat value={products.length} label="Produk Lokal" />

                <div className="hidden h-8 w-px bg-[#dfe7e3] sm:block dark:bg-[#263a31]" />

                <div className="flex items-center text-[11px] text-[#89948f] dark:text-[#82918a]">
                  Potensi masyarakat Kampung Paluh
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ERROR */}
        {error && (
          <section className="mt-10 px-6">
            <div className="mx-auto max-w-[1180px]">
              <ErrorState message={error} />
            </div>
          </section>
        )}

        {/* UMKM SECTION */}
        {!error && (
          <section className="mt-20 px-6">
            <div className="mx-auto max-w-[1180px]">
              {/* SECTION HEADER */}
              <div className="flex flex-col gap-6 border-b border-[#dfe7e3] pb-7 lg:flex-row lg:items-end lg:justify-between dark:border-[#263a31]">
                <div>
                  <div className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#2e8066] dark:text-[#75c6a4]">
                    Bagian 01
                  </div>

                  <h2 className="mt-2 text-[27px] font-semibold tracking-[-0.04em] text-[#17201d] dark:text-[#edf5f0]">
                    UMKM Kampung Paluh
                  </h2>

                  <p className="mt-2 max-w-[570px] text-[12px] leading-[1.7] text-[#818c87] dark:text-[#8f9f97]">
                    Temukan usaha masyarakat yang tumbuh dan berkembang di
                    Kampung Paluh.
                  </p>
                </div>

                {/* SEARCH UMKM */}
                <div className="relative w-full lg:max-w-[300px]">
                  <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#7c8983]">
                    <SearchIcon />
                  </div>

                  <input
                    type="text"
                    value={umkmSearch}
                    onChange={(event) => setUmkmSearch(event.target.value)}
                    placeholder="Cari UMKM..."
                    className="h-11 w-full rounded-xl border border-[#dfe6e2] bg-white pl-11 pr-4 text-[12px] text-[#17201d] outline-none placeholder:text-[#a0aaa5] focus:border-[#075b43] focus:ring-4 focus:ring-[#075b43]/10 dark:border-[#263a31] dark:bg-[#132019] dark:text-[#edf5f0]"
                  />
                </div>
              </div>

              {/* UMKM CONTENT */}
              <div className="mt-8">
                {loading ? (
                  <LoadingUmkm />
                ) : filteredUmkm.length === 0 ? (
                  <EmptyState
                    title="Tidak ada UMKM ditemukan"
                    description={
                      umkmSearch
                        ? `Tidak ditemukan UMKM dengan kata kunci "${umkmSearch}".`
                        : "Belum ada UMKM aktif di Kampung Paluh."
                    }
                    onReset={() => setUmkmSearch("")}
                  />
                ) : (
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredUmkm.map((item) => (
                      <UmkmCard key={item.id} item={item} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* PRODUCTS SECTION */}
        {!error && (
          <section className="mt-24 border-t border-[#e2e9e5] bg-white px-6 py-20 dark:border-[#20372c] dark:bg-[#0a110e]">
            <div className="mx-auto max-w-[1180px]">
              {/* HEADER */}
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <div className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#2e8066] dark:text-[#75c6a4]">
                    Bagian 02
                  </div>

                  <h2 className="mt-2 text-[27px] font-semibold tracking-[-0.04em] text-[#17201d] dark:text-[#edf5f0]">
                    Produk Lokal
                  </h2>

                  <p className="mt-2 max-w-[570px] text-[12px] leading-[1.7] text-[#818c87] dark:text-[#8f9f97]">
                    Berbagai produk yang dihasilkan oleh UMKM dan pelaku
                    usaha Kampung Paluh.
                  </p>
                </div>

                {/* SEARCH PRODUCT */}
                <div className="relative w-full lg:max-w-[300px]">
                  <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#7c8983]">
                    <SearchIcon />
                  </div>

                  <input
                    type="text"
                    value={productSearch}
                    onChange={(event) => setProductSearch(event.target.value)}
                    placeholder="Cari produk..."
                    className="h-11 w-full rounded-xl border border-[#dfe6e2] bg-[#f7f9f7] pl-11 pr-4 text-[12px] text-[#17201d] outline-none placeholder:text-[#a0aaa5] focus:border-[#075b43] focus:ring-4 focus:ring-[#075b43]/10 dark:border-[#263a31] dark:bg-[#132019] dark:text-[#edf5f0]"
                  />
                </div>
              </div>

              {/* CATEGORY */}
              <div className="scrollbar-hide mt-7 flex gap-2 overflow-x-auto">
                {categories.map((item) => {
                  const active = category === item;

                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setCategory(item)}
                      className={cn(`
                        shrink-0 rounded-full px-4 py-2.5 text-[10px] font-medium transition-all
                        ${
                          active
                            ? "bg-[#075b43] text-white shadow-[0_6px_18px_rgba(7,91,67,0.15)]"
                            : "border border-[#e0e7e3] bg-white text-[#68736e] hover:bg-[#edf4f0] hover:text-[#075b43] dark:border-[#294137] dark:bg-[#132019] dark:text-[#9aa9a2] dark:hover:bg-[#1c3229] dark:hover:text-[#9de0bf]"
                        }
                      `)}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>

              {/* PRODUCTS */}
              <div className="mt-8">
                {loading ? (
                  <LoadingProducts />
                ) : filteredProducts.length === 0 ? (
                  <EmptyState
                    title="Tidak ada produk ditemukan"
                    description={
                      productSearch
                        ? `Tidak ditemukan produk dengan kata kunci "${productSearch}".`
                        : `Belum ada produk aktif pada kategori ${category}.`
                    }
                    onReset={() => {
                      setProductSearch("");
                      setCategory("Semua");
                    }}
                  />
                ) : (
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredProducts.map((item) => (
                      <ProductCard
                        key={item.id}
                        item={item}
                        umkmName={getUmkmName(item)}
                        umkm={getUmkmForProduct(item)}
                        typeLabel={getTypeLabel(item.tipe)}
                        price={formatPrice(item.harga)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

/* =========================================================
   MINI STAT
========================================================= */

function MiniStat({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="text-[20px] font-semibold tracking-[-0.04em] text-[#075b43] dark:text-[#75c6a4]">
        {value}
      </span>

      <span className="text-[10px] text-[#89948f] dark:text-[#82918a]">
        {label}
      </span>
    </div>
  );
}

/* =========================================================
   UMKM CARD
========================================================= */

function UmkmCard({ item }: { item: UmkmData }) {
  return (
    <Link
      href={`/umkm/${item.slug}`}
      className="group block overflow-hidden rounded-[22px] border border-[#e2e9e5] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#cbdcd3] hover:shadow-[0_18px_45px_rgba(23,61,49,0.08)] dark:border-[#263a31] dark:bg-[#132019]"
    >
      {/* IMAGE */}
      <div className="relative aspect-[16/9] overflow-hidden bg-[#e9f1ed] dark:bg-[#193027]">
        {item.foto ? (
          <img
            src={item.foto}
            alt={item.nama}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.035]"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <BusinessPlaceholder />
        )}

        {/* CATEGORY */}
        <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[9px] font-semibold text-[#39705b] shadow-sm backdrop-blur-sm dark:bg-[#132019]/95 dark:text-[#9de0bf]">
          {item.kategori}
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5">
        <h3 className="text-[17px] font-semibold tracking-[-0.025em] text-[#27322e] dark:text-[#edf5f0]">
          {item.nama}
        </h3>

        {item.pemilik && (
          <p className="mt-1.5 text-[10px] text-[#8a9490] dark:text-[#899990]">
            Oleh {item.pemilik}
          </p>
        )}

        {item.deskripsi && (
          <p className="mt-4 line-clamp-3 text-[12px] leading-[1.7] text-[#727d78] dark:text-[#8b9992]">
            {item.deskripsi}
          </p>
        )}

        <div className="mt-5 flex items-center justify-between border-t border-[#edf1ef] pt-4 dark:border-[#263a31]">
          <span className="text-[9px] text-[#929c97] dark:text-[#77877f]">
            UMKM Kampung Paluh
          </span>

          <span className="text-[10px] font-semibold text-[#075b43] transition-transform group-hover:translate-x-1 dark:text-[#75c6a4]">
            Lihat UMKM →
          </span>
        </div>
      </div>
    </Link>
  );
}

/* =========================================================
   PRODUCT CARD
========================================================= */

function ProductCard({
  item,
  umkmName,
  umkm,
  typeLabel,
  price,
}: {
  item: ProductData;
  umkmName: string;
  umkm: UmkmData | null;
  typeLabel: string;
  price: string;
}) {
  const content = (
    <article className="group overflow-hidden rounded-[22px] border border-[#e2e9e5] bg-[#f7f9f7] transition-all duration-300 hover:-translate-y-1 hover:border-[#cbdcd3] hover:bg-white hover:shadow-[0_18px_45px_rgba(23,61,49,0.08)] dark:border-[#263a31] dark:bg-[#132019] dark:hover:bg-[#17271f]">
      {/* IMAGE */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#e9f1ed] dark:bg-[#193027]">
        {item.foto ? (
          <img
            src={item.foto}
            alt={item.nama}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.035]"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <ProductPlaceholder />
        )}

        {/* CATEGORY */}
        <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[9px] font-semibold text-[#39705b] shadow-sm backdrop-blur-sm dark:bg-[#132019]/95 dark:text-[#9de0bf]">
          {item.kategori}
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <h3 className="line-clamp-2 text-[17px] font-semibold leading-[1.3] tracking-[-0.025em] text-[#27322e] dark:text-[#edf5f0]">
            {item.nama}
          </h3>
        </div>

        {/* OWNER */}
        <div className="mt-3 flex items-center gap-2">
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e4f0ea] text-[#075b43] dark:bg-[#193a2e] dark:text-[#9de0bf]">
            <StoreIcon />
          </div>

          <div className="min-w-0">
            <div className="truncate text-[10px] font-medium text-[#53615b] dark:text-[#aab9b2]">
              {umkmName}
            </div>

            <div className="mt-0.5 text-[9px] text-[#9aa39f] dark:text-[#74857d]">
              {typeLabel}
            </div>
          </div>
        </div>

        {/* DESCRIPTION */}
        {item.deskripsi && (
          <p className="mt-4 line-clamp-2 text-[11px] leading-[1.7] text-[#727d78] dark:text-[#8b9992]">
            {item.deskripsi}
          </p>
        )}

        {/* PRICE */}
        <div className="mt-5 flex items-end justify-between border-t border-[#e1e9e4] pt-4 dark:border-[#263a31]">
          <div>
            <div className="text-[9px] text-[#929c97] dark:text-[#77877f]">
              Harga
            </div>

            <div className="mt-1 text-[15px] font-semibold tracking-[-0.02em] text-[#075b43] dark:text-[#75c6a4]">
              {price}
            </div>
          </div>

          {umkm && (
            <span className="text-[10px] font-semibold text-[#075b43] transition-transform group-hover:translate-x-1 dark:text-[#75c6a4]">
              Lihat UMKM →
            </span>
          )}
        </div>
      </div>
    </article>
  );

  /*
   * Jika produk berasal dari UMKM, kartu dapat membawa
   * pengguna ke halaman detail UMKM.
   * Untuk produk perorangan/produk kampung, kartu tetap
   * menjadi informasi produk saja.
   */

  if (umkm?.slug) {
    return (
      <Link href={`/umkm/${umkm.slug}`} className="block">
        {content}
      </Link>
    );
  }

  return content;
}

/* =========================================================
   IMAGE PLACEHOLDER
========================================================= */

function BusinessPlaceholder() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[#e9f1ed] text-[#75a28f] dark:bg-[#193027] dark:text-[#5f8977]">
      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#cfe1d8] bg-white/60 dark:border-[#315345] dark:bg-[#14271f]">
        <StoreIconLarge />
      </div>
    </div>
  );
}

function ProductPlaceholder() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[#e9f1ed] text-[#75a28f] dark:bg-[#193027] dark:text-[#5f8977]">
      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#cfe1d8] bg-white/60 dark:border-[#315345] dark:bg-[#14271f]">
        <PackageIcon />
      </div>
    </div>
  );
}

/* =========================================================
   LOADING UMKM
========================================================= */

function LoadingUmkm() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="overflow-hidden rounded-[22px] border border-[#e4ebe7] bg-white dark:border-[#263a31] dark:bg-[#132019]"
        >
          <div className="aspect-[16/9] animate-pulse bg-[#e5ece8] dark:bg-[#193027]" />

          <div className="space-y-3 p-5">
            <div className="h-5 w-3/5 animate-pulse rounded bg-[#e5ece8] dark:bg-[#193027]" />
            <div className="h-3 w-2/5 animate-pulse rounded bg-[#e5ece8] dark:bg-[#193027]" />
            <div className="h-12 w-full animate-pulse rounded bg-[#e5ece8] dark:bg-[#193027]" />
            <div className="h-8 w-full animate-pulse rounded bg-[#e5ece8] dark:bg-[#193027]" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* =========================================================
   LOADING PRODUCTS
========================================================= */

function LoadingProducts() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="overflow-hidden rounded-[22px] border border-[#e4ebe7] bg-[#f7f9f7] dark:border-[#263a31] dark:bg-[#132019]"
        >
          <div className="aspect-[16/10] animate-pulse bg-[#e5ece8] dark:bg-[#193027]" />

          <div className="space-y-3 p-5">
            <div className="h-5 w-3/5 animate-pulse rounded bg-[#e5ece8] dark:bg-[#193027]" />
            <div className="h-3 w-2/5 animate-pulse rounded bg-[#e5ece8] dark:bg-[#193027]" />
            <div className="h-10 w-full animate-pulse rounded bg-[#e5ece8] dark:bg-[#193027]" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* =========================================================
   EMPTY
========================================================= */

function EmptyState({
  title,
  description,
  onReset,
}: {
  title: string;
  description: string;
  onReset: () => void;
}) {
  return (
    <div className="flex min-h-[260px] flex-col items-center justify-center rounded-[22px] border border-[#e4ebe7] bg-white px-6 text-center dark:border-[#263a31] dark:bg-[#132019]">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e9f1ed] text-[#075b43] dark:bg-[#193a2e] dark:text-[#9de0bf]">
        <PackageIcon />
      </div>

      <h2 className="mt-4 text-[15px] font-semibold text-[#27322e] dark:text-[#edf5f0]">
        {title}
      </h2>

      <p className="mt-2 max-w-[400px] text-[11px] leading-[1.7] text-[#8a9490]">
        {description}
      </p>

      <button
        type="button"
        onClick={onReset}
        className="mt-5 rounded-xl bg-[#e9f1ed] px-4 py-2.5 text-[11px] font-semibold text-[#075b43] transition-colors hover:bg-[#dcebe3] dark:bg-[#193a2e] dark:text-[#9de0bf]"
      >
        Tampilkan Semua
      </button>
    </div>
  );
}

/* =========================================================
   ERROR
========================================================= */

function ErrorState({ message }: { message: string }) {
  return (
    <div className="flex min-h-[220px] flex-col items-center justify-center rounded-[22px] border border-red-100 bg-white px-6 text-center dark:border-red-900/30 dark:bg-[#132019]">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600 dark:bg-red-950/30">
        !
      </div>

      <h2 className="mt-4 text-[14px] font-semibold text-[#27322e] dark:text-[#edf5f0]">
        Data belum dapat ditampilkan
      </h2>

      <p className="mt-2 text-[11px] text-[#8a9490]">{message}</p>
    </div>
  );
}

/* =========================================================
   ICONS
========================================================= */

function SearchIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M16 16L20 20"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function StoreIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 10L6 4H18L20 10"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M5 10V20H19V10"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M4 10C4 12 5.3 13 7 13C8.7 13 10 12 10 10C10 12 11.3 13 13 13C14.7 13 16 12 16 10C16 12 17.3 13 19 13C20 13 20 12 20 10"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function StoreIconLarge() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 10L6 4H18L20 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M5 10V20H19V10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M4 10C4 12 5.3 13 7 13C8.7 13 10 12 10 10C10 12 11.3 13 13 13C14.7 13 16 12 16 10C16 12 17.3 13 19 13C20 13 20 12 20 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PackageIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 7.5L12 3L20 7.5V16.5L12 21L4 16.5V7.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M4.5 7.5L12 12L19.5 7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M12 12V21" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}