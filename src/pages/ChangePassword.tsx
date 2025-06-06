// src/pages/ChangePassword.tsx
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { updatePasswordRequest } from "../services/auth";

interface LocationState {
  role: "admin" | "inquirer";
}

export default function ChangePassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const { role } = (location.state as LocationState) || { role: "inquirer" };

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (newPassword.trim().length < 8) {
      setErrorMsg("Password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      // Call the update-password endpoint
      const res = await updatePasswordRequest({ newPassword: newPassword.trim() });

      // Optionally, if backend returned a fresh token, store it:
      if (res.token) {
        localStorage.setItem("authToken", res.token);
      }

      setSuccessMsg("Password updated successfully! Redirecting…");

      // Wait a brief moment so the user sees “success,” then navigate
      setTimeout(() => {
        if (role === "admin") {
          navigate("/admin");
        } else {
          navigate("/inquirer");
        }
      }, 1000);
    } catch (err: any) {
      console.error("Error updating password:", err);
      setErrorMsg(err.message || "Failed to update password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Change Your Password</h1>

        {errorMsg && <p className="text-red-600 text-sm mb-4">{errorMsg}</p>}
        {successMsg && <p className="text-green-600 text-sm mb-4">{successMsg}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter new password"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Re‐enter new password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-brown-700 text-white font-medium rounded-md hover:bg-brown-600 disabled:opacity-50"
          >
            {loading ? "Updating…" : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
