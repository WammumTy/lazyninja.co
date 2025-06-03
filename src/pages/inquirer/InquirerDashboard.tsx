import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";

export default function InquirerDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const role = localStorage.getItem("userRole");
    if (!token || role !== "inquirer") {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  const inquirerTabs = [
    { to: "/inquirer/payments", label: "Payments" },
    { to: "/inquirer/hosting", label: "Hosting" },
    { to: "/inquirer/reviews", label: "Reviews" },
  ];

  return (
    <DashboardLayout tabs={inquirerTabs}>
        <Outlet />
    </DashboardLayout>
  );
}
