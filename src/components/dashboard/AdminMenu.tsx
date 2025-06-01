// src/components/AdminMenu.tsx
import { NavLink } from "react-router-dom";

export default function AdminMenu() {
  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "block px-4 py-2 font-medium bg-green-100 text-green-700 rounded-md my-1"
      : "block px-4 py-2 font-medium text-gray-700 hover:bg-gray-200 rounded-md my-1";

  return (
    <nav className="mt-8">
      <NavLink to="/admin/payments" className={linkClasses}>
        All Payments
      </NavLink>
      <NavLink to="/admin/hosting" className={linkClasses}>
        All Hosting
      </NavLink>
      <NavLink to="/admin/reviews" className={linkClasses}>
        Manage Reviews
      </NavLink>
    </nav>
  );
}
