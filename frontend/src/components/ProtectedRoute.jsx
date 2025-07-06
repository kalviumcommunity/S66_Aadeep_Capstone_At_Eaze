import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

const ProtectedRoute = ({
  children,
  requiredRole = null,
  redirectTo = "/login",
}) => {
  const { isAuthenticated, loading, getUserRole } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Check role-based access if required
  if (requiredRole) {
    const userRole = getUserRole();
    if (userRole !== requiredRole) {
      // Redirect to appropriate dashboard based on user role
      if (userRole === "admin") {
        return <Navigate to="/admin/dashboard" replace />;
      } else if (userRole === "vendor") {
        return <Navigate to="/seller/dashboard" replace />;
      } else {
        return <Navigate to="/" replace />;
      }
    }
  }

  return children;
};

export default ProtectedRoute;
