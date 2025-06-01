// src/pages/ReviewsPage.tsx
import { useEffect, useState } from "react";
import { fetchReviews } from "@/services/reviews";
import PageLayout from "@/components/layout/PageLayout";
import ReviewCard from "@/components/cards/ReviewCard";

interface Review {
  id: string;
  authorName: string;
  text: string;
  date: string; // ISO
  rating?: number; // optional, if you want stars out of 5
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getAllReviews() {
      try {
        const data = await fetchReviews(); // returns only “approved” reviews
        setReviews(data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      } finally {
        setLoading(false);
      }
    }
    getAllReviews();
  }, []);

  if (loading) return <p>Loading reviews…</p>;
  if (!reviews || reviews.length === 0)
    return <p>No reviews have been posted yet.</p>;

  return (
    <PageLayout>
        <div className="max-w-3xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Client Reviews</h1>
        <div className="space-y-4">
            {reviews.map((r) => (
            <ReviewCard key={r.id} review={r} />
            ))}
        </div>
        </div>
    </PageLayout>
  );
}
