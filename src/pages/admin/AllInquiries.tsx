// src/pages/AdminDashboard/AllInquiries.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Error from "@/components/layout/Error";
import LoadingSection from "@/components/layout/LoadingSection";
import {
  fetchAllInquiries,
  approveInquiry,
  deleteInquiry,
  Inquiry,
} from "@/services/inquiries";

export default function AllInquiries() {
  const navigate = useNavigate();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionInProgress, setActionInProgress] = useState<string | null>(null);

  useEffect(() => {
    // Fetch inquiries
    fetchAllInquiries()
      .then((data) => {
        setInquiries(data ?? []);
      })
      .catch((err) => {
        console.error(err);
        setError("Could not load inquiries. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate]);

  // Loading state
  if (loading) {
    return <LoadingSection message="Loading inquiries…" />;
  }

  // Error or empty list → full‐page Error
  if (error || inquiries.length === 0) {
    const message = error ?? "No inquiries found.";
    return <Error message={message} />;
  }

  return (
    <div className="px-6 md:px-12 overflow-x-auto">
      <table className="min-w-full bg-white border rounded-lg shadow-sm">
        <thead className="bg-brown-100">
          <tr>
            <th className="px-4 py-2 text-left text-brown-700">Name</th>
            <th className="px-4 py-2 text-left text-brown-700">Email</th>
            <th className="px-4 py-2 text-left text-brown-700">Business</th>
            <th className="px-4 py-2 text-left text-brown-700">Submitted At</th>
            <th className="px-4 py-2 text-left text-brown-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {inquiries.map((inq) => (
            <tr key={inq.id} className="border-t">
              <td className="px-4 py-2">{inq.name ?? "N/A"}</td>
              <td className="px-4 py-2">{inq.email ?? "N/A"}</td>
              <td className="px-4 py-2">{inq.business ?? "N/A"}</td>
              <td className="px-4 py-2">
                {inq.createdAt
                  ? new Date(inq.createdAt).toLocaleString()
                  : "N/A"}
              </td>
              <td className="px-4 py-2 space-x-2">
                <button
                  onClick={() => {
                    setActionInProgress(inq.id);
                    approveInquiry(inq.id)
                      .then(() =>
                        setInquiries((prev) =>
                          prev.filter((i) => i.id !== inq.id)
                        )
                      )
                      .catch(console.error)
                      .finally(() => setActionInProgress(null));
                  }}
                  disabled={actionInProgress === inq.id}
                  className={`px-3 py-1 rounded-md text-white font-medium ${
                    actionInProgress === inq.id
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {actionInProgress === inq.id ? "…" : "Approve"}
                </button>
                <button
                  onClick={() => {
                    if (!window.confirm("Really delete this inquiry?")) return;
                    setActionInProgress(inq.id);
                    deleteInquiry(inq.id)
                      .then(() =>
                        setInquiries((prev) =>
                          prev.filter((i) => i.id !== inq.id)
                        )
                      )
                      .catch(console.error)
                      .finally(() => setActionInProgress(null));
                  }}
                  disabled={actionInProgress === inq.id}
                  className={`px-3 py-1 rounded-md text-white font-medium ${
                    actionInProgress === inq.id
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  {actionInProgress === inq.id ? "…" : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
