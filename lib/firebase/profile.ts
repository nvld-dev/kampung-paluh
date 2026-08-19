import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

import { db } from "./firestore";

export const PROFILE_COLLECTION = "profile";
export const PROFILE_DOCUMENT = "kampung";

export interface ProfileData {
  nama: string;
  deskripsiSingkat: string;

  sejarahSingkat: string;
  sejarahLengkap: string;

  alamat: string;
  dusun: number;

  kecamatan: string;
  kabupaten: string;
  provinsi: string;

  latitude: string;
  longitude: string;

  jumlahPenduduk: number | null;
  jumlahUmkm: number | null;
  luasWilayah: number | null;

  satuanLuas: string;
}

export async function getProfile(): Promise<
  Partial<ProfileData> | null
> {
  const profileRef = doc(
    db,
    PROFILE_COLLECTION,
    PROFILE_DOCUMENT
  );

  const snapshot = await getDoc(profileRef);

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.data() as Partial<ProfileData>;
}

export async function saveProfile(
  data: ProfileData
): Promise<void> {
  const profileRef = doc(
    db,
    PROFILE_COLLECTION,
    PROFILE_DOCUMENT
  );

  await setDoc(
    profileRef,
    {
      ...data,
      updatedAt: serverTimestamp(),
    },
    {
      merge: true,
    }
  );
}