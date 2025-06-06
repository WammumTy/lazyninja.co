// src/pages/AdminDashboard/AllUsers.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSection from "@/components/layout/LoadingSection";
import Error from "@/components/layout/Error";
import { getAllInquirerUsers, InquirerUser } from "@/services/auth";
import {
  createHostingRecord,
  HostingInfo,
} from "@/services/hosting";

interface HostingFormData {
  siteUrl: string;
  isLive: boolean;
  plan: string;
  renewalDate: string;
}

export default function AllUsers() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<InquirerUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionInProgress, setActionInProgress] = useState<string | null>(null);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);
  const [formData, setFormData] = useState<HostingFormData>({
    siteUrl: "",
    isLive: false,
    plan: "",
    renewalDate: "",
  });

  useEffect(() => {
    getAllInquirerUsers()
      .then((data) => setUsers(data ?? []))
      .catch((err) => {
        console.error(err);
        setError("Could not load inquirers.");
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  const openModal = (email: string) => {
    setSelectedEmail(email);
    setFormData({ siteUrl: "", isLive: false, plan: "", renewalDate: "" });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedEmail(null);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEmail) return;
    setActionInProgress(selectedEmail);
    try {
      await createHostingRecord(
        selectedEmail,
        formData.siteUrl,
        formData.isLive,
        formData.plan,
        formData.renewalDate
      );
      closeModal();
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Error creating hosting record");
    } finally {
      setActionInProgress(null);
    }
  };

  if (loading) {
    return <LoadingSection message="Loading inquirers…" />;
  }

  // show full-page error if fetch failed or no users
  if (error || users.length === 0) {
    return <Error message={error ?? "No inquirers found."} />;
  }

  return (
    <>
      <div className="px-6 md:px-12 overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg shadow-sm">
          <thead className="bg-brown-100">
            <tr>
              <th className="px-4 py-2 text-left text-brown-700">Name</th>
              <th className="px-4 py-2 text-left text-brown-700">Email</th>
              <th className="px-4 py-2 text-left text-brown-700">Role</th>
              <th className="px-4 py-2 text-left text-brown-700">Updated Pass</th>
              <th className="px-4 py-2 text-left text-brown-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.email} className="border-t">
                <td className="px-4 py-2">{user.name ?? "N/A"}</td>
                <td className="px-4 py-2">{user.email ?? "N/A"}</td>
                <td className="px-4 py-2">{user.role ?? "N/A"}</td>
                <td className="px-4 py-2">
                  {user.needsPasswordChange === undefined
                    ? "N/A"
                    : user.needsPasswordChange
                    ? "False"
                    : "True"}
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => openModal(user.email)}
                    disabled={actionInProgress === user.email}
                    className={`px-3 py-1 rounded-md text-white font-medium ${
                      actionInProgress === user.email
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-brown-700 hover:bg-brown-800"
                    }`}
                  >
                    {actionInProgress === user.email
                      ? "Processing..."
                      : "Create Hosting"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && selectedEmail && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <h2 className="text-xl font-serif font-semibold text-brown-800 mb-4">
              Create Hosting for {selectedEmail}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="siteUrl"
                  className="block text-sm font-medium text-brown-700 mb-1"
                >
                  Site URL
                </label>
                <input
                  id="siteUrl"
                  type="url"
                  name="siteUrl"
                  value={formData.siteUrl}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border-brown-200 border focus:ring-brown-500 focus:border-brown-500 px-3 py-2"
                  placeholder="https://example.com"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="isLive"
                  checked={formData.isLive}
                  onChange={handleChange}
                  id="isLive"
                  className="h-4 w-4 text-brown-700 border-brown-200 rounded"
                />
                <label
                  htmlFor="isLive"
                  className="ml-2 text-sm text-brown-700"
                >
                  Is Live
                </label>
              </div>

              <div>
                <label
                  htmlFor="plan"
                  className="block text-sm font-medium text-brown-700 mb-1"
                >
                  Plan
                </label>
                <input
                  id="plan"
                  type="text"
                  name="plan"
                  value={formData.plan}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border-brown-200 border focus:ring-brown-500 focus:border-brown-500 px-3 py-2"
                  placeholder="Basic / Pro / etc."
                />
              </div>

              <div>
                <label
                  htmlFor="renewalDate"
                  className="block text-sm font-medium text-brown-700 mb-1"
                >
                  Renewal Date
                </label>
                <input
                  id="renewalDate"
                  type="date"
                  name="renewalDate"
                  value={formData.renewalDate}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border-brown-200 border focus:ring-brown-500 focus:border-brown-500 px-3 py-2"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded-md bg-gray-200 text-brown-800 hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionInProgress === selectedEmail}
                  className={`px-4 py-2 rounded-md text-white font-medium ${
                    actionInProgress === selectedEmail
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-brown-700 hover:bg-brown-800"
                  }`}
                >
                  {actionInProgress === selectedEmail
                    ? "Creating..."
                    : "Create Hosting"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
