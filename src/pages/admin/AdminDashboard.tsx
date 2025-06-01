// src/pages/AdminDashboard/AdminDashboard.tsx
import { Outlet, useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import DashboardLayout from "@/components/layout/DashboardLayout";
import AdminMenu from "@/components/dashboard/AdminMenu";

export default function AdminDashboard() {
  const navigate = useNavigate();

  // TODO: check if user is an admin. If not, redirect to login or “not authorized”
  // e.g. if (!isAdmin) navigate("/login");

  return (
    <PageLayout>
      <DashboardLayout menu={<AdminMenu />}>
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-600">Manage all inquirer payments, hosting, and reviews here.</p>
        </div>
        <Outlet />
      </DashboardLayout>
    </PageLayout>
  );
}
