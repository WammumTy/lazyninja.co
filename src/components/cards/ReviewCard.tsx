// src/components/ReviewCard.tsx
import { Globe } from "lucide-react";
import { Review } from "@/services/reviews";

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="bg-white shadow-sm rounded-lg p-6">
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold text-gray-800">{review.authorName}</span>
        <span className="text-sm text-gray-500">
          {new Date(review.date).toLocaleDateString()}
        </span>
      </div>

      {review.rating !== undefined && (
        <div className="mb-2">
          {Array.from({ length: review.rating }).map((_, i) => (
            <span key={i} className="text-yellow-500">★</span>
          ))}
          {Array.from({ length: 5 - review.rating }).map((_, i) => (
            <span key={i} className="text-gray-300">★</span>
          ))}
        </div>
      )}

      {/* Site URL under the rating, with a globe icon */}
      {review.siteUrl && (
        <div className="flex items-center text-brown-700 mb-4">
          <Globe className="w-5 h-4 mr-2" />
            <a
            href={review.siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-s hover:underline"
            >
            {review.siteUrl}
            </a>
        </div>
      )}

      <p className="text-gray-700">{review.text}</p>
    </div>
  );
}
