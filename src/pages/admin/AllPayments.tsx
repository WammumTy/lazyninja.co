// src/pages/AdminDashboard/AllPayments.tsx
import { useEffect, useState } from "react";
import { getAllPayments } from "@/services/payments";

interface Payment {
  id: string;
  userEmail?: string; // optional in service
  amount: number;
  date: string;
  method: string;
  status: string;
}

// ① Placeholder list for admin if backend fails
const placeholderAllPayments: Payment[] = [
  {
    id: "demo_admin_pay1",
    userEmail: "example@demo.com",
    amount: 0.0,
    date: new Date().toISOString(),
    method: "–",
    status: "No Data",
  },
];

export default function AllPayments() {
  const [payments, setPayments] = useState<Payment[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    async function fetchAll() {
      try {
        const data = await getAllPayments();
        if (!data || data.length === 0) {
          setErrored(true);
          setPayments(placeholderAllPayments);
        } else {
          setPayments(data);
        }
      } catch (err) {
        console.warn("Failed to fetch all payments; using placeholder.", err);
        setErrored(true);
        setPayments(placeholderAllPayments);
      } finally {
        setLoading(false);
      }
    }
    fetchAll();
  }, []);

  if (loading) return <p>Loading all payments…</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">All Payments</h2>

      {errored && (
        <p className="text-gray-500 italic mb-3">
          Could not load real payment records. Showing placeholder.
        </p>
      )}

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
          {payments?.map((p) => (
            <tr
              key={p.id}
              className={p.id.startsWith("demo_admin_pay") ? "bg-gray-100" : "border-t"}
            >
              <td className="px-4 py-2">{p.userEmail ?? "—"}</td>
              <td className="px-4 py-2">
                {p.id.startsWith("demo_admin_pay")
                  ? "—"
                  : new Date(p.date).toLocaleDateString()}
              </td>
              <td className="px-4 py-2">
                {p.id.startsWith("demo_admin_pay") ? "—" : `$${p.amount.toFixed(2)}`}
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
