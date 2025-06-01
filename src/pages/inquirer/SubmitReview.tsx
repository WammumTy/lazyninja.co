// src/pages/InquirerDashboard/SubmitReview.tsx
import { useEffect, useState } from "react";
import { getHostingStatusForUser } from "@/services/hosting";
import { postReviewForUser } from "@/services/reviews";

export default function SubmitReview() {
  const [hostingInfo, setHostingInfo] = useState<{ isLive: boolean } | null>(null);
  const [loading, setLoading] = useState(true);
  const [reviewText, setReviewText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    async function fetchHosting() {
      try {
        const data = await getHostingStatusForUser();
        setHostingInfo({ isLive: data.isLive });
      } catch (err) {
        console.error("Error fetching hosting:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchHosting();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewText.trim()) {
      setErrorMsg("Review cannot be empty.");
      return;
    }
    setSubmitting(true);
    try {
      await postReviewForUser({ text: reviewText.trim() });
      setSuccessMsg("Thank you! Your review has been submitted.");
      setReviewText("");
    } catch (err) {
      console.error("Error submitting review:", err);
      setErrorMsg("Failed to submit review. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p>Loading…</p>;
  if (!hostingInfo || hostingInfo.isLive === false) {
    return <p>Your site isn’t live yet, so you can’t submit a review.</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Submit a Review</h2>
      {successMsg && <p className="text-green-600 mb-2">{successMsg}</p>}
      {errorMsg && <p className="text-red-600 mb-2">{errorMsg}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Share your experience…"
          className="w-full p-3 border rounded-md focus:outline-none focus:ring"
          rows={5}
        />
        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {submitting ? "Submitting…" : "Submit Review"}
        </button>
      </form>
    </div>
  );
}
