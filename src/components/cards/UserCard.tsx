// src/components/UserCard.tsx
import React from "react";
import { Globe } from "lucide-react";

export interface UserCardRecord {
  userEmail: string;
  name: string;
  needsPasswordChange: boolean;
  siteUrl?: string;
  isLive?: boolean;
  plan?: string;
  renewalDate?: string;
}

interface UserCardProps {
  record: UserCardRecord;
  actionInProgress: string | null;
  onAddEdit: (rec: UserCardRecord) => void;
  onDelete: (email: string) => void;
  onDeleteUser: (email: string) => void;
}

export default function UserCard({
  record,
  actionInProgress,
  onAddEdit,
  onDelete,
  onDeleteUser,
}: UserCardProps) {
  const hasHosting = Boolean(record.siteUrl);
  const busy = actionInProgress === record.userEmail;

  return (
    <div className="bg-white shadow rounded-lg p-6 flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold text-brown-800">{record.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{record.userEmail}</p>
        <p className="text-sm mb-4">
          Password Updated:{" "}
          <span className={record.needsPasswordChange ? "text-red-600" : "text-green-600"}>
            {record.needsPasswordChange ? "No" : "Yes"}
          </span>
        </p>

        {hasHosting ? (
          <div className="space-y-1 mb-4">
            <div className="flex items-center text-brown-700">
              <Globe className="w-4 h-4 mr-1" />
              <a
                href={record.siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline break-all"
              >
                {record.siteUrl}
              </a>
            </div>
            <p className="text-sm">
              Live:{" "}
              <span className={record.isLive ? "text-green-600" : "text-red-600"}>
                {record.isLive ? "Yes" : "No"}
              </span>
            </p>
            <p className="text-sm">Plan: {record.plan}</p>
            {record.renewalDate && (
              <p className="text-sm">
                Renewal: {new Date(record.renewalDate).toLocaleDateString()}
              </p>
            )}
          </div>
        ) : (
          <p className="text-sm italic text-gray-400 mb-4">No hosting assigned</p>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={() => onAddEdit(record)}
          disabled={busy}
          className={`flex-1 px-3 py-1 rounded-md text-white font-medium ${
            busy
              ? "bg-gray-400 cursor-not-allowed"
              : hasHosting
              ? "bg-brown-700 hover:bg-brown-800"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {busy ? "…" : hasHosting ? "Edit Hosting" : "Add Hosting"}
        </button>

        {hasHosting ? (
          <button
            onClick={() => onDelete(record.userEmail)}
            disabled={busy}
            className="px-3 py-1 rounded-md bg-red-600 text-white hover:bg-red-700 disabled:bg-gray-400"
          >
            {busy ? "…" : "Remove Hosting"}
          </button>
        ) : (
          <button
            onClick={() => onDeleteUser(record.userEmail)}
            disabled={busy}
            className="px-3 py-1 rounded-md bg-red-800 text-white hover:bg-red-900 disabled:bg-gray-400"
          >
            {busy ? "…" : "Delete User"}
          </button>
        )}
      </div>
    </div>
  );
}
