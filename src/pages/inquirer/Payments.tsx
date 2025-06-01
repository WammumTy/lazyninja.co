// src/pages/InquirerDashboard/Payments.tsx
import { useEffect, useState } from "react";
import { getPaymentsForUser } from "@/services/payments";

interface Payment {
  id: string;
  amount: number;
  date: string; // ISO
  method: string; // e.g. “PayPal”
  status: string; // e.g. “Completed”
}

export default function Payments() {
  const [payments, setPayments] = useState<Payment[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPayments() {
      try {
        const data = await getPaymentsForUser(); // assume returns Payment[]
        setPayments(data);
      } catch (err) {
        console.error("Error fetching payments:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPayments();
  }, []);

  if (loading) return <p>Loading payments…</p>;
  if (!payments || payments.length === 0)
    return <p>You have no payment records yet.</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Payment History</h2>
      <table className="min-w-full bg-white border rounded-lg">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-left">Amount</th>
            <th className="px-4 py-2 text-left">Method</th>
            <th className="px-4 py-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p.id} className="border-t">
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
