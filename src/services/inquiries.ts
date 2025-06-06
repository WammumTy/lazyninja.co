export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  business?: string;
  tags?: string;
  description: string;
  features?: string;
  extra?: string;
  createdAt: string;
  // add any other fields your backend returns
}

/**
 * Fetches all inquiries (pending approval) for the admin.
 */
export async function fetchAllInquiries(): Promise<any[]> {
  const token = localStorage.getItem('authToken');
  if (!token) {
    throw new Error('No auth token found – please log in first');
  }

  const response = await fetch('https://api.lazyninja.co/admin/inquiries', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
}
/**
 * Approves a single inquiry by ID.
 * Sends { inquiryId } in body so backend can initialize customer.
 */
export async function approveInquiry(id: string): Promise<{ message: string }> {
  const token = localStorage.getItem('authToken');
  if (!token) {
    throw new Error('No auth token found – please log in first');
  }
  const res = await fetch(`https://api.lazyninja.co/admin/inquiries/${id}/approve`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ inquiryId: id }),
  });
  if (!res.ok) {
    throw new Error("Failed to approve inquiry");
  }
  return await res.json();
}

/**
 * Deletes a single inquiry by ID.
 */
export async function deleteInquiry(id: string): Promise<{ message: string }> {
  const token = localStorage.getItem('authToken');
  if (!token) {
    throw new Error('No auth token found – please log in first');
  }
  const res = await fetch(`https://api.lazyninja.co/admin/inquiries/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers:{
      Authorization: `Bearer ${token}`,
    }
  });
  if (!res.ok) {
    throw new Error("Failed to delete inquiry");
  }
  return await res.json();
}
