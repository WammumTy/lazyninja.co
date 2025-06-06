// src/pages/AdminDashboard/AllPayments.tsx
import { useEffect, useState } from "react";
import LoadingSection from "@/components/layout/LoadingSection";
import Error from "@/components/layout/Error";
import { getAllPayments, Payment } from "@/services/payments";

export default function AllPayments() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    async function fetchAll() {
      try {
        const data = await getAllPayments();
        setPayments(data ?? []);
      } catch (err) {
        setErrored(true);
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, []);

  if (loading) {
    return <LoadingSection message="Loading all payments…" />;
  }

  // Full-page error if error or no records
  if (errored || payments.length === 0) {
    const message = errored
      ? "Could not load payment records. Please try again later."
      : "No payment records found.";
    return <Error message={message} />;
  }

  return (
    <div className="px-6 md:px-12 overflow-x-auto">
      <table className="min-w-full bg-white border rounded-lg shadow-sm">
        <thead className="bg-brown-100">
          <tr>
            <th className="px-4 py-2 text-left text-brown-700">User</th>
            <th className="px-4 py-2 text-left text-brown-700">Date</th>
            <th className="px-4 py-2 text-left text-brown-700">Amount</th>
            <th className="px-4 py-2 text-left text-brown-700">Method</th>
            <th className="px-4 py-2 text-left text-brown-700">Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="px-4 py-2">{p.userEmail ?? "N/A"}</td>
              <td className="px-4 py-2">
                {p.date ? new Date(p.date).toLocaleDateString() : "N/A"}
              </td>
              <td className="px-4 py-2">
                {typeof p.amount === "number"
                  ? `$${p.amount.toFixed(2)}`
                  : "N/A"}
              </td>
              <td className="px-4 py-2">{p.method ?? "N/A"}</td>
              <td className="px-4 py-2">{p.status ?? "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
