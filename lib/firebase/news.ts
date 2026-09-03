import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { db } from "./firestore";

export const NEWS_COLLECTION = "news";

export type NewsCategory =
  | "Kegiatan"
  | "UMKM"
  | "Produk Lokal"
  | "Kampung"
  | "Pengumuman"
  | "Lainnya";

export interface NewsData {
  id?: string;

  judul: string;
  slug: string;
  ringkasan: string;
  isi: string;
  kategori: NewsCategory;
  penulis: string;
  tanggal: string;

  // URL gambar dari Cloudinary
  foto: string;

  // Public ID gambar dari Cloudinary
  fotoPath?: string;

  status: "aktif" | "nonaktif";
}

/* =========================================================
   GET ALL NEWS
========================================================= */

export async function getNews(): Promise<NewsData[]> {
  const newsRef = collection(
    db,
    NEWS_COLLECTION
  );

  const q = query(
    newsRef,
    orderBy("tanggal", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((item) => {
    const data = item.data();

    return {
      id: item.id,

      judul: data.judul ?? "",
      slug: data.slug ?? "",
      ringkasan: data.ringkasan ?? "",
      isi: data.isi ?? "",

      kategori:
        data.kategori ?? "Lainnya",

      penulis: data.penulis ?? "",
      tanggal: data.tanggal ?? "",

      foto: data.foto ?? "",

      // Mendukung data lama
      fotoPath: data.fotoPath ?? "",

      status:
        data.status === "nonaktif"
          ? "nonaktif"
          : "aktif",
    };
  });
}

/* =========================================================
   CREATE NEWS
========================================================= */

export async function createNews(
  data: NewsData
): Promise<string> {
  const newsRef = collection(
    db,
    NEWS_COLLECTION
  );

  const document = await addDoc(newsRef, {
    judul: data.judul,
    slug: data.slug,
    ringkasan: data.ringkasan,
    isi: data.isi,
    kategori: data.kategori,
    penulis: data.penulis,
    tanggal: data.tanggal,

    // URL Cloudinary
    foto: data.foto,

    // Public ID Cloudinary
    fotoPath: data.fotoPath ?? "",

    status: data.status,

    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return document.id;
}

/* =========================================================
   UPDATE NEWS
========================================================= */

export async function updateNews(
  id: string,
  data: NewsData
): Promise<void> {
  const newsRef = doc(
    db,
    NEWS_COLLECTION,
    id
  );

  await updateDoc(newsRef, {
    judul: data.judul,
    slug: data.slug,
    ringkasan: data.ringkasan,
    isi: data.isi,
    kategori: data.kategori,
    penulis: data.penulis,
    tanggal: data.tanggal,

    // Update URL Cloudinary
    foto: data.foto,

    // Update Public ID Cloudinary
    fotoPath: data.fotoPath ?? "",

    status: data.status,

    updatedAt: serverTimestamp(),
  });
}

/* =========================================================
   DELETE NEWS
========================================================= */

export async function deleteNews(
  id: string
): Promise<void> {
  const newsRef = doc(
    db,
    NEWS_COLLECTION,
    id
  );

  await deleteDoc(newsRef);
}