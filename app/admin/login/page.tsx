"use client";

import { FormEvent, useState } from "react";
import {
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  doc,
  getDoc,
} from "firebase/firestore";
import { useRouter } from "next/navigation";

import { auth } from "@/lib/firebase/auth";
import { db } from "@/lib/firebase/firestore";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      // Login Firebase Authentication
      const credential = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      const uid = credential.user.uid;

      // Cek data administrator
      const adminRef = doc(db, "admins", uid);
      const adminSnapshot = await getDoc(adminRef);

      if (!adminSnapshot.exists()) {
        await signOut(auth);

        setError(
          "Akun berhasil login, tetapi tidak terdaftar sebagai administrator."
        );

        return;
      }

      const adminData = adminSnapshot.data();

      // Cek status akun
      if (adminData.aktif !== true) {
        await signOut(auth);

        setError("Akun administrator sedang tidak aktif.");

        return;
      }

      // Cek role
      if (adminData.role !== "admin") {
        await signOut(auth);

        setError("Akun tidak memiliki akses ke CMS.");

        return;
      }

      // Berhasil
      router.replace("/admin");
    } catch (error: any) {
  console.error("LOGIN ERROR:", error);

  switch (error.code) {
    case "auth/invalid-credential":
      setError("Email atau password salah.");
      break;

    case "auth/user-not-found":
      setError("Akun administrator tidak ditemukan.");
      break;

    case "auth/wrong-password":
      setError("Password yang dimasukkan salah.");
      break;

    case "auth/invalid-email":
      setError("Format email tidak valid.");
      break;

    case "auth/too-many-requests":
      setError(
        "Terlalu banyak percobaan login. Silakan coba lagi nanti."
      );
      break;

    default:
      setError(
        "Terjadi kesalahan saat login. Silakan coba lagi."
      );
  }
} finally {
  setLoading(false);
}
  }

  return (
    <main className="min-h-screen bg-[#f5f8f6]">
      <div className="flex min-h-screen">

        {/* =====================================================
            LEFT — BRANDING
        ====================================================== */}
        <section
          className="
            relative
            hidden
            overflow-hidden
            bg-[#003c2b]
            lg:flex
            lg:w-[52%]
          "
        >
          {/* Decorative background */}
          <div className="absolute inset-0">
            <div
              className="
                absolute
                -left-32
                -top-32
                h-[420px]
                w-[420px]
                rounded-full
                bg-[#075b43]
                opacity-40
                blur-3xl
              "
            />

            <div
              className="
                absolute
                -bottom-40
                -right-20
                h-[500px]
                w-[500px]
                rounded-full
                bg-[#176d53]
                opacity-25
                blur-3xl
              "
            />
          </div>

          {/* Content */}
          <div className="relative flex w-full flex-col justify-between p-12 xl:p-16">

            {/* Logo / Brand */}
            <div>
              <div className="flex items-center gap-3">
                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    bg-white/10
                    text-white
                    backdrop-blur
                  "
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M12 3C7.5 5.2 5 8.4 5 12.2C5 17 8.1 20 12 21C15.9 20 19 17 19 12.2C19 8.4 16.5 5.2 12 3Z"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />

                    <path
                      d="M8 14C10.2 13.5 12.2 12.4 13.8 10.7C15 9.4 15.8 8 16.2 6.6"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <div>
                  <div className="text-[17px] font-semibold tracking-[-0.02em] text-white">
                    Kampung Paluh
                  </div>

                  <div className="mt-0.5 text-[10px] uppercase tracking-[0.18em] text-white/45">
                    Portal Promosi Kampung
                  </div>
                </div>
              </div>
            </div>

            {/* Main message */}
            <div className="max-w-[520px]">
              <div className="mb-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9de0bf]">
                Administrator
              </div>

              <h1
                className="
                  text-[42px]
                  font-semibold
                  leading-[1.05]
                  tracking-[-0.05em]
                  text-white
                  xl:text-[54px]
                "
              >
                Kelola informasi
                <br />
                Kampung Paluh.
              </h1>

              <p className="mt-6 max-w-[470px] text-[14px] leading-[1.8] text-white/55">
                Kelola profil kampung, UMKM, produk lokal,
                kegiatan masyarakat, serta cerita dan berita
                melalui satu panel administrasi.
              </p>
            </div>

            {/* Footer */}
            <div className="text-[10px] text-white/30">
              © 2026 Kampung Paluh
            </div>
          </div>
        </section>

        {/* =====================================================
            RIGHT — LOGIN FORM
        ====================================================== */}
        <section className="flex w-full items-center justify-center px-6 py-12 lg:w-[48%]">
          <div className="w-full max-w-[420px]">

            {/* Mobile brand */}
            <div className="mb-12 lg:hidden">
              <div className="text-[20px] font-semibold tracking-[-0.03em] text-[#003c2b]">
                Kampung Paluh
              </div>

              <div className="mt-1 text-[10px] font-medium uppercase tracking-[0.18em] text-[#7a8580]">
                Portal Promosi Kampung
              </div>
            </div>

            {/* Heading */}
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#2e8066]">
                CMS
              </div>

              <h2 className="mt-3 text-[32px] font-semibold tracking-[-0.04em] text-[#17201d]">
                Selamat datang kembali
              </h2>

              <p className="mt-3 text-[13px] leading-[1.7] text-[#727b77]">
                Masuk untuk mengelola konten Kampung Paluh.
              </p>
            </div>

            {/* Error */}
            {error && (
              <div
                className="
                  mt-7
                  rounded-xl
                  border
                  border-red-200
                  bg-red-50
                  px-4
                  py-3
                  text-[12px]
                  leading-[1.6]
                  text-red-700
                "
              >
                {error}
              </div>
            )}

            {/* Form */}
            <form
              onSubmit={handleLogin}
              className="mt-8 space-y-5"
            >
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-[11px] font-semibold text-[#37413d]"
                >
                  Email Administrator
                </label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  placeholder="admin@kampungpaluh.id"
                  autoComplete="email"
                  required
                  className="
                    h-12
                    w-full
                    rounded-xl
                    border
                    border-[#dfe6e2]
                    bg-white
                    px-4
                    text-[13px]
                    text-[#17201d]
                    outline-none
                    transition-all
                    placeholder:text-[#a2aaa6]
                    focus:border-[#075b43]
                    focus:ring-4
                    focus:ring-[#075b43]/10
                  "
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-[11px] font-semibold text-[#37413d]"
                >
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                  placeholder="Masukkan password"
                  autoComplete="current-password"
                  required
                  className="
                    h-12
                    w-full
                    rounded-xl
                    border
                    border-[#dfe6e2]
                    bg-white
                    px-4
                    text-[13px]
                    text-[#17201d]
                    outline-none
                    transition-all
                    placeholder:text-[#a2aaa6]
                    focus:border-[#075b43]
                    focus:ring-4
                    focus:ring-[#075b43]/10
                  "
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="
                  flex
                  h-12
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-[#003c2b]
                  text-[13px]
                  font-semibold
                  text-white
                  shadow-[0_10px_30px_rgba(0,60,43,0.12)]
                  transition-all
                  hover:bg-[#075b43]
                  hover:shadow-[0_14px_35px_rgba(0,60,43,0.16)]
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                {loading ? (
                  <>
                    <span
                      className="
                        h-4
                        w-4
                        animate-spin
                        rounded-full
                        border-2
                        border-white/30
                        border-t-white
                      "
                    />

                    Memproses...
                  </>
                ) : (
                  <>
                    Masuk ke CMS

                    <span>→</span>
                  </>
                )}
              </button>
            </form>

            {/* Bottom info */}
            <p className="mt-8 text-center text-[10px] leading-[1.6] text-[#9aa39f]">
              Halaman ini khusus administrator Kampung Paluh.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}