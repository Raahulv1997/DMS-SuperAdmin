import { Navigate, Outlet, useLocation } from "react-router-dom";
import React from "react";

const AuthWrapper = () => {
  const location = useLocation(); // current location

  const adminLogged = localStorage.getItem("admin_token");
  return adminLogged === null ||
    adminLogged === "" ||
    adminLogged === undefined ? (
    <Navigate
      to="/"
      replace
      state={{ from: location }} // <-- pass location in route state
    />
  ) : (
    <Outlet />
  );
};

export default AuthWrapper;
