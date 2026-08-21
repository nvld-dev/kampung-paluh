"use client";

import { useEffect, useState } from "react";

import { getProducts } from "@/lib/firebase/products";
import type { ProductData } from "@/lib/firebase/products";

export default function ProductsSection() {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();

        // Hanya tampilkan produk aktif
        // dan maksimal 3 produk terbaru.
        const activeProducts = data
          .filter((product) => product.status === "aktif")
          .slice(0, 3);

        setProducts(activeProducts);
      } catch (error) {
        console.error("Gagal mengambil produk:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  return (
    <section className="bg-[#f7f9f7] py-24 transition-colors duration-500 dark:bg-[#0d1713] lg:py-28">
      <div className="mx-auto max-w-[1320px] px-6 lg:px-8">
        {/* HEADING */}
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-[580px]">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#2e8066] dark:text-[#75c6a4]">
              Potensi Lokal
            </span>

            <h2 className="mt-3 text-[32px] font-semibold tracking-[-0.04em] text-[#17201d] dark:text-[#edf5f0] sm:text-[38px]">
              UMKM & Produk Lokal
            </h2>

            <p className="mt-4 text-[14px] leading-[1.8] text-[#68716d] dark:text-[#9eaea6]">
              Kenali produk lokal dan potensi UMKM yang berkembang bersama
              masyarakat Kampung Paluh.
            </p>
          </div>

          <a
            href="/umkm"
            className="inline-flex w-fit items-center gap-2 text-[13px] font-semibold text-[#075b43] transition-all duration-300 hover:gap-3 dark:text-[#75c6a4]"
          >
            Lihat Semua Produk
            <span>→</span>
          </a>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-[24px] border border-black/[0.05] bg-white dark:border-white/[0.07] dark:bg-[#12221b]"
              >
                <div className="h-[250px] animate-pulse bg-[#e9efeb] dark:bg-[#193027]" />

                <div className="p-6">
                  <div className="h-5 w-40 animate-pulse rounded bg-[#e9efeb] dark:bg-[#193027]" />
                  <div className="mt-4 h-12 animate-pulse rounded bg-[#f0f3f1] dark:bg-[#193027]" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && products.length === 0 && (
          <div className="mt-12 rounded-[24px] border border-black/[0.05] bg-white px-6 py-16 text-center dark:border-white/[0.07] dark:bg-[#12221b]">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e9f1ed] text-[#075b43] dark:bg-[#193a2e] dark:text-[#75c6a4]">
              <svg width="25" height="25" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 7.5L12 4L20 7.5V17L12 20L4 17V7.5Z"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinejoin="round"
                />
                <path
                  d="M4 7.5L12 11L20 7.5M12 11V20"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <h3 className="mt-4 text-[15px] font-semibold text-[#27322e] dark:text-[#edf5f0]">
              Belum ada produk
            </h3>

            <p className="mx-auto mt-2 max-w-[430px] text-[12px] leading-[1.7] text-[#7b8580] dark:text-[#91a29a]">
              Produk yang berstatus aktif akan ditampilkan di halaman
              beranda.
            </p>
          </div>
        )}

        {/* PRODUCTS */}
        {!loading && products.length > 0 && (
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {products.map((product) => (
              <article
                key={product.id}
                className="group overflow-hidden rounded-[24px] border border-black/[0.05] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(0,0,0,0.08)] dark:border-white/[0.07] dark:bg-[#12221b] dark:shadow-none"
              >
                {/* IMAGE */}
                <div className="relative h-[250px] overflow-hidden">
                  {product.foto ? (
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 dark:brightness-[0.7]"
                      style={{ backgroundImage: `url('${product.foto}')` }}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#e9f1ed] dark:bg-[#193027]">
                      <svg
                        width="42"
                        height="42"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="text-[#75a893] dark:text-[#4f806c]"
                      >
                        <path
                          d="M4 7.5L12 4L20 7.5V17L12 20L4 17V7.5Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M4 7.5L12 11L20 7.5M12 11V20"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />

                  {/* Category */}
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#075b43] backdrop-blur-md dark:bg-[#10221b]/90 dark:text-[#9de0bf]">
                    {product.kategori}
                  </span>
                </div>

                {/* CONTENT */}
                <div className="p-6">
                  <h3 className="text-[18px] font-semibold tracking-[-0.025em] text-[#17201d] dark:text-[#edf5f0]">
                    {product.nama}
                  </h3>

                  <p className="mt-3 line-clamp-3 text-[13px] leading-[1.7] text-[#727b77] dark:text-[#91a29a]">
                    {product.deskripsi}
                  </p>

                  {/* Tipe Produk */}
                  <div className="mt-4 text-[10px] font-medium text-[#8a9490] dark:text-[#82948b]">
                    {product.tipe === "umkm"
                      ? "UMKM"
                      : product.tipe === "perorangan"
                        ? "Produk Perorangan"
                        : "Produk Kampung"}
                  </div>

                  <a
                    href="/umkm"
                    className="mt-5 inline-flex items-center gap-2 text-[12px] font-semibold text-[#075b43] transition-all duration-300 group-hover:gap-3 dark:text-[#75c6a4]"
                  >
                    Lihat Produk
                    <span>→</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}