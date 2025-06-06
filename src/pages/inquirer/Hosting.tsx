// src/pages/InquirerDashboard/Hosting.tsx
import { useEffect, useState } from "react";
import LoadingSection from "@/components/layout/LoadingSection";
import Error from "@/components/layout/Error";
import { getHostingStatusForUser } from "@/services/hosting";

interface HostingInfo {
  siteUrl?: string;
  isLive?: boolean;
  plan?: string;
  renewalDate?: string; // ISO
}

export default function Hosting() {
  const [info, setInfo] = useState<HostingInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    async function fetchHosting() {
      try {
        const data = await getHostingStatusForUser();
        setInfo(data ?? null);
      } catch (err) {
        console.warn("Failed to fetch hosting status:", err);
        setErrored(true);
      } finally {
        setLoading(false);
      }
    }
    fetchHosting();
  }, []);

  if (loading) {
    return <LoadingSection message="Loading hosting status…" />;
  }

  if (errored || info === null) {
    return <Error message="Could not load hosting status. Please try again later." />;
  }

  return (
    <div className="px-6 md:px-12">
      <h2 className="text-xl font-serif font-semibold text-brown-800 mb-4">
        Hosting Status
      </h2>
      <div className="bg-white shadow-sm p-6 rounded-lg space-y-3">
        <p>
          <span className="font-medium text-brown-700">Site URL:</span>{" "}
          {info.siteUrl ? (
            <a
              href={info.siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brown-700 hover:underline"
            >
              {info.siteUrl}
            </a>
          ) : (
            "N/A"
          )}
        </p>
        <p>
          <span className="font-medium text-brown-700">Live?</span>{" "}
          {info.isLive === undefined ? (
            "N/A"
          ) : info.isLive ? (
            <span className="text-green-600 font-semibold">Yes</span>
          ) : (
            <span className="text-red-600 font-semibold">No</span>
          )}
        </p>
        <p>
          <span className="font-medium text-brown-700">Plan:</span>{" "}
          {info.plan ?? "N/A"}
        </p>
        <p>
          <span className="font-medium text-brown-700">Renewal Date:</span>{" "}
          {info.renewalDate
            ? new Date(info.renewalDate).toLocaleDateString()
            : "N/A"}
        </p>
      </div>
    </div>
  );
}
