// src/components/LoadingSection.tsx
import { Loader2 } from "lucide-react";

interface SectionLoadingProps {
  message?: string;
}

export default function LoadingSection({
  message = "Loading…",
}: SectionLoadingProps) {
  return (
    <div className="flex items-center h-max justify-center bg-white rounded-lg shadow-sm p-6">
      <Loader2 className="w-8 h-8 text-brown-700 animate-spin mr-4" />
      <span className="text-lg font-medium text-brown-600">{message}</span>
    </div>
  );
}
