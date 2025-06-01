// src/components/InquirerMenu.tsx
import { NavLink } from "react-router-dom";

export default function InquirerMenu() {
  const linkClasses = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "block px-4 py-2 font-medium bg-blue-100 text-blue-700 rounded-md my-1"
      : "block px-4 py-2 font-medium text-gray-700 hover:bg-gray-200 rounded-md my-1";

  return (
    <nav className="mt-8">
      <NavLink to="/inquirer/payments" className={linkClasses}>
        Payments
      </NavLink>
      <NavLink to="/inquirer/hosting" className={linkClasses}>
        Hosting
      </NavLink>
      <NavLink to="/inquirer/submit-review" className={linkClasses}>
        Submit a Review
      </NavLink>
    </nav>
  );
}
