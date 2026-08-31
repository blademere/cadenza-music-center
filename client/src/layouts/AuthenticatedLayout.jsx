import { Navigate, Outlet } from "react-router-dom";

export default function AuthenticatedLayout() {
  const isAuthenticated = true; // Replace with your auth state

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
