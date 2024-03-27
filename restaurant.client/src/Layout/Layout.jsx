import React from "react";
import { Outlet } from "react-router";

import { OrderProvider } from "../Cart/OrderContext.jsx";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import "./Layout.css";

const Layout = () => {
  return (
    <div className="layout">
      <OrderProvider>
        <Header />
        <Outlet />
        <Footer />
      </OrderProvider>
    </div>
  );
};

export default Layout;
