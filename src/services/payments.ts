// src/services/payments.ts

export interface Payment {
  id: string;
  userEmail?: string; // only for admin
  amount: number;
  date: string;
  method: string;
  status: string;
}

// Inquirer’s own payments:
export async function getPaymentsForUser(): Promise<Payment[]> {
  const res = await fetch("https://api.lazyninja.co/api/payments", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // if you rely on cookies
  });
  if (!res.ok) throw new Error("Failed to fetch payments for user");
  return res.json();
}

// Admin wants everyone’s payments:
export async function getAllPayments(): Promise<Payment[]> {
  const token = localStorage.getItem("authToken");
  if (!token) {
    throw new Error("No auth token found – please log in first");
  }
  const res = await fetch("https://api.lazyninja.co/admin/payments", {
    method: "GET",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch all payments");
  return res.json();
}
