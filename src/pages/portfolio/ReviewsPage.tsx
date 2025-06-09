// src/pages/ReviewsPage.tsx
import { useEffect, useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { fetchReviews, Review } from "@/services/reviews";
import Loading from "@/components/layout/Loading";
import Error from "@/components/layout/Error";
import ReviewCard from "@/components/cards/ReviewCard";

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    async function loadReviews() {
      try {
        const data: Review[] = await fetchReviews();
        if (!data || data.length === 0) {
          setErrored(true);
        } else {
          // Map ServiceReview → UI Review
          const uiReviews: Review[] = data.map((r) => ({
            authorEmail: r.authorEmail,
            authorName: r.authorName,
            text: r.text,
            date: r.date,
            // If the service type is missing these, fallback sensibly
            siteUrl: (r as any).siteUrl ?? "",
            rating: (r as any).rating ?? 0,
          }));
          setReviews(uiReviews);
        }
      } catch (err) {
        console.warn("Failed to fetch reviews:", err);
        setErrored(true);
      } finally {
        setLoading(false);
      }
    }
    loadReviews();
  }, []);

  if (loading) {
    return (
      <PageLayout>
        <Loading />
      </PageLayout>
    );
  }

  if (errored) {
    return (
      <PageLayout>
        <Error message="No reviews found." />
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="max-w-3xl mx-auto py-8">
        <h1 className="text-3xl font-serif font-bold text-brown-800 mb-6 text-center">
          Client Reviews
        </h1>
        <div className="space-y-6">
          {reviews.map((r) => (
            <ReviewCard key={r.authorEmail} review={r} />
          ))}
        </div>
      </div>
    </PageLayout>
  );
}
