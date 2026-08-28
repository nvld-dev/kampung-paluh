"use client";

import { useEffect, useRef } from "react";

import "leaflet/dist/leaflet.css";

interface LeafletMapProps {
  nama?: string;
}

export default function LeafletMap({
  nama = "Kampung Paluh",
}: LeafletMapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Jangan membuat map dua kali
    if (mapInstanceRef.current) return;

    let cancelled = false;

    async function initMap() {
      // =====================================================
      // IMPORT LEAFLET
      // =====================================================

      const L = await import("leaflet");

      if (cancelled || !mapRef.current) return;

      // Pastikan tidak ada instance lama
      if (mapInstanceRef.current) return;

      // =====================================================
      // KOORDINAT KAMPUNG PALUH
      // =====================================================

      const latitude = 0.797965;
      const longitude = 102.075119;

      console.log("Koordinat Kampung Paluh:", {
        latitude,
        longitude,
      });

      // =====================================================
      // MAP
      // =====================================================

      const map = L.map(mapRef.current, {
        center: [latitude, longitude],
        zoom: 14,
        zoomControl: true,
      });

      mapInstanceRef.current = map;

      // =====================================================
      // OPENSTREETMAP
      // =====================================================

      L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          maxZoom: 19,

          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a>',
        }
      ).addTo(map);

      // =====================================================
      // BATAS WILAYAH KAMPUNG PALUH
      // =====================================================

      try {
        const response = await fetch("/data/batasPaluh.geojson");

        if (!response.ok) {
          throw new Error(
            `Gagal mengambil GeoJSON. Status: ${response.status}`
          );
        }

        const geojson = await response.json();

        if (cancelled || !mapInstanceRef.current) return;

        // ===================================================
        // GEOJSON LAYER
        // ===================================================

        const batasLayer = L.geoJSON(geojson, {
          style: {
            color: "#075b43",
            weight: 3,
            opacity: 1,

            fillColor: "#3c9b78",
            fillOpacity: 0.15,

            lineJoin: "round",
            lineCap: "round",
          },

          // =================================================
          // INTERAKSI BATAS
          // =================================================

          onEachFeature: (_feature, layer) => {
            layer.bindPopup(`
              <div
                style="
                  min-width: 170px;
                  text-align: center;
                  font-family: Arial, sans-serif;
                  padding: 5px;
                "
              >
                <strong
                  style="
                    color: #075b43;
                    font-size: 14px;
                  "
                >
                  ${nama}
                </strong>

                <div
                  style="
                    margin-top: 5px;
                    color: #68716d;
                    font-size: 11px;
                  "
                >
                  Batas Wilayah Kampung
                </div>
              </div>
            `);

            layer.on({
              mouseover: (event: any) => {
                event.target.setStyle({
                  weight: 4,
                  color: "#003c2b",
                  fillColor: "#3c9b78",
                  fillOpacity: 0.22,
                });
              },

              mouseout: (event: any) => {
                event.target.setStyle({
                  weight: 3,
                  color: "#075b43",
                  fillColor: "#3c9b78",
                  fillOpacity: 0.15,
                });
              },
            });
          },
        }).addTo(map);

        // ===================================================
        // AUTO FIT KE BATAS WILAYAH
        // ===================================================

        const bounds = batasLayer.getBounds();

        if (bounds.isValid()) {
          map.fitBounds(bounds, {
            padding: [30, 30],
          });
        }

        console.log("Batas wilayah Kampung Paluh berhasil dimuat.");
      } catch (error) {
        console.error(
          "Gagal memuat batas wilayah Kampung Paluh:",
          error
        );
      }

      // =====================================================
      // MARKER KAMPUNG PALUH
      // =====================================================

      const marker = L.marker([
        latitude,
        longitude,
      ]).addTo(map);

      marker
        .bindPopup(
          `
            <div
              style="
                min-width: 150px;
                text-align: center;
                font-family: Arial, sans-serif;
                padding: 4px;
              "
            >
              <strong
                style="
                  color: #075b43;
                  font-size: 14px;
                "
              >
                ${nama}
              </strong>

              <div
                style="
                  margin-top: 5px;
                  color: #68716d;
                  font-size: 11px;
                "
              >
                Lokasi Kampung
              </div>
            </div>
          `
        )
        .openPopup();

      // =====================================================
      // RESIZE
      // =====================================================

      setTimeout(() => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize();
        }
      }, 300);
    }

    initMap();

    // =====================================================
    // CLEANUP
    // =====================================================

    return () => {
      cancelled = true;

      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [nama]);

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div
      ref={mapRef}
      className="h-full min-h-[360px] w-full"
      style={{
        minHeight: "360px",
      }}
    />
  );
}