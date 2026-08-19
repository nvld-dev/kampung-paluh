import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kampung Paluh | Portal Promosi Kampung",
  description:
    "Portal Promosi Kampung Paluh untuk mengenal potensi, kehidupan, kegiatan, dan produk lokal Kampung Paluh.",
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