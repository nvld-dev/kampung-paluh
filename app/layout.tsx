import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://kampungpaluh.my.id"),

  title: {
    default: "Kampung Paluh | Portal Promosi Kampung",
    template: "%s | Kampung Paluh",
  },

  description:
    "Portal Promosi Kampung Paluh untuk mengenal profil, sejarah, potensi, UMKM, produk lokal, kegiatan, berita, dan kehidupan masyarakat Kampung Paluh.",

  keywords: [
    "Kampung Paluh",
    "Kampung Paluh Siak",
    "profil Kampung Paluh",
    "sejarah Kampung Paluh",
    "UMKM Kampung Paluh",
    "produk lokal Kampung Paluh",
    "kegiatan Kampung Paluh",
    "berita Kampung Paluh",
    "potensi Kampung Paluh",
  ],

  authors: [
    {
      name: "Kampung Paluh",
    },
  ],

  creator: "Kampung Paluh",
  publisher: "Kampung Paluh",

  alternates: {
    canonical: "https://kampungpaluh.my.id",
  },

  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://kampungpaluh.my.id",
    siteName: "Kampung Paluh",
    title: "Kampung Paluh | Portal Promosi Kampung",
    description:
      "Portal Promosi Kampung Paluh untuk mengenal profil, sejarah, potensi, UMKM, produk lokal, kegiatan, berita, dan kehidupan masyarakat Kampung Paluh.",
    images: [
      {
        url: "/images/logo.png",
        width: 512,
        height: 512,
        alt: "Logo Kampung Paluh",
      },
    ],
  },

  twitter: {
    card: "summary",
    title: "Kampung Paluh | Portal Promosi Kampung",
    description:
      "Informasi profil, sejarah, potensi, UMKM, produk lokal, kegiatan, dan berita Kampung Paluh.",
    images: ["/images/logo.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}