import { Outlet, useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import DashboardLayout from "@/components/layout/DashboardLayout";
import InquirerMenu from "@/components/dashboard/InquirerMenu";

export default function InquirerDashboard() {
  const navigate = useNavigate();

  // TODO: replace with real auth check, or pass in user info via context
  // For now, ensure user is “logged in” as an inquirer
  // If not, redirect to login page: navigate("/login");
  
  return (
    <PageLayout>
      <DashboardLayout menu={<InquirerMenu />}>
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Inquirer Dashboard</h1>
          <p className="text-gray-600">Welcome back! View your payments or hosting status below.</p>
        </div>
        <Outlet />
      </DashboardLayout>
    </PageLayout>
  );
}
