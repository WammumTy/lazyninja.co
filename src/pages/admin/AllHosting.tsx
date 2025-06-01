// src/pages/AdminDashboard/AllHosting.tsx
import { useEffect, useState } from "react";
import { getAllHostingStatus } from "@/services/hosting";

interface HostingInfo {
  userEmail: string;
  siteUrl: string;
  isLive: boolean;
  plan: string;
  renewalDate: string;
}

export default function AllHosting() {
  const [hostingList, setHostingList] = useState<HostingInfo[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAllHosting() {
      try {
        const data = await getAllHostingStatus();
        setHostingList(data);
      } catch (err) {
        console.error("Error fetching all hosting:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchAllHosting();
  }, []);

  if (loading) return <p>Loading hosting data…</p>;
  if (!hostingList || hostingList.length === 0)
    return <p>No hosting data found.</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">All Hosting Status</h2>
      <table className="min-w-full bg-white border rounded-lg">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-4 py-2 text-left">User</th>
            <th className="px-4 py-2 text-left">Site URL</th>
            <th className="px-4 py-2 text-left">Live?</th>
            <th className="px-4 py-2 text-left">Plan</th>
            <th className="px-4 py-2 text-left">Renewal Date</th>
          </tr>
        </thead>
        <tbody>
          {hostingList.map((h) => (
            <tr key={h.userEmail} className="border-t">
              <td className="px-4 py-2">{h.userEmail}</td>
              <td className="px-4 py-2">
                <a
                  href={h.siteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {h.siteUrl}
                </a>
              </td>
              <td className="px-4 py-2">
                {h.isLive ? (
                  <span className="text-green-600 font-semibold">Yes</span>
                ) : (
                  <span className="text-red-600 font-semibold">No</span>
                )}
              </td>
              <td className="px-4 py-2">{h.plan}</td>
              <td className="px-4 py-2">{new Date(h.renewalDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
