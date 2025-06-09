// src/pages/AdminDashboard/ManageReviews.tsx
import { useEffect, useState } from "react";
import LoadingSection from "@/components/layout/LoadingSection";
import Error from "@/components/layout/Error";
import {
  fetchAllReviews,
  approveReview,
  deleteReview,
  Review,
} from "@/services/reviews";


export default function ManageReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    async function getReviews() {
      try {
        const data: Review[] = await fetchAllReviews();
        if (!data || data.length === 0) {
          setErrored(true);
        } else {
          setReviews(
            data.map(r => ({
              authorEmail: r.authorEmail,
              authorName: r.authorName,
              text: r.text,
              rating: r.rating,
              date: r.date,
              isApproved: r.isApproved,
            }))
          );
        }
      } catch (err) {
        console.warn("Failed to fetch reviews:", err);
        setErrored(true);
      } finally {
        setLoading(false);
      }
    }
    getReviews();
  }, []);

  const handleApprove = async (authorEmail: string) => {
    try {
      await approveReview(authorEmail);
      setReviews(prev =>
        prev.map(r =>
          r.authorEmail === authorEmail ? { ...r, isApproved: true } : r
        )
      );
    } catch (err) {
      console.error("Error approving review:", err);
    }
  };

  const handleDelete = async (authorEmail: string) => {
    try {
      await deleteReview(authorEmail);
      setReviews(prev => prev.filter(r => r.authorEmail !== authorEmail));
    } catch (err) {
      console.error("Error deleting review:", err);
    }
  };

  if (loading) {
    return <LoadingSection message="Loading reviews…" />;
  }

  if (errored || reviews.length === 0) {
    const message = errored
      ? "Could not load reviews. Please try again later."
      : "No reviews found.";
    return <Error message={message} />;
  }

  return (
    <div className="space-y-4">
      {reviews.map(r => (
        <div
          key={r.authorEmail}
          className="bg-white shadow-sm rounded-md p-4 flex justify-between items-start"
        >
          <div>
            <p className="text-gray-800 font-medium">{r.authorName}</p>
            <p className="text-gray-600 text-sm mb-2">
              {new Date(r.date).toLocaleDateString()}
            </p>
            <p className="text-gray-700">{r.text}</p>
          </div>
          <div className="space-y-2">
            {r.isApproved ? (
              <span className="text-green-600 font-semibold">Approved</span>
            ) : (
              <button
                onClick={() => handleApprove(r.authorEmail)}
                className="block px-3 py-1 text-white rounded-md bg-green-500 hover:bg-green-600"
              >
                Approve
              </button>
            )}
            <button
              onClick={() => handleDelete(r.authorEmail)}
              className="block px-3 py-1 text-white rounded-md bg-red-500 hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
