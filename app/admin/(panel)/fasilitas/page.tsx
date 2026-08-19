"use client";

import { useEffect, useState } from "react";

import {
  createFacility,
  deleteFacility,
  getFacilities,
  updateFacility,
  FacilityData,
} from "@/lib/firebase/facilities";

const initialForm: FacilityData = {
  nama: "",
  jumlah: 1,
  deskripsi: "",
  status: "aktif",
};

export default function FasilitasAdminPage() {
  const [facilities, setFacilities] =
    useState<FacilityData[]>([]);

  const [form, setForm] =
    useState<FacilityData>(initialForm);

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
    loadFacilities();
  }, []);

  // =====================================================
  // LOAD DATA
  // =====================================================

  async function loadFacilities() {
    try {
      setLoading(true);
      setError("");

      const data = await getFacilities();

      setFacilities(data);
    } catch (error) {
      console.error(
        "Gagal mengambil fasilitas:",
        error
      );

      setError(
        "Data fasilitas gagal dimuat."
      );
    } finally {
      setLoading(false);
    }
  }

  // =====================================================
  // HANDLE CHANGE
  // =====================================================

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
      [name]:
        name === "jumlah"
          ? Number(value)
          : value,
    }));
  }

  // =====================================================
  // CREATE
  // =====================================================

  function openCreate() {
    setForm({
      ...initialForm,
      jumlah: 1,
    });

    setEditingId(null);
    setError("");
    setMessage("");
    setShowForm(true);
  }

  // =====================================================
  // EDIT
  // =====================================================

  function openEdit(item: FacilityData) {
    setForm({
      nama: item.nama ?? "",
      jumlah: item.jumlah ?? 1,
      deskripsi: item.deskripsi ?? "",
      status: item.status ?? "aktif",
    });

    setEditingId(item.id ?? null);
    setError("");
    setMessage("");
    setShowForm(true);
  }

  // =====================================================
  // CLOSE FORM
  // =====================================================

  function closeForm() {
    setShowForm(false);
    setEditingId(null);
    setForm({
      ...initialForm,
      jumlah: 1,
    });
  }

  // =====================================================
  // SUBMIT
  // =====================================================

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setMessage("");

    // Validasi nama
    if (!form.nama.trim()) {
      setError(
        "Nama fasilitas wajib diisi."
      );
      return;
    }

    // Validasi jumlah
    if (!form.jumlah || form.jumlah < 1) {
      setError(
        "Jumlah fasilitas minimal 1."
      );
      return;
    }

    // Validasi deskripsi
    if (!form.deskripsi.trim()) {
      setError(
        "Deskripsi fasilitas wajib diisi."
      );
      return;
    }

    try {
      setSaving(true);

      if (editingId) {
        await updateFacility(
          editingId,
          form
        );

        setMessage(
          "Fasilitas berhasil diperbarui."
        );
      } else {
        await createFacility(form);

        setMessage(
          "Fasilitas berhasil ditambahkan."
        );
      }

      await loadFacilities();

      closeForm();
    } catch (error) {
      console.error(
        "Gagal menyimpan fasilitas:",
        error
      );

      setError(
        "Fasilitas gagal disimpan."
      );
    } finally {
      setSaving(false);
    }
  }

  // =====================================================
  // DELETE
  // =====================================================

  async function handleDelete(
    item: FacilityData
  ) {
    if (!item.id) return;

    const confirmed = window.confirm(
      `Hapus fasilitas "${item.nama}"?`
    );

    if (!confirmed) return;

    try {
      setError("");
      setMessage("");

      await deleteFacility(item.id);

      setMessage(
        "Fasilitas berhasil dihapus."
      );

      await loadFacilities();
    } catch (error) {
      console.error(
        "Gagal menghapus fasilitas:",
        error
      );

      setError(
        "Fasilitas gagal dihapus."
      );
    }
  }

  // =====================================================
  // STATISTICS
  // =====================================================

  const totalJenis = facilities.length;

  const totalUnit = facilities.reduce(
    (total, item) =>
      total + (item.jumlah || 0),
    0
  );

  const totalAktif = facilities
    .filter(
      (item) =>
        item.status === "aktif"
    )
    .reduce(
      (total, item) =>
        total + (item.jumlah || 0),
      0
    );

  const totalNonaktif = facilities
    .filter(
      (item) =>
        item.status === "nonaktif"
    )
    .reduce(
      (total, item) =>
        total + (item.jumlah || 0),
      0
    );

  return (
    <div className="p-6 lg:p-8">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="flex flex-col gap-5 border-b border-[#e5ebe7] pb-6 sm:flex-row sm:items-end sm:justify-between">

        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#2e8066]">
            Data Kampung
          </div>

          <h1 className="mt-2 text-[28px] font-semibold tracking-[-0.04em] text-[#17201d]">
            Fasilitas Kampung
          </h1>

          <p className="mt-2 max-w-[620px] text-[13px] leading-[1.7] text-[#7a8580]">
            Kelola informasi fasilitas yang
            tersedia di Kampung Paluh.
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

          Tambah Fasilitas
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
          STATISTICS
      ====================================================== */}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        {/* Total Jenis */}

        <div className="rounded-2xl border border-[#e4ebe7] bg-white p-5">
          <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#8a9490]">
            Jenis Fasilitas
          </div>

          <div className="mt-2 text-[26px] font-semibold tracking-[-0.04em] text-[#075b43]">
            {loading
              ? "-"
              : totalJenis}
          </div>

          <div className="mt-1 text-[10px] text-[#9aa39f]">
            Jenis fasilitas tersedia
          </div>
        </div>

        {/* Total Unit */}

        <div className="rounded-2xl border border-[#e4ebe7] bg-white p-5">
          <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#8a9490]">
            Total Unit
          </div>

          <div className="mt-2 text-[26px] font-semibold tracking-[-0.04em] text-[#075b43]">
            {loading
              ? "-"
              : totalUnit}
          </div>

          <div className="mt-1 text-[10px] text-[#9aa39f]">
            Jumlah seluruh fasilitas
          </div>
        </div>

        {/* Aktif */}

        <div className="rounded-2xl border border-[#e4ebe7] bg-white p-5">
          <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#8a9490]">
            Aktif
          </div>

          <div className="mt-2 text-[26px] font-semibold tracking-[-0.04em] text-[#075b43]">
            {loading
              ? "-"
              : totalAktif}
          </div>

          <div className="mt-1 text-[10px] text-[#9aa39f]">
            Unit fasilitas aktif
          </div>
        </div>

        {/* Nonaktif */}

        <div className="rounded-2xl border border-[#e4ebe7] bg-white p-5">
          <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#8a9490]">
            Nonaktif
          </div>

          <div className="mt-2 text-[26px] font-semibold tracking-[-0.04em] text-[#075b43]">
            {loading
              ? "-"
              : totalNonaktif}
          </div>

          <div className="mt-1 text-[10px] text-[#9aa39f]">
            Unit fasilitas nonaktif
          </div>
        </div>

      </div>

      {/* =====================================================
          LIST
      ====================================================== */}

      <section className="mt-6 overflow-hidden rounded-2xl border border-[#e4ebe7] bg-white">

        <div className="border-b border-[#edf1ef] px-6 py-5">

          <h2 className="text-[14px] font-semibold text-[#27322e]">
            Daftar Fasilitas
          </h2>

          <p className="mt-1 text-[11px] text-[#8a9490]">
            Fasilitas yang tersimpan di
            Firestore.
          </p>

        </div>

        {/* LOADING */}

        {loading ? (
          <div className="flex min-h-[250px] items-center justify-center">

            <div className="h-7 w-7 animate-spin rounded-full border-2 border-[#dce8e2] border-t-[#075b43]" />

          </div>

        ) : facilities.length === 0 ? (

          /* EMPTY */

          <div className="flex min-h-[280px] flex-col items-center justify-center px-6 text-center">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e9f1ed] text-[#075b43]">

              <svg
                width="25"
                height="25"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M4 10L12 4L20 10V20H4V10Z"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinejoin="round"
                />

                <path
                  d="M8 20V14H16V20"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinejoin="round"
                />
              </svg>

            </div>

            <h3 className="mt-4 text-[14px] font-semibold text-[#27322e]">
              Belum ada fasilitas
            </h3>

            <p className="mt-1 max-w-[380px] text-[11px] leading-[1.7] text-[#8a9490]">
              Tambahkan fasilitas pertama
              Kampung Paluh.
            </p>

            <button
              type="button"
              onClick={openCreate}
              className="mt-5 rounded-xl bg-[#e9f1ed] px-4 py-2.5 text-[11px] font-semibold text-[#075b43] hover:bg-[#dcebe3]"
            >
              Tambah Fasilitas
            </button>

          </div>

        ) : (

          /* TABLE */

          <div className="overflow-x-auto">

            <table className="w-full min-w-[900px] border-collapse">

              <thead>

                <tr className="border-b border-[#edf1ef] bg-[#fafcfb]">

                  <th className="px-6 py-3 text-left text-[9px] font-semibold uppercase tracking-[0.12em] text-[#8a9490]">
                    Fasilitas
                  </th>

                  <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-[0.12em] text-[#8a9490]">
                    Jumlah
                  </th>

                  <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-[0.12em] text-[#8a9490]">
                    Deskripsi
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

                {facilities.map((item) => (

                  <tr
                    key={item.id}
                    className="border-b border-[#f0f3f1] last:border-b-0 hover:bg-[#fbfcfb]"
                  >

                    {/* NAMA */}

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-3">

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e9f1ed] text-[#075b43]">

                          <svg
                            width="21"
                            height="21"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M4 10L12 4L20 10V20H4V10Z"
                              stroke="currentColor"
                              strokeWidth="1.7"
                              strokeLinejoin="round"
                            />

                            <path
                              d="M8 20V14H16V20"
                              stroke="currentColor"
                              strokeWidth="1.7"
                              strokeLinejoin="round"
                            />
                          </svg>

                        </div>

                        <div>

                          <div className="text-[12px] font-semibold text-[#27322e]">
                            {item.nama}
                          </div>

                          <div className="mt-1 text-[10px] text-[#9aa39f]">
                            Fasilitas Kampung
                          </div>

                        </div>

                      </div>

                    </td>

                    {/* JUMLAH */}

                    <td className="px-4 py-5">

                      <div className="text-[13px] font-semibold text-[#075b43]">
                        {item.jumlah ?? 1}
                      </div>

                      <div className="mt-0.5 text-[9px] text-[#9aa39f]">
                        unit
                      </div>

                    </td>

                    {/* DESKRIPSI */}

                    <td className="max-w-[350px] px-4 py-5 text-[11px] leading-[1.6] text-[#68736e]">
                      {item.deskripsi}
                    </td>

                    {/* STATUS */}

                    <td className="px-4 py-5">

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

                    <td className="px-6 py-5">

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

      {/* =====================================================
          MODAL
      ====================================================== */}

      {showForm && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a110e]/45 p-4 backdrop-blur-sm">

          <div className="flex max-h-[90vh] w-full max-w-[620px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

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
                    ? "Edit Fasilitas"
                    : "Tambah Fasilitas"}
                </h2>

              </div>

              <button
                type="button"
                onClick={closeForm}
                className="flex h-9 w-9 items-center justify-center rounded-full text-[20px] text-[#7d8883] hover:bg-[#f3f6f4]"
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

                {/* NAMA */}

                <div>

                  <label className="mb-2 block text-[11px] font-semibold text-[#37413d]">
                    Nama Fasilitas
                  </label>

                  <input
                    name="nama"
                    value={form.nama}
                    onChange={handleChange}
                    placeholder="Contoh: Masjid"
                    required
                    className="h-12 w-full rounded-xl border border-[#dfe6e2] bg-white px-4 text-[13px] text-[#17201d] outline-none placeholder:text-[#a2aaa6] focus:border-[#075b43] focus:ring-4 focus:ring-[#075b43]/10"
                  />

                </div>

                {/* JUMLAH */}

                <div>

                  <label className="mb-2 block text-[11px] font-semibold text-[#37413d]">
                    Jumlah
                  </label>

                  <input
                    type="number"
                    name="jumlah"
                    value={form.jumlah}
                    onChange={handleChange}
                    min={1}
                    required
                    placeholder="Contoh: 5"
                    className="h-12 w-full rounded-xl border border-[#dfe6e2] bg-white px-4 text-[13px] text-[#17201d] outline-none placeholder:text-[#a2aaa6] focus:border-[#075b43] focus:ring-4 focus:ring-[#075b43]/10"
                  />

                  <p className="mt-2 text-[10px] text-[#9aa39f]">
                    Jumlah unit fasilitas yang
                    tersedia.
                  </p>

                </div>

                {/* DESKRIPSI */}

                <div>

                  <label className="mb-2 block text-[11px] font-semibold text-[#37413d]">
                    Deskripsi
                  </label>

                  <textarea
                    name="deskripsi"
                    value={form.deskripsi}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Jelaskan fasilitas yang tersedia..."
                    required
                    className="w-full resize-y rounded-xl border border-[#dfe6e2] bg-white px-4 py-3 text-[13px] leading-[1.7] text-[#17201d] outline-none placeholder:text-[#a2aaa6] focus:border-[#075b43] focus:ring-4 focus:ring-[#075b43]/10"
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
                      : "Tambah Fasilitas"}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}