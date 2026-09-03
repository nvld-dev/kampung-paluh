import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function DELETE(request: Request) {
  try {
    const body = await request.json();

    const publicId = body?.publicId;

    if (typeof publicId !== "string" || !publicId.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "Public ID gambar tidak ditemukan.",
        },
        { status: 400 }
      );
    }

    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
      invalidate: true,
    });

    if (result.result !== "ok" && result.result !== "not found") {
      return NextResponse.json(
        {
          success: false,
          error: "Gagal menghapus gambar dari Cloudinary.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      result: result.result,
    });
  } catch (error) {
    console.error("Cloudinary delete error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Terjadi kesalahan saat menghapus gambar.",
      },
      { status: 500 }
    );
  }
}