// src/components/layout/DashboardNavbar.tsx

import { NavLink } from "react-router-dom";
import Navbar from "./Navbar";

interface DashboardNavbarProps {
  /**
   * Array of tab objects, each with:
   *  - `to`: the route path (e.g. "/admin/payments")
   *  - `label`: the visible text (e.g. "Payments")
   */
  tabs: { to: string; label: string }[];
}

export default function DashboardNavbar({ tabs }: DashboardNavbarProps) {
  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "dashnav-link dashnav-link-active"
      : "dashnav-link";

  return (
    <>
      <Navbar />
      <nav
        className="
          sticky top-16
          pt-2
          w-full
          bg-brown-800/95 backdrop-blur-sm
          shadow-sm
          z-40
        "
      >
        {/* Desktop tab links (centered) */}
        <div className="hidden md:flex justify-center py-3">
          <div className="flex space-x-4">
            {tabs.map((tab) => (
              <NavLink key={tab.to} to={tab.to} className={linkClasses}>
                {tab.label}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Mobile tab links (stacked and centered) */}
        <div className="md:hidden left-0 right-0 bg-brown-800 shadow-md py-4 px-6 flex flex-col gap-4"> 
            {tabs.map((tab) => (
              <NavLink
                key={tab.to}
                to={tab.to}
                className={({ isActive }) =>
                  isActive
                    ? "dashnav-link dashnav-link-active"
                    : "dashnav-link"
                }
              >
                {tab.label}
              </NavLink>
            ))}
        </div>
      </nav>
    </>
  );
}
