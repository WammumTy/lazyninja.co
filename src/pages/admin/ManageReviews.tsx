// src/pages/AdminDashboard/ManageReviews.tsx
import { useEffect, useState } from "react";
import {
  fetchAllReviews,
  approveReview,
  deleteReview,
} from "@/services/reviews";

interface Review {
  id: string;
  authorName: string;
  text: string;
  date: string;
  isApproved: boolean;
}

// ① Placeholder for admin reviews
const placeholderAdminReviews: Review[] = [
  {
    id: "demo_admin_rev1",
    authorName: "Demo User",
    text: "No actual reviews loaded.",
    date: new Date().toISOString(),
    isApproved: false,
  },
];

export default function ManageReviews() {
  const [reviews, setReviews] = useState<Review[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    async function getReviews() {
      try {
        const data = await fetchAllReviews();
        if (!data || data.length === 0) {
          setErrored(true);
          setReviews(placeholderAdminReviews);
        } else {
          setReviews(data);
        }
      } catch (err) {
        console.warn("Failed to fetch all reviews; using placeholder.", err);
        setErrored(true);
        setReviews(placeholderAdminReviews);
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
        prev?.map((r) =>
          r.id === id
            ? {
                ...r,
                isApproved: true,
              }
            : r
        ) || null
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

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Manage Reviews</h2>

      {errored && (
        <p className="text-gray-500 italic mb-3">
          Could not load real reviews. Showing placeholder reviews.
        </p>
      )}

      <div className="space-y-4">
        {reviews?.map((r) => (
          <div
            key={r.id}
            className={`bg-white shadow-sm rounded-md p-4 flex justify-between items-start ${
              r.id.startsWith("demo_admin_rev") ? "bg-gray-100" : ""
            }`}
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
                  disabled={r.id.startsWith("demo_admin_rev")}
                  className={`block px-3 py-1 text-white rounded-md ${
                    r.id.startsWith("demo_admin_rev")
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-600"
                  }`}
                >
                  Approve
                </button>
              )}
              <button
                onClick={() => handleDelete(r.id)}
                disabled={r.id.startsWith("demo_admin_rev")}
                className={`block px-3 py-1 text-white rounded-md ${
                  r.id.startsWith("demo_admin_rev")
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-500 hover:bg-red-600"
                }`}
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
