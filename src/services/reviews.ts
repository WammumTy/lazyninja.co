// src/services/reviews.ts

export interface Review {
  id: string;
  authorName: string;
  text: string;
  date: string;
  isApproved?: boolean;
}

// Public: fetch only approved reviews
export async function fetchReviews(): Promise<Review[]> {
  const res = await fetch("/api/reviews", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Failed to fetch reviews");
  return res.json();
}

// Inquirer: post their review (backend should mark as “pending” or “approved” automatically)
export async function postReviewForUser(payload: { text: string }): Promise<void> {
  const res = await fetch("/api/reviews", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to submit review");
}

// Admin: fetch every review (approved or pending)
export async function fetchAllReviews(): Promise<Review[]> {
  const res = await fetch("/api/admin/reviews", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch all reviews");
  return res.json();
}

// Admin: mark a review as approved
export async function approveReview(id: string): Promise<void> {
  const res = await fetch(`/api/admin/reviews/${id}/approve`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to approve review");
}

// Admin: delete a review
export async function deleteReview(id: string): Promise<void> {
  const res = await fetch(`/api/admin/reviews/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to delete review");
}
