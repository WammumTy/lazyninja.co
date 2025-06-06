// src/components/layout/DashboardLayout.tsx

import { ReactNode } from "react";
import DashboardNavbar from "./DashboardNavbar";
import Footer from "@/components/layout/Footer";

interface Tab {
  to: string;
  label: string;
}

interface DashboardLayoutProps {
  /*
   * The array of tabs for the secondary navbar (each tab = { to, label }).
   */
  tabs: Tab[];
  /**
   * Any React children (typically your <Outlet /> or page content).
   */
  children: ReactNode;
}

export default function DashboardLayout({tabs, children }: DashboardLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardNavbar tabs={tabs} />

      <main className="flex-grow w-full pt-20 pb-10 px-11 max-w-7xl mx-auto">
        {children}
      </main>
      <Footer />
    </div>
  );
}
