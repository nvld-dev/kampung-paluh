"use client";

import { useEffect, useState } from "react";

import {
  createUmkm,
  deleteUmkm,
  getUmkm,
  UmkmData,
  updateUmkm,
} from "@/lib/firebase/umkm";

const initialForm: UmkmData = {
  nama: "",
  pemilik: "",
  kategori: "",
  deskripsi: "",
  alamat: "",
  kontak: "",
  foto: "",
  status: "aktif",
};

const categories = [
  "Kuliner",
  "Kerajinan",
  "Pertanian",
  "Perkebunan",
  "Peternakan",
  "Jasa",
  "Lainnya",
];

export default function UmkmAdminPage() {
  const [data, setData] = useState<UmkmData[]>([]);
  const [form, setForm] = useState<UmkmData>(initialForm);

  const [editingId, setEditingId] =
    useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showForm, setShowForm] = useState(false);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);
      setError("");

      const result = await getUmkm();

      setData(result);
    } catch (error) {
      console.error("Gagal mengambil data UMKM:", error);

      setError(
        "Data UMKM gagal dimuat. Periksa Firestore Rules."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function openCreate() {
    setForm(initialForm);
    setEditingId(null);
    setMessage("");
    setError("");
    setShowForm(true);
  }

  function openEdit(item: UmkmData) {
    setForm({
      nama: item.nama ?? "",
      pemilik: item.pemilik ?? "",
      kategori: item.kategori ?? "",
      deskripsi: item.deskripsi ?? "",
      alamat: item.alamat ?? "",
      kontak: item.kontak ?? "",
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

    if (!form.nama.trim()) {
      setError("Nama UMKM wajib diisi.");
      return;
    }

    if (!form.kategori.trim()) {
      setError("Kategori UMKM wajib dipilih.");
      return;
    }

    try {
      setSaving(true);

      if (editingId) {
        await updateUmkm(editingId, form);

        setMessage(
          "Data UMKM berhasil diperbarui."
        );
      } else {
        await createUmkm(form);

        setMessage(
          "Data UMKM berhasil ditambahkan."
        );
      }

      await loadData();

      closeForm();
    } catch (error) {
      console.error("Gagal menyimpan UMKM:", error);

      setError(
        "Data UMKM gagal disimpan."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(item: UmkmData) {
    if (!item.id) return;

    const confirmed = window.confirm(
      `Hapus UMKM "${item.nama}"?`
    );

    if (!confirmed) return;

    try {
      setError("");
      setMessage("");

      await deleteUmkm(item.id);

      setMessage(
        "Data UMKM berhasil dihapus."
      );

      await loadData();
    } catch (error) {
      console.error("Gagal menghapus UMKM:", error);

      setError(
        "Data UMKM gagal dihapus."
      );
    }
  }

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
            UMKM Kampung
          </h1>

          <p className="mt-2 max-w-[620px] text-[13px] leading-[1.7] text-[#7a8580]">
            Kelola data pelaku usaha dan UMKM yang
            ditampilkan pada Portal Promosi Kampung Paluh.
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
            shadow-[0_8px_25px_rgba(0,60,43,0.12)]
            transition-all
            hover:bg-[#075b43]
          "
        >
          <span className="text-[18px] leading-none">
            +
          </span>

          Tambah UMKM
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
            Total UMKM
          </div>

          <div className="mt-2 text-[26px] font-semibold tracking-[-0.04em] text-[#075b43]">
            {data.length}
          </div>
        </div>

        <div className="rounded-2xl border border-[#e4ebe7] bg-white p-5">
          <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#8a9490]">
            Aktif
          </div>

          <div className="mt-2 text-[26px] font-semibold tracking-[-0.04em] text-[#075b43]">
            {
              data.filter(
                (item) => item.status === "aktif"
              ).length
            }
          </div>
        </div>

        <div className="rounded-2xl border border-[#e4ebe7] bg-white p-5">
          <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#8a9490]">
            Nonaktif
          </div>

          <div className="mt-2 text-[26px] font-semibold tracking-[-0.04em] text-[#7d5d58]">
            {
              data.filter(
                (item) => item.status === "nonaktif"
              ).length
            }
          </div>
        </div>

      </div>

      {/* =====================================================
          DATA TABLE
      ====================================================== */}
      <section className="mt-6 overflow-hidden rounded-2xl border border-[#e4ebe7] bg-white">

        <div className="border-b border-[#edf1ef] px-6 py-5">
          <h2 className="text-[14px] font-semibold text-[#27322e]">
            Daftar UMKM
          </h2>

          <p className="mt-1 text-[11px] text-[#8a9490]">
            Data UMKM yang tersimpan di Firestore.
          </p>
        </div>

        {loading ? (
          <div className="flex min-h-[250px] items-center justify-center">
            <div className="h-7 w-7 animate-spin rounded-full border-2 border-[#dce8e2] border-t-[#075b43]" />
          </div>
        ) : data.length === 0 ? (
          <div className="flex min-h-[280px] flex-col items-center justify-center px-6 text-center">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e9f1ed] text-[#075b43]">
              <svg
                width="25"
                height="25"
                viewBox="0 0 24 24"
                fill="none"
              >
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
            </div>

            <h3 className="mt-4 text-[14px] font-semibold text-[#27322e]">
              Belum ada UMKM
            </h3>

            <p className="mt-1 max-w-[380px] text-[11px] leading-[1.7] text-[#8a9490]">
              Tambahkan UMKM pertama Kampung Paluh
              menggunakan tombol di atas.
            </p>

            <button
              type="button"
              onClick={openCreate}
              className="mt-5 rounded-xl bg-[#e9f1ed] px-4 py-2.5 text-[11px] font-semibold text-[#075b43] transition-colors hover:bg-[#dcebe3]"
            >
              Tambah UMKM
            </button>

          </div>
        ) : (
          <div className="overflow-x-auto">

            <table className="w-full min-w-[760px] border-collapse">

              <thead>
                <tr className="border-b border-[#edf1ef] bg-[#fafcfb]">
                  <th className="px-6 py-3 text-left text-[9px] font-semibold uppercase tracking-[0.12em] text-[#8a9490]">
                    UMKM
                  </th>

                  <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-[0.12em] text-[#8a9490]">
                    Pemilik
                  </th>

                  <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-[0.12em] text-[#8a9490]">
                    Kategori
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
                {data.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-[#f0f3f1] last:border-b-0 hover:bg-[#fbfcfb]"
                  >

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
                          <div className="max-w-[240px] truncate text-[12px] font-semibold text-[#27322e]">
                            {item.nama}
                          </div>

                          <div className="mt-1 max-w-[240px] truncate text-[10px] text-[#9aa39f]">
                            {item.kontak || "Kontak belum tersedia"}
                          </div>
                        </div>

                      </div>
                    </td>

                    <td className="px-4 py-4 text-[11px] text-[#68736e]">
                      {item.pemilik || "-"}
                    </td>

                    <td className="px-4 py-4">
                      <span className="rounded-full bg-[#edf5f0] px-2.5 py-1 text-[9px] font-medium text-[#39705b]">
                        {item.kategori || "-"}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`
                          rounded-full
                          px-2.5
                          py-1
                          text-[9px]
                          font-semibold
                          ${
                            item.status === "aktif"
                              ? "bg-[#e9f5ed] text-[#28714b]"
                              : "bg-[#f3eeee] text-[#8a625d]"
                          }
                        `}
                      >
                        {item.status === "aktif"
                          ? "Aktif"
                          : "Nonaktif"}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">

                        <button
                          type="button"
                          onClick={() => openEdit(item)}
                          className="rounded-lg border border-[#dfe6e2] px-3 py-2 text-[10px] font-semibold text-[#53615b] transition-colors hover:border-[#b9ccc1] hover:bg-[#f5f8f6] hover:text-[#075b43]"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(item)}
                          className="rounded-lg border border-[#eadbd8] px-3 py-2 text-[10px] font-semibold text-[#9a625d] transition-colors hover:bg-[#fff5f3] hover:text-[#a63d32]"
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

      {/* =====================================================
          FORM MODAL
      ====================================================== */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a110e]/45 p-4 backdrop-blur-sm">

          <div className="flex max-h-[90vh] w-full max-w-[720px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#e5ebe7] px-6 py-5">

              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#2e8066]">
                  {editingId
                    ? "Edit Data"
                    : "Data Baru"}
                </div>

                <h2 className="mt-1 text-[18px] font-semibold tracking-[-0.03em] text-[#17201d]">
                  {editingId
                    ? "Edit UMKM"
                    : "Tambah UMKM"}
                </h2>
              </div>

              <button
                type="button"
                onClick={closeForm}
                className="flex h-9 w-9 items-center justify-center rounded-full text-[#7d8883] transition-colors hover:bg-[#f3f6f4] hover:text-[#27322e]"
              >
                ×
              </button>

            </div>

            {/* Modal Body */}
            <form
              onSubmit={handleSubmit}
              className="overflow-y-auto"
            >

              <div className="grid gap-5 p-6">

                {/* Nama */}
                <div>
                  <label className="mb-2 block text-[11px] font-semibold text-[#37413d]">
                    Nama UMKM
                  </label>

                  <input
                    name="nama"
                    value={form.nama}
                    onChange={handleChange}
                    placeholder="Contoh: UMKM Makmur Jaya"
                    required
                    className="h-12 w-full rounded-xl border border-[#dfe6e2] bg-white px-4 text-[13px] text-[#17201d] outline-none placeholder:text-[#a2aaa6] focus:border-[#075b43] focus:ring-4 focus:ring-[#075b43]/10"
                  />
                </div>

                {/* Pemilik + Kategori */}
                <div className="grid gap-5 sm:grid-cols-2">

                  <div>
                    <label className="mb-2 block text-[11px] font-semibold text-[#37413d]">
                      Nama Pemilik
                    </label>

                    <input
                      name="pemilik"
                      value={form.pemilik}
                      onChange={handleChange}
                      placeholder="Nama pemilik"
                      className="h-12 w-full rounded-xl border border-[#dfe6e2] bg-white px-4 text-[13px] text-[#17201d] outline-none placeholder:text-[#a2aaa6] focus:border-[#075b43] focus:ring-4 focus:ring-[#075b43]/10"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-[11px] font-semibold text-[#37413d]">
                      Kategori
                    </label>

                    <select
                      name="kategori"
                      value={form.kategori}
                      onChange={handleChange}
                      required
                      className="h-12 w-full rounded-xl border border-[#dfe6e2] bg-white px-4 text-[12px] text-[#37413d] outline-none focus:border-[#075b43] focus:ring-4 focus:ring-[#075b43]/10"
                    >
                      <option value="">
                        Pilih kategori
                      </option>

                      {categories.map((category) => (
                        <option
                          key={category}
                          value={category}
                        >
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                </div>

                {/* Deskripsi */}
                <div>
                  <label className="mb-2 block text-[11px] font-semibold text-[#37413d]">
                    Deskripsi
                  </label>

                  <textarea
                    name="deskripsi"
                    value={form.deskripsi}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Jelaskan secara singkat mengenai UMKM..."
                    className="w-full resize-y rounded-xl border border-[#dfe6e2] bg-white px-4 py-3 text-[13px] leading-[1.7] text-[#17201d] outline-none placeholder:text-[#a2aaa6] focus:border-[#075b43] focus:ring-4 focus:ring-[#075b43]/10"
                  />
                </div>

                {/* Alamat */}
                <div>
                  <label className="mb-2 block text-[11px] font-semibold text-[#37413d]">
                    Alamat
                  </label>

                  <textarea
                    name="alamat"
                    value={form.alamat}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Alamat UMKM..."
                    className="w-full resize-y rounded-xl border border-[#dfe6e2] bg-white px-4 py-3 text-[13px] leading-[1.7] text-[#17201d] outline-none placeholder:text-[#a2aaa6] focus:border-[#075b43] focus:ring-4 focus:ring-[#075b43]/10"
                  />
                </div>

                {/* Kontak + Status */}
                <div className="grid gap-5 sm:grid-cols-2">

                  <div>
                    <label className="mb-2 block text-[11px] font-semibold text-[#37413d]">
                      Kontak
                    </label>

                    <input
                      name="kontak"
                      value={form.kontak}
                      onChange={handleChange}
                      placeholder="08xxxxxxxxxx"
                      className="h-12 w-full rounded-xl border border-[#dfe6e2] bg-white px-4 text-[13px] text-[#17201d] outline-none placeholder:text-[#a2aaa6] focus:border-[#075b43] focus:ring-4 focus:ring-[#075b43]/10"
                    />
                  </div>

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

                </div>

                {/* Foto */}
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

                  <p className="mt-2 text-[10px] leading-[1.6] text-[#9aa39f]">
                    Untuk sementara gunakan URL gambar.
                    Upload gambar ke Firebase Storage akan
                    kita tambahkan pada tahap berikutnya.
                  </p>

                  {form.foto && (
                    <div className="mt-3 h-36 overflow-hidden rounded-xl bg-[#edf2ef]">
                      <img
                        src={form.foto}
                        alt="Preview"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                </div>

              </div>

              {/* Modal Footer */}
              <div className="flex justify-end gap-3 border-t border-[#edf1ef] bg-[#fafcfb] px-6 py-4">

                <button
                  type="button"
                  onClick={closeForm}
                  className="rounded-xl border border-[#dfe6e2] bg-white px-5 py-2.5 text-[11px] font-semibold text-[#68736e] transition-colors hover:bg-[#f4f7f5]"
                >
                  Batal
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#003c2b] px-5 py-2.5 text-[11px] font-semibold text-white transition-colors hover:bg-[#075b43] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving && (
                    <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  )}

                  {saving
                    ? "Menyimpan..."
                    : editingId
                      ? "Simpan Perubahan"
                      : "Tambah UMKM"}
                </button>

              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}