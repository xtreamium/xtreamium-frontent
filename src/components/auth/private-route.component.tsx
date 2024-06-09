import React from "react";
import { useAuth } from "@/context/auth.context";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const auth = useAuth();
  if (!auth.user) return <Navigate to="/login" />;
  return <Outlet />;
};

export default PrivateRoute;
