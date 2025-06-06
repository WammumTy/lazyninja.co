// src/pages/AdminDashboard/AllHosting.tsx
import { useEffect, useState } from "react";
import Error from "@/components/layout/Error";
import LoadingSection from "@/components/layout/LoadingSection";
import { getAllHostingStatus } from "@/services/hosting";

interface HostingInfo {
  userEmail?: string;
  siteUrl?: string;
  isLive?: boolean;
  plan?: string;
  renewalDate?: string;
}

export default function AllHosting() {
  const [hostingList, setHostingList] = useState<HostingInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    async function fetchAllHosting() {
      try {
        const data = await getAllHostingStatus();
        setHostingList(data ?? []);
      } catch (err) {
        console.warn("Failed to fetch hosting data:", err);
        setErrored(true);
      } finally {
        setLoading(false);
      }
    }
    fetchAllHosting();
  }, []);

  if (loading) {
    return <LoadingSection />;
  }

  // If error OR no records → show a full-page error
  if (errored || hostingList.length === 0) {
    const message = errored
      ? "Could not load hosting data. Please try again later."
      : "No hosting records found.";
    return <Error message={message} />;
  }

  return (
    <div className="px-6 md:px-12">
      <table className="min-w-full bg-white border rounded-lg shadow-sm">
        <thead className="bg-brown-100">
          <tr>
            <th className="px-4 py-2 text-left text-brown-700">User</th>
            <th className="px-4 py-2 text-left text-brown-700">Site URL</th>
            <th className="px-4 py-2 text-left text-brown-700">Live?</th>
            <th className="px-4 py-2 text-left text-brown-700">Plan</th>
            <th className="px-4 py-2 text-left text-brown-700">Renewal Date</th>
          </tr>
        </thead>
        <tbody>
          {hostingList.map((h, idx) => (
            <tr key={idx} className="border-t">
              {/* N/A for missing fields */}
              <td className="px-4 py-2">{h.userEmail ?? "N/A"}</td>
              <td className="px-4 py-2">
                {h.siteUrl ? (
                  <a
                    href={h.siteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brown-700 hover:underline"
                  >
                    {h.siteUrl}
                  </a>
                ) : (
                  "N/A"
                )}
              </td>
              <td className="px-4 py-2">
                {h.isLive === undefined
                  ? "N/A"
                  : h.isLive ? (
                      <span className="text-green-600 font-semibold">Yes</span>
                    ) : (
                      <span className="text-red-600 font-semibold">No</span>
                    )}
              </td>
              <td className="px-4 py-2">{h.plan ?? "N/A"}</td>
              <td className="px-4 py-2">
                {h.renewalDate
                  ? new Date(h.renewalDate).toLocaleDateString()
                  : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
