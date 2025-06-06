import { AlertTriangle } from "lucide-react";

interface SectionErrorProps {
  message?: string;
  onRetry?: () => void;
  retryText?: string;
}

export default function Error({
  message = "Something went wrong.",
  onRetry,
  retryText = "Retry",
}: SectionErrorProps) {
  return (
    <div className="flex flex-col items-center bg-white rounded-lg shadow-sm p-6">
      <AlertTriangle className="w-8 h-8 text-red-600 mb-4" />
      <p className="text-lg font-medium text-red-600 mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-brown-700 hover:bg-brown-800 text-white font-medium px-4 py-2 rounded-md"
        >
          {retryText}
        </button>
      )}
    </div>
  );
}
