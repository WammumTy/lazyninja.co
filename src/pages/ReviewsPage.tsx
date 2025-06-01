// src/pages/ReviewsPage.tsx
import { useEffect, useState } from "react";
import { fetchReviews } from "../services/reviews";
import ReviewCard from "@/components/cards/ReviewCard";

interface Review {
  id: string;
  authorName: string;
  text: string;
  date: string;   // ISO
  rating?: number;
}

// ① Some placeholder reviews
const placeholderReviews: Review[] = [
  {
    id: "demo_rev_01",
    authorName: "Your Name Here",
    text: "“Client reviews will appear here once available!”",
    date: new Date().toISOString(),
    rating: 0,
  },
  {
    id: "demo_rev_02",
    authorName: "Sample Reviewer",
    text: "“This space is reserved for real client feedback.”",
    date: new Date().toISOString(),
    rating: 0,
  },
];

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    async function getAllReviews() {
      try {
        const data = await fetchReviews();
        if (!data || data.length === 0) {
          setErrored(true);
          setReviews(placeholderReviews);
        } else {
          setReviews(data);
        }
      } catch (err) {
        console.warn("Failed to fetch reviews; using placeholder.", err);
        setErrored(true);
        setReviews(placeholderReviews);
      } finally {
        setLoading(false);
      }
    }
    getAllReviews();
  }, []);

  if (loading) return <p>Loading reviews…</p>;

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Client Reviews</h1>

      {errored && (
        <p className="text-gray-500 italic mb-4">
          No real reviews could be loaded. Showing placeholder reviews instead.
        </p>
      )}

      <div className="space-y-4">
        {reviews?.map((r) => (
          <ReviewCard
            key={r.id}
            review={{
              ...r,
              // If this is a placeholder, force a “0-star” style or gray-out stars
              rating: r.id.startsWith("demo_rev_") ? undefined : r.rating,
            }}
          />
        ))}
      </div>
    </div>
  );
}
