// src/pages/InquirerDashboard/Hosting.tsx
import { useEffect, useState } from "react";
import { getHostingStatusForUser } from "@/services/hosting";

interface HostingInfo {
  siteUrl: string;
  isLive: boolean;
  plan: string;      // e.g. “Basic” / “Pro”
  renewalDate: string; // ISO
}

export default function Hosting() {
  const [info, setInfo] = useState<HostingInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHosting() {
      try {
        const data = await getHostingStatusForUser();
        setInfo(data);
      } catch (err) {
        console.error("Error fetching hosting:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchHosting();
  }, []);

  if (loading) return <p>Loading hosting info…</p>;
  if (!info)
    return <p>We couldn’t find any hosting information for you.</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Hosting Status</h2>
      <div className="bg-white shadow-sm p-6 rounded-lg">
        <p>
          <span className="font-medium">Site URL:</span>{" "}
          <a
            href={info.siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {info.siteUrl}
          </a>
        </p>
        <p>
          <span className="font-medium">Live?</span>{" "}
          {info.isLive ? (
            <span className="text-green-600 font-semibold">Yes</span>
          ) : (
            <span className="text-red-600 font-semibold">No</span>
          )}
        </p>
        <p>
          <span className="font-medium">Plan:</span> {info.plan}
        </p>
        <p>
          <span className="font-medium">Renewal Date:</span>{" "}
          {new Date(info.renewalDate).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
