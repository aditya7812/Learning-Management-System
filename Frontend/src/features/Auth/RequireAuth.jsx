/* eslint-disable react/prop-types */
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation();
  const { roles } = useAuth();

  if (roles.some((role) => allowedRoles.includes(role))) {
    return <Outlet />;
  }
  return <Navigate to="/join/login" state={{ from: location }} />;
};
export default RequireAuth;
