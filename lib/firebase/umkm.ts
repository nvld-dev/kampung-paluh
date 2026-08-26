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
  where,
} from "firebase/firestore";

import { db } from "./firestore";

export const UMKM_COLLECTION = "umkm";

/* =========================================================
   TYPE UMKM
========================================================= */

export interface UmkmData {
  id?: string;
  nama: string;
  slug?: string;
  pemilik: string;
  kategori: string;
  deskripsi: string;
  alamat: string;
  kontak: string;
  foto: string;
  gallery?: string[];
  status: "aktif" | "nonaktif";
}

/* =========================================================
   GENERATE SLUG
========================================================= */

export function generateUmkmSlug(
  nama: string
): string {
  return nama
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/* =========================================================
   GET SEMUA UMKM
========================================================= */

export async function getUmkm(): Promise<UmkmData[]> {
  const umkmRef = collection(
    db,
    UMKM_COLLECTION
  );

  const q = query(
    umkmRef,
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((item) => {
    const data =
      item.data() as Omit<UmkmData, "id">;

    return {
      id: item.id,
      ...data,
    };
  });
}

/* =========================================================
   GET UMKM BERDASARKAN SLUG
========================================================= */

export async function getUmkmBySlug(
  slug: string
): Promise<UmkmData | null> {
  const umkmRef = collection(
    db,
    UMKM_COLLECTION
  );

  const q = query(
    umkmRef,
    where("slug", "==", slug),
    where("status", "==", "aktif")
  );

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return null;
  }

  const item = snapshot.docs[0];

  const data =
    item.data() as Omit<UmkmData, "id">;

  return {
    id: item.id,
    ...data,
  };
}

/* =========================================================
   CREATE UMKM
========================================================= */

export async function createUmkm(
  data: UmkmData
): Promise<string> {
  const umkmRef = collection(
    db,
    UMKM_COLLECTION
  );

  const slug =
    data.slug?.trim() ||
    generateUmkmSlug(data.nama);

  const document = await addDoc(umkmRef, {
    nama: data.nama,
    slug,
    pemilik: data.pemilik,
    kategori: data.kategori,
    deskripsi: data.deskripsi,
    alamat: data.alamat,
    kontak: data.kontak,
    foto: data.foto,
    gallery: data.gallery || [],
    status: data.status,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return document.id;
}

/* =========================================================
   UPDATE UMKM
========================================================= */

export async function updateUmkm(
  id: string,
  data: UmkmData
): Promise<void> {
  const umkmRef = doc(
    db,
    UMKM_COLLECTION,
    id
  );

  const slug =
    data.slug?.trim() ||
    generateUmkmSlug(data.nama);

  await updateDoc(umkmRef, {
    nama: data.nama,
    slug,
    pemilik: data.pemilik,
    kategori: data.kategori,
    deskripsi: data.deskripsi,
    alamat: data.alamat,
    kontak: data.kontak,
    foto: data.foto,
    gallery: data.gallery || [],
    status: data.status,
    updatedAt: serverTimestamp(),
  });
}

/* =========================================================
   DELETE UMKM
========================================================= */

export async function deleteUmkm(
  id: string
): Promise<void> {
  const umkmRef = doc(
    db,
    UMKM_COLLECTION,
    id
  );

  await deleteDoc(umkmRef);
}