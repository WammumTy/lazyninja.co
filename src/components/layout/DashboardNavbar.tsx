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
      ? "px-4 py-2 rounded-md bg-brown-700 text-white font-medium"
      : "px-4 py-2 rounded-md text-brown-700 hover:bg-brown-100 font-medium";

  return (
    <>
      <Navbar />
      <nav
        className="
          sticky top-16
          pt-2
          w-full
          bg-white/95 backdrop-blur-sm
          shadow-sm
          z-40
        "
      >
        {/* Desktop tab links (centered) */}
        <div className="hidden md:flex justify-center py-2">
          <div className="flex space-x-4">
            {tabs.map((tab) => (
              <NavLink key={tab.to} to={tab.to} className={linkClasses}>
                {tab.label}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Mobile tab links (stacked and centered) */}
        <div className="md:hidden bg-white/95 shadow-inner">
          <div className="flex flex-col items-center px-6 py-2 space-y-1">
            {tabs.map((tab) => (
              <NavLink
                key={tab.to}
                to={tab.to}
                className={({ isActive }) =>
                  isActive
                    ? "inline-block px-4 py-2 rounded-md bg-brown-700 text-white font-medium"
                    : "inline-block px-4 py-2 rounded-md text-brown-700 hover:bg-brown-100 font-medium"
                }
              >
                {tab.label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
