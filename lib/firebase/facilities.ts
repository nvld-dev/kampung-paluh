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

export const FACILITIES_COLLECTION = "facilities";

export interface FacilityData {
  id?: string;
  nama: string;
  jumlah: number;
  deskripsi: string;
  status: "aktif" | "nonaktif";
}

export async function getFacilities(): Promise<
  FacilityData[]
> {
  const facilitiesRef = collection(
    db,
    FACILITIES_COLLECTION
  );

  const q = query(
    facilitiesRef,
    orderBy("nama", "asc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((item) => ({
    id: item.id,
    ...(item.data() as Omit<
      FacilityData,
      "id"
    >),
  }));
}

export async function createFacility(
  data: FacilityData
): Promise<string> {
  const facilitiesRef = collection(
    db,
    FACILITIES_COLLECTION
  );

  const document = await addDoc(
    facilitiesRef,
    {
      nama: data.nama,
      deskripsi: data.deskripsi,
      status: data.status,

      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }
  );

  return document.id;
}

export async function updateFacility(
  id: string,
  data: FacilityData
): Promise<void> {
  const facilityRef = doc(
    db,
    FACILITIES_COLLECTION,
    id
  );

  await updateDoc(facilityRef, {
    nama: data.nama,
    deskripsi: data.deskripsi,
    status: data.status,

    updatedAt: serverTimestamp(),
  });
}

export async function deleteFacility(
  id: string
): Promise<void> {
  const facilityRef = doc(
    db,
    FACILITIES_COLLECTION,
    id
  );

  await deleteDoc(facilityRef);
}