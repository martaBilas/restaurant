import React from "react";
import { Outlet } from "react-router";

import { SuperAdminHeader } from "./SuperAdminHeader.jsx";
import Footer from "../Footer.jsx";
import "../Layout.css";

export const SuperAdminLayout = () => {
  return (
    <div className="layout">
        <SuperAdminHeader/>
        <Outlet />
        <Footer />
    </div>
  );
};
