// src/pages/InquirerDashboard/Hosting.tsx
import { useEffect, useState } from "react";
import { getHostingStatusForUser } from "@/services/hosting";

interface HostingInfo {
  siteUrl: string;
  isLive: boolean;
  plan: string;
  renewalDate: string; // ISO
}

// ① A “placeholder” hosting object
const placeholderHosting: HostingInfo = {
  siteUrl: "https://your-site-will-appear-here.com",
  isLive: false,
  plan: "—",
  renewalDate: new Date().toISOString(),
};

export default function Hosting() {
  const [info, setInfo] = useState<HostingInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    async function fetchHosting() {
      try {
        const data = await getHostingStatusForUser();
        // If backend returns something falsy, use placeholder
        if (!data || !("siteUrl" in data)) {
          setErrored(true);
          setInfo(placeholderHosting);
        } else {
          setInfo(data);
        }
      } catch (err) {
        console.warn("Failed to fetch hosting; using placeholder.", err);
        setErrored(true);
        setInfo(placeholderHosting);
      } finally {
        setLoading(false);
      }
    }
    fetchHosting();
  }, []);

  if (loading) return <p>Loading hosting info…</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Hosting Status</h2>
      {errored && (
        <p className="text-gray-500 italic mb-3">
          Showing placeholder hosting info because we couldn’t load your real data.
        </p>
      )}

      <div
        className={`bg-white shadow-sm p-6 rounded-lg ${
          info?.siteUrl === placeholderHosting.siteUrl
            ? "bg-gray-50"
            : ""
        }`}
      >
        <p>
          <span className="font-medium">Site URL:</span>{" "}
          <a
            href={info?.siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={
              info?.siteUrl === placeholderHosting.siteUrl
                ? "text-gray-400 cursor-not-allowed"
                : "text-blue-600 hover:underline"
            }
            onClick={(e) => {
              if (info?.siteUrl === placeholderHosting.siteUrl) e.preventDefault();
            }}
          >
            {info?.siteUrl}
          </a>
        </p>
        <p>
          <span className="font-medium">Live?</span>{" "}
          {info?.isLive ? (
            <span className="text-green-600 font-semibold">Yes</span>
          ) : (
            <span className="text-red-600 font-semibold">No</span>
          )}
        </p>
        <p>
          <span className="font-medium">Plan:</span> {info?.plan}
        </p>
        <p>
          <span className="font-medium">Renewal Date:</span>{" "}
          {new Date(info!.renewalDate).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
