// src/pages/InquirerDashboard/Payments.tsx
import { useEffect, useState } from "react";
import LoadingSection from "@/components/layout/LoadingSection";
import Error from "@/components/layout/Error";
import { getPaymentsForUser } from "@/services/payments";

interface Payment {
  id: string;
  amount?: number;
  date?: string;   // ISO string
  method?: string; // e.g. "PayPal"
  status?: string; // e.g. "Completed"
}

export default function Payments() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    async function fetchPayments() {
      try {
        const data = await getPaymentsForUser();
        setPayments(data ?? []);
      } catch (err) {
        console.warn("Failed to fetch payments:", err);
        setErrored(true);
      } finally {
        setLoading(false);
      }
    }
    fetchPayments();
  }, []);

  if (loading) {
    return <LoadingSection message="Loading payments…" />;
  }

  // Full‐page error if error or no records
  if (errored || payments.length === 0) {
    const message = errored
      ? "Could not load payment history. Please try again later."
      : "No payment history found.";
    return <Error message={message} />;
  }

  return (
    <div className="px-6 md:px-12 overflow-x-auto">
      <h2 className="text-xl font-serif font-semibold text-brown-800 mb-4">
        Payment History
      </h2>
      <table className="min-w-full bg-white border rounded-lg shadow-sm">
        <thead className="bg-brown-100">
          <tr>
            <th className="px-4 py-2 text-left text-brown-700">Date</th>
            <th className="px-4 py-2 text-left text-brown-700">Amount</th>
            <th className="px-4 py-2 text-left text-brown-700">Method</th>
            <th className="px-4 py-2 text-left text-brown-700">Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="px-4 py-2">
                {p.date
                  ? new Date(p.date).toLocaleDateString()
                  : "N/A"}
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
