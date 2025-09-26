import { FC } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { RootReducer } from "@/store";
import { errorPopup } from "@/utils/popup";

interface IRoutesHandlerProps {
  requiredRole: "user" | "auth";
}

const RoutesHandler: FC<IRoutesHandlerProps> = ({ requiredRole }) => {
  const { accessToken } = useSelector((state: RootReducer) => state.user);
  const location = useLocation();
  console.log("dfdfd");
  console.log(accessToken);

  // If logged in and trying to access /auth, redirect to home
  if (accessToken && location.pathname === "/auth") {
    return <Navigate to="/" replace />;
  }

  // Handle "auth" routes (login/register pages)
  if (requiredRole === "auth") {
    if (accessToken) {
      return <Navigate to="/" replace />;
    }
    return <Outlet />;
  }

  // Handle "user" routes (protected)
  if (requiredRole === "user") {
    if (!accessToken) {
      errorPopup("You must login.");
      return <Navigate to="/auth" state={{ from: location }} replace />;
    }
    return <Outlet />;
  }

  return null; // fallback safeguard
};

export default RoutesHandler;
