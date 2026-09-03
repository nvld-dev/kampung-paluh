"use client";

import { useEffect, useState } from "react";

import ImageUpload from "@/components/admin/ImageUpload";

import {
  createProduct,
  deleteProduct,
  getProducts,
  ProductData,
  updateProduct,
} from "@/lib/firebase/products";

import {
  getUmkm,
  UmkmData,
} from "@/lib/firebase/umkm";

const initialForm: ProductData = {
  nama: "",
  tipe: "umkm",
  idUmkm: null,
  penjual: "",
  kategori: "",
  deskripsi: "",
  harga: null,
  foto: "",
  fotoPath: "",
  status: "aktif",
};

const productTypes = [
  {
    value: "umkm",
    label: "Produk UMKM",
  },
  {
    value: "perorangan",
    label: "Produk Perorangan",
  },
  {
    value: "produk_kampung",
    label: "Produk Kampung",
  },
];

const categories = [
  "Kuliner",
  "Kerajinan",
  "Pertanian",
  "Perkebunan",
  "Peternakan",
  "Lainnya",
];

export default function ProdukAdminPage() {
  const [products, setProducts] =
    useState<ProductData[]>([]);

  const [umkm, setUmkm] =
    useState<UmkmData[]>([]);

  const [form, setForm] =
    useState<ProductData>(initialForm);

  const [editingId, setEditingId] =
    useState<string | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [showForm, setShowForm] =
    useState(false);

  const [error, setError] =
    useState("");

  const [message, setMessage] =
    useState("");

  /* =========================================================
     LOAD DATA
  ========================================================= */

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);
      setError("");

      const [productData, umkmData] =
        await Promise.all([
          getProducts(),
          getUmkm(),
        ]);

      setProducts(productData);
      setUmkm(umkmData);
    } catch (error) {
      console.error(
        "Gagal mengambil data produk:",
        error
      );

      setError(
        "Data produk gagal dimuat. Periksa Firestore Rules."
      );
    } finally {
      setLoading(false);
    }
  }

  /* =========================================================
     FORM
  ========================================================= */

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement |
        HTMLTextAreaElement |
        HTMLSelectElement
    >
  ) {
    const { name, value } =
      event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handlePriceChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const value =
      event.target.value;

    setForm((previous) => ({
      ...previous,
      harga:
        value === ""
          ? null
          : Number(value),
    }));
  }

  function handleTypeChange(
    event: React.ChangeEvent<HTMLSelectElement>
  ) {
    const tipe =
      event.target.value as ProductData["tipe"];

    setForm((previous) => ({
      ...previous,

      tipe,

      idUmkm:
        tipe === "umkm"
          ? previous.idUmkm
          : null,

      penjual:
        tipe === "perorangan"
          ? previous.penjual
          : "",
    }));
  }

  function openCreate() {
    setForm({
      ...initialForm,
      idUmkm: null,
    });

    setEditingId(null);
    setMessage("");
    setError("");
    setShowForm(true);
  }

  function openEdit(
    item: ProductData
  ) {
    setForm({
      nama: item.nama ?? "",

      tipe:
        item.tipe ?? "umkm",

      idUmkm:
        item.idUmkm ?? null,

      penjual:
        item.penjual ?? "",

      kategori:
        item.kategori ?? "",

      deskripsi:
        item.deskripsi ?? "",

      harga:
        item.harga ?? null,

      foto:
        item.foto ?? "",

      fotoPath:
        item.fotoPath ?? "",

      status:
        item.status ?? "aktif",
    });

    setEditingId(
      item.id ?? null
    );

    setMessage("");
    setError("");
    setShowForm(true);
  }

  function closeForm() {
    if (saving) return;

    setShowForm(false);

    setEditingId(null);

    setForm({
      ...initialForm,
      idUmkm: null,
    });

    setError("");
  }

  /* =========================================================
     FOTO
  ========================================================= */

  function handlePhotoUpload(
    image: {
      url: string;
      publicId: string;
    }
  ) {
    setForm((previous) => ({
      ...previous,

      foto: image.url,

      fotoPath:
        image.publicId,
    }));
  }

  function handlePhotoRemove() {
    setForm((previous) => ({
      ...previous,

      foto: "",

      fotoPath: "",
    }));
  }

  /* =========================================================
     SUBMIT
  ========================================================= */

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setMessage("");
    setError("");

    /* Nama */

    if (!form.nama.trim()) {
      setError(
        "Nama produk wajib diisi."
      );

      return;
    }

    /* UMKM */

    if (
      form.tipe === "umkm" &&
      !form.idUmkm
    ) {
      setError(
        "Pilih UMKM pemilik produk."
      );

      return;
    }

    /* Perorangan */

    if (
      form.tipe === "perorangan" &&
      !form.penjual.trim()
    ) {
      setError(
        "Nama penjual wajib diisi."
      );

      return;
    }

    /* Kategori */

    if (!form.kategori) {
      setError(
        "Kategori produk wajib dipilih."
      );

      return;
    }

    try {
      setSaving(true);

      const payload: ProductData = {
        ...form,

        nama: form.nama.trim(),

        penjual:
          form.penjual.trim(),

        kategori:
          form.kategori.trim(),

        deskripsi:
          form.deskripsi.trim(),

        foto:
          form.foto.trim(),

        fotoPath:
          form.fotoPath?.trim() || "",
      };

      if (editingId) {
        await updateProduct(
          editingId,
          payload
        );

        setMessage(
          "Produk berhasil diperbarui."
        );
      } else {
        await createProduct(
          payload
        );

        setMessage(
          "Produk berhasil ditambahkan."
        );
      }

      await loadData();

      closeForm();
    } catch (error) {
      console.error(
        "Gagal menyimpan produk:",
        error
      );

      setError(
        "Produk gagal disimpan. Silakan coba lagi."
      );
    } finally {
      setSaving(false);
    }
  }

  /* =========================================================
     DELETE
  ========================================================= */

  async function handleDelete(
    item: ProductData
  ) {
    if (!item.id) {
      setError(
        "ID produk tidak ditemukan."
      );

      return;
    }

    const confirmed =
      window.confirm(
        `Hapus produk "${item.nama}"?\n\nData yang sudah dihapus tidak dapat dikembalikan.`
      );

    if (!confirmed) return;

    try {
      setError("");
      setMessage("");

      /*
       * Hapus foto dari Cloudinary
       * jika memiliki public ID.
       */

      if (
        item.fotoPath &&
        item.fotoPath.trim()
      ) {
        try {
          const response =
            await fetch(
              "/api/cloudinary/delete",
              {
                method: "DELETE",

                headers: {
                  "Content-Type":
                    "application/json",
                },

                body: JSON.stringify({
                  publicId:
                    item.fotoPath,
                }),

                cache: "no-store",
              }
            );

          const text =
            await response.text();

          if (!response.ok) {
            console.error(
              "Gagal menghapus foto Cloudinary:",
              text
            );
          }
        } catch (mediaError) {
          console.error(
            "Gagal menghapus foto Cloudinary:",
            mediaError
          );
        }
      }

      /* Hapus data Firestore */

      await deleteProduct(
        item.id
      );

      setMessage(
        "Produk berhasil dihapus."
      );

      await loadData();
    } catch (error) {
      console.error(
        "Gagal menghapus produk:",
        error
      );

      setError(
        "Produk gagal dihapus. Silakan coba lagi."
      );
    }
  }

  /* =========================================================
     SOURCE
  ========================================================= */

  function getUmkmName(
    id: string | null
  ) {
    if (!id) {
      return "UMKM tidak tersedia";
    }

    return (
      umkm.find(
        (item) =>
          item.id === id
      )?.nama ??
      "UMKM tidak ditemukan"
    );
  }

  function getSourceName(
    item: ProductData
  ) {
    if (
      item.tipe === "umkm"
    ) {
      return getUmkmName(
        item.idUmkm
      );
    }

    if (
      item.tipe === "perorangan"
    ) {
      return (
        item.penjual ||
        "Perorangan"
      );
    }

    return "Produk Kampung";
  }

  function getSourceLabel(
    tipe: ProductData["tipe"]
  ) {
    if (
      tipe === "umkm"
    ) {
      return "UMKM";
    }

    if (
      tipe === "perorangan"
    ) {
      return "Perorangan";
    }

    return "Produk Kampung";
  }

  function formatPrice(
    price:
      | number
      | null
      | undefined
  ) {
    if (
      price === null ||
      price === undefined
    ) {
      return "-";
    }

    return `Rp ${price.toLocaleString(
      "id-ID"
    )}`;
  }

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="p-6 lg:p-8">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="flex flex-col gap-5 border-b border-[#e5ebe7] pb-6 sm:flex-row sm:items-end sm:justify-between">

        <div>

          <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#2e8066]">
            Potensi Lokal
          </div>

          <h1 className="mt-2 text-[28px] font-semibold tracking-[-0.04em] text-[#17201d]">
            Produk Lokal
          </h1>

          <p className="mt-2 max-w-[620px] text-[13px] leading-[1.7] text-[#7a8580]">
            Kelola produk unggulan yang
            dipromosikan melalui Portal
            Kampung Paluh.
          </p>

        </div>

        <button
          type="button"
          onClick={openCreate}
          className="
            inline-flex
            h-11
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-[#003c2b]
            px-5
            text-[12px]
            font-semibold
            text-white
            transition-all
            hover:bg-[#075b43]
          "
        >
          <span className="text-[18px]">
            +
          </span>

          Tambah Produk
        </button>

      </div>

      {/* =====================================================
          ALERT
      ====================================================== */}

      {message && (
        <div className="mt-5 rounded-xl border border-[#cde4d7] bg-[#edf8f1] px-4 py-3 text-[12px] text-[#236442]">
          {message}
        </div>
      )}

      {error && (
        <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[12px] text-red-700">
          {error}
        </div>
      )}

      {/* =====================================================
          STATS
      ====================================================== */}

      <div className="mt-6 grid gap-4 sm:grid-cols-3">

        <div className="rounded-2xl border border-[#e4ebe7] bg-white p-5">

          <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#8a9490]">
            Total Produk
          </div>

          <div className="mt-2 text-[26px] font-semibold tracking-[-0.04em] text-[#075b43]">
            {products.length}
          </div>

        </div>

        <div className="rounded-2xl border border-[#e4ebe7] bg-white p-5">

          <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#8a9490]">
            Produk Aktif
          </div>

          <div className="mt-2 text-[26px] font-semibold tracking-[-0.04em] text-[#075b43]">
            {
              products.filter(
                (item) =>
                  item.status ===
                  "aktif"
              ).length
            }
          </div>

        </div>

        <div className="rounded-2xl border border-[#e4ebe7] bg-white p-5">

          <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#8a9490]">
            UMKM Terdaftar
          </div>

          <div className="mt-2 text-[26px] font-semibold tracking-[-0.04em] text-[#075b43]">
            {umkm.length}
          </div>

        </div>

      </div>

      {/* =====================================================
          TABLE
      ====================================================== */}

      <section className="mt-6 overflow-hidden rounded-2xl border border-[#e4ebe7] bg-white">

        <div className="border-b border-[#edf1ef] px-6 py-5">

          <h2 className="text-[14px] font-semibold text-[#27322e]">
            Daftar Produk
          </h2>

          <p className="mt-1 text-[11px] text-[#8a9490]">
            Produk yang tersimpan di Firestore.
          </p>

        </div>

        {loading ? (

          <div className="flex min-h-[250px] items-center justify-center">

            <div className="h-7 w-7 animate-spin rounded-full border-2 border-[#dce8e2] border-t-[#075b43]" />

          </div>

        ) : products.length === 0 ? (

          <div className="flex min-h-[280px] flex-col items-center justify-center px-6 text-center">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e9f1ed] text-[#075b43]">

              <svg
                width="25"
                height="25"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M5 7H19V20H5V7Z"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinejoin="round"
                />

                <path
                  d="M8 7V4H16V7"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />

                <path
                  d="M8 11H16M8 15H13"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              </svg>

            </div>

            <h3 className="mt-4 text-[14px] font-semibold text-[#27322e]">
              Belum ada produk
            </h3>

            <p className="mt-1 max-w-[380px] text-[11px] leading-[1.7] text-[#8a9490]">
              Tambahkan produk pertama
              Kampung Paluh.
            </p>

            <button
              type="button"
              onClick={openCreate}
              className="mt-5 rounded-xl bg-[#e9f1ed] px-4 py-2.5 text-[11px] font-semibold text-[#075b43] hover:bg-[#dcebe3]"
            >
              Tambah Produk
            </button>

          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full min-w-[950px] border-collapse">

              <thead>

                <tr className="border-b border-[#edf1ef] bg-[#fafcfb]">

                  <th className="px-6 py-3 text-left text-[9px] font-semibold uppercase tracking-[0.12em] text-[#8a9490]">
                    Produk
                  </th>

                  <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-[0.12em] text-[#8a9490]">
                    Sumber
                  </th>

                  <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-[0.12em] text-[#8a9490]">
                    Kategori
                  </th>

                  <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-[0.12em] text-[#8a9490]">
                    Harga
                  </th>

                  <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-[0.12em] text-[#8a9490]">
                    Status
                  </th>

                  <th className="px-6 py-3 text-right text-[9px] font-semibold uppercase tracking-[0.12em] text-[#8a9490]">
                    Aksi
                  </th>

                </tr>

              </thead>

              <tbody>

                {products.map(
                  (item) => (
                    <tr
                      key={item.id}
                      className="border-b border-[#f0f3f1] last:border-b-0 hover:bg-[#fbfcfb]"
                    >

                      {/* Produk */}

                      <td className="px-6 py-4">

                        <div className="flex items-center gap-3">

                          <div className="h-11 w-11 shrink-0 overflow-hidden rounded-xl bg-[#e9f1ed]">

                            {item.foto ? (

                              <img
                                src={item.foto}
                                alt={item.nama}
                                className="h-full w-full object-cover"
                              />

                            ) : (

                              <div className="flex h-full w-full items-center justify-center text-[#75a28f]">

                                <svg
                                  width="19"
                                  height="19"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >

                                  <rect
                                    x="4"
                                    y="4"
                                    width="16"
                                    height="16"
                                    rx="2"
                                    stroke="currentColor"
                                    strokeWidth="1.6"
                                  />

                                  <circle
                                    cx="9"
                                    cy="9"
                                    r="1.5"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                  />

                                  <path
                                    d="M5 17L10 12L13 15L15 13L19 17"
                                    stroke="currentColor"
                                    strokeWidth="1.6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />

                                </svg>

                              </div>

                            )}

                          </div>

                          <div className="min-w-0">

                            <div className="max-w-[230px] truncate text-[12px] font-semibold text-[#27322e]">
                              {item.nama}
                            </div>

                            <div className="mt-1 max-w-[230px] truncate text-[10px] text-[#9aa39f]">
                              {item.deskripsi ||
                                "Deskripsi belum tersedia"}
                            </div>

                          </div>

                        </div>

                      </td>

                      {/* Sumber */}

                      <td className="px-4 py-4">

                        <div className="flex flex-col gap-1">

                          <span className="text-[11px] font-medium text-[#53615b]">
                            {getSourceName(
                              item
                            )}
                          </span>

                          <span className="w-fit rounded-full bg-[#edf5f0] px-2 py-0.5 text-[8px] font-semibold text-[#39705b]">
                            {getSourceLabel(
                              item.tipe
                            )}
                          </span>

                        </div>

                      </td>

                      {/* Kategori */}

                      <td className="px-4 py-4">

                        <span className="rounded-full bg-[#edf5f0] px-2.5 py-1 text-[9px] font-medium text-[#39705b]">
                          {item.kategori}
                        </span>

                      </td>

                      {/* Harga */}

                      <td className="px-4 py-4 text-[11px] font-medium text-[#37413d]">
                        {formatPrice(
                          item.harga
                        )}
                      </td>

                      {/* Status */}

                      <td className="px-4 py-4">

                        <span
                          className={`
                            rounded-full
                            px-2.5
                            py-1
                            text-[9px]
                            font-semibold
                            ${
                              item.status ===
                              "aktif"
                                ? "bg-[#e9f5ed] text-[#28714b]"
                                : "bg-[#f3eeee] text-[#8a625d]"
                            }
                          `}
                        >
                          {item.status ===
                          "aktif"
                            ? "Aktif"
                            : "Nonaktif"}
                        </span>

                      </td>

                      {/* Aksi */}

                      <td className="px-6 py-4">

                        <div className="flex justify-end gap-2">

                          <button
                            type="button"
                            onClick={() =>
                              openEdit(
                                item
                              )
                            }
                            className="rounded-lg border border-[#dfe6e2] px-3 py-2 text-[10px] font-semibold text-[#53615b] hover:bg-[#f5f8f6] hover:text-[#075b43]"
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(
                                item
                              )
                            }
                            className="rounded-lg border border-[#eadbd8] px-3 py-2 text-[10px] font-semibold text-[#9a625d] hover:bg-[#fff5f3]"
                          >
                            Hapus
                          </button>

                        </div>

                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>
        )}

      </section>

      {/* =====================================================
          MODAL
      ====================================================== */}

      {showForm && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a110e]/45 p-4 backdrop-blur-sm">

          <div className="flex max-h-[90vh] w-full max-w-[720px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

            {/* HEADER */}

            <div className="flex items-center justify-between border-b border-[#e5ebe7] px-6 py-5">

              <div>

                <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#2e8066]">
                  {editingId
                    ? "Edit Data"
                    : "Data Baru"}
                </div>

                <h2 className="mt-1 text-[18px] font-semibold tracking-[-0.03em] text-[#17201d]">
                  {editingId
                    ? "Edit Produk"
                    : "Tambah Produk"}
                </h2>

              </div>

              <button
                type="button"
                onClick={closeForm}
                disabled={saving}
                className="flex h-9 w-9 items-center justify-center rounded-full text-[#7d8883] hover:bg-[#f3f6f4] disabled:cursor-not-allowed disabled:opacity-50"
              >
                ×
              </button>

            </div>

            {/* FORM */}

            <form
              onSubmit={
                handleSubmit
              }
              className="overflow-y-auto"
            >

              <div className="grid gap-5 p-6">

                {/* Nama */}

                <div>

                  <label className="mb-2 block text-[11px] font-semibold text-[#37413d]">
                    Nama Produk
                  </label>

                  <input
                    name="nama"
                    value={form.nama}
                    onChange={
                      handleChange
                    }
                    placeholder="Contoh: Keripik Singkong"
                    required
                    autoFocus
                    className="h-12 w-full rounded-xl border border-[#dfe6e2] bg-white px-4 text-[13px] text-[#17201d] outline-none placeholder:text-[#a2aaa6] focus:border-[#075b43] focus:ring-4 focus:ring-[#075b43]/10"
                  />

                </div>

                {/* Sumber Produk */}

                <div>

                  <label className="mb-2 block text-[11px] font-semibold text-[#37413d]">
                    Sumber Produk
                  </label>

                  <select
                    name="tipe"
                    value={form.tipe}
                    onChange={
                      handleTypeChange
                    }
                    className="h-12 w-full rounded-xl border border-[#dfe6e2] bg-white px-4 text-[12px] text-[#37413d] outline-none focus:border-[#075b43] focus:ring-4 focus:ring-[#075b43]/10"
                  >

                    {productTypes.map(
                      (item) => (
                        <option
                          key={
                            item.value
                          }
                          value={
                            item.value
                          }
                        >
                          {item.label}
                        </option>
                      )
                    )}

                  </select>

                </div>

                {/* UMKM */}

                {form.tipe ===
                  "umkm" && (

                  <div>

                    <label className="mb-2 block text-[11px] font-semibold text-[#37413d]">
                      UMKM Pemilik
                    </label>

                    <select
                      name="idUmkm"
                      value={
                        form.idUmkm ??
                        ""
                      }
                      onChange={
                        handleChange
                      }
                      required
                      className="h-12 w-full rounded-xl border border-[#dfe6e2] bg-white px-4 text-[12px] text-[#37413d] outline-none focus:border-[#075b43] focus:ring-4 focus:ring-[#075b43]/10"
                    >

                      <option value="">
                        Pilih UMKM
                      </option>

                      {umkm.map(
                        (item) => (
                          <option
                            key={
                              item.id
                            }
                            value={
                              item.id
                            }
                          >
                            {item.nama}
                          </option>
                        )
                      )}

                    </select>

                  </div>
                )}

                {/* Perorangan */}

                {form.tipe ===
                  "perorangan" && (

                  <div>

                    <label className="mb-2 block text-[11px] font-semibold text-[#37413d]">
                      Nama Penjual
                    </label>

                    <input
                      name="penjual"
                      value={
                        form.penjual
                      }
                      onChange={
                        handleChange
                      }
                      required
                      placeholder="Contoh: Pak Ahmad"
                      className="h-12 w-full rounded-xl border border-[#dfe6e2] bg-white px-4 text-[13px] text-[#17201d] outline-none placeholder:text-[#a2aaa6] focus:border-[#075b43] focus:ring-4 focus:ring-[#075b43]/10"
                    />

                  </div>
                )}

                {/* Kategori + Harga */}

                <div className="grid gap-5 sm:grid-cols-2">

                  <div>

                    <label className="mb-2 block text-[11px] font-semibold text-[#37413d]">
                      Kategori
                    </label>

                    <select
                      name="kategori"
                      value={
                        form.kategori
                      }
                      onChange={
                        handleChange
                      }
                      required
                      className="h-12 w-full rounded-xl border border-[#dfe6e2] bg-white px-4 text-[12px] text-[#37413d] outline-none focus:border-[#075b43] focus:ring-4 focus:ring-[#075b43]/10"
                    >

                      <option value="">
                        Pilih kategori
                      </option>

                      {categories.map(
                        (category) => (
                          <option
                            key={
                              category
                            }
                            value={
                              category
                            }
                          >
                            {category}
                          </option>
                        )
                      )}

                    </select>

                  </div>

                  <div>

                    <label className="mb-2 block text-[11px] font-semibold text-[#37413d]">
                      Harga
                    </label>

                    <input
                      type="number"
                      min="0"
                      name="harga"
                      value={
                        form.harga ??
                        ""
                      }
                      onChange={
                        handlePriceChange
                      }
                      placeholder="15000"
                      className="h-12 w-full rounded-xl border border-[#dfe6e2] bg-white px-4 text-[13px] text-[#17201d] outline-none placeholder:text-[#a2aaa6] focus:border-[#075b43] focus:ring-4 focus:ring-[#075b43]/10"
                    />

                  </div>

                </div>

                {/* Deskripsi */}

                <div>

                  <label className="mb-2 block text-[11px] font-semibold text-[#37413d]">
                    Deskripsi Produk
                  </label>

                  <textarea
                    name="deskripsi"
                    value={
                      form.deskripsi
                    }
                    onChange={
                      handleChange
                    }
                    rows={5}
                    placeholder="Deskripsi produk..."
                    className="w-full resize-y rounded-xl border border-[#dfe6e2] bg-white px-4 py-3 text-[13px] leading-[1.7] text-[#17201d] outline-none placeholder:text-[#a2aaa6] focus:border-[#075b43] focus:ring-4 focus:ring-[#075b43]/10"
                  />

                </div>

                {/* Status */}

                <div>

                  <label className="mb-2 block text-[11px] font-semibold text-[#37413d]">
                    Status
                  </label>

                  <select
                    name="status"
                    value={
                      form.status
                    }
                    onChange={
                      handleChange
                    }
                    className="h-12 w-full rounded-xl border border-[#dfe6e2] bg-white px-4 text-[12px] text-[#37413d] outline-none focus:border-[#075b43] focus:ring-4 focus:ring-[#075b43]/10"
                  >

                    <option value="aktif">
                      Aktif
                    </option>

                    <option value="nonaktif">
                      Nonaktif
                    </option>

                  </select>

                </div>

                {/* =================================================
                    FOTO PRODUK - CLOUDINARY
                ================================================== */}

                <div>

                  <ImageUpload
                    label="Foto Produk"
                    folder="produk"
                    value={
                      form.foto
                    }
                    publicId={
                      form.fotoPath
                    }
                    onUpload={
                      handlePhotoUpload
                    }
                    onRemove={
                      handlePhotoRemove
                    }
                  />

                  <p className="mt-2 text-[10px] leading-[1.6] text-[#9aa39f]">
                    Foto produk akan disimpan
                    di Cloudinary dan digunakan
                    sebagai foto utama produk.
                  </p>

                </div>

              </div>

              {/* FOOTER */}

              <div className="flex justify-end gap-3 border-t border-[#edf1ef] bg-[#fafcfb] px-6 py-4">

                <button
                  type="button"
                  onClick={
                    closeForm
                  }
                  disabled={saving}
                  className="rounded-xl border border-[#dfe6e2] bg-white px-5 py-2.5 text-[11px] font-semibold text-[#68736e] hover:bg-[#f4f7f5] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#003c2b] px-5 py-2.5 text-[11px] font-semibold text-white hover:bg-[#075b43] disabled:opacity-60"
                >

                  {saving && (
                    <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  )}

                  {saving
                    ? "Menyimpan..."
                    : editingId
                      ? "Simpan Perubahan"
                      : "Tambah Produk"}

                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}