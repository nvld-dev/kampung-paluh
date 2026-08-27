"use client";

import { useEffect, useRef } from "react";

type LeafletMapProps = {
  latitude: number;
  longitude: number;
  nama: string;
};

export default function LeafletMap({
  latitude,
  longitude,
  nama,
}: LeafletMapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    let cancelled = false;

    async function initMap() {
      const L = await import("leaflet");

      if (cancelled || !mapRef.current) return;

      if (mapInstanceRef.current) return;

      /* =====================================================
         FIX ICON LEAFLET
      ===================================================== */

      delete (L.Icon.Default.prototype as any)._getIconUrl;

      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",

        iconUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",

        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
      });

      /* =====================================================
         CREATE MAP
      ===================================================== */

      const map = L.map(mapRef.current, {
        center: [latitude, longitude],
        zoom: 15,
        zoomControl: true,
      });

      mapInstanceRef.current = map;

      /* =====================================================
         SATELLITE
      ===================================================== */

      const satellite = L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        {
          maxZoom: 19,

          attribution:
            "Tiles © Esri — Source: Esri, Maxar, Earthstar Geographics",
        }
      );

      /* =====================================================
         STREET MAP (default)
         Dipakai sebagai layer utama karena citra satelit Esri
         belum tersedia untuk sebagian area seperti Kampung
         Paluh — jika langsung dijadikan default, peta tampil
         kosong dengan watermark "Map data not yet available".
         OpenStreetMap punya cakupan global yang lebih lengkap.
      ===================================================== */

      const street = L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          maxZoom: 19,

          attribution:
            "© OpenStreetMap contributors",
        }
      );

      street.addTo(map);

      /* =====================================================
         MARKER
      ===================================================== */

      const marker = L.marker([
        latitude,
        longitude,
      ]).addTo(map);

      marker.bindPopup(`
        <div style="
          min-width:180px;
          font-family:Arial,sans-serif;
        ">

          <div style="
            font-size:13px;
            font-weight:700;
            color:#075b43;
            margin-bottom:4px;
          ">
            ${nama}
          </div>

          <div style="
            font-size:11px;
            color:#68716d;
          ">
            Lokasi Kampung Paluh
          </div>

        </div>
      `);

      marker.openPopup();

      /* =====================================================
         LAYER CONTROL
      ===================================================== */

      L.control
        .layers(
          {
            Peta: street,
            Satellite: satellite,
          },
          undefined,
          {
            position: "topright",
          }
        )
        .addTo(map);

      /* =====================================================
         SCALE
      ===================================================== */

      L.control
        .scale({
          imperial: false,
        })
        .addTo(map);

      /* =====================================================
         INVALIDATE SIZE
         Penting karena map berada di dalam grid
      ===================================================== */

      setTimeout(() => {
        map.invalidateSize();
      }, 200);
    }

    initMap();

    /* =======================================================
       CLEANUP
    ======================================================= */

    return () => {
      cancelled = true;

      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [latitude, longitude, nama]);

  return (
    <div
      ref={mapRef}
      className="
        h-[360px]
        w-full
        lg:h-[500px]
      "
    />
  );
}