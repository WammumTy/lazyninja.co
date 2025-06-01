// src/pages/AdminDashboard/AllHosting.tsx
import { useEffect, useState } from "react";
import { getAllHostingStatus } from "@/services/hosting";

interface HostingInfo {
  userEmail?: string;
  siteUrl: string;
  isLive: boolean;
  plan: string;
  renewalDate: string;
}

// ① Placeholder for admin hosting
const placeholderAllHosting: HostingInfo[] = [
  {
    userEmail: "example@demo.com",
    siteUrl: "https://demo-website.com",
    isLive: false,
    plan: "—",
    renewalDate: new Date().toISOString(),
  },
];

export default function AllHosting() {
  const [hostingList, setHostingList] = useState<HostingInfo[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    async function fetchAllHosting() {
      try {
        const data = await getAllHostingStatus();
        if (!data || data.length === 0) {
          setErrored(true);
          setHostingList(placeholderAllHosting);
        } else {
          setHostingList(data);
        }
      } catch (err) {
        console.warn("Failed to fetch all hosting; using placeholder.", err);
        setErrored(true);
        setHostingList(placeholderAllHosting);
      } finally {
        setLoading(false);
      }
    }
    fetchAllHosting();
  }, []);

  if (loading) return <p>Loading hosting data…</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">All Hosting Status</h2>

      {errored && (
        <p className="text-gray-500 italic mb-3">
          Could not load real hosting data. Showing placeholder.
        </p>
      )}

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
          {hostingList?.map((h) => (
            <tr
              key={h.userEmail}
              className={h.userEmail === "example@demo.com" ? "bg-gray-100" : "border-t"}
            >
              <td className="px-4 py-2">{h.userEmail ?? "—"}</td>
              <td className="px-4 py-2">
                <a
                  href={h.siteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={
                    h.userEmail === "example@demo.com"
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-blue-600 hover:underline"
                  }
                  onClick={(e) => {
                    if (h.userEmail === "example@demo.com") e.preventDefault();
                  }}
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
