import type { MetadataRoute } from "next";

import { getUmkm } from "@/lib/firebase/umkm";
import { getEvents } from "@/lib/firebase/events";
import { getNews } from "@/lib/firebase/news";

const BASE_URL = "https://kampungpaluh.my.id";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [umkm, events, news] = await Promise.all([
    getUmkm(),
    getEvents(),
    getNews(),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/profil`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/umkm`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/kegiatan`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/berita`,
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  const umkmPages: MetadataRoute.Sitemap = umkm
    .filter(
      (item) =>
        item.status === "aktif" &&
        typeof item.slug === "string" &&
        item.slug.trim() !== ""
    )
    .map((item) => ({
      url: `${BASE_URL}/umkm/${item.slug}`,
      changeFrequency: "weekly",
      priority: 0.8,
    }));

  const eventPages: MetadataRoute.Sitemap = events
    .filter(
      (item) =>
        item.status === "aktif" &&
        typeof item.slug === "string" &&
        item.slug.trim() !== ""
    )
    .map((item) => ({
      url: `${BASE_URL}/kegiatan/${item.slug}`,
      changeFrequency: "weekly",
      priority: 0.7,
    }));

  const newsPages: MetadataRoute.Sitemap = news
    .filter(
      (item) =>
        item.status === "aktif" &&
        typeof item.slug === "string" &&
        item.slug.trim() !== ""
    )
    .map((item) => ({
      url: `${BASE_URL}/berita/${item.slug}`,
      changeFrequency: "weekly",
      priority: 0.7,
    }));

  return [
    ...staticPages,
    ...umkmPages,
    ...eventPages,
    ...newsPages,
  ];
}