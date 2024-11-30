import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  //  while loading
  if (isLoading) return null;

  //  if not authenticated
  if (isAuthenticated) return <Outlet />;
  console.log(isAuthenticated);

  // if authenticated
  return <Navigate to="/" replace />;
};

export default ProtectedRoute;
