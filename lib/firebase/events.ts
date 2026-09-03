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

export const EVENTS_COLLECTION = "events";

export interface EventData {
  id?: string;
  judul: string;
  slug: string;
  deskripsi: string;
  tanggal: string;
  waktu: string;
  lokasi: string;

  // URL foto dari Cloudinary
  foto: string[];

  // Public ID foto dari Cloudinary
  fotoPaths?: string[];

  status: "aktif" | "nonaktif";
}

/* =========================================================
   GET ALL EVENTS
========================================================= */

export async function getEvents(): Promise<EventData[]> {
  const eventsRef = collection(db, EVENTS_COLLECTION);

  const q = query(
    eventsRef,
    orderBy("tanggal", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((item) => {
    const data = item.data();

    return {
      id: item.id,

      judul: data.judul ?? "",
      slug: data.slug ?? "",
      deskripsi: data.deskripsi ?? "",
      tanggal: data.tanggal ?? "",
      waktu: data.waktu ?? "",
      lokasi: data.lokasi ?? "",

      // Pastikan foto selalu berupa array
      foto: Array.isArray(data.foto)
        ? data.foto
        : data.foto
          ? [data.foto]
          : [],

      // Pastikan fotoPaths selalu berupa array
      fotoPaths: Array.isArray(data.fotoPaths)
        ? data.fotoPaths
        : data.fotoPaths
          ? [data.fotoPaths]
          : [],

      status:
        data.status === "nonaktif"
          ? "nonaktif"
          : "aktif",
    };
  });
}

/* =========================================================
   CREATE EVENT
========================================================= */

export async function createEvent(
  data: EventData
): Promise<string> {
  const eventsRef = collection(
    db,
    EVENTS_COLLECTION
  );

  const document = await addDoc(eventsRef, {
    judul: data.judul,
    slug: data.slug,
    deskripsi: data.deskripsi,
    tanggal: data.tanggal,
    waktu: data.waktu,
    lokasi: data.lokasi,

    // Simpan URL foto Cloudinary
    foto: data.foto,

    // Simpan public ID Cloudinary
    fotoPaths: data.fotoPaths ?? [],

    status: data.status,

    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return document.id;
}

/* =========================================================
   UPDATE EVENT
========================================================= */

export async function updateEvent(
  id: string,
  data: EventData
): Promise<void> {
  const eventRef = doc(
    db,
    EVENTS_COLLECTION,
    id
  );

  await updateDoc(eventRef, {
    judul: data.judul,
    slug: data.slug,
    deskripsi: data.deskripsi,
    tanggal: data.tanggal,
    waktu: data.waktu,
    lokasi: data.lokasi,

    // Update URL foto
    foto: data.foto,

    // Update public ID foto
    fotoPaths: data.fotoPaths ?? [],

    status: data.status,

    updatedAt: serverTimestamp(),
  });
}

/* =========================================================
   DELETE EVENT
========================================================= */

export async function deleteEvent(
  id: string
): Promise<void> {
  const eventRef = doc(
    db,
    EVENTS_COLLECTION,
    id
  );

  await deleteDoc(eventRef);
}