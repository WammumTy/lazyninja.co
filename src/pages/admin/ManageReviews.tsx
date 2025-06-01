// src/pages/AdminDashboard/ManageReviews.tsx
import { useEffect, useState } from "react";
import { fetchAllReviews, approveReview, deleteReview } from "@/services/reviews";

interface Review {
  id: string;
  authorName: string;
  text: string;
  date: string;    // ISO
  isApproved: boolean;
}

export default function ManageReviews() {
  const [reviews, setReviews] = useState<Review[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getReviews() {
      try {
        const data = await fetchAllReviews();
        setReviews(data);
      } catch (err) {
        console.error("Error fetching all reviews:", err);
        setError("Failed to load reviews.");
      } finally {
        setLoading(false);
      }
    }
    getReviews();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      await approveReview(id);
      setReviews((prev) =>
        prev?.map((r) => (r.id === id ? { ...r, isApproved: true } : r)) || null
      );
    } catch (err) {
      console.error("Error approving:", err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteReview(id);
      setReviews((prev) => prev?.filter((r) => r.id !== id) || null);
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  if (loading) return <p>Loading reviews…</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!reviews || reviews.length === 0) return <p>No reviews submitted.</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Manage Reviews</h2>
      <div className="space-y-4">
        {reviews.map((r) => (
          <div
            key={r.id}
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
                  onClick={() => handleApprove(r.id)}
                  className="block px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  Approve
                </button>
              )}
              <button
                onClick={() => handleDelete(r.id)}
                className="block px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
