// src/components/ReviewCard.tsx
interface ReviewCardProps {
  review: {
    id: string;
    authorName: string;
    text: string;
    date: string;
    rating?: number;
  };
}

export default function ReviewCard({ review }: ReviewCardProps) {
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
          {/* Example: render stars if you want */}
          {Array.from({ length: review.rating }).map((_, i) => (
            <span key={i} className="text-yellow-500">★</span>
          ))}
          {Array.from({ length: 5 - review.rating }).map((_, i) => (
            <span key={i} className="text-gray-300">★</span>
          ))}
        </div>
      )}
      <p className="text-gray-700">{review.text}</p>
    </div>
  );
}
