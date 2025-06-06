// src/pages/InquirerDashboard/SubmitReview.tsx
import { useEffect, useState } from "react";
import LoadingSection from "@/components/layout/LoadingSection";
import Error from "@/components/layout/Error";
import { getHostingStatusForUser } from "@/services/hosting";
import { postReviewForUser } from "@/services/reviews";

export default function SubmitReview() {
  const [hostingStatus, setHostingStatus] = useState<{ isLive: boolean } | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  const [reviewText, setReviewText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    async function loadStatus() {
      try {
        const data = await getHostingStatusForUser();
        if (!data || typeof data.isLive !== "boolean") {
          throw new Error("Invalid hosting data");
        }
        setHostingStatus({ isLive: data.isLive });
      } catch (err) {
        console.error("Error fetching hosting status:", err);
        setFetchError(true);
      } finally {
        setLoading(false);
      }
    }
    loadStatus();
  }, []);

  if (loading) {
    return <LoadingSection message="Loading hosting status…" />;
  }
  if (fetchError || hostingStatus === null) {
    return (
      <Error message="Could not load hosting status. Please try again later." />
    );
  }
  if (!hostingStatus.isLive) {
    return (
      <Error message="Your site isn’t live yet, so you can’t submit a review." />
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg(null);
    setSubmitError(null);
    if (!reviewText.trim()) {
      setSubmitError("Review cannot be empty.");
      return;
    }
    setSubmitting(true);
    try {
      await postReviewForUser({ text: reviewText.trim() });
      setSuccessMsg("Thank you! Your review has been submitted.");
      setReviewText("");
    } catch (err) {
      console.error("Error submitting review:", err);
      setSubmitError("Failed to submit review. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="px-6 md:px-12">
      <h2 className="text-xl font-serif font-semibold text-brown-800 mb-4">
        Submit a Review
      </h2>
      {successMsg && <p className="text-green-600 mb-2">{successMsg}</p>}
      {submitError && <p className="text-red-600 mb-2">{submitError}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Share your experience…"
          rows={5}
          className="w-full p-3 border rounded-md border-brown-200 focus:outline-none focus:ring-brown-500 focus:border-brown-500"
        />
        <button
          type="submit"
          disabled={submitting}
          className={`px-6 py-2 rounded-md text-white font-medium ${
            submitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-brown-700 hover:bg-brown-800"
          }`}
        >
          {submitting ? "Submitting…" : "Submit Review"}
        </button>
      </form>
    </div>
  );
}
