// src/services/payments.ts

interface Payment {
  id: string;
  userEmail: string;
  amount: number;
  date: string;
  method: string;
  status: string;
}

// Inquirer’s own payments:
export async function getPaymentsForUser(): Promise<Payment[]> {
  const res = await fetch("/api/payments", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // if you rely on cookies
  });
  if (!res.ok) throw new Error("Failed to fetch payments for user");
  return res.json();
}

// Admin wants everyone’s payments:
export async function getAllPayments(): Promise<Payment[]> {
  const res = await fetch("/api/admin/payments", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch all payments");
  return res.json();
}
