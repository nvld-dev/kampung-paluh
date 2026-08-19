"use client";

import { useEffect, useState } from "react";

import {
  createNews,
  deleteNews,
  getNews,
  NewsData,
  updateNews,
} from "@/lib/firebase/news";

const initialForm: NewsData = {
  judul: "",
  slug: "",
  ringkasan: "",
  isi: "",
  kategori: "Kampung",
  penulis: "",
  tanggal: "",
  foto: "",
  status: "aktif",
};

const categories: NewsData["kategori"][] = [
  "Kegiatan",
  "UMKM",
  "Produk Lokal",
  "Kampung",
  "Pengumuman",
  "Lainnya",
];

export default function BeritaAdminPage() {
  const [news, setNews] =
    useState<NewsData[]>([]);

  const [form, setForm] =
    useState<NewsData>(initialForm);

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

  useEffect(() => {
    loadNews();
  }, []);

  async function loadNews() {
    try {
      setLoading(true);
      setError("");

      const data = await getNews();

      setNews(data);
    } catch (error) {
      console.error(
        "Gagal mengambil berita:",
        error
      );

      setError(
        "Data berita gagal dimuat. Periksa Firestore Rules."
      );
    } finally {
      setLoading(false);
    }
  }

  function createSlug(value: string) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement |
        HTMLTextAreaElement |
        HTMLSelectElement
    >
  ) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleTitleChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const value = event.target.value;

    setForm((previous) => ({
      ...previous,
      judul: value,
      slug: createSlug(value),
    }));
  }

  function openCreate() {
    setForm({
      ...initialForm,
      tanggal: new Date()
        .toISOString()
        .split("T")[0],
    });

    setEditingId(null);
    setMessage("");
    setError("");
    setShowForm(true);
  }

  function openEdit(item: NewsData) {
    setForm({
      judul: item.judul ?? "",
      slug: item.slug ?? "",
      ringkasan: item.ringkasan ?? "",
      isi: item.isi ?? "",
      kategori:
        item.kategori ?? "Kampung",
      penulis: item.penulis ?? "",
      tanggal: item.tanggal ?? "",
      foto: item.foto ?? "",
      status: item.status ?? "aktif",
    });

    setEditingId(item.id ?? null);
    setMessage("");
    setError("");
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingId(null);
    setForm(initialForm);
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setMessage("");
    setError("");

    if (!form.judul.trim()) {
      setError(
        "Judul berita wajib diisi."
      );
      return;
    }

    if (!form.ringkasan.trim()) {
      setError(
        "Ringkasan berita wajib diisi."
      );
      return;
    }

    if (!form.isi.trim()) {
      setError(
        "Isi berita wajib diisi."
      );
      return;
    }

    if (!form.tanggal) {
      setError(
        "Tanggal berita wajib diisi."
      );
      return;
    }

    if (!form.penulis.trim()) {
      setError(
        "Nama penulis wajib diisi."
      );
      return;
    }

    try {
      setSaving(true);

      if (editingId) {
        await updateNews(
          editingId,
          form
        );

        setMessage(
          "Berita berhasil diperbarui."
        );
      } else {
        await createNews(form);

        setMessage(
          "Berita berhasil ditambahkan."
        );
      }

      await loadNews();

      closeForm();
    } catch (error) {
      console.error(
        "Gagal menyimpan berita:",
        error
      );

      setError(
        "Berita gagal disimpan."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(
    item: NewsData
  ) {
    if (!item.id) return;

    const confirmed = window.confirm(
      `Hapus berita "${item.judul}"?`
    );

    if (!confirmed) return;

    try {
      setError("");
      setMessage("");

      await deleteNews(item.id);

      setMessage(
        "Berita berhasil dihapus."
      );

      await loadNews();
    } catch (error) {
      console.error(
        "Gagal menghapus berita:",
        error
      );

      setError(
        "Berita gagal dihapus."
      );
    }
  }

  function formatDate(
    date: string
  ) {
    if (!date) return "-";

    return new Date(
      `${date}T00:00:00`
    ).toLocaleDateString(
      "id-ID",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  }

  return (
    <div className="p-6 lg:p-8">

      {/* HEADER */}

      <div className="flex flex-col gap-5 border-b border-[#e5ebe7] pb-6 sm:flex-row sm:items-end sm:justify-between">

        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#2e8066]">
            Informasi Kampung
          </div>

          <h1 className="mt-2 text-[28px] font-semibold tracking-[-0.04em] text-[#17201d]">
            Berita & Cerita
          </h1>

          <p className="mt-2 max-w-[620px] text-[13px] leading-[1.7] text-[#7a8580]">
            Kelola berita, cerita, dan
            informasi terbaru Kampung Paluh.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreate}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#003c2b] px-5 text-[12px] font-semibold text-white transition-all hover:bg-[#075b43]"
        >
          <span className="text-[18px]">
            +
          </span>

          Tambah Berita
        </button>

      </div>

      {/* ALERT */}

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

      {/* STATS */}

      <div className="mt-6 grid gap-4 sm:grid-cols-3">

        <div className="rounded-2xl border border-[#e4ebe7] bg-white p-5">
          <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#8a9490]">
            Total Berita
          </div>

          <div className="mt-2 text-[26px] font-semibold tracking-[-0.04em] text-[#075b43]">
            {news.length}
          </div>
        </div>

        <div className="rounded-2xl border border-[#e4ebe7] bg-white p-5">
          <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#8a9490]">
            Berita Aktif
          </div>

          <div className="mt-2 text-[26px] font-semibold tracking-[-0.04em] text-[#075b43]">
            {
              news.filter(
                (item) =>
                  item.status ===
                  "aktif"
              ).length
            }
          </div>
        </div>

        <div className="rounded-2xl border border-[#e4ebe7] bg-white p-5">
          <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#8a9490]">
            Kategori
          </div>

          <div className="mt-2 text-[26px] font-semibold tracking-[-0.04em] text-[#075b43]">
            {
              new Set(
                news.map(
                  (item) =>
                    item.kategori
                )
              ).size
            }
          </div>
        </div>

      </div>

      {/* TABLE */}

      <section className="mt-6 overflow-hidden rounded-2xl border border-[#e4ebe7] bg-white">

        <div className="border-b border-[#edf1ef] px-6 py-5">
          <h2 className="text-[14px] font-semibold text-[#27322e]">
            Daftar Berita
          </h2>

          <p className="mt-1 text-[11px] text-[#8a9490]">
            Berita yang tersimpan di
            Firestore.
          </p>
        </div>

        {loading ? (
          <div className="flex min-h-[250px] items-center justify-center">
            <div className="h-7 w-7 animate-spin rounded-full border-2 border-[#dce8e2] border-t-[#075b43]" />
          </div>
        ) : news.length === 0 ? (
          <div className="flex min-h-[280px] flex-col items-center justify-center px-6 text-center">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e9f1ed] text-[#075b43]">
              <svg
                width="25"
                height="25"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M5 4H19V20H5V4Z"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinejoin="round"
                />

                <path
                  d="M8 8H16M8 12H16M8 16H13"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <h3 className="mt-4 text-[14px] font-semibold text-[#27322e]">
              Belum ada berita
            </h3>

            <p className="mt-1 max-w-[380px] text-[11px] leading-[1.7] text-[#8a9490]">
              Tambahkan berita pertama
              Kampung Paluh.
            </p>

            <button
              type="button"
              onClick={openCreate}
              className="mt-5 rounded-xl bg-[#e9f1ed] px-4 py-2.5 text-[11px] font-semibold text-[#075b43] hover:bg-[#dcebe3]"
            >
              Tambah Berita
            </button>

          </div>
        ) : (
          <div className="overflow-x-auto">

            <table className="w-full min-w-[1000px] border-collapse">

              <thead>
                <tr className="border-b border-[#edf1ef] bg-[#fafcfb]">

                  <th className="px-6 py-3 text-left text-[9px] font-semibold uppercase tracking-[0.12em] text-[#8a9490]">
                    Berita
                  </th>

                  <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-[0.12em] text-[#8a9490]">
                    Kategori
                  </th>

                  <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-[0.12em] text-[#8a9490]">
                    Penulis
                  </th>

                  <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-[0.12em] text-[#8a9490]">
                    Tanggal
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

                {news.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-[#f0f3f1] last:border-b-0 hover:bg-[#fbfcfb]"
                  >

                    {/* BERITA */}

                    <td className="px-6 py-4">

                      <div className="flex items-center gap-3">

                        <div className="h-12 w-16 shrink-0 overflow-hidden rounded-xl bg-[#e9f1ed]">

                          {item.foto ? (
                            <img
                              src={item.foto}
                              alt={item.judul}
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

                          <div className="max-w-[280px] truncate text-[12px] font-semibold text-[#27322e]">
                            {item.judul}
                          </div>

                          <div className="mt-1 max-w-[280px] truncate text-[10px] text-[#9aa39f]">
                            {item.ringkasan}
                          </div>

                        </div>

                      </div>

                    </td>

                    {/* KATEGORI */}

                    <td className="px-4 py-4">

                      <span className="rounded-full bg-[#edf5f0] px-2.5 py-1 text-[9px] font-medium text-[#39705b]">
                        {item.kategori}
                      </span>

                    </td>

                    {/* PENULIS */}

                    <td className="px-4 py-4 text-[11px] text-[#68736e]">
                      {item.penulis}
                    </td>

                    {/* TANGGAL */}

                    <td className="px-4 py-4 text-[11px] font-medium text-[#53615b]">
                      {formatDate(
                        item.tanggal
                      )}
                    </td>

                    {/* STATUS */}

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

                    {/* AKSI */}

                    <td className="px-6 py-4">

                      <div className="flex justify-end gap-2">

                        <button
                          type="button"
                          onClick={() =>
                            openEdit(item)
                          }
                          className="rounded-lg border border-[#dfe6e2] px-3 py-2 text-[10px] font-semibold text-[#53615b] hover:bg-[#f5f8f6] hover:text-[#075b43]"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(item)
                          }
                          className="rounded-lg border border-[#eadbd8] px-3 py-2 text-[10px] font-semibold text-[#9a625d] hover:bg-[#fff5f3]"
                        >
                          Hapus
                        </button>

                      </div>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>
        )}

      </section>

      {/* MODAL */}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a110e]/45 p-4 backdrop-blur-sm">

          <div className="flex max-h-[90vh] w-full max-w-[760px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

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
                    ? "Edit Berita"
                    : "Tambah Berita"}
                </h2>

              </div>

              <button
                type="button"
                onClick={closeForm}
                className="flex h-9 w-9 items-center justify-center rounded-full text-[#7d8883] hover:bg-[#f3f6f4]"
              >
                ×
              </button>

            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="overflow-y-auto"
            >

              <div className="grid gap-5 p-6">

                {/* JUDUL */}

                <div>

                  <label className="mb-2 block text-[11px] font-semibold text-[#37413d]">
                    Judul Berita
                  </label>

                  <input
                    name="judul"
                    value={form.judul}
                    onChange={
                      handleTitleChange
                    }
                    placeholder="Contoh: Rewang Riang Kampung Paluh"
                    required
                    className="h-12 w-full rounded-xl border border-[#dfe6e2] bg-white px-4 text-[13px] text-[#17201d] outline-none placeholder:text-[#a2aaa6] focus:border-[#075b43] focus:ring-4 focus:ring-[#075b43]/10"
                  />

                </div>

                {/* SLUG */}

                <div>

                  <label className="mb-2 block text-[11px] font-semibold text-[#37413d]">
                    Slug
                  </label>

                  <input
                    name="slug"
                    value={form.slug}
                    onChange={handleChange}
                    className="h-12 w-full rounded-xl border border-[#dfe6e2] bg-[#f8faf9] px-4 text-[13px] text-[#59645f] outline-none focus:border-[#075b43] focus:ring-4 focus:ring-[#075b43]/10"
                  />

                  <p className="mt-2 text-[10px] text-[#9aa39f]">
                    Dibuat otomatis dari judul
                    dan dapat diedit.
                  </p>

                </div>

                {/* KATEGORI + TANGGAL */}

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
                      className="h-12 w-full rounded-xl border border-[#dfe6e2] bg-white px-4 text-[12px] text-[#37413d] outline-none focus:border-[#075b43] focus:ring-4 focus:ring-[#075b43]/10"
                    >

                      {categories.map(
                        (category) => (
                          <option
                            key={category}
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
                      Tanggal
                    </label>

                    <input
                      type="date"
                      name="tanggal"
                      value={form.tanggal}
                      onChange={handleChange}
                      required
                      className="h-12 w-full rounded-xl border border-[#dfe6e2] bg-white px-4 text-[12px] text-[#37413d] outline-none focus:border-[#075b43] focus:ring-4 focus:ring-[#075b43]/10"
                    />

                  </div>

                </div>

                {/* PENULIS */}

                <div>

                  <label className="mb-2 block text-[11px] font-semibold text-[#37413d]">
                    Penulis
                  </label>

                  <input
                    name="penulis"
                    value={form.penulis}
                    onChange={handleChange}
                    placeholder="Contoh: Admin Kampung Paluh"
                    required
                    className="h-12 w-full rounded-xl border border-[#dfe6e2] bg-white px-4 text-[13px] text-[#17201d] outline-none placeholder:text-[#a2aaa6] focus:border-[#075b43] focus:ring-4 focus:ring-[#075b43]/10"
                  />

                </div>

                {/* RINGKASAN */}

                <div>

                  <label className="mb-2 block text-[11px] font-semibold text-[#37413d]">
                    Ringkasan
                  </label>

                  <textarea
                    name="ringkasan"
                    value={
                      form.ringkasan
                    }
                    onChange={handleChange}
                    rows={3}
                    maxLength={300}
                    placeholder="Ringkasan singkat berita..."
                    required
                    className="w-full resize-y rounded-xl border border-[#dfe6e2] bg-white px-4 py-3 text-[13px] leading-[1.7] text-[#17201d] outline-none placeholder:text-[#a2aaa6] focus:border-[#075b43] focus:ring-4 focus:ring-[#075b43]/10"
                  />

                  <div className="mt-1 text-right text-[9px] text-[#9aa39f]">
                    {form.ringkasan.length}/300
                  </div>

                </div>

                {/* ISI */}

                <div>

                  <label className="mb-2 block text-[11px] font-semibold text-[#37413d]">
                    Isi Berita
                  </label>

                  <textarea
                    name="isi"
                    value={form.isi}
                    onChange={handleChange}
                    rows={10}
                    placeholder="Tulis isi berita secara lengkap..."
                    required
                    className="w-full resize-y rounded-xl border border-[#dfe6e2] bg-white px-4 py-3 text-[13px] leading-[1.8] text-[#17201d] outline-none placeholder:text-[#a2aaa6] focus:border-[#075b43] focus:ring-4 focus:ring-[#075b43]/10"
                  />

                </div>

                {/* STATUS */}

                <div>

                  <label className="mb-2 block text-[11px] font-semibold text-[#37413d]">
                    Status
                  </label>

                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
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

                {/* FOTO */}

                <div>

                  <label className="mb-2 block text-[11px] font-semibold text-[#37413d]">
                    URL Foto
                  </label>

                  <input
                    name="foto"
                    value={form.foto}
                    onChange={handleChange}
                    placeholder="https://..."
                    className="h-12 w-full rounded-xl border border-[#dfe6e2] bg-white px-4 text-[13px] text-[#17201d] outline-none placeholder:text-[#a2aaa6] focus:border-[#075b43] focus:ring-4 focus:ring-[#075b43]/10"
                  />

                  <p className="mt-2 text-[10px] text-[#9aa39f]">
                    Untuk sementara gunakan URL
                    foto. Firebase Storage akan
                    ditambahkan kemudian.
                  </p>

                  {form.foto && (
                    <div className="mt-3 h-40 overflow-hidden rounded-xl bg-[#edf2ef]">

                      <img
                        src={form.foto}
                        alt="Preview"
                        className="h-full w-full object-cover"
                      />

                    </div>
                  )}

                </div>

              </div>

              {/* FOOTER */}

              <div className="flex justify-end gap-3 border-t border-[#edf1ef] bg-[#fafcfb] px-6 py-4">

                <button
                  type="button"
                  onClick={closeForm}
                  className="rounded-xl border border-[#dfe6e2] bg-white px-5 py-2.5 text-[11px] font-semibold text-[#68736e] hover:bg-[#f4f7f5]"
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
                      : "Tambah Berita"}

                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}