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
  foto: string;

  status: "aktif" | "nonaktif";
}

export async function getEvents(): Promise<EventData[]> {
  const eventsRef = collection(
    db,
    EVENTS_COLLECTION
  );

  const q = query(
    eventsRef,
    orderBy("tanggal", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((item) => ({
    id: item.id,
    ...(item.data() as Omit<EventData, "id">),
  }));
}

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
    foto: data.foto,
    status: data.status,

    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return document.id;
}

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
    foto: data.foto,
    status: data.status,

    updatedAt: serverTimestamp(),
  });
}

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