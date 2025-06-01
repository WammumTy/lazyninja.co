// src/pages/AdminDashboard/AllPayments.tsx
import { useEffect, useState } from "react";
import { getAllPayments } from "@/services/payments";

interface Payment {
  id: string;
  userEmail: string;
  amount: number;
  date: string;
  method: string;
  status: string;
}

export default function AllPayments() {
  const [payments, setPayments] = useState<Payment[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAll() {
      try {
        const data = await getAllPayments(); // expects entire list
        setPayments(data);
      } catch (err) {
        console.error("Error fetching all payments:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, []);

  if (loading) return <p>Loading all payments…</p>;
  if (!payments || payments.length === 0)
    return <p>No payment records found.</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">All Payments</h2>
      <table className="min-w-full bg-white border rounded-lg">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-4 py-2 text-left">User</th>
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-left">Amount</th>
            <th className="px-4 py-2 text-left">Method</th>
            <th className="px-4 py-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="px-4 py-2">{p.userEmail}</td>
              <td className="px-4 py-2">{new Date(p.date).toLocaleDateString()}</td>
              <td className="px-4 py-2">${p.amount.toFixed(2)}</td>
              <td className="px-4 py-2">{p.method}</td>
              <td className="px-4 py-2">{p.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
