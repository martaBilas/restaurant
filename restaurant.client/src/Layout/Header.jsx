import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { RiMenuLine } from "@remixicon/react";

import HeaderNavLinks from "./HeaderNavLinks.jsx";
import "./Header.css";
import SideDrawer from "./SideDrawer.jsx";
import Backdrop from "../UIElements/Backdrop.jsx";

const Header = () => {
  // const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  // const openDrawerHandler = () => {
  //   setDrawerIsOpen(true);
  // };

  // const closeDrawerHandler = () => {
  //   setDrawerIsOpen(false);
  // };

  return (
    <React.Fragment>
     {/*  {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
      <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
        <nav className="main-navigation__drawer-nav">
          <HeaderNavLinks />
        </nav>
      </SideDrawer> */}

      <header id="header" class=" d-flex align-items-center">
        <div className="container d-flex align-items-center">
          <button
            className="main-navigation__menu-btn display-mobile"
            /* onClick={openDrawerHandler} */
          >
            <RiMenuLine className="mobile-nav-toggle" />
          </button>
          <Link className="logo me-auto" to="/home">
            Logo
          </Link>
          <nav className="navbar">
            <HeaderNavLinks />
          </nav>
        </div>
      </header>
    </React.Fragment>
  );
};

export default Header;
