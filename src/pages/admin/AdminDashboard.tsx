import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const role = localStorage.getItem("userRole");
    if (!token || role !== "admin") {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  const adminTabs = [
    { to: "/admin/users", label: "Users" },
    { to: "/admin/inquiries", label: "Inquiries" },
    { to: "/admin/payments", label: "Payments" },
    { to: "/admin/reviews", label: "Reviews" },
  ];

  return (
    <DashboardLayout tabs={adminTabs}>
        <Outlet />
    </DashboardLayout>
  );
}
