import { FC } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const PublicRoute: FC = () => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth?.accessToken ? (
    <Navigate to="/home" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
};

export default PublicRoute;
