"use client";

import { useEffect, useState } from "react";

import {
  createEvent,
  deleteEvent,
  EventData,
  getEvents,
  updateEvent,
} from "@/lib/firebase/events";

import ImageUpload from "@/components/admin/ImageUpload";

const initialForm: EventData = {
  judul: "",
  slug: "",
  deskripsi: "",
  tanggal: "",
  waktu: "",
  lokasi: "",
  foto: [],
  fotoPaths: [],
  status: "aktif",
};

export default function KegiatanAdminPage() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [form, setForm] = useState<EventData>(initialForm);

  const [editingId, setEditingId] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showForm, setShowForm] = useState(false);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  /* =========================================================
     LOAD DATA
  ========================================================= */

  useEffect(() => {
    loadEvents();
  }, []);

  async function loadEvents() {
    try {
      setLoading(true);
      setError("");

      const data = await getEvents();

      setEvents(data);
    } catch (error) {
      console.error("Gagal mengambil kegiatan:", error);

      setError(
        "Data kegiatan gagal dimuat. Periksa Firestore Rules."
      );
    } finally {
      setLoading(false);
    }
  }

  /* =========================================================
     SLUG
  ========================================================= */

  function createSlug(value: string) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }

  /* =========================================================
     FORM CHANGE
  ========================================================= */

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

  /* =========================================================
     FOTO - CLOUDINARY
  ========================================================= */

  function addPhoto() {
    setForm((previous) => ({
      ...previous,
      foto: [...previous.foto, ""],
      fotoPaths: [
        ...(previous.fotoPaths ?? []),
        "",
      ],
    }));
  }

  function handlePhotoUpload(
    index: number,
    image: {
      url: string;
      publicId: string;
    }
  ) {
    setForm((previous) => {
      const foto = [...previous.foto];
      const fotoPaths = [
        ...(previous.fotoPaths ?? []),
      ];

      foto[index] = image.url;
      fotoPaths[index] = image.publicId;

      return {
        ...previous,
        foto,
        fotoPaths,
      };
    });
  }

  async function deleteCloudinaryImage(
    publicId: string
  ) {
    if (!publicId) return;

    try {
      const response = await fetch(
        "/api/cloudinary/delete",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            publicId,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        console.error(
          "Gagal menghapus foto Cloudinary:",
          result
        );
      }
    } catch (error) {
      console.error(
        "Gagal menghubungi API Cloudinary:",
        error
      );
    }
  }

  async function removePhoto(index: number) {
    const publicId =
      form.fotoPaths?.[index] ?? "";

    /*
     * Hapus file dari Cloudinary jika
     * foto tersebut memang sudah diupload.
     */
    if (publicId) {
      await deleteCloudinaryImage(publicId);
    }

    setForm((previous) => ({
      ...previous,

      foto: previous.foto.filter(
        (_, photoIndex) =>
          photoIndex !== index
      ),

      fotoPaths: (
        previous.fotoPaths ?? []
      ).filter(
        (_, photoIndex) =>
          photoIndex !== index
      ),
    }));
  }

  /* =========================================================
     CREATE
  ========================================================= */

  function openCreate() {
    setForm({
      ...initialForm,
      foto: [],
      fotoPaths: [],
    });

    setEditingId(null);
    setMessage("");
    setError("");
    setShowForm(true);
  }

  /* =========================================================
     EDIT
  ========================================================= */

  function openEdit(item: EventData) {
    const photos = Array.isArray(item.foto)
      ? item.foto
      : item.foto
        ? [item.foto]
        : [];

    const paths = Array.isArray(item.fotoPaths)
      ? item.fotoPaths
      : item.fotoPaths
        ? [item.fotoPaths]
        : [];

    /*
     * Pastikan jumlah fotoPaths mengikuti
     * jumlah foto.
     *
     * Ini juga menjaga kompatibilitas
     * dengan data kegiatan lama.
     */
    const normalizedPaths = photos.map(
      (_, index) => paths[index] ?? ""
    );

    setForm({
      judul: item.judul ?? "",
      slug: item.slug ?? "",
      deskripsi: item.deskripsi ?? "",
      tanggal: item.tanggal ?? "",
      waktu: item.waktu ?? "",
      lokasi: item.lokasi ?? "",

      foto: photos,
      fotoPaths: normalizedPaths,

      status: item.status ?? "aktif",
    });

    setEditingId(item.id ?? null);
    setMessage("");
    setError("");
    setShowForm(true);
  }

  /* =========================================================
     CLOSE
  ========================================================= */

  function closeForm() {
    setShowForm(false);
    setEditingId(null);

    setForm({
      ...initialForm,
      foto: [],
      fotoPaths: [],
    });
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

    if (!form.judul.trim()) {
      setError("Judul kegiatan wajib diisi.");
      return;
    }

    if (!form.tanggal) {
      setError("Tanggal kegiatan wajib diisi.");
      return;
    }

    if (!form.lokasi.trim()) {
      setError("Lokasi kegiatan wajib diisi.");
      return;
    }

    /*
     * Hanya simpan foto yang memiliki URL.
     * fotoPaths mengikuti index foto.
     */
    const cleanedPhotos: string[] = [];
    const cleanedPhotoPaths: string[] = [];

    form.foto.forEach((photo, index) => {
      const cleanPhoto = photo.trim();

      if (!cleanPhoto) return;

      cleanedPhotos.push(cleanPhoto);
      cleanedPhotoPaths.push(
        form.fotoPaths?.[index] ?? ""
      );
    });

    const eventData: EventData = {
      ...form,

      judul: form.judul.trim(),
      slug: form.slug.trim(),
      deskripsi: form.deskripsi.trim(),
      tanggal: form.tanggal,
      waktu: form.waktu.trim(),
      lokasi: form.lokasi.trim(),

      foto: cleanedPhotos,
      fotoPaths: cleanedPhotoPaths,
    };

    try {
      setSaving(true);

      if (editingId) {
        await updateEvent(
          editingId,
          eventData
        );

        setMessage(
          "Kegiatan berhasil diperbarui."
        );
      } else {
        await createEvent(eventData);

        setMessage(
          "Kegiatan berhasil ditambahkan."
        );
      }

      await loadEvents();

      closeForm();
    } catch (error) {
      console.error(
        "Gagal menyimpan kegiatan:",
        error
      );

      setError(
        "Kegiatan gagal disimpan."
      );
    } finally {
      setSaving(false);
    }
  }

  /* =========================================================
     DELETE
  ========================================================= */

  async function handleDelete(
    item: EventData
  ) {
    if (!item.id) return;

    const confirmed = window.confirm(
      `Hapus kegiatan "${item.judul}"?`
    );

    if (!confirmed) return;

    try {
      setError("");
      setMessage("");

      /*
       * Hapus dokumen Firestore terlebih dahulu.
       */
      await deleteEvent(item.id);

      /*
       * Setelah dokumen berhasil dihapus,
       * hapus seluruh foto dari Cloudinary.
       */
      const photoPaths =
        item.fotoPaths ?? [];

      for (const publicId of photoPaths) {
        if (publicId) {
          await deleteCloudinaryImage(
            publicId
          );
        }
      }

      setMessage(
        "Kegiatan berhasil dihapus."
      );

      await loadEvents();
    } catch (error) {
      console.error(
        "Gagal menghapus kegiatan:",
        error
      );

      setError(
        "Kegiatan gagal dihapus."
      );
    }
  }

  /* =========================================================
     FORMAT DATE
  ========================================================= */

  function formatDate(date: string) {
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

  /* =========================================================
     RETURN
  ========================================================= */

  return (
    <div className="p-6 lg:p-8">

      {/* HEADER */}

      <div className="flex flex-col gap-5 border-b border-[#e5ebe7] pb-6 sm:flex-row sm:items-end sm:justify-between">

        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#2e8066]">
            Informasi Kampung
          </div>

          <h1 className="mt-2 text-[28px] font-semibold tracking-[-0.04em] text-[#17201d]">
            Kegiatan & Event
          </h1>

          <p className="mt-2 max-w-[620px] text-[13px] leading-[1.7] text-[#7a8580]">
            Kelola kegiatan dan event
            masyarakat Kampung Paluh yang
            ditampilkan pada portal.
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

          Tambah Kegiatan
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
            Total Kegiatan
          </div>

          <div className="mt-2 text-[26px] font-semibold tracking-[-0.04em] text-[#075b43]">
            {events.length}
          </div>
        </div>

        <div className="rounded-2xl border border-[#e4ebe7] bg-white p-5">
          <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#8a9490]">
            Kegiatan Aktif
          </div>

          <div className="mt-2 text-[26px] font-semibold tracking-[-0.04em] text-[#075b43]">
            {
              events.filter(
                (item) =>
                  item.status === "aktif"
              ).length
            }
          </div>
        </div>

        <div className="rounded-2xl border border-[#e4ebe7] bg-white p-5">
          <div className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#8a9490]">
            Event Mendatang
          </div>

          <div className="mt-2 text-[26px] font-semibold tracking-[-0.04em] text-[#075b43]">
            {
              events.filter(
                (item) =>
                  item.status === "aktif" &&
                  item.tanggal >=
                    new Date()
                      .toISOString()
                      .split("T")[0]
              ).length
            }
          </div>
        </div>

      </div>

      {/* TABLE */}

      <section className="mt-6 overflow-hidden rounded-2xl border border-[#e4ebe7] bg-white">

        <div className="border-b border-[#edf1ef] px-6 py-5">
          <h2 className="text-[14px] font-semibold text-[#27322e]">
            Daftar Kegiatan
          </h2>

          <p className="mt-1 text-[11px] text-[#8a9490]">
            Kegiatan yang tersimpan di
            Firestore.
          </p>
        </div>

        {loading ? (
          <div className="flex min-h-[250px] items-center justify-center">
            <div className="h-7 w-7 animate-spin rounded-full border-2 border-[#dce8e2] border-t-[#075b43]" />
          </div>
        ) : events.length === 0 ? (
          <div className="flex min-h-[280px] flex-col items-center justify-center px-6 text-center">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e9f1ed] text-[#075b43]">
              <svg
                width="25"
                height="25"
                viewBox="0 0 24 24"
                fill="none"
              >
                <rect
                  x="4"
                  y="5"
                  width="16"
                  height="15"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="1.7"
                />

                <path
                  d="M8 3V7M16 3V7M4 10H20"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />

                <path
                  d="M8 14H12M8 17H15"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <h3 className="mt-4 text-[14px] font-semibold text-[#27322e]">
              Belum ada kegiatan
            </h3>

            <p className="mt-1 max-w-[380px] text-[11px] leading-[1.7] text-[#8a9490]">
              Tambahkan kegiatan pertama
              Kampung Paluh.
            </p>

            <button
              type="button"
              onClick={openCreate}
              className="mt-5 rounded-xl bg-[#e9f1ed] px-4 py-2.5 text-[11px] font-semibold text-[#075b43] hover:bg-[#dcebe3]"
            >
              Tambah Kegiatan
            </button>

          </div>
        ) : (
          <div className="overflow-x-auto">

            <table className="w-full min-w-[900px] border-collapse">

              <thead>
                <tr className="border-b border-[#edf1ef] bg-[#fafcfb]">

                  <th className="px-6 py-3 text-left text-[9px] font-semibold uppercase tracking-[0.12em] text-[#8a9490]">
                    Kegiatan
                  </th>

                  <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-[0.12em] text-[#8a9490]">
                    Tanggal
                  </th>

                  <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-[0.12em] text-[#8a9490]">
                    Waktu
                  </th>

                  <th className="px-4 py-3 text-left text-[9px] font-semibold uppercase tracking-[0.12em] text-[#8a9490]">
                    Lokasi
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
                {events.map((item) => {

                  const firstPhoto =
                    Array.isArray(item.foto)
                      ? item.foto[0]
                      : "";

                  return (
                    <tr
                      key={item.id}
                      className="border-b border-[#f0f3f1] last:border-b-0 hover:bg-[#fbfcfb]"
                    >

                      {/* KEGIATAN */}

                      <td className="px-6 py-4">

                        <div className="flex items-center gap-3">

                          <div className="h-12 w-16 shrink-0 overflow-hidden rounded-xl bg-[#e9f1ed]">

                            {firstPhoto ? (
                              <img
                                src={firstPhoto}
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

                            <div className="max-w-[230px] truncate text-[12px] font-semibold text-[#27322e]">
                              {item.judul}
                            </div>

                            <div className="mt-1 max-w-[230px] truncate text-[10px] text-[#9aa39f]">
                              {item.deskripsi ||
                                "Deskripsi belum tersedia"}
                            </div>

                            <div className="mt-1 text-[9px] text-[#9aa39f]">
                              {Array.isArray(item.foto)
                                ? item.foto.length
                                : 0}{" "}
                              foto
                            </div>

                          </div>

                        </div>

                      </td>

                      {/* TANGGAL */}

                      <td className="px-4 py-4 text-[11px] font-medium text-[#53615b]">
                        {formatDate(
                          item.tanggal
                        )}
                      </td>

                      {/* WAKTU */}

                      <td className="px-4 py-4 text-[11px] text-[#68736e]">
                        {item.waktu || "-"}
                      </td>

                      {/* LOKASI */}

                      <td className="px-4 py-4 text-[11px] text-[#68736e]">
                        <div className="max-w-[180px] truncate">
                          {item.lokasi}
                        </div>
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
                  );
                })}
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
                    ? "Edit Kegiatan"
                    : "Tambah Kegiatan"}
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
                    Judul Kegiatan
                  </label>

                  <input
                    name="judul"
                    value={form.judul}
                    onChange={handleTitleChange}
                    placeholder="Contoh: Rewang Riang"
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
                    placeholder="rewang-riang"
                    className="h-12 w-full rounded-xl border border-[#dfe6e2] bg-[#f8faf9] px-4 text-[13px] text-[#59645f] outline-none focus:border-[#075b43] focus:ring-4 focus:ring-[#075b43]/10"
                  />

                  <p className="mt-2 text-[10px] text-[#9aa39f]">
                    Slug dibuat otomatis dari
                    judul dan dapat diedit.
                  </p>
                </div>

                {/* TANGGAL + WAKTU */}

                <div className="grid gap-5 sm:grid-cols-2">

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

                  <div>
                    <label className="mb-2 block text-[11px] font-semibold text-[#37413d]">
                      Waktu
                    </label>

                    <input
                      type="text"
                      name="waktu"
                      value={form.waktu}
                      onChange={handleChange}
                      placeholder="Contoh: 08.00 - 12.00 WIB"
                      className="h-12 w-full rounded-xl border border-[#dfe6e2] bg-white px-4 py-3 text-[12px] text-[#37413d] outline-none placeholder:text-[#a2aaa6] focus:border-[#075b43] focus:ring-4 focus:ring-[#075b43]/10"
                    />
                  </div>

                </div>

                {/* LOKASI */}

                <div>
                  <label className="mb-2 block text-[11px] font-semibold text-[#37413d]">
                    Lokasi
                  </label>

                  <input
                    name="lokasi"
                    value={form.lokasi}
                    onChange={handleChange}
                    placeholder="Contoh: Kampung Paluh"
                    required
                    className="h-12 w-full rounded-xl border border-[#dfe6e2] bg-white px-4 text-[13px] text-[#17201d] outline-none placeholder:text-[#a2aaa6] focus:border-[#075b43] focus:ring-4 focus:ring-[#075b43]/10"
                  />
                </div>

                {/* DESKRIPSI */}

                <div>
                  <label className="mb-2 block text-[11px] font-semibold text-[#37413d]">
                    Deskripsi Kegiatan
                  </label>

                  <textarea
                    name="deskripsi"
                    value={form.deskripsi}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Jelaskan kegiatan..."
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

                {/* =====================================================
                    FOTO KEGIATAN
                ====================================================== */}

                <div>

                  <div className="flex items-center justify-between gap-4">

                    <div>
                      <label className="block text-[11px] font-semibold text-[#37413d]">
                        Foto Kegiatan
                      </label>

                      <p className="mt-1 text-[10px] text-[#9aa39f]">
                        Upload beberapa foto untuk
                        satu kegiatan.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={addPhoto}
                      className="shrink-0 rounded-lg bg-[#e9f1ed] px-3 py-2 text-[10px] font-semibold text-[#075b43] transition hover:bg-[#dcebe3]"
                    >
                      + Tambah Foto
                    </button>

                  </div>

                  <div className="mt-4 grid gap-3">

                    {form.foto.length === 0 ? (
                      <div className="rounded-xl border border-dashed border-[#d8e2dc] bg-[#fafcfb] px-4 py-5 text-center">

                        <p className="text-[11px] text-[#8a9490]">
                          Belum ada foto.
                        </p>

                        <button
                          type="button"
                          onClick={addPhoto}
                          className="mt-2 text-[10px] font-semibold text-[#075b43] hover:underline"
                        >
                          Tambahkan foto pertama
                        </button>

                      </div>
                    ) : (
                      form.foto.map(
                        (photo, index) => (
                          <div
                            key={`${index}-${form.fotoPaths?.[index] ?? "empty"}`}
                            className="rounded-xl border border-[#e0e7e3] bg-[#fafcfb] p-3"
                          >

                            <div className="mb-3 flex items-center justify-between">

                              <span className="text-[10px] font-semibold text-[#59645f]">
                                Foto{" "}
                                {index + 1}
                              </span>

                              <button
                                type="button"
                                onClick={() =>
                                  removePhoto(
                                    index
                                  )
                                }
                                disabled={saving}
                                className="text-[10px] font-semibold text-[#a15f5a] hover:underline disabled:opacity-50"
                              >
                                Hapus
                              </button>

                            </div>

                            <ImageUpload
                              label=""
                              folder="kegiatan"
                              value={photo}
                              publicId={
                                form
                                  .fotoPaths?.[
                                  index
                                ] ?? ""
                              }
                              onUpload={(
                                image
                              ) =>
                                handlePhotoUpload(
                                  index,
                                  image
                                )
                              }
                            />

                          </div>
                        )
                      )
                    )}

                  </div>

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
                      : "Tambah Kegiatan"}

                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}