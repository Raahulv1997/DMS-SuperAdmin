import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./components/pages/Home";
import BlankPage from "./components/pages/BlankPage";
import ForgetPassword from "./components/pages/ForgetPassword";
import Gallary from "./components/pages/Gallary";
import Login from "./components/pages/login";

import Clients from "./components/pages/Clients";
import Users from "./components/pages/Users";
import AuthWrapper from "./components/comman/AuthWrapper";
import ResetPassword from "./components/pages/ResetPassword";
// import Profile from "./components/pages/Profile";
import AllAdmin from "./components/pages/AllAdmin";
import DoumentUpload from "./components/pages/DoumentUpload";

const Layout = () => {
  const adminToken = localStorage.getItem("admin_token");

  return (
    <>
      <div className="theme-red ">
        <Routes>
          {/* <Route exact path="/" element={<Login />} /> */}

          <Route path="/" element={adminToken ? <Home /> : <Login />} />

          <Route path={"/forgetepassword"} element={<ForgetPassword />} />
          <Route path={"/resetpassword"} element={<ResetPassword />} />
          <Route path={"/doumentUpload"} element={<DoumentUpload />} />
          <Route exact element={<AuthWrapper />}>
            <Route path={"/home"} element={<Home />} />
            <Route path={"/employee"} element={<Users />} />
            <Route path={"/alladmin"} element={<AllAdmin />} />
            <Route path={"/clients"} element={<Clients />} />

            <Route path={"*"} element={<BlankPage />} />
            <Route path={"/gallary"} element={<Gallary />} />
          </Route>
        </Routes>
        {/* <Routes>
          <Route exact element={<AuthWrapper />}>
            <Route exact path={"/home"} element={<Home />} />
            <Route exact path={"/users"} element={<Users />} />
            <Route exact path={"/clients"} element={<Clients />} />
            <Route exact path={"/blank"} element={<BlankPage />} />
            <Route exact path={"/gallary"} element={<Gallary />} />
          </Route>
        </Routes> */}
      </div>
    </>
  );
};

export default Layout;
