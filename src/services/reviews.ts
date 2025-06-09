// src/services/reviews.ts

export interface Review {
  authorEmail: string;
  authorName: string;
  text: string;
  rating: number;
  date: string;
  isApproved?: boolean;
  siteUrl?: string;
}

// Public: fetch only approved reviews
export async function fetchReviews(): Promise<Review[]> {
  const res = await fetch("https://api.lazyninja.co/public/reviews", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Failed to fetch reviews");
  return res.json();
}

// Inquirer: post their review (backend should mark as “pending” or “approved” automatically)
export async function postReviewForUser(payload: { text: string, rating: number }): Promise<void> {
  const token = localStorage.getItem("authToken");
  if (!token) {
    throw new Error("No auth token found – please log in first");
  }
  const res = await fetch("https://api.lazyninja.co/api/reviews", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to submit review");
}

// Admin: fetch every review (approved or pending)
export async function fetchAllReviews(): Promise<Review[]> {
  const token = localStorage.getItem("authToken");
  if (!token) {
    throw new Error("No auth token found – please log in first");
  }
  const res = await fetch("https://api.lazyninja.co/admin/reviews", {
    method: "GET",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch all reviews");
  return res.json();
}

// Admin: mark a review as approved
export async function approveReview(authorEmail: string): Promise<void> {
  const token = localStorage.getItem("authToken");
  if (!token) {
    throw new Error("No auth token found – please log in first");
  }
  const res = await fetch(`https://api.lazyninja.co/admin/reviews/${authorEmail}/approve`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to approve review");
}

// Admin: delete a review
export async function deleteReview(authorEmail: string): Promise<void> {
  const token = localStorage.getItem("authToken");
  if (!token) {
    throw new Error("No auth token found – please log in first");
  }
  const res = await fetch(`https://api.lazyninja.co/admin/reviews/${authorEmail}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to delete review");
}
