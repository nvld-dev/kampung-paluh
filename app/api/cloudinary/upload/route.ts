import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export const runtime = "nodejs";

const ALLOWED_FOLDERS = [
  "profil",
  "umkm",
  "produk",
  "kegiatan",
  "berita",
];

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export async function POST(request: Request) {
  try {
    const folder = request.headers.get("x-upload-folder");
    const contentType =
      request.headers.get("content-type") || "";

    if (
      typeof folder !== "string" ||
      !ALLOWED_FOLDERS.includes(folder)
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Folder upload tidak valid.",
        },
        { status: 400 }
      );
    }

    if (!contentType.startsWith("image/")) {
      return NextResponse.json(
        {
          success: false,
          error: "File harus berupa gambar.",
        },
        { status: 400 }
      );
    }

    const bytes = await request.arrayBuffer();

    if (!bytes.byteLength) {
      return NextResponse.json(
        {
          success: false,
          error: "File gambar tidak ditemukan.",
        },
        { status: 400 }
      );
    }

    if (bytes.byteLength > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          success: false,
          error: "Ukuran gambar maksimal 5 MB.",
        },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(bytes);

    const result = await new Promise<{
      secure_url: string;
      public_id: string;
      width: number;
      height: number;
      format: string;
      bytes: number;
    }>((resolve, reject) => {
      const uploadStream =
        cloudinary.uploader.upload_stream(
          {
            folder: `kampung-paluh/${folder}`,
            resource_type: "image",
          },
          (error, result) => {
            if (error) {
              reject(error);
              return;
            }

            if (!result) {
              reject(
                new Error(
                  "Cloudinary tidak mengembalikan hasil upload."
                )
              );
              return;
            }

            resolve({
              secure_url: result.secure_url,
              public_id: result.public_id,
              width: result.width,
              height: result.height,
              format: result.format,
              bytes: result.bytes,
            });
          }
        );

      uploadStream.end(buffer);
    });

    return NextResponse.json({
      success: true,
      data: {
        url: result.secure_url,
        publicId: result.public_id,
        width: result.width,
        height: result.height,
        format: result.format,
        bytes: result.bytes,
      },
    });
  } catch (error) {
    console.error(
      "=========================================="
    );
    console.error("CLOUDINARY UPLOAD ERROR:");
    console.error(error);
    console.error(
      "=========================================="
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Gagal mengupload gambar ke Cloudinary.",
      },
      { status: 500 }
    );
  }
}