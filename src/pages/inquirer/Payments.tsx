// src/pages/InquirerDashboard/Payments.tsx
import { useEffect, useState } from "react";
import { getPaymentsForUser } from "@/services/payments";

interface Payment {
  id: string;
  amount: number;
  date: string;   // ISO string
  method: string; // e.g. "PayPal"
  status: string; // e.g. "Completed"
}

// ① Define a small “placeholder” list (fake/demo data)
const placeholderPayments: Payment[] = [
  {
    id: "demo_01",
    amount: 0.0,
    date: new Date().toISOString(),
    method: "–",
    status: "No Data",
  },
  {
    id: "demo_02",
    amount: 0.0,
    date: new Date().toISOString(),
    method: "–",
    status: "No Data",
  },
];

export default function Payments() {
  const [payments, setPayments] = useState<Payment[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    async function fetchPayments() {
      try {
        const data = await getPaymentsForUser();
        // If the backend returns an empty array, we treat that as “no real data”
        if (!data || data.length === 0) {
          setErrored(true);
          setPayments(placeholderPayments);
        } else {
          setPayments(data);
        }
      } catch (err) {
        console.warn("Failed to fetch payments; using placeholders.", err);
        setErrored(true);
        setPayments(placeholderPayments);
      } finally {
        setLoading(false);
      }
    }
    fetchPayments();
  }, []);

  if (loading) return <p>Loading payments…</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Payment History</h2>

      {errored && (
        <p className="text-gray-500 italic mb-3">
          Showing placeholder data because we couldn’t load your real payments.
        </p>
      )}

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
          {payments?.map((p) => (
            <tr
              key={p.id}
              className={p.id.startsWith("demo_") ? "bg-gray-100" : "border-t"}
            >
              <td className="px-4 py-2">
                {p.id.startsWith("demo_")
                  ? "—"
                  : new Date(p.date).toLocaleDateString()}
              </td>
              <td className="px-4 py-2">
                {p.id.startsWith("demo_") ? "—" : `$${p.amount.toFixed(2)}`}
              </td>
              <td className="px-4 py-2">{p.method}</td>
              <td className="px-4 py-2">{p.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
