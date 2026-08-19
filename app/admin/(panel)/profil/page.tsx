"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";

import {
  getProfile,
  ProfileData,
  saveProfile,
} from "@/lib/firebase/profile";

const initialForm: ProfileData = {
  nama: "Kampung Paluh",
  deskripsiSingkat: "",

  sejarahSingkat: "",
  sejarahLengkap: "",

  alamat: "",
  dusun: 3,

  kecamatan: "",
  kabupaten: "",
  provinsi: "",

  latitude: "",
  longitude: "",

  jumlahPenduduk: null,
  jumlahUmkm: null,
  luasWilayah: null,

  satuanLuas: "km²",
};

export default function ProfilAdminPage() {
  const [form, setForm] = useState<ProfileData>(initialForm);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      setLoading(true);
      setError("");

      const data = await getProfile();

      if (data) {
        setForm({
          ...initialForm,
          ...data,
        });
      }
    } catch (err) {
      console.error("Gagal mengambil profil:", err);

      setError(
        "Data profil gagal dimuat. Silakan coba lagi."
      );
    } finally {
      setLoading(false);
    }
  }

  function handleChange(
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleNumberChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value === "" ? null : Number(value),
    }));
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setMessage("");
    setError("");

    if (!form.nama.trim()) {
      setError("Nama kampung wajib diisi.");
      return;
    }

    try {
      setSaving(true);

      await saveProfile(form);

      setMessage(
        "Profil Kampung Paluh berhasil disimpan."
      );
    } catch (err) {
      console.error("Gagal menyimpan profil:", err);

      setError(
        "Profil gagal disimpan. Periksa koneksi dan Firestore Rules."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#dce8e2] border-t-[#075b43]" />

          <p className="mt-4 text-[11px] text-[#7b8782]">
            Memuat data profil...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8">

      {/* =====================================================
          HEADER
      ====================================================== */}
      <div className="flex flex-col gap-4 border-b border-[#e5ebe7] pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#2e8066]">
            Konten Kampung
          </div>

          <h1 className="mt-2 text-[28px] font-semibold tracking-[-0.04em] text-[#17201d]">
            Profil Kampung
          </h1>

          <p className="mt-2 max-w-[650px] text-[13px] leading-[1.7] text-[#7a8580]">
            Kelola informasi utama Kampung Paluh yang
            digunakan pada website publik.
          </p>
        </div>

        <div className="rounded-xl border border-[#dce9e2] bg-[#e9f1ed] px-4 py-3">
          <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#5c756b]">
            Dokumen
          </div>

          <div className="mt-1 text-[11px] font-semibold text-[#174f3d]">
            profile / kampung
          </div>
        </div>
      </div>

      {/* =====================================================
          ALERT
      ====================================================== */}
      {message && (
        <div className="mt-6 rounded-xl border border-[#cde4d7] bg-[#edf8f1] px-4 py-3 text-[12px] text-[#236442]">
          {message}
        </div>
      )}

      {error && (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[12px] text-red-700">
          {error}
        </div>
      )}

      {/* =====================================================
          FORM
      ====================================================== */}
      <form
        onSubmit={handleSubmit}
        className="mt-6 max-w-[1000px] space-y-6"
      >

        {/* ===================================================
            INFORMASI UTAMA
        ==================================================== */}
        <section className="rounded-2xl border border-[#e4ebe7] bg-white shadow-[0_4px_20px_rgba(20,50,40,0.03)]">

          <div className="border-b border-[#edf1ef] px-6 py-5">
            <h2 className="text-[14px] font-semibold text-[#27322e]">
              Informasi Utama
            </h2>

            <p className="mt-1 text-[11px] text-[#8a9490]">
              Informasi dasar yang menggambarkan Kampung Paluh.
            </p>
          </div>

          <div className="grid gap-5 p-6">

            {/* Nama */}
            <div>
              <label className="mb-2 block text-[11px] font-semibold text-[#37413d]">
                Nama Kampung
              </label>

              <input
                name="nama"
                value={form.nama}
                onChange={handleChange}
                placeholder="Kampung Paluh"
                className="h-12 w-full rounded-xl border border-[#dfe6e2] bg-white px-4 text-[13px] text-[#17201d] outline-none transition-all placeholder:text-[#a2aaa6] focus:border-[#075b43] focus:ring-4 focus:ring-[#075b43]/10"
                required
              />
            </div>

            {/* Deskripsi */}
            <div>
              <label className="mb-2 block text-[11px] font-semibold text-[#37413d]">
                Deskripsi Singkat
              </label>

              <textarea
                name="deskripsiSingkat"
                value={form.deskripsiSingkat}
                onChange={handleChange}
                rows={4}
                placeholder="Deskripsi singkat mengenai Kampung Paluh..."
                className="w-full resize-y rounded-xl border border-[#dfe6e2] bg-white px-4 py-3 text-[13px] leading-[1.7] text-[#17201d] outline-none transition-all placeholder:text-[#a2aaa6] focus:border-[#075b43] focus:ring-4 focus:ring-[#075b43]/10"
              />

              <p className="mt-2 text-[10px] text-[#9aa39f]">
                Digunakan untuk pengenalan singkat pada website.
              </p>
            </div>

          </div>
        </section>

        {/* ===================================================
            SEJARAH
        ==================================================== */}
        <section className="rounded-2xl border border-[#e4ebe7] bg-white shadow-[0_4px_20px_rgba(20,50,40,0.03)]">

          <div className="border-b border-[#edf1ef] px-6 py-5">
            <h2 className="text-[14px] font-semibold text-[#27322e]">
              Sejarah Kampung
            </h2>

            <p className="mt-1 text-[11px] text-[#8a9490]">
              Kelola ringkasan dan sejarah lengkap Kampung Paluh.
            </p>
          </div>

          <div className="grid gap-5 p-6">

            <div>
              <label className="mb-2 block text-[11px] font-semibold text-[#37413d]">
                Sejarah Singkat
              </label>

              <textarea
                name="sejarahSingkat"
                value={form.sejarahSingkat}
                onChange={handleChange}
                rows={5}
                placeholder="Ringkasan sejarah Kampung Paluh..."
                className="w-full resize-y rounded-xl border border-[#dfe6e2] bg-white px-4 py-3 text-[13px] leading-[1.7] text-[#17201d] outline-none transition-all placeholder:text-[#a2aaa6] focus:border-[#075b43] focus:ring-4 focus:ring-[#075b43]/10"
              />
            </div>

            <div>
              <label className="mb-2 block text-[11px] font-semibold text-[#37413d]">
                Sejarah Lengkap
              </label>

              <textarea
                name="sejarahLengkap"
                value={form.sejarahLengkap}
                onChange={handleChange}
                rows={12}
                placeholder="Tuliskan sejarah lengkap Kampung Paluh..."
                className="w-full resize-y rounded-xl border border-[#dfe6e2] bg-white px-4 py-3 text-[13px] leading-[1.7] text-[#17201d] outline-none transition-all placeholder:text-[#a2aaa6] focus:border-[#075b43] focus:ring-4 focus:ring-[#075b43]/10"
              />

              <p className="mt-2 text-[10px] text-[#9aa39f]">
                Konten ini nantinya digunakan pada halaman Profil Kampung.
              </p>
            </div>

          </div>
        </section>

        {/* ===================================================
            LOKASI
        ==================================================== */}
        <section className="rounded-2xl border border-[#e4ebe7] bg-white shadow-[0_4px_20px_rgba(20,50,40,0.03)]">

          <div className="border-b border-[#edf1ef] px-6 py-5">
            <h2 className="text-[14px] font-semibold text-[#27322e]">
              Lokasi & Wilayah
            </h2>

            <p className="mt-1 text-[11px] text-[#8a9490]">
              Informasi administratif dan koordinat lokasi kampung.
            </p>
          </div>

          <div className="grid gap-5 p-6">

            <div>
              <label className="mb-2 block text-[11px] font-semibold text-[#37413d]">
                Alamat
              </label>

              <textarea
                name="alamat"
                value={form.alamat}
                onChange={handleChange}
                rows={3}
                placeholder="Alamat Kampung Paluh..."
                className="w-full resize-y rounded-xl border border-[#dfe6e2] bg-white px-4 py-3 text-[13px] leading-[1.7] text-[#17201d] outline-none transition-all placeholder:text-[#a2aaa6] focus:border-[#075b43] focus:ring-4 focus:ring-[#075b43]/10"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">

              <div>
                <label className="mb-2 block text-[11px] font-semibold text-[#37413d]">
                  Kecamatan
                </label>

                <input
                  name="kecamatan"
                  value={form.kecamatan}
                  onChange={handleChange}
                  placeholder="Kecamatan"
                  className="h-12 w-full rounded-xl border border-[#dfe6e2] bg-white px-4 text-[13px] text-[#17201d] outline-none transition-all placeholder:text-[#a2aaa6] focus:border-[#075b43] focus:ring-4 focus:ring-[#075b43]/10"
                />
              </div>

              <div>
                <label className="mb-2 block text-[11px] font-semibold text-[#37413d]">
                  Kabupaten
                </label>

                <input
                  name="kabupaten"
                  value={form.kabupaten}
                  onChange={handleChange}
                  placeholder="Kabupaten"
                  className="h-12 w-full rounded-xl border border-[#dfe6e2] bg-white px-4 text-[13px] text-[#17201d] outline-none transition-all placeholder:text-[#a2aaa6] focus:border-[#075b43] focus:ring-4 focus:ring-[#075b43]/10"
                />
              </div>

              <div>
                <label className="mb-2 block text-[11px] font-semibold text-[#37413d]">
                  Provinsi
                </label>

                <input
                  name="provinsi"
                  value={form.provinsi}
                  onChange={handleChange}
                  placeholder="Provinsi"
                  className="h-12 w-full rounded-xl border border-[#dfe6e2] bg-white px-4 text-[13px] text-[#17201d] outline-none transition-all placeholder:text-[#a2aaa6] focus:border-[#075b43] focus:ring-4 focus:ring-[#075b43]/10"
                />
              </div>

              <div>
                <label className="mb-2 block text-[11px] font-semibold text-[#37413d]">
                  Jumlah Dusun
                </label>

                <input
                  name="dusun"
                  type="number"
                  min="0"
                  value={form.dusun}
                  onChange={handleNumberChange}
                  className="h-12 w-full rounded-xl border border-[#dfe6e2] bg-white px-4 text-[13px] text-[#17201d] outline-none transition-all placeholder:text-[#a2aaa6] focus:border-[#075b43] focus:ring-4 focus:ring-[#075b43]/10"
                />
              </div>

            </div>

            {/* Koordinat */}
            <div>
              <div className="mb-3 text-[11px] font-semibold text-[#37413d]">
                Koordinat Lokasi
              </div>

              <div className="grid gap-5 sm:grid-cols-2">

                <div>
                  <label className="mb-2 block text-[10px] text-[#7d8883]">
                    Latitude
                  </label>

                  <input
                    name="latitude"
                    value={form.latitude}
                    onChange={handleChange}
                    placeholder="0.000000"
                    className="h-12 w-full rounded-xl border border-[#dfe6e2] bg-white px-4 text-[13px] text-[#17201d] outline-none transition-all placeholder:text-[#a2aaa6] focus:border-[#075b43] focus:ring-4 focus:ring-[#075b43]/10"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[10px] text-[#7d8883]">
                    Longitude
                  </label>

                  <input
                    name="longitude"
                    value={form.longitude}
                    onChange={handleChange}
                    placeholder="0.000000"
                    className="h-12 w-full rounded-xl border border-[#dfe6e2] bg-white px-4 text-[13px] text-[#17201d] outline-none transition-all placeholder:text-[#a2aaa6] focus:border-[#075b43] focus:ring-4 focus:ring-[#075b43]/10"
                  />
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* ===================================================
            STATISTIK
        ==================================================== */}
        <section className="rounded-2xl border border-[#e4ebe7] bg-white shadow-[0_4px_20px_rgba(20,50,40,0.03)]">

          <div className="border-b border-[#edf1ef] px-6 py-5">
            <h2 className="text-[14px] font-semibold text-[#27322e]">
              Statistik Kampung
            </h2>

            <p className="mt-1 text-[11px] text-[#8a9490]">
              Data statistik yang dapat ditampilkan pada Beranda.
            </p>
          </div>

          <div className="grid gap-5 p-6 sm:grid-cols-3">

            {/* Penduduk */}
            <div>
              <label className="mb-2 block text-[11px] font-semibold text-[#37413d]">
                Jumlah Penduduk
              </label>

              <input
                name="jumlahPenduduk"
                type="number"
                min="0"
                value={form.jumlahPenduduk ?? ""}
                onChange={handleNumberChange}
                placeholder="3200"
                className="h-12 w-full rounded-xl border border-[#dfe6e2] bg-white px-4 text-[13px] text-[#17201d] outline-none transition-all placeholder:text-[#a2aaa6] focus:border-[#075b43] focus:ring-4 focus:ring-[#075b43]/10"
              />

              <p className="mt-2 text-[10px] text-[#9aa39f]">
                Contoh: 3200
              </p>
            </div>

            {/* UMKM */}
            <div>
              <label className="mb-2 block text-[11px] font-semibold text-[#37413d]">
                Jumlah UMKM
              </label>

              <input
                name="jumlahUmkm"
                type="number"
                min="0"
                value={form.jumlahUmkm ?? ""}
                onChange={handleNumberChange}
                placeholder="15"
                className="h-12 w-full rounded-xl border border-[#dfe6e2] bg-white px-4 text-[13px] text-[#17201d] outline-none transition-all placeholder:text-[#a2aaa6] focus:border-[#075b43] focus:ring-4 focus:ring-[#075b43]/10"
              />

              <p className="mt-2 text-[10px] text-[#9aa39f]">
                Contoh: 15
              </p>
            </div>

            {/* Luas */}
            <div>
              <label className="mb-2 block text-[11px] font-semibold text-[#37413d]">
                Luas Wilayah
              </label>

              <div className="flex gap-2">
                <input
                  name="luasWilayah"
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.luasWilayah ?? ""}
                  onChange={handleNumberChange}
                  placeholder="0"
                  className="h-12 w-full rounded-xl border border-[#dfe6e2] bg-white px-4 text-[13px] text-[#17201d] outline-none transition-all placeholder:text-[#a2aaa6] focus:border-[#075b43] focus:ring-4 focus:ring-[#075b43]/10"
                />

                <select
                  name="satuanLuas"
                  value={form.satuanLuas}
                  onChange={handleChange}
                  className="h-12 rounded-xl border border-[#dfe6e2] bg-white px-3 text-[12px] text-[#37413d] outline-none focus:border-[#075b43] focus:ring-4 focus:ring-[#075b43]/10"
                >
                  <option value="km²">km²</option>
                  <option value="ha">ha</option>
                  <option value="m²">m²</option>
                </select>
              </div>
            </div>

          </div>
        </section>

        {/* ===================================================
            SAVE
        ==================================================== */}
        <div className="sticky bottom-4 z-10 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="
              inline-flex
              h-12
              items-center
              gap-2
              rounded-xl
              bg-[#003c2b]
              px-7
              text-[12px]
              font-semibold
              text-white
              shadow-[0_10px_30px_rgba(0,60,43,0.18)]
              transition-all
              hover:bg-[#075b43]
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {saving ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Menyimpan...
              </>
            ) : (
              <>
                Simpan Perubahan
                <span>→</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* =====================================================
          LOCAL STYLE
      ====================================================== */}
      
    </div>
  );
}