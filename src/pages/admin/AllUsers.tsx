// src/pages/AdminDashboard/AllUsers.tsx
import { useEffect, useState } from "react";
import LoadingSection from "@/components/layout/LoadingSection";
import Error from "@/components/layout/Error";
import { getAllInquirerUsers, deleteInquirerUser } from "@/services/auth";
import {
  getAllHostingStatus,
  createHostingRecord,
  updateHostingRecord,
  deleteHostingRecord,
  HostingInfo,
} from "@/services/hosting";
import UserCard, { UserCardRecord } from "@/components/cards/UserCard";

export default function AllUsers() {
  const [records, setRecords] = useState<UserCardRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionInProgress, setActionInProgress] = useState<string | null>(null);

  // Modal
  const [showModal, setShowModal] = useState(false);
  const [editingRec, setEditingRec] = useState<UserCardRecord | null>(null);
  const [form, setForm] = useState<{
    userEmail: string;
    siteUrl: string;
    isLive: boolean;
    plan: string;
    renewalDate: string;
  }>({ userEmail: "", siteUrl: "", isLive: false, plan: "", renewalDate: "" });

  // 1) Fetch & combine users+hosting
  async function fetchRecords() {
    setLoading(true);
    try {
      const [users, hosting] = await Promise.all([
        getAllInquirerUsers(),
        getAllHostingStatus(),
      ]);
      const hostMap = new Map(hosting.map((h) => [h.userEmail, h]));
      setRecords(
        users.map((u) => {
          const h = hostMap.get(u.email);
          return {
            userEmail: u.email,
            name: u.name,
            needsPasswordChange: u.needsPasswordChange,
            siteUrl: h?.siteUrl,
            isLive: h?.isLive,
            plan: h?.plan,
            renewalDate: h?.renewalDate,
          };
        })
      );
      setError(null);
    } catch (e: any) {
      console.error(e);
      setError("Failed to load users or hosting records.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRecords();
  }, []);

  // 2) Open modal (add or edit)
  function openModal(rec: UserCardRecord) {
    setEditingRec(rec);
    setForm({
      userEmail: rec.userEmail,
      siteUrl: rec.siteUrl || "",
      isLive: rec.isLive ?? false,
      plan: rec.plan || "",
      renewalDate: rec.renewalDate || "",
    });
    setShowModal(true);
  }
  const closeModal = () => setShowModal(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  // 3) Create or update, then re-fetch everything
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { userEmail, siteUrl, isLive, plan, renewalDate } = form;
    if (!siteUrl || !plan || !renewalDate) {
      alert("All fields are required");
      return;
    }
    setActionInProgress(userEmail);
    try {
      if (editingRec?.siteUrl) {
        await updateHostingRecord(userEmail, { siteUrl, isLive, plan, renewalDate });
      } else {
        await createHostingRecord(userEmail, siteUrl, isLive, plan, renewalDate);
      }
      await fetchRecords();
      closeModal();
    } catch (e: any) {
      console.error(e);
      alert(e.message || "Error saving hosting record");
    } finally {
      setActionInProgress(null);
    }
  }

  // 4) Delete, then re-fetch
  async function handleDelete(email: string) {
    if (!window.confirm(`Delete hosting for ${email}?`)) return;
    setActionInProgress(email);
    try {
      await deleteHostingRecord(email);
      await fetchRecords();
    } catch (e) {
      console.error(e);
      alert("Error deleting hosting record");
    } finally {
      setActionInProgress(null);
    }
  }

  // 5) Delete user
  async function handleDeleteUser(email: string) {
    if (!window.confirm(`Delete user ${email}? This will also delete their hosting record.`)) return;
    setActionInProgress(email);
    try {
      await deleteInquirerUser(email);
      await fetchRecords();
    } catch (e) {
      console.error(e);
      alert("Error deleting user");
    } finally {
      setActionInProgress(null);
    }
  }

  if (loading) return <LoadingSection message="Loading users…" />;
  if (error) return <Error message={error} />;
  if (!records.length) return <Error message="No users found." />;

  return (
    <>
      <div className="px-6 md:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {records.map((rec) => (
          <UserCard
            key={rec.userEmail}
            record={rec}
            actionInProgress={actionInProgress}
            onAddEdit={openModal}
            onDelete={handleDelete}
            onDeleteUser={handleDeleteUser}
          />
        ))}
      </div>

      {/* modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h2 className="text-xl font-serif font-semibold text-brown-800 mb-4">
              {editingRec?.siteUrl ? "Edit Hosting" : "Add Hosting"} for{" "}
              {form.userEmail}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* email always fixed */}
              <div>
                <label className="block text-sm font-medium text-brown-700 mb-1">
                  User Email
                </label>
                <input
                  name="userEmail"
                  type="email"
                  value={form.userEmail}
                  disabled
                  className="w-full rounded-md border-brown-200 border px-3 py-2 bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brown-700 mb-1">
                  Site URL
                </label>
                <input
                  name="siteUrl"
                  type="url"
                  value={form.siteUrl}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border-brown-200 border px-3 py-2 focus:border-brown-500 focus:ring-brown-500"
                />
              </div>
              <div className="flex items-center">
                <input
                  id="isLive"
                  name="isLive"
                  type="checkbox"
                  checked={form.isLive}
                  onChange={handleChange}
                  className="h-4 w-4 text-brown-700 border-brown-200 rounded"
                />
                <label htmlFor="isLive" className="ml-2 text-sm text-brown-700">
                  Is Live
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-brown-700 mb-1">
                  Plan
                </label>
                <input
                  name="plan"
                  type="text"
                  value={form.plan}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border-brown-200 border px-3 py-2 focus:border-brown-500 focus:ring-brown-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brown-700 mb-1">
                  Renewal Date
                </label>
                <input
                  name="renewalDate"
                  type="date"
                  value={form.renewalDate}
                  onChange={handleChange}
                  required
                  className="w-full rounded-md border-brown-200 border px-3 py-2 focus:border-brown-500 focus:ring-brown-500"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-200 text-brown-800 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionInProgress === form.userEmail}
                  className="px-4 py-2 bg-brown-700 text-white rounded hover:bg-brown-800 disabled:opacity-50"
                >
                  {actionInProgress === form.userEmail ? "Saving…" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
