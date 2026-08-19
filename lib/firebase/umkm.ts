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

export const UMKM_COLLECTION = "umkm";

export interface UmkmData {
  id?: string;

  nama: string;
  pemilik: string;
  kategori: string;
  deskripsi: string;
  alamat: string;
  kontak: string;
  foto: string;
  status: "aktif" | "nonaktif";
}

export async function getUmkm(): Promise<UmkmData[]> {
  const umkmRef = collection(db, UMKM_COLLECTION);

  const q = query(
    umkmRef,
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((item) => ({
    id: item.id,
    ...(item.data() as Omit<UmkmData, "id">),
  }));
}

export async function createUmkm(
  data: UmkmData
): Promise<string> {
  const umkmRef = collection(db, UMKM_COLLECTION);

  const document = await addDoc(umkmRef, {
    nama: data.nama,
    pemilik: data.pemilik,
    kategori: data.kategori,
    deskripsi: data.deskripsi,
    alamat: data.alamat,
    kontak: data.kontak,
    foto: data.foto,
    status: data.status,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return document.id;
}

export async function updateUmkm(
  id: string,
  data: UmkmData
): Promise<void> {
  const umkmRef = doc(
    db,
    UMKM_COLLECTION,
    id
  );

  await updateDoc(umkmRef, {
    nama: data.nama,
    pemilik: data.pemilik,
    kategori: data.kategori,
    deskripsi: data.deskripsi,
    alamat: data.alamat,
    kontak: data.kontak,
    foto: data.foto,
    status: data.status,
    updatedAt: serverTimestamp(),
  });
}

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