// src/services/hosting.ts

export interface HostingInfo {
  siteUrl: string;
  isLive: boolean;
  plan: string;
  renewalDate: string;
}

// Inquirer’s hosting status:
export async function getHostingStatusForUser(): Promise<HostingInfo> {
  const res = await fetch("/api/hosting", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch hosting status");
  return res.json();
}

// Admin: get all hosting data
export async function getAllHostingStatus(): Promise<(HostingInfo & { userEmail: string })[]> {
  const res = await fetch("/api/admin/hosting", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch all hosting data");
  return res.json();
}
