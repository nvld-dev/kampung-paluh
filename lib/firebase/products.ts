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

export const PRODUCTS_COLLECTION = "products";

export type ProductType =
  | "umkm"
  | "perorangan"
  | "produk_kampung";

export interface ProductData {
  id?: string;

  nama: string;
  tipe: ProductType;
  idUmkm: string | null;
  penjual: string;

  kategori: string;
  deskripsi: string;
  harga: number | null;
  foto: string;

  status: "aktif" | "nonaktif";
}

export async function getProducts(): Promise<ProductData[]> {
  const productsRef = collection(
    db,
    PRODUCTS_COLLECTION
  );

  const q = query(
    productsRef,
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((item) => ({
    id: item.id,
    ...(item.data() as Omit<ProductData, "id">),
  }));
}

export async function createProduct(
  data: ProductData
): Promise<string> {
  const productsRef = collection(
    db,
    PRODUCTS_COLLECTION
  );

  const document = await addDoc(productsRef, {
    nama: data.nama,
    tipe: data.tipe,
    idUmkm: data.idUmkm,
    penjual: data.penjual,

    kategori: data.kategori,
    deskripsi: data.deskripsi,
    harga: data.harga,
    foto: data.foto,

    status: data.status,

    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return document.id;
}

export async function updateProduct(
  id: string,
  data: ProductData
): Promise<void> {
  const productRef = doc(
    db,
    PRODUCTS_COLLECTION,
    id
  );

  await updateDoc(productRef, {
    nama: data.nama,
    tipe: data.tipe,
    idUmkm: data.idUmkm,
    penjual: data.penjual,

    kategori: data.kategori,
    deskripsi: data.deskripsi,
    harga: data.harga,
    foto: data.foto,

    status: data.status,

    updatedAt: serverTimestamp(),
  });
}

export async function deleteProduct(
  id: string
): Promise<void> {
  const productRef = doc(
    db,
    PRODUCTS_COLLECTION,
    id
  );

  await deleteDoc(productRef);
}