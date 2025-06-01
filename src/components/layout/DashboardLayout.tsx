import { ReactNode } from "react";

interface DashboardLayoutProps {
  menu: ReactNode;
  children: ReactNode;
}

export default function DashboardLayout({ menu, children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white border-r">
        {menu}
      </aside>
      <main className="flex-1 p-6 overflow-auto">
        {children}
      </main>
    </div>
  );
}
