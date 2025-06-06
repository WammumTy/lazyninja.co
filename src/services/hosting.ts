// src/services/hosting.ts

export interface HostingInfo {
  siteUrl: string;
  isLive: boolean;
  plan: string;
  renewalDate: string;
}

/**
 * Admin: fetch all hosting records
 */
export async function getAllHostingStatus(): Promise<HostingInfo[]> {
  const token = localStorage.getItem('authToken');
  if (!token) {
    throw new Error('No auth token found – please log in first');
  }
  const res = await fetch("https://api.lazyninja.co/admin/hosting", {
    method: "GET",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
    credentials: "include",
  });
  if (!res.ok) {
    const errBody = await res.json().catch(() => null);
    throw new Error(errBody?.message || "Failed to fetch all hosting data");
  }
  return res.json();
}

/**
 * Admin: create a new hosting record
 * @param userEmail
 * @param siteUrl
 * @param isLive
 * @param plan
 * @param renewalDate  (ISO string, e.g. "2023-12-31")
 */
export async function createHostingRecord(
  userEmail: string,
  siteUrl: string,
  isLive: boolean,
  plan: string,
  renewalDate: string
): Promise<HostingInfo> {
  const token = localStorage.getItem('authToken');
  if (!token) {
    throw new Error('No auth token found – please log in first');
  }
  const res = await fetch("https://api.lazyninja.co/admin/hosting", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
    credentials: "include",
    body: JSON.stringify({ userEmail, siteUrl, isLive, plan, renewalDate }),
  });
  if (!res.ok) {
    const errBody = await res.json().catch(() => null);
    throw new Error(errBody?.message || "Failed to create hosting record");
  }
  return res.json();
}

export async function deleteHostingRecord(userEmail: string): Promise<void> {
  const token = localStorage.getItem('authToken');
  if (!token) {
    throw new Error('No auth token found – please log in first');
  }
  const res = await fetch(`https://api.lazyninja.co/admin/hosting/${encodeURIComponent(userEmail)}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
    credentials: "include",
  });
  if (!res.ok) {
    const errBody = await res.json().catch(() => null);
    throw new Error(errBody?.message || "Failed to delete hosting record");
  }
}

/**
 * Admin: update fields of a hosting record
 * @param userEmail
 * @param updates  Partial fields to update: { siteUrl?, isLive?, plan?, renewalDate? }
 */
export async function updateHostingRecord(
  userEmail: string,
  updates: Partial<Pick<HostingInfo, "siteUrl" | "isLive" | "plan" | "renewalDate">>
): Promise<HostingInfo> {
  const token = localStorage.getItem('authToken');
  if (!token) {
    throw new Error('No auth token found – please log in first');
  }
  const res = await fetch(`https://api.lazyninja.co/admin/hosting/${encodeURIComponent(userEmail)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
    credentials: "include",
    body: JSON.stringify(updates),
  });
  if (!res.ok) {
    const errBody = await res.json().catch(() => null);
    throw new Error(errBody?.message || "Failed to update hosting record");
  }
  return res.json();
}

// Inquirer’s hosting status:
export async function getHostingStatusForUser(): Promise<HostingInfo> {
  const token = localStorage.getItem('authToken');
  if (!token) {
    throw new Error('No auth token found – please log in first');
  }
  const res = await fetch("https://api.lazyninja.co/api/hosting", {
    method: "GET",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch hosting status");
  return res.json();
}

export async function createHostingStatus(): Promise<(HostingInfo & { userEmail: string })[]> {
  const token = localStorage.getItem('authToken');
  if (!token) {
    throw new Error('No auth token found – please log in first');
  }
  const res = await fetch("https://api.lazyninja.co/admin/hosting", {
    method: "GET",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch all hosting data");
  return res.json();
}