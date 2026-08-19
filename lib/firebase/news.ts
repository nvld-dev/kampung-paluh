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

  foto: string;

  status: "aktif" | "nonaktif";
}

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

  return snapshot.docs.map((item) => ({
    id: item.id,
    ...(item.data() as Omit<NewsData, "id">),
  }));
}

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

    foto: data.foto,

    status: data.status,

    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return document.id;
}

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

    foto: data.foto,

    status: data.status,

    updatedAt: serverTimestamp(),
  });
}

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