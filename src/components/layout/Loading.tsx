// src/pages/Loading.tsx
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-brown-50 px-6">
      <div className="text-center">
        {/* Spinner */}
        <Loader2 className="w-16 h-16 text-brown-700 animate-spin mx-auto mb-6" />

        {/* Loading text */}
        <p className="text-2xl font-medium text-brown-600">Loading…</p>
      </div>
    </div>
  );
}
