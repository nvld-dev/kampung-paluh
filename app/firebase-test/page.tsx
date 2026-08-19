import { auth } from "@/lib/firebase/auth";
import { db } from "@/lib/firebase/firestore";

export default function FirebaseTestPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white">
      <div className="rounded-2xl border border-gray-200 p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-900">
          Firebase Connected
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Foundation Firebase Kampung Paluh
        </p>

        <div className="mt-6 space-y-2 text-sm">
          <p>
            Firestore:{" "}
            <span className="font-semibold text-green-600">
              {db ? "OK" : "ERROR"}
            </span>
          </p>

          <p>
            Authentication:{" "}
            <span className="font-semibold text-green-600">
              {auth ? "OK" : "ERROR"}
            </span>
          </p>
        </div>
      </div>
    </main>
  );
}