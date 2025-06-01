import React from 'react';
import { Navigate } from 'react-router-dom';

interface RequireAdminProps {
  children: React.ReactNode;
}

const RequireAdmin: React.FC<RequireAdminProps> = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (!payload.isAdmin) {
      // Logged in but not an admin
      return <Navigate to="/dashboard" replace />;
    }
  } catch (err) {
    console.error('Error parsing token:', err);
    return <Navigate to="/login" replace />;
  }

  // Valid admin
  return <>{children}</>;
};

export default RequireAdmin;
