"use client";

import { ChangeEvent, useRef, useState } from "react";

interface ImageUploadProps {
  value?: string;
  publicId?: string;
  folder: "profil" | "umkm" | "produk" | "kegiatan" | "berita";
  onUpload: (data: {
    url: string;
    publicId: string;
  }) => void;
  onRemove?: () => void;
  label?: string;
  required?: boolean;
}

export default function ImageUpload({
  value,
  publicId,
  folder,
  onUpload,
  onRemove,
  label = "Foto",
  required = false,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

const [uploading, setUploading] = useState(false);
const [uploadProgress, setUploadProgress] = useState(0);
const [error, setError] = useState("");

async function handleChange(
  event: ChangeEvent<HTMLInputElement>
) {
  const file = event.target.files?.[0];

  if (!file) return;

  setError("");
  setUploadProgress(0);

  if (!file.type.startsWith("image/")) {
    setError("File harus berupa gambar.");
    event.target.value = "";
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    setError("Ukuran gambar maksimal 5 MB.");
    event.target.value = "";
    return;
  }

  try {
    setUploading(true);

    const result = await new Promise<{
      success: boolean;
      data?: {
        url: string;
        publicId: string;
      };
      error?: string;
    }>((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(
        "POST",
        "/api/cloudinary/upload"
      );

      xhr.setRequestHeader(
        "Content-Type",
        file.type
      );

      xhr.setRequestHeader(
        "X-Upload-Folder",
        folder
      );

      xhr.setRequestHeader(
        "Cache-Control",
        "no-cache"
      );

      // Progress upload
      xhr.upload.addEventListener(
        "progress",
        (event) => {
          if (event.lengthComputable) {
            const progress = Math.round(
              (event.loaded / event.total) * 100
            );

            setUploadProgress(progress);
          }
        }
      );

      xhr.addEventListener(
        "load",
        () => {
          const text = xhr.responseText;

          console.log(
            "CLOUDINARY UPLOAD"
          );
          console.log(
            "Status:",
            xhr.status
          );
          console.log(
            "Response:",
            text
          );

          if (
            xhr.status < 200 ||
            xhr.status >= 300
          ) {
            let message = text;

            try {
              const errorResult =
                JSON.parse(text);

              if (errorResult?.error) {
                message =
                  errorResult.error;
              }
            } catch {
              // Response bukan JSON
            }

            reject(
              new Error(
                `Upload gagal (${xhr.status}): ${message.slice(
                  0,
                  300
                )}`
              )
            );

            return;
          }

          try {
            const parsed =
              JSON.parse(text);

            resolve(parsed);
          } catch {
            reject(
              new Error(
                `Server tidak mengembalikan JSON: ${text.slice(
                  0,
                  300
                )}`
              )
            );
          }
        }
      );

      xhr.addEventListener(
        "error",
        () => {
          reject(
            new Error(
              "Tidak dapat terhubung ke server upload."
            )
          );
        }
      );

      xhr.addEventListener(
        "abort",
        () => {
          reject(
            new Error(
              "Upload dibatalkan."
            )
          );
        }
      );

      xhr.send(file);
    });

    if (!result.success) {
      throw new Error(
        result.error ||
          "Gagal mengupload gambar."
      );
    }

    if (
      !result.data?.url ||
      !result.data?.publicId
    ) {
      throw new Error(
        "Upload berhasil, tetapi URL atau Public ID gambar tidak ditemukan."
      );
    }

    // Pastikan progress 100%
    setUploadProgress(100);

    onUpload({
      url: result.data.url,
      publicId: result.data.publicId,
    });

    setError("");
  } catch (err) {
    console.error(
      "IMAGE UPLOAD ERROR:",
      err
    );

    setError(
      err instanceof Error
        ? err.message
        : "Gagal mengupload gambar."
    );

    setUploadProgress(0);
  } finally {
    setUploading(false);
    event.target.value = "";
  }
}

  async function handleRemove() {
    if (!value) {
      onRemove?.();
      return;
    }

    try {
      setUploading(true);
      setError("");

      if (publicId) {
        const response = await fetch(
          "/api/cloudinary/delete",
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              publicId,
            }),
            cache: "no-store",
          }
        );

        const text = await response.text();

        if (!response.ok) {
          let message = text;

          try {
            const errorResult = JSON.parse(text);

            if (errorResult?.error) {
              message = errorResult.error;
            }
          } catch {
            // Response bukan JSON
          }

          throw new Error(
            `Gagal menghapus gambar (${response.status}): ${message.slice(
              0,
              300
            )}`
          );
        }

        let result: {
          success?: boolean;
          error?: string;
        };

        try {
          result = JSON.parse(text);
        } catch {
          throw new Error(
            `Server tidak mengembalikan JSON: ${text.slice(
              0,
              300
            )}`
          );
        }

        if (!result.success) {
          throw new Error(
            result.error ||
              "Gagal menghapus gambar."
          );
        }
      }

      onRemove?.();
      setError("");
    } catch (err) {
      console.error(
        "IMAGE DELETE ERROR:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Gagal menghapus gambar."
      );
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-[#18352b] dark:text-white">
          {label}

          {required && (
            <span className="ml-1 text-red-500">
              *
            </span>
          )}
        </label>

        <p className="mt-1 text-xs text-[#718078] dark:text-[#9aa9a2]">
          JPG, JPEG, PNG, WebP. Maksimal 5 MB.
        </p>
      </div>

      {value ? (
  <div className="relative overflow-hidden rounded-2xl border border-[#dce7e1] bg-[#f7f9f7] dark:border-[#263a32] dark:bg-[#12221b]">
    <img
      src={value}
      alt={label}
      className="h-56 w-full object-cover"
    />

    <div className="absolute bottom-3 left-3 right-3 flex justify-end gap-2">
      <button
        type="button"
        onClick={() =>
          inputRef.current?.click()
        }
        disabled={uploading}
        className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-[#075b43] shadow-sm transition hover:bg-[#e9f1ed] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {uploading
          ? "Memproses..."
          : "Ganti Foto"}
      </button>

      {onRemove && (
        <button
          type="button"
          onClick={handleRemove}
          disabled={uploading}
          className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-red-600 shadow-sm transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {uploading
            ? "Memproses..."
            : "Hapus"}
        </button>
      )}
    </div>
  </div>
) : uploading ? (
  /* =====================================================
     PROSES UPLOAD
     ===================================================== */
  <div className="flex h-56 w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#75c6a4] bg-[#f4faf7] px-8 dark:border-[#3e8d6e] dark:bg-[#12221b]">

    {/* Icon */}
    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-[#e2f0e9] text-[#75a993] dark:bg-[#1d352b]">
      <svg
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      >
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="3"
        />

        <circle
          cx="8.5"
          cy="8.5"
          r="1.5"
        />

        <path
          d="M4 17l5-5 3 3 2-2 6 6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>

    {/* Text */}
    <span className="text-sm font-medium text-[#315247] dark:text-[#dce9e3]">
      Mengupload...
    </span>

    <span className="mt-1 text-xs text-[#7b8d84]">
      Sedang mengupload foto
    </span>

    {/* Progress */}
    <div className="mt-4 w-full max-w-[360px]">
      <div className="flex items-center justify-between text-[10px] font-medium text-[#718078]">
        <span>Upload</span>

        <span className="text-[#075b43]">
          {uploadProgress}%
        </span>
      </div>

      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[#dce8e2]">
        <div
          className="h-full rounded-full bg-[#2e8066] transition-all duration-200 ease-out"
          style={{
            width: `${uploadProgress}%`,
          }}
        />
      </div>
    </div>

    {/* Size */}
    <span className="mt-2 text-[10px] text-[#9aa39f]">
      Maksimal 5 MB
    </span>
  </div>
) : (
  /* =====================================================
     BELUM ADA FOTO
     ===================================================== */
  <button
    type="button"
    onClick={() =>
      inputRef.current?.click()
    }
    disabled={uploading}
    className="flex h-56 w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#cbdad2] bg-[#f7f9f7] transition hover:border-[#75c6a4] hover:bg-[#eef5f1] disabled:cursor-not-allowed disabled:opacity-60 dark:border-[#30483d] dark:bg-[#12221b] dark:hover:border-[#75c6a4]"
  >
    <svg
      className="mb-3 h-10 w-10 text-[#75a993]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 16l4.5-4.5a2 2 0 012.8 0L16 16m-2-2l1.5-1.5a2 2 0 012.8 0L20 15"
      />

      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14 8h.01"
      />

      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="3"
      />
    </svg>

    <span className="text-sm font-medium text-[#315247] dark:text-[#dce9e3]">
      Klik untuk memilih foto
    </span>

    <span className="mt-1 text-xs text-[#7b8d84]">
      Maksimal 5 MB
    </span>
  </button>
)}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={handleChange}
        className="hidden"
        disabled={uploading}
      />

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 dark:border-red-900/40 dark:bg-red-950/20">
          <p className="text-sm text-red-600 dark:text-red-400">
            {error}
          </p>
        </div>
      )}
    </div>
  );
}