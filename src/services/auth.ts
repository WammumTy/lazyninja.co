// src/services/auth.ts

export interface LoginResponse {
  token: string;
  role: "admin" | "inquirer";
  userEmail: string;
  needsPasswordChange: boolean;
}

export async function loginRequest(credentials: {
  email: string;
  password: string;
}): Promise<LoginResponse> {
  const res = await fetch("https://api.lazyninja.co/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // if you’re using cookies; otherwise omit
    body: JSON.stringify(credentials),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(err?.message || "Login failed");
  }
  return res.json();
}

export interface ChangePasswordResponse {
  message: string;             // e.g. "Password updated"
  token?: string;              // (optional) new token if your backend issues a fresh one
  role?: "admin" | "inquirer"; // (optional) echo back role if you need it
}

export async function updatePasswordRequest(payload: {
  newPassword: string;
}): Promise<ChangePasswordResponse> {
  const res = await fetch("https://api.lazyninja.co/api/users/change-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => null);
    throw new Error(err?.message || "Failed to update password");
  }
  return res.json();
}

export interface InquirerUser {
  id: string;
  email: string;
  name: string;
  role: "inquirer";
  needsPasswordChange: boolean;
}

export async function getAllInquirerUsers(): Promise<InquirerUser[]> {
  const token = localStorage.getItem('authToken');
  const res = await fetch("https://api.lazyninja.co/admin/users", {
    method: "GET",
    headers: { 
      "Content-Type": "application/json", 
      "Authorization": `Bearer ${token}`,
    },
    credentials: "include",
  });
  if (!res.ok) {
    const errBody = await res.json().catch(() => null);
    throw new Error(errBody?.message || "Failed to fetch inquirer users");
  }
  return res.json();
}
