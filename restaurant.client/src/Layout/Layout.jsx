import React from "react";
import { Outlet } from "react-router";

import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import "./Layout.css";

const Layout = () => {
  return (
    <div className="layout">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
